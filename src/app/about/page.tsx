"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const values = [
  {
    icon: "🧶",
    title: "100% Pure Natural Fibres",
    desc: "We exclusively spin bio-washed combed cotton, French Terry, and breathable natural fibres that breathe with your body, resisting artificial synthetics.",
  },
  {
    icon: "📐",
    title: "Sculpted Tailoring",
    desc: "Every cut is engineered for the perfect modern drape — relaxed drop shoulders, reinforced rib collars, and durable double-needle hemlines.",
  },
  {
    icon: "🏡",
    title: "Family Heritage",
    desc: "Every NorthBrook piece is designed, quality-tested, and packed with the pride and direct accountability of a dedicated family-run label.",
  },
  {
    icon: "⏳",
    title: "Built to Outlast Trends",
    desc: "We reject throwaway fast-fashion. Our pieces are crafted to retain their softness, shape, and richness through countless wash and wear cycles.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Editorial Hero Section ──────────────────────── */}
      <section className="relative min-h-[50vh] sm:min-h-[55vh] flex items-center justify-center overflow-hidden bg-charcoal pt-32 pb-16 sm:pb-20">
        <img
          src="/products/cord-sets/05.jpg"
          alt="NorthBrook Heritage"
          className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/90 to-charcoal" />
        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-cream/90 text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-5 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-rust animate-pulse" />
            Established 2025 • Our Story
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-5 leading-tight"
          >
            We Don&apos;t Just Make Knitwear.
            <br />
            <span className="text-rust-light italic">We Weave Character.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-cream/80 text-sm sm:text-lg font-light max-w-2xl mx-auto leading-relaxed"
          >
            A family-run studio dedicated to the quiet luxury of natural fibres, honest tailoring, and timeless everyday comfort.
          </motion.p>
        </div>
      </section>

      {/* ── Manifesto Pull Quote ─────────────────────────── */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 lg:px-10 bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-rust text-xs font-bold tracking-[0.3em] uppercase mb-4">Our Philosophy</p>
            <blockquote className="font-heading text-xl sm:text-3xl md:text-4xl text-charcoal font-semibold leading-relaxed tracking-tight">
              &ldquo;In a world of rushed fast-fashion, NorthBrook was founded on a slower, deeper conviction: that what touches your skin every day should be honest, beautiful, and made to outlive seasons.&rdquo;
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Our Story & Mission ─────────────────────────── */}
      <section className="py-16 sm:py-28 px-5 sm:px-8 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <ScrollReveal direction="left">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl bg-cream-dark">
              <img
                src="/products/acid-wash-boys-washing/02.jpg"
                alt="NorthBrook Crafting Process"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs font-bold tracking-widest uppercase text-rust-light mb-1">Handcrafted in Small Batches</p>
                <p className="font-heading text-lg sm:text-xl font-bold">Every piece inspected by our family</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="space-y-5 sm:space-y-6">
              <p className="text-rust text-xs font-bold tracking-[0.3em] uppercase">Who We Are</p>
              <h2 className="font-heading text-3xl sm:text-5xl text-charcoal font-bold leading-tight">
                Where Comfort
                <br />
                Meets True Fashion
              </h2>
              <p className="text-charcoal/75 leading-relaxed text-sm sm:text-base">
                At NorthBrook, we are more than just an apparel label — we are a close-knit collective of craftsmen, designers, and textile enthusiasts united by a single vision: to create garments that look exceptional and feel even better.
              </p>
              <p className="text-charcoal/70 leading-relaxed text-sm sm:text-base">
                Established in 2025, our family sought to solve a common frustration: modern streetwear was either cheaply made synthetic fast-fashion, or overpriced luxury. We chose the middle path — uncompromising high-GSM natural fabrics, ethical small-batch production, and accessible direct-to-consumer pricing.
              </p>
              <div className="pt-4 grid grid-cols-2 gap-4 sm:gap-6 border-t border-charcoal/10">
                <div className="bg-cream/60 p-4 rounded-2xl">
                  <p className="font-heading text-2xl sm:text-3xl font-bold text-rust">240+ GSM</p>
                  <p className="text-[10px] sm:text-xs text-charcoal/70 uppercase tracking-wider mt-1 font-semibold">Heavyweight Combed Cotton</p>
                </div>
                <div className="bg-cream/60 p-4 rounded-2xl">
                  <p className="font-heading text-2xl sm:text-3xl font-bold text-charcoal">100%</p>
                  <p className="text-[10px] sm:text-xs text-charcoal/70 uppercase tracking-wider mt-1 font-semibold">Pre-Shrunk Bio-Washed</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Full-Width Visual Break ─────────────────────── */}
      <section className="relative h-[40vh] sm:h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="/products/day-dream-hoodie/02.jpg"
          alt="NorthBrook Lifestyle"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/75 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center px-5 max-w-2xl mx-auto text-white">
          <ScrollReveal>
            <p className="text-rust-light text-xs font-bold tracking-[0.3em] uppercase mb-3">The Family Promise</p>
            <h3 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold mb-3 leading-tight">
              Honest Quality. No Shortcuts.
            </h3>
            <p className="text-cream/80 text-xs sm:text-base font-light">
              From the selection of raw combed yarn to the final steam pressing, our hands touch every stage of creation.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Our Values (4 Pillars) ──────────────────────── */}
      <section className="py-16 sm:py-28 px-5 sm:px-8 lg:px-10 bg-cream">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <p className="text-rust text-xs font-bold tracking-[0.3em] uppercase mb-2">The Pillars</p>
              <h2 className="font-heading text-3xl sm:text-5xl text-charcoal font-bold">What Guides Us</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.08}>
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-charcoal/5 border border-charcoal/5 h-full flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center text-2xl mb-5 shadow-inner">
                      {v.icon}
                    </div>
                    <h3 className="font-heading text-lg sm:text-xl text-charcoal font-bold mb-2">{v.title}</h3>
                    <p className="text-charcoal/65 text-xs sm:text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call to Action ──────────────────────────────── */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 lg:px-10 bg-charcoal text-white text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Experience the Touch of True Knitwear
            </h2>
            <p className="text-cream/70 text-xs sm:text-base max-w-xl mx-auto mb-8">
              Explore our latest Men&apos;s and Women&apos;s collections crafted for lifetime comfort.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto">
              <Link
                href="/men"
                className="bg-rust hover:bg-rust-dark text-white px-8 py-4 text-xs font-bold tracking-widest uppercase rounded-full transition-all shadow-xl shadow-rust/30 hover:scale-102"
              >
                Shop Men&apos;s →
              </Link>
              <Link
                href="/women"
                className="bg-white/15 hover:bg-white/25 text-white border border-white/20 px-8 py-4 text-xs font-bold tracking-widest uppercase rounded-full transition-all backdrop-blur-md"
              >
                Shop Women&apos;s →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
