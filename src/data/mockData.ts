export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id?: string | null;
  image_url?: string;
}

export interface SizeChart {
  id: string;
  name: string;
  guidelines: Record<string, string>;
  headers: string[];
  rows: Record<string, string>[];
}

export interface ProductVariant {
  id: string;
  product_id: string;
  size: string;
  color: string;
  heel_height?: string;
  width?: string;
  stock: number;
  price_modifier: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  sale_price?: number;
  brand: string;
  images: string[];
  category_slug: string;
  category_id: string;
  size_chart_id?: string;
  status: 'active' | 'draft';
  rating: number;
  variants: ProductVariant[];
}

export const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Women', slug: 'women', parent_id: null },
  { id: 'cat-2', name: 'Men', slug: 'men', parent_id: null },
  { id: 'cat-3', name: 'Kids', slug: 'kids', parent_id: null },
  { id: 'cat-4', name: 'Shoes', slug: 'shoes', parent_id: null },
  { id: 'cat-5', name: 'Dancewear', slug: 'dancewear', parent_id: null },
  // Subcategories
  { id: 'sub-1', name: "Women's Latin", slug: 'womens-latin', parent_id: 'cat-1' },
  { id: 'sub-2', name: "Men's Standard", slug: 'mens-standard', parent_id: 'cat-2' },
  { id: 'sub-3', name: "Practice Wear", slug: 'practice', parent_id: 'cat-5' },
];

export const mockSizeCharts: SizeChart[] = [
  {
    id: 'sc-shoes',
    name: 'Standard Dance Shoes Size Chart',
    guidelines: {
      'Foot Length': 'Place foot on paper, trace outline, measure from back of heel to tip of longest toe.',
      'Instep': 'Measure around the highest arch of your foot with a soft measuring tape.'
    },
    headers: ['EU Size', 'UK Size', 'Foot Length (cm)', 'US Women', 'US Men'],
    rows: [
      { 'EU Size': '36', 'UK Size': '3.5', 'Foot Length (cm)': '23.0', 'US Women': '5.5', 'US Men': '4.5' },
      { 'EU Size': '37', 'UK Size': '4.0', 'Foot Length (cm)': '23.5', 'US Women': '6.0', 'US Men': '5.0' },
      { 'EU Size': '38', 'UK Size': '5.0', 'Foot Length (cm)': '24.5', 'US Women': '7.0', 'US Men': '6.0' },
      { 'EU Size': '39', 'UK Size': '6.0', 'Foot Length (cm)': '25.5', 'US Women': '8.0', 'US Men': '7.0' },
      { 'EU Size': '40', 'UK Size': '6.5', 'Foot Length (cm)': '26.0', 'US Women': '8.5', 'US Men': '7.5' },
      { 'EU Size': '41', 'UK Size': '7.5', 'Foot Length (cm)': '27.0', 'US Women': '9.5', 'US Men': '8.5' },
      { 'EU Size': '42', 'UK Size': '8.0', 'Foot Length (cm)': '27.5', 'US Women': '10.0', 'US Men': '9.0' },
    ]
  },
  {
    id: 'sc-wear',
    name: 'Premium Dancewear Size Chart',
    guidelines: {
      'Chest/Bust': 'Measure horizontally around the fullest part of the chest.',
      'Waist': 'Measure around the narrowest part of the natural waistline.',
      'Hips': 'Measure around the widest part of the seat.'
    },
    headers: ['Label Size', 'Chest (cm)', 'Waist (cm)', 'Hips (cm)'],
    rows: [
      { 'Label Size': 'XS', 'Chest (cm)': '80-84', 'Waist (cm)': '62-66', 'Hips (cm)': '86-90' },
      { 'Label Size': 'S', 'Chest (cm)': '84-88', 'Waist (cm)': '66-70', 'Hips (cm)': '90-94' },
      { 'Label Size': 'M', 'Chest (cm)': '88-92', 'Waist (cm)': '70-74', 'Hips (cm)': '94-98' },
      { 'Label Size': 'L', 'Chest (cm)': '92-96', 'Waist (cm)': '74-78', 'Hips (cm)': '98-102' },
    ]
  }
];

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Fiery Latin Rhythm Dress',
    slug: 'fiery-latin-rhythm-dress',
    description: 'A premium, high-end Latin dance dress crafted from luxury stretch lace and flowing crepe. Fits perfectly and responds dynamically to every spin and step.',
    price: 450.00,
    sale_price: 399.99,
    brand: 'TDR DANCE',
    images: [
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=600&auto=format&fit=crop'
    ],
    category_slug: 'women',
    category_id: 'cat-1',
    size_chart_id: 'sc-wear',
    status: 'active',
    rating: 4.9,
    variants: [
      { id: 'v-1', product_id: 'prod-1', size: 'S', color: 'Midnight Black', stock: 5, price_modifier: 0 },
      { id: 'v-2', product_id: 'prod-1', size: 'M', color: 'Midnight Black', stock: 12, price_modifier: 0 },
      { id: 'v-3', product_id: 'prod-1', size: 'L', color: 'Midnight Black', stock: 3, price_modifier: 0 },
      { id: 'v-4', product_id: 'prod-1', size: 'S', color: 'Crimson Red', stock: 4, price_modifier: 20.00 },
    ]
  },
  {
    id: 'prod-2',
    name: 'Gentlemen Latin Practice Shirt',
    slug: 'gentlemen-latin-practice-shirt',
    description: 'Breathable, moisture-wicking stretch shirt designed specifically for intensive ballroom and Latin practice sessions.',
    price: 120.00,
    brand: 'Dancesport Pro',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop'
    ],
    category_slug: 'men',
    category_id: 'cat-2',
    size_chart_id: 'sc-wear',
    status: 'active',
    rating: 4.7,
    variants: [
      { id: 'v-5', product_id: 'prod-2', size: 'M', color: 'Classic Black', stock: 8, price_modifier: 0 },
      { id: 'v-6', product_id: 'prod-2', size: 'L', color: 'Classic Black', stock: 15, price_modifier: 0 },
    ]
  },
  {
    id: 'prod-3',
    name: 'Elise Standard Dance Shoes',
    slug: 'elise-standard-dance-shoes',
    description: 'Expertly handcrafted ballroom shoes with customized heel support and double cushioned insole for unmatched stability.',
    price: 180.00,
    brand: 'Ray Rose',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop'
    ],
    category_slug: 'shoes',
    category_id: 'cat-4',
    size_chart_id: 'sc-shoes',
    status: 'active',
    rating: 5.0,
    variants: [
      { id: 'v-7', product_id: 'prod-3', size: '37', color: 'Flesh Satin', heel_height: '2.5\" Slim', stock: 6, price_modifier: 0 },
      { id: 'v-8', product_id: 'prod-3', size: '38', color: 'Flesh Satin', heel_height: '2.5\" Slim', stock: 9, price_modifier: 0 },
      { id: 'v-9', product_id: 'prod-3', size: '39', color: 'Flesh Satin', heel_height: '2.5\" Slim', stock: 2, price_modifier: 0 },
    ]
  }
];

// Memory stores for dynamic CRUD additions (simulates live update in session)
export const activeCategoriesStore = [...mockCategories];
export const activeProductsStore = [...mockProducts];
export const activeSizeChartsStore = [...mockSizeCharts];
export const wishlistStore: string[] = ['prod-1']; // initially has Prod 1
