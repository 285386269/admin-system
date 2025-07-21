'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Plus, Search, Edit, Trash2, Users, FolderOpen } from 'lucide-react'

interface Group {
  id: string
  name: string
  description: string
  memberCount: number
  isActive: boolean
  createdAt: string
}

export function GroupManagement() {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: '开发团队',
      description: '负责系统开发和维护',
      memberCount: 8,
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: '测试团队',
      description: '负责质量保证和测试',
      memberCount: 5,
      isActive: true,
      createdAt: '2024-01-16'
    },
    {
      id: '3',
      name: '产品团队',
      description: '负责产品规划和设计',
      memberCount: 3,
      isActive: false,
      createdAt: '2024-01-17'
    }
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteGroup = (groupId: string) => {
    setGroups(groups.filter(group => group.id !== groupId))
    toast({
      title: '组删除成功',
      description: '组已从系统中移除',
    })
  }

  return (
    <div className="space-y-6">
      {/* 搜索和添加 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="搜索组..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          创建组
        </Button>
      </div>

      {/* 组列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <div key={group.id} className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FolderOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
                    <p className="text-sm text-gray-500">{group.description}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  group.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {group.isActive ? '活跃' : '禁用'}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{group.memberCount} 个成员</span>
                </div>
                <span>创建于 {group.createdAt}</span>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  编辑
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteGroup(group.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">没有找到组</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? '没有匹配的搜索结果' : '还没有创建任何组'}
          </p>
        </div>
      )}
    </div>
  )
} 