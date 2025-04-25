'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import ButtonLogout from '@/components/ui/shuip/button.signout';
import ButtonTheme from '@/components/ui/shuip/button.theme';
import { MenuIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';

interface Page {
  href?: string;
  label?: string;
  icon?: React.JSX.Element;
  startWith?: string;
}

export default function Nav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { user } = session || {};

  const pages: Page[] = [
    { href: '/', label: 'Home' },
    { href: '/publications', label: 'Publications', startWith: '/publication' },
    {
      href: user && `/user/${user.pseudo}`,
      label: user?.name,
      icon: user ? (
        <Avatar className='flex items-center'>
          <AvatarImage src={user.image} />
        </Avatar>
      ) : (
        <Skeleton className='size-8 rounded-full' />
      ),
    },
  ];

  return (
    <React.Fragment>
      <nav className='fixed backdrop-blur-lg top-0 w-full p-4 border-b z-50'>
        <div className='flex items-center justify-between max-w-5xl mx-auto'>
          <div className='flex max-sm:flex-col items-center space-x-2'>
            <Link href='/' className=' hover:underline underline-offset-4 font-semibold text-xl'>
              <span className='text-primary'>next-social-boilerplate</span>
            </Link>
          </div>

          {/* Burger Menu */}
          <NavSheet pathname={pathname} nameUser={user?.name} pages={pages} />

          {/* Nav links */}
          <div className='flex items-center space-x-4 max-md:hidden'>
            {pages.map((page, i) => {
              const { href, label, icon, startWith } = page;
              if (!href || !label) return <Skeleton key={i} className='w-8 h-8 rounded-full' />;

              const isCurrentPage = startWith ? pathname.startsWith(href) : href === pathname;
              const textColor = isCurrentPage ? 'text-primary underline' : 'text-foreground/50';

              return (
                <Link key={href} href={href} className={`${textColor} link-string flex items-center gap-1.5`}>
                  {icon && icon}
                  {label}
                </Link>
              );
            })}
            <ButtonTheme />
            <ButtonLogout withLogo />
          </div>
        </div>
      </nav>
      <div className='h-24' />
    </React.Fragment>
  );
}

interface NavSheetProps {
  pathname: string;
  nameUser?: string;
  pages: Page[];
}

function NavSheet({ pathname, nameUser, pages }: NavSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild className='md:hidden'>
        <Button variant='outline' size={'icon'}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className='md:hidden flex flex-col justify-between py-16'>
        <SheetHeader className='space-y-8'>
          <div className='text-center'>
            <SheetTitle>NextCrudStarter</SheetTitle>
            <SheetDescription>Welcome back {nameUser}</SheetDescription>
          </div>
          <div className='w-full flex flex-col gap-4'>
            {pages.map((page) => {
              const { href, label } = page;
              if (!href || !label) return <Skeleton key={label} className='w-8 h-8 rounded-full' />;

              const isCurrentPage = href === '/' ? pathname === href : pathname.startsWith(href);
              return (
                <Link key={href} href={href} className='w-full'>
                  <Button variant={isCurrentPage ? 'default' : 'outline'} className='w-full'>
                    {label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </SheetHeader>

        <div className='w-full flex flex-col gap-4'>
          <ButtonTheme withText />
          <ButtonLogout />
        </div>
      </SheetContent>
    </Sheet>
  );
}
