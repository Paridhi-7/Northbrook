"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const values = [
  {
    title: "Quality Materials",
    desc: "We source only the finest natural fibres — merino wool, cashmere, alpaca, and organic cotton — from ethical suppliers we trust.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    title: "Family Craftsmanship",
    desc: "Every piece is designed by our family team and produced with meticulous attention to detail. No shortcuts, no compromises.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: "Sustainable Practice",
    desc: "Small-batch production to minimise waste, biodegradable packaging, and a commitment to ethical sourcing.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

const gallery = [
  "/products/cord-sets/01.jpg",
  "/products/butterfly/01.jpg",
  "/products/day-dream-hoodie/01.jpg",
  "/products/racing-hoodie/01.jpg",
  "/products/cargo-girls/01.jpg",
  "/products/game-over-hoodie-girls/01.jpg",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 px-5 sm:px-8 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-rust text-xs font-semibold tracking-[0.3em] uppercase mb-4">Our Story</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="font-heading text-5xl sm:text-6xl lg:text-7xl text-charcoal font-bold mb-6">
            Built by Family,<br /><span className="text-rust">Worn with Pride</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-charcoal/60 text-lg max-w-2xl mx-auto">
            NorthBrook is more than a brand — it&apos;s a family tradition of quality knitwear, rooted in craft and built to last.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal direction="left">
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img src="/products/magknit-wording/01.jpg" alt="Workshop" className="w-full h-full object-cover" />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="space-y-5">
              <h2 className="font-heading text-4xl text-charcoal font-bold">The Beginning</h2>
              <p className="text-charcoal/60 leading-relaxed">NorthBrook started at a kitchen table in 2018, when our family decided to turn a lifelong passion for knitting into something bigger. What began as handcrafted gifts for friends quickly became a calling — to create knitwear that feels as good as it looks.</p>
              <p className="text-charcoal/60 leading-relaxed">We named the brand after the valley where our family first settled — a place of quiet beauty, rolling hills, and the kind of warmth that stays with you. That spirit lives in every piece we make.</p>
              <p className="text-charcoal/60 leading-relaxed">Today, NorthBrook remains what it always was: a family operation. We design together, we source materials we believe in, and we produce in small batches — ensuring every garment meets the standard we set for ourselves.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-rust text-xs font-semibold tracking-[0.25em] uppercase mb-3">What We Stand For</p>
              <h2 className="font-heading text-4xl sm:text-5xl text-charcoal font-bold">Our Values</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.12}>
                <div className="bg-cream rounded-2xl p-8 sm:p-10 hover:shadow-xl hover:shadow-charcoal/5 transition-all duration-500 hover:-translate-y-1 group">
                  <div className="w-14 h-14 bg-rust/10 rounded-xl flex items-center justify-center text-rust mb-6 group-hover:bg-rust group-hover:text-white transition-colors duration-500">
                    {v.icon}
                  </div>
                  <h3 className="font-heading text-xl text-charcoal font-bold mb-3">{v.title}</h3>
                  <p className="text-charcoal/55 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-rust text-xs font-semibold tracking-[0.25em] uppercase mb-3">Behind the Scenes</p>
              <h2 className="font-heading text-4xl sm:text-5xl text-charcoal font-bold">Our World</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {gallery.map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="rounded-xl overflow-hidden aspect-[4/5] group">
                  <img src={img} alt="NorthBrook" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-10 bg-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <blockquote className="font-heading text-3xl sm:text-4xl text-white font-bold leading-relaxed italic">
              &ldquo;True luxury isn&apos;t about price tags — it&apos;s about the feeling of slipping into something made with genuine care.&rdquo;
            </blockquote>
            <div className="mt-8 flex flex-col items-center">
              <div className="w-12 h-px bg-rust mb-4" />
              <p className="text-cream/60 text-sm tracking-[0.15em] uppercase font-medium">The NorthBrook Family</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
