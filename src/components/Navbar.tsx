'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import SearchModal from "@/components/SearchModal";

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const pathname = usePathname();
  const { totalItems, setIsOpen } = useCart();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
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

            {/* Desktop Center Nav */}
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

            {/* Right Icons: Search -> Cart -> Profile */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* 1. Search Icon */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-full hover:bg-charcoal/5 transition-colors text-charcoal"
                aria-label="Search"
                title="Search"
              >
                <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              {/* 2. Cart Icon */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2.5 rounded-full hover:bg-charcoal/5 transition-colors text-charcoal"
                aria-label="Open cart"
                title="Cart"
              >
                <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 w-[20px] h-[20px] bg-rust text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* 3. Profile Icon & Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`p-2.5 rounded-full transition-colors text-charcoal ${
                    profileOpen ? "bg-charcoal/10" : "hover:bg-charcoal/5"
                  }`}
                  aria-label="Profile Account"
                  title="Profile Account"
                >
                  <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-52 bg-cream rounded-2xl shadow-xl border border-charcoal/10 py-2 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-2 border-b border-charcoal/10">
                        <p className="text-[11px] font-semibold tracking-widest uppercase text-charcoal/50">My Account</p>
                      </div>
                      <Link
                        href="/login"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-xs font-semibold tracking-wider uppercase text-charcoal hover:bg-charcoal/5 hover:text-rust transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H2.25" />
                        </svg>
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-xs font-semibold tracking-wider uppercase text-charcoal hover:bg-charcoal/5 hover:text-rust transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                        </svg>
                        Sign Up
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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
                <div className="pt-4 border-t border-charcoal/10 flex gap-4">
                  <Link
                    href="/login"
                    className="flex-1 text-center py-2.5 text-xs font-semibold tracking-wider uppercase border border-charcoal/20 rounded-full text-charcoal"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="flex-1 text-center py-2.5 text-xs font-semibold tracking-wider uppercase bg-charcoal text-white rounded-full"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
