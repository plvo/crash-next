"use client";

import { userGet } from "@/handlers/user.get";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function Page({ params }: { params: { id_user: string } }) {
  const { id_user } = params;

  const {data:session } = useSession();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", id_user],
    queryFn: () => userGet(id_user),
  });

  return <div>
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
    <pre>
      {JSON.stringify(session, null, 2)}
    </pre>
  </div>
}
