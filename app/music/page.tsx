'use client'

import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'

export default function MusicPage() {
  const { address } = useAccount()
  const [price, setPrice] = useState<number | null>(null)
  const [status, setStatus] = useState<string>('')

  useEffect(() => {
    if (!address) return
    fetch('/api/check-nft', {
      method: 'POST',
      body: JSON.stringify({ address }),
    })
      .then(r => r.json())
      .then(d => setPrice(d.price))
  }, [address])

  const handleGenerate = async () => {
    setStatus('Generating music...')
    const res = await fetch('/api/generate-voice', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'create mystical monk song' }),
    }).then(r => r.json())
    setStatus('Uploading to IPFS...')
    await fetch('/api/upload-ipfs', {
      method: 'POST',
      body: JSON.stringify({ fileUrl: res.url, type: 'audio' }),
    })
    setStatus('Done! View in Success Page.')
  }

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-4">Generate Sacred Music</h1>
      {address ? (
        <>
          <p className="mb-2">Detected Wallet: {address}</p>
          {price !== null ? (
            <>
              <p className="mb-4">
                Mint Price: <b>{price === 0 ? 'Free' : `${price} ETH`}</b>
              </p>
              <button
                onClick={handleGenerate}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Generate Music
              </button>
              {status && <p className="mt-4">{status}</p>}
            </>
          ) : (
            <p>Checking NFT ownership…</p>
          )}
        </>
      ) : (
        <p>Please connect your wallet.</p>
      )}
    </div>
  )
}
