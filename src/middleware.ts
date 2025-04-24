import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

const absolutePath = (pathname: string): string => {
  return process.env.APP_URL + pathname;
};

const NO_AUTH_PATHS = ['/', '/signin'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cors = req.headers.get('Access-Control-Allow-Origin');
  const token = await getToken({ req });

  console.log({ cors, token });

  if (!token && !NO_AUTH_PATHS.includes(pathname)) {
    return Response.redirect(absolutePath('/'), 302);
  }

  if (token && pathname.startsWith('/signin')) {
    return Response.redirect(absolutePath('/publications'), 302);
  }

  return null;
}

export const config = {
  matcher: '/((?!api/auth|_next/static|_next/image|favicon.ico|ppt.svg).*)',
};
