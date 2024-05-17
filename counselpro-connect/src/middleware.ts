import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";
import { Jwt } from "jsonwebtoken";

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
  ],
};

/**
 *
 * @param request get
 *
 * admin routes => all routes
 * normal user routes => profile, student and home, counselor own profile route not all
 *
 */

// protected

export async function middleware(request: NextRequest) {
  // const token = await getToken({ req: request }) || request.cookies.get("token")?.value || "";
  console.log("middleware works");
  const url = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  console.log("cookies is - ", request.cookies);
  console.log("current url => ", url);

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Protected routes
  let user = JSON.parse(request.cookies.get("user")?.value || "");

  // url.startsWith("/dashboard") ||
  //     url.startsWith("/student") ||
  //     url.startsWith("/counsellor") ||
  //     url.startsWith("/view-report") ||
  //     url.startsWith("/profile")

  /**
   * admin access all the routes
   * normal user access limited path
   */

  // normal user
  if (
    !user.isAdmin &&
    (url.startsWith("/student") ||
      url.startsWith("/counselor") ||
      url.startsWith("/home"))
  ) {
    return NextResponse.next();
  }

  if (!user.isAdmin) {
    return NextResponse.json("unauthorized access", { status: 401 });
  }

  /**
   * all routes for admin
   */
  if (user.isAdmin) {
    return NextResponse.next();
  }

  return NextResponse.next();
}
