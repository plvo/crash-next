'use client';

import { getUser } from '@/actions';
import HoverItem from '@/components/ui/shuip/hover.item';
import { useActionQuery } from '@/hooks/use-action';
import type { ReturnUser } from '@/types/api';
import type { User } from '@prisma/client';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import DialogEditProfile from './dialog.edit-profile';

interface HeaderProfileProps<T extends boolean> {
  initialData: ReturnUser<true, T>;
}

export default function HeaderProfile<T extends boolean>({ initialData }: HeaderProfileProps<T>) {
  const { data: user } = useActionQuery({
    initialData,
    queryKey: ['user', initialData.id],
    actionFn: () => getUser({ idOrPseudo: initialData.id, withPublications: true }),
  });

  const { data: session } = useSession();
  if (!session) {
    return null;
  }

  const { name, profileImg, role, email, phone, pseudo } = user;
  const isUserProfile = session.user.pseudo === pseudo;

  return (
    <header className='w-full flex max-md:flex-col items-center justify-between gap-4'>
      <div className='flex max-md:flex-col max-lg:justify-center items-center gap-4'>
        <Avatar>
          <AvatarImage src={profileImg} className='size-64 rounded-full object-cover' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='text-center md:text-start'>
          <h2 className='flex items-center gap-2 text-4xl font-bold'>
            {name}
            {role === 'VIP' && (
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
          <Link href={`mailto:${email}`} className='link-string text-foreground/50'>
            {email}
          </Link>
          <p className='text-foreground/30'>{phone}</p>
        </div>
      </div>

      {isUserProfile && <DialogEditProfile data={user as User} />}
    </header>
  );
}
