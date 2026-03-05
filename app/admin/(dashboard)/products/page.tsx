import { getProducts } from "@/lib/local-data"
import { ProductsManager } from "@/components/admin/products-manager"

export default async function ProductsPage() {
  const products = getProducts()

  return (
    <div>
      <h1 className="font-serif text-3xl text-white mb-8">Products</h1>
      <ProductsManager products={products} />
    </div>
  )
}
