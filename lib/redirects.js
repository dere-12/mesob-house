export function safeNextPath(next) {
  if (typeof next !== "string" || !next.startsWith("/")) {
    return "/";
  }

  try {
    const baseUrl = new URL("https://addiseats.invalid");
    const nextUrl = new URL(next, baseUrl);

    if (nextUrl.origin !== baseUrl.origin) {
      return "/";
    }

    if (nextUrl.pathname === "/signin") {
      return "/";
    }

    return `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
  } catch {
    return "/";
  }
}
