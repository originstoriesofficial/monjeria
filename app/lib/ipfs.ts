import pinataSDK from '@pinata/sdk'

const pinata = new pinataSDK({
  pinataApiKey: process.env.PINATA_API_KEY!,
  pinataSecretApiKey: process.env.PINATA_SECRET_API_KEY!,
})

export async function uploadToIPFS(fileUrl: string, type: string) {
  const metadata = { name: `LaMonjeria-${type}-${Date.now()}` }
  const res = await fetch(fileUrl)
  const blob = await res.blob()

  const file = new File([blob], metadata.name)
  const pinned = await pinata.pinFileToIPFS(file as any, { pinataMetadata: metadata })
  return { ipfsHash: pinned.IpfsHash, url: `https://gateway.pinata.cloud/ipfs/${pinned.IpfsHash}` }
}
