"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";
import { getBestSellers } from "@/data/products";

const categories = [
  {
    title: "Men's Collection",
    desc: "Refined knitwear for the modern man. Timeless pieces, premium natural fibres.",
    href: "/men",
    image: "/products/cargo-boys/01.jpg",
  },
  {
    title: "Women's Collection",
    desc: "Elegant comfort that transitions effortlessly from day to evening.",
    href: "/women",
    image: "/products/butterfly/01.jpg",
  },
];

export default function HomePage() {
  const bestSellers = getBestSellers();

  return (
    <>
      {/* ── Hero ────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img
          src="/products/cord-sets/01.jpg"
          alt="NorthBrook collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-cream/70 text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-4"
          >
            Family-Run Knitwear Since 2018
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white font-bold leading-[1.05] max-w-3xl"
          >
            Where Comfort
            <br />
            <span className="text-rust-light">Meets Fashion</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 text-cream/70 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            Premium knitwear crafted with care. Natural fibres, timeless design,
            and the warmth of family tradition.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link href="/men" className="inline-flex items-center gap-2 bg-rust text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-rust-dark transition-all duration-300 shadow-lg shadow-rust/30 hover:shadow-xl hover:shadow-rust/40 hover:-translate-y-0.5">
              Shop Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link href="/about" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300">
              Our Story
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-2.5 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Shop by Category ──────────────────────────── */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-rust text-xs font-semibold tracking-[0.25em] uppercase mb-3">Browse Our</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-charcoal font-bold">Collections</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {categories.map((c, i) => (
            <ScrollReveal key={c.href} delay={i * 0.15}>
              <Link href={c.href} className="group block relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img src={c.image} alt={c.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                  <h3 className="font-heading text-2xl sm:text-3xl text-white font-bold mb-2">{c.title}</h3>
                  <p className="text-white/60 text-sm mb-4 max-w-xs">{c.desc}</p>
                  <span className="inline-flex items-center gap-2 text-white text-xs font-semibold tracking-widest uppercase group-hover:text-rust-light transition-colors">
                    Explore <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Best Sellers ──────────────────────────────── */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-rust text-xs font-semibold tracking-[0.25em] uppercase mb-3">Most Loved</p>
              <h2 className="font-heading text-4xl sm:text-5xl text-charcoal font-bold">Best Sellers</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-8">
            {bestSellers.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.08}>
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Story ──────────────────────────────── */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="relative rounded-2xl overflow-hidden aspect-square">
                <img src="/products/magknit-wording/01.jpg" alt="NorthBrook workshop" className="w-full h-full object-cover" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <p className="text-rust text-xs font-semibold tracking-[0.25em] uppercase mb-4">Our Story</p>
              <h2 className="font-heading text-4xl sm:text-5xl text-charcoal font-bold mb-6 leading-tight">
                Where Comfort
                <br />
                Meets Fashion
              </h2>
              <p className="text-charcoal/60 leading-relaxed mb-5">
                NorthBrook was born from a simple belief: that knitwear should feel as good as it looks.
                As a family-run brand, we pour care into every stitch, choosing only the finest natural
                fibres sourced from trusted suppliers.
              </p>
              <p className="text-charcoal/60 leading-relaxed mb-8">
                Our designs draw from the landscapes and traditions that raised us — understated, warm,
                and built to last. Each piece is a testament to craftsmanship, designed to be worn
                and treasured for years to come.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-charcoal text-sm font-semibold tracking-widest uppercase border-b-2 border-charcoal pb-1 hover:text-rust hover:border-rust transition-colors">
                Read Our Full Story
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Newsletter ──────────────────────────────── */}
      <section className="py-20 sm:py-24 px-5 sm:px-8 lg:px-10 bg-charcoal">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl sm:text-4xl text-white font-bold mb-4">Join the NorthBrook Family</h2>
            <p className="text-cream/50 mb-8 max-w-lg mx-auto">
              Exclusive offers, early access to new collections, and a 10% welcome discount on your first order.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Your email address" className="flex-1 px-5 py-3.5 bg-white/10 border border-white/10 text-white placeholder:text-white/30 text-sm rounded-full focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust transition" />
              <button type="submit" className="px-7 py-3.5 bg-rust text-white text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-rust-dark transition-colors shadow-lg shadow-rust/30">
                Subscribe
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
