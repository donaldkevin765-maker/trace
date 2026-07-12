import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/', '/product', '/cart', '/login']
const STATIC_EXTENSIONS = ['.ico', '.png', '.jpg', '.svg', '.css', '.js', '.json', '.txt', '.webmanifest']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip API and static files
  if (pathname.startsWith('/api/') || STATIC_EXTENSIONS.some(ext => pathname.endsWith(ext))) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin') || pathname.startsWith('/supplier')) {
    const token = request.cookies.get('trace_token')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
