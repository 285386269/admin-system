# 火山云部署指南

## 🎯 部署概述

本指南将帮助您将管理系统部署到火山云平台，包括数据库配置、应用部署和域名设置。

## 📋 部署前准备

### 1. 火山云账户
- 注册火山云账户
- 完成实名认证
- 充值账户余额

### 2. 域名准备（可选）
- 购买域名
- 完成域名备案（中国大陆）

## 🚀 部署步骤

### 第一步：数据库配置

#### 1.1 创建PostgreSQL数据库实例

1. **登录火山云控制台**
   - 访问 https://console.volcengine.com/
   - 使用您的账户登录

2. **创建数据库实例**
   ```
   产品服务 → 数据库 → PostgreSQL → 创建实例
   ```

3. **配置数据库参数**
   ```
   实例名称: admin-system-db
   版本: PostgreSQL 14
   规格: 2核4GB（开发环境）
   存储: 100GB SSD
   网络: 私有网络
   端口: 5432
   ```

4. **设置数据库账户**
   ```
   管理员账户: admin
   密码: [设置强密码]
   数据库名: admin_system
   ```

5. **配置安全组**
   ```
   允许来源: 0.0.0.0/0（或限制到应用服务器IP）
   端口: 5432
   协议: TCP
   ```

#### 1.2 获取数据库连接信息

部署完成后，记录以下信息：
```
主机地址: [数据库实例IP]
端口: 5432
数据库名: admin_system
用户名: admin
密码: [您设置的密码]
```

### 第二步：应用部署

#### 2.1 准备代码仓库

1. **创建Git仓库**
   ```bash
   # 在项目根目录
   git init
   git add .
   git commit -m "Initial commit"
   
   # 推送到GitHub/GitLab
   git remote add origin https://github.com/your-username/admin-system.git
   git push -u origin main
   ```

2. **确保代码完整性**
   ```bash
   # 检查必要文件
   ls -la
   # 应该包含：
   # - package.json
   # - Dockerfile
   # - next.config.js
   # - prisma/schema.prisma
   ```

#### 2.2 火山云应用部署

1. **创建应用**
   ```
   产品服务 → 应用服务 → 应用引擎 → 创建应用
   ```

2. **配置应用信息**
   ```
   应用名称: admin-management-system
   部署方式: 代码仓库
   仓库地址: https://github.com/your-username/admin-system.git
   分支: main
   ```

3. **配置构建参数**
   ```
   构建命令: npm run build
   启动命令: npm start
   端口: 3000
   ```

4. **配置环境变量**
   ```
   DATABASE_URL=postgresql://admin:password@your-db-host:5432/admin_system
   NEXTAUTH_URL=https://your-domain.com
   NEXTAUTH_SECRET=your-production-secret-key
   NODE_ENV=production
   ```

#### 2.3 高级配置

1. **资源配置**
   ```
   CPU: 1核
   内存: 2GB
   实例数: 2（高可用）
   ```

2. **自动扩缩容**
   ```
   最小实例数: 1
   最大实例数: 5
   CPU使用率阈值: 70%
   内存使用率阈值: 80%
   ```

### 第三步：域名和SSL配置

#### 3.1 域名解析

1. **添加域名解析**
   ```
   记录类型: CNAME
   主机记录: admin
   记录值: [应用域名]
   ```

2. **等待解析生效**
   - 通常需要5-10分钟
   - 使用 `nslookup admin.yourdomain.com` 验证

#### 3.2 SSL证书配置

1. **申请SSL证书**
   ```
   产品服务 → 证书服务 → SSL证书 → 申请证书
   ```

2. **配置证书**
   ```
   域名: admin.yourdomain.com
   证书类型: 免费证书
   验证方式: DNS验证
   ```

3. **绑定到应用**
   ```
   应用引擎 → 应用 → 域名管理 → 绑定证书
   ```

### 第四步：数据库初始化

#### 4.1 连接数据库

1. **使用数据库客户端连接**
   ```bash
   # 使用psql连接
   psql -h your-db-host -p 5432 -U admin -d admin_system
   ```

2. **或使用火山云控制台**
   ```
   数据库 → PostgreSQL → 实例 → 连接管理
   ```

