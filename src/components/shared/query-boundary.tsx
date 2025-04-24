'use client';

import { Button } from '@/components/ui/button';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import React from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

interface QueryBoundaryProps {
  children: React.ReactNode;
  loadingFallback?: React.ReactNode;
  errorFallback?: (props: FallbackProps) => React.ReactNode;
  queryKeys?: string[];
}

export function QueryBoundary({
  children,
  loadingFallback = 'Loading...',
  errorFallback,
  queryKeys = [],
}: QueryBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={(props) =>
            errorFallback ? errorFallback(props) : <DefaultErrorFallback {...props} queryKeys={queryKeys} />
          }
        >
          <React.Suspense fallback={loadingFallback}>{children}</React.Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

function DefaultErrorFallback({ error, resetErrorBoundary, queryKeys = [] }: FallbackProps & { queryKeys?: string[] }) {
  return (
    <div className='p-6 rounded-lg border border-destructive/30 bg-destructive/5 flex flex-col items-center justify-center space-y-4 text-center'>
      <AlertTriangle className='text-destructive h-12 w-12' />
      <div>
        <h3 className='text-lg font-semibold mb-2'>Une erreur est survenue</h3>
        <p className='text-muted-foreground'>{error.message || 'Unexpected error'}</p>
        {queryKeys.length > 0 && (
          <p className='text-xs text-muted-foreground mt-2'>
            Concerned quer{queryKeys.length > 1 ? 'ies' : 'y'}: {queryKeys.join(', ')}
          </p>
        )}
      </div>
      <Button onClick={resetErrorBoundary} variant='outline' className='gap-2'>
        <RefreshCcw className='h-4 w-4' />
        Retry
      </Button>
    </div>
  );
}
