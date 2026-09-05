'use client';

import { useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getProductById, getProductsByCategory, products, Review } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ScrollReveal from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-5 pt-28">
        <h1 className="font-heading text-3xl text-charcoal font-bold mb-4">Product Not Found</h1>
        <Link href="/" className="text-rust underline text-sm">Return to Home</Link>
      </div>
    );
  }

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
  const { isWishlisted, toggleWishlist } = useWishlist();

  const activeWish = isWishlisted(product.id);
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

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-24 bg-cream min-h-screen">
      {/* Breadcrumb & Top Next/Prev Navigation */}
      <div className="py-4 px-5 sm:px-8 lg:px-10 max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal/5">
        <nav className="flex items-center gap-2 text-xs text-charcoal/50">
          <Link href="/" className="hover:text-rust transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${product.category === "unisex" ? "men" : product.category}`} className="hover:text-rust transition-colors capitalize">
            {product.category === "unisex" ? "Shop" : product.category}
          </Link>
          <span>/</span>
          <span className="text-charcoal/80 font-medium">{product.name}</span>
        </nav>

        {/* Top Product Navigation */}
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
                  className="w-full h-full object-cover"
                />

                {product.badge && (
                  <span className={`absolute top-4 left-4 px-3.5 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-full shadow-md z-10 ${
                    product.badge === "Sale" ? "bg-rust text-white" : product.badge === "New" ? "bg-charcoal text-white" : "bg-charcoal/90 text-white"
                  }`}>
                    {product.badge}
                  </span>
                )}

                {/* Arrow Controls */}
                {totalImages > 1 && (
                  <>
                    <button
                      onClick={goToPrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-charcoal shadow-md hover:bg-white transition"
                    >
                      ‹
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-charcoal shadow-md hover:bg-white transition"
                    >
                      ›
                    </button>
                  </>
                )}
              </motion.div>

              {/* Thumbnail Strip */}
              {totalImages > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImg === i ? "border-rust shadow-md scale-105" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Details & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-rust text-xs font-bold tracking-[0.25em] uppercase mb-2">
                {product.category === "unisex" ? "Unisex Essential" : `${product.category} Knitwear`}
              </p>
              <h1 className="font-heading text-3xl sm:text-4xl text-charcoal font-bold mb-3 leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-bold text-charcoal">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-charcoal/40 line-through">₹{product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="bg-rust/10 text-rust text-xs font-bold px-2.5 py-1 rounded-full">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                )}
              </div>

              <p className="text-charcoal/70 text-sm leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-6">
                <p className="text-xs font-bold tracking-wider uppercase text-charcoal/60 mb-2.5">
                  Color Tone – <span className="text-charcoal">{selColor}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelColor(c.name)}
                      className={`w-9 h-9 rounded-full border-2 transition-all ${
                        selColor === c.name ? "border-charcoal ring-2 ring-charcoal ring-offset-2 ring-offset-cream" : "border-charcoal/10 hover:border-charcoal/30"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection & Size Chart Trigger */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-xs font-bold tracking-wider uppercase text-charcoal/60">
                    Select Size – <span className="text-charcoal">{selSize}</span>
                  </p>
                  <button
                    onClick={() => setShowSizeModal(true)}
                    className="text-xs font-bold text-rust hover:underline flex items-center gap-1"
                  >
                    <span>📏</span> Size Chart & Measurements
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelSize(s)}
                      className={`px-5 py-2.5 text-xs font-bold tracking-wider rounded-xl border transition-all ${
                        selSize === s
                          ? "bg-charcoal text-white border-charcoal shadow-md"
                          : "bg-transparent text-charcoal border-charcoal/15 hover:border-charcoal/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart & Wishlist Actions */}
              <div className="flex items-center gap-3 mb-8">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdd}
                  className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase rounded-xl transition-all duration-300 shadow-lg ${
                    added ? "bg-emerald-700 text-white shadow-emerald-700/20" : "bg-charcoal text-white hover:bg-rust shadow-charcoal/20"
                  }`}
                >
                  {added ? "✓ Added to Bag" : "Add to Bag"}
                </motion.button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 rounded-xl border transition-all shadow-sm ${
                    activeWish ? "border-rust bg-rust/10 text-rust" : "border-charcoal/20 hover:border-charcoal text-charcoal"
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

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-2xl border border-charcoal/5 text-center">
                <div>
                  <p className="text-base">🚚</p>
                  <p className="text-[11px] font-bold text-charcoal mt-1">Free Shipping</p>
                  <p className="text-[10px] text-charcoal/40">Orders over ₹1999</p>
                </div>
                <div>
                  <p className="text-base">🔄</p>
                  <p className="text-[11px] font-bold text-charcoal mt-1">30-Day Returns</p>
                  <p className="text-[10px] text-charcoal/40">Hassle-free exchange</p>
                </div>
                <div>
                  <p className="text-base">🔒</p>
                  <p className="text-[11px] font-bold text-charcoal mt-1">Secure Checkout</p>
                  <p className="text-[10px] text-charcoal/40">100% encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section: Product Details / Size Guide / Customer Reviews */}
      <section className="py-12 px-5 sm:px-8 lg:px-10 bg-white border-t border-charcoal/5">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex border-b border-charcoal/10 gap-8 mb-8">
            <button
              onClick={() => setActiveTab("details")}
              className={`pb-4 text-xs font-bold tracking-widest uppercase transition-colors relative ${
                activeTab === "details" ? "text-rust" : "text-charcoal/50 hover:text-charcoal"
              }`}
            >
              Fabric & Details
              {activeTab === "details" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rust rounded-full" />}
            </button>

            <button
              onClick={() => setActiveTab("size")}
              className={`pb-4 text-xs font-bold tracking-widest uppercase transition-colors relative ${
                activeTab === "size" ? "text-rust" : "text-charcoal/50 hover:text-charcoal"
              }`}
            >
              Size Guide & Fit
              {activeTab === "size" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rust rounded-full" />}
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 text-xs font-bold tracking-widest uppercase transition-colors relative ${
                activeTab === "reviews" ? "text-rust" : "text-charcoal/50 hover:text-charcoal"
              }`}
            >
              Customer Reviews ({reviewsList.length})
              {activeTab === "reviews" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rust rounded-full" />}
            </button>
          </div>

          {/* Tab 1: Fabric & Details (Product-Specific Specs) */}
          {activeTab === "details" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-3xl">
              <p className="text-charcoal/80 text-sm leading-relaxed">
                {product.description}
              </p>

              {product.specs && (
                <div className="bg-cream/40 rounded-2xl p-6 border border-charcoal/10">
                  <h4 className="font-heading text-base font-bold text-charcoal mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-rust rounded-full inline-block" />
                    Garment Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-8 text-xs sm:text-sm">
                    <div className="flex justify-between sm:justify-start sm:gap-4 py-1.5 border-b border-charcoal/5">
                      <span className="font-bold text-charcoal/50 uppercase tracking-wider text-[11px] w-28 flex-shrink-0">Fabric Material</span>
                      <span className="font-semibold text-charcoal">{product.specs.fabric}</span>
                    </div>
                    {product.specs.gsmOrWeight && (
                      <div className="flex justify-between sm:justify-start sm:gap-4 py-1.5 border-b border-charcoal/5">
                        <span className="font-bold text-charcoal/50 uppercase tracking-wider text-[11px] w-28 flex-shrink-0">Weight / GSM</span>
                        <span className="font-semibold text-charcoal">{product.specs.gsmOrWeight}</span>
                      </div>
                    )}
                    <div className="flex justify-between sm:justify-start sm:gap-4 py-1.5 border-b border-charcoal/5">
                      <span className="font-bold text-charcoal/50 uppercase tracking-wider text-[11px] w-28 flex-shrink-0">Neck / Waist</span>
                      <span className="font-semibold text-charcoal">{product.specs.neckOrWaist}</span>
                    </div>
                    {product.specs.sleeveLength && (
                      <div className="flex justify-between sm:justify-start sm:gap-4 py-1.5 border-b border-charcoal/5">
                        <span className="font-bold text-charcoal/50 uppercase tracking-wider text-[11px] w-28 flex-shrink-0">Sleeve Length</span>
                        <span className="font-semibold text-charcoal">{product.specs.sleeveLength}</span>
                      </div>
                    )}
                    <div className="flex justify-between sm:justify-start sm:gap-4 py-1.5 border-b border-charcoal/5">
                      <span className="font-bold text-charcoal/50 uppercase tracking-wider text-[11px] w-28 flex-shrink-0">Fit Profile</span>
                      <span className="font-semibold text-charcoal">{product.specs.fit}</span>
                    </div>
                    <div className="flex justify-between sm:justify-start sm:gap-4 py-1.5 border-b border-charcoal/5">
                      <span className="font-bold text-charcoal/50 uppercase tracking-wider text-[11px] w-28 flex-shrink-0">Wash Care</span>
                      <span className="font-semibold text-charcoal">{product.specs.washCare}</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Tab 2: Size Guide Table */}
          {activeTab === "size" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-w-3xl">
              <p className="text-xs text-charcoal/60 mb-3">All measurements are provided in inches. Compare with your favorite garment for optimal fit.</p>
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
            </motion.div>
          )}

          {/* Tab 3: Customer Reviews Section */}
          {activeTab === "reviews" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-4xl">
              {/* Rating Summary */}
              <div className="bg-cream/50 p-6 rounded-2xl border border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-4xl font-bold text-charcoal">4.9</span>
                    <span className="text-xs text-charcoal/50">out of 5.0</span>
                  </div>
                  <div className="flex text-amber-500 text-sm my-1">
                    ★★★★★
                  </div>
                  <p className="text-xs text-charcoal/60">Based on {reviewsList.length} verified customer reviews</p>
                </div>

                <div className="space-y-1.5 w-full max-w-xs text-xs text-charcoal/60">
                  <div className="flex items-center gap-2">
                    <span>5★</span>
                    <div className="flex-1 bg-charcoal/10 h-2 rounded-full overflow-hidden">
                      <div className="bg-rust h-full w-[85%]" />
                    </div>
                    <span>85%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>4★</span>
                    <div className="flex-1 bg-charcoal/10 h-2 rounded-full overflow-hidden">
                      <div className="bg-rust h-full w-[15%]" />
                    </div>
                    <span>15%</span>
                  </div>
                </div>
              </div>

              {/* Review Submission Form */}
              <div className="bg-white p-6 rounded-2xl border border-charcoal/10 space-y-4">
                <h4 className="font-heading font-bold text-lg text-charcoal">Write a Review</h4>
                
                {reviewSubmitted && (
                  <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200">
                    Thank you! Your review has been published.
                  </div>
                )}

                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cream/40 border border-charcoal/15 text-xs text-charcoal focus:outline-none focus:border-rust"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-1">Rating</label>
                      <select
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cream/40 border border-charcoal/15 text-xs text-charcoal focus:outline-none focus:border-rust"
                      >
                        <option value={5}>5 Stars ★★★★★</option>
                        <option value={4}>4 Stars ★★★★☆</option>
                        <option value={3}>3 Stars ★★★☆☆</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-1">Review Title</label>
                    <input
                      type="text"
                      value={newReview.title}
                      onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                      placeholder="e.g. Excellent fit & quality"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream/40 border border-charcoal/15 text-xs text-charcoal focus:outline-none focus:border-rust"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-1">Review Details</label>
                    <textarea
                      required
                      rows={3}
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="Share details about fit, comfort, and material..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream/40 border border-charcoal/15 text-xs text-charcoal focus:outline-none focus:border-rust"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-charcoal text-white text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-rust transition-colors"
                  >
                    Submit Review
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviewsList.map((r) => (
                  <div key={r.id} className="p-5 rounded-2xl bg-cream/30 border border-charcoal/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-charcoal">{r.name}</span>
                        {r.verified && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                            ✓ Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-amber-500 text-sm">{"★".repeat(r.rating)}</span>
                    </div>

                    <h5 className="font-bold text-sm text-charcoal">{r.title}</h5>
                    <p className="text-charcoal/70 text-xs sm:text-sm leading-relaxed">{r.comment}</p>

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

      {/* Bottom Next/Prev Product Navigation Cards */}
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

      {/* Size Chart Popup Modal */}
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
    </div>
  );
}
