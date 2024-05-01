import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";
// import { cookies } from "next/headers";

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/profile",
    "/backup",
    "/counsellor/:path*",
    "/home/:path*",
    "/profile/:path*",
    "/student/:path*",
    "/view-report/:path*",
    "/logout",
    "/",
  ],
};

// protected

export async function middleware(request: NextRequest) {
  // const token = await getToken({ req: request }) || request.cookies.get("token")?.value || "";
  console.log("middleware works");
  const url = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  console.log("current url => ", url);

  if (url.startsWith("/logout")) {
    // handle logout
    request.cookies.clear();
    console.log("cookies cleared");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Protected routes
  if (
    !token &&
    (url.startsWith("/dashboard") ||
      url.startsWith("/student") ||
      url.startsWith("/counsellor") ||
      url.startsWith("/view-report") ||
      url.startsWith("/profile"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
