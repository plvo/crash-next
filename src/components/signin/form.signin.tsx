'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { ButtonSubmit } from '@/components/ui/shuip/button.submit';
import InputField from '@/components/ui/shuip/input.form-field';
import { useToast } from '@/hooks/use-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useZodForm } from 'shext';
import { z } from 'zod';

const signinSchema = z
  .object({
    email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z
      .string({ message: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters long' }),
  })
  .strict();

export default function FormSignIn() {
  const router = useRouter();
  const { toast } = useToast();
  const [Loading, setLoading] = useState<boolean>(false);
  const { form, control, handleSubmit } = useZodForm(signinSchema);

  async function onSubmit(values: z.infer<typeof signinSchema>) {
    try {
      setLoading(true);

      const response = await signIn('credentials', {
        ...values,
        redirect: false,
      });

      if (response?.ok) {
        router.push('/publications');
        return router.refresh();
      }

      toast({
        title: 'Sign In Failed',
        description: response?.error || 'Internal server error',
        variant: 'destructive',
      });
    } catch (error) {
      toast({
        title: 'Sign In Failed',
        description: (error as Error).message || 'Internal server error',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <Card className='w-full md:w-[600px]'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className='text-2xl md:text-3xl'>Sign In</CardTitle>
            <CardDescription className='text-left'>Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <InputField
              control={control}
              name='email'
              label='Email'
              placeholder='johndoe@example.com'
              type='email'
              autoComplete='email'
            />
            <InputField
              control={control}
              name='password'
              label='Password'
              placeholder='password123'
              type='password'
              autoComplete='current-password'
            />
          </CardContent>
          <CardFooter>
            <ButtonSubmit label='Sign In' disabled={Loading} />
          </CardFooter>
        </form>
      </Card>
    </Form>
  );
}
