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
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Building, 
  MessageSquare, 
  Palette, 
  Target,
  Users,
  Globe,
  Zap,
  Star
} from 'lucide-react'

const industries = [
  { id: 'technology', name: 'Technology & SaaS', icon: '💻' },
  { id: 'healthcare', name: 'Healthcare & Medical', icon: '🏥' },
  { id: 'finance', name: 'Finance & Banking', icon: '💰' },
  { id: 'ecommerce', name: 'E-commerce & Retail', icon: '🛍️' },
  { id: 'education', name: 'Education & E-learning', icon: '📚' },
  { id: 'real-estate', name: 'Real Estate', icon: '🏠' },
  { id: 'travel', name: 'Travel & Hospitality', icon: '✈️' },
  { id: 'food', name: 'Food & Beverage', icon: '🍔' },
  { id: 'fitness', name: 'Fitness & Wellness', icon: '💪' },
  { id: 'automotive', name: 'Automotive', icon: '🚗' },
  { id: 'legal', name: 'Legal Services', icon: '⚖️' },
  { id: 'marketing', name: 'Marketing & Agency', icon: '📢' }
]

const brandVoices = [
  { id: 'professional', name: 'Professional & Formal', description: 'Corporate, authoritative, and polished tone' },
  { id: 'friendly', name: 'Friendly & Approachable', description: 'Warm, conversational, and relatable tone' },
  { id: 'casual', name: 'Casual & Relaxed', description: 'Informal, laid-back, and easy-going tone' },
  { id: 'enthusiastic', name: 'Enthusiastic & Energetic', description: 'Excited, passionate, and motivational tone' },
  { id: 'witty', name: 'Witty & Humorous', description: 'Clever, entertaining, and engaging tone' },
  { id: 'empathetic', name: 'Empathetic & Caring', description: 'Understanding, supportive, and compassionate tone' }
]

const targetAudiences = [
  { id: 'b2b', name: 'B2B Professionals', description: 'Business decision-makers and executives' },
  { id: 'b2c', name: 'B2C Consumers', description: 'General consumers and shoppers' },
  { id: 'startups', name: 'Startups & Entrepreneurs', description: 'Innovators and business founders' },
  { id: 'enterprise', name: 'Enterprise', description: 'Large organizations and corporations' },
  { id: 'smbs', name: 'Small & Medium Businesses', description: 'Local and regional businesses' }
]

