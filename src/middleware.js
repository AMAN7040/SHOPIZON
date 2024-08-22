import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function middleware(request) {
  // Extract the token from cookies
  const token = cookies().get('token')?.value;

  if (token) {
    try {
      // Verify the token
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

      // Token is valid, proceed to the requested page
      return NextResponse.next();
    } catch (error) {
      // Token is invalid or expired, redirect to sign-in
      const redirectResponse = NextResponse.redirect(new URL('/signin', request.url));
      redirectResponse.headers.set('x-middleware-cache', 'no-cache'); // Ensure cache is disabled
      return redirectResponse;
    }
  }

  // No token present, redirect to sign-in
  const redirectResponse = NextResponse.redirect(new URL('/signin', request.url));
  redirectResponse.headers.set('x-middleware-cache', 'no-cache'); // Ensure cache is disabled
  return redirectResponse;
}

export const config = {
  matcher: ['/cart'], // Protect the cart route
};
