"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <>
      <section className="relative min-h-[30vh] flex items-center justify-center bg-white">
        <div className="text-center px-5">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-5xl sm:text-6xl text-charcoal font-bold">Shopping Bag</motion.h1>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-5 sm:px-8 lg:px-10">
        <div className="max-w-5xl mx-auto">
          {items.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
              <svg className="w-20 h-20 text-cream-dark mx-auto mb-6" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-3">Your bag is empty</h2>
              <p className="text-charcoal/50 mb-8">Looks like you haven&apos;t added anything yet.</p>
              <div className="flex justify-center gap-4">
                <Link href="/men" className="px-8 py-3 bg-charcoal text-white text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-rust transition-colors">Shop Men</Link>
                <Link href="/women" className="px-8 py-3 border-2 border-charcoal/20 text-charcoal text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-charcoal hover:text-white transition-all">Shop Women</Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-charcoal text-sm font-semibold tracking-widest uppercase">{items.length} {items.length === 1 ? "Item" : "Items"}</h2>
                  <button onClick={clearCart} className="text-charcoal/40 text-xs tracking-widest uppercase hover:text-rust transition-colors">Clear All</button>
                </div>
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div key={`${item.id}-${item.color}-${item.size}`} layout className="flex gap-5 bg-white rounded-xl p-5 shadow-sm">
                      <div className="w-24 h-32 rounded-lg overflow-hidden bg-cream-dark flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-charcoal font-medium">{item.name}</h3>
                            <p className="text-charcoal/40 text-sm mt-0.5">{item.color} / {item.size}</p>
                          </div>
                          <button onClick={() => removeItem(item.id, item.color, item.size)} className="text-charcoal/30 hover:text-rust transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-cream-dark rounded-lg">
                            <button onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center text-charcoal/60 hover:text-charcoal">−</button>
                            <span className="w-9 h-9 flex items-center justify-center text-sm border-x border-cream-dark">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center text-charcoal/60 hover:text-charcoal">+</button>
                          </div>
                          <span className="text-charcoal font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-8 shadow-lg shadow-charcoal/5 sticky top-28">
                  <h3 className="font-heading text-lg text-charcoal font-bold mb-6">Order Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-charcoal/60"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
                    <div className="flex justify-between text-charcoal/60"><span>Shipping</span><span className="text-charcoal/40">Calculated at checkout</span></div>
                    <div className="border-t border-cream-dark pt-3">
                      <div className="flex justify-between text-charcoal font-bold text-lg"><span>Total</span><span>${totalPrice.toFixed(2)}</span></div>
                    </div>
                  </div>
                  <button className="w-full mt-6 bg-charcoal text-white py-4 text-sm font-semibold tracking-wider uppercase rounded-xl hover:bg-rust transition-colors shadow-lg shadow-charcoal/20">
                    Proceed to Checkout
                  </button>
                  <Link href="/men" className="block text-center mt-4 text-charcoal/40 text-xs tracking-widest uppercase hover:text-rust transition-colors">Continue Shopping</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
