import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_ORIGIN, AUTH_COOKIE } from "./backend";

export interface SessionUser {
  id: string;
  email: string;
  full_name: string | null;
  phone_number: string | null;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
}

// Validates the cookie token against FastAPI (/api/auth/me).
// Wrapped in cache() so layouts and pages in one request share a single call.
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return null;

  try {
    const res = await fetch(`${API_ORIGIN}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as SessionUser;
  } catch {
    return null;
  }
});

export async function requireUser(nextPath: string): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
  return user;
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser("/admin/dashboard");
  if (!user.is_admin) {
    redirect("/");
  }
  return user;
}