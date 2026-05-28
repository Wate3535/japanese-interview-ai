
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(
  request: NextRequest
) {
  const protectedRoutes = [
    '/dashboard',
    '/settings',
    '/interview',
    '/history',
    '/feedback',
  ];

  const isProtectedRoute =
    protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(
        route
      )
    );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const firebaseAuth =
    request.cookies.get(
      'firebase-auth'
    );

  if (!firebaseAuth) {
    return NextResponse.redirect(
      new URL('/login', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/interview/:path*',
    '/history/:path*',
    '/feedback/:path*',
  ],
};

