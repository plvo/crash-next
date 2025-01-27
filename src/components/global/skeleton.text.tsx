'use client';

import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonText = ({ text }: { text: string | undefined }) => {
  if (!text) return <Skeleton className="w-20 h-4" />;
  return text;
};
