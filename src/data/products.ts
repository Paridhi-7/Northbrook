export interface SizeMeasurement {
  size: string;
  chest: string;
  length: string;
  shoulder: string;
  sleeve: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  comment: string;
  helpful: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: "men" | "women" | "unisex";
  subcategory: string;
  images: string[];
  badge?: "New" | "Sale" | "Best Seller";
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  sizeChart?: SizeMeasurement[];
  reviews?: Review[];
}

function productImages(slug: string, count: number, frontNum = 2): string[] {
  const images: string[] = [];
  images.push(`/products/${slug}/${String(frontNum).padStart(2, "0")}.jpg`);
  for (let i = 1; i <= count; i++) {
    if (i !== frontNum) {
      images.push(`/products/${slug}/${String(i).padStart(2, "0")}.jpg`);
    }
  }
  return images;
}

const defaultMenSizeChart: SizeMeasurement[] = [
  { size: "S", chest: '38"', length: '27.5"', shoulder: '18"', sleeve: '8.5"' },
  { size: "M", chest: '40"', length: '28.5"', shoulder: '19"', sleeve: '9.0"' },
  { size: "L", chest: '42"', length: '29.5"', shoulder: '20"', sleeve: '9.5"' },
  { size: "XL", chest: '44"', length: '30.5"', shoulder: '21"', sleeve: '10.0"' },
];

const defaultWomenSizeChart: SizeMeasurement[] = [
  { size: "XS", chest: '34"', length: '25.0"', shoulder: '16"', sleeve: '7.5"' },
  { size: "S", chest: '36"', length: '26.0"', shoulder: '17"', sleeve: '8.0"' },
  { size: "M", chest: '38"', length: '27.0"', shoulder: '18"', sleeve: '8.5"' },
  { size: "L", chest: '40"', length: '28.0"', shoulder: '19"', sleeve: '9.0"' },
];

const defaultBottomsSizeChart: SizeMeasurement[] = [
  { size: "30", chest: '30" Waist', length: '39.5"', shoulder: '24" Thigh', sleeve: '16" Leg' },
  { size: "32", chest: '32" Waist', length: '40.5"', shoulder: '25" Thigh', sleeve: '17" Leg' },
  { size: "34", chest: '34" Waist', length: '41.5"', shoulder: '26" Thigh', sleeve: '18" Leg' },
  { size: "36", chest: '36" Waist', length: '42.5"', shoulder: '27" Thigh', sleeve: '19" Leg' },
];

const defaultReviews: Review[] = [
  {
    id: "r1",
    name: "Arjun M.",
    rating: 5,
    date: "2 days ago",
    verified: true,
    title: "Unbelievable quality and fit!",
    comment: "The heavy fabric structure is incredible. Feels like a luxury brand piece at a fraction of the cost.",
    helpful: 12,
  },
  {
    id: "r2",
    name: "Sanya K.",
    rating: 5,
    date: "1 week ago",
    verified: true,
    title: "Perfect drape and fast delivery",
    comment: "Super comfortable for all-day wear. Washed it twice already and no shrinkage or fade.",
    helpful: 8,
  },
  {
    id: "r3",
    name: "Rohan V.",
    rating: 4,
    date: "2 weeks ago",
    verified: true,
    title: "Great aesthetic & stitching",
    comment: "Looks exactly like the photos. Heavyweight cotton with clean seams.",
    helpful: 5,
  },
];

