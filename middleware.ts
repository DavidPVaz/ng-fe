import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware({ nextUrl: { pathname }, url }: NextRequest) {
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/quests?page=1&limit=6', url));
    }

    return NextResponse.next();
}
