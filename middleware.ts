import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role: "TEACHER" | "STUDENT";
  sub?: string;
  exp?: number;
}

// Define which roles can access which route prefixes
const ROUTE_PERMISSIONS: Record<string, string[]> = {
  "/dashboard/teacher": ["TEACHER"],
  "/dashboard/student": ["STUDENT"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Find if this path is protected
  const matchedRoute = Object.keys(ROUTE_PERMISSIONS).find((route) =>
    pathname.startsWith(route)
  );

  // Not a protected route — let it through
  if (!matchedRoute) return NextResponse.next();

  const token = request.cookies.get("user_token")?.value;

  // No token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    // Check token expiry
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.delete("user_token");
      return res;
    }

    const allowedRoles = ROUTE_PERMISSIONS[matchedRoute];

    // Role not allowed → 403
    if (!allowedRoles.includes(decoded.role)) {
      return NextResponse.redirect(new URL("/403", request.url));
    }

    return NextResponse.next();
  } catch {
    // Invalid/malformed token
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/teacher/:path*", "/dashboard/student/:path*"],
};