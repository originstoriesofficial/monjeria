import { NextResponse } from 'next/server'
import { uploadToIPFS } from '@/lib/ipfs'

export async function POST(req: Request) {
  const { fileUrl, type } = await req.json()
  const result = await uploadToIPFS(fileUrl, type)
  return NextResponse.json(result)
}
