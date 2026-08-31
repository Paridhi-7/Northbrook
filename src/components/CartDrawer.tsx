"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-charcoal/50 z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-offwhite z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-warmbeige">
              <h2 className="font-heading text-xl text-charcoal font-bold tracking-wider">
                Your Bag
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-charcoal hover:text-rust transition-colors p-1"
                aria-label="Close cart"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-warmbeige-dark text-5xl mb-4">◎</div>
                  <p className="text-charcoal-light text-sm mb-2">
                    Your bag is empty
                  </p>
                  <p className="text-warmbeige-dark text-xs">
                    Browse our collections and find something you love.
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-6 text-rust text-xs tracking-widest uppercase border-b border-rust pb-0.5 hover:text-rust-dark hover:border-rust-dark transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.color}-${item.size}`}
                      className="flex gap-4"
                    >
                      {/* Image placeholder */}
                      <div className="w-20 h-24 bg-cream rounded-sm flex-shrink-0 flex items-center justify-center text-[10px] text-earth-brown text-center px-1">
                        {item.name}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-charcoal text-sm font-medium truncate">
                              {item.name}
                            </h3>
                            <p className="text-warmbeige-dark text-xs mt-0.5">
                              {item.color} / {item.size}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              removeItem(item.id, item.color, item.size)
                            }
                            className="text-warmbeige-dark hover:text-rust transition-colors ml-2 flex-shrink-0"
                            aria-label="Remove item"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity controls */}
                          <div className="flex items-center border border-warmbeige">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.color,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center text-charcoal hover:bg-cream transition-colors text-sm"
                            >
                              −
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center text-charcoal text-sm border-x border-warmbeige">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.color,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center text-charcoal hover:bg-cream transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-charcoal font-semibold text-sm">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-warmbeige px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-charcoal-light text-sm">Subtotal</span>
                  <span className="text-charcoal font-bold text-lg">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-warmbeige-dark text-xs">
                  Shipping and taxes calculated at checkout.
                </p>
                <button className="w-full bg-charcoal text-offwhite py-4 text-sm tracking-widest uppercase hover:bg-rust transition-colors duration-300">
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center text-charcoal-light text-xs tracking-widest uppercase hover:text-rust transition-colors py-2"
                >
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
