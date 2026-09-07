import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasSupabaseConfig =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  // Let the login page explain the deployment setup issue instead of
  // crashing the entire admin route when Vercel env vars are missing.
  if (!hasSupabaseConfig) {
    return <>{children}</>;
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Login page renders its own centered layout with no sidebar
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar email={user.email} />
      <main className="min-w-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 md:px-8 md:py-8">
        {children}
      </main>
    </div>
  );
}
