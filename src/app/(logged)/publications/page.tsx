import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ListPublications from "@/components/publications/list-publications";
import { Skeleton } from "@/components/ui/skeleton";
import { getServerSession } from "next-auth";

export default function Page() {
  const session = getServerSession(authOptions);

  if (!session) {
    return <Skeleton className="w-[600px] h-[200px]" />;
  }

  return (
    <>
      <h1>Publications</h1>
      <ListPublications />
    </>
  );
}
