@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo 🚀 开始部署到火山云...
echo ==================================

:: 检查必要文件
echo 📋 检查必要文件...
set "missing_files="

if not exist "package.json" (
    echo ❌ 缺少必要文件: package.json
    set "missing_files=1"
)

if not exist "Dockerfile" (
    echo ❌ 缺少必要文件: Dockerfile
    set "missing_files=1"
)

if not exist "next.config.js" (
    echo ❌ 缺少必要文件: next.config.js
    set "missing_files=1"
)

if not exist "prisma\schema.prisma" (
    echo ❌ 缺少必要文件: prisma\schema.prisma
    set "missing_files=1"
)

if not exist "src\app\layout.tsx" (
    echo ❌ 缺少必要文件: src\app\layout.tsx
    set "missing_files=1"
)

if defined missing_files (
    echo.
    echo ❌ 部署前检查失败，请确保所有必要文件存在
    pause
    exit /b 1
)

echo ✅ 所有必要文件检查通过

:: 构建项目
echo 🔨 构建项目...

:: 安装依赖
echo 正在安装依赖...
call npm install
if errorlevel 1 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)

:: 生成Prisma客户端
echo 正在生成Prisma客户端...
call npm run db:generate
if errorlevel 1 (
    echo ❌ Prisma客户端生成失败
    pause
    exit /b 1
)

:: 构建项目
echo 正在构建项目...
call npm run build
if errorlevel 1 (
    echo ❌ 项目构建失败
    pause
    exit /b 1
)

echo ✅ 项目构建完成

:: 检查Git状态
echo 📝 检查Git状态...

if not exist ".git" (
    echo ⚠️  未检测到Git仓库，正在初始化...
    git init
    git add .
    git commit -m "Initial commit for deployment"
) else (
    :: 检查是否有未提交的更改
    git status --porcelain >nul 2>&1
    if errorlevel 0 (
        echo ⚠️  检测到未提交的更改，正在提交...
        git add .
        git commit -m "Update for deployment"
    )
)

echo ✅ Git状态检查完成

:: 显示部署检查清单
echo.
echo 📋 部署前检查清单:
echo 1. ✅ 项目文件完整性检查
echo 2. ✅ 项目构建测试
echo 3. ✅ Git仓库状态
echo.
echo 🔧 下一步操作:
echo 1. 将代码推送到Git仓库:
echo    git remote add origin https://github.com/your-username/admin-system.git
echo    git push -u origin main
echo.
echo 2. 在火山云控制台创建应用:
echo    产品服务 → 应用服务 → 应用引擎 → 创建应用
echo.
echo 3. 配置环境变量:
echo    DATABASE_URL=postgresql://admin:password@your-db-host:5432/admin_system
echo    NEXTAUTH_URL=https://your-domain.com
echo    NEXTAUTH_SECRET=your-production-secret-key
echo    NODE_ENV=production
echo.
echo 4. 配置构建参数:
echo    构建命令: npm run build
echo    启动命令: npm start
echo    端口: 3000
echo.
echo ✅ 本地准备工作完成！

:: 显示环境变量配置示例
echo.
echo 🔧 生产环境变量配置示例:
echo # 在火山云控制台配置以下环境变量
echo.
echo DATABASE_URL=postgresql://admin:your_password@your_db_host:5432/admin_system
echo NEXTAUTH_URL=https://your-domain.com
echo NEXTAUTH_SECRET=your-super-secret-production-key
echo NODE_ENV=production
echo.
echo # 可选配置
echo EMAIL_SERVER_HOST=smtp.gmail.com
echo EMAIL_SERVER_PORT=587
echo EMAIL_SERVER_USER=your-email@gmail.com
echo EMAIL_SERVER_PASSWORD=your-app-password
echo EMAIL_FROM=noreply@yourdomain.com

:: 显示数据库初始化命令
echo.
echo 🗄️  数据库初始化命令:
echo # 在本地执行数据库迁移（需要先配置生产环境变量）
echo.
echo # 方法1: 直接执行
echo set DATABASE_URL=postgresql://admin:password@your-db-host:5432/admin_system
echo npx prisma db push
echo npx prisma db seed
echo.
echo # 方法2: 使用Docker
echo docker run --rm ^
echo   -e DATABASE_URL="postgresql://admin:password@your-db-host:5432/admin_system" ^
echo   -v %cd%:/app ^
echo   -w /app ^
echo   node:18-alpine ^
echo   sh -c "npm install && npx prisma db push && npx prisma db seed"

echo.
echo 🎉 部署准备工作完成！
echo.
echo 📖 详细部署指南请查看: DEPLOYMENT_GUIDE.md
echo 🌐 火山云控制台: https://console.volcengine.com/
echo.
pause 