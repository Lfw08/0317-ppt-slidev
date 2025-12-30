# 媒体监控服务使用说明

## 概述

这是一个基于 Linux MPRIS 协议的媒体监控服务，支持两种模式：

1. **客户端模式** - 监听和控制其他播放器（如 Chromium、Firefox、VLC 等）
2. **服务端模式** - 创建 MPRIS 服务，让系统能够控制播放器

## 系统要求

- **操作系统**: Arch Linux (或其他支持 MPRIS 的 Linux 发行版)
- **Node.js**: 20+
- **DBus**: 必须运行
- **playerctl**: 客户端模式需要
- **包管理器**: Yarn

## 快速开始

### 1. 安装依赖

```bash
# 安装 playerctl（客户端模式需要）
sudo pacman -S playerctl

# 安装 Node.js 依赖
yarn add ws mpris-service
```

### 2. 启动服务

```bash
# 使用启动脚本（推荐）
./start-media-server.sh

# 脚本会提示选择模式：
# 1) 客户端模式 - 控制其他播放器
# 2) 服务端模式 - 创建 MPRIS 服务
```

### 3. 打开演示文稿

```bash
# 启动 Slidev 开发服务器
yarn dev
```

## 客户端模式（推荐）

### 适用场景

- 你有其他播放器正在播放媒体（如 Chromium 浏览器播放视频/音乐）
- 想在 Slidev 演示文稿中显示和控制这个播放器

### 使用步骤

1. **启动播放器**
   ```bash
   # 例如：在 Chromium 中播放视频或音乐
   chromium https://youtube.com/watch?v=xxx
   ```

2. **检查播放器**
   ```bash
   # 查看可用的播放器
   playerctl -l
   
   # 输出示例：
   # @chromium.instance51847
   ```

3. **启动客户端模式**
   ```bash
   # 方式1：使用启动脚本
   ./start-media-server.sh
   # 选择 1) 客户端模式
   
   # 方式2：直接运行
   node media-server-client.js
   ```

4. **打开 Slidev**
   - 迷你播放器会自动显示 Chromium 的播放状态
   - 可以通过播放器控制 Chromium 的播放

### 配置目标播放器

如果系统有多个播放器，可以在 `media-server-client.js` 中指定：

```javascript
const CONFIG = {
  wsPort: 3001,
  wsHost: 'localhost',
  updateInterval: 1000,
  targetPlayer: '@chromium.instance51847', // 指定目标播放器
};
```

### 支持的控制

- ✅ 播放/暂停
- ✅ 上一曲/下一曲
- ✅ 进度跳转
- ✅ 显示歌曲信息（标题、艺术家、专辑）
- ✅ 实时进度更新

## 服务端模式

### 适用场景

- 想让系统媒体控制器控制 Slidev 的播放器
- 想创建自己的 MPRIS 服务

### 使用步骤

1. **启动服务端模式**
   ```bash
   # 方式1：使用启动脚本
   ./start-media-server.sh
   # 选择 2) 服务端模式
   
   # 方式2：直接运行
   node media-server.js
   ```

2. **通过系统控制器控制**
   ```bash
   # 使用 playerctl
   playerctl -p slidev-player play
   playerctl -p slidev-player pause
   ```

## 架构说明

### 客户端模式架构

```
┌─────────────────────────────────────────┐
│  媒体监控服务 (Node.js + playerctl)     │
│  - 监听目标 MPRIS 播放器                │
│  - WebSocket 服务器 (端口 3001)         │
│  - 状态同步和控制                        │
└─────────────────────────────────────────┘
                    ↕ WebSocket
┌─────────────────────────────────────────┐
│  浏览器页面 (slides.md)                 │
│  - 迷你播放器组件                       │
│  - WebSocket 客户端                     │
└─────────────────────────────────────────┘
                    ↕ playerctl
┌─────────────────────────────────────────┐
│  目标播放器 (Chromium/Firefox/VLC)      │
│  - MPRIS2 服务                          │
└─────────────────────────────────────────┘
```

### 服务端模式架构

```
┌─────────────────────────────────────────┐
│  媒体监控服务 (Node.js + MPRIS)         │
│  - MPRIS2 服务                          │
│  - WebSocket 服务器 (端口 3001)         │
│  - 状态管理和控制                        │
└─────────────────────────────────────────┘
                    ↕ WebSocket
┌─────────────────────────────────────────┐
│  浏览器页面 (slides.md)                 │
│  - 迷你播放器组件                       │
│  - WebSocket 客户端                     │
│  - Media Session API                   │
└─────────────────────────────────────────┘
                    ↕ MPRIS
┌─────────────────────────────────────────┐
│  系统媒体控制器                         │
│  - playerctl                            │
│  - KDE Connect                          │
│  - 其他 MPRIS 客户端                    │
└─────────────────────────────────────────┘
```

