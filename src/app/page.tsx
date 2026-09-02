"use client";

import { motion } from "framer-motion";
import { useState } from "react";
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
  "/products/game-over-hoodie-girls/02.jpg",
];

export default function HomePage() {
  const bestSellers = getBestSellers();
  const [email, setEmail] = useState("");
  const [subState, setSubState] = useState<"idle" | "loading" | "success">("idle");
  const [emailError, setEmailError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    setSubState("loading");
    // Simulate a short API call
    await new Promise((r) => setTimeout(r, 700));
    setSubState("success");
    setEmail("");
  };

  return (
    <>
      {/* ── Full-Bleed Hero Background Video ────────── */}
      <section className="relative min-h-[100svh] flex items-center justify-center sm:justify-start overflow-hidden bg-charcoal">
        {/* Full-width Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/products/acid-wash-boys-washing/02.jpg"
          className="absolute inset-0 w-full h-full object-cover scale-105 pointer-events-none"
          src="/videos/hero-bg.mp4"
        />

        {/* Multi-Layer Dark Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/95 via-black/75 to-black/45 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/65 pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full pt-28 sm:pt-36 pb-16">
          <div className="max-w-3xl text-center sm:text-left mx-auto sm:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-cream text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-6 backdrop-blur-md shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-rust animate-pulse" />
              Established 2025 • Pure Natural Knitwear
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white font-bold leading-[1.08] tracking-tight drop-shadow-md"
            >
              Where Comfort
              <br />
              <span className="text-rust-light italic">Meets Fashion</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-5 sm:mt-6 text-cream/85 text-sm sm:text-lg md:text-xl max-w-2xl leading-relaxed drop-shadow-sm font-light mx-auto sm:mx-0"
            >
              Handcrafted knitwear designed with intention. 100% natural combed cotton, tailored drop-shoulder cuts, and everyday luxury.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 max-w-sm sm:max-w-none mx-auto sm:mx-0"
            >
              <Link
                href="/men"
                className="inline-flex items-center justify-center gap-2.5 bg-rust text-white px-8 py-4 text-xs sm:text-sm font-bold tracking-widest uppercase rounded-full hover:bg-rust-dark transition-all duration-300 shadow-xl shadow-rust/35 hover:-translate-y-0.5"
              >
                Shop Men&apos;s
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href="/women"
                className="inline-flex items-center justify-center gap-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/30 px-8 py-4 text-xs sm:text-sm font-bold tracking-widest uppercase rounded-full transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5 shadow-lg"
              >
                Shop Women&apos;s
              </Link>
            </motion.div>

            {/* Trust stats pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-white/15 grid grid-cols-3 gap-2 sm:gap-8 text-cream/80"
            >
              <div>
                <p className="font-heading text-xl sm:text-3xl font-bold text-white">100%</p>
                <p className="text-[9px] sm:text-[11px] tracking-wider uppercase text-cream/60 mt-0.5">Natural Fibres</p>
              </div>
              <div className="border-x border-white/15 px-2 sm:px-4">
                <p className="font-heading text-xl sm:text-3xl font-bold text-white">2025</p>
                <p className="text-[9px] sm:text-[11px] tracking-wider uppercase text-cream/60 mt-0.5">Est. Brand</p>
              </div>
              <div>
                <p className="font-heading text-xl sm:text-3xl font-bold text-white">Pan-India</p>
                <p className="text-[9px] sm:text-[11px] tracking-wider uppercase text-cream/60 mt-0.5">Free Shipping</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Shop by Category (Animated Slideshows) ──── */}
      <section className="py-16 sm:py-28 px-5 sm:px-8 lg:px-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-rust text-xs font-bold tracking-[0.25em] uppercase mb-2">Browse Our</p>
            <h2 className="font-heading text-3xl sm:text-5xl text-charcoal font-bold">Collections</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          <ScrollReveal delay={0.1}>
            <CollectionCardSlideshow
              title="Men's Collection"
              desc="Refined knitwear, utility bottoms, and heavyweight fleece hoodies tailored for the modern man."
              href="/men"
              images={menSlides}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <CollectionCardSlideshow
              title="Women's Collection"
              desc="Artistic graphic tees, drop-shoulder fleece hoodies, and effortless daily luxury pieces."
              href="/women"
              images={womenSlides}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Best Sellers ──────────────────────────────── */}
      <section className="py-16 sm:py-28 px-5 sm:px-8 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-rust text-xs font-bold tracking-[0.25em] uppercase mb-2">Most Loved</p>
              <h2 className="font-heading text-3xl sm:text-5xl text-charcoal font-bold">Best Sellers</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {bestSellers.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.05}>
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

      {/* ── Brand Story Section ──────────────────────── */}
      <section className="py-16 sm:py-28 px-5 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-square shadow-xl bg-cream-dark">
                <img
                  src="/products/acid-wash-boys-washing/02.jpg"
                  alt="NorthBrook craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <p className="text-rust text-xs font-bold tracking-[0.25em] uppercase mb-3">Our Story</p>
              <h2 className="font-heading text-3xl sm:text-5xl text-charcoal font-bold mb-5 leading-tight">
                Where Comfort
                <br />
                Meets Fashion
              </h2>
              <p className="text-charcoal/75 leading-relaxed mb-4 text-sm sm:text-base">
                NorthBrook was established in 2025 from a singular purpose: to craft knitwear that feels as exceptional as it looks. As a dedicated family-run label, we pour care into every stitch, choosing only premium combed natural cotton.
              </p>
              <p className="text-charcoal/70 leading-relaxed mb-6 text-sm sm:text-base">
                We believe in enduring quality over fast-fashion hype. Every garment is carefully engineered for the perfect relaxed drape, ready to be worn and loved through seasons.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-charcoal text-xs sm:text-sm font-bold tracking-widest uppercase border-b-2 border-charcoal pb-1 hover:text-rust hover:border-rust transition-colors"
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
      <section className="py-16 sm:py-24 px-5 sm:px-8 lg:px-10 bg-charcoal">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-heading text-2xl sm:text-4xl text-white font-bold mb-3">Join the NorthBrook Family</h2>
            <p className="text-cream/60 mb-8 max-w-lg mx-auto text-xs sm:text-base">
              Exclusive updates, early access to new seasonal drops, and a 10% welcome discount on your first order.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                id="newsletter-email-input"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                placeholder="Your email address"
                disabled={subState === "success"}
                className={`flex-1 px-5 py-3.5 bg-white/10 border text-white placeholder:text-white/40 text-sm rounded-full focus:outline-none transition ${
                  emailError ? "border-red-400" : "border-white/15 focus:border-rust focus:ring-1 focus:ring-rust"
                } disabled:opacity-50`}
              />
              <motion.button
                id="newsletter-subscribe-btn"
                type="submit"
                whileTap={{ scale: 0.96 }}
                disabled={subState !== "idle"}
                className={`px-7 py-3.5 text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-500 shadow-lg flex items-center justify-center gap-2 min-w-[130px] ${
                  subState === "success"
                    ? "bg-emerald-500 text-white shadow-emerald-500/30"
                    : subState === "loading"
                    ? "bg-rust/70 text-white cursor-not-allowed"
                    : "bg-rust text-white hover:bg-rust-dark shadow-rust/30"
                }`}
              >
                {subState === "loading" ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Subscribing…
                  </>
                ) : subState === "success" ? (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Subscribed!
                  </motion.span>
                ) : "Subscribe"}
              </motion.button>
            </form>
            {emailError && (
              <p className="text-red-400 text-xs mt-3 font-medium">{emailError}</p>
            )}
            {subState === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-emerald-400 text-xs mt-3 font-semibold"
              >
                🎉 You&apos;re in! Check your inbox for your 10% welcome discount.
              </motion.p>
            )}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
