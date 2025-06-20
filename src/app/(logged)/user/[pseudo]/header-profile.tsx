'use client';

import HoverItem from '@/components/ui/shuip/hover.item';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserQuery } from '@/hooks/use-user';
import type { ReturnUser } from '@/types/api';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const DialogEditProfile = dynamic(() => import('./edit-profile-dialog'), {
  loading: () => <Skeleton className='w-32 h-10' />,
});

interface HeaderProfileProps<T extends boolean> {
  initialData: ReturnUser<T, false>;
}

export default function HeaderProfile<T extends boolean>({ initialData }: HeaderProfileProps<T>) {
  const { data: user } = useUserQuery({
    id: initialData.id,
    initialData,
    withPublications: true as T,
  });

  const { data: session } = useSession();
  const isUserProfile = session?.user.pseudo === user.pseudo;

  return (
    <header className='w-full flex max-md:flex-col items-center justify-between gap-4'>
      <div className='flex max-md:flex-col max-lg:justify-center items-center gap-4'>
        <Avatar>
          <AvatarImage src={user.profileImg} className='size-64 rounded-full object-cover' />
          <AvatarFallback>
            <Skeleton className='size-64 rounded-full' />
          </AvatarFallback>
        </Avatar>
        <div className='text-center md:text-start'>
          <h2 className='flex items-center gap-2 text-4xl font-bold'>
            {user.name}
            {user.role === 'VIP' && (
              <HoverItem
                trigger={<StarFilledIcon className='text-yellow-500 size-8' />}
                content={
                  <p className='text-sm'>
                    This user is a <span className='text-yellow-500'>VIP</span>
                  </p>
                }
              />
            )}
          </h2>
          <Link href={`mailto:${user.email}`} className='link-string text-foreground/50'>
            {user.email}
          </Link>
          <p className='text-foreground/30'>{user.phone}</p>
        </div>
      </div>

      {session ? isUserProfile && <DialogEditProfile data={user} /> : <Skeleton className='w-40 h-8' />}
    </header>
  );
}
