import { NextRequest, NextResponse } from 'next/server';

const checkAuthRegex = /(\/auth\/)((registration\b)|(login\b))/g;

export default async function middleware(req: NextRequest) {
  if (req.url.includes('/auth') && !req.url.includes('_next')) {
    const cookiesCondition = req.cookies.has('accessToken') && req.cookies.has('refreshToken');
    if (!req.url.match(checkAuthRegex) || cookiesCondition) {
      return NextResponse.redirect(process.env.CLIENT_URL as string);
    }
  }
}
