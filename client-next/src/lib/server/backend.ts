// src/lib/server/backend.ts
import "server-only";
import { cookies } from "next/headers";

// Origin of the FastAPI server (no trailing path). session.ts imports this.
export const API_ORIGIN = (process.env.BACKEND_URL ?? "http://localhost:8000").replace(/\/+$/, "");
// FastAPI routes live under /api (e.g. /api/bookings/)
const API_PREFIX = process.env.BACKEND_API_PREFIX ?? "/api";
// Name of the cookie that holds your login token. session.ts imports this.
export const AUTH_COOKIE = process.env.AUTH_COOKIE_NAME ?? "access_token";

interface BackendOptions extends Omit<RequestInit, "headers"> {
  auth?: boolean;
  headers?: Record<string, string>;
}

export async function backendFetch(path: string, options: BackendOptions = {}): Promise<Response> {
  const { auth = false, headers = {}, ...init } = options;

  const finalHeaders: Record<string, string> = { Accept: "application/json", ...headers };

  if (auth) {
    const store = await cookies();
    const token = store.get(AUTH_COOKIE)?.value;
    if (token) finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  const url = `${API_ORIGIN}${API_PREFIX}${path.startsWith("/") ? path : `/${path}`}`;
  return fetch(url, { ...init, headers: finalHeaders });
}

// Returns parsed JSON, or null if the backend is unreachable or returns an error.
export async function backendJson<T>(path: string, options: BackendOptions = {}): Promise<T | null> {
  try {
    const res = await backendFetch(path, options);
    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      console.error(`Backend error (${res.status}) on ${path}: ${errorText || res.statusText}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`Backend request failed on ${path}:`, err);
    return null;
  }
}

// Accepts either a plain array or { items | data | results: [...] }
export function toList<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    for (const key of ["items", "data", "results"]) {
      if (Array.isArray(d[key])) return d[key] as T[];
    }
  }
  return [];
}