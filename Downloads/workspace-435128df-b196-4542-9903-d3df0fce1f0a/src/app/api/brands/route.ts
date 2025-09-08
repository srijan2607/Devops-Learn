import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/brands - Get all brands for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const brands = await db.brand.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ brands })
  } catch (error) {
    console.error('Error fetching brands:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/brands - Create a new brand
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      name,
      description,
      industry,
      brandVoice,
      targetAudience,
      brandColors,
      keywords,
      competitors,
      logo,
      website
    } = body

    // Validate required fields
    if (!userId || !name || !industry || !brandVoice) {
      return NextResponse.json(
        { error: 'User ID, name, industry, and brand voice are required' },
        { status: 400 }
      )
    }

    // Create the brand
    const brand = await db.brand.create({
      data: {
        userId,
        name,
        description,
        industry,
        brandVoice,
        targetAudience,
        brandColors,
        keywords,
        competitors,
        logo,
        website
      }
    })

    return NextResponse.json({
      success: true,
      brand
    })
  } catch (error) {
    console.error('Error creating brand:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}