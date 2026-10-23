import { NextRequest, NextResponse } from "next/server";
import { API_ORIGIN, getAuthToken } from "@/lib/server/backend";

// Same-origin proxy: browser -> /api/<anything> -> FastAPI /api/<anything>.
// Adds the Bearer token from the httpOnly cookie. More specific routes
// (e.g. /api/auth/login) take precedence over this catch-all.
const REQUEST_HEADERS = ["content-type", "accept"];
const RESPONSE_HEADERS = ["content-type", "content-disposition"];
const MAX_REDIRECTS = 3;

type Context = { params: Promise<{ path: string[] }> };

async function proxy(request: NextRequest, { params }: Context) {
  const { path } = await params;
  const target = new URL(`${API_ORIGIN}/api/${path.map(encodeURIComponent).join("/")}`);
  target.search = request.nextUrl.search;

  const headers = new Headers();
  for (const name of REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  const token = await getAuthToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  // Let FastAPI see the visitor's IP (its rate limiter keys on it)
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) headers.set("x-forwarded-for", forwardedFor);

  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  const body = hasBody ? await request.arrayBuffer() : undefined;

  const send = (url: URL) =>
    fetch(url, { method: request.method, headers, body, cache: "no-store", redirect: "manual" });

  let upstream: Response;
  try {
    upstream = await send(target);

    // Next.js strips trailing slashes ("/api/hotels/" -> "/api/hotels") but FastAPI routes are
    // declared with them, so FastAPI answers 307 -> "/api/hotels/". Follow that hop here, keeping
    // the method, body and token, and always staying on the configured backend origin.
    for (let i = 0; i < MAX_REDIRECTS && (upstream.status === 307 || upstream.status === 308); i++) {
      const location = upstream.headers.get("location");
      if (!location) break;
      const next = new URL(location, API_ORIGIN);
      upstream = await send(new URL(`${API_ORIGIN}${next.pathname}${next.search}`));
    }
  } catch {
    return NextResponse.json({ detail: "Backend unreachable" }, { status: 502 });
  }

  const responseHeaders = new Headers();
  for (const name of RESPONSE_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  return new NextResponse(upstream.body, { status: upstream.status, headers: responseHeaders });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
