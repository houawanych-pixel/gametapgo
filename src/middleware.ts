import { NextResponse, type NextRequest } from "next/server";

/**
 * Private preview gate. When PREVIEW_PASSWORD is set, every page and API needs it
 * (browser login box, any username). Unset = open (local development only).
 */
export function middleware(req: NextRequest) {
  const pass = process.env.PREVIEW_PASSWORD;
  if (!pass) return NextResponse.next();

  const auth = req.headers.get("authorization") ?? "";
  if (auth.startsWith("Basic ")) {
    try {
      const decoded = atob(auth.slice(6));
      const given = decoded.slice(decoded.indexOf(":") + 1);
      if (given === pass) {
        const res = NextResponse.next();
        res.headers.set("X-Robots-Tag", "noindex, nofollow");
        return res;
      }
    } catch {
      /* bad header */
    }
  }
  return new NextResponse("GameTapGo private preview. Password required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="GameTapGo preview", charset="UTF-8"', "X-Robots-Tag": "noindex" },
  });
}

export const config = { matcher: "/:path*" };
