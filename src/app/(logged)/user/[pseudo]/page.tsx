import { getUser } from '@/actions';
import CardPublication from '@/components/publications/card.publication';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import HeaderProfile from '@/components/user/header.profile';
import type { Publication, User } from '@prisma/client';
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

  const res = await getUser({ idOrPseudo: sanitizedPseudo, withPublications: true });
  if (!res.ok) {
    throw new Error(res.message);
  }

  return (
    <React.Fragment>
      <HeaderProfile initialData={res.data} />
      <Separator />
      {res.data.publications?.map((publication: Publication) => (
        <CardPublication key={publication.id} initialData={publication} authorData={res.data as User} />
      ))}
    </React.Fragment>
  );
}

function SkeletonUser() {
  return (
    <section>
      <header className='flex max-md:flex-col max-lg:justify-center items-center gap-4'>
        <Skeleton className='size-64 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='w-48 h-8' />
          <Skeleton className='w-40 h-4' />
          <Skeleton className='w-40 h-4' />
        </div>
      </header>
      <Separator />
      <Skeleton className='w-full h-40 rounded-xl' />
    </section>
  );
}
