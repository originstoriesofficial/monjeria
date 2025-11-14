'use client';

import { useComposeCast } from '@coinbase/onchainkit/minikit';

type Props = {
  imageUrl: string;
  tokenId?: string;
};

export default function ComposeCastButton({ imageUrl, tokenId }: Props) {
  const { composeCast } = useComposeCast();

  const shareText = `🧘‍♂️ Just minted a Monk on La Monjería!${tokenId ? ` (#${tokenId})` : ''}`;

  return (
    <div className="space-y-4 mt-8">
      <button
        onClick={() =>
          composeCast({
            text: shareText,
          })
        }
        className="w-full py-3 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700"
      >
        Share Achievement
      </button>

      <button
        onClick={() =>
          composeCast({
            text: '🧘‍♂️ I just minted this monk! Join me on La Monjería.',
            embeds: [imageUrl],
          })
        }
        className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700"
      >
        Share Image
      </button>
    </div>
  );
}
