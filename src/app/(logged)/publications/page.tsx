import { getAllPublications } from '@/actions';
import PublicationsList from '@/components/publications-list';
import { QueryBoundary } from '@/components/query-boundary';
import { Skeleton } from '@/components/ui/skeleton';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Publications',
};

export default function PublicationsPage() {
  return (
    <section>
      <h1>Publications</h1>
      <React.Suspense fallback={<PublicationSkeleton />}>
        <PublicationContent />
      </React.Suspense>
    </section>
  );
}

async function PublicationContent() {
  const res = await getAllPublications();
  if (!res.ok) {
    throw new Error(res.message);
  }

  return (
    <QueryBoundary loadingFallback={<PublicationSkeleton />}>
      <PublicationsList initialData={res.data} />
    </QueryBoundary>
  );
}

function PublicationSkeleton() {
  return Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className='w-full h-40 rounded-xl' />);
}
