'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { OnchainKitProvider } from '@coinbase/onchainkit'
import { base } from 'viem/chains'

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <OnchainKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        chain={base}
        rpcUrl={process.env.NEXT_PUBLIC_RPC_URL || 'https://mainnet.base.org'} // ✅ required for production
      >
        {children}
      </OnchainKitProvider>
    </QueryClientProvider>
  )
}
