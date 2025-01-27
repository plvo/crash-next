import Link from 'next/link';
import ButtonTheme from '@/components/global/button.theme';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <section className="h-[90vh] flex flex-col items-center justify-center">
      <div className="space-y-2 text-center">
        <h1 className="font-th">Welcome to your new boilerplate project!</h1>
        <p className="font-thin opacity-75">
          This template serves as a starting point for your new project. It includes a basic layout, authentication,
          (dynamic) routing, and other key features.
        </p>
      </div>

      <div className="flex gap-4 justify-center items-center">
        <Link href={'/signin'}>
          <Button>/signin page</Button>
        </Link>
        <ButtonTheme />
      </div>

      <footer className="relative w-full text-center">
        <p className="text-foreground/50">
          Made with <span className="text-foreground">❤️</span> by{' '}
          <Link href={'https://github.com/plvo'} className="text-foreground hover:underline underline-offset-2">
            plvo
          </Link>
        </p>
        <Link href={'https://github.com/plvo/next-social-boilerplate'}>
          <Button variant={'link'}>Github Repository</Button>
        </Link>
      </footer>
    </section>
  );
}
