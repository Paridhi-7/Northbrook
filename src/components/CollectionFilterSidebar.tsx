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

// Color hex map for visual swatches
const colorHexMap: Record<string, string> = {
  Black: "#1a1a1a",
  White: "#f5f1eb",
  Charcoal: "#2b2b2b",
  Grey: "#9a9a9a",
  Olive: "#5a6b4a",
  Brown: "#8b6f47",
  Cream: "#f5f1eb",
  Pink: "#e8b4b8",
  Multi: "linear-gradient(135deg, #f5a623, #7ed321, #4a90e2, #d0021b)",
  "Acid Wash": "#7a8b6f",
  Green: "#4a6b4a",
};

export default function CollectionFilterSidebar({
  products,
  filters,
  onChange,
  onReset,
  totalResults,
}: CollectionFilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <div className="space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between pb-5 mb-5 border-b border-charcoal/8">
        <div>
          <h3 className="font-heading text-base font-bold text-charcoal tracking-tight">Filters</h3>
          <p className="text-[11px] text-charcoal/40 mt-0.5 font-medium">{totalResults} products found</p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-[11px] font-bold text-rust hover:text-rust-dark transition-colors px-2.5 py-1.5 rounded-lg hover:bg-rust/8"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear All
          </button>
        )}
      </div>

      {/* Garment Type */}
      <div className="pb-5 mb-5 border-b border-charcoal/6">
        <h4 className="text-[10px] font-black tracking-[0.18em] uppercase text-charcoal/45 mb-3 flex items-center gap-2">
          <span className="w-1 h-3 rounded-full bg-rust inline-block" />
          Garment Type
        </h4>
        <div className="space-y-1">
          {subcategories.map((cat) => {
            const isActive = filters.category === cat;
            const count = cat === "All" ? products.length : products.filter((p) => p.subcategory === cat).length;
            return (
              <button
                key={cat}
                onClick={() => onChange({ ...filters, category: cat })}
                className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 flex items-center justify-between group ${
                  isActive
                    ? "bg-rust text-white shadow-md shadow-rust/20"
                    : "text-charcoal/65 hover:text-charcoal hover:bg-charcoal/5"
                }`}
              >
                <span>{cat === "All" ? "All Styles" : cat}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${
                    isActive ? "bg-white/20 text-white" : "bg-charcoal/8 text-charcoal/50 group-hover:bg-charcoal/12"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <div className="pb-5 mb-5 border-b border-charcoal/6">
        <h4 className="text-[10px] font-black tracking-[0.18em] uppercase text-charcoal/45 mb-3 flex items-center gap-2">
          <span className="w-1 h-3 rounded-full bg-rust inline-block" />
          Availability
        </h4>
        <div className="space-y-2.5">
          {[
            { label: "All Items", value: "all" },
            { label: "In Stock (Ready to Ship)", value: "in-stock" },
          ].map((item) => {
            const isActive = filters.availability === item.value;
            return (
              <label key={item.value} className="flex items-center gap-3 cursor-pointer select-none group">
                {/* Custom radio */}
                <div
                  className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    isActive ? "border-rust bg-rust shadow-sm shadow-rust/30" : "border-charcoal/20 group-hover:border-rust/50"
                  }`}
                  style={{ width: "1.1rem", height: "1.1rem" }}
                  onClick={() => onChange({ ...filters, availability: item.value })}
                >
                  {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <input
                  type="radio"
                  name="availability"
                  checked={isActive}
                  onChange={() => onChange({ ...filters, availability: item.value })}
                  className="sr-only"
                />
                <span
                  className={`text-xs font-semibold transition-colors ${isActive ? "text-charcoal" : "text-charcoal/60 group-hover:text-charcoal/80"}`}
                  onClick={() => onChange({ ...filters, availability: item.value })}
                >
                  {item.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Size */}
      <div className="pb-5 mb-5 border-b border-charcoal/6">
        <h4 className="text-[10px] font-black tracking-[0.18em] uppercase text-charcoal/45 mb-3 flex items-center gap-2">
          <span className="w-1 h-3 rounded-full bg-rust inline-block" />
          Size
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {allSizes.map((s) => {
            const isActive = filters.size === s;
            return (
              <button
                key={s}
                onClick={() => onChange({ ...filters, size: s })}
                className={`px-3 py-2 text-[11px] font-bold rounded-lg border transition-all duration-200 ${
                  isActive
                    ? "bg-charcoal text-white border-charcoal shadow-md shadow-charcoal/20 scale-105"
                    : "bg-white text-charcoal/60 border-charcoal/12 hover:border-rust/40 hover:text-charcoal hover:bg-rust/4"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="pb-5 mb-5 border-b border-charcoal/6">
        <h4 className="text-[10px] font-black tracking-[0.18em] uppercase text-charcoal/45 mb-3 flex items-center gap-2">
          <span className="w-1 h-3 rounded-full bg-rust inline-block" />
          Price Range
        </h4>
        <div className="space-y-2.5">
          {priceRanges.map((r) => {
            const isActive = filters.priceRange === r.value;
            return (
              <label key={r.value} className="flex items-center gap-3 cursor-pointer select-none group">
                <div
                  className={`flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    isActive ? "border-rust bg-rust shadow-sm shadow-rust/30" : "border-charcoal/20 group-hover:border-rust/50"
                  }`}
                  style={{ width: "1.1rem", height: "1.1rem" }}
                  onClick={() => onChange({ ...filters, priceRange: r.value })}
                >
                  {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <input
                  type="radio"
                  name="priceRange"
                  checked={isActive}
                  onChange={() => onChange({ ...filters, priceRange: r.value })}
                  className="sr-only"
                />
                <span
                  className={`text-xs font-semibold transition-colors ${isActive ? "text-charcoal" : "text-charcoal/60 group-hover:text-charcoal/80"}`}
                  onClick={() => onChange({ ...filters, priceRange: r.value })}
                >
                  {r.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Color Tone */}
      <div>
        <h4 className="text-[10px] font-black tracking-[0.18em] uppercase text-charcoal/45 mb-3 flex items-center gap-2">
          <span className="w-1 h-3 rounded-full bg-rust inline-block" />
          Color Tone
        </h4>
        <div className="flex flex-wrap gap-2">
          {allColors.map((col) => {
            const isActive = filters.color === col;
            const hex = colorHexMap[col];
            const isGradient = col === "Multi";
            return (
              <button
                key={col}
                onClick={() => onChange({ ...filters, color: col })}
                title={col}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg border transition-all duration-200 ${
                  isActive
                    ? "bg-rust text-white border-rust shadow-md shadow-rust/20"
                    : "bg-white text-charcoal/65 border-charcoal/12 hover:border-rust/35 hover:text-charcoal hover:shadow-sm"
                }`}
              >
                {col !== "All" && (
                  <span
                    className={`w-3 h-3 rounded-full flex-shrink-0 border ${isActive ? "border-white/40" : "border-charcoal/15"}`}
                    style={isGradient ? { background: "linear-gradient(135deg, #f5a623 0%, #7ed321 40%, #4a90e2 70%, #e8b4b8 100%)" } : { backgroundColor: hex }}
                  />
                )}
                {col}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle & Sort Bar */}
      <div className="lg:hidden flex items-center justify-between gap-3 mb-6 bg-white p-4 rounded-2xl border border-charcoal/8 shadow-sm">
        <button
          onClick={() => setMobileOpen(true)}
          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl border transition-all duration-200 ${
            hasActiveFilters
              ? "bg-rust text-white border-rust shadow-md shadow-rust/20"
              : "text-charcoal bg-cream border-charcoal/10 hover:border-rust/30"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
          Filters {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />}
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal/40">Sort:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value })}
            className="text-xs font-bold text-charcoal bg-cream px-3 py-2.5 rounded-xl border border-charcoal/10 focus:outline-none focus:border-rust/40 transition-all cursor-pointer"
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white p-6 overflow-y-auto shadow-2xl z-10">
            <div className="flex items-center justify-between pb-5 mb-2 border-b border-charcoal/8">
              <span className="font-heading text-base font-bold text-charcoal">Filter Collection</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-charcoal hover:bg-charcoal/10 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {FilterContent}
            <button
              onClick={() => setMobileOpen(false)}
              className="w-full mt-6 py-3.5 bg-charcoal text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-rust transition-colors"
            >
              Show {totalResults} Results
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sticky Left Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-28 bg-white rounded-3xl p-6 border border-charcoal/8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          {FilterContent}

          {/* Sort by (desktop only, below filters) */}
          <div className="mt-5 pt-5 border-t border-charcoal/6">
            <h4 className="text-[10px] font-black tracking-[0.18em] uppercase text-charcoal/45 mb-3 flex items-center gap-2">
              <span className="w-1 h-3 rounded-full bg-rust inline-block" />
              Sort By
            </h4>
            <select
              value={filters.sortBy}
              onChange={(e) => onChange({ ...filters, sortBy: e.target.value })}
              className="w-full text-xs font-semibold text-charcoal bg-cream/70 px-3.5 py-2.5 rounded-xl border border-charcoal/10 focus:outline-none focus:border-rust/40 transition-all cursor-pointer hover:border-charcoal/25"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Alphabetical</option>
            </select>
          </div>
        </div>
      </aside>
    </>
  );
}
