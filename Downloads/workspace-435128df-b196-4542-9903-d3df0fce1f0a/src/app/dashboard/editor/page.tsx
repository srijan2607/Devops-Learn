'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Save, 
  Eye, 
  Share2, 
  Download, 
  Edit3, 
  Sparkles, 
  Target, 
  BarChart3,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  Zap,
  TrendingUp,
  Search,
  FileText,
  MessageSquare
} from 'lucide-react'

interface ContentData {
  id: string
  title: string
  content: string
  contentType: string
  status: string
  targetKeywords: string
  wordCount: number
  seoScore: number
  readabilityScore: number
}

interface Suggestion {
  id: string
  type: 'seo' | 'readability' | 'content' | 'keywords'
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  applied: boolean
}

export default function ContentEditor() {
  const [content, setContent] = useState<ContentData>({
    id: '1',
    title: '10 Ways to Improve Your SEO Strategy',
    content: `# 10 Ways to Improve Your SEO Strategy

In today's digital landscape, having a strong SEO strategy is more important than ever. With millions of websites competing for attention, you need to ensure your content stands out and reaches your target audience.

## Understanding the Basics

Search Engine Optimization (SEO) is the practice of optimizing your website to rank higher in search engine results pages (SERPs). When done correctly, SEO can drive organic traffic to your site, increase brand visibility, and ultimately boost your bottom line.

### Key Components of SEO

1. **Keyword Research**: Identifying the right keywords that your target audience is searching for
2. **On-Page Optimization**: Optimizing your content, meta tags, and images
3. **Technical SEO**: Ensuring your site is technically sound and crawlable
4. **Link Building**: Acquiring high-quality backlinks from reputable sources
5. **Content Quality**: Creating valuable, engaging content that answers user queries

## Advanced Strategies

To take your SEO strategy to the next level, consider implementing these advanced techniques:

- Focus on user experience (UX) signals
- Optimize for voice search
- Leverage schema markup
- Create comprehensive pillar content
- Build topic clusters around core themes

## Conclusion

SEO is not a one-time effort but an ongoing process that requires continuous optimization and adaptation. By staying up-to-date with the latest trends and best practices, you can ensure your website remains competitive in the search results.`,
    contentType: 'blog',
    status: 'draft',
    targetKeywords: 'SEO, digital marketing, content strategy, keyword research',
    wordCount: 245,
    seoScore: 75,
    readabilityScore: 82
  })

  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: '1',
      type: 'seo',
      title: 'Add meta description',
      description: 'Your content is missing a meta description. Add one to improve click-through rates.',
      priority: 'high',
      applied: false
    },
    {
      id: '2',
      type: 'readability',
      title: 'Shorten sentences',
      description: 'Some sentences are too long. Consider breaking them up for better readability.',
      priority: 'medium',
      applied: false
    },
    {
      id: '3',
      type: 'content',
      title: 'Add more examples',
      description: 'Include specific examples to make your content more valuable and engaging.',
      priority: 'medium',
      applied: false
    },
    {
      id: '4',
      type: 'keywords',
      title: 'Include secondary keywords',
      description: 'Add related keywords like "on-page SEO" and "link building" to improve ranking.',
      priority: 'low',
      applied: false
    }
  ])

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [activeTab, setActiveTab] = useState('editor')

  const handleContentChange = (newContent: string) => {
    setContent(prev => ({
      ...prev,
      content: newContent,
      wordCount: newContent.split(' ').length
    }))
  }

  const handleTitleChange = (newTitle: string) => {
    setContent(prev => ({
      ...prev,
      title: newTitle
    }))
  }

  const handleKeywordsChange = (newKeywords: string) => {
    setContent(prev => ({
      ...prev,
      targetKeywords: newKeywords
    }))
  }

  const analyzeContent = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate content analysis
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Update scores based on analysis
      setContent(prev => ({
        ...prev,
        seoScore: Math.floor(Math.random() * 20) + 75, // Random score between 75-95
        readabilityScore: Math.floor(Math.random() * 15) + 80 // Random score between 80-95
      }))

      // Add new suggestions based on analysis
      const newSuggestions: Suggestion[] = [
        {
          id: '5',
          type: 'seo',
          title: 'Optimize heading structure',
          description: 'Consider adding more H2 and H3 headings to improve content structure.',
          priority: 'medium',
          applied: false
        },
        {
          id: '6',
          type: 'readability',
          title: 'Use more transition words',
          description: 'Add transition words to improve flow and readability.',
          priority: 'low',
          applied: false
        }
      ]

      setSuggestions(prev => [...prev, ...newSuggestions])
      setAnalysisProgress(100)
    } catch (error) {
      console.error('Error analyzing content:', error)
    } finally {
      setIsAnalyzing(false)
      clearInterval(progressInterval)
    }
  }

  const applySuggestion = (suggestionId: string) => {
    setSuggestions(prev =>
      prev.map(suggestion =>
        suggestion.id === suggestionId
          ? { ...suggestion, applied: true }
          : suggestion
      )
    )
  }

  const getSuggestionsByType = (type: Suggestion['type']) => {
    return suggestions.filter(s => s.type === type && !s.applied)
  }

  const getPriorityColor = (priority: Suggestion['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const saveContent = () => {
    // Here you would save the content to your backend
    console.log('Saving content:', content)
    alert('Content saved successfully!')
  }

  const publishContent = () => {
    // Here you would publish the content
    console.log('Publishing content:', content)
    alert('Content published successfully!')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 border-r bg-white p-4 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Settings</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={content.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="keywords">Target Keywords</Label>
              <Input
                id="keywords"
                value={content.targetKeywords}
                onChange={(e) => handleKeywordsChange(e.target.value)}
                placeholder="Comma separated keywords"
                className="mt-1"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Word Count</p>
                <p className="text-2xl font-bold text-gray-900">{content.wordCount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Status</p>
                <Badge variant={content.status === 'published' ? 'default' : 'secondary'}>
                  {content.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Scores */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Analysis</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">SEO Score</span>
                <span className="text-sm font-bold text-gray-900">{content.seoScore}/100</span>
              </div>
              <Progress value={content.seoScore} className="w-full" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Readability</span>
                <span className="text-sm font-bold text-gray-900">{content.readabilityScore}/100</span>
              </div>
              <Progress value={content.readabilityScore} className="w-full" />
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">AI Suggestions</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={analyzeContent}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Analyze
                </>
              )}
            </Button>
          </div>

          {isAnalyzing && (
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Analyzing content...</span>
                <span>{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="w-full" />
            </div>
          )}

          <div className="space-y-3">
            {suggestions.filter(s => !s.applied).map((suggestion) => (
              <div
                key={suggestion.id}
                className={`p-3 border rounded-lg ${getPriorityColor(suggestion.priority)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{suggestion.title}</h4>
                    <p className="text-xs opacity-75">{suggestion.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => applySuggestion(suggestion.id)}
                    className="ml-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button onClick={saveContent} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={publishContent} variant="outline" className="w-full">
            <Eye className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Content Editor</h1>
              <Badge variant="secondary">{content.contentType}</Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </header>

        {/* Editor Tabs */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor" className="h-full mt-0">
              <div className="h-full p-6">
                <Textarea
                  value={content.content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className="h-full resize-none font-mono text-sm"
                  placeholder="Start writing your content here..."
                />
              </div>
            </TabsContent>
            
            <TabsContent value="suggestions" className="h-full mt-0 overflow-y-auto">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* SEO Suggestions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Search className="w-5 h-5" />
                        <span>SEO Optimization</span>
                      </CardTitle>
                      <CardDescription>
                        Suggestions to improve your search engine ranking
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {getSuggestionsByType('seo').map((suggestion) => (
                          <div key={suggestion.id} className="p-3 border rounded-lg">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm mb-1">{suggestion.title}</h4>
                                <p className="text-xs text-gray-600">{suggestion.description}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => applySuggestion(suggestion.id)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Readability Suggestions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="w-5 h-5" />
                        <span>Readability</span>
                      </CardTitle>
                      <CardDescription>
                        Suggestions to improve content readability
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {getSuggestionsByType('readability').map((suggestion) => (
                          <div key={suggestion.id} className="p-3 border rounded-lg">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm mb-1">{suggestion.title}</h4>
                                <p className="text-xs text-gray-600">{suggestion.description}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => applySuggestion(suggestion.id)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Content Suggestions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Lightbulb className="w-5 h-5" />
                        <span>Content Enhancement</span>
                      </CardTitle>
                      <CardDescription>
                        Suggestions to improve content quality
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {getSuggestionsByType('content').map((suggestion) => (
                          <div key={suggestion.id} className="p-3 border rounded-lg">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm mb-1">{suggestion.title}</h4>
                                <p className="text-xs text-gray-600">{suggestion.description}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => applySuggestion(suggestion.id)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Keyword Suggestions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="w-5 h-5" />
                        <span>Keywords</span>
                      </CardTitle>
                      <CardDescription>
                        Keyword optimization suggestions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {getSuggestionsByType('keywords').map((suggestion) => (
                          <div key={suggestion.id} className="p-3 border rounded-lg">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm mb-1">{suggestion.title}</h4>
                                <p className="text-xs text-gray-600">{suggestion.description}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => applySuggestion(suggestion.id)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="h-full mt-0 overflow-y-auto">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Content Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Reading Time</span>
                          <span className="font-medium">{Math.ceil(content.wordCount / 200)} min</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Sentiment</span>
                          <span className="font-medium">Positive</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Complexity</span>
                          <span className="font-medium">Medium</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Keyword Density</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {content.targetKeywords.split(',').map((keyword, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{keyword.trim()}</span>
                              <span>{Math.floor(Math.random() * 3) + 1}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${Math.floor(Math.random() * 30) + 10}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Content Structure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Headings</span>
                          <span className="font-medium">6</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Paragraphs</span>
                          <span className="font-medium">12</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Lists</span>
                          <span className="font-medium">2</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Links</span>
                          <span className="font-medium">0</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}