import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo.svg|api|admin|sitemap.xml|robots.txt).*)'],
};

export function middleware(req: NextRequest) {
  return NextResponse.next();
}
