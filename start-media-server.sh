#!/bin/bash

# 媒体监控服务启动脚本
# 用于 Arch Linux 环境

echo "========================================"
echo "  媒体监控服务启动脚本"
echo "========================================"

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装"
    echo "   请先安装 Node.js: sudo pacman -S nodejs"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"

# 检查 playerctl 是否安装
if ! command -v playerctl &> /dev/null; then
    echo "⚠️  playerctl 未安装"
    echo "   建议安装: sudo pacman -S playerctl"
fi

# 检查依赖是否安装
if ! yarn list ws &> /dev/null; then
    echo "⚠️  依赖未安装，正在安装..."
    yarn add ws
fi

# 检查 DBus 服务
if ! pgrep -x "dbus-daemon" > /dev/null; then
    echo "❌ DBus 服务未运行"
    echo "   请启动 DBus 服务: systemctl --user start dbus"
    exit 1
fi

echo "✅ DBus 服务已运行"

# 检查可用的播放器
echo ""
echo "🔍 检查可用的播放器..."
if command -v playerctl &> /dev/null; then
    PLAYERS=$(playerctl -l 2>/dev/null)
    if [ -n "$PLAYERS" ]; then
        echo "✅ 找到以下播放器:"
        echo "$PLAYERS" | while read -r line; do
            echo "   - $line"
        done
    else
        echo "⚠️  未找到活跃的播放器"
    fi
fi

# 选择模式
echo ""
echo "请选择运行模式:"
echo "  1) 客户端模式 - 控制其他播放器（如 Chromium）"
echo "  2) 服务端模式 - 创建 MPRIS 服务"
echo ""
read -p "请输入选项 (1/2) [默认: 1]: " MODE

MODE=${MODE:-1}

# 启动服务
echo ""
echo "🚀 启动媒体监控服务..."
echo "========================================"

case $MODE in
    1)
        echo "📱 客户端模式"
        node media-server-client.js
        ;;
    2)
        echo "🖥️  服务端模式"
        if ! yarn list mpris-service &> /dev/null; then
            echo "⚠️  mpris-service 未安装，正在安装..."
            yarn add mpris-service
        fi
        node media-server.js
        ;;
    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac