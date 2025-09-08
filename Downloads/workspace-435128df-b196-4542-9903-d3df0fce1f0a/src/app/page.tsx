'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Star, Zap, Target, BarChart, Users, PenTool, Brain, Globe, ArrowRight } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('features')

  const features = [
    {
      icon: Brain,
      title: 'AI Content Strategist',
      description: 'Generate complete content strategies with a single prompt - topics, keywords, calendar, and execution plan included.'
    },
    {
      icon: Target,
      title: 'Industry Specialization',
      description: 'Get content that speaks your industry language with accurate terminology and compliance considerations.'
    },
    {
      icon: PenTool,
      title: 'Brand Voice Adaptation',
      description: 'Our AI learns and adapts to your unique brand voice for consistent messaging across all content.'
    },
    {
      icon: BarChart,
      title: 'Performance Analytics',
      description: 'Track content performance with detailed analytics and use insights to improve future content.'
    },
    {
      icon: Globe,
      title: 'Multi-Format Creation',
      description: 'Transform content into multiple formats - blog posts, social media, emails, and more.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team with real-time collaboration and approval workflows.'
    }
  ]

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small businesses and solopreneurs',
      features: [
        '10 content pieces per month',
        'Basic content generation',
        '1 brand profile',
        'Standard support',
        'Basic analytics'
      ],
      popular: false,
      cta: 'Get Started'
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'Ideal for growing businesses and agencies',
      features: [
        '50 content pieces per month',
        'Advanced content generation',
        '3 brand profiles',
        'Content strategy suggestions',
        'Priority support',
        'Advanced analytics',
        'Image generation (20/month)'
      ],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Business',
      price: '$249',
      period: '/month',
      description: 'For established businesses and teams',
      features: [
        '150 content pieces per month',
        'Premium content generation',
        '10 brand profiles',
        'Advanced content strategy',
        'Competitor analysis',
        'Dedicated support',
        'Full analytics suite',
        'Image generation (100/month)',
        'Team collaboration (3 users)'
      ],
      popular: false,
      cta: 'Contact Sales'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechCorp Inc.',
      content: 'ContentCraft AI has revolutionized our content strategy. We\'ve seen a 300% increase in organic traffic since implementing the platform.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'CEO',
      company: 'StartupHub',
      content: 'As a startup, we couldn\'t afford a content team. ContentCraft AI gave us enterprise-level content creation at a fraction of the cost.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Content Manager',
      company: 'Digital Agency Pro',
      content: 'The brand voice adaptation is incredible. Our clients can\'t believe the content is AI-generated. It\'s that good!',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ContentCraft AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setActiveTab('features')}
                className={`text-sm font-medium transition-colors ${
                  activeTab === 'features' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Features
              </button>
              <button 
                onClick={() => setActiveTab('pricing')}
                className={`text-sm font-medium transition-colors ${
                  activeTab === 'pricing' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Pricing
              </button>
              <a href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Dashboard
              </a>
              <a href="/dashboard/generator" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Try Demo
              </a>
              <a href="/auth/signin" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Log In
              </a>
              <a href="/auth/signup" className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                Get Started Free
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <Zap className="w-4 h-4 mr-1" />
            AI-Powered Content Creation
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Create High-Quality Content
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}That Converts
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            ContentCraft AI generates complete content strategies with a single prompt and creates industry-specific, brand-adaptive content that drives traffic, 
            engages audiences, and grows your business. Stop struggling with content creation and 
            start scaling your marketing efforts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="/auth/signup" className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-flex items-center justify-center">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <a href="/dashboard/generator" className="text-lg px-8 py-4 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors inline-flex items-center justify-center">
              Watch Demo
            </a>
          </div>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Create Exceptional Content
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to help you create, optimize, and analyze content that drives results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that best fits your content creation needs. All plans include our core AI features.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 shadow-2xl' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-6 ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Content Creators Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our customers have to say about their experience with ContentCraft AI.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Content Strategy?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses creating amazing content with AI. Start your free trial today.
          </p>
          <a href="/auth/signup" className="text-lg px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 rounded-lg transition-colors inline-flex items-center justify-center">
            Start Your Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ContentCraft AI</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                © 2024 ContentCraft AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}