export default function BrandSetup() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [brandName, setBrandName] = useState('')
  const [brandDescription, setBrandDescription] = useState('')
  const [selectedVoice, setSelectedVoice] = useState('')
  const [selectedAudience, setSelectedAudience] = useState('')
  const [brandColors, setBrandColors] = useState('')
  const [competitors, setCompetitors] = useState('')
  const [keywords, setKeywords] = useState('')

  const steps = [
    { id: 1, name: 'Industry', icon: Building },
    { id: 2, name: 'Brand Info', icon: Users },
    { id: 3, name: 'Voice & Tone', icon: MessageSquare },
    { id: 4, name: 'Target Audience', icon: Target },
    { id: 5, name: 'Review', icon: Check }
  ]

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = () => {
    // Here you would save the brand configuration
    console.log('Saving brand configuration:', {
      industry: selectedIndustry,
      brandName,
      brandDescription,
      voice: selectedVoice,
      audience: selectedAudience,
      colors: brandColors,
      competitors,
      keywords
    })
    alert('Brand configuration saved successfully!')
  }

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return selectedIndustry !== ''
      case 2:
        return brandName !== '' && brandDescription !== ''
      case 3:
        return selectedVoice !== ''
      case 4:
        return selectedAudience !== ''
      default:
        return true
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white p-4">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Brand Setup</span>
        </div>

        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                currentStep === step.id
                  ? 'bg-blue-50 border border-blue-200'
                  : isStepComplete(step.id)
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
              onClick={() => isStepComplete(step.id) && setCurrentStep(step.id)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === step.id
                    ? 'bg-blue-600 text-white'
                    : isStepComplete(step.id)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {isStepComplete(step.id) ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <step.icon className="w-4 h-4" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">{step.name}</p>
                <p className="text-xs text-gray-500">
                  {isStepComplete(step.id) ? 'Completed' : currentStep === step.id ? 'In Progress' : 'Not Started'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Set Up Your Brand Profile
            </h1>
            <p className="text-gray-600">
              Configure your brand settings to help our AI create content that matches your unique voice and style.
            </p>
          </div>

          {/* Step 1: Industry Selection */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="w-5 h-5" />
                  <span>Select Your Industry</span>
                </CardTitle>
                <CardDescription>
                  Choose the industry that best represents your business. This helps our AI use the right terminology and context.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {industries.map((industry) => (
                    <div
                      key={industry.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedIndustry === industry.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedIndustry(industry.id)}
                    >
                      <div className="text-2xl mb-2">{industry.icon}</div>
                      <h3 className="font-medium text-gray-900">{industry.name}</h3>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Brand Information */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Brand Information</span>
                </CardTitle>
                <CardDescription>
                  Tell us about your brand so we can create content that accurately represents your business.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="brandName">Brand Name</Label>
                  <Input
                    id="brandName"
                    placeholder="Enter your brand name"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="brandDescription">Brand Description</Label>
                  <Textarea
                    id="brandDescription"
                    placeholder="Describe your brand, what you do, and what makes you unique..."
                    value={brandDescription}
                    onChange={(e) => setBrandDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="brandColors">Brand Colors (Optional)</Label>
                  <Input
                    id="brandColors"
                    placeholder="e.g., Blue and white, #FF6B6B and #4ECDC4"
                    value={brandColors}
                    onChange={(e) => setBrandColors(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="competitors">Main Competitors (Optional)</Label>
                  <Input
                    id="competitors"
                    placeholder="e.g., Competitor A, Competitor B"
                    value={competitors}
                    onChange={(e) => setCompetitors(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Voice & Tone */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Brand Voice & Tone</span>
                </CardTitle>
                <CardDescription>
                  Choose the voice and tone that best represents your brand's personality.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {brandVoices.map((voice) => (
                    <div
                      key={voice.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedVoice === voice.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedVoice(voice.id)}
                    >
                      <h3 className="font-medium text-gray-900 mb-2">{voice.name}</h3>
                      <p className="text-sm text-gray-600">{voice.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Target Audience */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Target Audience</span>
                </CardTitle>
                <CardDescription>
                  Who are you trying to reach with your content? This helps us tailor the messaging.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Primary Target Audience</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {targetAudiences.map((audience) => (
                      <div
                        key={audience.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          selectedAudience === audience.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedAudience(audience.id)}
                      >
                        <h3 className="font-medium text-gray-900 mb-2">{audience.name}</h3>
                        <p className="text-sm text-gray-600">{audience.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="keywords">Key Topics & Keywords</Label>
                  <Textarea
                    id="keywords"
                    placeholder="Enter important topics, keywords, or themes related to your business..."
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Check className="w-5 h-5" />
                  <span>Review Your Brand Setup</span>
                </CardTitle>
                <CardDescription>
                  Review your brand configuration before saving. You can always edit these settings later.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Industry</h3>
                    <Badge variant="secondary">
                      {industries.find(i => i.id === selectedIndustry)?.name}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Brand Name</h3>
                    <p className="text-gray-700">{brandName}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Brand Description</h3>
                    <p className="text-gray-700">{brandDescription}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Brand Voice</h3>
                    <Badge variant="secondary">
                      {brandVoices.find(v => v.id === selectedVoice)?.name}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Target Audience</h3>
                    <Badge variant="secondary">
                      {targetAudiences.find(a => a.id === selectedAudience)?.name}
                    </Badge>
                  </div>
                  {keywords && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Key Topics & Keywords</h3>
                      <p className="text-gray-700">{keywords}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <div className="flex space-x-2">
              {currentStep === steps.length ? (
                <Button onClick={handleSave}>
                  <Check className="w-4 h-4 mr-2" />
                  Save Brand Setup
                </Button>
              ) : (
                <Button onClick={handleNext} disabled={!isStepComplete(currentStep)}>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}