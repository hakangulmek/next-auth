import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Rol bazlı yetkilendirme
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Admin sayfalarını koruma
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Dashboard erişimi
    if (pathname.startsWith("/dashboard") && !token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Korumalı rotalar için token kontrolü
        const { pathname } = req.nextUrl;

        if (
          pathname.startsWith("/dashboard") ||
          pathname.startsWith("/admin")
        ) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/api/protected/:path*"],
};
