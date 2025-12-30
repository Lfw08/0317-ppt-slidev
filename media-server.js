/**
 * 媒体监控服务 (Linux MPRIS 客户端版本)
 * 
 * 功能：
 * 1. 监听系统 MPRIS 播放器（如 Chromium）
 * 2. 通过 WebSocket 与浏览器通信
 * 3. 在浏览器中显示和控制媒体播放
 * 
 * 使用方法：
 * node media-server.js
 * 
 * 要求：
 * - Linux 系统
 * - DBus 服务运行中
 * - Node.js 20+
 */

const WebSocket = require('ws');
const { MessageBus, Interface, Property } = require('dbus-next');

// ========== 配置参数 ==========
const CONFIG = {
  wsPort: 3001,              // WebSocket 端口
  wsHost: 'localhost',       // WebSocket 主机
  updateInterval: 1000,      // 状态更新间隔（毫秒）
  mprisName: 'slidev-player', // MPRIS 服务名称
};

// ========== 全局变量 ==========
let wss = null;
let mprisPlayer = null;
let currentMetadata = {
  title: '未播放',
  artist: '等待媒体...',
  album: '高三6班元旦联欢',
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  playbackRate: 1,
  canPlay: true,
  canPause: true,
  canSeek: true,
  canGoNext: true,
  canGoPrevious: true,
  loopStatus: 'None',
  shuffle: false,
  volume: 1.0,
};

// ========== 初始化 MPRIS 服务 ==========
function initMprisService() {
  try {
    console.log('🎵 初始化 MPRIS2 服务...');
    
    mprisPlayer = new Player({
      name: CONFIG.mprisName,
      identity: 'Slidev Media Player',
      supportedUriSchemes: ['file'],
      supportedMimeTypes: ['audio/mpeg', 'audio/ogg'],
      supportedInterfaces: ['player'],
      desktopEntry: 'slidev-player',
    });

    // 设置初始元数据
    updateMprisMetadata();

    // 设置播放状态
    updateMprisPlaybackStatus();

    // 监听播放事件
    mprisPlayer.on('play', () => {
      console.log('▶️ MPRIS 播放事件');
      currentMetadata.isPlaying = true;
      broadcastState();
    });

    // 监听暂停事件
    mprisPlayer.on('pause', () => {
      console.log('⏸️ MPRIS 暂停事件');
      currentMetadata.isPlaying = false;
      broadcastState();
    });

    // 监听下一曲事件
    mprisPlayer.on('next', () => {
      console.log('⏭️ MPRIS 下一曲事件');
      broadcastCommand('next');
    });

    // 监听上一曲事件
    mprisPlayer.on('previous', () => {
      console.log('⏮️ MPRIS 上一曲事件');
      broadcastCommand('previous');
    });

    // 监听停止事件
    mprisPlayer.on('stop', () => {
      console.log('⏹️ MPRIS 停止事件');
      currentMetadata.isPlaying = false;
      currentMetadata.currentTime = 0;
      broadcastState();
    });

    // 监听跳转事件
    mprisPlayer.on('seek', (offset) => {
      console.log(`⏩ MPRIS 跳转事件: ${offset}微秒`);
      currentMetadata.currentTime += offset / 1000000; // 微秒转秒
      broadcastState();
    });

    // 监听设置位置事件
    mprisPlayer.on('setPosition', (trackId, position) => {
      console.log(`⏩ MPRIS 设置位置: ${position}微秒`);
      currentMetadata.currentTime = position / 1000000;
      broadcastState();
    });

    // 监听音量变化
    mprisPlayer.on('volume', (volume) => {
      console.log(`🔊 MPRIS 音量变化: ${volume}`);
      currentMetadata.volume = volume;
      broadcastState();
    });

    // 监听循环状态变化
    mprisPlayer.on('loopStatus', (status) => {
      console.log(`🔄 MPRIS 循环状态: ${status}`);
      currentMetadata.loopStatus = status;
      broadcastState();
    });

    // 监听随机播放变化
    mprisPlayer.on('shuffle', (shuffle) => {
      console.log(`🔀 MPRIS 随机播放: ${shuffle}`);
      currentMetadata.shuffle = shuffle;
      broadcastState();
    });

    console.log('✅ MPRIS2 服务初始化成功');
    console.log(`   服务名称: org.mpris.MediaPlayer2.${CONFIG.mprisName}`);
  } catch (error) {
    console.error('❌ MPRIS2 服务初始化失败:', error.message);
    console.log('💡 提示：请确保 DBus 服务正在运行');
    console.log('   检查命令: systemctl --user status dbus');
  }
}

