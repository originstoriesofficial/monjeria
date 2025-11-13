import { NextResponse } from 'next/server'
import { CONTRACTS } from '@/lib/contracts'
import { Alchemy, Network } from 'alchemy-sdk'

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_KEY!,
  network: Network.BASE_MAINNET,
})

export async function POST(req: Request) {
  const { address } = await req.json()
  if (!address) return NextResponse.json({ error: 'Missing address' }, { status: 400 })

  const nfts = await alchemy.nft.getNftsForOwner(address)
  const owned = nfts.ownedNfts.map(n => n.contract.address.toLowerCase())

  if (owned.includes(CONTRACTS.monks.toLowerCase()) || owned.includes(CONTRACTS.base.toLowerCase()))
    return NextResponse.json({ price: 0 })
  if (owned.includes(CONTRACTS.ticket.toLowerCase())) return NextResponse.json({ price: 0.001 })
  return NextResponse.json({ price: 0.002 })
}
