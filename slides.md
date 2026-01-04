---
theme: seriph
addons:
  - slidev-component-progress
title: 高三6班元旦联欢
info: |
class: 'fireworks-background'
drawings:
  persist: false
transition: view-transition
mdc: true
layout: cover
---

<iframe src="/fireworks.html" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; z-index: -1;"></iframe>

<!-- 迷你播放器组件 -->
<div class="mini-player" id="miniPlayer">
  <div class="player-left">
    <div class="player-cover">
      <div class="cover-placeholder">🎵</div>
    </div>
    <div class="player-info">
      <div class="player-title" id="playerTitle">未播放</div>
      <div class="player-artist" id="playerArtist">等待媒体...</div>
    </div>
  </div>
  <div class="player-right">
    <div class="player-controls">
      <button class="control-btn" id="prevBtn" title="上一曲">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
        </svg>
      </button>
      <button class="control-btn play-btn" id="playPauseBtn" title="播放/暂停">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" id="playIcon">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" id="pauseIcon" style="display: none;">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
      </button>
      <button class="control-btn" id="nextBtn" title="下一曲">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
        </svg>
      </button>
    </div>
    <div class="progress-container">
      <div class="progress-bar" id="progressBar">
        <div class="progress-fill" id="progressFill"></div>
      </div>
      <div class="progress-time">
        <span id="currentTime">0:00</span>
        <span id="totalTime">0:00</span>
      </div>
    </div>
  </div>
</div>

<script setup>
import { onMounted, onUnmounted } from 'vue'

// ========== 配置参数 ==========
const WS_CONFIG = {
  host: 'localhost',
  port: 3001,
  reconnectInterval: 3000,  // 重连间隔（毫秒）
}

// ========== 播放器状态 ==========
const playerState = {
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  title: '未播放',
  artist: '等待媒体...',
  album: '高三6班元旦联欢',
  volume: 1.0,
  loopStatus: 'None',
  shuffle: false,
}

// ========== WebSocket 连接 ==========
let ws = null
let reconnectTimer = null
let isConnected = false

// 连接到 WebSocket 服务器
const connectWebSocket = () => {
  try {
    const wsUrl = `ws://${WS_CONFIG.host}:${WS_CONFIG.port}`
    console.log('🔌 连接到媒体服务器:', wsUrl)
    
    ws = new WebSocket(wsUrl)
    
    ws.onopen = () => {
      console.log('✅ WebSocket 连接成功')
      isConnected = true
      
      // 清除重连定时器
      if (reconnectTimer) {
        clearTimeout(reconnectTimer)
        reconnectTimer = null
      }
      
      // 更新播放器状态为已连接
      updatePlayerStatus(true)
    }
    
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data)
        handleServerMessage(message)
      } catch (error) {
        console.error('❌ 解析服务器消息失败:', error.message)
      }
    }
    
    ws.onerror = (error) => {
      console.error('❌ WebSocket 错误:', error)
    }
    
    ws.onclose = () => {
      console.log('🔌 WebSocket 连接断开')
      isConnected = false
      updatePlayerStatus(false)
      
      // 自动重连
      reconnectTimer = setTimeout(() => {
        console.log('🔄 尝试重新连接...')
        connectWebSocket()
      }, WS_CONFIG.reconnectInterval)
    }
    
  } catch (error) {
    console.error('❌ WebSocket 连接失败:', error.message)
    updatePlayerStatus(false)
    
    // 自动重连
    reconnectTimer = setTimeout(() => {
      connectWebSocket()
    }, WS_CONFIG.reconnectInterval)
  }
}

// 处理服务器消息
const handleServerMessage = (message) => {
  console.log('📨 收到服务器消息:', message.type)
  
  switch (message.type) {
    case 'state':
      // 更新播放器状态
      updatePlayerState(message.data)
      break
    case 'command':
      // 处理服务器命令
      handleServerCommand(message.command)
      break
    default:
      console.log('⚠️ 未知消息类型:', message.type)
  }
}

