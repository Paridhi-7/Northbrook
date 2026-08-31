"use client";

import { useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getProductById, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ScrollReveal from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);

  if (!product) return notFound();

  const [activeImg, setActiveImg] = useState(0);
  const [selColor, setSelColor] = useState(product.colors[0]?.name ?? "");
  const [selSize, setSelSize] = useState(product.sizes[0] ?? "");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selColor,
      size: selSize,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Related products (same category, excluding current)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 pb-4 px-5 sm:px-8 lg:px-10 max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-xs text-charcoal/40">
          <Link href="/" className="hover:text-rust transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${product.category === "unisex" ? "men" : product.category}`} className="hover:text-rust transition-colors capitalize">
            {product.category === "unisex" ? "Shop" : product.category}
          </Link>
          <span>/</span>
          <span className="text-charcoal/70">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="pb-20 sm:pb-28 px-5 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div>
            {/* Main image */}
            <motion.div
              key={activeImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-cream-dark mb-4"
            >
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className={`absolute top-4 left-4 px-3 py-1.5 text-[10px] font-semibold tracking-widest uppercase ${product.badge === "Sale" ? "bg-rust text-white" : product.badge === "New" ? "bg-charcoal text-white" : "bg-charcoal/80 text-white"} rounded-full shadow-sm`}>
                  {product.badge}
                </span>
              )}
            </motion.div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImg === i ? "border-rust shadow-md" : "border-transparent hover:border-charcoal/20"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-3xl sm:text-4xl text-charcoal font-bold mb-3"
            >
              {product.name}
            </motion.h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex items-center gap-3 mb-6">
              <span className="text-charcoal font-bold text-2xl">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-charcoal/35 text-lg line-through">₹{product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="bg-rust/10 text-rust text-xs font-semibold px-2.5 py-1 rounded-full">
                  Save ₹{product.originalPrice - product.price}
                </span>
              )}
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="text-charcoal/55 leading-relaxed mb-8">
              {product.description}
            </motion.p>

            {/* Color */}
            <div className="mb-6">
              <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-3">
                Color — <span className="text-charcoal">{selColor}</span>
              </p>
              <div className="flex gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelColor(c.name)}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${
                      selColor === c.name
                        ? "border-charcoal ring-2 ring-charcoal ring-offset-2 ring-offset-cream"
                        : "border-charcoal/10 hover:border-charcoal/30"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-3">
                Size — <span className="text-charcoal">{selSize}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelSize(s)}
                    className={`px-5 py-2.5 text-xs font-medium tracking-wider rounded-full border transition-all ${
                      selSize === s
                        ? "bg-charcoal text-white border-charcoal"
                        : "bg-transparent text-charcoal border-charcoal/20 hover:border-charcoal"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAdd}
              className={`w-full py-4 text-sm font-semibold tracking-wider uppercase rounded-xl transition-all duration-300 shadow-lg ${
                added
                  ? "bg-sage text-white shadow-sage/20"
                  : "bg-charcoal text-white shadow-charcoal/20 hover:bg-rust hover:shadow-rust/30"
              }`}
            >
              {added ? "✓ Added to Bag" : "Add to Bag"}
            </motion.button>

            {/* Trust signals */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { icon: "🚚", label: "Free Shipping", sub: "Orders over ₹999" },
                { icon: "↩️", label: "Easy Returns", sub: "30-day policy" },
                { icon: "🔒", label: "Secure Pay", sub: "100% protected" },
              ].map((t) => (
                <div key={t.label} className="bg-cream rounded-xl p-3">
                  <span className="text-xl">{t.icon}</span>
                  <p className="text-[10px] font-semibold text-charcoal mt-1">{t.label}</p>
                  <p className="text-[9px] text-charcoal/40">{t.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-20 sm:py-24 px-5 sm:px-8 lg:px-10 bg-white">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-rust text-xs font-semibold tracking-[0.25em] uppercase mb-3">You May Also Like</p>
                <h2 className="font-heading text-3xl sm:text-4xl text-charcoal font-bold">Related Products</h2>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-8">
              {related.map((p, i) => (
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
      )}
    </>
  );
}
