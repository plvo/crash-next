import React from "react";
import { getServerSession } from "next-auth";
import NavMargin from "@/components/global/nav/nav";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  return (
    <React.Fragment>
      <NavMargin sessionUser={session.user} />
      {children}
    </React.Fragment>
  );
}
