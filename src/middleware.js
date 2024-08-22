import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request) {
  // Access cookies from the request
  const cookies = request.cookies;
  console.log('Cookies:', cookies);

  // Extract the token
  const token = cookies.get('_vercel_jwt')?.value;
  console.log('Token:', token);

  if (token) {
    try {
      // Verify the token
      await jwt.verify(token, process.env.JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }
  console.log('token is not present')
  return NextResponse.redirect(new URL('/signin', request.url));
}

export const config = {
  matcher: ['/cart'], // Ensure this matches your route
};
