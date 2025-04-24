import Nav from '@/components/shared/nav';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function LoggedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Unauthorized</p>;
  }

  return (
    <React.Fragment>
      <Nav authUser={session.user} />
      {children}
    </React.Fragment>
  );
}
