import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <AdminSidebar role="admin" userEmail="admin@sucaffe.com" />
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  )
}

