import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const absolutePath = (pathname: string): string => {
  return process.env.APP_URL + pathname;
};

const NO_AUTH_PATHS = ["/", "/signin"];
const AUTH_PATHS = ["/profile"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cors = req.headers.get("Access-Control-Allow-Origin");
  console.log("cors", cors);
  const token = await getToken({ req });

  if (!token && !NO_AUTH_PATHS.includes(pathname)) {
    return Response.redirect(absolutePath("/"), 302);
  };

  if (token) {
    console.log("token", token);
  };

  return null;
}

export const config = {
  matcher: "/((?!api/auth|_next/static|_next/image|favicon.ico|ppt.svg).*)",
};