export const products: Product[] = [
  // MEN'S
  {
    id: "acid-wash-boys",
    name: "Acid Wash Heavyweight Tee",
    price: 599,
    category: "men",
    subcategory: "Tees",
    images: productImages("acid-wash-boys-washing", 7, 2),
    badge: "Best Seller",
    description: "Street-style acid wash tee with a bold vintage washed finish. Crafted from 240 GSM combed cotton for a plush drape and relaxed silhouette.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Acid Green", hex: "#7a8b6f" }],
    sizeChart: defaultMenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "cargo-boys",
    name: "Cargo Men's Trousers",
    price: 549,
    category: "men",
    subcategory: "Bottoms",
    images: productImages("cargo-boys", 7, 2),
    description: "Utility cargo bottoms built from durable cotton twill with multi-pocket detailing and an ergonomic taper.",
    sizes: ["30", "32", "34", "36"],
    colors: [{ name: "Olive", hex: "#5a6b4a" }],
    sizeChart: defaultBottomsSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "game-over-hoodie-boys",
    name: "Game Over Hoodie",
    price: 899,
    category: "men",
    subcategory: "Hoodies",
    images: productImages("game-over-hoodie-boys", 7, 2),
    badge: "New",
    description: "Statement heavyweight hoodie featuring custom screenprinted artwork and plush brushed fleece lining.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Charcoal Black", hex: "#1a1a1a" }],
    sizeChart: defaultMenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "hand-loves-tees-boys",
    name: "Hand Loves Graphic Tee",
    price: 499,
    category: "men",
    subcategory: "Tees",
    images: productImages("hand-loves-tees-boys", 7, 2),
    description: "Minimalist hand graphic tee screenprinted on ultra-soft organic cotton.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Cream White", hex: "#f5f1eb" }],
    sizeChart: defaultMenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "jonny-deep-hoodie-boys",
    name: "Jonny Deep Heavyweight Hoodie",
    price: 949,
    originalPrice: 1199,
    category: "men",
    subcategory: "Hoodies",
    images: productImages("jonny-deep-hoodie-boys", 7, 2),
    badge: "Sale",
    description: "Deep-toned urban hoodie with oversized kangaroo pocket and double-lined hood for winter insulation.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Deep Charcoal", hex: "#2b2b2b" }],
    sizeChart: defaultMenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "mag-dont-ask-me-why-tees-boys",
    name: "Don't Ask Me Why Tee",
    price: 499,
    category: "men",
    subcategory: "Tees",
    images: productImages("mag-dont-ask-me-why-girls", 7, 2),
    description: "Witty typographic graphic tee cut in an easy drop-shoulder fit.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#1a1a1a" }],
    sizeChart: defaultMenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "mag-sapprow-boys",
    name: "Sapprow All-Over Tee",
    price: 549,
    category: "men",
    subcategory: "Tees",
    images: productImages("mag-sapprow-girls", 7, 2),
    description: "Artisan inspired pattern graphic tee with reinforced collar stitching.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Multi Brown", hex: "#b5651d" }],
    sizeChart: defaultMenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "the-weekend-tees-boys",
    name: "The Weekend Graphic Tee",
    price: 499,
    category: "men",
    subcategory: "Tees",
    images: productImages("weekend-girls-tees", 7, 2),
    badge: "New",
    description: "Casual weekend essential tee designed with a modern boxy cut.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Off White", hex: "#f5f1eb" }],
    sizeChart: defaultMenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "think-again-boys",
    name: "Think Again Typography Tee",
    price: 549,
    category: "men",
    subcategory: "Tees",
    images: productImages("mag-dont-ask-me-why-girls", 7, 1),
    description: "Bold slogan piece crafted with high-density pigment printing.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Slate Grey", hex: "#4a4a4a" }],
    sizeChart: defaultMenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "vision-eye-tees-boys",
    name: "Vision Eye Oversized Tee",
    price: 549,
    category: "men",
    subcategory: "Tees",
    images: productImages("vision-tees-girls", 7, 2),
    description: "Surreal graphic tee featuring artistic eye artwork on premium cotton jersey.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Ink Black", hex: "#1a1a1a" }],
    sizeChart: defaultMenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "whatever-hoodie-boys",
    name: "Whatever Relaxed Hoodie",
    price: 849,
    category: "men",
    subcategory: "Hoodies",
    images: productImages("whatever-hoodie-girls", 7, 2),
    description: "Relaxed slouchy hoodie with ribbed cuffs and hem.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Heather Grey", hex: "#6b6b6b" }],
    sizeChart: defaultMenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "cord-sets",
    name: "Earth Tone Cord Sets",
    price: 1299,
    category: "unisex",
    subcategory: "Sets",
    images: productImages("cord-sets", 7, 2),
    badge: "Best Seller",
    description: "Co-ord top and pant set crafted from fine wale cotton corduroy.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Rich Brown", hex: "#8b6f47" }],
    sizeChart: defaultMenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "white-dots",
    name: "Geometric Diamond Pattern Tee",
    price: 499,
    category: "unisex",
    subcategory: "Tees",
    images: productImages("white-dots", 7, 2),
    description: "Clean geometric patterned tee offering light breathable comfort.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Ivory", hex: "#f5f1eb" }],
    sizeChart: defaultMenSizeChart,
    reviews: defaultReviews,
  },

  // WOMEN'S
  {
    id: "acid-wash-girls",
    name: "Acid Wash Crop Tee",
    price: 599,
    category: "women",
    subcategory: "Tees",
    images: productImages("acid-wash-girls-washing", 7, 2),
    badge: "Best Seller",
    description: "Vintage-washed feminine tee cut with subtle drop shoulders and soft hand-feel.",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Washed Olive", hex: "#7a8b6f" }],
    sizeChart: defaultWomenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "butterfly",
    name: "Butterfly Art Tee",
    price: 549,
    category: "women",
    subcategory: "Tees",
    images: productImages("butterfly", 7, 2),
    badge: "Best Seller",
    description: "Ethereal butterfly line art printed on light-as-air organic cotton.",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Natural Cream", hex: "#f5f1eb" }],
    sizeChart: defaultWomenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "cargo-girls",
    name: "Utility Cargo Women's Trousers",
    price: 549,
    category: "women",
    subcategory: "Bottoms",
    images: productImages("cargo-girls", 7, 2),
    description: "High-rise relaxed cargo trousers with functional pockets and ankle adjusters.",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Sage Green", hex: "#5a6b4a" }],
    sizeChart: defaultBottomsSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "crocodile-girls",
    name: "Crocodile Emblem Tee",
    price: 499,
    category: "women",
    subcategory: "Tees",
    images: productImages("crocodile-girls", 7, 2),
    description: "Playful graphic emblem tee with pre-shrunk cotton build.",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Forest Green", hex: "#4a6b4a" }],
    sizeChart: defaultWomenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "game-over-hoodie-girls",
    name: "Game Over Women's Hoodie",
    price: 899,
    category: "women",
    subcategory: "Hoodies",
    images: productImages("game-over-hoodie-girls", 7, 2),
    badge: "New",
    description: "Cropped-fit cozy hoodie with plush fleece inner lining.",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Midnight Black", hex: "#1a1a1a" }],
    sizeChart: defaultWomenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "hand-loves-girls",
    name: "Hand Loves Women's Tee",
    price: 499,
    category: "women",
    subcategory: "Tees",
    images: productImages("hand-loves-girls", 7, 2),
    description: "Sweet hand-heart graphic tee designed for versatile layering.",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Soft Pink", hex: "#e8b4b8" }],
    sizeChart: defaultWomenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "jonny-deep-hoodie-girls",
    name: "Jonny Deep Women's Hoodie",
    price: 949,
    originalPrice: 1199,
    category: "women",
    subcategory: "Hoodies",
    images: productImages("jonny-deep-hoodie-girls", 7, 2),
    badge: "Sale",
    description: "Oversized boyfriend fit hoodie in rich dark tones.",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Deep Charcoal", hex: "#2b2b2b" }],
    sizeChart: defaultWomenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "mag-dont-ask-me-why-girls",
    name: "Don't Ask Me Why Women's Tee",
    price: 499,
    category: "women",
    subcategory: "Tees",
    images: productImages("mag-dont-ask-me-why-girls", 7, 2),
    description: "Typography slogan tee with curved hem detailing.",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Jet Black", hex: "#1a1a1a" }],
    sizeChart: defaultWomenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "mag-sapprow-girls",
    name: "Sapprow Women's All-Over Tee",
    price: 549,
    category: "women",
    subcategory: "Tees",
    images: productImages("mag-sapprow-girls", 7, 2),
    description: "Eye-catching pattern tee tailored for a flattering drape.",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Multi Earth", hex: "#b5651d" }],
    sizeChart: defaultWomenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "vision-tees-girls",
    name: "Vision Eye Women's Tee",
    price: 549,
    category: "women",
    subcategory: "Tees",
    images: productImages("vision-tees-girls", 7, 2),
    description: "Surreal graphic tee printed with eco-friendly water-based ink.",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Classic Black", hex: "#1a1a1a" }],
    sizeChart: defaultWomenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "weekend-girls-tees",
    name: "Weekend Vibes Women's Tee",
    price: 499,
    category: "women",
    subcategory: "Tees",
    images: productImages("weekend-girls-tees", 7, 2),
    badge: "New",
    description: "Relaxed crewneck tee ideal for lounging or casual outings.",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Chalk White", hex: "#f5f1eb" }],
    sizeChart: defaultWomenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "whatever-hoodie-girls",
    name: "Whatever Women's Hoodie",
    price: 849,
    category: "women",
    subcategory: "Hoodies",
    images: productImages("whatever-hoodie-girls", 7, 2),
    description: "Plush oversized fleece hoodie with drawstring hood.",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Heather Grey", hex: "#6b6b6b" }],
    sizeChart: defaultWomenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "shit-happen-acid-waash-girls",
    name: "Shit Happens Acid Wash Tee",
    price: 599,
    category: "women",
    subcategory: "Tees",
    images: productImages("shit-happen-acid-waash-girls", 7, 2),
    description: "Bold statement acid wash tee with lived-in softness.",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Acid Slate", hex: "#7a8b6f" }],
    sizeChart: defaultWomenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "day-dream-hoodie",
    name: "Day Dream Graphic Sweatshirt",
    price: 999,
    category: "unisex",
    subcategory: "Hoodies",
    images: productImages("day-dream-hoodie", 7, 2),
    badge: "New",
    description: "Dreamy cloud graphic pullover hoodie with ultra-soft lining.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Soft Cream", hex: "#f5f1eb" }],
    sizeChart: defaultWomenSizeChart,
    reviews: defaultReviews,
  },
  {
    id: "racing-hoodie",
    name: "Speedway Racing Hoodie",
    price: 999,
    category: "unisex",
    subcategory: "Hoodies",
    images: productImages("racing-hoodie", 7, 2),
    badge: "New",
    description: "Motorsport inspired graphic hoodie with sleeve speed stripes.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Rust Red", hex: "#b5651d" }],
    sizeChart: defaultWomenSizeChart,
    reviews: defaultReviews,
  },
];

export const getProductsByCategory = (category: "men" | "women" | "unisex") =>
  products.filter((p) => p.category === category || p.category === "unisex");

export const getAllProducts = () => products;

export const getProductById = (id: string) =>
  products.find((p) => p.id === id);

export const getSubcategories = (category: "men" | "women" | "unisex") =>
  [...new Set(products.filter((p) => p.category === category || p.category === "unisex").map((p) => p.subcategory))];

export const getBestSellers = () =>
  products.filter((p) => p.badge === "Best Seller");
