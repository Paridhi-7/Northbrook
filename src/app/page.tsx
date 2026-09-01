"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";
import CollectionCardSlideshow from "@/components/CollectionCardSlideshow";
import { getBestSellers } from "@/data/products";

const menSlides = [
  "/products/acid-wash-boys-washing/02.jpg",
  "/products/game-over-hoodie-boys/02.jpg",
  "/products/cord-sets/05.jpg",
  "/products/white-dots/02.jpg",
  "/products/think-again-boys/02.jpg",
];

const womenSlides = [
  "/products/butterfly/02.jpg",
  "/products/acid-wash-girls-washing/02.jpg",
  "/products/racing-hoodie/02.jpg",
  "/products/day-dream-hoodie/02.jpg",
  "/products/magknit-strip-patta-hoodie/02.jpg",
];

export default function HomePage() {
  const bestSellers = getBestSellers();

  return (
    <>
      {/* ── Full-Bleed Hero Background Video ────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-charcoal">
        {/* Full-width Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/products/acid-wash-boys-washing/02.jpg"
          className="absolute inset-0 w-full h-full object-cover scale-105 pointer-events-none"
          src="/videos/hero-product.mp4"
        />

        {/* Cinematic Multi-Layer Dark Gradient Overlay for Maximum Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-cream/90 text-xs font-semibold tracking-[0.25em] uppercase mb-6 backdrop-blur-md shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-rust animate-pulse" />
              Family-Run Knitwear Since 2018
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[6rem] text-white font-bold leading-[1.02] tracking-tight drop-shadow-md"
            >
              Where Comfort
              <br />
              <span className="text-rust-light italic">Meets Fashion</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 text-cream/80 text-base sm:text-xl max-w-2xl leading-relaxed drop-shadow-sm font-light"
            >
              Premium handcrafted knitwear crafted with care. Natural fibres, timeless silhouettes,
              and the enduring warmth of family craftsmanship.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-10 flex flex-wrap items-center gap-4 sm:gap-5"
            >
              <Link
                href="/men"
                className="inline-flex items-center gap-2.5 bg-rust text-white px-9 py-4 text-xs sm:text-sm font-bold tracking-widest uppercase rounded-full hover:bg-rust-dark transition-all duration-300 shadow-xl shadow-rust/35 hover:shadow-2xl hover:shadow-rust/50 hover:-translate-y-0.5"
              >
                Shop Men&apos;s
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href="/women"
                className="inline-flex items-center gap-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/30 px-9 py-4 text-xs sm:text-sm font-bold tracking-widest uppercase rounded-full transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5 shadow-lg"
              >
                Shop Women&apos;s
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white px-4 py-4 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors"
              >
                Our Story →
              </Link>
            </motion.div>

            {/* Trust stats pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-14 pt-8 border-t border-white/15 flex flex-wrap items-center gap-6 sm:gap-12 text-cream/80"
            >
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-bold text-white">100%</p>
                <p className="text-[11px] tracking-wider uppercase text-cream/60">Natural Fibres</p>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-bold text-white">2018</p>
                <p className="text-[11px] tracking-wider uppercase text-cream/60">Family Heritage</p>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-bold text-white">Pan-India</p>
                <p className="text-[11px] tracking-wider uppercase text-cream/60">Free Shipping</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Shop by Category (Animated Slideshows) ──── */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-rust text-xs font-semibold tracking-[0.25em] uppercase mb-3">Browse Our</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-charcoal font-bold">Collections</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          <ScrollReveal delay={0.1}>
            <CollectionCardSlideshow
              title="Men's Collection"
              desc="Refined knitwear, utility cargos, and heavyweight hoodies tailored for the modern man."
              href="/men"
              images={menSlides}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <CollectionCardSlideshow
              title="Women's Collection"
              desc="Artistic graphic tees, drop-shoulder fleece hoodies, and effortless daily essentials."
              href="/women"
              images={womenSlides}
            />
          </ScrollReveal>
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
              <div className="relative rounded-3xl overflow-hidden aspect-square shadow-xl bg-cream-dark">
                <img
                  src="/products/acid-wash-boys-washing/02.jpg"
                  alt="NorthBrook craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <p className="text-rust text-xs font-semibold tracking-[0.25em] uppercase mb-4">Our Story</p>
              <h2 className="font-heading text-4xl sm:text-5xl text-charcoal font-bold mb-6 leading-tight">
                Where Comfort
                <br />
                Meets Fashion
              </h2>
              <p className="text-charcoal/70 leading-relaxed mb-5 text-base sm:text-lg">
                NorthBrook was born from a simple belief: that knitwear should feel as good as it looks.
                As a family-run brand, we pour care into every stitch, choosing only the finest natural
                fibres sourced from trusted suppliers.
              </p>
              <p className="text-charcoal/70 leading-relaxed mb-8 text-base">
                Our designs draw from the landscapes and traditions that raised us — understated, warm,
                and built to last. Each piece is a testament to craftsmanship, designed to be worn
                and treasured for years to come.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-charcoal text-sm font-semibold tracking-widest uppercase border-b-2 border-charcoal pb-1 hover:text-rust hover:border-rust transition-colors"
              >
                Read Our Full Story
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
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
            <p className="text-cream/50 mb-8 max-w-lg mx-auto text-sm sm:text-base">
              Exclusive offers, early access to new collections, and a 10% welcome discount on your first order.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3.5 bg-white/10 border border-white/10 text-white placeholder:text-white/30 text-sm rounded-full focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust transition"
              />
              <button
                type="submit"
                className="px-7 py-3.5 bg-rust text-white text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-rust-dark transition-colors shadow-lg shadow-rust/30"
              >
                Subscribe
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
