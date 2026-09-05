'use client';

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getAllProducts, Product } from "@/data/products";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");
  const products = getAllProducts();

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.subcategory.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-cream rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-cream-dark"
          >
            <div className="relative p-5 border-b border-charcoal/10 flex items-center gap-3">
              <svg
                className="w-5 h-5 text-charcoal/40"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search catalog (e.g., Hoodie, Tee, Cord Sets)..."
                autoFocus
                className="flex-1 bg-transparent text-charcoal text-base placeholder:text-charcoal/40 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-charcoal/10 flex items-center justify-center text-charcoal/60 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4">
              {query.trim() === "" ? (
                <div className="py-8 text-center text-charcoal/40 text-sm">
                  Type to search through our apparel & knitwear collection...
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-8 text-center text-charcoal/50 text-sm">
                  No products found matching &ldquo;{query}&rdquo;
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filtered.map((p: Product) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.id}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white transition-colors group"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-14 h-16 object-cover rounded-lg bg-cream-dark"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-charcoal font-medium text-sm truncate group-hover:text-rust transition-colors">
                          {p.name}
                        </h4>
                        <p className="text-xs text-charcoal/50 capitalize">
                          {p.category} &bull; {p.subcategory}
                        </p>
                        <p className="text-charcoal font-bold text-sm mt-1">₹{p.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
