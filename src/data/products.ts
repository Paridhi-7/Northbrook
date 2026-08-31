export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'men' | 'women';
  subcategory: string;
  image: string;
  badge?: 'New' | 'Sale' | 'Best Seller';
  description: string;
  sizes: string[];
  colors: string[];
}

export const products: Product[] = [
  // Men's Collection
  {
    id: 'm-001',
    name: 'Heritage Wool Crewneck',
    price: 89,
    category: 'men',
    subcategory: 'Sweaters',
    image: '/products/mens-crewneck.jpg',
    badge: 'Best Seller',
    description: 'Timeless crewneck sweater crafted from premium merino wool. Perfect layering piece for any season.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Charcoal', 'Rust', 'Oatmeal'],
  },
  {
    id: 'm-002',
    name: 'Ribbed Roll Neck',
    price: 99,
    originalPrice: 120,
    category: 'men',
    subcategory: 'Sweaters',
    image: '/products/mens-rollneck.jpg',
    badge: 'Sale',
    description: 'Classic roll neck in a heavy-gauge rib knit. Warm, structured, and effortlessly refined.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Forest', 'Cream'],
  },
  {
    id: 'm-003',
    name: 'Merino Quarter-Zip',
    price: 105,
    category: 'men',
    subcategory: 'Sweaters',
    image: '/products/mens-quarterzip.jpg',
    badge: 'New',
    description: 'A versatile quarter-zip pullover in lightweight merino. Ideal for smart-casual dressing.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'Slate', 'Camel'],
  },
  {
    id: 'm-004',
    name: 'Cable Knit Cardigan',
    price: 115,
    category: 'men',
    subcategory: 'Cardigans',
    image: '/products/mens-cardigan.jpg',
    description: 'Traditional cable knit cardigan with horn buttons. A NorthBrook signature piece.',
    sizes: ['M', 'L', 'XL'],
    colors: ['Oatmeal', 'Dark Grey'],
  },
  {
    id: 'm-005',
    name: 'Brushed Cotton Henley',
    price: 65,
    category: 'men',
    subcategory: 'Knitwear',
    image: '/products/mens-henley.jpg',
    badge: 'Best Seller',
    description: 'Soft brushed cotton henley with a relaxed fit. An everyday essential.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Charcoal', 'Rust', 'Sage'],
  },
  {
    id: 'm-006',
    name: 'Lambswool V-Neck',
    price: 79,
    originalPrice: 95,
    category: 'men',
    subcategory: 'Sweaters',
    image: '/products/mens-vneck.jpg',
    badge: 'Sale',
    description: 'Crisp lambswool V-neck for polished everyday wear. Pairs beautifully with tailored trousers.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Cream', 'Charcoal'],
  },
  // Women's Collection
  {
    id: 'w-001',
    name: 'Cashmere Blend Pullover',
    price: 129,
    category: 'women',
    subcategory: 'Sweaters',
    image: '/products/womens-pullover.jpg',
    badge: 'Best Seller',
    description: 'Luxuriously soft cashmere blend with a relaxed silhouette. The ultimate comfort piece.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blush', 'Cream', 'Charcoal'],
  },
  {
    id: 'w-002',
    name: 'Chunky Knit Turtleneck',
    price: 99,
    category: 'women',
    subcategory: 'Sweaters',
    image: '/products/womens-turtleneck.jpg',
    badge: 'New',
    description: 'Bold chunky-knit turtleneck that makes a statement. Warm enough for the coldest days.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Oatmeal', 'Rust', 'Black'],
  },
  {
    id: 'w-003',
    name: 'Merino Wrap Cardigan',
    price: 110,
    originalPrice: 135,
    category: 'women',
    subcategory: 'Cardigans',
    image: '/products/womens-wrap.jpg',
    badge: 'Sale',
    description: 'Elegant wrap-front cardigan in fine merino. Drapes beautifully for a feminine silhouette.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Sage', 'Charcoal'],
  },
  {
    id: 'w-004',
    name: 'Alpaca Boatneck',
    price: 135,
    category: 'women',
    subcategory: 'Sweaters',
    image: '/products/womens-boatneck.jpg',
    description: 'Impossibly soft alpaca boatneck with a relaxed fit. A timeless wardrobe investment.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Cream', 'Blush', 'Slate'],
  },
  {
    id: 'w-005',
    name: 'Ribbed Knit Dress',
    price: 145,
    category: 'women',
    subcategory: 'Dresses',
    image: '/products/womens-dress.jpg',
    badge: 'New',
    description: 'Figure-flattering ribbed knit dress. Transition seamlessly from day to evening.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Oatmeal', 'Rust'],
  },
  {
    id: 'w-006',
    name: 'Lambswool Crewneck',
    price: 85,
    category: 'women',
    subcategory: 'Sweaters',
    image: '/products/womens-crewneck.jpg',
    badge: 'Best Seller',
    description: 'Classic crewneck in pure lambswool. Soft, warm, and endlessly versatile.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Charcoal', 'Sage'],
  },
];

export const getProductsByCategory = (category: 'men' | 'women') =>
  products.filter((p) => p.category === category);

export const getSubcategories = (category: 'men' | 'women') =>
  [...new Set(products.filter((p) => p.category === category).map((p) => p.subcategory))];

export const getBestSellers = () =>
  products.filter((p) => p.badge === 'Best Seller');
