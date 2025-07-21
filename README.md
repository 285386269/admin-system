# 管理系统

一个现代化的管理系统，基于 Next.js 14 构建，包含用户管理、组管理、文档管理、数据源管理等功能。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **数据库**: PostgreSQL + Prisma
- **认证**: NextAuth.js
- **UI组件**: Radix UI + Shadcn/ui
- **表单**: React Hook Form + Zod
- **图标**: Lucide React

## 功能特性

### 核心模块
- ✅ 用户管理 - 用户注册、登录、权限管理
- ✅ 组管理 - 用户分组、权限分配
- ✅ 文档管理 - 文档上传、分类、属性管理
- ✅ 数据源管理 - 多种数据库连接管理
- ✅ 系统设置 - 系统配置管理

### 技术特性
- 🔐 安全的身份认证系统
- 📱 响应式设计，支持移动端
- 🎨 现代化的UI设计
- ⚡ 高性能的SSR/SSG
- 🔧 完整的TypeScript支持
- 📊 实时数据统计
- 🚀 易于部署到火山云

## 快速开始

### 环境要求

- Node.js 18+ 
- PostgreSQL 数据库
- npm 或 yarn

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd admin-management-system
```

2. **安装依赖**
```bash
npm install
```

3. **环境配置**
```bash
cp env.example .env.local
```

编辑 `.env.local` 文件，配置数据库连接：
```env
DATABASE_URL="postgresql://username:password@localhost:5432/admin_system"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

4. **数据库设置**
```bash
# 生成Prisma客户端
npm run db:generate

# 推送数据库schema
npm run db:push
```

5. **启动开发服务器**
```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API路由
│   ├── dashboard/         # 仪表板页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React组件
│   ├── auth/             # 认证相关组件
│   ├── layout/           # 布局组件
│   └── ui/               # UI基础组件
├── lib/                  # 工具库
│   ├── auth.ts           # 认证配置
│   ├── prisma.ts         # Prisma客户端
│   └── utils.ts          # 工具函数
└── hooks/                # 自定义Hooks
```

## 部署到火山云

### 1. 准备部署文件

创建 `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### 2. 火山云部署步骤

1. 在火山云控制台创建PostgreSQL数据库实例
2. 配置环境变量，包含数据库连接信息
3. 上传代码或连接Git仓库
4. 设置构建命令：`npm run build`
5. 设置启动命令：`npm start`
6. 配置域名和SSL证书

### 3. 环境变量配置

在火山云控制台配置以下环境变量：
- `DATABASE_URL`: PostgreSQL连接字符串
- `NEXTAUTH_URL`: 应用访问地址
- `NEXTAUTH_SECRET`: 随机生成的密钥

## 开发指南

### 添加新功能

1. 在 `prisma/schema.prisma` 中定义数据模型
2. 运行 `npm run db:push` 更新数据库
3. 创建API路由处理业务逻辑
4. 创建React组件实现UI界面
5. 添加路由配置和导航

### 代码规范

- 使用TypeScript进行类型检查
- 遵循ESLint规则
- 组件使用函数式组件和Hooks
- 使用Tailwind CSS进行样式设计

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

如有问题或建议，请通过以下方式联系：

- 邮箱: your-email@example.com
- 项目地址: https://github.com/your-username/admin-management-system

---

**注意**: 这是一个示例项目，生产环境使用前请确保：
- 更改默认密码和密钥
- 配置适当的数据库连接
- 设置正确的环境变量
- 配置防火墙和安全策略 