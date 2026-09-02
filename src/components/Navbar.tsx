"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { getAllProducts, Product } from "@/data/products";

const links = [
  { href: "/", label: "Home" },
  { href: "/men", label: "Men's" },
  { href: "/women", label: "Women's" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, setIsOpen } = useCart();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const allProducts = getAllProducts();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [searchOpen]);

  // Live search filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const results = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
    setSearchResults(results.slice(0, 6));
  }, [searchQuery]);

  // Close search on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searchOpen]);

  const handleResultClick = (id: string) => {
    setSearchOpen(false);
    router.push(`/product/${id}`);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
    >
      {/* Dark blur glassmorphism bar guaranteeing 100% visibility on all backgrounds */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-charcoal/95 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.35)] py-3.5"
            : "bg-charcoal/85 backdrop-blur-xl border-b border-white/10 shadow-[0_2px_20px_rgba(0,0,0,0.25)] py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="relative z-10 group flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rust shadow-sm shadow-rust/50 group-hover:scale-125 transition-transform" />
              <span className="text-[20px] sm:text-[23px] font-extrabold tracking-[0.22em] uppercase font-heading text-white">
                North<span className="text-rust-light font-black">Brook</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
              {links.map((l) => {
                const isActive = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`relative px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase rounded-full transition-all duration-300 ${
                      isActive
                        ? "text-white bg-rust shadow-md shadow-rust/30"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {l.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-rust rounded-full -z-10 shadow-lg shadow-rust/40"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-3">
              {/* Quick Collection Badges for Desktop */}
              <div className="hidden lg:flex items-center gap-2 mr-1">
                <Link
                  href="/men"
                  className="text-[11px] font-bold tracking-wider uppercase text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-all"
                >
                  Men
                </Link>
                <Link
                  href="/women"
                  className="text-[11px] font-bold tracking-wider uppercase text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-all"
                >
                  Women
                </Link>
              </div>

              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2.5 sm:p-3 rounded-full border transition-all duration-300 group shadow-md ${
                  searchOpen
                    ? "bg-rust text-white border-rust"
                    : "bg-white/10 hover:bg-rust text-white border-white/15 hover:border-rust"
                }`}
                aria-label="Search Products"
              >
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              {/* Shopping Bag Button */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-rust text-white border border-white/15 hover:border-rust transition-all duration-300 group shadow-md"
                aria-label="Open Shopping Bag"
              >
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-rust text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-lg border-2 border-charcoal"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden relative z-10 w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex flex-col items-center justify-center gap-1.5 text-white transition-all active:scale-95"
                aria-label="Toggle Navigation Menu"
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                  className="w-5 h-[2px] bg-white block origin-center rounded-full"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  className="w-5 h-[2px] bg-white block rounded-full"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                  className="w-5 h-[2px] bg-white block origin-center rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search Overlay Panel ─────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-charcoal/98 border-b border-white/10 backdrop-blur-2xl shadow-2xl"
          >
            <div className="max-w-3xl mx-auto px-5 sm:px-8 py-5" ref={searchContainerRef}>
              {/* Search Input */}
              <div className="relative flex items-center gap-3">
                <svg className="absolute left-4 w-5 h-5 text-white/40 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  ref={searchInputRef}
                  id="navbar-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tees, hoodies, cargo…"
                  className="w-full pl-12 pr-12 py-3.5 bg-white/8 border border-white/15 rounded-2xl text-white placeholder:text-white/35 text-sm font-medium focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white/70 hover:bg-white/30 transition"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Search Results */}
              <AnimatePresence>
                {searchQuery.trim() && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="mt-4"
                  >
                    {searchResults.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {searchResults.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => handleResultClick(product.id)}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/12 border border-white/8 hover:border-rust/40 transition-all text-left group"
                          >
                            <div className="w-12 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-white/10">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-white text-xs font-bold truncate group-hover:text-rust transition-colors">{product.name}</p>
                              <p className="text-white/40 text-[11px] font-medium capitalize">{product.category} · {product.subcategory}</p>
                              <p className="text-rust-light text-xs font-bold mt-0.5">₹{product.price}</p>
                            </div>
                            <svg className="w-4 h-4 text-white/25 group-hover:text-rust ml-auto flex-shrink-0 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-white/40 text-sm">No products found for &ldquo;{searchQuery}&rdquo;</p>
                        <p className="text-white/25 text-xs mt-1">Try searching for tees, hoodies, cargo, etc.</p>
                      </div>
                    )}
                    {searchResults.length > 0 && (
                      <p className="text-white/30 text-[11px] text-right mt-3 font-medium">
                        {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} · Press ESC to close
                      </p>
                    )}
                  </motion.div>
                )}
                {!searchQuery.trim() && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 flex items-center justify-between"
                  >
                    <p className="text-white/30 text-xs font-medium">Popular: Hoodies, Acid Wash, Cargo, Tees</p>
                    <p className="text-white/20 text-[11px]">ESC to close</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Animated Slide-Over Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-charcoal/98 border-b border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-8 space-y-3 max-w-md mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-rust mb-2">Explore NorthBrook</p>
              {links.map((l) => {
                const isActive = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`flex items-center justify-between py-3.5 px-4 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all ${
                      isActive
                        ? "bg-rust text-white shadow-lg shadow-rust/20"
                        : "text-white/85 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-xs opacity-60">→</span>
                  </Link>
                );
              })}

              {/* Track Order link in mobile */}
              <Link
                href="/track-order"
                className={`flex items-center justify-between py-3.5 px-4 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all ${
                  pathname === "/track-order"
                    ? "bg-rust text-white shadow-lg shadow-rust/20"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>Track Order</span>
                <span className="text-xs opacity-60">→</span>
              </Link>

              {/* Mobile search button */}
              <button
                onClick={() => { setMobileOpen(false); setTimeout(() => setSearchOpen(true), 300); }}
                className="w-full flex items-center justify-between py-3.5 px-4 rounded-2xl text-sm font-bold tracking-widest uppercase text-white/85 hover:text-white hover:bg-white/10 transition-all"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  Search
                </span>
                <span className="text-xs opacity-60">→</span>
              </button>

              <div className="pt-6 mt-4 border-t border-white/10 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Direct Contact</p>
                <div className="flex flex-col gap-2 text-xs text-white/80">
                  <a href="tel:+919992442999" className="flex items-center gap-2 hover:text-rust transition-colors font-medium">
                    <span>📞</span> +91 99924 42999
                  </a>
                  <a href="mailto:northbrook.official@gmail.com" className="flex items-center gap-2 hover:text-rust transition-colors font-medium">
                    <span>✉️</span> northbrook.official@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
