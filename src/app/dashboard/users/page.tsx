import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { UserManagement } from '@/components/users/user-management'

export default async function UsersPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">用户管理</h1>
          <p className="text-gray-600 mt-2">管理系统用户和权限</p>
        </div>
        <UserManagement />
      </div>
    </DashboardLayout>
  )
} 