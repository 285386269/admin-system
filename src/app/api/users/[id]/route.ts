import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 })
    }

    // 检查权限 - 只有管理员可以删除用户
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '权限不足' }, { status: 403 })
    }

    const userId = params.id

    // 检查用户是否存在
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      )
    }

    // 防止删除自己
    if (existingUser.id === session.user.id) {
      return NextResponse.json(
        { error: '不能删除自己的账户' },
        { status: 400 }
      )
    }

    // 删除用户
    await prisma.user.delete({
      where: { id: userId }
    })

    return NextResponse.json(
      { message: '用户删除成功' },
      { status: 200 }
    )
  } catch (error) {
    console.error('删除用户失败:', error)
    return NextResponse.json(
      { error: '删除用户失败' },
      { status: 500 }
    )
  }
} 