// ========== 更新 MPRIS 元数据 ==========
function updateMprisMetadata() {
  if (!mprisPlayer) return;

  try {
    mprisPlayer.metadata = {
      'xesam:title': currentMetadata.title,
      'xesam:artist': [currentMetadata.artist],
      'xesam:album': currentMetadata.album,
      'mpris:trackid': '/org/slidev/track/0',
      'mpris:length': currentMetadata.duration * 1000000, // 秒转微秒
      'xesam:genre': ['元旦联欢'],
    };
  } catch (error) {
    console.error('❌ 更新 MPRIS 元数据失败:', error.message);
  }
}

// ========== 更新 MPRIS 播放状态 ==========
function updateMprisPlaybackStatus() {
  if (!mprisPlayer) return;

  try {
    mprisPlayer.playbackStatus = currentMetadata.isPlaying ? 'Playing' : 'Paused';
    mprisPlayer.rate = currentMetadata.playbackRate;
    mprisPlayer.volume = currentMetadata.volume;
    mprisPlayer.loopStatus = currentMetadata.loopStatus;
    mprisPlayer.shuffle = currentMetadata.shuffle;
  } catch (error) {
    console.error('❌ 更新 MPRIS 播放状态失败:', error.message);
  }
}

// ========== 更新 MPRIS 位置 ==========
function updateMprisPosition() {
  if (!mprisPlayer) return;

  try {
    mprisPlayer.position = currentMetadata.currentTime * 1000000; // 秒转微秒
  } catch (error) {
    console.error('❌ 更新 MPRIS 位置失败:', error.message);
  }
}

// ========== 初始化 WebSocket 服务器 ==========
function initWebSocketServer() {
  try {
    wss = new WebSocket.Server({ 
      host: CONFIG.wsHost,
      port: CONFIG.wsPort 
    });

    console.log(`🌐 WebSocket 服务器启动成功`);
    console.log(`   地址: ws://${CONFIG.wsHost}:${CONFIG.wsPort}`);

    wss.on('connection', (ws) => {
      console.log('📱 新客户端连接');
      
      // 发送当前状态
      ws.send(JSON.stringify({
        type: 'state',
        data: currentMetadata
      }));

      // 监听客户端消息
      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message);
          handleClientMessage(data, ws);
        } catch (error) {
          console.error('❌ 解析客户端消息失败:', error.message);
        }
      });

      // 监听客户端断开
      ws.on('close', () => {
        console.log('📱 客户端断开连接');
      });

      // 监听错误
      ws.on('error', (error) => {
        console.error('❌ WebSocket 错误:', error.message);
      });
    });

    wss.on('error', (error) => {
      console.error('❌ WebSocket 服务器错误:', error.message);
    });

  } catch (error) {
    console.error('❌ WebSocket 服务器启动失败:', error.message);
    console.log(`💡 端口 ${CONFIG.wsPort} 可能被占用，请检查或修改配置`);
  }
}

// ========== 处理客户端消息 ==========
function handleClientMessage(data, ws) {
  console.log('📨 收到客户端消息:', data.type);

  switch (data.type) {
    case 'play':
      handlePlay();
      break;
    case 'pause':
      handlePause();
      break;
    case 'toggle':
      handleToggle();
      break;
    case 'next':
      handleNext();
      break;
    case 'previous':
      handlePrevious();
      break;
    case 'seek':
      handleSeek(data.position);
      break;
    case 'updateMetadata':
      handleUpdateMetadata(data.metadata);
      break;
    default:
      console.log('⚠️ 未知消息类型:', data.type);
  }
}

