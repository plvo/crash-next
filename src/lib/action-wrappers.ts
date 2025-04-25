import type { ApiResponse } from '@/types/api';
import { Prisma, type PrismaClient } from '@prisma/client';
import prisma from './prisma';

/**
 * Wrapper function to handle Prisma actions with error handling.
 * @param action - The action to be executed with PrismaClient.
 * @returns A promise that resolves to an ApiResponse containing the result of the action or an error response.
 */
export async function withActionWrapper<T>(action: (prisma: PrismaClient) => Promise<T>): Promise<ApiResponse<T>> {
  try {
    const data = await action(prisma);
    return { ok: true, data };
  } catch (error) {
    console.error('[WITHACTIONWRAPPER] Error:', {
      error,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });

    const message = getMessageError(error);

    return { ok: false, message };
  } finally {
    await prisma.$disconnect();
  }
}

const getMessageError = (error: unknown): string => {
  // Handle specific Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return `Unique constraint violation: ${error.meta?.target}`;
      case 'P2025':
        return 'Record not found';
      default:
        return `Database error: ${error.code}`;
    }
  }
  if (error instanceof Prisma.PrismaClientValidationError) {
    return 'Validation error';
  }
  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return `Rust panic error: ${error.cause}`;
  }
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return `Initialization error: ${error.message}`;
  }
  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return `Unknown request error: ${error.message}`;
  }

  // Handle other errors
  return error instanceof Error ? error.message : 'Internal Server Error';
};
