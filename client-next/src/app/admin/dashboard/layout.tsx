import { requireAdmin } from "@/lib/server/session";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Redirects to /login if not signed in, or to / if the user is not an admin
  await requireAdmin();
  return <>{children}</>;
}