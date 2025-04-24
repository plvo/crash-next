import NavMargin from '@/components/global/nav/nav';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';

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
