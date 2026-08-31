export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: "men" | "women";
  subcategory: string;
  image: string;
  badge?: "New" | "Sale" | "Best Seller";
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
}

export const products: Product[] = [
  // ─── Men's ────────────────────────────────────────────
  {
    id: "m-001",
    name: "Heritage Wool Crewneck",
    price: 89,
    category: "men",
    subcategory: "Sweaters",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop",
    badge: "Best Seller",
    description: "Timeless crewneck sweater crafted from premium merino wool.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Charcoal", hex: "#2b2b2b" },
      { name: "Rust", hex: "#b5651d" },
      { name: "Cream", hex: "#f5f1eb" },
    ],
  },
  {
    id: "m-002",
    name: "Ribbed Roll Neck",
    price: 99,
    originalPrice: 120,
    category: "men",
    subcategory: "Sweaters",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop",
    badge: "Sale",
    description: "Classic roll neck in a heavy-gauge rib knit.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Navy", hex: "#1b2a4a" },
      { name: "Cream", hex: "#f5f1eb" },
    ],
  },
  {
    id: "m-003",
    name: "Merino Quarter-Zip",
    price: 105,
    category: "men",
    subcategory: "Sweaters",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
    badge: "New",
    description: "A versatile quarter-zip pullover in lightweight merino.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy", hex: "#1b2a4a" },
      { name: "Slate", hex: "#6b7b8d" },
      { name: "Camel", hex: "#c4a574" },
    ],
  },
  {
    id: "m-004",
    name: "Cable Knit Cardigan",
    price: 115,
    category: "men",
    subcategory: "Cardigans",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a25?w=600&h=800&fit=crop",
    description: "Traditional cable knit cardigan with horn buttons.",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Cream", hex: "#f5f1eb" },
      { name: "Charcoal", hex: "#2b2b2b" },
    ],
  },
  {
    id: "m-005",
    name: "Brushed Cotton Henley",
    price: 65,
    category: "men",
    subcategory: "Knitwear",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop",
    badge: "Best Seller",
    description: "Soft brushed cotton henley with a relaxed fit.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Charcoal", hex: "#2b2b2b" },
      { name: "Rust", hex: "#b5651d" },
      { name: "Sage", hex: "#7a8b6f" },
    ],
  },
  {
    id: "m-006",
    name: "Lambswool V-Neck",
    price: 79,
    originalPrice: 95,
    category: "men",
    subcategory: "Sweaters",
    image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=600&h=800&fit=crop",
    badge: "Sale",
    description: "Crisp lambswool V-neck for polished everyday wear.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Navy", hex: "#1b2a4a" },
      { name: "Cream", hex: "#f5f1eb" },
      { name: "Charcoal", hex: "#2b2b2b" },
    ],
  },
  {
    id: "m-007",
    name: "Wool Blend Overcoat",
    price: 195,
    category: "men",
    subcategory: "Outerwear",
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop",
    badge: "New",
    description: "Structured wool blend overcoat. Refined warmth for cold days.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", hex: "#2b2b2b" },
      { name: "Camel", hex: "#c4a574" },
    ],
  },
  // ─── Women's ──────────────────────────────────────────
  {
    id: "w-001",
    name: "Cashmere Blend Pullover",
    price: 129,
    category: "women",
    subcategory: "Sweaters",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&h=800&fit=crop",
    badge: "Best Seller",
    description: "Luxuriously soft cashmere blend with a relaxed silhouette.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Blush", hex: "#e8b4b8" },
      { name: "Cream", hex: "#f5f1eb" },
      { name: "Charcoal", hex: "#2b2b2b" },
    ],
  },
  {
    id: "w-002",
    name: "Chunky Knit Turtleneck",
    price: 99,
    category: "women",
    subcategory: "Sweaters",
    image: "https://images.unsplash.com/photo-1576765607924-3f7b91f4fc22?w=600&h=800&fit=crop",
    badge: "New",
    description: "Bold chunky-knit turtleneck that makes a statement.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Cream", hex: "#f5f1eb" },
      { name: "Rust", hex: "#b5651d" },
      { name: "Black", hex: "#1a1a1a" },
    ],
  },
  {
    id: "w-003",
    name: "Merino Wrap Cardigan",
    price: 110,
    originalPrice: 135,
    category: "women",
    subcategory: "Cardigans",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a25?w=600&h=800&fit=crop",
    badge: "Sale",
    description: "Elegant wrap-front cardigan in fine merino.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Camel", hex: "#c4a574" },
      { name: "Sage", hex: "#7a8b6f" },
      { name: "Charcoal", hex: "#2b2b2b" },
    ],
  },
  {
    id: "w-004",
    name: "Alpaca Boatneck",
    price: 135,
    category: "women",
    subcategory: "Sweaters",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop",
    description: "Impossibly soft alpaca boatneck with a relaxed fit.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Cream", hex: "#f5f1eb" },
      { name: "Blush", hex: "#e8b4b8" },
      { name: "Slate", hex: "#6b7b8d" },
    ],
  },
  {
    id: "w-005",
    name: "Ribbed Knit Dress",
    price: 145,
    category: "women",
    subcategory: "Dresses",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
    badge: "New",
    description: "Figure-flattering ribbed knit dress for day to evening.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Cream", hex: "#f5f1eb" },
      { name: "Rust", hex: "#b5651d" },
    ],
  },
  {
    id: "w-006",
    name: "Lambswool Crewneck",
    price: 85,
    category: "women",
    subcategory: "Sweaters",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop",
    badge: "Best Seller",
    description: "Classic crewneck in pure lambswool. Soft, warm, versatile.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Cream", hex: "#f5f1eb" },
      { name: "Charcoal", hex: "#2b2b2b" },
      { name: "Sage", hex: "#7a8b6f" },
    ],
  },
  {
    id: "w-007",
    name: "Oversized Knit Shrug",
    price: 110,
    category: "women",
    subcategory: "Cardigans",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
    badge: "Sale",
    originalPrice: 140,
    description: "Effortlessly chic oversized shrug. Throw it on over anything.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Cream", hex: "#f5f1eb" },
      { name: "Blush", hex: "#e8b4b8" },
    ],
  },
];

export const getProductsByCategory = (category: "men" | "women") =>
  products.filter((p) => p.category === category);

export const getSubcategories = (category: "men" | "women") =>
  [...new Set(products.filter((p) => p.category === category).map((p) => p.subcategory))];

export const getBestSellers = () =>
  products.filter((p) => p.badge === "Best Seller");
