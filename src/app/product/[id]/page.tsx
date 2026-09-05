'use client';

import { useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProductById, getAllProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ScrollReveal from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [activeImg, setActiveImg] = useState(0);
  const [selColor, setSelColor] = useState(product?.colors[0]?.name ?? "");
  const [selSize, setSelSize] = useState(product?.sizes[0] ?? "");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-5">
        <h1 className="font-heading text-3xl text-charcoal font-bold mb-4">Product Not Found</h1>
        <Link href="/" className="text-rust underline text-sm">Return to Home</Link>
      </div>
    );
  }

  const activeWish = isWishlisted(product.id);
  const related = getAllProducts()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

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

  return (
    <div className="pt-28 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-8">
        <nav className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-charcoal/40">
          <Link href="/" className="hover:text-rust transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${product.category === "unisex" ? "men" : product.category}`} className="hover:text-rust transition-colors capitalize">
            {product.category === "unisex" ? "Shop" : product.category}
          </Link>
          <span>/</span>
          <span className="text-charcoal/70">{product.name}</span>
        </nav>
      </div>

      <section className="pb-20 sm:pb-28 px-5 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
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

            <div className="mb-6">
              <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-3">
                Color - <span className="text-charcoal">{selColor}</span>
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

            <div className="mb-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-3">
                Size - <span className="text-charcoal">{selSize}</span>
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

            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAdd}
                className={`flex-1 py-4 text-sm font-semibold tracking-wider uppercase rounded-xl transition-all duration-300 shadow-lg ${
                  added
                    ? "bg-sage text-white shadow-sage/20"
                    : "bg-charcoal text-white shadow-charcoal/20 hover:bg-rust hover:shadow-rust/30"
                }`}
              >
                {added ? "✓ Added to Bag" : "Add to Bag"}
              </motion.button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-xl border transition-all shadow-sm ${
                  activeWish
                    ? "border-rust bg-rust/10 text-rust"
                    : "border-charcoal/20 hover:border-charcoal text-charcoal"
                }`}
                aria-label="Wishlist"
                title={activeWish ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <svg
                  className={`w-5 h-5 ${activeWish ? "fill-rust text-rust" : "fill-none text-charcoal"}`}
                  stroke="currentColor"
                  strokeWidth={1.75}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { icon: "🚚", label: "Free Shipping", sub: "Orders over ₹1999" },
                { icon: "🔄", label: "Easy Returns", sub: "30-day policy" },
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
    </div>
  );
}
