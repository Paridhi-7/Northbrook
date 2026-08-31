"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 250 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[420px] bg-cream z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-cream-dark">
              <h2 className="font-heading text-xl text-charcoal font-bold">Your Bag</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-charcoal/5 rounded-full transition-colors" aria-label="Close">
                <svg className="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg className="w-16 h-16 text-cream-dark mb-4" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <p className="text-charcoal/50 text-sm mb-1">Your bag is empty</p>
                  <button onClick={() => setIsOpen(false)} className="text-rust text-xs tracking-widest uppercase mt-4 hover:text-rust-dark transition-colors">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4 bg-white rounded-lg p-3 shadow-sm">
                      <div className="w-[72px] h-[90px] rounded-md overflow-hidden bg-cream-dark flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className="text-charcoal text-sm font-medium truncate pr-2">{item.name}</h3>
                          <button onClick={() => removeItem(item.id, item.color, item.size)} className="text-charcoal/30 hover:text-rust transition-colors flex-shrink-0" aria-label="Remove">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-charcoal/40 text-xs mt-0.5">{item.color} / {item.size}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-cream-dark rounded-md">
                            <button onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-charcoal/60 hover:text-charcoal text-sm rounded-l-md">−</button>
                            <span className="w-7 h-7 flex items-center justify-center text-charcoal text-xs border-x border-cream-dark">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-charcoal/60 hover:text-charcoal text-sm rounded-r-md">+</button>
                          </div>
                          <span className="text-charcoal font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-cream-dark px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-charcoal/60 text-sm">Subtotal</span>
                  <span className="text-charcoal font-bold text-lg">${totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-charcoal/40 text-xs">Shipping & taxes calculated at checkout</p>
                <button className="w-full bg-charcoal text-white py-4 text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-rust transition-colors duration-300 shadow-lg shadow-charcoal/20">
                  Checkout
                </button>
                <button onClick={() => setIsOpen(false)} className="w-full text-center text-charcoal/50 text-xs tracking-widest uppercase py-2 hover:text-rust transition-colors">
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
