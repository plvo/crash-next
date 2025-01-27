'use client';

import React from 'react';
import { User } from 'next-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavSheet } from './sheet.nav';
import { LinkPage } from './link.page';
import ButtonTheme from '@/components/ui/shuip/button.theme';
import ButtonLogout from '@/components/ui/shuip/button.signout';
import { PAGES_LIST } from '@/lib/constants';

function Nav({ sessionUser }: { sessionUser: User }) {
  const { name, pseudo, image } = sessionUser;
  const pathname = usePathname();
  const pagesList = PAGES_LIST(pseudo, name as string, image as string);

  return (
    <nav className="fixed backdrop-blur-lg top-0 w-full p-4 border-b">
      <div className="container flex items-center justify-between max-w-5xl mx-auto ">
        <div className="flex max-sm:flex-col items-center space-x-2">
          <Link href="/" className=" hover:underline underline-offset-4 font-semibold text-xl">
            <span className="text-primary">next-social-boilerplate</span>
          </Link>
        </div>

        {/* Burger Menu */}
        <NavSheet pathname={pathname} sessionUser={sessionUser} PAGES_LIST={pagesList} />

        {/* Nav links */}
        <div className="flex items-center space-x-4 max-md:hidden">
          {pagesList.map((page, index) => (
            <LinkPage key={index} pathname={pathname} pageLink={page} />
          ))}
          <ButtonTheme />
          <ButtonLogout withLogo />
        </div>
      </div>
    </nav>
  );
}

const NavMargin = ({ sessionUser }: { sessionUser: User }) => (
  <React.Fragment>
    <Nav sessionUser={sessionUser} />
    <div className="h-16" />
  </React.Fragment>
);

export default NavMargin;
