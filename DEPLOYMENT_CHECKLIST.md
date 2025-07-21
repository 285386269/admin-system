# 🚀 火山云部署检查清单

## 📋 部署前准备

### ✅ 账户准备
- [ ] 注册火山云账户
- [ ] 完成实名认证
- [ ] 充值账户余额（建议¥500以上）

### ✅ 域名准备（可选）
- [ ] 购买域名
- [ ] 完成域名备案（中国大陆）

### ✅ 代码准备
- [ ] 运行 `deploy.bat` 检查项目完整性
- [ ] 确保所有文件已提交到Git
- [ ] 推送到GitHub/GitLab仓库

## 🗄️ 数据库配置

### ✅ 创建PostgreSQL实例
- [ ] 登录火山云控制台
- [ ] 创建PostgreSQL数据库实例
- [ ] 配置数据库参数：
  - [ ] 实例名称：admin-system-db
  - [ ] 版本：PostgreSQL 14
  - [ ] 规格：2核4GB
  - [ ] 存储：100GB SSD
- [ ] 设置数据库账户和密码
- [ ] 配置安全组（开放5432端口）

### ✅ 记录数据库信息
- [ ] 主机地址：[数据库IP]
- [ ] 端口：5432
- [ ] 数据库名：admin_system
- [ ] 用户名：admin
- [ ] 密码：[您设置的密码]

## 🚀 应用部署

### ✅ 创建应用
- [ ] 进入应用引擎服务
- [ ] 创建新应用
- [ ] 配置应用信息：
  - [ ] 应用名称：admin-management-system
  - [ ] 部署方式：代码仓库
  - [ ] 仓库地址：[您的Git仓库地址]
  - [ ] 分支：main

### ✅ 配置构建参数
- [ ] 构建命令：`npm run build`
- [ ] 启动命令：`npm start`
- [ ] 端口：3000

### ✅ 配置环境变量
- [ ] `DATABASE_URL=postgresql://admin:password@your-db-host:5432/admin_system`
- [ ] `NEXTAUTH_URL=https://your-domain.com`
- [ ] `NEXTAUTH_SECRET=your-production-secret-key`
- [ ] `NODE_ENV=production`

### ✅ 资源配置
- [ ] CPU：1核
- [ ] 内存：2GB
- [ ] 实例数：2（高可用）

## 🌐 域名和SSL配置

### ✅ 域名解析
- [ ] 添加CNAME记录
- [ ] 主机记录：admin
- [ ] 记录值：[应用域名]
- [ ] 等待解析生效（5-10分钟）

### ✅ SSL证书
- [ ] 申请SSL证书
- [ ] 域名：admin.yourdomain.com
- [ ] 证书类型：免费证书
- [ ] 绑定到应用

## 🗄️ 数据库初始化

### ✅ 运行数据库迁移
- [ ] 方法1：本地执行
  ```bash
  set DATABASE_URL=postgresql://admin:password@your-db-host:5432/admin_system
  npx prisma db push
  npx prisma db seed
  ```
- [ ] 方法2：使用Docker
  ```bash
  docker run --rm -e DATABASE_URL="postgresql://admin:password@your-db-host:5432/admin_system" -v %cd%:/app -w /app node:18-alpine sh -c "npm install && npx prisma db push && npx prisma db seed"
  ```

## 🔧 部署后验证

### ✅ 应用状态检查
- [ ] 检查应用实例状态（运行中）
- [ ] 测试应用访问
- [ ] 检查应用日志

### ✅ 功能测试
- [ ] 访问首页：https://admin.yourdomain.com
- [ ] 测试登录功能
- [ ] 测试用户管理功能
- [ ] 测试其他模块功能

### ✅ 性能优化
- [ ] 启用CDN（可选）
- [ ] 配置缓存策略
- [ ] 设置监控告警

## 🔒 安全配置

### ✅ 网络安全
- [ ] 配置安全组规则
- [ ] 启用WAF（可选）
- [ ] 限制数据库访问IP

### ✅ 数据安全
- [ ] 配置数据库自动备份
- [ ] 定期创建应用快照
- [ ] 监控异常访问

## 📊 成本监控

### ✅ 成本估算
- [ ] PostgreSQL：¥200-300/月
- [ ] 应用引擎：¥100-150/月
- [ ] CDN：¥50-100/月
- [ ] 域名：¥50-100/年
- [ ] **总计：¥400-650/月**

### ✅ 监控设置
- [ ] 设置成本告警
- [ ] 监控资源使用率
- [ ] 配置性能监控

## 🚨 故障排除

### ✅ 常见问题检查
- [ ] 应用无法启动：检查环境变量和日志
- [ ] 数据库连接失败：检查安全组和密码
- [ ] 域名无法访问：检查DNS解析和SSL证书

### ✅ 日志查看
- [ ] 应用日志：控制台 → 应用引擎 → 应用 → 日志管理
- [ ] 数据库日志：控制台 → 数据库 → PostgreSQL → 日志管理

## 📞 技术支持

### ✅ 获取帮助
- [ ] 火山云官方文档：https://www.volcengine.com/docs/
- [ ] 技术支持：400-059-0000
- [ ] 在线客服：控制台右下角

---

## 🎯 快速部署命令

### 1. 本地准备
```bash
# 运行部署检查脚本
deploy.bat
```

### 2. 推送到Git仓库
```bash
git remote add origin https://github.com/your-username/admin-system.git
git push -u origin main
```

### 3. 数据库初始化
```bash
# 设置环境变量
set DATABASE_URL=postgresql://admin:password@your-db-host:5432/admin_system

# 运行迁移
npx prisma db push
npx prisma db seed
```

### 4. 验证部署
```bash
# 测试应用访问
curl https://admin.yourdomain.com
```

---

**部署完成后，您可以通过以下地址访问系统：**
- 🌐 应用地址：https://admin.yourdomain.com
- 🔐 管理后台：https://admin.yourdomain.com/dashboard
- 👤 默认管理员：admin@example.com / admin123

**祝您部署顺利！🎉** 