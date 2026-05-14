import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");
  const isOnLogin = req.nextUrl.pathname.startsWith("/admin/login");

  if (isOnAdmin && !isOnLogin && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
