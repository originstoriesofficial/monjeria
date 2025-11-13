import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const response = await fetch(process.env.MUSIC_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MUSIC_API_KEY}`,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      console.error('Music generation failed:', await response.text())
      return new NextResponse('Music generation failed', { status: 500 })
    }

    const audio = await response.blob()

    return new NextResponse(audio, {
      headers: { 'Content-Type': 'audio/mpeg' },
    })
  } catch (err) {
    console.error('Compose API Error:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
