"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface Props {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: "New" | "Sale" | "Best Seller";
  colors: { name: string; hex: string }[];
  sizes: string[];
}

export default function ProductCard({ id, name, price, originalPrice, image, badge, colors, sizes }: Props) {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selColor, setSelColor] = useState(colors[0]?.name ?? "");
  const [selSize, setSelSize] = useState(sizes[0] ?? "");
  const { addItem } = useCart();

  const badgeStyle: Record<string, string> = {
    New: "bg-charcoal text-white",
    Sale: "bg-rust text-white",
    "Best Seller": "bg-charcoal/80 text-white",
  };

  return (
    <>
      <motion.div
        className="group cursor-pointer"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image */}
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-cream-dark">
          <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
          {badge && (
            <span className={`absolute top-3 left-3 px-3 py-1.5 text-[10px] font-semibold tracking-widest uppercase ${badgeStyle[badge]} rounded-full shadow-sm`}>
              {badge}
            </span>
          )}
          {/* Hover overlay */}
          <motion.div initial={false} animate={{ opacity: hovered ? 1 : 0 }} className="absolute inset-0 bg-black/20 flex items-end justify-center pb-6">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={hovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}
              className="bg-white text-charcoal px-7 py-3 text-xs font-semibold tracking-widest uppercase rounded-full hover:bg-rust hover:text-white transition-colors duration-300 shadow-lg"
            >
              Quick Shop
            </motion.button>
          </motion.div>
        </div>

        {/* Info */}
        <div className="mt-4 px-1">
          <div className="flex gap-1.5 mb-2">
            {colors.slice(0, 4).map((c) => (
              <span key={c.name} className="w-3 h-3 rounded-full border border-charcoal/10 shadow-sm" style={{ backgroundColor: c.hex }} title={c.name} />
            ))}
          </div>
          <h3 className="text-charcoal text-sm font-medium leading-snug">{name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-charcoal font-bold">${price}</span>
            {originalPrice && <span className="text-charcoal/35 text-sm line-through">${originalPrice}</span>}
          </div>
        </div>
      </motion.div>

      {/* Quick Shop Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-cream rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
              <div className="relative h-64">
                <img src={image} alt={name} className="w-full h-full object-cover" />
                <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-charcoal hover:bg-white transition shadow-md">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl text-charcoal font-bold">{name}</h3>
                <div className="flex items-center gap-2 mt-1 mb-5">
                  <span className="text-charcoal font-bold text-lg">${price}</span>
                  {originalPrice && <span className="text-charcoal/35 line-through">${originalPrice}</span>}
                </div>

                <p className="text-xs tracking-widest uppercase text-charcoal/50 mb-2">Color — {selColor}</p>
                <div className="flex gap-2 mb-5">
                  {colors.map((c) => (
                    <button key={c.name} onClick={() => setSelColor(c.name)} className={`w-8 h-8 rounded-full border-2 transition-all ${selColor === c.name ? "border-charcoal ring-2 ring-charcoal ring-offset-2 ring-offset-cream" : "border-charcoal/10 hover:border-charcoal/30"}`} style={{ backgroundColor: c.hex }} />
                  ))}
                </div>

                <p className="text-xs tracking-widest uppercase text-charcoal/50 mb-2">Size — {selSize}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {sizes.map((s) => (
                    <button key={s} onClick={() => setSelSize(s)} className={`px-4 py-2 text-xs font-medium tracking-wider rounded-full border transition-all ${selSize === s ? "bg-charcoal text-white border-charcoal" : "bg-transparent text-charcoal border-charcoal/20 hover:border-charcoal"}`}>
                      {s}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => { addItem({ id, name, price, image, color: selColor, size: selSize }); setModalOpen(false); }}
                  className="w-full bg-charcoal text-white py-4 text-sm font-semibold tracking-wider uppercase rounded-xl hover:bg-rust transition-colors duration-300 shadow-lg shadow-charcoal/20"
                >
                  Add to Bag
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
