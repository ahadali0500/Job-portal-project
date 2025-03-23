// This example assumes you're using the new Middleware (file-based routing) in Next.js 14.
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// This is your secret from NextAuth configuration. Ensure it matches.
const secret = process.env.NEXTAUTH_SECRET;
export async function middleware(req) {
    const session = await getToken({ req, secret });
    const authenticatedRoutes = ['/auth/signin/', '/auth/signup/', '/auth/forgot-password/'];
    const nonAuthRoutesPatterns = [
        '/dashboard/',
        '/jobs/',
        '/article/save',

    ];
    // Use nextUrl.pathname for Next.js versions that support it
    const pathname = req.nextUrl.pathname;

    // Improved logic for route matching using regular expressions:
    const isNonAuthRoute = nonAuthRoutesPatterns.some((route) => {
      const regex = new RegExp(`^${route}`); // Match the beginning of the path
      return regex.test(pathname);
    });
    const isAuthRoute = authenticatedRoutes.some((route) => {
      const regex = new RegExp(`^${route}`);
      return regex.test(pathname);
    });
  
    if (session && isAuthRoute) {
      return NextResponse.redirect(new URL('/', req.nextUrl)); // Redirect to home
    } else if (!session && isNonAuthRoute) {
      return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
    }

    // Continue to the requested page if session exists or if it's a public path
    return NextResponse.next();
}