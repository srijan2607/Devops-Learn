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
  PenTool, 
  FileText, 
  MessageSquare, 
  Mail, 
  Megaphone, 
  ShoppingBag,
  Sparkles,
  Brain,
  Target,
  Zap,
  Loader2,
  Check,
  Copy,
  Download,
  Edit,
  Trash2,
  Plus,
  X
} from 'lucide-react'

const contentTypes = [
  {
    id: 'blog',
    name: 'Blog Post',
    icon: FileText,
    description: 'Long-form articles and blog posts',
    fields: [
      { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter blog post title' },
      { name: 'keywords', label: 'Target Keywords', type: 'text', placeholder: 'SEO keywords (comma separated)' },
      { name: 'wordCount', label: 'Word Count', type: 'select', options: ['500', '1000', '1500', '2000', '3000'] },
      { name: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Casual', 'Friendly', 'Authoritative'] }
    ]
  },
  {
    id: 'social',
    name: 'Social Media',
    icon: MessageSquare,
    description: 'Posts for various social platforms',
    fields: [
      { name: 'platform', label: 'Platform', type: 'select', options: ['LinkedIn', 'Twitter', 'Facebook', 'Instagram'] },
      { name: 'topic', label: 'Topic', type: 'text', placeholder: 'What to post about?' },
      { name: 'hashtagCount', label: 'Number of Hashtags', type: 'select', options: ['3', '5', '8', '10'] },
      { name: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Casual', 'Friendly', 'Humorous'] }
    ]
  },
  {
    id: 'email',
    name: 'Email Newsletter',
    icon: Mail,
    description: 'Email campaigns and newsletters',
    fields: [
      { name: 'subject', label: 'Subject Line', type: 'text', placeholder: 'Email subject line' },
      { name: 'purpose', label: 'Purpose', type: 'select', options: ['Newsletter', 'Promotional', 'Announcement', 'Follow-up'] },
      { name: 'cta', label: 'Call to Action', type: 'text', placeholder: 'What should readers do?' },
      { name: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Friendly', 'Urgent', 'Informative'] }
    ]
  },
  {
    id: 'ad',
    name: 'Ad Copy',
    icon: Megaphone,
    description: 'Advertisement and marketing copy',
    fields: [
      { name: 'product', label: 'Product/Service', type: 'text', placeholder: 'What are you advertising?' },
      { name: 'platform', label: 'Ad Platform', type: 'select', options: ['Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'Instagram Ads'] },
      { name: 'objective', label: 'Campaign Objective', type: 'select', options: ['Awareness', 'Consideration', 'Conversion'] },
      { name: 'tone', label: 'Tone', type: 'select', options: ['Urgent', 'Professional', 'Friendly', 'Exciting'] }
    ]
  },
  {
    id: 'product',
    name: 'Product Description',
    icon: ShoppingBag,
    description: 'E-commerce product descriptions',
    fields: [
      { name: 'productName', label: 'Product Name', type: 'text', placeholder: 'Enter product name' },
      { name: 'features', label: 'Key Features', type: 'textarea', placeholder: 'List main features and benefits' },
      { name: 'audience', label: 'Target Audience', type: 'text', placeholder: 'Who is this for?' },
      { name: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Casual', 'Luxury', 'Technical'] }
    ]
  }
]

const brandProfiles = [
  { id: '1', name: 'TechCorp Inc.', industry: 'Technology' },
  { id: '2', name: 'EcoStore', industry: 'E-commerce' },
  { id: '3', name: 'HealthPlus', industry: 'Healthcare' }
]

export default function ContentGenerator() {
  const [selectedContentType, setSelectedContentType] = useState('blog')
  const [selectedBrand, setSelectedBrand] = useState('1')
  const [formData, setFormData] = useState({})
  const [generatedContent, setGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [contentHistory, setContentHistory] = useState([])

  const contentType = contentTypes.find(ct => ct.id === selectedContentType)

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }

  const generateContent = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)
    
    // Simulate content generation with progress
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    try {
      // Simulate API call to generate content
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Mock generated content based on content type
      let mockContent = ''
      switch (selectedContentType) {
        case 'blog':
          mockContent = `# ${formData.title || 'How to Boost Your SEO Strategy'}

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

SEO is not a one-time effort but an ongoing process that requires continuous optimization and adaptation. By staying up-to-date with the latest trends and best practices, you can ensure your website remains competitive in the search results.

Remember, the goal of SEO is not just to rank higher, but to provide value to your audience and build lasting relationships with your customers.`
          break
        case 'social':
          mockContent = `🚀 Exciting news! We've just launched our latest feature that will revolutionize how you approach content creation. 

With our new AI-powered tools, you can now generate high-quality content in seconds, not hours. Whether you need blog posts, social media updates, or email newsletters, we've got you covered.

✨ Key benefits:
• Save time and resources
• Maintain brand consistency
• Improve content quality
• Scale your content efforts

Ready to transform your content strategy? Click the link in our bio to learn more! #ContentCreation #AI #Marketing #Innovation #DigitalTransformation`
          break
        case 'email':
          mockContent = `Subject: 🎉 Your Content Creation Game-Changer is Here!

Hi there,

Tired of spending countless hours creating content that doesn't convert? We have exciting news that will transform how you approach content marketing.

Introducing our latest AI-powered content generation platform that helps you:
• Create high-quality content in minutes
• Maintain consistent brand voice across all channels
• Optimize for SEO and engagement
• Scale your content efforts without breaking the bank

Don't just take our word for it - our early users are seeing:
✅ 300% increase in content output
✅ 50% reduction in content creation time
✅ 25% improvement in engagement rates

Ready to revolutionize your content strategy?

[Get Started Now] (button)

Best regards,
The ContentCraft AI Team

P.S. Limited time offer: Get 20% off your first 3 months when you sign up this week!`
          break
        case 'ad':
          mockContent = `Headline: Transform Your Content Strategy with AI

Subheadline: Generate High-Quality Content in Seconds, Not Hours

Body:
Stop struggling with content creation! Our AI-powered platform helps businesses like yours create professional, engaging content that drives results.

Key Features:
• AI-powered content generation
• Brand voice customization
• Multi-format content creation
• SEO optimization built-in
• Performance analytics

Call to Action: Start Your Free Trial Today!

Display URL: contentcraft.ai
Final URL: https://contentcraft.ai/free-trial`
          break
        case 'product':
          mockContent = `Premium Content Creation Suite - All-in-One AI Platform

Elevate your content marketing with our comprehensive AI-powered content creation platform. Designed for modern businesses, this suite combines cutting-edge artificial intelligence with intuitive design to help you create compelling content across all channels.

Key Features:
• Advanced AI content generation
• Brand voice learning and adaptation
• Multi-format content creation (blogs, social media, emails, ads)
• Built-in SEO optimization
• Performance analytics and insights
• Team collaboration tools
• Industry-specific templates

Benefits:
• Save 80% of content creation time
• Maintain consistent brand voice
• Improve content quality and engagement
• Scale your content efforts effortlessly
• Data-driven content optimization

Perfect for:
• Marketing teams and agencies
• Small and medium businesses
• Content creators and solopreneurs
• E-commerce businesses
• SaaS companies

Technical Specifications:
• Cloud-based platform
• Real-time collaboration
• API access available
• Integrates with popular marketing tools
• Secure and GDPR compliant

Order now and transform your content strategy with the power of AI!`
          break
      }
      
      setGeneratedContent(mockContent)
      setGenerationProgress(100)
      
      // Add to history
      const newHistoryItem = {
        id: Date.now(),
        type: contentType.name,
        title: formData.title || formData.topic || formData.subject || formData.productName || 'Untitled',
        content: mockContent,
        date: new Date().toISOString()
      }
      setContentHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]) // Keep last 10 items
      
    } catch (error) {
      console.error('Error generating content:', error)
    } finally {
      setIsGenerating(false)
      clearInterval(progressInterval)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent)
    alert('Content copied to clipboard!')
  }

  const downloadContent = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${contentType.name.toLowerCase()}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white p-4">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <PenTool className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Content Generator</span>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Content Type</Label>
            <div className="mt-2 space-y-2">
              {contentTypes.map((type) => (
                <div
                  key={type.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedContentType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedContentType(type.id)}
                >
                  <div className="flex items-center space-x-3">
                    <type.icon className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">{type.name}</p>
                      <p className="text-xs text-gray-500">{type.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Brand Profile</Label>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select brand profile" />
              </SelectTrigger>
              <SelectContent>
                {brandProfiles.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name} ({brand.industry})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Generate {contentType?.name}
            </h1>
            <p className="text-gray-600">
              {contentType?.description} using AI powered by your brand profile.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Content Details</span>
                </CardTitle>
                <CardDescription>
                  Provide the details for your {contentType?.name.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contentType?.fields.map((field) => (
                  <div key={field.name}>
                    <Label htmlFor={field.name}>{field.label}</Label>
                    {field.type === 'text' && (
                      <Input
                        id={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      />
                    )}
                    {field.type === 'textarea' && (
                      <Textarea
                        id={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        rows={3}
                      />
                    )}
                    {field.type === 'select' && (
                      <Select value={formData[field.name] || ''} onValueChange={(value) => handleFieldChange(field.name, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ))}

                <Button 
                  onClick={generateContent} 
                  disabled={isGenerating || !Object.keys(formData).length}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>

                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Generating content...</span>
                      <span>{generationProgress}%</span>
                    </div>
                    <Progress value={generationProgress} className="w-full" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Generated Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span>Generated Content</span>
                  </div>
                  {generatedContent && (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={copyToClipboard}>
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadContent}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardTitle>
                <CardDescription>
                  AI-generated content based on your specifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedContent ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg border max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                        {generatedContent}
                      </pre>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Save to Library
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Your generated content will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Content History */}
          {contentHistory.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Recent Generations</CardTitle>
                <CardDescription>
                  Your recently generated content pieces
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contentHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary">{item.type}</Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4" />
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