## 配置参数

### 客户端模式配置

在 `media-server-client.js` 中修改：

```javascript
const CONFIG = {
  wsPort: 3001,              // WebSocket 端口
  wsHost: 'localhost',       // WebSocket 主机
  updateInterval: 1000,      // 状态更新间隔（毫秒）
  targetPlayer: null,        // 目标播放器（null = 自动检测）
};
```

### 服务端模式配置

在 `media-server.js` 中修改：

```javascript
const CONFIG = {
  wsPort: 3001,              // WebSocket 端口
  wsHost: 'localhost',       // WebSocket 主机
  updateInterval: 1000,      // 状态更新间隔（毫秒）
  mprisName: 'slidev-player', // MPRIS 服务名称
};
```

### 浏览器端配置

在 `slides.md` 中修改：

```javascript
const WS_CONFIG = {
  host: 'localhost',
  port: 3001,
  reconnectInterval: 3000,  // 重连间隔（毫秒）
};
```

## 功能特性

### 客户端模式功能

✅ 监听 MPRIS 播放器状态
✅ 实时同步播放进度
✅ 控制播放/暂停
✅ 控制上一曲/下一曲
✅ 进度跳转
✅ 显示媒体元数据
✅ 自动检测播放器
✅ 支持多播放器切换

### 服务端模式功能

✅ MPRIS2 服务注册
✅ WebSocket 双向通信
✅ 播放/暂停控制
✅ 上一曲/下一曲控制
✅ 进度跳转
✅ 播放状态同步
✅ 自动重连
✅ Media Session API 集成
✅ 系统媒体控制器集成

## 故障排查

### 问题 1: 找不到播放器

**错误信息:**
```
⚠️ 未找到活跃的播放器
```

**解决方案:**
1. 确保播放器正在运行并播放媒体
2. 检查播放器是否支持 MPRIS：
   ```bash
   playerctl -l
   ```
3. 如果 Chromium 没有显示，尝试：
   ```bash
   chromium --enable-features=MediaSessionService
   ```

### 问题 2: playerctl 未安装

**错误信息:**
```
❌ playerctl 未安装
```

**解决方案:**
```bash
sudo pacman -S playerctl
```

### 问题 3: WebSocket 连接失败

**错误信息:**
```
❌ WebSocket 连接失败: ...
```

**解决方案:**
1. 确认媒体服务已启动
2. 检查端口是否被占用：
   ```bash
   netstat -tlnp | grep 3001
   ```
3. 修改配置使用其他端口

### 问题 4: 控制指令无响应

**解决方案:**
1. 检查目标播放器是否支持该控制
2. 使用 playerctl 直接测试：
   ```bash
   playerctl -p @chromium.instance51847 play
   ```
3. 查看服务日志确认指令是否发送

## 支持的播放器

以下播放器已测试并支持 MPRIS：

- ✅ Chromium / Chrome
- ✅ Firefox
- ✅ VLC Media Player
- ✅ Spotify
- ✅ Rhythmbox
- ✅ Audacious
- ✅ MPV
- ✅ 其他支持 MPRIS2 的播放器

## 开发说明

### 添加新的控制功能

在 `media-server-client.js` 中添加：

```javascript
function controlNewAction(player) {
  try {
    execSync(`playerctl -p "${player}" new-action`);
    console.log('新动作');
  } catch (error) {
    console.error('❌ 新动作失败:', error.message);
  }
}
```

### 修改 UI 样式

在 `slides.md` 的 `<style scoped>` 部分修改样式。

## 技术栈

- **Node.js**: 运行时环境
- **ws**: WebSocket 库
- **mpris-service**: MPRIS2 服务实现（服务端模式）
- **playerctl**: MPRIS 客户端工具（客户端模式）
- **Vue 3**: 前端框架
- **DBus**: Linux 消息总线

## 相关资源

- [MPRIS 规范](https://specifications.freedesktop.org/mpris-spec/latest/)
- [mpris-service 文档](https://github.com/dbusjs/mpris-service)
- [playerctl](https://github.com/altdesktop/playerctl)
- [Media Session API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API)

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！