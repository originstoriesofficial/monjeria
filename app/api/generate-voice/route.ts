import { NextResponse } from 'next/server'
import { generateVoice } from '@/lib/elevenlabs'

export async function POST(req: Request) {
  const { prompt } = await req.json()
  const url = await generateVoice(prompt)
  return NextResponse.json({ url })
}
