import { NextResponse } from "next/server";

export function proxy(request) {
  const session = request.cookies.get("session")?.value;

  if (!session) {
    const signInUrl = new URL("/signin", request.url);

    const destination = request.nextUrl.pathname + request.nextUrl.search;

    signInUrl.searchParams.set("next", destination);

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/orders/:path*",
    "/kitchen/:path*",
    "/dashboard/:path*",
  ],
};
