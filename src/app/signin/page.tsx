import { Metadata } from 'next';
import FormSignIn from '@/components/signin/form.signin';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Sign In',
  };
};

export default function Page() {
  return (
    <section className="flex items-center justify-center h-[90vh]">
      <FormSignIn />
    </section>
  );
}
