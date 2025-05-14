// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Paths that require authentication
const PROTECTED_PATHS = ["/profile", "/forum/new-thread", "/aktivitas"];

// Paths that require admin privileges
const ADMIN_PATHS = ["/admin"];

/**
 * Middleware for Next.js that runs before the request is completed.
 * Used for protecting routes at the server level before page rendering.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authSession = request.cookies.get("auth-session")?.value;
  const isAuthPath = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  const isAdminPath = ADMIN_PATHS.some((path) => pathname.startsWith(path));

  // Special check for admin routes
  if (isAdminPath) {
    // For admin routes, we also check the admin cookie
    const isAdmin = request.cookies.get("admin-session")?.value;

    if (!authSession || !isAdmin) {
      const url = new URL("/unauthorized", request.url);
      return NextResponse.redirect(url);
    }
  }

  // Check for protected paths
  else if (isAuthPath && !authSession) {
    const url = new URL(
      `/auth/login?redirect=${encodeURIComponent(pathname)}`,
      request.url,
    );
    return NextResponse.redirect(url);
  }

  // If the user is authenticated and tries to access login/register pages, redirect to home
  if (
    (pathname.startsWith("/auth/login") ||
      pathname.startsWith("/auth/register")) &&
    authSession
  ) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure matcher for middleware to only run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (/api/*)
     * - static files (/_next/static/*, /favicon.ico, etc.)
     * - public files (/images/*, etc.)
     */
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
  ],
};
