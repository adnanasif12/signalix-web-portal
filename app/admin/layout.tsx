import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Login page renders its own centered layout with no sidebar
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      <Sidebar email={user.email} />
      <main className="min-h-screen flex-1 overflow-y-auto px-8 py-8">
        {children}
      </main>
    </div>
  );
}
