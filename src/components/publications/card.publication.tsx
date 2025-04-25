'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { UsePublicationQuery } from '@/hooks/use-publication';
import type { PublicationWithAuthor } from '@/types/prisma';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

interface CardPublicationProps {
  initialData: PublicationWithAuthor;
}

export default function CardPublication({ initialData }: CardPublicationProps) {
  const { data: publication } = UsePublicationQuery({
    initialData,
    id: initialData.id,
    withAuthor: true,
  });

  const { title, content, createdAt, author } = publication;
  const isVIP = author.role === 'VIP';

  const [likes, setLikes] = React.useState(Math.floor(Math.random() * 100));
  const [isLiked, setIsLiked] = React.useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  return (
    <Card className='w-full rounded-xl bg-muted-foreground/10 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out'>
      <CardContent className='p-4'>
        <div className='flex space-x-4'>
          <Avatar className='w-12 h-12'>
            <AvatarImage src={author.profileImg} alt={`@${author.name}`} className=' object-cover' />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className='flex-1 space-y-1'>
            <div className='flex items-center justify-between'>
              <h3 className={`flex items-center gap-1.5 font-semibold ${isVIP ? 'text-yellow-500' : ''}`}>
                {isVIP && <StarFilledIcon className='text-yellow-500' />}
                {author.name} <span className='text-foreground/50'>@{author.pseudo}</span>
              </h3>
              <p className='text-sm text-foreground/50'>{createdAt.toUTCString()}</p>
            </div>
            <h4>{title}</h4>
            <p className='text-sm text-left'>{content}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between items-center px-4 py-3 border-t'>
        <Button
          variant='ghost'
          size='sm'
          className='text-foreground/40 hover:text-red-600 transition-colors'
          onClick={handleLike}
        >
          <Heart className={`w-5 h-5 mr-1 ${isLiked ? 'fill-red-600 text-red-600' : 'fill-none'}`} />
          <span className='text-sm font-medium'>{likes}</span>
          <span className='sr-only'>likes</span>
        </Button>
        <Link href={`/user/${author.pseudo}`}>
          <Button variant='outline' className='text-foreground'>
            View profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
