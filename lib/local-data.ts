// Local in-memory data store for development without Supabase
// This file replaces all Supabase database calls with local mock data

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// ─── Types ──────────────────────────────────────────────────────────
export interface Product {
  id: string
  name: string
  name_ar?: string
  name_en?: string
  description: string
  description_ar?: string
  description_en?: string
  short_description: string
  short_description_ar?: string
  short_description_en?: string
  price: number
  weight: string
  sku: string
  image_url: string
  color_class: string
  origin: string
  origin_ar?: string
  origin_en?: string
  roast_level: string
  roast_level_ar?: string
  roast_level_en?: string
  flavor_notes: string
  flavor_notes_ar?: string
  flavor_notes_en?: string
  is_active: boolean
  is_highlighted?: boolean
  category?: string
  stock_quantity: number
  created_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
  product: {
    name: string
    sku: string
  }
}

export interface Order {
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

// ─── Mock Products ──────────────────────────────────────────────────
const mockProducts: Product[] = [
  {
    id: "prod-001",
    name: "Signature Blend",
    name_ar: "المزيج المميز",
    name_en: "Signature Blend",
    description:
      "Notre mélange phare combine les meilleurs grains Arabica de trois régions distinctes, élaboré pour atteindre un équilibre parfait entre corps, acidité et douceur.",
    description_ar:
      "يجمع مزيجنا الرئيسي أفضل حبوب الأرابيكا من ثلاث مناطق مختلفة، مصمم لتحقيق توازن مثالي بين الجسم والحموضة والحلاوة.",
    description_en:
      "Our flagship blend combines the finest Arabica beans from three distinct regions, crafted to achieve a perfect balance of body, acidity, and sweetness.",
    short_description: "Une harmonie raffinée de précision et de tradition",
    short_description_ar: "تناغم راقٍ من الدقة والتقاليد",
    short_description_en: "A refined harmony of precision and tradition",
    price: 220,
    weight: "1000g",
    sku: "SC-SIG-001",
    image_url: "/images/products/signature-blend.png",
    color_class: "bg-royal-green",
    origin: "Brésil, Éthiopie, Colombie",
    origin_ar: "البرازيل، إثيوبيا، كولومبيا",
    origin_en: "Brazil, Ethiopia, Colombia",
    roast_level: "Moyenne",
    roast_level_ar: "متوسط",
    roast_level_en: "Medium",
    flavor_notes: "Chocolat, Caramel, Agrumes",
    flavor_notes_ar: "شوكولاتة، كراميل، حمضيات",
    flavor_notes_en: "Chocolate, Caramel, Citrus",
    is_active: true,
    is_highlighted: true,
    category: "blend",
    stock_quantity: 150,
    created_at: "2025-01-15T10:00:00Z",
  },
  {
    id: "prod-002",
    name: "Maison Intense",
    name_ar: "مزيج المنزل المكثف",
    name_en: "Maison Intense",
    description:
      "Pour ceux qui recherchent l'intensité sans compromis. Ce mélange audacieux offre une expérience espresso puissante avec une crema riche et des notes de chocolat noir persistantes.",
    description_ar:
      "لأولئك الذين يبحثون عن الكثافة دون تنازل. يقدم هذا المزيج الجريء تجربة إسبريسو قوية مع كريما غنية ونكهات الشوكولاتة الداكنة المستمرة.",
    description_en:
      "For those who crave intensity without compromise. This bold blend delivers a powerful espresso experience with rich crema and lingering dark chocolate notes.",
    short_description: "Caractère audacieux avec une finition élégante",
    short_description_ar: "طابع جريء مع لمسة أنيقة",
    short_description_en: "Bold character with an elegant finish",
    price: 240,
    weight: "1000g",
    sku: "SC-INT-002",
    image_url: "/images/products/maison-intense.png",
    color_class: "bg-emerald-red",
    origin: "Vietnam, Indonésie",
    origin_ar: "فيتنام، إندونيسيا",
    origin_en: "Vietnam, Indonesia",
    roast_level: "Foncée",
    roast_level_ar: "داكن",
    roast_level_en: "Dark",
    flavor_notes: "Chocolat Noir, Noix, Épices",
    flavor_notes_ar: "شوكولاتة داكنة، جوز، توابل",
    flavor_notes_en: "Dark Chocolate, Walnut, Spice",
    is_active: true,
    is_highlighted: false,
    category: "espresso",
    stock_quantity: 120,
    created_at: "2025-01-20T10:00:00Z",
  },
]

const mockOrders: Order[] = [
  {
    id: "ord-00000001-demo",
    customer_name: "Ahmed Benali",
    customer_phone: "+212612345678",
    customer_address: "123 Rue Mohammed V",
    customer_city: "Casablanca",
    total_amount: 460,
    status: "delivered",
    notes: null,
    created_at: "2025-02-10T14:30:00Z",
    order_items: [
      {
        id: "oi-001",
        order_id: "ord-00000001-demo",
        product_id: "prod-001",
        quantity: 1,
        unit_price: 220,
        product: { name: "Signature Blend", sku: "SC-SIG-001" },
      },
      {
        id: "oi-002",
        order_id: "ord-00000001-demo",
        product_id: "prod-002",
        quantity: 1,
        unit_price: 240,
        product: { name: "Maison Intense", sku: "SC-INT-002" },
      },
    ],
  },
  {
    id: "ord-00000002-demo",
    customer_name: "Fatima Zahra",
    customer_phone: "+212698765432",
    customer_address: "45 Avenue Hassan II",
    customer_city: "Rabat",
    total_amount: 440,
    status: "pending",
    notes: "Livraison le matin SVP",
    created_at: "2025-03-01T09:15:00Z",
    order_items: [
      {
        id: "oi-003",
        order_id: "ord-00000002-demo",
        product_id: "prod-001",
        quantity: 2,
        unit_price: 220,
        product: { name: "Signature Blend", sku: "SC-SIG-001" },
      },
    ],
  },
  {
    id: "ord-00000003-demo",
    customer_name: "Youssef El Mansouri",
    customer_phone: "+212655443322",
    customer_address: "78 Bd Zerktouni",
    customer_city: "Marrakech",
    total_amount: 720,
    status: "confirmed",
    notes: null,
    created_at: "2025-03-03T16:45:00Z",
    order_items: [
      {
        id: "oi-004",
        order_id: "ord-00000003-demo",
        product_id: "prod-002",
        quantity: 3,
        unit_price: 240,
        product: { name: "Maison Intense", sku: "SC-INT-002" },
      },
    ],
  },
]

// ─── In-memory Store ────────────────────────────────────────────────
// We use global to persist across HMR reloads in development
const globalForStore = globalThis as unknown as {
  __localStore?: {
    products: Product[]
    orders: Order[]
  }
}

if (!globalForStore.__localStore) {
  globalForStore.__localStore = {
    products: [...mockProducts],
    orders: [...mockOrders],
  }
}

const store = globalForStore.__localStore

// ─── Product Operations ─────────────────────────────────────────────
export function getProducts(): Product[] {
  return store.products
}

export function getActiveProducts(): Product[] {
  return store.products.filter((p) => p.is_active).sort((a, b) =>
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )
}

export function getProduct(id: string): Product | undefined {
  return store.products.find((p) => p.id === id)
}

export function createProduct(product: Omit<Product, "id" | "created_at">): Product {
  const newProduct: Product = {
    ...product,
    id: generateId(),
    created_at: new Date().toISOString(),
  }
  store.products.unshift(newProduct)
  return newProduct
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const index = store.products.findIndex((p) => p.id === id)
  if (index === -1) return null
  store.products[index] = { ...store.products[index], ...updates }
  return store.products[index]
}

export function deleteProduct(id: string): boolean {
  const index = store.products.findIndex((p) => p.id === id)
  if (index === -1) return false
  store.products.splice(index, 1)
  return true
}

// ─── Order Operations ───────────────────────────────────────────────
export function getOrders(): Order[] {
  return store.orders.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
}

export function getOrder(id: string): Order | undefined {
  return store.orders.find((o) => o.id === id)
}

export function createOrder(orderData: {
  customer_name: string
  customer_phone: string
  customer_address: string
  customer_city: string
  total_amount: number
  notes: string | null
  items: { product_id: string; quantity: number; unit_price: number }[]
}): Order {
  const orderId = generateId()
  const order: Order = {
    id: orderId,
    customer_name: orderData.customer_name,
    customer_phone: orderData.customer_phone,
    customer_address: orderData.customer_address,
    customer_city: orderData.customer_city,
    total_amount: orderData.total_amount,
    status: "pending",
    notes: orderData.notes,
    created_at: new Date().toISOString(),
    order_items: orderData.items.map((item) => {
      const product = store.products.find((p) => p.id === item.product_id)
      return {
        id: generateId(),
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        product: {
          name: product?.name || "Unknown",
          sku: product?.sku || "",
        },
      }
    }),
  }
  store.orders.unshift(order)
  return order
}

export function updateOrderStatus(id: string, status: string): boolean {
  const order = store.orders.find((o) => o.id === id)
  if (!order) return false
  order.status = status
  return true
}

// ─── Dashboard Stats ────────────────────────────────────────────────
export function getDashboardStats() {
  const orders = store.orders
  const totalOrders = orders.length
  const pendingOrders = orders.filter((o) => o.status === "pending").length
  const totalRevenue = orders
    .filter((o) => o.status === "confirmed" || o.status === "delivered")
    .reduce((sum, o) => sum + Number(o.total_amount), 0)
  const activeProducts = store.products.filter((p) => p.is_active).length
  const recentOrders = orders.slice(0, 5)

  return { totalOrders, pendingOrders, totalRevenue, activeProducts, recentOrders }
}
