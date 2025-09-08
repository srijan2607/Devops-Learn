'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  Sparkles, 
  Target, 
  Calendar, 
  TrendingUp,
  Zap,
  Lightbulb,
  BarChart3,
  Globe,
  Users,
  Hash,
  Clock,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Download,
  Share2,
  Filter,
  Search,
  Plus,
  ArrowRight,
  FileText,
  MessageSquare,
  Mail,
  Megaphone,
  ShoppingBag,
  Eye,
  MousePointer,
  DollarSign
} from 'lucide-react'

interface ContentStrategy {
  id: string
  prompt: string
  businessType: string
  targetAudience: string
  goals: string[]
  generatedAt: string
  status: 'generating' | 'completed' | 'error'
}

interface StrategyComponent {
  id: string
  type: 'topics' | 'keywords' | 'calendar' | 'persona' | 'kpi' | 'channels'
  title: string
  description: string
  data: any
  confidence: number
  priority: 'high' | 'medium' | 'low'
}

interface Topic {
  id: string
  title: string
  description: string
  contentType: string[]
  priority: number
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: string
  keywords: string[]
  searchVolume: number
  competition: 'low' | 'medium' | 'high'
}

interface ContentCalendar {
  id: string
  week: string
  content: CalendarItem[]
}

interface CalendarItem {
  id: string
  date: string
  title: string
  type: string
  platform: string
  status: 'planned' | 'in-progress' | 'published'
  priority: 'high' | 'medium' | 'low'
}

interface Keyword {
  id: string
  keyword: string
  volume: number
  difficulty: number
  opportunity: number
  intent: 'informational' | 'commercial' | 'transactional'
  suggestions: string[]
}

interface AudiencePersona {
  id: string
  name: string
  demographics: any
  painPoints: string[]
  goals: string[]
  preferredContent: string[]
  channels: string[]
}

interface KPI {
  id: string
  metric: string
  target: number
  timeframe: string
  current: number
  unit: string
}

interface ChannelStrategy {
  id: string
  channel: string
  focus: string
  contentType: string[]
  frequency: string
  budget: number
  expectedROI: number
}

