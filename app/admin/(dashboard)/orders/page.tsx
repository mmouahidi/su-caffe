import { OrdersTable } from "@/components/admin/orders-table"

export default function OrdersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-white">Orders</h1>
      </div>

      <OrdersTable orders={[]} />
    </div>
  )
}
