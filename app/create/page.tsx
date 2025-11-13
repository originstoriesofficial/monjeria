'use client'

import { useState } from 'react'

export default function CreatePage() {
  const [answers, setAnswers] = useState(['', '', ''])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ image?: string; voice?: string } | null>(null)

  const handleChange = (index: number, value: string) => {
    const next = [...answers]
    next[index] = value
    setAnswers(next)
  }

  const handleSubmit = async () => {
    setLoading(true)
    const prompt = answers.join(', ')

    const imageRes = await fetch('/api/generate-image', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    }).then(r => r.json())

    const voiceRes = await fetch('/api/generate-voice', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    }).then(r => r.json())

    setResult({ image: imageRes.url, voice: voiceRes.url })
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center p-8 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">La Monjería — Create Your Character</h1>

      {['Who are you?', 'What’s your purpose?', 'What power drives you?'].map((q, i) => (
        <input
          key={i}
          value={answers[i]}
          onChange={e => handleChange(i, e.target.value)}
          placeholder={q}
          className="border border-gray-300 rounded-md p-2 my-2 w-full"
        />
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-black text-white rounded-md"
      >
        {loading ? 'Generating…' : 'Create Character'}
      </button>

      {result && (
        <div className="mt-8 space-y-4">
          {result.image && <img src={result.image} alt="Generated" className="rounded-md" />}
          {result.voice && (
            <audio controls className="mt-2">
              <source src={result.voice} type="audio/mpeg" />
            </audio>
          )}
        </div>
      )}
    </div>
  )
}
