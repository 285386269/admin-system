'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Plus, Search, Edit, Trash2, Download, FileText, Folder, Calendar } from 'lucide-react'

interface Document {
  id: string
  title: string
  category: string
  author: string
  fileSize: string
  uploadDate: string
  isActive: boolean
}

export function DocumentManagement() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      title: '系统设计文档.pdf',
      category: '技术文档',
      author: '张三',
      fileSize: '2.5 MB',
      uploadDate: '2024-01-15',
      isActive: true
    },
    {
      id: '2',
      title: '用户手册.docx',
      category: '用户文档',
      author: '李四',
      fileSize: '1.8 MB',
      uploadDate: '2024-01-16',
      isActive: true
    },
    {
      id: '3',
      title: '项目计划.xlsx',
      category: '项目管理',
      author: '王五',
      fileSize: '856 KB',
      uploadDate: '2024-01-17',
      isActive: false
    }
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { toast } = useToast()

  const categories = ['all', '技术文档', '用户文档', '项目管理', '其他']

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDeleteDocument = (docId: string) => {
    setDocuments(documents.filter(doc => doc.id !== docId))
    toast({
      title: '文档删除成功',
      description: '文档已从系统中移除',
    })
  }

  const getFileIcon = (title: string) => {
    const extension = title.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />
      case 'docx':
        return <FileText className="h-6 w-6 text-blue-500" />
      case 'xlsx':
        return <FileText className="h-6 w-6 text-green-500" />
      default:
        return <FileText className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* 搜索和过滤 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="搜索文档..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? '所有分类' : category}
            </option>
          ))}
        </select>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          上传文档
        </Button>
      </div>

      {/* 文档列表 */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">文档列表</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  文档
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  分类
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  作者
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  大小
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  上传时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {getFileIcon(doc.title)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doc.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.fileSize}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.uploadDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      doc.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {doc.isActive ? '可用' : '禁用'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">没有找到文档</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || selectedCategory !== 'all' ? '没有匹配的搜索结果' : '还没有上传任何文档'}
          </p>
        </div>
      )}
    </div>
  )
} 