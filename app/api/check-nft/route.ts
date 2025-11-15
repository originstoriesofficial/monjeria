import { createClient } from '@farcaster/quick-auth'
import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, http, parseAbi } from 'viem'
import { base } from 'viem/chains'

const DOMAIN = process.env.APP_DOMAIN!
const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY!
const ORIGIN_CONTRACT = '0x45737f6950f5c9e9475e9e045c7a89b565fa3648' // OriginStory coin
const RPC_URL = process.env.RPC_URL! // your Base RPC (Alchemy, Infura, etc.)

const quickAuthClient = createClient()
const publicClient = createPublicClient({
  chain: base,
  transport: http(RPC_URL),
})

// ----------------------------------------------------
// Main route handler
// ----------------------------------------------------
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.split(' ')[1]

  try {
    // ✅ 1. Verify Farcaster JWT (QuickAuth)
    const payload = await quickAuthClient.verifyJwt({ token, domain: DOMAIN })
    const fid = Number(payload.sub)

    // ✅ 2. Get custody address from Neynar
    const userRes = await fetch(
      `https://api.neynar.com/v2/farcaster/user-by-fid?fid=${fid}`,
      {
        headers: {
          accept: 'application/json',
          'x-api-key': NEYNAR_API_KEY,
        },
      }
    )

    if (!userRes.ok) {
      console.error('Neynar lookup failed', await userRes.text())
      return NextResponse.json({ error: 'User lookup failed' }, { status: 500 })
    }

    const userData = await userRes.json()
    const address = userData?.result?.user?.custody_address as `0x${string}`
    if (!address) {
      return NextResponse.json({ error: 'Custody address missing' }, { status: 400 })
    }

    // ✅ 3. Verify wallet holds the OriginStory token
    const balance = await publicClient.readContract({
      address: ORIGIN_CONTRACT,
      abi: parseAbi(['function balanceOf(address) view returns (uint256)']),
      functionName: 'balanceOf',
      args: [address],
    })

    const ownsNFT = BigInt(balance) > 0n

    if (!ownsNFT) {
      return NextResponse.json({ verified: false, reason: 'User does not hold OriginStory coin' }, { status: 403 })
    }

    // ✅ 4. Success
    return NextResponse.json({ verified: true, fid, address })
  } catch (err) {
    console.error('Verification error:', err)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
