"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  title: string;
  desc: string;
  href: string;
  images: string[];
  intervalMs?: number;
}

export default function CollectionCardSlideshow({
  title,
  desc,
  href,
  images,
  intervalMs = 3500,
}: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images, intervalMs]);

  return (
    <Link
      href={href}
      className="group block relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] shadow-xl bg-charcoal"
    >
      {/* Slideshow image container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={images[currentIdx]}
            src={images[currentIdx]}
            alt={title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          />
        </AnimatePresence>
      </div>

      {/* Cinematic Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 group-hover:via-black/40 transition-colors duration-500" />

      {/* Slide Indicators on top */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
        <span className="px-3.5 py-1.5 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase rounded-full border border-white/15">
          {title.split(" ")[0]} Edit
        </span>
        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentIdx === i ? "w-6 bg-rust" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 z-10">
        <h3 className="font-heading text-3xl sm:text-4xl text-white font-bold mb-2 group-hover:text-rust-light transition-colors">
          {title}
        </h3>
        <p className="text-white/70 text-sm sm:text-base mb-6 max-w-sm line-clamp-2 leading-relaxed">
          {desc}
        </p>
        <span className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-md group-hover:bg-rust text-white px-6 py-3 text-xs font-bold tracking-widest uppercase rounded-full border border-white/20 group-hover:border-rust transition-all duration-300 shadow-lg">
          Explore Collection
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
