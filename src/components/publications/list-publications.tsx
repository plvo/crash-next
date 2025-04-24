'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { publicationGetAll } from '@/handlers/publication.get';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import CardPublication from './card.publication';

export default function ListPublications() {
  const { data: session } = useSession();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['publications'],
    queryFn: () => publicationGetAll(),
  });

  if (!session || isLoading) {
    return Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className='w-full h-40 rounded-xl' />);
  }

  if (isError || !data?.ok) {
    return <div>Error</div>;
  }

  return data.data.map((publication) => <CardPublication key={publication.id} data={publication} />);
}
