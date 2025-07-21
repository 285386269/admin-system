'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Save, Settings, Shield, Database, Mail, Bell } from 'lucide-react'

export function SystemSettings() {
  const [settings, setSettings] = useState({
    siteName: '管理系统',
    siteDescription: '现代化的管理平台',
    adminEmail: 'admin@example.com',
    maxFileSize: '10',
    sessionTimeout: '30',
    enableNotifications: true,
    enableAuditLog: true,
    enableBackup: true
  })
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: '设置保存成功',
      description: '系统设置已更新',
    })
  }

  const handleInputChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="space-y-6">
      {/* 基本设置 */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <Settings className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">基本设置</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="siteName">网站名称</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="siteDescription">网站描述</Label>
              <Input
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="adminEmail">管理员邮箱</Label>
            <Input
              id="adminEmail"
              type="email"
              value={settings.adminEmail}
              onChange={(e) => handleInputChange('adminEmail', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* 安全设置 */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">安全设置</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="maxFileSize">最大文件大小 (MB)</Label>
              <Input
                id="maxFileSize"
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => handleInputChange('maxFileSize', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="sessionTimeout">会话超时时间 (分钟)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableAuditLog">启用审计日志</Label>
              <p className="text-sm text-gray-500">记录系统操作日志</p>
            </div>
            <input
              type="checkbox"
              id="enableAuditLog"
              checked={settings.enableAuditLog}
              onChange={(e) => handleInputChange('enableAuditLog', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* 通知设置 */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">通知设置</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableNotifications">启用系统通知</Label>
              <p className="text-sm text-gray-500">接收系统重要事件通知</p>
            </div>
            <input
              type="checkbox"
              id="enableNotifications"
              checked={settings.enableNotifications}
              onChange={(e) => handleInputChange('enableNotifications', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* 备份设置 */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <Database className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">备份设置</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableBackup">启用自动备份</Label>
              <p className="text-sm text-gray-500">定期备份系统数据</p>
            </div>
            <input
              type="checkbox"
              id="enableBackup"
              checked={settings.enableBackup}
              onChange={(e) => handleInputChange('enableBackup', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* 保存按钮 */}
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          保存设置
        </Button>
      </div>
    </div>
  )
} 