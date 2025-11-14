'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sdk } from '@farcaster/miniapp-sdk';
import styles from './page.module.css';

export default function Home() {
  const [user, setUser] = useState<{ displayName?: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadContext() {
      const context = await sdk.context;
      if (context?.user) {
        setUser(context.user);
      }
    }

    loadContext();
  }, []);

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} type="button">
        ✕
      </button>

      <div className={styles.content}>
        <div className={styles.waitlistForm}>
          <h1 className={styles.title}>Welcome to LA MONJERIA</h1>

          <p className={styles.subtitle}>
            Hey {user?.displayName || 'there'}, choose your path:
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <button
              onClick={() => router.push('/create')}
              className={styles.joinButton}
            >
              🧘 Create
            </button>

            <button
              onClick={() => router.push('/music')}
              className={styles.joinButton}
            >
              🎵 Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
