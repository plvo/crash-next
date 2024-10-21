"use client";

import CardPublication from "@/components/publications/card.publication";
import { Separator } from "@/components/ui/separator";
import HeaderProfile from "@/components/user/header.profile";
import SkeletonUser from "@/components/user/skeleton.user";
import { userGet } from "@/handlers/user.get";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function Page({ params }: { params: { pseudo: string } }) {
  const { pseudo } = params;

  const { data: session } = useSession();

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", pseudo],
    queryFn: () => userGet(pseudo, true),
  });

  if (isLoading) return <SkeletonUser />;

  if (isError || !session || !response?.ok) return <div>Error</div>;

  const isUserProfile = session.user.pseudo === pseudo;

  return (
    <section>
      <HeaderProfile data={response.data} isUserProfile={isUserProfile} />
      <Separator />
      {response.data.publications.map((publication) => (
        <CardPublication
          key={publication.id}
          data={publication}
          authorData={response.data}
        />
      ))}
    </section>
  );
}
