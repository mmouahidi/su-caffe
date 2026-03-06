"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/language-context"
import { X, Minus, Plus, Trash2, MessageCircle } from "lucide-react"
import Image from "next/image"
import { nhost } from "@/lib/nhost"
import { useLocalData } from "@/lib/app-config"

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, total, clearCart } = useCart()
  const { t, dir, locale } = useLanguage()
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  const handleSubmitOrder = async () => {
    if (!orderForm.name || !orderForm.phone || !orderForm.address || !orderForm.city) {
      alert(locale === "ar" ? "يرجى ملء جميع الحقول المطلوبة" : locale === "en" ? "Please fill in all required fields" : "Veuillez remplir tous les champs requis")
      return
    }

    setIsSubmitting(true)

    try {
      let orderId = Math.random().toString(36).substring(2, 10)

      if (!useLocalData) {
        const orderData = {
          customer_name: orderForm.name,
          customer_phone: orderForm.phone,
          customer_address: orderForm.address,
          customer_city: orderForm.city,
          total_amount: total,
          notes: orderForm.notes || null,
          status: "pending",
          order_items: {
            data: items.map((item) => ({
              product_id: item.id,
              quantity: item.quantity,
              unit_price: item.price,
              product_name: item.name
            }))
          }
        }

        const { data, error } = await nhost.graphql.request(`
          mutation InsertOrderWithItems($object: orders_insert_input!) {
            insert_orders_one(object: $object) {
              id
            }
          }
        `, { object: orderData })

        if (error) throw error
        orderId = data?.insert_orders_one?.id?.slice(0, 8) || orderId
      }

      // Generate WhatsApp message based on language
      const whatsappMessage = encodeURIComponent(
        `*${t.whatsapp.greeting}*\n\n` +
        `*Order ID:* #${orderId}\n\n` +
        `*${t.whatsapp.customerInfo}:*\n` +
        `${t.whatsapp.name}: ${orderForm.name}\n` +
        `${t.whatsapp.phone}: ${orderForm.phone}\n` +
        `${t.whatsapp.address}: ${orderForm.address}\n` +
        `${t.whatsapp.city}: ${orderForm.city}\n` +
        (orderForm.notes ? `${t.whatsapp.notes}: ${orderForm.notes}\n` : "") +
        `\n*${t.whatsapp.orderDetails}:*\n` +
        items.map((item) => `- ${item.name} (${item.weight}) x${item.quantity} = ${(item.price * item.quantity).toFixed(2)} MAD`).join("\n") +
        `\n\n*${t.whatsapp.total}: ${total.toFixed(2)} MAD*\n` +
        `*${t.whatsapp.paymentMethod}*`
      )

      // Open WhatsApp - Replace with your business WhatsApp number
      const whatsappNumber = "212600000000" // Replace with actual business number
      window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank")

      setOrderSuccess(true)
      clearCart()

      setTimeout(() => {
        setOrderSuccess(false)
        setShowCheckout(false)
        setIsCartOpen(false)
        setOrderForm({ name: "", phone: "", address: "", city: "", notes: "" })
      }, 3000)

    } catch (error) {
      console.error("Order error:", error)
      alert(locale === "ar" ? "فشل في تقديم الطلب. حاول مرة أخرى." : locale === "en" ? "Failed to place order. Please try again." : "Échec de la commande. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50" dir={dir}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className={`absolute top-0 h-full w-full max-w-md bg-off-black border-neutral-800 flex flex-col ${dir === "rtl" ? "left-0 border-r" : "right-0 border-l"}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
          <h2 className="font-serif text-xl text-white">
            {showCheckout ? (orderSuccess ? t.checkout.orderSummary : t.checkout.title) : t.cart.title}
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {orderSuccess ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="font-serif text-xl text-white mb-2">
                {locale === "ar" ? "تم تقديم الطلب!" : locale === "en" ? "Order Placed!" : "Commande passée!"}
              </h3>
              <p className="text-neutral-400 text-sm">
                {locale === "ar" ? "تم إرسال طلبك عبر واتساب. سنتواصل معك قريباً للتأكيد." : locale === "en" ? "Your order has been sent via WhatsApp. We will contact you shortly to confirm." : "Votre commande a été envoyée via WhatsApp. Nous vous contacterons sous peu."}
              </p>
            </div>
          </div>
        ) : showCheckout ? (
          /* Checkout Form */
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              <p className="text-gold text-sm mb-4">{t.checkout.subtitle}</p>

              <div>
                <label className="block text-neutral-300 text-sm font-sans mb-2">
                  {t.checkout.name} *
                </label>
                <input
                  type="text"
                  value={orderForm.name}
                  onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                  className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-3 font-sans focus:border-gold focus:outline-none transition-colors"
                  placeholder={t.checkout.namePlaceholder}
                />
              </div>

              <div>
                <label className="block text-neutral-300 text-sm font-sans mb-2">
                  {t.checkout.phone} *
                </label>
                <input
                  type="tel"
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                  className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-3 font-sans focus:border-gold focus:outline-none transition-colors"
                  placeholder={t.checkout.phonePlaceholder}
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-neutral-300 text-sm font-sans mb-2">
                  {t.checkout.address} *
                </label>
                <textarea
                  value={orderForm.address}
                  onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                  rows={2}
                  className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-3 font-sans focus:border-gold focus:outline-none transition-colors resize-none"
                  placeholder={t.checkout.addressPlaceholder}
                />
              </div>

              <div>
                <label className="block text-neutral-300 text-sm font-sans mb-2">
                  {t.checkout.city} *
                </label>
                <input
                  type="text"
                  value={orderForm.city}
                  onChange={(e) => setOrderForm({ ...orderForm, city: e.target.value })}
                  className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-3 font-sans focus:border-gold focus:outline-none transition-colors"
                  placeholder={t.checkout.cityPlaceholder}
                />
              </div>

              <div>
                <label className="block text-neutral-300 text-sm font-sans mb-2">
                  {t.checkout.notes}
                </label>
                <textarea
                  value={orderForm.notes}
                  onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                  rows={2}
                  className="w-full bg-neutral-800/50 border border-neutral-700 text-white px-4 py-3 font-sans focus:border-gold focus:outline-none transition-colors resize-none"
                  placeholder={t.checkout.notesPlaceholder}
                />
              </div>

              {/* Order Summary */}
              <div className="bg-neutral-900/50 border border-neutral-800 p-4 mt-6">
                <h3 className="text-gold text-sm font-sans mb-3">{t.checkout.orderSummary}</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm mb-2">
                    <span className="text-neutral-300">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-white" dir="ltr">
                      {(item.price * item.quantity).toFixed(2)} MAD
                    </span>
                  </div>
                ))}
                <div className="border-t border-neutral-700 mt-3 pt-3 flex justify-between">
                  <span className="text-white font-medium">{t.cart.total}</span>
                  <span className="text-gold font-serif text-lg" dir="ltr">{total.toFixed(2)} MAD</span>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 mt-4">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-green-400 text-sm font-medium">{t.checkout.subtitle}</p>
                    <p className="text-neutral-400 text-xs">
                      {locale === "ar" ? "ادفع عند استلام طلبك" : locale === "en" ? "Pay when you receive your order" : "Payez à la réception de votre commande"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Cart Items */
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-neutral-500 mb-2">{t.cart.empty}</p>
                <p className="text-neutral-600 text-sm">{t.cart.emptyDescription}</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 text-gold text-sm hover:underline"
                >
                  {t.cart.continueShopping}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-neutral-900/50 p-4 border border-neutral-800">
                    <div className="w-20 h-20 relative bg-neutral-800 flex-shrink-0">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gold font-serif text-xl">{item.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-serif text-sm mb-1">{item.name}</h3>
                      <p className="text-neutral-500 text-xs mb-2">{item.weight}</p>
                      <p className="text-gold font-medium" dir="ltr">{item.price.toFixed(2)} MAD</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-500 hover:text-emerald-red transition-colors"
                        title={t.cart.remove}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:border-gold transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-white w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:border-gold transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && !orderSuccess && (
          <div className="border-t border-neutral-800 p-6">
            {!showCheckout && (
              <div className="flex justify-between mb-4">
                <span className="text-neutral-400">{t.cart.subtotal}</span>
                <span className="text-white font-serif text-lg" dir="ltr">{total.toFixed(2)} MAD</span>
              </div>
            )}

            {showCheckout ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 py-3 border border-neutral-700 text-neutral-300 font-sans text-sm hover:border-gold hover:text-gold transition-colors"
                >
                  {t.checkout.back}
                </button>
                <button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-green-600 text-white font-sans text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  {isSubmitting ? "..." : t.checkout.submit}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full py-3 bg-gold text-off-black font-sans font-medium tracking-wide hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {t.cart.checkout}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
