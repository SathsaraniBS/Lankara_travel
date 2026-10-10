import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_ORIGIN, AUTH_COOKIE } from "@/lib/server/backend";

const NO_STORE = { "Cache-Control": "no-store" };

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (!token) {
    return NextResponse.json(
      { authenticated: false, user: null },
      { headers: NO_STORE }
    );
  }

  try {
    const res = await fetch(`${API_ORIGIN}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (res.ok) {
      const user = await res.json();
      return NextResponse.json(
        {
          authenticated: true,
          user: {
            id: user.id,
            email: user.email,
            full_name: user.full_name ?? null,
            is_admin: Boolean(user.is_admin),
          },
        },
        { headers: NO_STORE }
      );
    }

    // 401 = invalid/expired token, 400 = inactive account: drop the stale cookie
    if (res.status === 401 || res.status === 400) {
      cookieStore.delete(AUTH_COOKIE);
    }
  } catch {
    // Backend unreachable: keep the cookie, just report not authenticated
  }

  return NextResponse.json(
    { authenticated: false, user: null },
    { headers: NO_STORE }
  );
}