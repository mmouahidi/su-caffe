"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react"
import { nhost } from "@/lib/nhost"

interface OrderItem {
  id: string
  quantity: number
  unit_price: number
  product: {
    name: string
    sku: string
  }
}

interface Order {
  id: string
  customer_name: string
  customer_phone: string
  customer_address: string
  customer_city: string
  total_amount: number
  status: string
  notes: string | null
  created_at: string
  order_items: OrderItem[]
}

interface OrdersTableProps {
  orders: Order[]
}

const statusOptions = ["pending", "confirmed", "delivered", "cancelled"]

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  delivered: "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
}

export function OrdersTable({ orders: initialOrders }: OrdersTableProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadOrders = async () => {
      const { data, error } = await nhost.graphql.request(`
        query {
          orders(order_by: { created_at: desc }) {
            id customer_name customer_phone customer_address customer_city total_amount status notes created_at
            order_items {
              id quantity unit_price
              product { name sku }
            }
          }
        }
      `)

      if (!error && data?.orders) {
        setOrders(data.orders)
      }
      setIsLoading(false)
    }
    loadOrders()
  }, [])

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const { error } = await nhost.graphql.request(`
      mutation UpdateOrderStatus($id: uuid!, $status: String!) {
        update_orders_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {
          id
        }
      }
    `, { id: orderId, status: newStatus })

    if (error) return

    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const openWhatsApp = (order: Order) => {
    const message = encodeURIComponent(
      `Hello ${order.customer_name}!\n\n` +
      `Your order #${order.id.slice(0, 8)} has been ${order.status}.\n\n` +
      `Order Details:\n` +
      order.order_items.map(item =>
        `- ${item.product.name} x${item.quantity}`
      ).join("\n") +
      `\n\nTotal: ${Number(order.total_amount).toFixed(2)} MAD\n\n` +
      `Thank you for choosing Sú Caffè!`
    )
    window.open(`https://wa.me/${order.customer_phone.replace(/\D/g, "")}?text=${message}`, "_blank")
  }

  const filteredOrders = filter === "all"
    ? orders
    : orders.filter(order => order.status === filter)

  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded">
      {/* Filters */}
      <div className="p-4 border-b border-neutral-800 flex gap-2 flex-wrap">
        {["all", ...statusOptions].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm font-sans rounded transition-colors ${filter === status
              ? "bg-gold text-off-black"
              : "bg-neutral-800 text-neutral-400 hover:text-white"
              }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== "all" && (
              <span className="ml-2 text-xs opacity-70">
                ({orders.filter(o => o.status === status).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="text-left text-neutral-400 text-sm font-sans font-medium px-6 py-4">
                Order
              </th>
              <th className="text-left text-neutral-400 text-sm font-sans font-medium px-6 py-4">
                Customer
              </th>
              <th className="text-left text-neutral-400 text-sm font-sans font-medium px-6 py-4">
                Location
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
              <th className="text-right text-neutral-400 text-sm font-sans font-medium px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <>
                  <tr
                    key={order.id}
                    className="border-b border-neutral-800/50 hover:bg-neutral-800/30 cursor-pointer"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {expandedOrder === order.id ? (
                          <ChevronUp className="w-4 h-4 text-neutral-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-neutral-500" />
                        )}
                        <span className="text-white font-mono text-sm">
                          #{order.id.slice(0, 8)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white text-sm">{order.customer_name}</p>
                      <p className="text-neutral-500 text-xs">{order.customer_phone}</p>
                    </td>
                    <td className="px-6 py-4 text-neutral-400 text-sm">
                      {order.customer_city}
                    </td>
                    <td className="px-6 py-4 text-white text-sm font-medium">
                      {Number(order.total_amount).toFixed(2)} MAD
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-3 py-1 rounded text-xs font-sans border bg-transparent cursor-pointer ${statusColors[order.status]}`}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status} className="bg-neutral-900 text-white">
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-neutral-400 text-sm">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => openWhatsApp(order)}
                        className="p-2 text-green-400 hover:bg-green-400/10 rounded transition-colors"
                        title="Contact via WhatsApp"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Order Details */}
                  {expandedOrder === order.id && (
                    <tr className="bg-neutral-800/30">
                      <td colSpan={7} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Order Items */}
                          <div>
                            <h4 className="text-gold text-sm font-sans mb-3">Order Items</h4>
                            <div className="space-y-2">
                              {order.order_items.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                  <span className="text-neutral-300">
                                    {item.product.name} x{item.quantity}
                                  </span>
                                  <span className="text-white">
                                    {(item.quantity * Number(item.unit_price)).toFixed(2)} MAD
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Shipping Info */}
                          <div>
                            <h4 className="text-gold text-sm font-sans mb-3">Shipping Address</h4>
                            <p className="text-neutral-300 text-sm">{order.customer_name}</p>
                            <p className="text-neutral-400 text-sm">{order.customer_address}</p>
                            <p className="text-neutral-400 text-sm">{order.customer_city}</p>
                            <p className="text-neutral-400 text-sm">{order.customer_phone}</p>
                            {order.notes && (
                              <div className="mt-3 p-3 bg-neutral-800/50 rounded">
                                <p className="text-neutral-500 text-xs mb-1">Notes:</p>
                                <p className="text-neutral-300 text-sm">{order.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-neutral-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
