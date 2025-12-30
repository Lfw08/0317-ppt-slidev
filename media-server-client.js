/**
 * 媒体监控服务 (Linux MPRIS 客户端版本)
 * 
 * 功能：
 * 1. 监听系统 MPRIS 播放器（如 Chromium）
 * 2. 通过 WebSocket 与浏览器通信
 * 3. 在浏览器中显示和控制媒体播放
 * 
 * 使用方法：
 * node media-server-client.js
 * 
 * 要求：
 * - Linux 系统
 * - DBus 服务运行中
 * - Node.js 20+
 */

const WebSocket = require('ws');
const { execSync } = require('child_process');

// ========== 配置参数 ==========
const CONFIG = {
  wsPort: 3001,              // WebSocket 端口
  wsHost: 'localhost',       // WebSocket 主机
  updateInterval: 1000,      // 状态更新间隔（毫秒）
  targetPlayer: null,        // 目标播放器（null 表示自动检测第一个）
};

// ========== 全局变量 ==========
let wss = null;
let currentMetadata = {
  title: '未播放',
  artist: '等待媒体...',
  album: '',
  artUrl: '',
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  canPlay: true,
  canPause: true,
  canSeek: true,
  canGoNext: true,
  canGoPrevious: true,
  volume: 1.0,
};

let stateUpdateInterval = null;

// ========== 获取可用播放器列表 ==========
function getPlayerList() {
  try {
    const output = execSync('playerctl -l', { encoding: 'utf8' }).trim();
    return output.split('\n').filter(p => p);
  } catch (error) {
    console.log('⚠️ 未找到活跃的播放器');
    return [];
  }
}

// ========== 获取目标播放器 ==========
function getTargetPlayer() {
  // 如果配置了目标播放器，使用配置的
  if (CONFIG.targetPlayer) {
    return CONFIG.targetPlayer;
  }
  
  // 否则自动检测第一个播放器
  const players = getPlayerList();
  if (players.length > 0) {
    return players[0];
  }
  
  return null;
}

// ========== 获取播放器状态 ==========
function getPlayerStatus(player) {
  try {
    const status = execSync(`playerctl -p "${player}" status`, { encoding: 'utf8' }).trim();
    return status === 'Playing';
  } catch (error) {
    return false;
  }
}

// ========== 获取媒体元数据 ==========
function getMetadata(player) {
  try {
    const metadata = {
      title: execSync(`playerctl -p "${player}" metadata title`, { encoding: 'utf8' }).trim() || '未知',
      artist: execSync(`playerctl -p "${player}" metadata artist`, { encoding: 'utf8' }).trim() || '未知',
      album: execSync(`playerctl -p "${player}" metadata album`, { encoding: 'utf8' }).trim() || '',
      artUrl: execSync(`playerctl -p "${player}" metadata mpris:artUrl`, { encoding: 'utf8' }).trim() || '',
    };
    return metadata;
  } catch (error) {
    return { title: '未知', artist: '未知', album: '', artUrl: '' };
  }
}

// ========== 获取当前位置 ==========
function getPosition(player) {
  try {
    const position = execSync(`playerctl -p "${player}" position`, { encoding: 'utf8' }).trim();
    return parseFloat(position);
  } catch (error) {
    return 0;
  }
}

// ========== 获取总时长 ==========
function getDuration(player) {
  try {
    const duration = execSync(`playerctl -p "${player}" metadata mpris:length`, { encoding: 'utf8' }).trim();
    return parseInt(duration) / 1000000; // 微秒转秒
  } catch (error) {
    return 0;
  }
}

// ========== 控制播放 ==========
function controlPlay(player) {
  try {
    execSync(`playerctl -p "${player}" play`);
    console.log('▶️ 播放');
  } catch (error) {
    console.error('❌ 播放失败:', error.message);
  }
}

// ========== 控制暂停 ==========
function controlPause(player) {
  try {
    execSync(`playerctl -p "${player}" pause`);
    console.log('⏸️ 暂停');
  } catch (error) {
    console.error('❌ 暂停失败:', error.message);
  }
}

// ========== 控制播放/暂停切换 ==========
function controlPlayPause(player) {
  try {
    execSync(`playerctl -p "${player}" play-pause`);
    console.log('🔄 播放/暂停切换');
  } catch (error) {
    console.error('❌ 播放/暂停切换失败:', error.message);
  }
}

// ========== 控制下一曲 ==========
function controlNext(player) {
  try {
    execSync(`playerctl -p "${player}" next`);
    console.log('⏭️ 下一曲');
  } catch (error) {
    console.error('❌ 下一曲失败:', error.message);
  }
}

