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
    console.error('Database operation failed:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          return { ok: false, message: 'Unique constraint violation' };
        case 'P2025':
          return { ok: false, message: 'Record not found' };
        default:
          return { ok: false, message: `Database error: ${error.code}` };
      }
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      return { ok: false, message: 'Validation error' };
    }

    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }

    return { ok: false, message: 'Internal Server Error' };
  } finally {
    await prisma.$disconnect();
  }
}
