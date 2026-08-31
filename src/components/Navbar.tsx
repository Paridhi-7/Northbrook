"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/men", label: "Men" },
  { href: "/women", label: "Women" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsOpen } = useCart();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-lg shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <span className="text-[22px] font-bold text-charcoal tracking-[0.18em] uppercase font-heading">
              NorthBrook
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-[13px] font-medium tracking-[0.12em] uppercase transition-colors duration-300 ${
                  pathname === l.href ? "text-rust" : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                {l.label}
                {pathname === l.href && (
                  <motion.span
                    layoutId="nav-line"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-rust rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-charcoal/5 transition-colors"
              aria-label="Open cart"
            >
              <svg className="w-[22px] h-[22px] text-charcoal" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0 -right-0 w-[20px] h-[20px] bg-rust text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
              aria-label="Toggle menu"
            >
              <motion.span animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="w-5 h-[1.5px] bg-charcoal block origin-center" />
              <motion.span animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} className="w-5 h-[1.5px] bg-charcoal block" />
              <motion.span animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="w-5 h-[1.5px] bg-charcoal block origin-center" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream/98 backdrop-blur-xl border-t border-cream-dark overflow-hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`block py-3 text-[14px] tracking-[0.12em] uppercase font-medium transition-colors ${
                    pathname === l.href ? "text-rust" : "text-charcoal/70 hover:text-charcoal"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
