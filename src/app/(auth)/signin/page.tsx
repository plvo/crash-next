import SigninForm from '@/app/(auth)/signin/signin-form';
import type { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Sign In',
  };
};

export default function SigninPage() {
  return (
    <section className='flex items-center justify-center h-[90vh]'>
      <SigninForm />
    </section>
  );
}
