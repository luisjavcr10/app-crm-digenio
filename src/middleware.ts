// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/server/utils/session";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const hasSession = cookieStore.get(COOKIE_NAME)?.value;

  if (pathname === "/" || pathname.startsWith("/login")) {
    if (pathname.startsWith("/login") && hasSession) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
    return;
  }

  if (!hasSession) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images|fonts|api).*)"],
};