#### 4.2 运行数据库迁移

1. **在本地运行迁移**
   ```bash
   # 设置生产环境变量
   export DATABASE_URL="postgresql://admin:password@your-db-host:5432/admin_system"
   
   # 运行迁移
   npx prisma db push
   
   # 运行种子脚本
   npx prisma db seed
   ```

2. **或使用Docker执行**
   ```bash
   # 创建临时容器执行迁移
   docker run --rm \
     -e DATABASE_URL="postgresql://admin:password@your-db-host:5432/admin_system" \
     -v $(pwd):/app \
     -w /app \
     node:18-alpine \
     sh -c "npm install && npx prisma db push && npx prisma db seed"
   ```

## 🔧 部署后配置

### 1. 验证部署

1. **检查应用状态**
   ```
   应用引擎 → 应用 → 实例列表
   确保所有实例状态为"运行中"
   ```

2. **测试应用访问**
   ```bash
   # 测试首页
   curl https://admin.yourdomain.com
   
   # 测试API
   curl https://admin.yourdomain.com/api/users
   ```

3. **检查日志**
   ```
   应用引擎 → 应用 → 日志管理
   查看应用运行日志和错误日志
   ```

### 2. 性能优化

1. **启用CDN**
   ```
   产品服务 → CDN → 创建加速域名
   源站: admin.yourdomain.com
   加速区域: 中国大陆
   ```

2. **配置缓存策略**
   ```
   静态资源缓存: 7天
   API缓存: 不缓存
   图片缓存: 30天
   ```

### 3. 监控告警

1. **设置监控**
   ```
   产品服务 → 监控服务 → 云监控
   添加应用监控
   配置CPU、内存、网络监控
   ```

2. **配置告警**
   ```
   告警规则:
   - CPU使用率 > 80%
   - 内存使用率 > 85%
   - 响应时间 > 5秒
   ```

## 🔒 安全配置

### 1. 网络安全

1. **配置安全组**
   ```
   入站规则:
   - HTTP (80): 0.0.0.0/0
   - HTTPS (443): 0.0.0.0/0
   - SSH (22): 您的IP地址
   ```

2. **启用WAF**
   ```
   产品服务 → 安全服务 → WAF
   防护模式: 拦截模式
   防护规则: 默认规则集
   ```

### 2. 数据安全

1. **数据库备份**
   ```
   数据库 → PostgreSQL → 备份管理
   自动备份: 每日
   保留时间: 7天
   ```

2. **应用备份**
   ```
   应用引擎 → 应用 → 版本管理
   定期创建应用快照
   ```

## 📊 成本估算

### 月度成本（人民币）

| 服务 | 规格 | 月费用 |
|------|------|--------|
| PostgreSQL | 2核4GB | ¥200-300 |
| 应用引擎 | 1核2GB × 2实例 | ¥100-150 |
| CDN | 按流量计费 | ¥50-100 |
| 域名 | 年费 | ¥50-100/年 |
| SSL证书 | 免费 | ¥0 |
| **总计** | | **¥400-650/月** |

## 🚨 故障排除

### 常见问题

1. **应用无法启动**
   ```bash
   # 检查环境变量
   # 检查数据库连接
   # 查看应用日志
   ```

2. **数据库连接失败**
   ```bash
   # 检查安全组配置
   # 验证数据库密码
   # 确认网络连通性
   ```

3. **域名无法访问**
   ```bash
   # 检查DNS解析
   # 验证SSL证书
   # 确认应用状态
   ```

### 日志查看

```bash
# 应用日志
火山云控制台 → 应用引擎 → 应用 → 日志管理

# 数据库日志
火山云控制台 → 数据库 → PostgreSQL → 日志管理
```

## 📞 技术支持

### 火山云支持
- 官方文档: https://www.volcengine.com/docs/
- 技术支持: 400-059-0000
- 在线客服: 控制台右下角

### 项目支持
- 查看项目日志
- 检查环境变量配置
- 验证数据库连接

---

按照以上步骤，您的管理系统就可以成功部署到火山云了！🎉

**部署完成后，您可以通过以下地址访问系统：**
- 应用地址: https://admin.yourdomain.com
- 管理后台: https://admin.yourdomain.com/dashboard 