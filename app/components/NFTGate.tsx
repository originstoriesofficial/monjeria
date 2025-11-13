'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export default function NFTGate({ children }: { children: ReactNode }) {
  const { address } = useAccount()
  const [allowed, setAllowed] = useState<boolean | null>(null)

  useEffect(() => {
    if (!address) return
    fetch('/api/check-nft', {
      method: 'POST',
      body: JSON.stringify({ address }),
    })
      .then(r => r.json())
      .then(d => setAllowed(d.price === 0 || d.price === 0.001))
  }, [address])

  if (!address) return <p className="text-center">Connect your wallet first.</p>
  if (allowed === null) return <p className="text-center">Checking access…</p>
  if (!allowed) return <p className="text-center">You don’t own the required NFT.</p>

  return <>{children}</>
}