// 更新播放器状态
const updatePlayerState = (state) => {
  Object.assign(playerState, state)
  
  // 更新 UI
  updatePlayButton()
  updateProgress()
  updatePlayerInfo()
  
  // 更新 Media Session
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: playerState.title,
      artist: playerState.artist,
      album: playerState.album,
    })
    navigator.mediaSession.playbackState = playerState.isPlaying ? 'playing' : 'paused'
  }
}

// 处理服务器命令
const handleServerCommand = (command) => {
  console.log('📢 收到服务器命令:', command)
  
  switch (command) {
    case 'next':
      // 下一曲（由服务器处理）
      break
    case 'previous':
      // 上一曲（由服务器处理）
      break
    default:
      console.log('⚠️ 未知命令:', command)
  }
}

// 更新播放器状态显示
const updatePlayerStatus = (connected) => {
  const titleEl = document.getElementById('playerTitle')
  const artistEl = document.getElementById('playerArtist')

  if (titleEl && artistEl) {
    if (connected) {
      titleEl.textContent = playerState.title
      artistEl.textContent = playerState.artist
    } else {
      titleEl.textContent = '未连接'
      artistEl.textContent = '等待媒体服务器...'
    }
  }
}

// 更新播放器信息
const updatePlayerInfo = () => {
  const titleEl = document.getElementById('playerTitle')
  const artistEl = document.getElementById('playerArtist')
  
  if (titleEl && artistEl) {
    titleEl.textContent = playerState.title
    artistEl.textContent = playerState.artist
  }
}

// 发送消息到服务器
const sendToServer = (message) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message))
  } else {
    console.warn('⚠️ WebSocket 未连接，无法发送消息')
  }
}

// ========== Media Session API 设置 ==========
const setupMediaSession = () => {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: playerState.title,
      artist: playerState.artist,
      album: playerState.album,
      artwork: [
        { src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23667eea" width="100" height="100"/><text x="50" y="55" text-anchor="middle" font-size="40">🎵</text></svg>', sizes: '96x96', type: 'image/svg+xml' }
      ]
    })

    navigator.mediaSession.setActionHandler('play', () => {
      togglePlayPause()
    })

    navigator.mediaSession.setActionHandler('pause', () => {
      togglePlayPause()
    })

    navigator.mediaSession.setActionHandler('previoustrack', () => {
      handlePrevious()
    })

    navigator.mediaSession.setActionHandler('nexttrack', () => {
      handleNext()
    })

    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (details.seekTime && !isNaN(details.seekTime)) {
        playerState.currentTime = details.seekTime
        sendToServer({ type: 'seek', position: details.seekTime })
        updateProgress()
      }
    })
  }
}

// ========== 播放控制函数 ==========

// 播放/暂停切换
const togglePlayPause = () => {
  playerState.isPlaying = !playerState.isPlaying
  updatePlayButton()
  
  // 发送到服务器
  sendToServer({ type: 'toggle' })
  
  // 更新 Media Session
  if ('mediaSession' in navigator) {
    navigator.mediaSession.playbackState = playerState.isPlaying ? 'playing' : 'paused'
  }
}

// 更新播放按钮
const updatePlayButton = () => {
  const playIcon = document.getElementById('playIcon')
  const pauseIcon = document.getElementById('pauseIcon')
  if (playIcon && pauseIcon) {
    playIcon.style.display = playerState.isPlaying ? 'none' : 'block'
    pauseIcon.style.display = playerState.isPlaying ? 'block' : 'none'
  }
}

// 上一曲
const handlePrevious = () => {
  console.log('上一曲')
  sendToServer({ type: 'previous' })
}

// 下一曲
const handleNext = () => {
  console.log('下一曲')
  sendToServer({ type: 'next' })
}

