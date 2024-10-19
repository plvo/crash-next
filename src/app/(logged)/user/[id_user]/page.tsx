"use client";

import CardPublication from "@/components/publications/card.publication";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import HeaderProfile from "@/components/user/header.profile";
import { userGet } from "@/handlers/user.get";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function Page({ params }: { params: { id_user: string } }) {
  const { id_user } = params;

  const { data: session } = useSession();

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", id_user],
    queryFn: () => userGet(id_user, true),
  });

  if (isLoading)
    return (
      <section>
        <header className="flex max-md:flex-col max-lg:justify-center items-center gap-4">
          <Skeleton className="size-64 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="w-48 h-8" />
            <Skeleton className="w-40 h-4" />
            <Skeleton className="w-40 h-4" />
          </div>
        </header>
        <Separator />
        <Skeleton className="w-full h-40 rounded-xl" />
        <Skeleton className="w-full h-40 rounded-xl" />
      </section>
    );

  if (isError || !session || !response?.ok) return <div>Error</div>;

  return (
    <section>
      <HeaderProfile data={response.data} />
      <Separator />
      {response.data.publications.map((publication) => (
        <CardPublication
          key={publication.id}
          userSession={session.user}
          data={publication}
          authorData={response.data}
        />
      ))}
    </section>
  );
}
