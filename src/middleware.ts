// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Proteksi rute admin, tapi izinkan akses ke halaman login
export const config = {
  matcher: ['/admin/:path*'],
};

export function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname;

  // Check if the pathname starts with /admin
  if (pathname.startsWith('/admin')) {
    // Check for auth token in cookies
    const authToken = request.cookies.get('authToken')?.value;

    // If no auth token, redirect to login
    if (!authToken) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    // Optional: Validate the token
    if (!authToken.length || authToken === 'undefined') {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Continue with the request if authenticated
  return NextResponse.next();
}
