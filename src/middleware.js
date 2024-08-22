import { NextResponse } from "next/server";

import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (token) {
    try {
      const decoded = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.redirect(new URL("/signin", request.url));
}

export const config = {
  matcher: ["/cart"], //cart route protected
};
