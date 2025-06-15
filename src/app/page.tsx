import { Button } from '@/components/ui/button';
import ButtonTheme from '@/components/ui/shuip/button.theme';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <section className='h-[90vh] flex flex-col items-center justify-center'>
      <div className='text-center space-y-4'>
        <h1>
          Welcome to <code className='bg-muted px-1.5 py-0.5 rounded-md'>crash-next</code>
        </h1>
        <p className='font-thin text-muted-foreground'>
          An evolving Next.js template for experimenting with up-to-date practices and technologies.
        </p>
      </div>

      <div className='flex gap-4 justify-center items-center'>
        <Link href={'/signin'}>
          <Button>/signin page</Button>
        </Link>
        <ButtonTheme />
        <Link href={'https://github.com/plvo/crash-next'}>
          <Button size={'icon'} variant={'outline'}>
            <GithubIcon className='size-4' />
          </Button>
        </Link>
      </div>
    </section>
  );
}
