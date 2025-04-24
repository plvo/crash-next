'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ErrorComponentProps {
  error: Error & { digest?: string; environmentName?: string };
  reset?: () => void;
}

export default function ErrorComponent({ error, reset }: ErrorComponentProps) {
  return (
    <div className='px-6 py-4 rounded-lg border border-destructive/30 border-dashed bg-destructive/5 flex flex-col items-center justify-center space-y-4 text-center'>
      <AlertTriangle className='text-destructive h-12 w-12' />
      <div className='space-y-1'>
        <h3 className='text-lg font-semibold mb-2'>Oops, something went wrong!</h3>
        <p className='text-muted-foreground'>{error.message}</p>
        {error.digest && <p className='text-muted-foreground'>Digest: {error.digest}</p>}
        {error.environmentName && <p className='text-muted-foreground'>Environment: {error.environmentName}</p>}
        {reset && (
          <Button onClick={() => reset()} className='mt-4'>
            Try again
          </Button>
        )}
      </div>
    </div>
  );
}
