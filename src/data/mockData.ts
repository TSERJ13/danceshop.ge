export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id?: string | null;
  image_url?: string;
  type?: 'clothing' | 'shoes' | 'accessories';
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
  subcategory_slug?: string;
  product_type: 'clothing' | 'shoes' | 'accessories';
  gender: 'women' | 'men' | 'kids' | 'unisex';
  size_chart_id?: string;
  status: 'active' | 'draft';
  rating: number;
  variants: ProductVariant[];
}

export const mockCategories: Category[] = [
  // Primary Sections
  { id: 'cat-women', name: 'ქალები', slug: 'women', parent_id: null },
  { id: 'cat-men', name: 'კაცები', slug: 'men', parent_id: null },
  { id: 'cat-kids', name: 'ბავშვები', slug: 'kids', parent_id: null },
  { id: 'cat-shoes', name: 'ფეხსაცმელი', slug: 'shoes', parent_id: null },
  { id: 'cat-wear', name: 'ტანსაცმელი', slug: 'dancewear', parent_id: null },
  { id: 'cat-acc', name: 'აქსესუარები', slug: 'accessories', parent_id: null },

  // Women Subcategories
  { id: 'sub-w-latin', name: 'ლათინური კაბები', slug: 'women-latin-dresses', parent_id: 'cat-women', type: 'clothing' },
  { id: 'sub-w-standard', name: 'სტანდარტის კაბები', slug: 'women-standard-dresses', parent_id: 'cat-women', type: 'clothing' },
  { id: 'sub-w-practice', name: 'ქალის სავარჯიშო (იუბკები/ტოპები)', slug: 'women-practice', parent_id: 'cat-women', type: 'clothing' },
  { id: 'sub-w-shoes', name: 'ქალის საცეკვაო ფეხსაცმელი', slug: 'women-shoes', parent_id: 'cat-women', type: 'shoes' },
  { id: 'sub-w-acc', name: 'ქალის აქსესუარები & კრისტალები', slug: 'women-accessories', parent_id: 'cat-women', type: 'accessories' },

  // Men Subcategories
  { id: 'sub-m-shirts', name: 'ლათინური პერანგები & ტოპები', slug: 'men-latin-shirts', parent_id: 'cat-men', type: 'clothing' },
  { id: 'sub-m-trousers', name: 'საცეკვაო შარვლები', slug: 'men-trousers', parent_id: 'cat-men', type: 'clothing' },
  { id: 'sub-m-tailcoat', name: 'სტანდარტის ფრაკები & ჟილეტები', slug: 'men-tailcoats', parent_id: 'cat-men', type: 'clothing' },
  { id: 'sub-m-shoes', name: 'კაცის საცეკვაო ფეხსაცმელი', slug: 'men-shoes', parent_id: 'cat-men', type: 'shoes' },
  { id: 'sub-m-acc', name: 'ჰალსტუხები, ბაბოჩკები & აქსესუარები', slug: 'men-accessories', parent_id: 'cat-men', type: 'accessories' },

  // Kids Subcategories
  { id: 'sub-k-dresses', name: 'გოგონების რეიტინგული კაბები', slug: 'kids-dresses', parent_id: 'cat-kids', type: 'clothing' },
  { id: 'sub-k-boys', name: 'ბიჭების პერანგები & შარვლები', slug: 'kids-boys', parent_id: 'cat-kids', type: 'clothing' },
  { id: 'sub-k-shoes', name: 'საბავშვო საცეკვაო ფეხსაცმელი', slug: 'kids-shoes', parent_id: 'cat-kids', type: 'shoes' },

  // Dedicated Shoes Subcategories
  { id: 'sub-s-w-latin', name: 'ქალის ლათინო', slug: 'shoes-women-latin', parent_id: 'cat-shoes', type: 'shoes' },
  { id: 'sub-s-w-std', name: 'ქალის სტანდარტი', slug: 'shoes-women-standard', parent_id: 'cat-shoes', type: 'shoes' },
  { id: 'sub-s-m-latin', name: 'კაცის ლათინო', slug: 'shoes-men-latin', parent_id: 'cat-shoes', type: 'shoes' },
  { id: 'sub-s-m-std', name: 'კაცის სტანდარტი', slug: 'shoes-men-standard', parent_id: 'cat-shoes', type: 'shoes' },
  { id: 'sub-s-kids', name: 'საბავშვო ფეხსაცმელი', slug: 'shoes-kids', parent_id: 'cat-shoes', type: 'shoes' },
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
  // --- WOMEN CLOTHING ---
  {
    id: 'prod-w-1',
    name: 'ლათინური პროფესიონალური კაბა "Fiery Rhythm"',
    slug: 'fiery-latin-rhythm-dress',
    description: 'პრემიუმ კლასის ლათინური საცეკვაო კაბა, დამზადებული იტალიური ელასტიური მაქმანისა და კრეპისგან.',
    price: 450.00,
    sale_price: 399.99,
    brand: 'TDR DANCE',
    images: [
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=600&auto=format&fit=crop'
    ],
    category_slug: 'women',
    category_id: 'cat-women',
    subcategory_slug: 'women-latin-dresses',
    product_type: 'clothing',
    gender: 'women',
    size_chart_id: 'sc-wear',
    status: 'active',
    rating: 4.9,
    variants: [
      { id: 'vw1-1', product_id: 'prod-w-1', size: '150-160 სმ', color: 'შავი', stock: 5, price_modifier: 0 },
      { id: 'vw1-2', product_id: 'prod-w-1', size: '160-170 სმ', color: 'შავი', stock: 12, price_modifier: 0 },
      { id: 'vw1-3', product_id: 'prod-w-1', size: '170-180 სმ', color: 'წითელი', stock: 4, price_modifier: 20.00 },
    ]
  },
  {
    id: 'prod-w-2',
    name: 'ქალის სავარჯიშო ლათინური იუბკა "Fringe Motion"',
    slug: 'fringe-motion-practice-skirt',
    description: 'მჩატე, ფოჩებიანი სავარჯიშო იუბკა, რომელიც იდეალურად გამოკვეთს თეძოების მოძრაობას.',
    price: 85.00,
    brand: 'DanceSport Pro',
    images: [
      'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=600&auto=format&fit=crop'
    ],
    category_slug: 'women',
    category_id: 'cat-women',
    subcategory_slug: 'women-practice',
    product_type: 'clothing',
    gender: 'women',
    size_chart_id: 'sc-wear',
    status: 'active',
    rating: 4.8,
    variants: [
      { id: 'vw2-1', product_id: 'prod-w-2', size: '150-160 სმ', color: 'შავი', stock: 10, price_modifier: 0 },
      { id: 'vw2-2', product_id: 'prod-w-2', size: '160-170 სმ', color: 'შავი', stock: 15, price_modifier: 0 },
    ]
  },

  // --- WOMEN SHOES ---
  {
    id: 'prod-w-shoe-1',
    name: 'ქალის ლათინური ფეხსაცმელი "Elise Satin 7.5cm"',
    slug: 'elise-satin-latin-shoes',
    description: 'ხელით დამზადებული პროფესიონალური ლათინური ფეხსაცმელი ორმაგი რბილი ბალიშით.',
    price: 180.00,
    brand: 'Ray Rose',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop'
    ],
    category_slug: 'shoes',
    category_id: 'cat-shoes',
    subcategory_slug: 'shoes-women-latin',
    product_type: 'shoes',
    gender: 'women',
    size_chart_id: 'sc-shoes',
    status: 'active',
    rating: 5.0,
    variants: [
      { id: 'vws1-1', product_id: 'prod-w-shoe-1', size: '36', color: 'ხორცისფერი ატლასი', heel_height: '6.5 სმ Slim', stock: 6, price_modifier: 0 },
      { id: 'vws1-2', product_id: 'prod-w-shoe-1', size: '37', color: 'ხორცისფერი ატლასი', heel_height: '7.0 სმ Slim', stock: 9, price_modifier: 0 },
      { id: 'vws1-3', product_id: 'prod-w-shoe-1', size: '38', color: 'ხორცისფერი ატლასი', heel_height: '7.5 სმ Slim', stock: 12, price_modifier: 0 },
      { id: 'vws1-4', product_id: 'prod-w-shoe-1', size: '39', color: 'ხორცისფერი ატლასი', heel_height: '7.5 სმ Slim', stock: 5, price_modifier: 0 },
    ]
  },
  {
    id: 'prod-w-shoe-2',
    name: 'ქალის სტანდარტის ფეხსაცმელი "Court Classic"',
    slug: 'court-classic-standard-shoes',
    description: 'დახურული ცხვირით, იდეალური ბალანსითა და სტაბილური ქუსლით სამეჯლისო სტანდარტისთვის.',
    price: 195.00,
    brand: 'Supadance',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop'
    ],
    category_slug: 'shoes',
    category_id: 'cat-shoes',
    subcategory_slug: 'shoes-women-standard',
    product_type: 'shoes',
    gender: 'women',
    size_chart_id: 'sc-shoes',
    status: 'active',
    rating: 4.9,
    variants: [
      { id: 'vws2-1', product_id: 'prod-w-shoe-2', size: '36', color: 'თეთრი ატლასი', heel_height: '6.5 სმ Contour', stock: 4, price_modifier: 0 },
      { id: 'vws2-2', product_id: 'prod-w-shoe-2', size: '37', color: 'ხორცისფერი ატლასი', heel_height: '6.5 სმ Contour', stock: 7, price_modifier: 0 },
      { id: 'vws2-3', product_id: 'prod-w-shoe-2', size: '38', color: 'ხორცისფერი ატლასი', heel_height: '6.5 სმ Contour', stock: 10, price_modifier: 0 },
    ]
  },

  // --- MEN CLOTHING ---
  {
    id: 'prod-m-1',
    name: 'კაცის ლათინური პერანგი "V-Neck Pro"',
    slug: 'gentlemen-latin-practice-shirt',
    description: 'სუნთქვადი, ტენგამძლე ელასტიური პერანგი, შექმნილი ლათინური ცეკვების ვარჯიშისა და გამოსვლებისთვის.',
    price: 120.00,
    brand: 'DanceSport Pro',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop'
    ],
    category_slug: 'men',
    category_id: 'cat-men',
    subcategory_slug: 'men-latin-shirts',
    product_type: 'clothing',
    gender: 'men',
    size_chart_id: 'sc-wear',
    status: 'active',
    rating: 4.7,
    variants: [
      { id: 'vm1-1', product_id: 'prod-m-1', size: '160-170 სმ', color: 'კლასიკური შავი', stock: 8, price_modifier: 0 },
      { id: 'vm1-2', product_id: 'prod-m-1', size: '170-180 სმ', color: 'კლასიკური შავი', stock: 15, price_modifier: 0 },
      { id: 'vm1-3', product_id: 'prod-m-1', size: '180+ სმ', color: 'კლასიკური შავი', stock: 6, price_modifier: 0 },
    ]
  },
  {
    id: 'prod-m-2',
    name: 'კაცის საცეკვაო შარვალი "Satin Stripe Trousers"',
    slug: 'latin-standard-dance-trousers',
    description: 'სპეციალური თარგის საცეკვაო შარვალი ატლასის გვერდითი ზოლით, მაღალი წელით და შტრიპკებით.',
    price: 140.00,
    brand: 'TDR DANCE',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop'
    ],
    category_slug: 'men',
    category_id: 'cat-men',
    subcategory_slug: 'men-trousers',
    product_type: 'clothing',
    gender: 'men',
    size_chart_id: 'sc-wear',
    status: 'active',
    rating: 4.9,
    variants: [
      { id: 'vm2-1', product_id: 'prod-m-2', size: '160-170 სმ', color: 'შავი', stock: 7, price_modifier: 0 },
      { id: 'vm2-2', product_id: 'prod-m-2', size: '170-180 სმ', color: 'შავი', stock: 12, price_modifier: 0 },
      { id: 'vm2-3', product_id: 'prod-m-2', size: '180+ სმ', color: 'შავი', stock: 5, price_modifier: 0 },
    ]
  },

  // --- MEN SHOES ---
  {
    id: 'prod-m-shoe-1',
    name: 'კაცის ლათინური ფეხსაცმელი "Latin Leather 4cm"',
    slug: 'men-latin-leather-shoes',
    description: 'რბილი ნატურალური ტყავის ლათინური ფეხსაცმელი 4.0 სმ ქუსლით და მოქნილი ძირით.',
    price: 175.00,
    brand: 'Ray Rose',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop'
    ],
    category_slug: 'shoes',
    category_id: 'cat-shoes',
    subcategory_slug: 'shoes-men-latin',
    product_type: 'shoes',
    gender: 'men',
    size_chart_id: 'sc-shoes',
    status: 'active',
    rating: 4.9,
    variants: [
      { id: 'vms1-1', product_id: 'prod-m-shoe-1', size: '41', color: 'შავი ტყავი', heel_height: '4.0 სმ Latin', stock: 5, price_modifier: 0 },
      { id: 'vms1-2', product_id: 'prod-m-shoe-1', size: '42', color: 'შავი ტყავი', heel_height: '4.0 სმ Latin', stock: 8, price_modifier: 0 },
      { id: 'vms1-3', product_id: 'prod-m-shoe-1', size: '43', color: 'შავი ტყავი', heel_height: '4.0 სმ Latin', stock: 10, price_modifier: 0 },
      { id: 'vms1-4', product_id: 'prod-m-shoe-1', size: '44', color: 'შავი ტყავი', heel_height: '4.0 სმ Latin', stock: 4, price_modifier: 0 },
    ]
  },

  // --- KIDS CLOTHING & SHOES ---
  {
    id: 'prod-k-1',
    name: 'გოგონას რეიტინგული კაბა "Juvenile Velvet"',
    slug: 'juvenile-rating-dress',
    description: 'WDSF წესების სრული დაცვით შექმნილი რეიტინგული კაბა ბავშვებისთვის (Juvenile 1 & 2).',
    price: 95.00,
    brand: 'DanceShop Kids',
    images: [
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop'
    ],
    category_slug: 'kids',
    category_id: 'cat-kids',
    subcategory_slug: 'kids-dresses',
    product_type: 'clothing',
    gender: 'kids',
    size_chart_id: 'sc-wear',
    status: 'active',
    rating: 5.0,
    variants: [
      { id: 'vk1-1', product_id: 'prod-k-1', size: '110-120 სმ', color: 'იასამნისფერი', stock: 6, price_modifier: 0 },
      { id: 'vk1-2', product_id: 'prod-k-1', size: '120-130 სმ', color: 'წითელი', stock: 9, price_modifier: 0 },
      { id: 'vk1-3', product_id: 'prod-k-1', size: '130-140 სმ', color: 'ლურჯი', stock: 7, price_modifier: 0 },
    ]
  },
  {
    id: 'prod-k-shoe-1',
    name: 'საბავშვო საცეკვაო ფეხსაცმელი "Juvenile Star (25-34)"',
    slug: 'juvenile-star-dance-shoes',
    description: 'საბავშვო საცეკვაო ფეხსაცმელი (ზომები 25-დან 34-მდე) უსაფრთხო 3.5 სმ Block ქუსლით.',
    price: 110.00,
    brand: 'DanceShop Kids',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop'
    ],
    category_slug: 'shoes',
    category_id: 'cat-shoes',
    subcategory_slug: 'shoes-kids',
    product_type: 'shoes',
    gender: 'kids',
    size_chart_id: 'sc-shoes',
    status: 'active',
    rating: 4.8,
    variants: [
      { id: 'vks1-1', product_id: 'prod-k-shoe-1', size: '25', color: 'ოქროსფერი ატლასი', heel_height: '3.5 სმ Block', stock: 8, price_modifier: 0 },
      { id: 'vks1-2', product_id: 'prod-k-shoe-1', size: '28', color: 'ოქროსფერი ატლასი', heel_height: '3.5 სმ Block', stock: 10, price_modifier: 0 },
      { id: 'vks1-3', product_id: 'prod-k-shoe-1', size: '31', color: 'ოქროსფერი ატლასი', heel_height: '3.5 სმ Block', stock: 7, price_modifier: 0 },
      { id: 'vks1-4', product_id: 'prod-k-shoe-1', size: '34', color: 'ოქროსფერი ატლასი', heel_height: '3.5 სმ Block', stock: 4, price_modifier: 0 },
    ]
  },

  // --- ACCESSORIES ---
  {
    id: 'prod-acc-1',
    name: 'საცეკვაო ავტორუჯი "Sexy Bronze Tan Spray"',
    slug: 'sexy-bronze-tanning-spray',
    description: 'პროფესიონალური საცეკვაო ავტორუჯი ტურნირებისთვის, რომელიც არ ტოვებს ლაქებს ტანსაცმელზე.',
    price: 45.00,
    brand: 'DanceTan Pro',
    images: [
      'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=600&auto=format&fit=crop'
    ],
    category_slug: 'accessories',
    category_id: 'cat-acc',
    subcategory_slug: 'women-accessories',
    product_type: 'accessories',
    gender: 'unisex',
    status: 'active',
    rating: 4.9,
    variants: [
      { id: 'vacc1-1', product_id: 'prod-acc-1', size: '200ml', color: 'Dark Bronze', stock: 25, price_modifier: 0 }
    ]
  }
];

export const activeCategoriesStore = [...mockCategories];
export const activeProductsStore = [...mockProducts];
export const activeSizeChartsStore = [...mockSizeCharts];
export const wishlistStore: string[] = ['prod-w-1'];
