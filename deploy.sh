#!/bin/bash

# 火山云部署脚本
# 使用方法: ./deploy.sh

set -e

echo "🚀 开始部署到火山云..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查必要文件
check_files() {
    echo "📋 检查必要文件..."
    
    required_files=(
        "package.json"
        "Dockerfile"
        "next.config.js"
        "prisma/schema.prisma"
        "src/app/layout.tsx"
    )
    
    for file in "${required_files[@]}"; do
        if [ ! -f "$file" ]; then
            echo -e "${RED}❌ 缺少必要文件: $file${NC}"
            exit 1
        fi
    done
    
    echo -e "${GREEN}✅ 所有必要文件检查通过${NC}"
}

# 构建项目
build_project() {
    echo "🔨 构建项目..."
    
    # 安装依赖
    npm install
    
    # 生成Prisma客户端
    npm run db:generate
    
    # 构建项目
    npm run build
    
    echo -e "${GREEN}✅ 项目构建完成${NC}"
}

# 检查Git状态
check_git() {
    echo "📝 检查Git状态..."
    
    if [ ! -d ".git" ]; then
        echo -e "${YELLOW}⚠️  未检测到Git仓库，正在初始化...${NC}"
        git init
        git add .
        git commit -m "Initial commit for deployment"
    else
        # 检查是否有未提交的更改
        if [ -n "$(git status --porcelain)" ]; then
            echo -e "${YELLOW}⚠️  检测到未提交的更改，正在提交...${NC}"
            git add .
            git commit -m "Update for deployment"
        fi
    fi
    
    echo -e "${GREEN}✅ Git状态检查完成${NC}"
}

# 显示部署检查清单
show_checklist() {
    echo ""
    echo -e "${YELLOW}📋 部署前检查清单:${NC}"
    echo "1. ✅ 项目文件完整性检查"
    echo "2. ✅ 项目构建测试"
    echo "3. ✅ Git仓库状态"
    echo ""
    echo -e "${YELLOW}🔧 下一步操作:${NC}"
    echo "1. 将代码推送到Git仓库:"
    echo "   git remote add origin https://github.com/your-username/admin-system.git"
    echo "   git push -u origin main"
    echo ""
    echo "2. 在火山云控制台创建应用:"
    echo "   产品服务 → 应用服务 → 应用引擎 → 创建应用"
    echo ""
    echo "3. 配置环境变量:"
    echo "   DATABASE_URL=postgresql://admin:password@your-db-host:5432/admin_system"
    echo "   NEXTAUTH_URL=https://your-domain.com"
    echo "   NEXTAUTH_SECRET=your-production-secret-key"
    echo "   NODE_ENV=production"
    echo ""
    echo "4. 配置构建参数:"
    echo "   构建命令: npm run build"
    echo "   启动命令: npm start"
    echo "   端口: 3000"
    echo ""
    echo -e "${GREEN}🎉 本地准备工作完成！${NC}"
}

# 显示环境变量配置示例
show_env_example() {
    echo ""
    echo -e "${YELLOW}🔧 生产环境变量配置示例:${NC}"
    cat << EOF
# 在火山云控制台配置以下环境变量

DATABASE_URL=postgresql://admin:your_password@your_db_host:5432/admin_system
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-super-secret-production-key
NODE_ENV=production

# 可选配置
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourdomain.com
EOF
}

# 显示数据库初始化命令
show_db_init() {
    echo ""
    echo -e "${YELLOW}🗄️  数据库初始化命令:${NC}"
    cat << EOF
# 在本地执行数据库迁移（需要先配置生产环境变量）

# 方法1: 直接执行
export DATABASE_URL="postgresql://admin:password@your-db-host:5432/admin_system"
npx prisma db push
npx prisma db seed

# 方法2: 使用Docker
docker run --rm \\
  -e DATABASE_URL="postgresql://admin:password@your-db-host:5432/admin_system" \\
  -v \$(pwd):/app \\
  -w /app \\
  node:18-alpine \\
  sh -c "npm install && npx prisma db push && npx prisma db seed"
EOF
}

# 主函数
main() {
    echo -e "${GREEN}🎯 火山云部署助手${NC}"
    echo "=================================="
    
    check_files
    build_project
    check_git
    show_checklist
    show_env_example
    show_db_init
    
    echo ""
    echo -e "${GREEN}🎉 部署准备工作完成！${NC}"
    echo ""
    echo "📖 详细部署指南请查看: DEPLOYMENT_GUIDE.md"
    echo "🌐 火山云控制台: https://console.volcengine.com/"
    echo ""
}

# 执行主函数
main "$@" 