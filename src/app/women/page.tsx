"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/data/products";

const filters = ["All", "New", "Sale", "Best Seller"];

export default function WomenPage() {
  const all = getProductsByCategory("women");
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? all : all.filter((p) => p.badge === active);

  return (
    <>
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-charcoal">
        <img src="/products/butterfly/02.jpg" alt="Women's Collection" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-charcoal/80" />
        <div className="relative z-10 text-center px-5">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-cream/60 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Women&apos;s Collection</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading text-5xl sm:text-6xl text-white font-bold">Effortless Elegance</motion.h1>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-5 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap gap-3 mb-12">
              {filters.map((f) => (
                <button key={f} onClick={() => setActive(f)} className={`px-6 py-2.5 text-xs font-semibold tracking-widest uppercase rounded-full border transition-all duration-300 ${active === f ? "bg-charcoal text-white border-charcoal shadow-lg shadow-charcoal/20" : "bg-transparent text-charcoal/60 border-charcoal/15 hover:border-charcoal/40"}`}>
                  {f}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-8">
            {filtered.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <ProductCard id={p.id} name={p.name} price={p.price} originalPrice={p.originalPrice} images={p.images} badge={p.badge} colors={p.colors} sizes={p.sizes} />
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && <p className="text-center py-20 text-charcoal/40">No products match this filter.</p>}
        </div>
      </section>
    </>
  );
}
