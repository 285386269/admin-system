'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Plus, Search, Edit, Trash2, Database, Wifi, WifiOff, Settings } from 'lucide-react'

interface DataSource {
  id: string
  name: string
  type: string
  host: string
  port: number
  database: string
  isActive: boolean
  lastConnected: string
}

export function DataSourceManagement() {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: '1',
      name: '主数据库',
      type: 'PostgreSQL',
      host: 'localhost',
      port: 5432,
      database: 'admin_system',
      isActive: true,
      lastConnected: '2024-01-15 10:30'
    },
    {
      id: '2',
      name: '缓存数据库',
      type: 'Redis',
      host: 'localhost',
      port: 6379,
      database: 'cache',
      isActive: true,
      lastConnected: '2024-01-15 10:25'
    },
    {
      id: '3',
      name: '日志数据库',
      type: 'MySQL',
      host: '192.168.1.100',
      port: 3306,
      database: 'logs',
      isActive: false,
      lastConnected: '2024-01-14 15:20'
    }
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const filteredDataSources = dataSources.filter(ds =>
    ds.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ds.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteDataSource = (dsId: string) => {
    setDataSources(dataSources.filter(ds => ds.id !== dsId))
    toast({
      title: '数据源删除成功',
      description: '数据源已从系统中移除',
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'postgresql':
        return <Database className="h-6 w-6 text-blue-500" />
      case 'mysql':
        return <Database className="h-6 w-6 text-orange-500" />
      case 'redis':
        return <Database className="h-6 w-6 text-red-500" />
      default:
        return <Database className="h-6 w-6 text-gray-500" />
    }
  }

  const getConnectionStatus = (isActive: boolean) => {
    return isActive ? (
      <div className="flex items-center text-green-600">
        <Wifi className="h-4 w-4 mr-1" />
        <span className="text-sm">已连接</span>
      </div>
    ) : (
      <div className="flex items-center text-red-600">
        <WifiOff className="h-4 w-4 mr-1" />
        <span className="text-sm">未连接</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 搜索和添加 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="搜索数据源..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          添加数据源
        </Button>
      </div>

      {/* 数据源列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDataSources.map((ds) => (
          <div key={ds.id} className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getTypeIcon(ds.type)}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">{ds.name}</h3>
                    <p className="text-sm text-gray-500">{ds.type}</p>
                  </div>
                </div>
                {getConnectionStatus(ds.isActive)}
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>主机:</span>
                  <span className="font-mono">{ds.host}</span>
                </div>
                <div className="flex justify-between">
                  <span>端口:</span>
                  <span className="font-mono">{ds.port}</span>
                </div>
                <div className="flex justify-between">
                  <span>数据库:</span>
                  <span className="font-mono">{ds.database}</span>
                </div>
                <div className="flex justify-between">
                  <span>最后连接:</span>
                  <span>{ds.lastConnected}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="h-4 w-4 mr-1" />
                  配置
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteDataSource(ds.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDataSources.length === 0 && (
        <div className="text-center py-12">
          <Database className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">没有找到数据源</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? '没有匹配的搜索结果' : '还没有配置任何数据源'}
          </p>
        </div>
      )}
    </div>
  )
} 