// ========== 媒体控制处理函数 ==========

function handlePlay() {
  console.log('▶️ 播放');
  currentMetadata.isPlaying = true;
  updateMprisPlaybackStatus();
  broadcastState();
}

function handlePause() {
  console.log('⏸️ 暂停');
  currentMetadata.isPlaying = false;
  updateMprisPlaybackStatus();
  broadcastState();
}

function handleToggle() {
  console.log('🔄 切换播放/暂停');
  currentMetadata.isPlaying = !currentMetadata.isPlaying;
  updateMprisPlaybackStatus();
  broadcastState();
}

function handleNext() {
  console.log('⏭️ 下一曲');
  broadcastCommand('next');
}

function handlePrevious() {
  console.log('⏮️ 上一曲');
  broadcastCommand('previous');
}

function handleSeek(position) {
  console.log(`⏩ 跳转到: ${position}秒`);
  currentMetadata.currentTime = position;
  updateMprisPosition();
  broadcastState();
}

function handleUpdateMetadata(metadata) {
  console.log('📝 更新媒体信息:', metadata);
  currentMetadata = { ...currentMetadata, ...metadata };
  updateMprisMetadata();
  updateMprisPlaybackStatus();
  broadcastState();
}

// ========== 广播状态给所有客户端 ==========
function broadcastState() {
  if (!wss) return;

  const message = JSON.stringify({
    type: 'state',
    data: currentMetadata
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// ========== 广播命令给所有客户端 ==========
function broadcastCommand(command) {
  if (!wss) return;

  const message = JSON.stringify({
    type: 'command',
    command: command
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// ========== 模拟进度更新（用于演示）==========
let progressInterval = null;

function startProgressSimulation() {
  if (progressInterval) clearInterval(progressInterval);
  
  progressInterval = setInterval(() => {
    if (currentMetadata.isPlaying && currentMetadata.duration > 0) {
      currentMetadata.currentTime += 1;
      
      if (currentMetadata.currentTime >= currentMetadata.duration) {
        currentMetadata.currentTime = 0;
        currentMetadata.isPlaying = false;
        updateMprisPlaybackStatus();
      }
      
      updateMprisPosition();
      broadcastState();
    }
  }, CONFIG.updateInterval);
}

// ========== 启动服务 ==========
function start() {
  console.log('========================================');
  console.log('  媒体监控服务启动中...');
  console.log('  (Linux MPRIS 版本)');
  console.log('========================================');
  
  initMprisService();
  initWebSocketServer();
  startProgressSimulation();
  
  console.log('========================================');
  console.log('  服务已就绪！');
  console.log('========================================');
  console.log('💡 使用说明:');
  console.log('   1. 确保浏览器已打开 slides.md 页面');
  console.log('   2. 迷你播放器会自动连接到此服务');
  console.log('   3. 可以通过播放器控制媒体播放');
  console.log('   4. 系统媒体控制器也可以控制播放器');
  console.log('   5. 按 Ctrl+C 停止服务');
  console.log('========================================');
  console.log('🔍 MPRIS 服务信息:');
  console.log(`   名称: org.mpris.MediaPlayer2.${CONFIG.mprisName}`);
  console.log(`   测试: playerctl -p ${CONFIG.mprisName} status`);
  console.log('========================================\n');
}

// ========== 优雅退出 ==========
process.on('SIGINT', () => {
  console.log('\n👋 正在停止服务...');
  
  if (progressInterval) {
    clearInterval(progressInterval);
  }
  
  if (wss) {
    wss.close();
  }
  
  if (mprisPlayer) {
    mprisPlayer.destroy();
  }
  
  console.log('✅ 服务已停止');
  process.exit(0);
});

// ========== 启动 ==========
start();