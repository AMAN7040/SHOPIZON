import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  console.log("Middleware executed");
  const token = request.cookies.get("token")?.value;
  console.log("Token from request:", token);

  if (token) {
    try {
      const decoded = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      console.log("Token verified:", decoded);
      return NextResponse.next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  console.log("No token found, redirecting to /signin");
  return NextResponse.redirect(new URL("/signin", request.url));
}

export const config = {
  matcher: ["/cart"],
};
