import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Local dev: skip auth, use mock admin
  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <AdminSidebar role="admin" userEmail="admin@sucaffe.com" />
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
