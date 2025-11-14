'use client';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-6 p-6">
      <h1 className="text-3xl font-bold text-amber-300">Bienvenido 🔓</h1>

      <button
        className="bg-green-600 px-6 py-3 rounded-lg font-bold hover:bg-green-700"
        onClick={() => router.push('/create')}
      >
        🎨 Create
      </button>

      <button
        className="bg-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-purple-700"
        onClick={() => router.push('/music')}
      >
        🎵 Play
      </button>
    </main>
  );
}
