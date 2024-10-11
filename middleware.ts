import { type MiddlewareConfig, type NextRequest, NextResponse } from 'next/server'
import { auth } from './lib/auth'

export async function middleware(request: NextRequest) {
  /* checking user is authenticated */
  let session = await auth()
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
    // return NextResponse.json({ error: 'Unauthenticated' }, { status: 401, statusText: 'Unauthenticated' })
  }
  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    // '/settings',
    '/settings/:path*',
    // '/dashboard',
    '/dashboard/:path*',
    '/api/objects/:path*',
    // match all paths not starting with 'public' or 'static'
    // "/((?!public|static).*)",
    // match all paths not starting with 'api', 'public', 'static', '_next/static', '_next/image', 'favicon.ico', 'robots.txt', or end with '$'
    // "/((?!api|public|static|_next/static|_next/image|favicon.ico|robots.txt|$).*)",
  ],
}
