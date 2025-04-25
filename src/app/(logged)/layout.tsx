import Nav from '@/components/shared/nav';
import React from 'react';

export default async function LoggedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      <Nav />
      {children}
    </React.Fragment>
  );
}
