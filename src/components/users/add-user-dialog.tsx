'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { X, UserPlus } from 'lucide-react'

// 表单验证schema
const addUserSchema = z.object({
  name: z.string().min(2, '姓名至少2个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少6个字符'),
  role: z.enum(['ADMIN', 'MANAGER', 'USER']),
})

type AddUserFormData = z.infer<typeof addUserSchema>

interface AddUserDialogProps {
  isOpen: boolean
  onClose: () => void
  onUserAdded: () => void
}

export function AddUserDialog({ isOpen, onClose, onUserAdded }: AddUserDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      role: 'USER'
    }
  })

  const onSubmit = async (data: AddUserFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || '创建用户失败')
      }

      toast({
        title: '用户创建成功',
        description: `用户 ${data.name} 已成功添加到系统`,
      })

      reset()
      onUserAdded()
      onClose()
    } catch (error) {
      toast({
        title: '创建用户失败',
        description: error instanceof Error ? error.message : '请稍后重试',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <UserPlus className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">添加新用户</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <Label htmlFor="name">姓名</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="请输入用户姓名"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="请输入邮箱地址"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password">密码</Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              placeholder="请输入密码"
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="role">角色</Label>
            <select
              id="role"
              {...register('role')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USER">用户</option>
              <option value="MANAGER">经理</option>
              <option value="ADMIN">管理员</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              取消
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? '创建中...' : '创建用户'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 