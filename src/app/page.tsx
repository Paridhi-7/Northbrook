"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";
import { getBestSellers, getProductsByCategory } from "@/data/products";

const collections = [
  {
    title: "Men's Collection",
    description: "Refined knitwear for the modern man. Timeless pieces crafted from premium natural fibres.",
    href: "/men",
    image: "/collections/mens-collection.jpg",
  },
  {
    title: "Women's Collection",
    description: "Elegant, comfortable knitwear that transitions effortlessly from day to night.",
    href: "/women",
    image: "/collections/womens-collection.jpg",
  },
];

export default function HomePage() {
  const bestSellers = getBestSellers();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-cream">
        {/* Background placeholder */}
        <div className="absolute inset-0 placeholder-img opacity-30 text-lg">
          <span>Hero Image — NorthBrook Knitwear</span>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-offwhite/80" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-warmbeige-dark text-sm tracking-[0.3em] uppercase mb-4"
          >
            Family-Run Knitwear Since 2018
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-charcoal font-bold leading-tight"
          >
            Where Comfort
            <br />
            <span className="text-rust">Meets Fashion</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-charcoal-light text-lg max-w-xl mx-auto"
          >
            Premium knitwear crafted with care. Natural fibres, timeless design,
            and the warmth of family tradition.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/men"
              className="inline-block bg-charcoal text-offwhite px-8 py-4 text-sm tracking-widest uppercase hover:bg-rust transition-colors duration-300"
            >
              Shop Men
            </Link>
            <Link
              href="/women"
              className="inline-block border-2 border-charcoal text-charcoal px-8 py-4 text-sm tracking-widest uppercase hover:bg-charcoal hover:text-offwhite transition-all duration-300"
            >
              Shop Women
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-charcoal/40 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-3 bg-charcoal/40 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Browse Our Selections */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-earth-brown text-sm tracking-[0.2em] uppercase mb-3">
              Browse Our
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-bold">
              Collections
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection, index) => (
            <ScrollReveal key={collection.href} delay={index * 0.15}>
              <Link href={collection.href} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-cream">
                  <div className="placeholder-img absolute inset-0 text-sm">
                    <span>{collection.title}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent group-hover:from-charcoal/80 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="font-heading text-2xl md:text-3xl text-offwhite font-bold mb-2">
                      {collection.title}
                    </h3>
                    <p className="text-warmbeige text-sm mb-4 max-w-sm">
                      {collection.description}
                    </p>
                    <span className="inline-block text-offwhite text-xs tracking-widest uppercase border-b border-offwhite pb-1 group-hover:text-rust group-hover:border-rust transition-colors duration-300">
                      Explore Collection →
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Best Selling */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-earth-brown text-sm tracking-[0.2em] uppercase mb-3">
                Most Loved
              </p>
              <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-bold">
                Best Sellers
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {bestSellers.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 0.1}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  badge={product.badge}
                  colors={product.colors}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Teaser */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative aspect-square bg-cream rounded-sm overflow-hidden">
                <div className="placeholder-img absolute inset-0 text-sm">
                  <span>NorthBrook Workshop</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <p className="text-earth-brown text-sm tracking-[0.2em] uppercase mb-3">
                  Our Story
                </p>
                <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-bold mb-6">
                  Where Comfort
                  <br />
                  Meets Fashion
                </h2>
                <p className="text-charcoal-light leading-relaxed mb-6">
                  NorthBrook was born from a simple belief: that knitwear should
                  feel as good as it looks. As a family-run brand, we pour care
                  into every stitch, choosing only the finest natural fibres
                  sourced from trusted suppliers.
                </p>
                <p className="text-charcoal-light leading-relaxed mb-8">
                  Our designs draw from the landscapes and traditions that raised
                  us — understated, warm, and built to last. Each piece is a
                  testament to craftsmanship, designed to be worn and treasured
                  for years to come.
                </p>
                <Link
                  href="/about"
                  className="inline-block text-charcoal text-xs tracking-widest uppercase border-b-2 border-charcoal pb-1 hover:text-rust hover:border-rust transition-colors duration-300"
                >
                  Read Our Full Story →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Newsletter Strip */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-charcoal">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl text-offwhite font-bold mb-4">
              Join the NorthBrook Family
            </h2>
            <p className="text-warmbeige-dark mb-8 max-w-lg mx-auto">
              Sign up for exclusive offers, early access to new collections, and
              a 10% welcome discount on your first order.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-charcoal-light/50 border border-charcoal-light text-offwhite placeholder:text-warmbeige-dark text-sm focus:outline-none focus:border-rust transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-rust text-offwhite text-sm tracking-widest uppercase hover:bg-rust-dark transition-colors duration-300"
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
