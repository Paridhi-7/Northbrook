"use client";

import { useState } from "react";
import { Product } from "@/data/products";

export interface FilterState {
  category: string;
  size: string;
  color: string;
  priceRange: string;
  availability: string;
  sortBy: string;
}

interface CollectionFilterSidebarProps {
  products: Product[];
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export default function CollectionFilterSidebar({
  products,
  filters,
  onChange,
  onReset,
  totalResults,
}: CollectionFilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Extract unique filter options from actual products in this collection
  const subcategories = ["All", ...Array.from(new Set(products.map((p) => p.subcategory)))];
  const allSizes = ["All", "XS", "S", "M", "L", "XL", "30", "32", "34", "36"];
  const allColors = ["All", "Black", "White", "Charcoal", "Grey", "Olive", "Brown", "Cream", "Pink", "Multi", "Acid Wash"];

  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under ₹600", value: "under-600" },
    { label: "₹600 – ₹900", value: "600-900" },
    { label: "Above ₹900", value: "above-900" },
  ];

  const hasActiveFilters =
    filters.category !== "All" ||
    filters.size !== "All" ||
    filters.color !== "All" ||
    filters.priceRange !== "all" ||
    filters.availability !== "all" ||
    filters.sortBy !== "featured";

  const FilterContent = (
    <div className="space-y-8">
      {/* Active Filters / Reset Header */}
      <div className="flex items-center justify-between pb-4 border-b border-charcoal/10">
        <div>
          <h3 className="font-heading text-lg font-bold text-charcoal">Filters</h3>
          <p className="text-xs text-charcoal/50 mt-0.5">{totalResults} products found</p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs font-bold text-rust hover:text-rust-dark underline underline-offset-4"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category / Garment Type */}
      <div>
        <h4 className="text-xs font-bold tracking-widest uppercase text-charcoal/60 mb-3">Garment Type</h4>
        <div className="space-y-1.5">
          {subcategories.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange({ ...filters, category: cat })}
              className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-between ${
                filters.category === cat
                  ? "bg-charcoal text-white shadow-sm"
                  : "text-charcoal/70 hover:bg-cream hover:text-charcoal"
              }`}
            >
              <span>{cat === "All" ? "All Styles" : cat}</span>
              <span className="text-[10px] opacity-70">
                {cat === "All" ? products.length : products.filter((p) => p.subcategory === cat).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="text-xs font-bold tracking-widest uppercase text-charcoal/60 mb-3">Availability</h4>
        <div className="space-y-2 text-xs font-semibold text-charcoal/80">
          {[
            { label: "All Items", value: "all" },
            { label: "In Stock (Ready to Ship)", value: "in-stock" },
          ].map((item) => (
            <label key={item.value} className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="radio"
                name="availability"
                checked={filters.availability === item.value}
                onChange={() => onChange({ ...filters, availability: item.value })}
                className="w-4 h-4 text-rust focus:ring-rust accent-rust"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h4 className="text-xs font-bold tracking-widest uppercase text-charcoal/60 mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button
              key={s}
              onClick={() => onChange({ ...filters, size: s })}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg border transition-all ${
                filters.size === s
                  ? "bg-charcoal text-white border-charcoal shadow-sm"
                  : "bg-white text-charcoal/70 border-charcoal/15 hover:border-charcoal/40"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-xs font-bold tracking-widest uppercase text-charcoal/60 mb-3">Price Range</h4>
        <div className="space-y-2 text-xs font-semibold text-charcoal/80">
          {priceRanges.map((r) => (
            <label key={r.value} className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === r.value}
                onChange={() => onChange({ ...filters, priceRange: r.value })}
                className="w-4 h-4 text-rust focus:ring-rust accent-rust"
              />
              <span>{r.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <h4 className="text-xs font-bold tracking-widest uppercase text-charcoal/60 mb-3">Color Tone</h4>
        <div className="flex flex-wrap gap-1.5">
          {allColors.map((col) => (
            <button
              key={col}
              onClick={() => onChange({ ...filters, color: col })}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                filters.color === col
                  ? "bg-rust text-white border-rust shadow-sm"
                  : "bg-cream/60 text-charcoal/70 border-charcoal/10 hover:border-charcoal/30"
              }`}
            >
              {col}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle & Sort Bar */}
      <div className="lg:hidden flex items-center justify-between gap-3 mb-6 bg-white p-4 rounded-2xl border border-charcoal/10 shadow-sm">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal bg-cream px-4 py-2.5 rounded-xl border border-charcoal/10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
          Filters {hasActiveFilters && "•"}
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal/50">Sort:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value })}
            className="text-xs font-bold text-charcoal bg-cream px-3 py-2.5 rounded-xl border border-charcoal/10 focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white p-6 overflow-y-auto shadow-2xl z-10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-charcoal/10">
              <span className="font-heading text-lg font-bold text-charcoal">Filter Collection</span>
              <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-full bg-cream flex items-center justify-center font-bold text-charcoal">
                ✕
              </button>
            </div>
            {FilterContent}
            <button
              onClick={() => setMobileOpen(false)}
              className="w-full py-3.5 bg-charcoal text-white text-xs font-bold uppercase tracking-widest rounded-xl"
            >
              Show {totalResults} Results
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sticky Left Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-28 bg-white rounded-3xl p-6 border border-charcoal/10 shadow-sm">
          {FilterContent}
        </div>
      </aside>
    </>
  );
}
