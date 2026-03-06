import { ProductsManager } from "@/components/admin/products-manager"

export default function ProductsPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-white mb-8">Products</h1>
      <ProductsManager products={[]} />
    </div>
  )
}
