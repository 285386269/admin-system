import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { SystemSettings } from '@/components/settings/system-settings'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">系统设置</h1>
          <p className="text-gray-600 mt-2">管理系统配置和参数</p>
        </div>
        <SystemSettings />
      </div>
    </DashboardLayout>
  )
} 