// 更新进度条
const updateProgress = () => {
  const progressFill = document.getElementById('progressFill')
  const currentTimeEl = document.getElementById('currentTime')
  const totalTimeEl = document.getElementById('totalTime')
  
  if (progressFill && currentTimeEl && totalTimeEl) {
    const progress = playerState.duration > 0 ? (playerState.currentTime / playerState.duration) * 100 : 0
    progressFill.style.width = `${progress}%`
    currentTimeEl.textContent = formatTime(playerState.currentTime)
    totalTimeEl.textContent = formatTime(playerState.duration)
  }
}

// 格式化时间
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// ========== 事件监听器绑定 ==========
const bindEventListeners = () => {
  const playPauseBtn = document.getElementById('playPauseBtn')
  const prevBtn = document.getElementById('prevBtn')
  const nextBtn = document.getElementById('nextBtn')
  const progressBar = document.getElementById('progressBar')
  
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlayPause)
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', handlePrevious)
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', handleNext)
  }
  
  if (progressBar) {
    progressBar.addEventListener('click', (e) => {
      const rect = progressBar.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = clickX / rect.width
      const newPosition = Math.floor(percentage * playerState.duration)
      playerState.currentTime = newPosition
      sendToServer({ type: 'seek', position: newPosition })
      updateProgress()
    })
  }
}

// ========== 生命周期钩子 ==========
onMounted(() => {
  console.log('🎵 迷你播放器初始化')
  
  setupMediaSession()
  bindEventListeners()
  
  // 连接到媒体服务器
  connectWebSocket()
  
  // 设置初始状态
  updatePlayerStatus(false)
})

onUnmounted(() => {
  console.log('👋 迷你播放器卸载')
  
  // 清除重连定时器
  if (reconnectTimer) {
    clearTimeout(reconnectTimer)
  }
  
  // 关闭 WebSocket 连接
  if (ws) {
    ws.close()
  }
})
</script>

<style scoped>
/* 迷你播放器样式 */
.mini-player {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 350px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 12px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  z-index: 1000;
  font-family: 'Microsoft YaHei', sans-serif;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  gap: 12px;
  align-items: center;
}

.mini-player:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

/* 左侧区域：封面和信息 */
.player-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.player-cover {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.cover-placeholder {
  font-size: 24px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.player-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.player-title {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player-artist {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 右侧区域：控件和进度条 */
.player-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.player-controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

.control-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.control-btn:active {
  transform: scale(0.95);
}

.play-btn {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.4), rgba(118, 75, 162, 0.4));
}

.play-btn:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.6), rgba(118, 75, 162, 0.6));
}

.progress-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: height 0.2s ease;
}

.progress-bar:hover {
  height: 6px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  width: 0%;
  transition: width 0.1s linear;
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
}

.progress-time {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .mini-player {
    width: 280px;
    left: 10px;
    top: 10px;
    padding: 10px;
  }
  
  .player-cover {
    width: 40px;
    height: 40px;
  }
  
  .cover-placeholder {
    font-size: 20px;
  }
  
  .player-title {
    font-size: 12px;
  }
  
  .player-artist {
    font-size: 10px;
  }
  
  .control-btn {
    width: 28px;
    height: 28px;
  }
  
  .play-btn {
    width: 32px;
    height: 32px;
  }
}
</style>

# 高三 6 班元旦联欢 {.inline-block.view-transition-title}

## 2025-12-31

<PoweredBySlidev></PoweredBySlidev>

---
layout: cover
---

<iframe src="/fireworks.html" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; z-index: -1;"></iframe>

# 包饺子 {.inline-block.view-transition-title}

---
layout: cover
class: 'fireworks-background'
---

<iframe src="/fireworks.html" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; z-index: -1;"></iframe>

# 生日会 {.inline-block.view-transition-title}
---
layout: cover
class: 'fireworks-background'
---

<iframe src="/fireworks.html" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; z-index: -1;"></iframe>

# 生日会 {.inline-block.view-transition-title}

## 2025 年 12 月至 2026 年 1 月过生日的同学：
### 
#### 陈智宁、蒋道颐、王紫云、赵星寓、焦禹涵、赵梓彤、高海洋


---
---

<iframe src="/fireworks.html" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; z-index: -1;"></iframe>


