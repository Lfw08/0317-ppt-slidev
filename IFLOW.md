# iFlow Context - 滑翔机挑战赛演示文稿

## 项目概述

这是一个基于 [Slidev](https://sli.dev/) 框架构建的演示文稿项目，主题为**"滑翔机挑战赛"**，用于北京师大二附中第18届科技节高二年级活动（2025年4月10日）。

### 核心功能
- **随机比赛顺序生成**：使用 Fisher-Yates 洗牌算法随机决定参赛班级顺序
- **实时进度显示**：通过 `slidev-component-progress` 组件显示比赛进度
- **多媒体集成**：包含视频、音频和交互式 HTML 内容
- **响应式设计**：适配不同屏幕尺寸的表格布局

## 技术栈

- **框架**：Slidev (基于 Vue 3 + Vite)
- **主题**：slidev-theme-unicorn
- **组件**：slidev-component-progress
- **构建工具**：Vite + 自定义配置
- **部署**：支持 Netlify、Vercel 和 GitHub Pages

## 项目结构

```
├── slides.md                 # 主要演示文稿内容
├── components/               # 自定义 Vue 组件
│   └── Counter.vue          # 计数器组件示例
├── images/                  # 图片资源
├── public/                  # 静态资源
│   ├── index.html          # 交互式 HTML 页面
│   ├── video.mp4           # 背景视频
│   └── FS2020.mp3          # 背景音乐
├── snippets/               # 代码片段
├── server.js              # Express 服务器（提供数字API）
├── number.txt             # 存储数字数据
├── number-server.cjs      # 数字服务器（备用）
└── .github/workflows/     # GitHub Actions 部署配置
    └── deploy.yml
```

## 开发指南

### 环境要求
- Node.js 20+ (LTS)
- npm 或 pnpm

### 安装依赖
```bash
npm install
# 或使用 pnpm
pnpm install
```

### 开发服务器
```bash
npm run dev
# 或使用 pnpm
pnpm dev
```
访问 http://localhost:3030 查看演示文稿

### 构建生产版本
```bash
npm run build
# 或使用 pnpm
pnpm build
```

### 导出为 PDF
```bash
npm run export
# 或使用 pnpm
pnpm export
```

## 部署配置

### GitHub Pages
- 自动部署：`.github/workflows/deploy.yml`
- 访问地址：https://lfw08.github.io/0317-ppt-slidev/

### Netlify
- 配置文件：`netlify.toml`
- 构建命令：`npm run build`
- 发布目录：`dist`

### Vercel
- 配置文件：`vercel.json`
- 构建命令：`npm run build`
- 输出目录：`dist`

## 核心功能详解

### 1. 随机比赛顺序
在 `slides.md` 中使用 Vue 3 Composition API 实现：
- 使用 `localStorage` 存储随机结果
- Fisher-Yates 洗牌算法确保公平性
- 动态渲染三列表格布局

### 2. 进度追踪
使用 `slidev-component-progress` 组件：
- 显示当前比赛进度（1-14轮）
- 响应式设计，适配不同屏幕

### 3. 多媒体集成
- **视频背景**：首页嵌入 `/video.mp4`
- **音频播放**：背景音乐 `/FS2020.mp3`
- **交互式内容**：嵌入 `index.html` 提供额外交互

## 自定义组件

### Counter.vue
简单的计数器组件，演示 Vue 3 组件开发：
- 使用 `<script setup>` 语法糖
- Props 定义和响应式数据
- Tailwind CSS 样式

### global-top.vue
全局顶部组件，用于显示进度条

## 辅助服务

### Express 服务器 (server.js)
提供 `/api/number` 端点，读取 `number.txt` 文件内容

### 数字数据
`number.txt` 存储当前数字值（112），可通过 API 获取

## 主题和样式

- **主主题**：slidev-theme-unicorn
- **备用主题**：多个主题已安装，可通过修改 `slides.md` 切换
- **自定义样式**：内联 CSS 用于表格布局和动画效果

## 使用建议

1. **内容编辑**：直接修改 `slides.md` 文件
2. **样式调整**：在 `slides.md` 的 `<style>` 标签中修改
3. **图片替换**：将新图片放入 `images/` 目录并更新引用
4. **部署**：推送到 main 分支自动触发 GitHub Pages 部署

## 注意事项

- 确保 Node.js 版本为 20 或更高
- 首次运行前必须执行 `npm install`
- 生产环境建议使用 pnpm 以获得更好的性能
- 随机结果会存储在浏览器 localStorage 中，刷新页面不会重新随机