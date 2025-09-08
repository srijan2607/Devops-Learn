'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { 
  PenTool, 
  BarChart3, 
  Settings, 
  Users, 
  Target, 
  Brain, 
  Globe, 
  Calendar,
  FileText,
  TrendingUp,
  Menu,
  Search,
  Bell,
  Plus,
  Home,
  LayoutDashboard,
  MessageSquare
} from 'lucide-react'

const menuItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Content Generator',
    url: '/dashboard/generator',
    icon: PenTool,
  },
  {
    title: 'Content Strategy',
    url: '/dashboard/strategy',
    icon: Target,
  },
  {
    title: 'Analytics',
    url: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    title: 'Content Calendar',
    url: '/dashboard/calendar',
    icon: Calendar,
  },
  {
    title: 'AI Content Strategist',
    url: '/dashboard/ai-strategist',
    icon: Brain,
  },
]

const recentContent = [
  {
    title: '10 Ways to Improve Your SEO Strategy',
    type: 'Blog Post',
    status: 'Published',
    date: '2 hours ago',
    views: 1240,
    engagement: 8.5
  },
  {
    title: 'The Future of AI in Marketing',
    type: 'Blog Post',
    status: 'Draft',
    date: '1 day ago',
    views: 0,
    engagement: 0
  },
  {
    title: 'Product Launch Announcement',
    type: 'Social Media',
    status: 'Scheduled',
    date: '2 days ago',
    views: 0,
    engagement: 0
  },
  {
    title: 'Monthly Newsletter - October 2024',
    type: 'Email',
    status: 'Published',
    date: '3 days ago',
    views: 2850,
    engagement: 12.3
  }
]

const stats = [
  {
    title: 'Content Pieces',
    value: '47',
    change: '+12%',
    icon: FileText,
    color: 'text-blue-600'
  },
  {
    title: 'Total Views',
    value: '24.5K',
    change: '+23%',
    icon: TrendingUp,
    color: 'text-green-600'
  },
  {
    title: 'Engagement Rate',
    value: '8.2%',
    change: '+5%',
    icon: MessageSquare,
    color: 'text-purple-600'
  },
  {
    title: 'Active Brands',
    value: '3',
    change: '+1',
    icon: Users,
    color: 'text-orange-600'
  }
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <Sidebar className="border-r">
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">ContentCraft AI</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url} className="flex items-center space-x-3">
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">john@example.com</p>
              </div>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset>
          {/* Top Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button variant="ghost" size="sm">
                  <Bell className="w-5 h-5" />
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Content
                </Button>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change} from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Create content, analyze performance, or manage your brands
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button className="h-20 flex-col space-y-2" variant="outline">
                    <Brain className="w-6 h-6" />
                    <span>AI Strategist</span>
                  </Button>
                  <Button className="h-20 flex-col space-y-2" variant="outline">
                    <PenTool className="w-6 h-6" />
                    <span>Generate Content</span>
                  </Button>
                  <Button className="h-20 flex-col space-y-2" variant="outline">
                    <Target className="w-6 h-6" />
                    <span>Content Strategy</span>
                  </Button>
                  <Button className="h-20 flex-col space-y-2" variant="outline">
                    <BarChart3 className="w-6 h-6" />
                    <span>View Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Content</CardTitle>
                  <CardDescription>
                    Your latest content pieces and their performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentContent.map((content, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{content.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary">{content.type}</Badge>
                            <Badge 
                              variant={
                                content.status === 'Published' ? 'default' :
                                content.status === 'Draft' ? 'outline' : 'secondary'
                              }
                            >
                              {content.status}
                            </Badge>
                            <span className="text-sm text-gray-500">{content.date}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          {content.views > 0 && (
                            <>
                              <p className="text-sm font-medium">{content.views.toLocaleString()} views</p>
                              <p className="text-xs text-gray-500">{content.engagement}% engagement</p>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Performance</CardTitle>
                  <CardDescription>
                    Overview of your content metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Blog Posts</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Social Media</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Email Content</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Product Descriptions</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Pro Tip</h4>
                    <p className="text-sm text-blue-700">
                      Your blog posts are performing best! Consider creating more long-form content to boost your SEO rankings.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}