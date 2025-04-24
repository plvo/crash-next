import type { user } from '@prisma/client';

interface ApiSuccessResponse<T> {
  ok: true;
  data: T;
}

interface ApiErrorResponse {
  ok: false;
  message: string;
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

interface BaseUser extends Omit<user, 'password' | 'created_at' | 'updated_at'> {
  publications?: publications[];
}

interface FullUser extends user {
  publications?: publications[];
}

type ReturnUser<T extends boolean, U extends boolean> = T extends true
  ? U extends true
    ? FullUser
    : BaseUser
  : BaseUser;

export type { ApiErrorResponse, ApiSuccessResponse, ApiResponse };
export type { ReturnUser, BaseUser, FullUser };
