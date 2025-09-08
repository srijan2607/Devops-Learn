import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/content/manage - Get all content for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const contentType = searchParams.get('contentType')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = { userId }
    if (contentType) where.contentType = contentType
    if (status) where.status = status

    const [content, total] = await Promise.all([
      db.content.findMany({
        where,
        include: {
          brand: {
            select: {
              id: true,
              name: true,
              industry: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      db.content.count({ where })
    ])

    return NextResponse.json({
      content,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/content/manage - Update content
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      id,
      title,
      content,
      status,
      targetKeywords,
      brandId,
      publishedAt,
      scheduledAt
    } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      )
    }

    // Update the content
    const updatedContent = await db.content.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(status && { status }),
        ...(targetKeywords !== undefined && { targetKeywords }),
        ...(brandId !== undefined && { brandId }),
        ...(publishedAt && { publishedAt }),
        ...(scheduledAt && { scheduledAt }),
        wordCount: content ? content.split(' ').length : undefined
      },
      include: {
        brand: {
          select: {
            id: true,
            name: true,
            industry: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      content: updatedContent
    })
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/content/manage - Delete content
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      )
    }

    // Delete the content
    await db.content.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Content deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}