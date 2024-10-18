import Nav from "@/components/nav/nav";
import { getServerSession } from "next-auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getServerSession();

    if (!session) {
      return null;
    }

  return (
    <>
      <Nav sessionUser={session.user} />
      <main>{children}</main>
    </>
  );
}
