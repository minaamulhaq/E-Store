import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(request) {
    const token = request.cookies.get("AccessToken")?.value;

    const { pathname } = request.nextUrl;

    // No token & trying to access secure route
    if (!token && (pathname.startsWith("/admin") || pathname.startsWith("/my-account"))) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);

            // Logged-in user trying to visit /auth/*
            if (pathname.startsWith("/auth")) {
                return NextResponse.redirect(
                    new URL(payload.role === "admin" ? "/admin/dashboard" : "/my-account", request.url)
                );
            }

            // Admin only area
            if (pathname.startsWith("/admin") && payload.role !== "admin") {
                return NextResponse.redirect(new URL("/my-account", request.url));
            }



        } catch (err) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/my-account/:path*', '/auth/:path*'],
};