export default function AIStrategistPage() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [currentStrategy, setCurrentStrategy] = useState<ContentStrategy | null>(null)
  const [strategyComponents, setStrategyComponents] = useState<StrategyComponent[]>([])
  const [activeTab, setActiveTab] = useState('overview')

  const sampleStrategies: ContentStrategy[] = [
    {
      id: '1',
      prompt: 'I run a sustainable fashion startup targeting eco-conscious millennials. I want to increase brand awareness and drive sales through content marketing.',
      businessType: 'Sustainable Fashion E-commerce',
      targetAudience: 'Eco-conscious millennials (25-40)',
      goals: ['Brand Awareness', 'Lead Generation', 'Sales Conversion'],
      generatedAt: '2024-01-30T10:30:00Z',
      status: 'completed'
    }
  ]

  const generateStrategy = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setGenerationProgress(0)
    setCurrentStrategy(null)
    setStrategyComponents([])

    // Simulate AI strategy generation with progress
    const progressSteps = [
      { progress: 10, message: 'Analyzing your business...' },
      { progress: 25, message: 'Researching target audience...' },
      { progress: 40, message: 'Identifying content opportunities...' },
      { progress: 55, message: 'Generating topic ideas...' },
      { progress: 70, message: 'Creating content calendar...' },
      { progress: 85, message: 'Analyzing keywords and trends...' },
      { progress: 100, message: 'Finalizing strategy...' }
    ]

    for (let i = 0; i < progressSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      setGenerationProgress(progressSteps[i].progress)
    }

    // Create the strategy
    const newStrategy: ContentStrategy = {
      id: Date.now().toString(),
      prompt,
      businessType: extractBusinessType(prompt),
      targetAudience: extractTargetAudience(prompt),
      goals: extractGoals(prompt),
      generatedAt: new Date().toISOString(),
      status: 'completed'
    }

    setCurrentStrategy(newStrategy)

    // Generate strategy components
    const components: StrategyComponent[] = [
      {
        id: '1',
        type: 'topics',
        title: 'Content Topics & Ideas',
        description: 'AI-generated content topics tailored to your business',
        data: generateTopics(prompt),
        confidence: 92,
        priority: 'high'
      },
      {
        id: '2',
        type: 'keywords',
        title: 'Keyword Strategy',
        description: 'High-value keywords and SEO opportunities',
        data: generateKeywords(prompt),
        confidence: 88,
        priority: 'high'
      },
      {
        id: '3',
        type: 'calendar',
        title: 'Content Calendar',
        description: '90-day content execution plan',
        data: generateCalendar(),
        confidence: 85,
        priority: 'medium'
      },
      {
        id: '4',
        type: 'persona',
        title: 'Audience Personas',
        description: 'Detailed target audience profiles',
        data: generatePersonas(prompt),
        confidence: 90,
        priority: 'high'
      },
      {
        id: '5',
        type: 'kpi',
        title: 'Success Metrics',
        description: 'Key performance indicators and targets',
        data: generateKPIs(),
        confidence: 87,
        priority: 'medium'
      },
      {
        id: '6',
        type: 'channels',
        title: 'Channel Strategy',
        description: 'Optimal content distribution channels',
        data: generateChannels(prompt),
        confidence: 89,
        priority: 'medium'
      }
    ]

    setStrategyComponents(components)
    setIsGenerating(false)
  }

  const extractBusinessType = (prompt: string): string => {
    const keywords = prompt.toLowerCase()
    if (keywords.includes('fashion') || keywords.includes('clothing')) return 'Fashion Retail'
    if (keywords.includes('saas') || keywords.includes('software')) return 'SaaS'
    if (keywords.includes('restaurant') || keywords.includes('food')) return 'Food & Beverage'
    if (keywords.includes('health') || keywords.includes('fitness')) return 'Health & Wellness'
    if (keywords.includes('education') || keywords.includes('learning')) return 'Education'
    return 'General Business'
  }

  const extractTargetAudience = (prompt: string): string => {
    const keywords = prompt.toLowerCase()
    if (keywords.includes('millennials')) return 'Millennials (25-40)'
    if (keywords.includes('gen z')) return 'Gen Z (18-24)'
    if (keywords.includes('business') || keywords.includes('b2b')) return 'Business Professionals'
    if (keywords.includes('parents') || keywords.includes('family')) return 'Parents & Families'
    return 'General Audience'
  }

  const extractGoals = (prompt: string): string[] => {
    const keywords = prompt.toLowerCase()
    const goals = []
    if (keywords.includes('awareness') || keywords.includes('brand')) goals.push('Brand Awareness')
    if (keywords.includes('sales') || keywords.includes('revenue')) goals.push('Sales Conversion')
    if (keywords.includes('lead') || keywords.includes('generation')) goals.push('Lead Generation')
    if (keywords.includes('engagement')) goals.push('Audience Engagement')
    if (keywords.includes('traffic')) goals.push('Website Traffic')
    return goals.length > 0 ? goals : ['Brand Awareness', 'Lead Generation']
  }

  const generateTopics = (prompt: string): Topic[] => {
    const businessType = extractBusinessType(prompt)
    const baseTopics = {
      'Fashion Retail': [
        {
          id: '1',
          title: 'Sustainable Fashion Trends 2024',
          description: 'Latest eco-friendly fashion trends and how to incorporate them',
          contentType: ['blog', 'social', 'video'],
          priority: 1,
          difficulty: 'medium',
          estimatedTime: '4-6 hours',
          keywords: ['sustainable fashion', 'eco-friendly clothing', 'green fashion'],
          searchVolume: 12000,
          competition: 'medium'
        },
        {
          id: '2',
          title: 'Building a Capsule Wardrobe',
          description: 'Guide to creating versatile, sustainable wardrobe essentials',
          contentType: ['blog', 'guide', 'email'],
          priority: 2,
          difficulty: 'easy',
          estimatedTime: '3-4 hours',
          keywords: ['capsule wardrobe', 'minimalist fashion', 'wardrobe essentials'],
          searchVolume: 8500,
          competition: 'low'
        }
      ],
      'SaaS': [
        {
          id: '1',
          title: 'AI Tools for Business Productivity',
          description: 'How AI is transforming workplace productivity and efficiency',
          contentType: ['blog', 'whitepaper', 'webinar'],
          priority: 1,
          difficulty: 'medium',
          estimatedTime: '5-7 hours',
          keywords: ['AI productivity', 'business automation', 'workplace AI'],
          searchVolume: 15000,
          competition: 'high'
        }
      ]
    }

    return baseTopics[businessType as keyof typeof baseTopics] || baseTopics['Fashion Retail']
  }

  const generateKeywords = (prompt: string): Keyword[] => {
    return [
      {
        id: '1',
        keyword: 'sustainable fashion tips',
        volume: 8500,
        difficulty: 45,
        opportunity: 88,
        intent: 'informational',
        suggestions: ['eco fashion advice', 'sustainable clothing tips', 'green fashion guide']
      },
      {
        id: '2',
        keyword: 'affordable eco-friendly brands',
        volume: 6200,
        difficulty: 38,
        opportunity: 92,
        intent: 'commercial',
        suggestions: ['budget sustainable fashion', 'affordable green brands', 'eco clothing deals']
      },
      {
        id: '3',
        keyword: 'capsule wardrobe guide',
        volume: 4800,
        difficulty: 32,
        opportunity: 85,
        intent: 'informational',
        suggestions: ['minimalist wardrobe', 'capsule wardrobe checklist', 'essential clothing items']
      }
    ]
  }

  const generateCalendar = (): ContentCalendar[] => {
    return [
      {
        id: '1',
        week: 'Week 1-4: Foundation',
        content: [
          {
            id: '1',
            date: '2024-02-05',
            title: 'Brand Story & Mission',
            type: 'Blog Post',
            platform: 'Website',
            status: 'planned',
            priority: 'high'
          },
          {
            id: '2',
            date: '2024-02-08',
            title: 'Behind the Scenes: Sustainable Production',
            type: 'Video',
            platform: 'Instagram',
            status: 'planned',
            priority: 'medium'
          }
        ]
      },
      {
        id: '2',
        week: 'Week 5-8: Education',
        content: [
          {
            id: '3',
            date: '2024-02-12',
            title: 'Sustainable Materials Guide',
            type: 'Blog Post',
            platform: 'Website',
            status: 'planned',
            priority: 'high'
          },
          {
            id: '4',
            date: '2024-02-15',
            title: 'How to Style Sustainable Pieces',
            type: 'Video',
            platform: 'YouTube',
            status: 'planned',
            priority: 'medium'
          }
        ]
      }
    ]
  }

  const generatePersonas = (prompt: string): AudiencePersona[] => {
    return [
      {
        id: '1',
        name: 'Eco-Emma',
        demographics: {
          age: '28-35',
          location: 'Urban areas',
          income: '$50k-$80k',
          education: 'College educated'
        },
        painPoints: [
          'Fast fashion environmental impact',
          'Difficulty finding sustainable options',
          'Higher cost of eco-friendly products'
        ],
        goals: [
          'Reduce environmental footprint',
          'Support ethical brands',
          'Look stylish while being eco-conscious'
        ],
        preferredContent: ['Blog posts', 'Instagram', 'Email newsletters'],
        channels: ['Instagram', 'Pinterest', 'Email']
      }
    ]
  }

  const generateKPIs = (): KPI[] => {
    return [
      {
        id: '1',
        metric: 'Website Traffic',
        target: 50000,
        timeframe: '3 months',
        current: 15000,
        unit: 'visitors/month'
      },
      {
        id: '2',
        metric: 'Social Media Engagement',
        target: 8,
        timeframe: '3 months',
        current: 3.2,
        unit: '% engagement rate'
      },
      {
        id: '3',
        metric: 'Lead Generation',
        target: 1000,
        timeframe: '3 months',
        current: 250,
        unit: 'leads/month'
      },
      {
        id: '4',
        metric: 'Conversion Rate',
        target: 3.5,
        timeframe: '3 months',
        current: 1.2,
        unit: '%'
      }
    ]
  }

  const generateChannels = (prompt: string): ChannelStrategy[] => {
    return [
      {
        id: '1',
        channel: 'Instagram',
        focus: 'Visual storytelling, behind-the-scenes, sustainable fashion tips',
        contentType: ['Reels', 'Stories', 'Carousels'],
        frequency: 'Daily posts, 3-5 Reels/week',
        budget: 2000,
        expectedROI: 350
      },
      {
        id: '2',
        channel: 'Blog',
        focus: 'Educational content, sustainable fashion guides, brand stories',
        contentType: ['Articles', 'Guides', 'Case studies'],
        frequency: '2-3 posts/week',
        budget: 1500,
        expectedROI: 280
      },
      {
        id: '3',
        channel: 'Email Newsletter',
        focus: 'Exclusive content, sustainability tips, product launches',
        contentType: ['Newsletters', 'Product updates', 'Exclusive offers'],
        frequency: 'Weekly',
        budget: 800,
        expectedROI: 420
      }
    ]
  }

  const getComponentIcon = (type: string) => {
    switch (type) {
      case 'topics': return <Lightbulb className="w-5 h-5" />
      case 'keywords': return <Hash className="w-5 h-5" />
      case 'calendar': return <Calendar className="w-5 h-5" />
      case 'persona': return <Users className="w-5 h-5" />
      case 'kpi': return <BarChart3 className="w-5 h-5" />
      case 'channels': return <Globe className="w-5 h-5" />
      default: return <Brain className="w-5 h-5" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600'
    if (confidence >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI Content Strategist</h1>
                <p className="text-gray-600">Generate a complete content strategy with a single prompt</p>
              </div>
            </div>
          </div>

          {/* AI Input Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Describe Your Content Needs</span>
              </CardTitle>
              <CardDescription>
                Tell our AI about your business, goals, and target audience. We'll generate a complete content strategy instantly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Example: I run a sustainable fashion startup targeting eco-conscious millennials. I want to increase brand awareness and drive sales through content marketing."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="text-base"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Zap className="w-4 h-4" />
                    <span>AI-powered strategy generation</span>
                  </div>
                  <Button 
                    onClick={generateStrategy} 
                    disabled={isGenerating || !prompt.trim()}
                    className="px-8"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Generate Strategy
                      </>
                    )}
                  </Button>
                </div>

                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Creating your content strategy...</span>
                      <span>{generationProgress}%</span>
                    </div>
                    <Progress value={generationProgress} className="w-full" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Strategy Results */}
          {currentStrategy && (
            <div className="space-y-6">
              {/* Strategy Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="w-5 h-5" />
                      <span>Strategy Overview</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-50 text-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Business Type</h3>
                      <p className="text-lg">{currentStrategy.businessType}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Target Audience</h3>
                      <p className="text-lg">{currentStrategy.targetAudience}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Goals</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentStrategy.goals.map((goal, index) => (
                          <Badge key={index} variant="secondary">{goal}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Strategy Components */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-6">
                  {strategyComponents.map((component) => (
                    <TabsTrigger key={component.id} value={component.type} className="text-xs">
                      {getComponentIcon(component.type)}
                      <span className="ml-1">{component.title.split(' ')[0]}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {strategyComponents.map((component) => (
                  <TabsContent key={component.id} value={component.type} className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getComponentIcon(component.type)}
                            <div>
                              <CardTitle>{component.title}</CardTitle>
                              <CardDescription>{component.description}</CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPriorityColor(component.priority)}>
                              {component.priority} priority
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <span className={`text-sm font-medium ${getConfidenceColor(component.confidence)}`}>
                                {component.confidence}%
                              </span>
                              <span className="text-sm text-gray-500">confidence</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Topics Component */}
                        {component.type === 'topics' && (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {component.data.map((topic: Topic) => (
                              <Card key={topic.id} className="border-l-4 border-l-blue-500">
                                <CardHeader className="pb-3">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <CardTitle className="text-lg">{topic.title}</CardTitle>
                                      <CardDescription>{topic.description}</CardDescription>
                                    </div>
                                    <Badge className={getPriorityColor(topic.priority === 1 ? 'high' : topic.priority === 2 ? 'medium' : 'low')}>
                                      Priority {topic.priority}
                                    </Badge>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    <div className="flex flex-wrap gap-1">
                                      {topic.contentType.map((type, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                          {type}
                                        </Badge>
                                      ))}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="text-gray-600">Difficulty:</span>
                                        <span className="ml-2 font-medium">{topic.difficulty}</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">Time:</span>
                                        <span className="ml-2 font-medium">{topic.estimatedTime}</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">Search Volume:</span>
                                        <span className="ml-2 font-medium">{topic.searchVolume.toLocaleString()}</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">Competition:</span>
                                        <span className="ml-2 font-medium">{topic.competition}</span>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {topic.keywords.map((keyword, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">
                                          {keyword}
                                        </Badge>
                                      ))}
                                    </div>
                                    <Button size="sm" className="w-full">
                                      <Plus className="w-4 h-4 mr-2" />
                                      Create Content
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}

                        {/* Keywords Component */}
                        {component.type === 'keywords' && (
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left p-3">Keyword</th>
                                  <th className="text-left p-3">Volume</th>
                                  <th className="text-left p-3">Difficulty</th>
                                  <th className="text-left p-3">Opportunity</th>
                                  <th className="text-left p-3">Intent</th>
                                  <th className="text-left p-3">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {component.data.map((keyword: Keyword) => (
                                  <tr key={keyword.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">
                                      <div className="flex items-center space-x-2">
                                        <Hash className="w-4 h-4 text-gray-400" />
                                        <span className="font-medium">{keyword.keyword}</span>
                                      </div>
                                    </td>
                                    <td className="p-3">{keyword.volume.toLocaleString()}</td>
                                    <td className="p-3">
                                      <div className="flex items-center space-x-2">
                                        <div className="w-16 bg-gray-200 rounded-full h-2">
                                          <div 
                                            className="bg-red-600 h-2 rounded-full" 
                                            style={{ width: `${keyword.difficulty}%` }}
                                          ></div>
                                        </div>
                                        <span className="text-sm">{keyword.difficulty}%</span>
                                      </div>
                                    </td>
                                    <td className="p-3">
                                      <div className="flex items-center space-x-2">
                                        <div className="w-16 bg-gray-200 rounded-full h-2">
                                          <div 
                                            className="bg-green-600 h-2 rounded-full" 
                                            style={{ width: `${keyword.opportunity}%` }}
                                          ></div>
                                        </div>
                                        <span className="text-sm">{keyword.opportunity}%</span>
                                      </div>
                                    </td>
                                    <td className="p-3">
                                      <Badge variant="outline" className="text-xs">
                                        {keyword.intent}
                                      </Badge>
                                    </td>
                                    <td className="p-3">
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
                        )}

                        {/* Calendar Component */}
                        {component.type === 'calendar' && (
                          <div className="space-y-6">
                            {component.data.map((calendar: ContentCalendar) => (
                              <div key={calendar.id}>
                                <h3 className="font-semibold text-lg mb-3">{calendar.week}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {calendar.content.map((item: CalendarItem) => (
                                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                                      <CardContent className="p-4">
                                        <div className="flex items-start justify-between mb-3">
                                          <div>
                                            <h4 className="font-medium">{item.title}</h4>
                                            <p className="text-sm text-gray-600">{item.date}</p>
                                          </div>
                                          <Badge className={getPriorityColor(item.priority)}>
                                            {item.priority}
                                          </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center space-x-2">
                                            <Badge variant="outline">{item.type}</Badge>
                                            <Badge variant="secondary">{item.platform}</Badge>
                                          </div>
                                          <Badge className={
                                            item.status === 'published' ? 'bg-green-50 text-green-600' :
                                            item.status === 'in-progress' ? 'bg-yellow-50 text-yellow-600' :
                                            'bg-gray-50 text-gray-600'
                                          }>
                                            {item.status}
                                          </Badge>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Persona Component */}
                        {component.type === 'persona' && (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {component.data.map((persona: AudiencePersona) => (
                              <Card key={persona.id}>
                                <CardHeader>
                                  <CardTitle className="flex items-center space-x-2">
                                    <Users className="w-5 h-5" />
                                    <span>{persona.name}</span>
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-2">Demographics</h4>
                                      <div className="grid grid-cols-2 gap-2 text-sm">
                                        {Object.entries(persona.demographics).map(([key, value]) => (
                                          <div key={key}>
                                            <span className="text-gray-600 capitalize">{key}:</span>
                                            <span className="ml-2 font-medium">{value}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-2">Pain Points</h4>
                                      <ul className="text-sm space-y-1">
                                        {persona.painPoints.map((point, index) => (
                                          <li key={index} className="flex items-start space-x-2">
                                            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                            <span>{point}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-2">Goals</h4>
                                      <ul className="text-sm space-y-1">
                                        {persona.goals.map((goal, index) => (
                                          <li key={index} className="flex items-start space-x-2">
                                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>{goal}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {persona.channels.map((channel, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                          {channel}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}

                        {/* KPI Component */}
                        {component.type === 'kpi' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {component.data.map((kpi: KPI) => (
                              <Card key={kpi.id}>
                                <CardContent className="p-6">
                                  <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-lg">{kpi.metric}</h3>
                                    <div className="text-right">
                                      <p className="text-2xl font-bold">{kpi.current}</p>
                                      <p className="text-sm text-gray-600">/ {kpi.target} {kpi.unit}</p>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>Progress</span>
                                      <span>{Math.round((kpi.current / kpi.target) * 100)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                      <div 
                                        className="bg-blue-600 h-3 rounded-full" 
                                        style={{ width: `${(kpi.current / kpi.target) * 100}%` }}
                                      ></div>
                                    </div>
                                    <p className="text-sm text-gray-600">Target: {kpi.timeframe}</p>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}

                        {/* Channels Component */}
                        {component.type === 'channels' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {component.data.map((channel: ChannelStrategy) => (
                              <Card key={channel.id}>
                                <CardHeader>
                                  <CardTitle className="flex items-center space-x-2">
                                    <Globe className="w-5 h-5" />
                                    <span>{channel.channel}</span>
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-1">Focus</h4>
                                      <p className="text-sm text-gray-600">{channel.focus}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-2">Content Types</h4>
                                      <div className="flex flex-wrap gap-1">
                                        {channel.contentType.map((type, index) => (
                                          <Badge key={index} variant="outline" className="text-xs">
                                            {type}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-1">Frequency</h4>
                                      <p className="text-sm text-gray-600">{channel.frequency}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="text-gray-600">Budget:</span>
                                        <span className="ml-2 font-medium">${channel.budget}</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">ROI:</span>
                                        <span className="ml-2 font-medium">{channel.expectedROI}%</span>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}

          {/* Sample Strategies */}
          {!currentStrategy && !isGenerating && (
            <Card>
              <CardHeader>
                <CardTitle>Sample Strategies</CardTitle>
                <CardDescription>
                  See examples of what our AI can generate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleStrategies.map((strategy) => (
                    <div key={strategy.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-2">{strategy.businessType}</h4>
                          <p className="text-sm text-gray-600 mb-2">{strategy.prompt}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Audience: {strategy.targetAudience}</span>
                            <span>Goals: {strategy.goals.join(', ')}</span>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setPrompt(strategy.prompt)}
                        >
                          Use This
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}