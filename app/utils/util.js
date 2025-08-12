'use client';

import { useRouter } from 'next/navigation';

export function useAsset(path) {
  const { basePath } = useRouter();
  return `${basePath}/${path}`;
}