---
layout: cover
background: https://4kwallpapers.com/images/wallpapers/vector-art-colorful-3840x2160-12144.jpg
---


# 歌曲飞花令 {.inline-block.view-transition-title}

---
layout: cover
background: https://4kwallpapers.com/images/wallpapers/vector-art-colorful-3840x2160-12144.jpg
---

# 你画我猜 {.inline-block.view-transition-title}

## Pictionary Game

---


# 第 1 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    1
  </div>
</div>

---


# 第 1 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    魔方
  </div>
</div>

---

# 第 2 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    2
  </div>
</div>

---

# 第 2 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    蒸汽机
  </div>
</div>

---

# 第 3 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    3
  </div>
</div>

---

# 第 3 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    指南针
  </div>
</div>

---

# 第 4 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    4
  </div>
</div>

---

# 第 4 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    蜂巢
  </div>
</div>

---

# 第 5 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    5
  </div>
</div>

---

# 第 5 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    热气球
  </div>
</div>

---

# 第 6 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    6
  </div>
</div>

---

# 第 6 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    手风琴
  </div>
</div>

---

# 第 7 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    7
  </div>
</div>

---

# 第 7 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    海浪
  </div>
</div>

---

# 第 8 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    8
  </div>
</div>

---

# 第 8 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    望远镜
  </div>
</div>

---

# 第 9 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    9
  </div>
</div>

---

# 第 9 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    船锚
  </div>
</div>

---

# 第 10 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    10
  </div>
</div>

---

# 第 10 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    月蚀
  </div>
</div>

---

# 第 11 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    11
  </div>
</div>

---

# 第 11 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    沙漏
  </div>
</div>

---

# 第 12 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    12
  </div>
</div>

---

# 第 12 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    钥匙孔
  </div>
</div>

---

# 第 13 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    13
  </div>
</div>

---

# 第 13 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    立交桥
  </div>
</div>

---

# 第 14 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    14
  </div>
</div>

---

# 第 14 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    纸飞机
  </div>
</div>

---

# 第 15 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    15
  </div>
</div>

---

# 第 15 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    温室
  </div>
</div>

---

# 第 16 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    16
  </div>
</div>

---

# 第 16 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    盾牌
  </div>
</div>

---

# 第 17 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    17
  </div>
</div>

---

# 第 17 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    章鱼
  </div>
</div>

---

# 第 18 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    18
  </div>
</div>

---

# 第 18 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    磁悬浮列车
  </div>
</div>

---

# 第 19 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    19
  </div>
</div>

---

# 第 19 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    马戏团
  </div>
</div>

---

# 第 20 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    20
  </div>
</div>

---

# 第 20 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    灯塔
  </div>
</div>

---

# 第 21 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    21
  </div>
</div>

---

# 第 21 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    钻石
  </div>
</div>

---

# 第 22 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    22
  </div>
</div>

---

# 第 22 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    鼠标
  </div>
</div>

---

# 第 23 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    23
  </div>
</div>

---

# 第 23 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    萤火虫
  </div>
</div>

---

# 第 24 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    24
  </div>
</div>

---

# 第 24 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    蜘蛛网
  </div>
</div>

---

# 第 25 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    25
  </div>
</div>

---

# 第 25 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    口琴
  </div>
</div>

---

# 第 26 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    26
  </div>
</div>

---

# 第 26 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    冰山
  </div>
</div>

---

# 第 27 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    27
  </div>
</div>

---

# 第 27 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    迷宫
  </div>
</div>

---

# 第 28 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    28
  </div>
</div>

---

# 第 28 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    打印机
  </div>
</div>

---

# 第 29 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    29
  </div>
</div>

---

# 第 29 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    皮影戏
  </div>
</div>

---

# 第 30 页

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    30
  </div>
</div>

---

# 第 30 题

<div class="flex items-center justify-center h-full">
  <div class="text-8xl font-bold">
    极光
  </div>
</div>

---
layout: cover
---

# 游戏结束 🎉 {.inline-block.view-transition-title}


