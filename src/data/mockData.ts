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
  { id: 'cat-1', name: 'ქალები', slug: 'women', parent_id: null },
  { id: 'cat-2', name: 'კაცები', slug: 'men', parent_id: null },
  { id: 'cat-3', name: 'ბავშვები', slug: 'kids', parent_id: null },
  { id: 'cat-4', name: 'ფეხსაცმელი', slug: 'shoes', parent_id: null },
  { id: 'cat-5', name: 'ტანსაცმელი', slug: 'dancewear', parent_id: null },
  // Subcategories
  { id: 'sub-1', name: 'ლათინური კაბები', slug: 'womens-latin', parent_id: 'cat-1' },
  { id: 'sub-2', name: 'სამეჯლისო პერანგები', slug: 'mens-standard', parent_id: 'cat-2' },
  { id: 'sub-3', name: 'სავარჯიშო სამოსი', slug: 'practice', parent_id: 'cat-5' },
  { id: 'sub-4', name: 'საბავშვო რეიტინგული კაბები', slug: 'kids-rating', parent_id: 'cat-3' },
];

export const mockSizeCharts: SizeChart[] = [
  {
    id: 'sc-shoes',
    name: 'საცეკვაო ფეხსაცმლის ევროპული ზომები (25 - 45)',
    guidelines: {
      'ტერფის სიგრძე (სმ)': 'დადექით ფურცელზე სწორად, შემოხაზეთ ტერფის კონტური და გაზომეთ ქუსლიდან ყველაზე გრძელი თითის წვერამდე.',
      'სიგანე / მოცულობა': 'გაზომეთ ტერფის ყველაზე ფართო ნაწილი (თითების სახსართან).'
    },
    headers: ['EU ზომა', 'ტერფის სიგრძე (სმ)', 'კატეგორია', 'რეკომენდებული ქუსლი'],
    rows: [
      { 'EU ზომა': '25', 'ტერფის სიგრძე (სმ)': '15.5', 'კატეგორია': 'საბავშვო (Juvenile)', 'რეკომენდებული ქუსლი': '3.5 სმ Block' },
      { 'EU ზომა': '28', 'ტერფის სიგრძე (სმ)': '17.5', 'კატეგორია': 'საბავშვო (Juvenile)', 'რეკომენდებული ქუსლი': '3.5 სმ Block' },
      { 'EU ზომა': '31', 'ტერფის სიგრძე (სმ)': '19.5', 'კატეგორია': 'საბავშვო (Juvenile)', 'რეკომენდებული ქუსლი': '3.5 სმ Block' },
      { 'EU ზომა': '34', 'ტერფის სიგრძე (სმ)': '21.5', 'კატეგორია': 'იუნიორები', 'რეკომენდებული ქუსლი': '4.5 სმ Cuban / Slim' },
      { 'EU ზომა': '36', 'ტერფის სიგრძე (სმ)': '23.0', 'კატეგორია': 'ქალი / იუნიორი', 'რეკომენდებული ქუსლი': '6.5 სმ Slim / Flare' },
      { 'EU ზომა': '37', 'ტერფის სიგრძე (სმ)': '23.5', 'კატეგორია': 'ქალი / ახალგაზრდა', 'რეკომენდებული ქუსლი': '7.0 სმ Slim' },
      { 'EU ზომა': '38', 'ტერფის სიგრძე (სმ)': '24.5', 'კატეგორია': 'ქალი / უფროსები', 'რეკომენდებული ქუსლი': '7.5 სმ Slim / Stiletto' },
      { 'EU ზომა': '39', 'ტერფის სიგრძე (სმ)': '25.0', 'კატეგორია': 'ქალი / უფროსები', 'რეკომენდებული ქუსლი': '7.5 სმ Slim' },
      { 'EU ზომა': '41', 'ტერფის სიგრძე (სმ)': '26.5', 'კატეგორია': 'კაცი ლათინო/სტანდარტი', 'რეკომენდებული ქუსლი': '2.0 სმ / 4.0 სმ' },
      { 'EU ზომა': '42', 'ტერფის სიგრძე (სმ)': '27.0', 'კატეგორია': 'კაცი ლათინო/სტანდარტი', 'რეკომენდებული ქუსლი': '2.0 სმ / 4.0 სმ' },
      { 'EU ზომა': '43', 'ტერფის სიგრძე (სმ)': '27.5', 'კატეგორია': 'კაცი ლათინო/სტანდარტი', 'რეკომენდებული ქუსლი': '2.0 სმ / 4.0 სმ' },
      { 'EU ზომა': '45', 'ტერფის სიგრძე (სმ)': '29.0', 'კატეგორია': 'კაცი ლათინო/სტანდარტი', 'რეკომენდებული ქუსლი': '2.0 სმ / 4.0 სმ' },
    ]
  },
  {
    id: 'sc-wear',
    name: 'საცეკვაო ტანსაცმლის ზომები სიმაღლის მიხედვით (110 - 180+ სმ)',
    guidelines: {
      'სიმაღლე (სმ)': 'გაზომეთ სიმაღლე ფეხშიშველად იატაკიდან თავის მწვერვალამდე.',
      'გულმკერდის გარშემოწერილობა': 'გაზომეთ ჰორიზონტალურად მკერდის ყველაზე გამობურცულ ადგილას.',
      'წელის გარშემოწერილობა': 'გაზომეთ წელის ყველაზე ვიწრო ადგილას.'
    },
    headers: ['სიმაღლე (სმ)', 'სპორტული კატეგორია', 'გულმკერდი (სმ)', 'წელი (სმ)'],
    rows: [
      { 'სიმაღლე (სმ)': '110-120 სმ', 'სპორტული კატეგორია': 'Juvenile 1 (საბავშვო)', 'გულმკერდი (სმ)': '58-62', 'წელი (სმ)': '52-56' },
      { 'სიმაღლე (სმ)': '120-130 სმ', 'სპორტული კატეგორია': 'Juvenile 2 (საბავშვო)', 'გულმკერდი (სმ)': '62-66', 'წელი (სმ)': '56-60' },
      { 'სიმაღლე (სმ)': '130-140 სმ', 'სპორტული კატეგორია': 'Junior 1 (იუნიორი)', 'გულმკერდი (სმ)': '66-72', 'წელი (სმ)': '60-64' },
      { 'სიმაღლე (სმ)': '140-150 სმ', 'სპორტული კატეგორია': 'Junior 2 (იუნიორი)', 'გულმკერდი (სმ)': '72-78', 'წელი (სმ)': '64-68' },
      { 'სიმაღლე (სმ)': '150-160 სმ', 'სპორტული კატეგორია': 'Youth (ახალგაზრდები)', 'გულმკერდი (სმ)': '78-84', 'წელი (სმ)': '68-72' },
      { 'სიმაღლე (სმ)': '160-170 სმ', 'სპორტული კატეგორია': 'Adults (უფროსები)', 'გულმკერდი (სმ)': '84-92', 'წელი (სმ)': '72-78' },
      { 'სიმაღლე (სმ)': '170-180 სმ', 'სპორტული კატეგორია': 'Adults L (უფროსები)', 'გულმკერდი (სმ)': '92-100', 'წელი (სმ)': '78-86' },
      { 'სიმაღლე (სმ)': '180+ სმ', 'სპორტული კატეგორია': 'Adults XL (მაღალი)', 'გულმკერდი (სმ)': '100+', 'წელი (სმ)': '86+' },
    ]
  }
];

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'ლათინური პროფესიონალური კაბა "Fiery Rhythm"',
    slug: 'fiery-latin-rhythm-dress',
    description: 'პრემიუმ კლასის ლათინური საცეკვაო კაბა, დამზადებული იტალიური ელასტიური მაქმანისა და კრეპისგან. იდეალურად ერგება სხეულის მოძრაობას ყოველი ბრუნისას.',
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
      { id: 'v-1', product_id: 'prod-1', size: '140-150 სმ', color: 'შავი', stock: 5, price_modifier: 0 },
      { id: 'v-2', product_id: 'prod-1', size: '150-160 სმ', color: 'შავი', stock: 12, price_modifier: 0 },
      { id: 'v-3', product_id: 'prod-1', size: '160-170 სმ', color: 'შავი', stock: 8, price_modifier: 0 },
      { id: 'v-4', product_id: 'prod-1', size: '170-180 სმ', color: 'წითელი', stock: 4, price_modifier: 20.00 },
    ]
  },
  {
    id: 'prod-2',
    name: 'კაცის ლათინური სავარჯიშო პერანგი',
    slug: 'gentlemen-latin-practice-shirt',
    description: 'სუნთქვადი, ტენგამძლე ელასტიური პერანგი, შექმნილი სპეციალურად სამეჯლისო და ლათინური ცეკვების ინტენსიური ვარჯიშებისთვის.',
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
      { id: 'v-5', product_id: 'prod-2', size: '160-170 სმ', color: 'კლასიკური შავი', stock: 8, price_modifier: 0 },
      { id: 'v-6', product_id: 'prod-2', size: '170-180 სმ', color: 'კლასიკური შავი', stock: 15, price_modifier: 0 },
      { id: 'v-6b', product_id: 'prod-2', size: '180+ სმ', color: 'კლასიკური შავი', stock: 6, price_modifier: 0 },
    ]
  },
  {
    id: 'prod-3',
    name: 'ლათინური საცეკვაო ფეხსაცმელი "Elise Satin"',
    slug: 'elise-standard-dance-shoes',
    description: 'ხელით დამზადებული პროფესიონალური საცეკვაო ფეხსაცმელი სპეციალური ქუსლის ბალანსით და ორმაგი რბილი შიდა ბალიშით.',
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
      { id: 'v-7', product_id: 'prod-3', size: '36', color: 'ხორცისფერი ატლასი', heel_height: '6.5 სმ Slim', stock: 6, price_modifier: 0 },
      { id: 'v-8', product_id: 'prod-3', size: '37', color: 'ხორცისფერი ატლასი', heel_height: '7.0 სმ Slim', stock: 9, price_modifier: 0 },
      { id: 'v-9', product_id: 'prod-3', size: '38', color: 'ხორცისფერი ატლასი', heel_height: '7.5 სმ Slim', stock: 12, price_modifier: 0 },
      { id: 'v-10', product_id: 'prod-3', size: '39', color: 'ხორცისფერი ატლასი', heel_height: '7.5 სმ Slim', stock: 5, price_modifier: 0 },
      { id: 'v-11', product_id: 'prod-3', size: '40', color: 'ხორცისფერი ატლასი', heel_height: '7.5 სმ Slim', stock: 3, price_modifier: 0 },
    ]
  },
  {
    id: 'prod-4',
    name: 'საბავშვო საცეკვაო ფეხსაცმელი "Juvenile Star"',
    slug: 'juvenile-star-dance-shoes',
    description: 'სპეციალურად ბავშვებისთვის (Juvenile) შექმნილი უსაფრთხო, დაბალქუსლიანი (3.5 სმ Block) საცეკვაო ფეხსაცმელი WDSF რეგლამენტის სრული დაცვით.',
    price: 110.00,
    brand: 'DanceShop Kids',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop'
    ],
    category_slug: 'kids',
    category_id: 'cat-3',
    size_chart_id: 'sc-shoes',
    status: 'active',
    rating: 4.8,
    variants: [
      { id: 'v-12', product_id: 'prod-4', size: '25', color: 'ოქროსფერი ატლასი', heel_height: '3.5 სმ Block', stock: 8, price_modifier: 0 },
      { id: 'v-13', product_id: 'prod-4', size: '28', color: 'ოქროსფერი ატლასი', heel_height: '3.5 სმ Block', stock: 10, price_modifier: 0 },
      { id: 'v-14', product_id: 'prod-4', size: '31', color: 'ოქროსფერი ატლასი', heel_height: '3.5 სმ Block', stock: 7, price_modifier: 0 },
      { id: 'v-15', product_id: 'prod-4', size: '34', color: 'ოქროსფერი ატლასი', heel_height: '3.5 სმ Block', stock: 4, price_modifier: 0 },
    ]
  }
];

export const activeCategoriesStore = [...mockCategories];
export const activeProductsStore = [...mockProducts];
export const activeSizeChartsStore = [...mockSizeCharts];
export const wishlistStore: string[] = ['prod-1'];
