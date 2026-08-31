"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";
import {
  getProductsByCategory,
  getSubcategories,
  type Product,
} from "@/data/products";

export default function MenPage() {
  const allProducts = getProductsByCategory("men");
  const subcategories = getSubcategories("men");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts =
    activeFilter === "All"
      ? allProducts
      : allProducts.filter((p) => p.subcategory === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-earth-brown text-sm tracking-[0.3em] uppercase mb-4"
          >
            Men&apos;s Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading text-5xl md:text-6xl text-charcoal font-bold mb-6"
          >
            Refined Knitwear
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-charcoal-light text-lg max-w-2xl mx-auto"
          >
            Premium pieces designed for the modern man. Timeless silhouettes
            crafted from the finest natural fibres.
          </motion.p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filter Bar */}
          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-3 mb-12">
              {["All", ...subcategories].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 text-xs tracking-widest uppercase border transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-charcoal text-offwhite border-charcoal"
                      : "bg-transparent text-charcoal border-warmbeige hover:border-charcoal"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  badge={product.badge}
                  colors={product.colors}
                />
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-charcoal-light">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
