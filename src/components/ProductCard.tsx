"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: "New" | "Sale" | "Best Seller";
  colors: string[];
  sizes: string[];
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  badge,
  colors,
  sizes,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [showQuickShop, setShowQuickShop] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCart();

  const badgeColors: Record<string, string> = {
    New: "bg-charcoal text-offwhite",
    Sale: "bg-rust text-offwhite",
    "Best Seller": "bg-earth-brown text-offwhite",
  };

  const colorMap: Record<string, string> = {
    Charcoal: "#2D2D2D",
    Black: "#2D2D2D",
    Cream: "#FAF8F5",
    Oatmeal: "#FAF8F5",
    Offwhite: "#FAF8F5",
    Rust: "#B7472A",
    Navy: "#1B2A4A",
    Sage: "#7A8B6F",
    Camel: "#C4A574",
    Blush: "#E8B4B8",
    Slate: "#6B7B8D",
    Forest: "#2D5A3D",
    "Dark Grey": "#5A5A5A",
  };

  const handleAddToCart = () => {
    addItem({ id, name, price, image, color: selectedColor, size: selectedSize });
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
        {/* SVG Placeholder Image */}
        {!imgError ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="placeholder-img absolute inset-0 text-xs">
            <span>{name}</span>
          </div>
        )}

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
            onClick={(e) => {
              e.stopPropagation();
              setShowQuickShop(true);
            }}
            className="bg-offwhite text-charcoal px-6 py-3 text-xs tracking-widest uppercase hover:bg-rust hover:text-offwhite transition-colors duration-300"
          >
            Quick Shop
          </motion.button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          {colors.slice(0, 4).map((color) => (
            <button
              key={color}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(color);
              }}
              className={`w-3 h-3 rounded-full border transition-all ${
                selectedColor === color
                  ? "border-charcoal ring-1 ring-charcoal ring-offset-1"
                  : "border-warmbeige-dark"
              }`}
              style={{ backgroundColor: colorMap[color] || "#D4C5B3" }}
              title={color}
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

      {/* Quick Shop Modal */}
      {showQuickShop && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-charcoal/50 z-[80] flex items-center justify-center p-4"
          onClick={() => setShowQuickShop(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-offwhite rounded-sm max-w-lg w-full p-8"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-heading text-xl text-charcoal font-bold">
                {name}
              </h3>
              <button
                onClick={() => setShowQuickShop(false)}
                className="text-charcoal-light hover:text-rust transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Product image in modal */}
            <div className="w-full h-48 bg-cream rounded-sm overflow-hidden mb-4">
              {!imgError ? (
                <img src={image} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="placeholder-img w-full h-full text-xs">
                  <span>{name}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 mb-2">
              <span className="text-charcoal font-bold text-xl">${price}</span>
              {originalPrice && (
                <span className="text-warmbeige-dark line-through">
                  ${originalPrice}
                </span>
              )}
            </div>

            {/* Color Selection */}
            <div className="mt-6">
              <p className="text-xs tracking-widest uppercase text-charcoal mb-3">
                Color: <span className="font-medium">{selectedColor}</span>
              </p>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === color
                        ? "border-charcoal ring-2 ring-charcoal ring-offset-2"
                        : "border-warmbeige-dark hover:border-charcoal"
                    }`}
                    style={{ backgroundColor: colorMap[color] || "#D4C5B3" }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mt-5">
              <p className="text-xs tracking-widest uppercase text-charcoal mb-3">
                Size: <span className="font-medium">{selectedSize}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs tracking-wider border transition-all ${
                      selectedSize === size
                        ? "bg-charcoal text-offwhite border-charcoal"
                        : "bg-transparent text-charcoal border-warmbeige hover:border-charcoal"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full mt-8 bg-charcoal text-offwhite py-4 text-sm tracking-widest uppercase hover:bg-rust transition-colors duration-300"
            >
              Add to Bag
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
