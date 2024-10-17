interface ApiSuccessResponse<T> {
    ok: true;
    data: T;
}

interface ApiErrorResponse {
    ok: false;
    message: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;