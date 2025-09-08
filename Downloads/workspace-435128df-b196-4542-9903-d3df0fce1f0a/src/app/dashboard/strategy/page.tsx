'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Search, 
  TrendingUp, 
  Target, 
  Brain, 
  Calendar, 
  BarChart3,
  Lightbulb,
  Zap,
  Filter,
  Download,
  RefreshCw,
  Plus,
  ExternalLink,
  Eye,
  Star,
  Clock,
  Users,
  Globe,
  Hash,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

interface Topic {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  searchVolume: number
  competition: 'low' | 'medium' | 'high'
  trend: 'up' | 'down' | 'stable'
  score: number
  keywords: string[]
  suggestedContentTypes: string[]
}

interface Keyword {
  id: string
  keyword: string
  volume: number
  difficulty: number
  opportunity: number
  trend: 'up' | 'down' | 'stable'
  cpc: number
  competition: number
}

interface CompetitorContent {
  id: string
  title: string
  url: string
  domain: string
  traffic: number
  keywords: number
  publishedAt: string
  engagement: number
}

export default function ContentStrategy() {
  const [activeTab, setActiveTab] = useState('topics')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('technology')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const topics: Topic[] = [
    {
      id: '1',
      title: 'AI in Content Marketing',
      description: 'How artificial intelligence is transforming content creation and marketing strategies',
      difficulty: 'medium',
      searchVolume: 12000,
      competition: 'medium',
      trend: 'up',
      score: 85,
      keywords: ['AI marketing', 'content automation', 'machine learning'],
      suggestedContentTypes: ['blog', 'email', 'social']
    },
    {
      id: '2',
      title: 'SEO Best Practices 2024',
      description: 'Latest SEO techniques and strategies for better search engine rankings',
      difficulty: 'medium',
      searchVolume: 18000,
      competition: 'high',
      trend: 'up',
      score: 92,
      keywords: ['SEO tips', 'search optimization', 'google ranking'],
      suggestedContentTypes: ['blog', 'guide', 'video']
    },
    {
      id: '3',
      title: 'Content Personalization',
      description: 'Creating personalized content experiences for different audience segments',
      difficulty: 'hard',
      searchVolume: 8500,
      competition: 'low',
      trend: 'up',
      score: 78,
      keywords: ['personalization', 'user experience', 'segmentation'],
      suggestedContentTypes: ['blog', 'case-study', 'webinar']
    },
    {
      id: '4',
      title: 'Video Content Strategy',
      description: 'Building an effective video content strategy for social media and websites',
      difficulty: 'easy',
      searchVolume: 15000,
      competition: 'medium',
      trend: 'stable',
      score: 88,
      keywords: ['video marketing', 'content strategy', 'social video'],
      suggestedContentTypes: ['video', 'blog', 'social']
    }
  ]

  const keywords: Keyword[] = [
    {
      id: '1',
      keyword: 'content marketing strategy',
      volume: 22000,
      difficulty: 65,
      opportunity: 85,
      trend: 'up',
      cpc: 8.50,
      competition: 0.75
    },
    {
      id: '2',
      keyword: 'AI content creation',
      volume: 18000,
      difficulty: 45,
      opportunity: 92,
      trend: 'up',
      cpc: 12.30,
      competition: 0.60
    },
    {
      id: '3',
      keyword: 'SEO optimization',
      volume: 35000,
      difficulty: 78,
      opportunity: 70,
      trend: 'stable',
      cpc: 15.20,
      competition: 0.85
    },
    {
      id: '4',
      keyword: 'content calendar',
      volume: 12000,
      difficulty: 35,
      opportunity: 88,
      trend: 'up',
      cpc: 5.80,
      competition: 0.45
    },
    {
      id: '5',
      keyword: 'blog writing tips',
      volume: 28000,
      difficulty: 55,
      opportunity: 75,
      trend: 'stable',
      cpc: 7.20,
      competition: 0.65
    }
  ]

  const competitorContent: CompetitorContent[] = [
    {
      id: '1',
      title: 'The Ultimate Guide to Content Marketing in 2024',
      url: 'https://example.com/guide',
      domain: 'marketingblog.com',
      traffic: 45000,
      keywords: 125,
      publishedAt: '2024-01-15',
      engagement: 8.5
    },
    {
      id: '2',
      title: 'How AI is Revolutionizing Content Creation',
      url: 'https://example.com/ai-content',
      domain: 'techinsider.com',
      traffic: 32000,
      keywords: 89,
      publishedAt: '2024-01-20',
      engagement: 12.3
    },
    {
      id: '3',
      title: '10 SEO Strategies That Actually Work',
      url: 'https://example.com/seo-strategies',
      domain: 'seomaster.com',
      traffic: 67000,
      keywords: 156,
      publishedAt: '2024-01-10',
      engagement: 15.7
    }
  ]

  const analyzeMarket = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 300)

    try {
      await new Promise(resolve => setTimeout(resolve, 4000))
      setAnalysisProgress(100)
    } catch (error) {
      console.error('Error analyzing market:', error)
    } finally {
      setIsAnalyzing(false)
      clearInterval(progressInterval)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-50'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50'
      case 'hard':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

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

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'low':
        return 'text-green-600'
      case 'medium':
        return 'text-yellow-600'
      case 'high':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 border-r bg-white p-4 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Market Analysis</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="search">Search Topics</Label>
              <Input
                id="search"
                placeholder="Enter topic or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-1"
              />
            </div>

            <Button 
              onClick={analyzeMarket} 
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Analyze Market
                </>
              )}
            </Button>

            {isAnalyzing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Analyzing market trends...</span>
                  <span>{analysisProgress}%</span>
                </div>
                <Progress value={analysisProgress} className="w-full" />
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Insights</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Trending Topics</span>
              </div>
              <span className="text-lg font-bold text-blue-600">24</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Opportunity Score</span>
              </div>
              <span className="text-lg font-bold text-green-600">85%</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium">Target Audience</span>
              </div>
              <span className="text-lg font-bold text-purple-600">2.3M</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Strategy</h1>
            <p className="text-gray-600">
              Discover trending topics, analyze keywords, and develop data-driven content strategies
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="topics">Topic Ideas</TabsTrigger>
              <TabsTrigger value="keywords">Keyword Research</TabsTrigger>
              <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="topics" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {topics.map((topic) => (
                  <Card key={topic.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{topic.title}</CardTitle>
                          <CardDescription className="mt-2">
                            {topic.description}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(topic.trend)}
                          <Badge className={getDifficultyColor(topic.difficulty)}>
                            {topic.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Search Volume</p>
                            <p className="font-semibold">{topic.searchVolume.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Competition</p>
                            <p className={`font-semibold ${getCompetitionColor(topic.competition)}`}>
                              {topic.competition}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Topic Score</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={topic.score} className="flex-1" />
                            <span className="text-sm font-semibold">{topic.score}/100</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Keywords</p>
                          <div className="flex flex-wrap gap-1">
                            {topic.keywords.map((keyword, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Suggested Content Types</p>
                          <div className="flex flex-wrap gap-1">
                            {topic.suggestedContentTypes.map((type, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Content
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="keywords" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Keyword Research Results</CardTitle>
                  <CardDescription>
                    Discover high-opportunity keywords for your content strategy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Keyword</th>
                          <th className="text-left p-2">Volume</th>
                          <th className="text-left p-2">Difficulty</th>
                          <th className="text-left p-2">Opportunity</th>
                          <th className="text-left p-2">Trend</th>
                          <th className="text-left p-2">CPC</th>
                          <th className="text-left p-2">Competition</th>
                          <th className="text-left p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {keywords.map((keyword) => (
                          <tr key={keyword.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">
                              <div className="flex items-center space-x-2">
                                <Hash className="w-4 h-4 text-gray-400" />
                                <span className="font-medium">{keyword.keyword}</span>
                              </div>
                            </td>
                            <td className="p-2">{keyword.volume.toLocaleString()}</td>
                            <td className="p-2">
                              <div className="flex items-center space-x-2">
                                <Progress value={keyword.difficulty} className="w-16" />
                                <span className="text-sm">{keyword.difficulty}%</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="flex items-center space-x-2">
                                <Progress value={keyword.opportunity} className="w-16" />
                                <span className="text-sm">{keyword.opportunity}%</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="flex items-center space-x-1">
                                {getTrendIcon(keyword.trend)}
                              </div>
                            </td>
                            <td className="p-2">${keyword.cpc.toFixed(2)}</td>
                            <td className="p-2">
                              <div className="flex items-center space-x-2">
                                <Progress value={keyword.competition * 100} className="w-16" />
                                <span className="text-sm">{(keyword.competition * 100).toFixed(0)}%</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="flex space-x-1">
                                <Button size="sm" variant="outline">
                                  <Plus className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Eye className="w-3 h-3" />
                                </Button>
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
            
            <TabsContent value="competitors" className="mt-6">
              <div className="space-y-6">
                {competitorContent.map((content) => (
                  <Card key={content.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{content.title}</CardTitle>
                          <CardDescription className="mt-1">
                            <div className="flex items-center space-x-2">
                              <Globe className="w-4 h-4" />
                              <span>{content.domain}</span>
                              <ExternalLink className="w-4 h-4" />
                            </div>
                          </CardDescription>
                        </div>
                        <Badge variant="outline">
                          Published {new Date(content.publishedAt).toLocaleDateString()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Monthly Traffic</p>
                          <p className="font-semibold">{content.traffic.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Keywords</p>
                          <p className="font-semibold">{content.keywords}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Engagement</p>
                          <p className="font-semibold">{content.engagement}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Actions</p>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <BarChart3 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}