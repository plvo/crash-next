"use client";

import * as React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * Providers:
 * Next-auth SessionProvider
 * React-query QueryClientProvider
 * Next-themes ThemeProvider
 * Toaster component shadcn/ui
*/

const queryClient = new QueryClient();

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider defaultTheme="system" {...props}>
          {children}
          {/* <Toaster /> */}
        </NextThemesProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
