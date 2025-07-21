import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { LoginForm } from '@/components/auth/login-form'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              管理系统
            </h1>
            <p className="text-gray-600">
              现代化的管理平台
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
} 