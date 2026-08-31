"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const values = [
  {
    title: "Quality Materials",
    description:
      "We source only the finest natural fibres — merino wool, cashmere, alpaca, and organic cotton — from ethical suppliers we trust.",
    icon: "◎",
  },
  {
    title: "Family Craftsmanship",
    description:
      "Every piece is designed by our family team and produced with meticulous attention to detail. No shortcuts, no compromises.",
    icon: "◈",
  },
  {
    title: "Sustainable Practice",
    description:
      "We produce in small batches to minimise waste and use biodegradable packaging. Good for you, kinder to the planet.",
    icon: "◇",
  },
  {
    title: "Timeless Design",
    description:
      "We create pieces that outlast trends — knitwear you'll reach for season after season, year after year.",
    icon: "◆",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-earth-brown text-sm tracking-[0.3em] uppercase mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading text-5xl md:text-6xl lg:text-7xl text-charcoal font-bold mb-6"
          >
            Built by Family,
            <br />
            <span className="text-rust">Worn with Pride</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-charcoal-light text-lg max-w-2xl mx-auto"
          >
            NorthBrook is more than a brand — it&apos;s a family tradition of
            quality knitwear, rooted in craft and built to last.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-cream">
                <img
                  src="/workshop.svg"
                  alt="NorthBrook Family Workshop"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="space-y-6">
                <h2 className="font-heading text-4xl text-charcoal font-bold">
                  The Beginning
                </h2>
                <p className="text-charcoal-light leading-relaxed">
                  NorthBrook started at a kitchen table in 2018, when our family
                  decided to turn a lifelong passion for knitting into something
                  bigger. What began as handcrafted gifts for friends quickly
                  became a calling — to create knitwear that feels as good as it
                  looks.
                </p>
                <p className="text-charcoal-light leading-relaxed">
                  We named the brand after the valley where our family first
                  settled — a place of quiet beauty, rolling hills, and the kind
                  of warmth that stays with you. That spirit lives in every
                  piece we make.
                </p>
                <p className="text-charcoal-light leading-relaxed">
                  Today, NorthBrook remains what it always was: a family
                  operation. We design together, we source materials we believe
                  in, and we produce in small batches — ensuring every garment
                  meets the standard we set for ourselves and our customers.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-earth-brown text-sm tracking-[0.2em] uppercase mb-3">
                What We Stand For
              </p>
              <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-bold">
                Our Values
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <div className="bg-offwhite p-8 rounded-sm border border-warmbeige hover:shadow-md transition-shadow duration-300">
                  <span className="text-rust text-3xl block mb-4">
                    {value.icon}
                  </span>
                  <h3 className="font-heading text-lg text-charcoal font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-charcoal-light text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <blockquote className="font-heading text-3xl md:text-4xl text-charcoal font-bold leading-relaxed italic">
              &ldquo;We believe that true luxury isn&apos;t about price tags or
              logos — it&apos;s about the feeling of slipping into something
              made with genuine care.&rdquo;
            </blockquote>
            <div className="mt-8 flex flex-col items-center">
              <div className="w-16 h-px bg-rust mb-4" />
              <p className="text-charcoal text-sm tracking-widest uppercase">
                The NorthBrook Family
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
