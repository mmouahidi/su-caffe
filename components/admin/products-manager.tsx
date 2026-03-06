"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, X, Save } from "lucide-react"
import { nhost } from "@/lib/nhost"

interface Product {
  id: string
  name: string
  description: string
  short_description: string
  price: number
  weight: string
  sku: string
  image_url: string
  color_class: string
  origin: string
  roast_level: string
  flavor_notes: string
  is_active: boolean
  is_highlighted?: boolean
  category?: string
  stock_quantity: number
}

interface ProductsManagerProps {
  products: Product[]
}

const emptyProduct: Omit<Product, "id"> = {
  name: "",
  description: "",
  short_description: "",
  price: 0,
  weight: "1kg",
  sku: "",
  image_url: "",
  color_class: "bg-royal-green",
  origin: "",
  roast_level: "Medium",
  flavor_notes: "",
  is_active: true,
  is_highlighted: false,
  category: "blend",
  stock_quantity: 100,
}

export function ProductsManager({ products: initialProducts }: ProductsManagerProps) {
  const [products, setProducts] = useState(initialProducts)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>(emptyProduct)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      const { data, error } = await nhost.graphql.request(`
        query {
          products(order_by: { created_at: desc }) {
            id name description short_description price weight sku image_url color_class origin roast_level flavor_notes is_active is_highlighted category stock_quantity
          }
        }
      `)
      if (!error && data?.products) {
        setProducts(data.products)
      }
      setIsLoading(false)
    }
    loadProducts()
  }, [])

  const handleCreate = async () => {
    // Need to cast Postgres Array format for GraphQL array inputs: String[] requires string[] not comma-sep string. Wait, flavor_notes in sql is TEXT[] but in Product it's string (due to how local-data typed it originally?).
    // In SQL: flavor_notes is TEXT[]. In React: flavor_notes is string input.
    // Let's coerce flavor_notes into an array format if we can, or just send a single-item array.
    const productData = {
      ...newProduct,
      flavor_notes: typeof newProduct.flavor_notes === 'string' && newProduct.flavor_notes.trim() !== ''
        ? `{${newProduct.flavor_notes}}`
        : '{}'
    }

    const { data, error } = await nhost.graphql.request(`
      mutation InsertProduct($object: products_insert_input!) {
        insert_products_one(object: $object) {
            id name description short_description price weight sku image_url color_class origin roast_level flavor_notes is_active is_highlighted category stock_quantity
        }
      }
    `, { object: productData })

    if (!error && data?.insert_products_one) {
      setProducts([data.insert_products_one, ...products])
      setIsCreating(false)
      setNewProduct(emptyProduct)
    }
  }

  const handleUpdate = async () => {
    if (!editingProduct) return
    const { id, flavor_notes, ...updates } = editingProduct

    const productData = {
      ...updates,
      flavor_notes: typeof flavor_notes === 'string' && flavor_notes.trim() !== ''
        ? `{${flavor_notes}}`
        : '{}'
    }

    const { data, error } = await nhost.graphql.request(`
      mutation UpdateProduct($id: uuid!, $set: products_set_input!) {
        update_products_by_pk(pk_columns: { id: $id }, _set: $set) {
             id name description short_description price weight sku image_url color_class origin roast_level flavor_notes is_active is_highlighted category stock_quantity
        }
      }
    `, { id, set: productData })

    if (!error && data?.update_products_by_pk) {
      setProducts(products.map(p =>
        p.id === id ? data.update_products_by_pk : p
      ))
      setEditingProduct(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    const { error } = await nhost.graphql.request(`
      mutation DeleteProduct($id: uuid!) {
        delete_products_by_pk(id: $id) {
          id
        }
      }
    `, { id })

    if (!error) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const toggleActive = async (product: Product) => {
    const { data, error } = await nhost.graphql.request(`
      mutation ToggleActive($id: uuid!, $isActive: Boolean!) {
        update_products_by_pk(pk_columns: { id: $id }, _set: { is_active: $isActive }) {
          id
        }
      }
    `, { id: product.id, isActive: !product.is_active })

    if (!error && data?.update_products_by_pk) {
      setProducts(products.map(p =>
        p.id === product.id ? { ...p, is_active: !product.is_active } : p
      ))
    }
  }

  if (isLoading) {
    return <div className="text-white">Loading products...</div>
  }

  return (
    <div className="space-y-6">
      {/* Add Product Button */}
      <button
        onClick={() => setIsCreating(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gold text-off-black font-sans text-sm hover:bg-gold/90 transition-colors rounded"
      >
        <Plus className="w-4 h-4" />
        Add Product
      </button>

      {/* Create Product Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-neutral-800">
              <h2 className="font-serif text-xl text-white">Add New Product</h2>
              <button
                onClick={() => { setIsCreating(false); setNewProduct(emptyProduct); }}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <ProductForm
                product={newProduct}
                onChange={setNewProduct}
              />
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCreate}
                  className="flex items-center gap-2 px-4 py-2 bg-gold text-off-black font-sans text-sm hover:bg-gold/90 transition-colors rounded"
                >
                  <Save className="w-4 h-4" />
                  Create Product
                </button>
                <button
                  onClick={() => { setIsCreating(false); setNewProduct(emptyProduct); }}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 font-sans text-sm hover:bg-neutral-700 transition-colors rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-neutral-800">
              <h2 className="font-serif text-xl text-white">Edit Product</h2>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <ProductForm
                product={editingProduct}
                onChange={(p) => setEditingProduct(p as Product)}
              />
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleUpdate}
                  className="flex items-center gap-2 px-4 py-2 bg-gold text-off-black font-sans text-sm hover:bg-gold/90 transition-colors rounded"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 font-sans text-sm hover:bg-neutral-700 transition-colors rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="bg-neutral-900/50 border border-neutral-800 rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="text-left text-neutral-400 text-sm font-sans font-medium px-6 py-4">
                Product
              </th>
              <th className="text-left text-neutral-400 text-sm font-sans font-medium px-6 py-4">
                SKU
              </th>
              <th className="text-left text-neutral-400 text-sm font-sans font-medium px-6 py-4">
                Price
              </th>
              <th className="text-left text-neutral-400 text-sm font-sans font-medium px-6 py-4">
                Stock
              </th>
              <th className="text-left text-neutral-400 text-sm font-sans font-medium px-6 py-4">
                Category
              </th>
              <th className="text-left text-neutral-400 text-sm font-sans font-medium px-6 py-4">
                Status
              </th>
              <th className="text-right text-neutral-400 text-sm font-sans font-medium px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${product.color_class} rounded flex items-center justify-center`}>
                      <span className="text-gold text-lg font-serif">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{product.name}</p>
                      <p className="text-neutral-500 text-xs">{product.weight}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-neutral-400 text-sm font-mono">
                  {product.sku}
                </td>
                <td className="px-6 py-4 text-white text-sm">
                  {Number(product.price).toFixed(2)} MAD
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm ${product.stock_quantity > 10 ? "text-green-400" : product.stock_quantity > 0 ? "text-yellow-400" : "text-red-400"}`}>
                    {product.stock_quantity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-neutral-300 capitalize">{product.category || "None"}</span>
                    {product.is_highlighted && (
                      <span className="text-xs text-gold">Highlighted</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleActive(product)}
                    className={`px-3 py-1 rounded text-xs font-sans ${product.is_active
                      ? "bg-green-500/20 text-green-400"
                      : "bg-neutral-700 text-neutral-400"
                      }`}
                  >
                    {product.is_active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="p-2 text-neutral-400 hover:text-gold hover:bg-gold/10 rounded transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-neutral-400 hover:text-emerald-red hover:bg-emerald-red/10 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface ProductFormProps {
  product: Omit<Product, "id"> | Product
  onChange: (product: Omit<Product, "id"> | Product) => void
}

function ProductForm({ product, onChange }: ProductFormProps) {
  const colorOptions = [
    { value: "bg-royal-green", label: "Royal Green" },
    { value: "bg-emerald-red", label: "Emerald Red" },
    { value: "bg-neutral-800", label: "Dark" },
    { value: "bg-amber-900", label: "Brown" },
  ]

  const roastLevels = ["Light", "Medium", "Medium-Dark", "Dark"]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-neutral-300 text-sm font-sans mb-2">Name</label>
        <input
          type="text"
          value={product.name}
          onChange={(e) => onChange({ ...product, name: e.target.value })}
          className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-2 text-sm font-sans focus:border-gold focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-neutral-300 text-sm font-sans mb-2">SKU</label>
        <input
          type="text"
          value={product.sku}
          onChange={(e) => onChange({ ...product, sku: e.target.value })}
          className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-2 text-sm font-sans focus:border-gold focus:outline-none"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-neutral-300 text-sm font-sans mb-2">Short Description</label>
        <input
          type="text"
          value={product.short_description}
          onChange={(e) => onChange({ ...product, short_description: e.target.value })}
          className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-2 text-sm font-sans focus:border-gold focus:outline-none"
          placeholder="A brief tagline for the product card"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-neutral-300 text-sm font-sans mb-2">Full Description</label>
        <textarea
          value={product.description}
          onChange={(e) => onChange({ ...product, description: e.target.value })}
          rows={3}
          className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-2 text-sm font-sans focus:border-gold focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-neutral-300 text-sm font-sans mb-2">Price (MAD)</label>
        <input
          type="number"
          value={product.price}
          onChange={(e) => onChange({ ...product, price: parseFloat(e.target.value) })}
          className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-2 text-sm font-sans focus:border-gold focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-neutral-300 text-sm font-sans mb-2">Weight</label>
        <input
          type="text"
          value={product.weight}
          onChange={(e) => onChange({ ...product, weight: e.target.value })}
          className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-2 text-sm font-sans focus:border-gold focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-neutral-300 text-sm font-sans mb-2">Origin</label>
        <input
          type="text"
          value={product.origin}
          onChange={(e) => onChange({ ...product, origin: e.target.value })}
          className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-2 text-sm font-sans focus:border-gold focus:outline-none"
          placeholder="e.g., Brazil, Ethiopia"
        />
      </div>

      <div>
        <label className="block text-neutral-300 text-sm font-sans mb-2">Roast Level</label>
        <select
          value={product.roast_level}
          onChange={(e) => onChange({ ...product, roast_level: e.target.value })}
          className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-2 text-sm font-sans focus:border-gold focus:outline-none"
        >
          {roastLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-neutral-300 text-sm font-sans mb-2">Flavor Notes</label>
        <input
          type="text"
          value={product.flavor_notes}
          onChange={(e) => onChange({ ...product, flavor_notes: e.target.value })}
          className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-2 text-sm font-sans focus:border-gold focus:outline-none"
          placeholder="e.g., Chocolate, Caramel, Citrus"
        />
      </div>

      <div>
        <label className="block text-neutral-300 text-sm font-sans mb-2">Category</label>
        <select
          value={product.category || "blend"}
          onChange={(e) => onChange({ ...product, category: e.target.value })}
          className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-2 text-sm font-sans focus:border-gold focus:outline-none"
        >
          <option value="blend">Blend</option>
          <option value="single-origin">Single Origin</option>
          <option value="espresso">Espresso</option>
          <option value="decaf">Decaf</option>
        </select>
      </div>

      <div className="flex items-center pt-8">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={!!product.is_highlighted}
            onChange={(e) => onChange({ ...product, is_highlighted: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold relative"></div>
          <span className="ml-3 text-sm font-sans text-neutral-300">Highlight Product</span>
        </label>
      </div>

      <div>
        <label className="block text-neutral-300 text-sm font-sans mb-2">Card Color</label>
        <select
          value={product.color_class}
          onChange={(e) => onChange({ ...product, color_class: e.target.value })}
          className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-2 text-sm font-sans focus:border-gold focus:outline-none"
        >
          {colorOptions.map((color) => (
            <option key={color.value} value={color.value}>{color.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-neutral-300 text-sm font-sans mb-2">Image URL</label>
        <input
          type="text"
          value={product.image_url}
          onChange={(e) => onChange({ ...product, image_url: e.target.value })}
          className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-2 text-sm font-sans focus:border-gold focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-neutral-300 text-sm font-sans mb-2">Stock Quantity</label>
        <input
          type="number"
          value={product.stock_quantity}
          onChange={(e) => onChange({ ...product, stock_quantity: parseInt(e.target.value) })}
          className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-2 text-sm font-sans focus:border-gold focus:outline-none"
        />
      </div>
    </div>
  )
}
