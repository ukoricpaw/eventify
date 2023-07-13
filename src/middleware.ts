import { NextRequest, NextResponse } from 'next/server';

const checkAuthRegex = /(\/auth\/)((registration\b)|(login\b))/g;

export default async function middleware(req: NextRequest) {
  if (req.url.includes('/auth') && !req.url.includes('_next')) {
    const [accessToken, refreshToken] = req.cookies.getAll();
    if (!req.url.match(checkAuthRegex) || accessToken || refreshToken) {
      return NextResponse.redirect(process.env.CLIENT_URL as string);
    }
  }
}
