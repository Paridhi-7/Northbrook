"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: "New" | "Sale" | "Best Seller";
  colors: string[];
}

export default function ProductCard({
  name,
  price,
  originalPrice,
  image,
  badge,
  colors,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const badgeColors: Record<string, string> = {
    New: "bg-charcoal text-offwhite",
    Sale: "bg-rust text-offwhite",
    "Best Seller": "bg-earth-brown text-offwhite",
  };

  return (
    <motion.div
      className="group relative cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-cream">
        {/* Placeholder */}
        <div className="placeholder-img absolute inset-0 text-xs">
          <span>{name}</span>
        </div>

        {/* Badge */}
        {badge && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 text-[10px] tracking-widest uppercase ${badgeColors[badge]} z-10`}
          >
            {badge}
          </span>
        )}

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-charcoal/30 flex items-center justify-center"
        >
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-offwhite text-charcoal px-6 py-3 text-xs tracking-widest uppercase hover:bg-rust hover:text-offwhite transition-colors duration-300"
          >
            Quick Shop
          </motion.button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          {colors.slice(0, 3).map((color, i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full border border-warmbeige-dark"
              style={{
                backgroundColor:
                  color === "Charcoal" || color === "Black"
                    ? "#2D2D2D"
                    : color === "Cream" || color === "Oatmeal" || color === "Offwhite"
                    ? "#FAF8F5"
                    : color === "Rust"
                    ? "#B7472A"
                    : color === "Navy"
                    ? "#1B2A4A"
                    : color === "Sage"
                    ? "#7A8B6F"
                    : color === "Camel"
                    ? "#C4A574"
                    : color === "Blush"
                    ? "#E8B4B8"
                    : color === "Slate"
                    ? "#6B7B8D"
                    : color === "Forest"
                    ? "#2D5A3D"
                    : color === "Dark Grey"
                    ? "#5A5A5A"
                    : "#D4C5B3",
              }}
            />
          ))}
        </div>
        <h3 className="text-charcoal text-sm font-medium">{name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-charcoal font-semibold">${price}</span>
          {originalPrice && (
            <span className="text-warmbeige-dark text-sm line-through">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
