'use client';

import CardPublication from '@/components/publications/card.publication';
import { Separator } from '@/components/ui/separator';
import HeaderProfile from '@/components/user/header.profile';
import SkeletonUser from '@/components/user/skeleton.user';
import { useUser } from '@/hooks/use-user';
import type { publications, user } from '@prisma/client';
import { useSession } from 'next-auth/react';
import * as React from 'react';

export default function Page({ params }: { params: Promise<{ pseudo: string }> }) {
  const { pseudo } = React.use(params);
  const sanitizedPseudo = encodeURIComponent(pseudo.toLowerCase());
  const { data: session } = useSession();
  const isUserProfile = session?.user.pseudo === pseudo;

  const { user, isLoading, isQueryError, queryError } = useUser(sanitizedPseudo, true, isUserProfile).query;

  if (isLoading) return <SkeletonUser />;

  if (!session || isQueryError || !user) {
    return <div>Error: {JSON.stringify(queryError)}</div>;
  }

  return (
    <section>
      <HeaderProfile data={user} isUserProfile={isUserProfile} />
      <Separator />
      {user.publications?.map((publication: publications) => (
        <CardPublication key={publication.id} data={publication} authorData={user as user} />
      ))}
    </section>
  );
}
