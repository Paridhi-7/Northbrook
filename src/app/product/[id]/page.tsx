"use client";

import { useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getProductById, getProductsByCategory, products, Review } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ScrollReveal from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);

  if (!product) return notFound();

  const categoryProducts = getProductsByCategory(product.category);
  const currentIndex = categoryProducts.findIndex((p) => p.id === product.id);
  const prevProduct = categoryProducts[(currentIndex - 1 + categoryProducts.length) % categoryProducts.length];
  const nextProduct = categoryProducts[(currentIndex + 1) % categoryProducts.length];

  const [activeImg, setActiveImg] = useState(0);
  const [selColor, setSelColor] = useState(product.colors[0]?.name ?? "");
  const [selSize, setSelSize] = useState(product.sizes[0] ?? "");
  const [activeTab, setActiveTab] = useState<"details" | "size" | "reviews">("details");
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [added, setAdded] = useState(false);
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews || []);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, title: "", comment: "" });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const { addItem } = useCart();

  const totalImages = product.images.length;

  const goToPrev = () => setActiveImg((i) => (i - 1 + totalImages) % totalImages);
  const goToNext = () => setActiveImg((i) => (i + 1) % totalImages);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) goToNext();
      else goToPrev();
    }
    setTouchStartX(null);
  };

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

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    const addedReview: Review = {
      id: "r-" + Date.now(),
      name: newReview.name,
      rating: Number(newReview.rating),
      date: "Today",
      verified: true,
      title: newReview.title || "Great product",
      comment: newReview.comment,
      helpful: 0,
    };
    setReviewsList([addedReview, ...reviewsList]);
    setNewReview({ name: "", rating: 5, title: "", comment: "" });
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  // Related products (same category, excluding current)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      {/* Breadcrumb & Next/Prev Header Bar */}
      <div className="pt-28 pb-4 px-5 sm:px-8 lg:px-10 max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal/5">
        <nav className="flex items-center gap-2 text-xs text-charcoal/50">
          <Link href="/" className="hover:text-rust transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${product.category === "unisex" ? "men" : product.category}`} className="hover:text-rust transition-colors capitalize">
            {product.category === "unisex" ? "Shop" : product.category}
          </Link>
          <span>/</span>
          <span className="text-charcoal/80 font-medium">{product.name}</span>
        </nav>

        {/* Previous / Next Product Navigation */}
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-charcoal">
          {prevProduct && (
            <Link
              href={`/product/${prevProduct.id}`}
              className="flex items-center gap-1.5 hover:text-rust transition-colors py-1 px-2.5 rounded-lg hover:bg-cream/60 group"
              title={prevProduct.name}
            >
              <span className="text-rust group-hover:-translate-x-0.5 transition-transform">←</span>
              <span className="hidden md:inline text-charcoal/60 font-medium">Prev:</span>
              <span className="max-w-[120px] truncate">{prevProduct.name}</span>
            </Link>
          )}
          <span className="text-charcoal/20">|</span>
          {nextProduct && (
            <Link
              href={`/product/${nextProduct.id}`}
              className="flex items-center gap-1.5 hover:text-rust transition-colors py-1 px-2.5 rounded-lg hover:bg-cream/60 group"
              title={nextProduct.name}
            >
              <span className="hidden md:inline text-charcoal/60 font-medium">Next:</span>
              <span className="max-w-[120px] truncate">{nextProduct.name}</span>
              <span className="text-rust group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          )}
        </div>
      </div>

      {/* Main Product Section */}
      <section className="py-8 sm:py-14 px-5 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Gallery Column */}
          <div className="lg:col-span-7">
            {/* Main image with arrow nav + swipe support */}
            <div className="relative">
              <motion.div
                key={activeImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-cream-dark mb-4 shadow-lg border border-charcoal/5"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={product.images[activeImg] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover pointer-events-none"
                />
                {product.badge && (
                  <span className={`absolute top-5 left-5 px-3.5 py-1.5 text-[10px] font-bold tracking-widest uppercase ${product.badge === "Sale" ? "bg-rust text-white" : product.badge === "New" ? "bg-charcoal text-white" : "bg-charcoal/90 text-white"} rounded-full shadow-md z-10`}>
                    {product.badge}
                  </span>
                )}
                {/* Image counter */}
                <div className="absolute bottom-4 right-5 bg-black/40 backdrop-blur-sm text-white/80 text-[11px] font-bold px-3 py-1 rounded-full">
                  {activeImg + 1} / {totalImages}
                </div>
              </motion.div>

              {/* Left Arrow */}
              {totalImages > 1 && (
                <button
                  onClick={goToPrev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white backdrop-blur-sm shadow-lg border border-charcoal/10 flex items-center justify-center text-charcoal hover:text-rust transition-all duration-200 group z-10"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
              )}

              {/* Right Arrow */}
              {totalImages > 1 && (
                <button
                  onClick={goToNext}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white backdrop-blur-sm shadow-lg border border-charcoal/10 flex items-center justify-center text-charcoal hover:text-rust transition-all duration-200 group z-10"
                >
                  <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              )}
            </div>

            {/* Thumbnails row */}
            <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 w-20 h-24 sm:w-24 sm:h-30 rounded-xl overflow-hidden border-2 transition-all shadow-sm ${
                    activeImg === i ? "border-rust ring-2 ring-rust/30 scale-102" : "border-transparent opacity-75 hover:opacity-100 hover:border-charcoal/20"
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Buying Info Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-amber-500 text-sm">
                {"★".repeat(5)}
              </div>
              <span className="text-xs text-charcoal/60 font-medium">4.9 ({reviewsList.length + 35} reviews)</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-3xl sm:text-4xl text-charcoal font-bold mb-3 leading-tight"
            >
              {product.name}
            </motion.h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex items-center gap-3 mb-6">
              <span className="text-charcoal font-bold text-3xl">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-charcoal/40 text-xl line-through">₹{product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="bg-rust/10 text-rust text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Save ₹{product.originalPrice - product.price}
                </span>
              )}
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="text-charcoal/70 leading-relaxed mb-6 text-sm sm:text-base">
              {product.description}
            </motion.p>

            {/* Color Selector */}
            <div className="mb-6">
              <p className="text-xs font-bold tracking-widest uppercase text-charcoal/60 mb-3">
                Color: <span className="text-charcoal font-semibold">{selColor}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelColor(c.name)}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${
                      selColor === c.name
                        ? "border-charcoal ring-2 ring-charcoal ring-offset-2 ring-offset-cream scale-105"
                        : "border-charcoal/10 hover:border-charcoal/40"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector + Size Guide Button */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold tracking-widest uppercase text-charcoal/60">
                  Size: <span className="text-charcoal font-semibold">{selSize}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setShowSizeModal(true)}
                  className="text-xs font-semibold text-rust hover:text-rust-dark underline underline-offset-4 flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                  Size Chart
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelSize(s)}
                    className={`px-5 py-3 text-xs font-bold tracking-wider rounded-xl border transition-all ${
                      selSize === s
                        ? "bg-charcoal text-white border-charcoal shadow-md scale-102"
                        : "bg-white text-charcoal border-charcoal/20 hover:border-charcoal"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleAdd}
              className={`w-full py-4 text-sm font-bold tracking-widest uppercase rounded-2xl transition-all duration-300 shadow-xl ${
                added
                  ? "bg-emerald-600 text-white shadow-emerald-600/30"
                  : "bg-charcoal text-white shadow-charcoal/25 hover:bg-rust hover:shadow-rust/35 hover:-translate-y-0.5"
              }`}
            >
              {added ? "✓ Added to Bag" : "Add to Bag — ₹" + product.price}
            </motion.button>

            {/* Trust Signals */}
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              <div className="bg-white rounded-2xl p-3.5 border border-charcoal/5 shadow-sm">
                <span className="text-xl">🚚</span>
                <p className="text-[11px] font-bold text-charcoal mt-1">Free Delivery</p>
                <p className="text-[10px] text-charcoal/50">Orders over ₹999</p>
              </div>
              <div className="bg-white rounded-2xl p-3.5 border border-charcoal/5 shadow-sm">
                <span className="text-xl">↩️</span>
                <p className="text-[11px] font-bold text-charcoal mt-1">Easy Returns</p>
                <p className="text-[10px] text-charcoal/50">30-day exchange</p>
              </div>
              <div className="bg-white rounded-2xl p-3.5 border border-charcoal/5 shadow-sm">
                <span className="text-xl">🧵</span>
                <p className="text-[11px] font-bold text-charcoal mt-1">100% Pure</p>
                <p className="text-[10px] text-charcoal/50">Natural fibres</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Tabs: Details / Size Chart / Reviews ── */}
      <section className="py-16 sm:py-20 px-5 sm:px-8 lg:px-10 bg-white border-t border-charcoal/5">
        <div className="max-w-5xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex justify-center border-b border-charcoal/10 gap-4 sm:gap-12 mb-12">
            {[
              { id: "details", label: "Fabric & Details" },
              { id: "size", label: "Size & Measurements" },
              { id: "reviews", label: `Customer Reviews (${reviewsList.length + 35})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 text-sm sm:text-base font-bold tracking-wider uppercase transition-all relative ${
                  activeTab === tab.id
                    ? "text-charcoal"
                    : "text-charcoal/40 hover:text-charcoal/70"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="activeProductTab" className="absolute bottom-0 left-0 right-0 h-1 bg-rust rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab 1: Fabric, Fit & Care Details */}
          {activeTab === "details" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-cream rounded-2xl p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-rust/10 text-rust flex items-center justify-center font-bold text-sm">🧶</span>
                    <h3 className="font-heading text-lg text-charcoal font-bold">Fabric & Material</h3>
                  </div>
                  <p className="text-charcoal/70 text-sm leading-relaxed">{product.fabric}</p>
                  <p className="text-xs text-charcoal/50">Custom spun yarn with breathable weave for optimum all-season thermal regulation.</p>
                </div>

                <div className="bg-cream rounded-2xl p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-rust/10 text-rust flex items-center justify-center font-bold text-sm">📐</span>
                    <h3 className="font-heading text-lg text-charcoal font-bold">Fit & Silhouette</h3>
                  </div>
                  <p className="text-charcoal/70 text-sm leading-relaxed">{product.fit}</p>
                  <p className="text-xs text-charcoal/50">Designed to drape naturally over the shoulders without excess bulk.</p>
                </div>
              </div>

              <div className="bg-cream/70 rounded-2xl p-6 sm:p-8">
                <h3 className="font-heading text-lg text-charcoal font-bold mb-4 flex items-center gap-2">
                  <span>🧺</span> Care Instructions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-charcoal/75">
                  {product.care?.map((c, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="text-rust font-bold">•</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 2: Size & Measurements Chart */}
          {activeTab === "size" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-8">
              <div className="text-center max-w-xl mx-auto mb-6">
                <h3 className="font-heading text-2xl text-charcoal font-bold mb-2">Size Chart & Fit Guide</h3>
                <p className="text-charcoal/60 text-xs sm:text-sm">Measurements are in inches. For a relaxed look choose your usual size. For an oversized drape, consider sizing up.</p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-charcoal/10 shadow-sm">
                <table className="w-full text-left text-sm text-charcoal">
                  <thead className="bg-charcoal text-white text-xs font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Size</th>
                      <th className="px-6 py-4">Chest / Bust</th>
                      <th className="px-6 py-4">Length</th>
                      <th className="px-6 py-4">Shoulder</th>
                      <th className="px-6 py-4">Sleeve</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal/10 bg-white">
                    {product.sizeChart?.map((row) => (
                      <tr key={row.size} className={`hover:bg-cream/40 transition-colors ${selSize === row.size ? "bg-rust/5 font-semibold text-rust" : ""}`}>
                        <td className="px-6 py-4 font-bold">{row.size}</td>
                        <td className="px-6 py-4">{row.chest}</td>
                        <td className="px-6 py-4">{row.length}</td>
                        <td className="px-6 py-4">{row.shoulder}</td>
                        <td className="px-6 py-4">{row.sleeve}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-cream rounded-2xl p-6 text-xs text-charcoal/70 space-y-2">
                <p className="font-bold text-charcoal uppercase tracking-wider">How to Measure:</p>
                <p>• <strong>Chest:</strong> Measure across the fullest part of your chest, keeping the tape horizontal.</p>
                <p>• <strong>Length:</strong> Measure from the highest point of the shoulder down to the bottom hem.</p>
              </div>
            </motion.div>
          )}

          {/* Tab 3: Customer Reviews */}
          {activeTab === "reviews" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-12">
              {/* Rating Summary Card */}
              <div className="bg-cream rounded-3xl p-8 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-4 text-center md:border-r md:border-charcoal/10 md:pr-8">
                  <p className="font-heading text-6xl font-bold text-charcoal">4.9</p>
                  <div className="flex justify-center text-amber-500 text-lg my-2">★★★★★</div>
                  <p className="text-xs text-charcoal/60 uppercase tracking-widest font-semibold">Based on {reviewsList.length + 35} verified reviews</p>
                </div>

                <div className="md:col-span-8 space-y-2">
                  {[
                    { stars: "5 Star", pct: "88%" },
                    { stars: "4 Star", pct: "10%" },
                    { stars: "3 Star", pct: "2%" },
                    { stars: "2 Star", pct: "0%" },
                    { stars: "1 Star", pct: "0%" },
                  ].map((bar) => (
                    <div key={bar.stars} className="flex items-center gap-3 text-xs">
                      <span className="w-12 text-charcoal/70 font-medium">{bar.stars}</span>
                      <div className="flex-1 h-2.5 bg-charcoal/10 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: bar.pct }} />
                      </div>
                      <span className="w-8 text-charcoal/50 text-right">{bar.pct}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Write a Review Section */}
              <div className="bg-white rounded-2xl border border-charcoal/10 p-6 sm:p-8 shadow-sm">
                <h4 className="font-heading text-xl text-charcoal font-bold mb-4">Write a Customer Review</h4>
                {reviewSubmitted ? (
                  <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold text-center">
                    ✓ Thank you! Your review has been published.
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={newReview.name}
                          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                          className="w-full px-4 py-2.5 bg-cream/40 border border-charcoal/15 rounded-xl text-sm focus:outline-none focus:border-rust"
                          placeholder="e.g. Rahul Sharma"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1">Rating *</label>
                        <select
                          value={newReview.rating}
                          onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                          className="w-full px-4 py-2.5 bg-cream/40 border border-charcoal/15 rounded-xl text-sm focus:outline-none focus:border-rust"
                        >
                          <option value={5}>★★★★★ (5 Stars - Perfect)</option>
                          <option value={4}>★★★★☆ (4 Stars - Great)</option>
                          <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1">Review Headline</label>
                      <input
                        type="text"
                        value={newReview.title}
                        onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                        className="w-full px-4 py-2.5 bg-cream/40 border border-charcoal/15 rounded-xl text-sm focus:outline-none focus:border-rust"
                        placeholder="e.g. Best knitwear piece in my wardrobe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-1">Your Review *</label>
                      <textarea
                        required
                        rows={3}
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        className="w-full px-4 py-2.5 bg-cream/40 border border-charcoal/15 rounded-xl text-sm focus:outline-none focus:border-rust resize-none"
                        placeholder="Tell us about the fit, comfort, and material..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-charcoal hover:bg-rust text-white text-xs font-bold tracking-widest uppercase rounded-xl transition-colors shadow-md"
                    >
                      Submit Review
                    </button>
                  </form>
                )}
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {reviewsList.map((r) => (
                  <div key={r.id} className="bg-cream/40 rounded-2xl p-6 sm:p-8 border border-charcoal/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-charcoal text-white flex items-center justify-center font-heading font-bold text-sm">
                          {r.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-charcoal">{r.name}</span>
                            {r.verified && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                                ✓ Verified Buyer
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-charcoal/40">{r.date}</p>
                        </div>
                      </div>
                      <div className="text-amber-500 text-sm">{"★".repeat(r.rating)}</div>
                    </div>

                    <h5 className="font-bold text-sm text-charcoal">{r.title}</h5>
                    <p className="text-charcoal/70 text-sm leading-relaxed">{r.comment}</p>

                    <div className="pt-2 flex items-center gap-2 text-xs text-charcoal/40">
                      <span>Helpful review?</span>
                      <button
                        onClick={() => {
                          setReviewsList((prev) =>
                            prev.map((item) => (item.id === r.id ? { ...item, helpful: item.helpful + 1 } : item))
                          );
                        }}
                        className="hover:text-rust transition-colors font-medium"
                      >
                        👍 Yes ({r.helpful})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Next/Prev Large Card Navigation Banner */}
      <section className="py-12 px-5 sm:px-8 lg:px-10 bg-cream/40 border-t border-charcoal/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {prevProduct && (
            <Link
              href={`/product/${prevProduct.id}`}
              className="bg-white p-5 rounded-2xl border border-charcoal/10 flex items-center gap-4 hover:border-rust transition-all group shadow-sm hover:shadow-md"
            >
              <div className="w-14 h-18 rounded-xl overflow-hidden bg-cream flex-shrink-0">
                <img src={prevProduct.images[0]} alt={prevProduct.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold tracking-widest uppercase text-rust mb-0.5">← Previous Piece</p>
                <h4 className="font-heading font-bold text-sm text-charcoal truncate">{prevProduct.name}</h4>
                <p className="text-xs text-charcoal/50 font-medium">₹{prevProduct.price}</p>
              </div>
            </Link>
          )}

          {nextProduct && (
            <Link
              href={`/product/${nextProduct.id}`}
              className="bg-white p-5 rounded-2xl border border-charcoal/10 flex items-center justify-between sm:justify-end gap-4 hover:border-rust transition-all group shadow-sm hover:shadow-md sm:text-right"
            >
              <div className="min-w-0 order-2 sm:order-1">
                <p className="text-[10px] font-bold tracking-widest uppercase text-rust mb-0.5">Next Piece →</p>
                <h4 className="font-heading font-bold text-sm text-charcoal truncate">{nextProduct.name}</h4>
                <p className="text-xs text-charcoal/50 font-medium">₹{nextProduct.price}</p>
              </div>
              <div className="w-14 h-18 rounded-xl overflow-hidden bg-cream flex-shrink-0 order-1 sm:order-2">
                <img src={nextProduct.images[0]} alt={nextProduct.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Size Chart Modal */}
      <AnimatePresence>
        {showSizeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] flex items-center justify-center p-4"
            onClick={() => setShowSizeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-2xl text-charcoal font-bold">NorthBrook Size Chart</h3>
                <button
                  onClick={() => setShowSizeModal(false)}
                  className="w-9 h-9 rounded-full bg-cream flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-charcoal/10">
                <table className="w-full text-left text-xs sm:text-sm text-charcoal">
                  <thead className="bg-charcoal text-white font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">Size</th>
                      <th className="px-4 py-3">Chest / Waist</th>
                      <th className="px-4 py-3">Length</th>
                      <th className="px-4 py-3">Shoulder</th>
                      <th className="px-4 py-3">Sleeve</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal/10 bg-cream/30">
                    {product.sizeChart?.map((row) => (
                      <tr key={row.size} className={`hover:bg-cream ${selSize === row.size ? "bg-rust/10 font-bold text-rust" : ""}`}>
                        <td className="px-4 py-3 font-bold">{row.size}</td>
                        <td className="px-4 py-3">{row.chest}</td>
                        <td className="px-4 py-3">{row.length}</td>
                        <td className="px-4 py-3">{row.shoulder}</td>
                        <td className="px-4 py-3">{row.sleeve}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                onClick={() => setShowSizeModal(false)}
                className="w-full py-3.5 bg-charcoal text-white text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-rust transition-colors"
              >
                Close & Select Size {selSize}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-20 sm:py-24 px-5 sm:px-8 lg:px-10 bg-cream/30 border-t border-charcoal/5">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-rust text-xs font-bold tracking-[0.25em] uppercase mb-3">You May Also Like</p>
                <h2 className="font-heading text-3xl sm:text-4xl text-charcoal font-bold">Related Pieces</h2>
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
