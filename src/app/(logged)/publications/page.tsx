import { getAllPublications } from '@/actions';
import CardPublication from '@/components/publications/card.publication';
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

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return res.data.map((publication) => <CardPublication key={publication.id} initialData={publication} />);
}

function PublicationSkeleton() {
  return Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className='w-full h-40 rounded-xl' />);
}
