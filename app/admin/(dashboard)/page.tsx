import { getDashboardStats } from "@/lib/local-data"
import { Package, ShoppingCart, DollarSign, Clock } from "lucide-react"

export default async function AdminDashboardPage() {
  const { totalOrders, pendingOrders, totalRevenue, activeProducts, recentOrders } = getDashboardStats()

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      icon: Clock,
      color: "text-gold",
      bgColor: "bg-gold/10",
    },
    {
      label: "Total Revenue",
      value: `${totalRevenue.toFixed(2)} MAD`,
      icon: DollarSign,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      label: "Active Products",
      value: activeProducts,
      icon: Package,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
  ]

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-400",
    confirmed: "bg-blue-500/20 text-blue-400",
    delivered: "bg-green-500/20 text-green-400",
    cancelled: "bg-red-500/20 text-red-400",
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-white mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-neutral-900/50 border border-neutral-800 p-6 rounded"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-neutral-400 text-sm font-sans">{stat.label}</span>
              <div className={`p-2 rounded ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-serif text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-neutral-900/50 border border-neutral-800 rounded">
        <div className="p-6 border-b border-neutral-800">
          <h2 className="font-serif text-xl text-white">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="text-left text-neutral-400 text-sm font-sans font-medium px-6 py-4">
                  Order ID
                </th>
                <th className="text-left text-neutral-400 text-sm font-sans font-medium px-6 py-4">
                  Customer
                </th>
                <th className="text-left text-neutral-400 text-sm font-sans font-medium px-6 py-4">
                  Total
                </th>
                <th className="text-left text-neutral-400 text-sm font-sans font-medium px-6 py-4">
                  Status
                </th>
                <th className="text-left text-neutral-400 text-sm font-sans font-medium px-6 py-4">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders && recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30">
                    <td className="px-6 py-4 text-white font-mono text-sm">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white text-sm">{order.customer_name}</p>
                      <p className="text-neutral-500 text-xs">{order.customer_phone}</p>
                    </td>
                    <td className="px-6 py-4 text-white text-sm">
                      {Number(order.total_amount).toFixed(2)} MAD
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded text-xs font-sans ${statusColors[order.status] || "bg-neutral-700 text-neutral-300"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-400 text-sm">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
