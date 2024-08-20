import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {
  const token = request.cookies.get('token') || request.headers.get('Authorization')?.split(' ')[1];
  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  return NextResponse.redirect(new URL('/signin', request.url));
}

export const config = {
  matcher: ['/cart'], // Apply to the /cart route
};
