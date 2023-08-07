import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(path + "path");
  const isPublicPath =
    path === "/auth/login" ||
    path === "/auth/signup" ||
    path === "/auth/forgotpassword" ||
    path === "/auth/resetpassword" ||
    path === "/auth/verifysuccess" ||
    path === "/verifysuccess/:path*" ||
    path === "/auth/verifyemail";

  const token = request.cookies.get("token")?.value || "";
  const email = request.cookies.get("email")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/user/home", request.nextUrl));
  }

  // If it's the verifyemail path and there's no token, redirect to signup
  if (path === "/auth/verifyemail" && !email) {
    return NextResponse.redirect(new URL("/auth/signup", request.nextUrl));
  }

  if (path === "/auth/verifysuccess/:path*" && !email) {
    return NextResponse.redirect(new URL("/auth/signup", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/profile/:path*",
    "/auth/login",
    "/auth/signup",
    "/auth/verifyemail",
    "/auth/forgotpassword",
    "/auth/resetpassword",
    "/verifysuccess",
    "/verifysuccess/:path*",
  ],
};
