# 环境变量配置指南

## 📁 环境变量文件说明

### 保留的文件

1. **`env.example`** ✅
   - **用途**: 环境变量配置模板
   - **内容**: 包含所有必需的环境变量示例（无敏感信息）
   - **版本控制**: 提交到Git
   - **作用**: 指导开发者如何配置环境变量

### 需要创建的文件

2. **`.env.local`** ✅
   - **用途**: 本地开发环境配置
   - **内容**: 包含真实的数据库连接信息和密钥
   - **版本控制**: 被Git忽略（不提交）
   - **作用**: 本地开发使用

### 不需要的文件

3. **`.env`** ❌
   - 通常用于生产环境
   - 开发阶段不需要
   - 如果存在会被Git忽略

## 🚀 配置步骤

### 1. 创建本地环境变量文件

```bash
# 复制模板文件
cp env.example .env.local
```

### 2. 编辑 .env.local 文件

```bash
# 使用编辑器打开
code .env.local
# 或者
nano .env.local
```

### 3. 配置真实的环境变量

```env
# Database - 配置您的PostgreSQL数据库连接
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/admin_system"

# NextAuth - 生成安全的密钥
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here"

# Email (可选) - 如果需要邮件功能
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@yourdomain.com"
```

## 🔑 重要配置说明

### DATABASE_URL
```env
# 格式: postgresql://username:password@host:port/database
DATABASE_URL="postgresql://admin:password123@localhost:5432/admin_system"
```

### NEXTAUTH_SECRET
```bash
# 生成安全的密钥
openssl rand -base64 32
# 或者使用在线生成器
# https://generate-secret.vercel.app/32
```

### 数据库配置示例

#### PostgreSQL (推荐)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/admin_system"
```

#### SQLite (开发测试)
```env
DATABASE_URL="file:./dev.db"
```

## 🔒 安全注意事项

1. **永远不要提交敏感信息**
   - `.env.local` 文件已被Git忽略
   - 不要在 `env.example` 中包含真实密码

2. **生产环境配置**
   - 生产环境使用环境变量或密钥管理服务
   - 不要使用 `.env.local` 文件

3. **密钥管理**
   - 使用强密码和密钥
   - 定期轮换密钥
   - 不同环境使用不同密钥

## 🛠️ 验证配置

### 1. 检查环境变量是否加载

```bash
# 在项目根目录运行
node -e "console.log(process.env.DATABASE_URL)"
```

### 2. 测试数据库连接

```bash
# 运行数据库迁移
npm run db:push

# 运行种子脚本
npm run db:seed
```

### 3. 启动应用

```bash
npm run dev
```

访问 http://localhost:3000 验证配置是否正确。

## 📋 环境变量列表

| 变量名 | 必需 | 说明 | 示例 |
|--------|------|------|------|
| `DATABASE_URL` | ✅ | 数据库连接字符串 | `postgresql://user:pass@localhost:5432/db` |
| `NEXTAUTH_URL` | ✅ | 应用URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | ✅ | NextAuth密钥 | `your-secret-key` |
| `EMAIL_SERVER_HOST` | ❌ | 邮件服务器主机 | `smtp.gmail.com` |
| `EMAIL_SERVER_PORT` | ❌ | 邮件服务器端口 | `587` |
| `EMAIL_SERVER_USER` | ❌ | 邮件服务器用户名 | `your-email@gmail.com` |
| `EMAIL_SERVER_PASSWORD` | ❌ | 邮件服务器密码 | `your-app-password` |
| `EMAIL_FROM` | ❌ | 发件人邮箱 | `noreply@yourdomain.com` |

## 🚨 常见问题

### Q: 为什么看不到 .env.local 文件？
A: 该文件被Git忽略，需要手动创建。

### Q: 环境变量不生效怎么办？
A: 检查文件名是否正确，重启开发服务器。

### Q: 数据库连接失败？
A: 检查DATABASE_URL格式和数据库服务是否运行。

### Q: NextAuth错误？
A: 确保NEXTAUTH_SECRET已正确设置。

---

按照以上步骤配置环境变量，您的项目就可以正常运行了！🎉 