// ========== 控制上一曲 ==========
function controlPrevious(player) {
  try {
    execSync(`playerctl -p "${player}" previous`);
    console.log('⏮️ 上一曲');
  } catch (error) {
    console.error('❌ 上一曲失败:', error.message);
  }
}

// ========== 控制跳转 ==========
function controlSeek(player, position) {
  try {
    const positionMicros = Math.floor(position * 1000000);
    execSync(`playerctl -p "${player}" position ${positionMicros}`);
    console.log(`⏩ 跳转到: ${position}秒`);
  } catch (error) {
    console.error('❌ 跳转失败:', error.message);
  }
}

// ========== 更新播放器状态 ==========
function updatePlayerState() {
  const player = getTargetPlayer();
  
  if (!player) {
    currentMetadata.title = '未找到播放器';
    currentMetadata.artist = '请启动媒体播放器';
    currentMetadata.artUrl = '';
    currentMetadata.isPlaying = false;
    broadcastState();
    return;
  }

  try {
    // 获取播放状态
    currentMetadata.isPlaying = getPlayerStatus(player);
    
    // 获取元数据
    const metadata = getMetadata(player);
    currentMetadata.title = metadata.title;
    currentMetadata.artist = metadata.artist;
    currentMetadata.album = metadata.album;
    currentMetadata.artUrl = metadata.artUrl;
    
    // 获取进度
    currentMetadata.currentTime = getPosition(player);
    currentMetadata.duration = getDuration(player);
    
    // 广播状态
    broadcastState();
  } catch (error) {
    console.error('❌ 更新播放器状态失败:', error.message);
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
      
      // 立即更新并发送当前状态
      updatePlayerState();
      
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

  const player = getTargetPlayer();
  if (!player) {
    console.warn('⚠️ 未找到目标播放器');
    return;
  }

  switch (data.type) {
    case 'play':
      controlPlay(player);
      break;
    case 'pause':
      controlPause(player);
      break;
    case 'toggle':
      controlPlayPause(player);
      break;
    case 'next':
      controlNext(player);
      break;
    case 'previous':
      controlPrevious(player);
      break;
    case 'seek':
      controlSeek(player, data.position);
      break;
    default:
      console.log('⚠️ 未知消息类型:', data.type);
  }
  
  // 立即更新状态
  setTimeout(updatePlayerState, 100);
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

// ========== 启动状态更新定时器 ==========
function startStateUpdate() {
  if (stateUpdateInterval) {
    clearInterval(stateUpdateInterval);
  }
  
  stateUpdateInterval = setInterval(() => {
    updatePlayerState();
  }, CONFIG.updateInterval);
}

// ========== 启动服务 ==========
function start() {
  console.log('========================================');
  console.log('  媒体监控服务启动中...');
  console.log('  (Linux MPRIS 客户端版本)');
  console.log('========================================');
  
  // 检查 playerctl 是否可用
  try {
    execSync('which playerctl', { encoding: 'utf8' });
    console.log('✅ playerctl 已安装');
  } catch (error) {
    console.error('❌ playerctl 未安装');
    console.log('   请安装: sudo pacman -S playerctl');
    process.exit(1);
  }
  
  // 检查可用的播放器
  const players = getPlayerList();
  if (players.length > 0) {
    console.log('✅ 找到以下播放器:');
    players.forEach((p, index) => {
      console.log(`   ${index + 1}. ${p}`);
    });
    
    if (CONFIG.targetPlayer) {
      console.log(`🎯 目标播放器: ${CONFIG.targetPlayer}`);
    } else {
      console.log(`🎯 自动选择: ${players[0]}`);
    }
  } else {
    console.log('⚠️  未找到活跃的播放器');
    console.log('   请启动一个支持 MPRIS 的播放器（如 Chromium、Firefox、VLC 等）');
  }
  
  initWebSocketServer();
  startStateUpdate();
  
  console.log('========================================');
  console.log('  服务已就绪！');
  console.log('========================================');
  console.log('💡 使用说明:');
  console.log('   1. 确保浏览器已打开 slides.md 页面');
  console.log('   2. 迷你播放器会自动连接到此服务');
  console.log('   3. 可以通过播放器控制媒体播放');
  console.log('   4. 按 Ctrl+C 停止服务');
  console.log('========================================\n');
}

// ========== 优雅退出 ==========
process.on('SIGINT', () => {
  console.log('\n👋 正在停止服务...');
  
  if (stateUpdateInterval) {
    clearInterval(stateUpdateInterval);
  }
  
  if (wss) {
    wss.close();
  }
  
  console.log('✅ 服务已停止');
  process.exit(0);
});

// ========== 启动 ==========
start();
