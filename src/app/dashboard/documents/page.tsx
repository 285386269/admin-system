import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { DocumentManagement } from '@/components/documents/document-management'

export default async function DocumentsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">文档管理</h1>
          <p className="text-gray-600 mt-2">管理文档上传、分类和属性</p>
        </div>
        <DocumentManagement />
      </div>
    </DashboardLayout>
  )
} 