import { getUser } from '@/actions';
import CardPublication from '@/components/publications/card.publication';
import PublicationsList from '@/components/shared/publications-list';
import { QueryBoundary } from '@/components/shared/query-boundary';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import DialogNewPublication from '@/components/user/dialog-new-publication';
import HeaderProfile from '@/components/user/header.profile';
import type { PublicationWithAuthor } from '@/types/prisma';
import type { Publication } from '@prisma/client';
import * as React from 'react';

interface Params {
  params: Promise<{
    pseudo: string;
  }>;
}

export default async function UserPage({ params }: Params) {
  const { pseudo } = await params;

  return (
    <section>
      <React.Suspense fallback={<SkeletonUser />}>
        <UserContent pseudo={pseudo} />
      </React.Suspense>
    </section>
  );
}

async function UserContent({ pseudo }: { pseudo: string }) {
  const sanitizedPseudo = encodeURIComponent(pseudo.toLowerCase());

  const res = await getUser({ idOrPseudo: sanitizedPseudo, withPublications: true, withAll: false });
  if (!res.ok) {
    throw new Error(res.message);
  }

  const initialData: PublicationWithAuthor[] = (res.data.publications || []).map((pub: Publication) => ({
    ...pub,
    author: res.data,
  }));

  return (
    <React.Fragment>
      <QueryBoundary loadingFallback={<SkeletonHeader />}>
        <HeaderProfile initialData={res.data} />
      </QueryBoundary>
      <Separator />
      <QueryBoundary loadingFallback={<SkeletonContent />}>
        <DialogNewPublication data={res.data} />
        <PublicationsList initialData={initialData} />
      </QueryBoundary>
    </React.Fragment>
  );
}

function SkeletonHeader() {
  return (
    <header className='flex max-md:flex-col max-lg:justify-center items-center gap-4'>
      <Skeleton className='size-64 rounded-full' />
      <div className='space-y-2'>
        <Skeleton className='w-48 h-8' />
        <Skeleton className='w-40 h-4' />
        <Skeleton className='w-40 h-4' />
      </div>
    </header>
  );
}

function SkeletonContent() {
  return <Skeleton className='w-full h-40 rounded-xl' />;
}

function SkeletonUser() {
  return (
    <section>
      <SkeletonContent />
      <Separator />
      <SkeletonHeader />
    </section>
  );
}
