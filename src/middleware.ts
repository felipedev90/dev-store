import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("middleware rodando", request.nextUrl.pathname);

  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout"],
};
