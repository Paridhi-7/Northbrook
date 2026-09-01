"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";
import CollectionFilterSidebar, { FilterState } from "@/components/CollectionFilterSidebar";
import { getProductsByCategory } from "@/data/products";

const initialFilters: FilterState = {
  category: "All",
  size: "All",
  color: "All",
  priceRange: "all",
  availability: "all",
  sortBy: "featured",
};

export default function WomenPage() {
  const allProducts = getProductsByCategory("women");
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        // Garment Type filter
        if (filters.category !== "All" && p.subcategory !== filters.category) return false;

        // Size filter
        if (filters.size !== "All" && !p.sizes.includes(filters.size)) return false;

        // Color filter
        if (filters.color !== "All" && !p.colors.some((c) => c.name.toLowerCase().includes(filters.color.toLowerCase()))) return false;

        // Price Range filter
        if (filters.priceRange === "under-600" && p.price >= 600) return false;
        if (filters.priceRange === "600-900" && (p.price < 600 || p.price > 900)) return false;
        if (filters.priceRange === "above-900" && p.price <= 900) return false;

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-asc") return a.price - b.price;
        if (filters.sortBy === "price-desc") return b.price - a.price;
        if (filters.sortBy === "name-asc") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [allProducts, filters]);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative min-h-[42vh] flex items-center justify-center overflow-hidden bg-charcoal pt-28 pb-12">
        <img
          src="/products/butterfly/02.jpg"
          alt="Women's Collection"
          className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/85 to-charcoal" />
        <div className="relative z-10 text-center px-5 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-cream/70 text-xs font-bold tracking-[0.3em] uppercase mb-3"
          >
            Women&apos;s Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-6xl text-white font-bold mb-3"
          >
            Effortless Grace
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-cream/80 text-sm sm:text-base font-light"
          >
            Artistic graphic tees, drop-shoulder fleece hoodies, and timeless natural knitwear tailored for women.
          </motion.p>
        </div>
      </section>

      {/* Main Filter & Products Section */}
      <section className="py-12 sm:py-20 px-5 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Filter Sidebar */}
          <CollectionFilterSidebar
            products={allProducts}
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(initialFilters)}
            totalResults={filteredProducts.length}
          />

          {/* Product Grid Area */}
          <div className="flex-1">
            {/* Desktop Sort Header */}
            <div className="hidden lg:flex items-center justify-between pb-6 mb-8 border-b border-charcoal/10">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60">
                Showing {filteredProducts.length} of {allProducts.length} styles
              </span>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/50">Sort by:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  className="text-xs font-bold text-charcoal bg-cream/70 px-4 py-2.5 rounded-xl border border-charcoal/10 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured Collection</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Alphabetical (A–Z)</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
              {filteredProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <ProductCard
                    id={p.id}
                    name={p.name}
                    price={p.price}
                    originalPrice={p.originalPrice}
                    images={p.images}
                    badge={p.badge}
                    colors={p.colors}
                    sizes={p.sizes}
                  />
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-24 bg-white rounded-3xl border border-charcoal/5 p-8">
                <p className="text-3xl mb-3">🔍</p>
                <h4 className="font-heading text-xl font-bold text-charcoal mb-2">No Matching Pieces</h4>
                <p className="text-charcoal/50 text-sm mb-6 max-w-sm mx-auto">
                  Try clearing or adjusting your selected filters to explore more of our women&apos;s collection.
                </p>
                <button
                  onClick={() => setFilters(initialFilters)}
                  className="bg-charcoal text-white text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-full hover:bg-rust transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
