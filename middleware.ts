import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

// Define route matchers
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isProtectedRoute = createRouteMatcher([
  "/teacher/(.*)",
  "/courses/(.*)",
  "/dashboard/(.*)"
]);

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook(.*)",
  "/api/uploadthing(.*)",
  "/test"
]);

export default clerkMiddleware(async (auth, req) => {
  // Check if it's a public route first
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // For all other routes (including protected and root), ensure user is authenticated
  try {
    await auth.protect();
    return NextResponse.next();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/api/:path*"
  ]
};
 