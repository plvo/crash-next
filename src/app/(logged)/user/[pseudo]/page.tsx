"use client";

import CardPublication from "@/components/publications/card.publication";
import { Separator } from "@/components/ui/separator";
import HeaderProfile from "@/components/user/header.profile";
import SkeletonUser from "@/components/user/skeleton.user";
import { useUser } from "@/hooks/use-user";
import { publications } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function Page({ params }: { params: { pseudo: string } }) {
  const { pseudo } = params;

  const { data: session } = useSession();

  const isUserProfile = session?.user.pseudo === pseudo;

  const { user, isLoading, isQueryError, queryError } = useUser(
    session?.user.id as string,
    true,
    isUserProfile
  ).query;

  if (isLoading) return <SkeletonUser />;

  if (!session || isQueryError || !user) {
    return <div>Error: {JSON.stringify(queryError)}</div>;
  }

  return (
    <section>
      <HeaderProfile data={user} isUserProfile={isUserProfile} />
      <Separator />
      {user.publications?.map((publication: publications) => (
        <CardPublication
          key={publication.id}
          data={publication}
          authorData={user}
        />
      ))}
    </section>
  );
}
