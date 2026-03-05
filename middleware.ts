import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Local development: pass through all requests without auth
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
