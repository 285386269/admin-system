const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function setupDatabase() {
  try {
    console.log('🔧 开始设置数据库...')
    
    // 创建默认管理员用户
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        name: '系统管理员',
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
      },
    })

    console.log('✅ 默认管理员用户创建成功!')
    console.log('📧 邮箱: admin@example.com')
    console.log('🔑 密码: admin123')
    console.log('👤 角色: ADMIN')
    console.log('')
    console.log('现在你可以使用以上信息登录系统了！')
    
  } catch (error) {
    console.error('❌ 设置数据库失败:', error.message)
    
    if (error.message.includes('connect')) {
      console.log('💡 提示: 请确保 PostgreSQL 服务正在运行，并且环境变量 DATABASE_URL 配置正确')
      console.log('📝 请检查 .env.local 文件中的数据库连接字符串')
    }
  } finally {
    await prisma.$disconnect()
  }
}

setupDatabase() 