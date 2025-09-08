'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Check, 
  Star,
  Crown,
  Zap,
  ArrowRight,
  AlertCircle,
  Calendar,
  Download,
  Settings,
  HelpCircle,
  RefreshCw
} from 'lucide-react'

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  period: string
  description: string
  features: string[]
  popular: boolean
  cta: string
  color: string
}

interface BillingInfo {
  plan: string
  status: string
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  nextBillingDate: string
  amount: number
}

interface UsageStats {
  contentPieces: number
  contentLimit: number
  aiGenerations: number
  aiLimit: number
  teamMembers: number
  teamLimit: number
  storageUsed: number
  storageLimit: number
}

interface Invoice {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  downloadUrl: string
}

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isProcessing, setIsProcessing] = useState(false)

  const billingInfo: BillingInfo = {
    plan: 'Professional',
    status: 'active',
    currentPeriodStart: '2024-01-01',
    currentPeriodEnd: '2024-02-01',
    cancelAtPeriodEnd: false,
    nextBillingDate: '2024-02-01',
    amount: 99
  }

  const usageStats: UsageStats = {
    contentPieces: 47,
    contentLimit: 50,
    aiGenerations: 1250,
    aiLimit: 1500,
    teamMembers: 2,
    teamLimit: 3,
    storageUsed: 2.3,
    storageLimit: 5
  }

  const invoices: Invoice[] = [
    {
      id: 'INV-2024-001',
      date: '2024-01-01',
      amount: 99,
      status: 'paid',
      downloadUrl: '/invoices/INV-2024-001.pdf'
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-01',
      amount: 99,
      status: 'paid',
      downloadUrl: '/invoices/INV-2023-012.pdf'
    },
    {
      id: 'INV-2023-011',
      date: '2023-11-01',
      amount: 99,
      status: 'paid',
      downloadUrl: '/invoices/INV-2023-011.pdf'
    }
  ]

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 29,
      period: 'month',
      description: 'Perfect for small businesses and solopreneurs',
      features: [
        '10 content pieces per month',
        'Basic content generation',
        '1 brand profile',
        'Standard support',
        'Basic analytics'
      ],
      popular: false,
      cta: 'Downgrade',
      color: 'from-gray-600 to-gray-700'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 99,
      period: 'month',
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
      cta: 'Current Plan',
      color: 'from-blue-600 to-purple-600'
    },
    {
      id: 'business',
      name: 'Business',
      price: 249,
      period: 'month',
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
      cta: 'Upgrade',
      color: 'from-purple-600 to-pink-600'
    }
  ]

  const handleUpgrade = async (planId: string) => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    alert(`Successfully upgraded to ${planId} plan!`)
  }

  const handleCancelSubscription = async () => {
    if (confirm('Are you sure you want to cancel your subscription?')) {
      setIsProcessing(true)
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsProcessing(false)
      alert('Subscription will be cancelled at the end of the current billing period.')
    }
  }

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.round((used / limit) * 100)
  }

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600'
    if (percentage >= 70) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      case 'overdue':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
            <p className="text-gray-600">Manage your subscription, billing, and usage</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="plans">Plans</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Current Plan */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Crown className="w-5 h-5 text-yellow-500" />
                        <span>Current Plan</span>
                      </CardTitle>
                      <CardDescription>
                        Your subscription details and billing information
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(billingInfo.status)}>
                      {billingInfo.status.charAt(0).toUpperCase() + billingInfo.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{billingInfo.plan} Plan</h3>
                      <p className="text-3xl font-bold text-gray-900">${billingInfo.amount}<span className="text-lg font-normal text-gray-600">/month</span></p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Next Billing Date</h4>
                      <p className="text-lg">{new Date(billingInfo.nextBillingDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Billing Period</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(billingInfo.currentPeriodStart).toLocaleDateString()} - {new Date(billingInfo.currentPeriodEnd).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex space-x-4">
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Update Payment Method
                    </Button>
                    {billingInfo.cancelAtPeriodEnd ? (
                      <Button variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reactivate Subscription
                      </Button>
                    ) : (
                      <Button variant="outline" onClick={handleCancelSubscription}>
                        Cancel Subscription
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Usage Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Usage Overview</CardTitle>
                  <CardDescription>
                    Track your resource usage for the current billing period
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Content Pieces</span>
                        <span className={`text-sm font-bold ${getUsageColor(getUsagePercentage(usageStats.contentPieces, usageStats.contentLimit))}`}>
                          {usageStats.contentPieces}/{usageStats.contentLimit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getUsagePercentage(usageStats.contentPieces, usageStats.contentLimit) >= 90 ? 'bg-red-600' : getUsagePercentage(usageStats.contentPieces, usageStats.contentLimit) >= 70 ? 'bg-yellow-600' : 'bg-green-600'}`}
                          style={{ width: `${getUsagePercentage(usageStats.contentPieces, usageStats.contentLimit)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">AI Generations</span>
                        <span className={`text-sm font-bold ${getUsageColor(getUsagePercentage(usageStats.aiGenerations, usageStats.aiLimit))}`}>
                          {usageStats.aiGenerations}/{usageStats.aiLimit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getUsagePercentage(usageStats.aiGenerations, usageStats.aiLimit) >= 90 ? 'bg-red-600' : getUsagePercentage(usageStats.aiGenerations, usageStats.aiLimit) >= 70 ? 'bg-yellow-600' : 'bg-green-600'}`}
                          style={{ width: `${getUsagePercentage(usageStats.aiGenerations, usageStats.aiLimit)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Team Members</span>
                        <span className={`text-sm font-bold ${getUsageColor(getUsagePercentage(usageStats.teamMembers, usageStats.teamLimit))}`}>
                          {usageStats.teamMembers}/{usageStats.teamLimit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getUsagePercentage(usageStats.teamMembers, usageStats.teamLimit) >= 90 ? 'bg-red-600' : getUsagePercentage(usageStats.teamMembers, usageStats.teamLimit) >= 70 ? 'bg-yellow-600' : 'bg-green-600'}`}
                          style={{ width: `${getUsagePercentage(usageStats.teamMembers, usageStats.teamLimit)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Storage</span>
                        <span className={`text-sm font-bold ${getUsageColor(getUsagePercentage(usageStats.storageUsed, usageStats.storageLimit))}`}>
                          {usageStats.storageUsed}GB/{usageStats.storageLimit}GB
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getUsagePercentage(usageStats.storageUsed, usageStats.storageLimit) >= 90 ? 'bg-red-600' : getUsagePercentage(usageStats.storageUsed, usageStats.storageLimit) >= 70 ? 'bg-yellow-600' : 'bg-green-600'}`}
                          style={{ width: `${getUsagePercentage(usageStats.storageUsed, usageStats.storageLimit)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="plans" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {subscriptionPlans.map((plan) => (
                  <Card key={plan.id} className={`relative ${plan.popular ? 'border-blue-500 shadow-2xl' : 'border-gray-200'}`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-blue-600 text-white px-4 py-1">
                          <Star className="w-4 h-4 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pb-8">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                        {plan.id === 'starter' && <Users className="w-8 h-8 text-white" />}
                        {plan.id === 'professional' && <Zap className="w-8 h-8 text-white" />}
                        {plan.id === 'business' && <Crown className="w-8 h-8 text-white" />}
                      </div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">${plan.price}</span>
                        <span className="text-gray-600">/{plan.period}</span>
                      </div>
                      <CardDescription className="text-base">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={`w-full mt-6 ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                        variant={plan.id === 'professional' ? 'default' : 'outline'}
                        onClick={() => handleUpgrade(plan.id)}
                        disabled={isProcessing || plan.id === 'professional'}
                      >
                        {isProcessing && plan.id !== 'professional' ? (
                          <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : null}
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Plan Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Plan Comparison</CardTitle>
                  <CardDescription>
                    Compare features across all subscription plans
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Feature</th>
                          <th className="text-center p-4">Starter</th>
                          <th className="text-center p-4">Professional</th>
                          <th className="text-center p-4">Business</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-4">Content Pieces</td>
                          <td className="text-center p-4">10/month</td>
                          <td className="text-center p-4">50/month</td>
                          <td className="text-center p-4">150/month</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4">Brand Profiles</td>
                          <td className="text-center p-4">1</td>
                          <td className="text-center p-4">3</td>
                          <td className="text-center p-4">10</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4">AI Generations</td>
                          <td className="text-center p-4">500</td>
                          <td className="text-center p-4">1,500</td>
                          <td className="text-center p-4">5,000</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4">Team Members</td>
                          <td className="text-center p-4">1</td>
                          <td className="text-center p-4">3</td>
                          <td className="text-center p-4">10</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4">Priority Support</td>
                          <td className="text-center p-4">❌</td>
                          <td className="text-center p-4">✅</td>
                          <td className="text-center p-4">✅</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usage" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Usage</CardTitle>
                    <CardDescription>
                      Comprehensive usage statistics for the current billing period
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Content Pieces</span>
                          <span className="text-sm text-gray-600">{usageStats.contentPieces} of {usageStats.contentLimit} used</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-blue-600 h-3 rounded-full" 
                            style={{ width: `${getUsagePercentage(usageStats.contentPieces, usageStats.contentLimit)}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {usageStats.contentLimit - usageStats.contentPieces} pieces remaining
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">AI Generations</span>
                          <span className="text-sm text-gray-600">{usageStats.aiGenerations} of {usageStats.aiLimit} used</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-purple-600 h-3 rounded-full" 
                            style={{ width: `${getUsagePercentage(usageStats.aiGenerations, usageStats.aiLimit)}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {usageStats.aiLimit - usageStats.aiGenerations} generations remaining
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Storage Space</span>
                          <span className="text-sm text-gray-600">{usageStats.storageUsed}GB of {usageStats.storageLimit}GB used</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-green-600 h-3 rounded-full" 
                            style={{ width: `${getUsagePercentage(usageStats.storageUsed, usageStats.storageLimit)}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {usageStats.storageLimit - usageStats.storageUsed}GB remaining
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Usage Alerts</CardTitle>
                    <CardDescription>
                      Notifications about your usage limits
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {getUsagePercentage(usageStats.contentPieces, usageStats.contentLimit) >= 80 && (
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-yellow-900">Content Pieces Limit</h4>
                              <p className="text-sm text-yellow-700">
                                You've used {getUsagePercentage(usageStats.contentPieces, usageStats.contentLimit)}% of your content pieces limit. Consider upgrading your plan.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {getUsagePercentage(usageStats.aiGenerations, usageStats.aiLimit) >= 80 && (
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-yellow-900">AI Generations Limit</h4>
                              <p className="text-sm text-yellow-700">
                                You've used {getUsagePercentage(usageStats.aiGenerations, usageStats.aiLimit)}% of your AI generations limit.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-green-900">Good Usage</h4>
                            <p className="text-sm text-green-700">
                              Your storage usage is optimal. Keep up the good work!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="invoices" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>
                    View and download your invoices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">{invoice.id}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(invoice.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium">${invoice.amount}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}