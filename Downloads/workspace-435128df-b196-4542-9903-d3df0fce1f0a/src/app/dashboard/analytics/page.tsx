'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer, 
  Share2,
  Download,
  Filter,
  Calendar,
  RefreshCw,
  Target,
  Zap,
  FileText,
  MessageSquare,
  Globe,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  DollarSign
} from 'lucide-react'

interface ContentPerformance {
  id: string
  title: string
  type: string
  views: number
  engagement: number
  shares: number
  clicks: number
  conversions: number
  revenue: number
  publishedAt: string
  trend: 'up' | 'down' | 'stable'
}

interface AnalyticsOverview {
  totalViews: number
  totalEngagement: number
  totalShares: number
  totalConversions: number
  totalRevenue: number
  avgEngagementRate: number
  topPerformingContent: string
  growthRate: number
}

interface TrafficSource {
  source: string
  visits: number
  percentage: number
  conversion: number
  trend: 'up' | 'down' | 'stable'
}

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('30d')
  const [selectedContentType, setSelectedContentType] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  const overview: AnalyticsOverview = {
    totalViews: 245680,
    totalEngagement: 8.2,
    totalShares: 3450,
    totalConversions: 1250,
    totalRevenue: 45670,
    avgEngagementRate: 8.2,
    topPerformingContent: '10 Ways to Improve Your SEO Strategy',
    growthRate: 23.5
  }

  const contentPerformance: ContentPerformance[] = [
    {
      id: '1',
      title: '10 Ways to Improve Your SEO Strategy',
      type: 'Blog Post',
      views: 12450,
      engagement: 12.3,
      shares: 234,
      clicks: 890,
      conversions: 45,
      revenue: 2340,
      publishedAt: '2024-01-15',
      trend: 'up'
    },
    {
      id: '2',
      title: 'The Future of AI in Marketing',
      type: 'Blog Post',
      views: 8900,
      engagement: 9.8,
      shares: 156,
      clicks: 567,
      conversions: 32,
      revenue: 1890,
      publishedAt: '2024-01-20',
      trend: 'up'
    },
    {
      id: '3',
      title: 'Product Launch Announcement',
      type: 'Social Media',
      views: 15600,
      engagement: 15.2,
      shares: 445,
      clicks: 1230,
      conversions: 78,
      revenue: 3450,
      publishedAt: '2024-01-25',
      trend: 'stable'
    },
    {
      id: '4',
      title: 'Monthly Newsletter - October 2024',
      type: 'Email',
      views: 6780,
      engagement: 18.5,
      shares: 89,
      clicks: 456,
      conversions: 67,
      revenue: 2890,
      publishedAt: '2024-01-30',
      trend: 'up'
    }
  ]

  const trafficSources: TrafficSource[] = [
    {
      source: 'Organic Search',
      visits: 45600,
      percentage: 45,
      conversion: 3.2,
      trend: 'up'
    },
    {
      source: 'Social Media',
      visits: 28900,
      percentage: 28,
      conversion: 2.8,
      trend: 'up'
    },
    {
      source: 'Direct',
      visits: 15600,
      percentage: 15,
      conversion: 4.1,
      trend: 'stable'
    },
    {
      source: 'Email',
      visits: 8900,
      percentage: 9,
      conversion: 5.2,
      trend: 'up'
    },
    {
      source: 'Referral',
      visits: 3450,
      percentage: 3,
      conversion: 2.1,
      trend: 'down'
    }
  ]

  const contentTypeStats = [
    { type: 'Blog Posts', count: 47, views: 124500, engagement: 9.2, color: 'bg-blue-500' },
    { type: 'Social Media', count: 156, views: 89600, engagement: 12.8, color: 'bg-purple-500' },
    { type: 'Email', count: 34, views: 45600, engagement: 15.6, color: 'bg-green-500' },
    { type: 'Ad Copy', count: 23, views: 34500, engagement: 8.9, color: 'bg-orange-500' },
    { type: 'Product Descriptions', count: 89, views: 67800, engagement: 7.4, color: 'bg-red-500' }
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="w-4 h-4 text-green-600" />
      case 'down':
        return <ArrowDownRight className="w-4 h-4 text-red-600" />
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const formatCurrency = (num: number) => {
    return '$' + num.toLocaleString()
  }

  const refreshData = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
              <p className="text-gray-600">Track your content performance and gain insights</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedContentType} onValueChange={setSelectedContentType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Content</SelectItem>
                  <SelectItem value="blog">Blog Posts</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="ad">Ad Copy</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={refreshData} disabled={isLoading}>
                {isLoading ? (
                  <div className="w-4 h-4 mr-2 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Refresh
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(overview.totalViews)}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  {getTrendIcon('up')}
                  +{overview.growthRate}% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overview.totalEngagement}%</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  {getTrendIcon('up')}
                  +2.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overview.totalConversions}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  {getTrendIcon('up')}
                  +15.3% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(overview.totalRevenue)}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  {getTrendIcon('up')}
                  +18.7% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content Performance</TabsTrigger>
              <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Content Type Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Content Type Performance</CardTitle>
                  <CardDescription>
                    Performance breakdown by content type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contentTypeStats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-4 h-4 ${stat.color} rounded`}></div>
                          <div>
                            <p className="font-medium">{stat.type}</p>
                            <p className="text-sm text-gray-500">{stat.count} pieces</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <p className="font-medium">{formatNumber(stat.views)}</p>
                            <p className="text-sm text-gray-500">views</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{stat.engagement}%</p>
                            <p className="text-sm text-gray-500">engagement</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Traffic Sources */}
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>
                    Where your audience is coming from
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trafficSources.map((source, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <Globe className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium">{source.source}</p>
                            <p className="text-sm text-gray-500">{source.percentage}% of traffic</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium">{formatNumber(source.visits)}</p>
                            <p className="text-sm text-gray-500">visits</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{source.conversion}%</p>
                            <p className="text-sm text-gray-500">conversion</p>
                          </div>
                          <div className="flex items-center">
                            {getTrendIcon(source.trend)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Performance</CardTitle>
                  <CardDescription>
                    Detailed performance metrics for each piece of content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Content</th>
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Views</th>
                          <th className="text-left p-2">Engagement</th>
                          <th className="text-left p-2">Shares</th>
                          <th className="text-left p-2">Conversions</th>
                          <th className="text-left p-2">Revenue</th>
                          <th className="text-left p-2">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contentPerformance.map((content) => (
                          <tr key={content.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">
                              <div>
                                <p className="font-medium">{content.title}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(content.publishedAt).toLocaleDateString()}
                                </p>
                              </div>
                            </td>
                            <td className="p-2">
                              <Badge variant="outline">{content.type}</Badge>
                            </td>
                            <td className="p-2">{formatNumber(content.views)}</td>
                            <td className="p-2">
                              <div className="flex items-center space-x-2">
                                <span>{content.engagement}%</span>
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-green-600 h-2 rounded-full" 
                                    style={{ width: `${content.engagement * 5}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="p-2">{formatNumber(content.shares)}</td>
                            <td className="p-2">{content.conversions}</td>
                            <td className="p-2">{formatCurrency(content.revenue)}</td>
                            <td className="p-2">
                              <div className="flex items-center">
                                {getTrendIcon(content.trend)}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="traffic" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Overview</CardTitle>
                    <CardDescription>
                      Comprehensive traffic analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trafficSources.map((source, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <Globe className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium">{source.source}</p>
                              <p className="text-sm text-gray-500">{source.percentage}% share</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-right">
                              <p className="font-medium">{formatNumber(source.visits)}</p>
                              <p className="text-sm text-gray-500">visits</p>
                            </div>
                            <div className="flex items-center">
                              {getTrendIcon(source.trend)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Conversion by Source</CardTitle>
                    <CardDescription>
                      Conversion rates for each traffic source
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trafficSources.map((source, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{source.source}</span>
                            <span className="text-sm font-bold">{source.conversion}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${source.conversion * 10}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                    <CardDescription>
                      Important findings from your content data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Top Performing Content</h4>
                        <p className="text-sm text-blue-700">
                          "{overview.topPerformingContent}" is your best-performing content with the highest engagement rate.
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-2">Growth Opportunity</h4>
                        <p className="text-sm text-green-700">
                          Email content shows the highest conversion rate at 5.2%. Consider increasing email marketing efforts.
                        </p>
                      </div>
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <h4 className="font-medium text-yellow-900 mb-2">Traffic Source</h4>
                        <p className="text-sm text-yellow-700">
                          Organic search drives 45% of your traffic. Focus on SEO to maintain this growth.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                    <CardDescription>
                      AI-powered suggestions to improve your content strategy
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Zap className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Increase Email Content</h4>
                          <p className="text-sm text-gray-600">
                            Your email content has the highest engagement rate. Create more email campaigns.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Target className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Optimize for SEO</h4>
                          <p className="text-sm text-gray-600">
                            Focus on long-tail keywords to improve organic search traffic.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Leverage Social Media</h4>
                          <p className="text-sm text-gray-600">
                            Social media traffic is growing. Increase posting frequency on top platforms.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}