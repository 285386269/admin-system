import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('开始初始化数据库...')

  // 检查是否已存在管理员用户
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@example.com' }
  })

  if (!existingAdmin) {
    // 创建管理员用户
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const adminUser = await prisma.user.create({
      data: {
        name: '系统管理员',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
      }
    })

    console.log('✅ 管理员用户创建成功:', adminUser.email)
  } else {
    console.log('ℹ️ 管理员用户已存在:', existingAdmin.email)
  }

  // 创建一些示例用户
  const sampleUsers = [
    {
      name: '张三',
      email: 'zhangsan@example.com',
      password: 'password123',
      role: 'MANAGER' as const,
    },
    {
      name: '李四',
      email: 'lisi@example.com',
      password: 'password123',
      role: 'USER' as const,
    },
    {
      name: '王五',
      email: 'wangwu@example.com',
      password: 'password123',
      role: 'USER' as const,
    }
  ]

  for (const userData of sampleUsers) {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email }
    })

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(userData.password, 12)
      
      await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          role: userData.role,
          isActive: true,
        }
      })

      console.log(`✅ 示例用户创建成功: ${userData.email}`)
    } else {
      console.log(`ℹ️ 示例用户已存在: ${userData.email}`)
    }
  }

  // 创建示例组
  const sampleGroups = [
    {
      name: '开发团队',
      description: '负责系统开发和维护',
    },
    {
      name: '测试团队',
      description: '负责质量保证和测试',
    },
    {
      name: '产品团队',
      description: '负责产品规划和设计',
    }
  ]

  for (const groupData of sampleGroups) {
    const existingGroup = await prisma.group.findFirst({
      where: { name: groupData.name }
    })

    if (!existingGroup) {
      await prisma.group.create({
        data: groupData
      })

      console.log(`✅ 示例组创建成功: ${groupData.name}`)
    } else {
      console.log(`ℹ️ 示例组已存在: ${groupData.name}`)
    }
  }

  console.log('🎉 数据库初始化完成!')
  console.log('\n📋 登录信息:')
  console.log('管理员账户: admin@example.com / admin123')
  console.log('示例用户: zhangsan@example.com / password123')
}

main()
  .catch((e) => {
    console.error('❌ 数据库初始化失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 