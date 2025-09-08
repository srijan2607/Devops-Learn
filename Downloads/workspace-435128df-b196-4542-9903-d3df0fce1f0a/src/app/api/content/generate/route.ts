import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      contentType,
      title,
      topic,
      keywords,
      tone,
      wordCount,
      platform,
      subject,
      purpose,
      cta,
      product,
      features,
      audience,
      brandId,
      userId
    } = body

    // Validate required fields
    if (!contentType || !userId) {
      return NextResponse.json(
        { error: 'Content type and user ID are required' },
        { status: 400 }
      )
    }

    // Get brand information if brandId is provided
    let brandContext = ''
    if (brandId) {
      const brand = await db.brand.findUnique({
        where: { id: brandId }
      })
      if (brand) {
        brandContext = `
Brand Information:
- Name: ${brand.name}
- Industry: ${brand.industry}
- Brand Voice: ${brand.brandVoice}
- Target Audience: ${brand.targetAudience || 'General audience'}
- Key Keywords: ${brand.keywords || ''}
- Description: ${brand.description || ''}
        `.trim()
      }
    }

    // Create system prompt based on content type
    let systemPrompt = ''
    let userPrompt = ''

    switch (contentType) {
      case 'blog':
        systemPrompt = `You are a professional content writer specializing in blog posts and articles. ${brandContext}

Your task is to create a high-quality, SEO-optimized blog post that:
- Is well-structured with proper headings and subheadings
- Includes the target keywords naturally
- Matches the specified tone and style
- Provides valuable information to readers
- Is approximately ${wordCount || 1000} words long

Format the response in markdown with proper headings, lists, and formatting.`
        
        userPrompt = `Create a blog post with the following details:
Title: ${title || topic || 'Untitled Blog Post'}
Target Keywords: ${keywords || ''}
Tone: ${tone || 'Professional'}
Word Count: ${wordCount || 1000}

${brandContext}`
        break

      case 'social':
        systemPrompt = `You are a social media expert specializing in creating engaging posts for various platforms. ${brandContext}

Your task is to create a compelling social media post that:
- Is tailored for the specified platform
- Matches the brand voice and tone
- Includes relevant hashtags
- Is engaging and shareable
- Encourages interaction

Format the response with the post content first, followed by hashtags on separate lines.`
        
        userPrompt = `Create a social media post with the following details:
Platform: ${platform || 'LinkedIn'}
Topic: ${topic || 'General topic'}
Tone: ${tone || 'Friendly'}
Number of Hashtags: ${wordCount || 5}

${brandContext}`
        break

      case 'email':
        systemPrompt = `You are an email marketing specialist. ${brandContext}

Your task is to create a compelling email that:
- Has an engaging subject line
- Matches the specified tone and purpose
- Includes a clear call to action
- Is well-structured and easy to read
- Encourages the desired action

Format the response with the subject line first, followed by the email body.`
        
        userPrompt = `Create an email with the following details:
Subject: ${subject || 'Email Subject'}
Purpose: ${purpose || 'Newsletter'}
Call to Action: ${cta || 'Learn more'}
Tone: ${tone || 'Professional'}

${brandContext}`
        break

      case 'ad':
        systemPrompt = `You are a copywriting expert specializing in advertisement copy. ${brandContext}

Your task is to create compelling ad copy that:
- Grabs attention immediately
- Highlights key benefits
- Includes a strong call to action
- Is optimized for the specified platform
- Matches the brand voice

Format the response with headline, subheadline (if needed), body copy, and call to action.`
        
        userPrompt = `Create ad copy with the following details:
Product/Service: ${product || 'Product'}
Platform: ${platform || 'Google Ads'}
Objective: ${purpose || 'Conversion'}
Tone: ${tone || 'Professional'}

${brandContext}`
        break

      case 'product':
        systemPrompt = `You are an e-commerce product description specialist. ${brandContext}

Your task is to create a compelling product description that:
- Highlights key features and benefits
- Addresses the target audience's needs
- Is persuasive and informative
- Includes relevant keywords
- Matches the brand voice

Format the response with a clear structure including features, benefits, and specifications.`
        
        userPrompt = `Create a product description with the following details:
Product Name: ${product || 'Product'}
Key Features: ${features || ''}
Target Audience: ${audience || 'General audience'}
Tone: ${tone || 'Professional'}

${brandContext}`
        break

      default:
        return NextResponse.json(
          { error: 'Invalid content type' },
          { status: 400 }
        )
    }

    // Initialize ZAI SDK
    const zai = await ZAI.create()

    // Generate content using AI
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })

    const generatedContent = completion.choices[0]?.message?.content

    if (!generatedContent) {
      return NextResponse.json(
        { error: 'Failed to generate content' },
        { status: 500 }
      )
    }

    // Save the generated content to the database
    const savedContent = await db.content.create({
      data: {
        title: title || topic || subject || product || 'Untitled Content',
        content: generatedContent,
        contentType,
        status: 'draft',
        wordCount: generatedContent.split(' ').length,
        targetKeywords: keywords || '',
        userId,
        brandId: brandId || null,
        metadata: JSON.stringify({
          tone,
          platform,
          purpose,
          cta,
          features,
          audience,
          generatedAt: new Date().toISOString()
        })
      }
    })

    // Return the generated content
    return NextResponse.json({
      success: true,
      content: generatedContent,
      contentId: savedContent.id,
      metadata: {
        wordCount: savedContent.wordCount,
        contentType: savedContent.contentType,
        generatedAt: savedContent.generatedAt
      }
    })

  } catch (error) {
    console.error('Error generating content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}