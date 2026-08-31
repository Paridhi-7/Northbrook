"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <>
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-5xl md:text-6xl text-charcoal font-bold"
          >
            Shopping Bag
          </motion.h1>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-warmbeige-dark text-6xl mb-6">◎</div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-3">
                Your bag is empty
              </h2>
              <p className="text-charcoal-light mb-8">
                Looks like you haven&apos;t added anything yet.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/men"
                  className="px-8 py-3 bg-charcoal text-offwhite text-sm tracking-widest uppercase hover:bg-rust transition-colors duration-300"
                >
                  Shop Men
                </Link>
                <Link
                  href="/women"
                  className="px-8 py-3 border-2 border-charcoal text-charcoal text-sm tracking-widest uppercase hover:bg-charcoal hover:text-offwhite transition-all duration-300"
                >
                  Shop Women
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-charcoal text-sm tracking-widest uppercase font-medium">
                    {items.length} {items.length === 1 ? "Item" : "Items"}
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-warmbeige-dark text-xs tracking-widest uppercase hover:text-rust transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-warmbeige">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.color}-${item.size}`}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-6 py-6"
                    >
                      {/* Image placeholder */}
                      <div className="w-28 h-36 bg-cream rounded-sm flex-shrink-0 flex items-center justify-center text-xs text-earth-brown text-center px-2">
                        {item.name}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-charcoal font-medium">
                              {item.name}
                            </h3>
                            <p className="text-warmbeige-dark text-sm mt-1">
                              Color: {item.color}
                            </p>
                            <p className="text-warmbeige-dark text-sm">
                              Size: {item.size}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              removeItem(item.id, item.color, item.size)
                            }
                            className="text-warmbeige-dark hover:text-rust transition-colors"
                            aria-label="Remove item"
                          >
                            <svg
                              className="w-5 h-5"
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

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity */}
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
                              className="w-10 h-10 flex items-center justify-center text-charcoal hover:bg-cream transition-colors"
                            >
                              −
                            </button>
                            <span className="w-10 h-10 flex items-center justify-center text-charcoal border-x border-warmbeige">
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
                              className="w-10 h-10 flex items-center justify-center text-charcoal hover:bg-cream transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-charcoal font-bold text-lg">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-cream p-8 rounded-sm sticky top-28">
                  <h3 className="font-heading text-lg text-charcoal font-bold mb-6 tracking-wider">
                    Order Summary
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-charcoal-light">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-charcoal-light">
                      <span>Shipping</span>
                      <span className="text-sage">Calculated at checkout</span>
                    </div>
                    <div className="border-t border-warmbeige pt-3 mt-3">
                      <div className="flex justify-between text-charcoal font-bold text-lg">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-6 bg-charcoal text-offwhite py-4 text-sm tracking-widest uppercase hover:bg-rust transition-colors duration-300">
                    Proceed to Checkout
                  </button>
                  <Link
                    href="/men"
                    className="block text-center mt-4 text-charcoal-light text-xs tracking-widest uppercase hover:text-rust transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
