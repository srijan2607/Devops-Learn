import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/analytics - Get analytics for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const contentId = searchParams.get('contentId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Build where clause
    const where: any = { userId }
    if (contentId) where.contentId = contentId
    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    }

    // Get analytics data
    const analytics = await db.analytics.findMany({
      where,
      include: {
        content: {
          select: {
            id: true,
            title: true,
            contentType: true,
            status: true
          }
        }
      },
      orderBy: { date: 'desc' }
    })

    // Calculate aggregate statistics
    const totalViews = analytics.reduce((sum, item) => sum + item.views, 0)
    const totalEngagement = analytics.reduce((sum, item) => sum + item.engagement, 0)
    const totalClicks = analytics.reduce((sum, item) => sum + item.clicks, 0)
    const totalShares = analytics.reduce((sum, item) => sum + item.shares, 0)
    const totalConversions = analytics.reduce((sum, item) => sum + item.conversions, 0)
    const totalRevenue = analytics.reduce((sum, item) => sum + item.revenue, 0)

    // Group by content type
    const byContentType = analytics.reduce((acc, item) => {
      const type = item.content.contentType
      if (!acc[type]) {
        acc[type] = {
          views: 0,
          engagement: 0,
          clicks: 0,
          shares: 0,
          conversions: 0,
          revenue: 0,
          count: 0
        }
      }
      acc[type].views += item.views
      acc[type].engagement += item.engagement
      acc[type].clicks += item.clicks
      acc[type].shares += item.shares
      acc[type].conversions += item.conversions
      acc[type].revenue += item.revenue
      acc[type].count += 1
      return acc
    }, {} as any)

    // Calculate engagement rate
    const avgEngagementRate = analytics.length > 0 
      ? totalEngagement / analytics.length 
      : 0

    // Calculate conversion rate
    const conversionRate = totalViews > 0 
      ? (totalConversions / totalViews) * 100 
      : 0

    return NextResponse.json({
      analytics,
      summary: {
        totalViews,
        totalEngagement,
        totalClicks,
        totalShares,
        totalConversions,
        totalRevenue,
        avgEngagementRate,
        conversionRate
      },
      byContentType
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/analytics - Create or update analytics
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      contentId,
      userId,
      views,
      engagement,
      clicks,
      shares,
      conversions,
      revenue,
      metadata
    } = body

    if (!contentId || !userId) {
      return NextResponse.json(
        { error: 'Content ID and User ID are required' },
        { status: 400 }
      )
    }

    // Create analytics entry
    const analytics = await db.analytics.create({
      data: {
        contentId,
        userId,
        views: views || 0,
        engagement: engagement || 0,
        clicks: clicks || 0,
        shares: shares || 0,
        conversions: conversions || 0,
        revenue: revenue || 0,
        metadata: metadata ? JSON.stringify(metadata) : null
      }
    })

    return NextResponse.json({
      success: true,
      analytics
    })
  } catch (error) {
    console.error('Error creating analytics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}