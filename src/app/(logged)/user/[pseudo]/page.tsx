'use client';

import CardPublication from '@/components/publications/card.publication';
import { Separator } from '@/components/ui/separator';
import HeaderProfile from '@/components/user/header.profile';
import SkeletonUser from '@/components/user/skeleton.user';
import { useUser } from '@/hooks/use-user';
import type { Publication, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import * as React from 'react';

export default function Page({ params }: { params: Promise<{ pseudo: string }> }) {
  const { pseudo } = React.use(params);
  const sanitizedPseudo = encodeURIComponent(pseudo.toLowerCase());
  const { data: session } = useSession();
  const isUserProfile = session?.user.pseudo === pseudo;

  const { user, isLoading, queryError } = useUser(sanitizedPseudo, true, isUserProfile).query;

  if (isLoading) return <SkeletonUser />;

  if (!session || queryError || !user) {
    return (
      <div>
        Error: {JSON.stringify(queryError)}
        <pre>{JSON.stringify({ session, queryError, sanitizedPseudo }, null, 2)}</pre>
      </div>
    );
  }

  return (
    <section>
      <HeaderProfile data={user} isUserProfile={isUserProfile} />
      <Separator />
      {user.publications?.map((publication: Publication) => (
        <CardPublication key={publication.id} data={publication} authorData={user as User} />
      ))}
    </section>
  );
}
