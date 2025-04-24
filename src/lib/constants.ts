import type { ApiErrorResponse } from '@/types/api';

export const apiInternalError: ApiErrorResponse = {
  ok: false,
  message: 'Internal Server Error',
};
