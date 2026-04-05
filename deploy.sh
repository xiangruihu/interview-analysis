#!/bin/bash
# ============================================
# 面试分析项目 - 一键部署脚本
# 用法: ./deploy.sh <服务器IP或域名> [SSH用户名]
# 示例: ./deploy.sh 123.45.67.89 root
# ============================================

set -e

SERVER=${1:?"请提供服务器地址，例如: ./deploy.sh 123.45.67.89 root"}
USER=${2:-root}
REMOTE_DIR="/var/www/interview-analysis"

echo "🔨 [1/4] 构建前端项目..."
cd web
npm install
npm run build
cd ..

echo "📦 [2/4] 上传文件到服务器 ${USER}@${SERVER}..."
ssh ${USER}@${SERVER} "mkdir -p ${REMOTE_DIR}"
scp -r web/dist/* ${USER}@${SERVER}:${REMOTE_DIR}/

echo "⚙️  [3/4] 配置 Nginx..."
scp nginx.conf ${USER}@${SERVER}:/etc/nginx/sites-available/interview-analysis
ssh ${USER}@${SERVER} "ln -sf /etc/nginx/sites-available/interview-analysis /etc/nginx/sites-enabled/ && nginx -t && systemctl reload nginx"

echo "✅ [4/4] 部署完成！"
echo "🌐 访问地址: http://${SERVER}"
