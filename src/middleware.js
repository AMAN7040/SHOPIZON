import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  // Extract the token from cookies
  const token = request.cookies.get('token')?.value;

  if (token) {
    try {
      // Verify the token
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

      // Token is valid, proceed to the requested page
      return NextResponse.next();
    } catch (error) {
      // Token is invalid or expired, redirect to sign-in
      return NextResponse.redirect(new URL("/signin", request.url));
  
    }
  }

  // No token present, redirect to sign-in
  return NextResponse.redirect(new URL("/signin", request.url));

}

export const config = {
  matcher: ['/cart'], // Protect the cart route
};
