export type OrderStatus = "pending" | "shipped" | "delivered";

export type ProductType =
  | "wellness-kit"
  | "herbal-powder"
  | "herbal-oil"
  | "raw-herb"
  | "combo";

export type ProductCategory = string;

export interface ProductItem {
  name: string;
  purpose: string;
  format?: string;
  group?: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortBenefit: string;
  description: string;
  type: ProductType;
  category: ProductCategory;
  subcategory?: string;
  image: string;
  problemStatement: string;
  benefits: string[];
  ingredientsFeel: string[];
  usageMethod: string[];
  whoShouldUse: string[];
  expectedTimeline: string[];
  whatsInside: ProductItem[];
  faqs: ProductFaq[];
  price: number;
  originalPrice: number;
  durationLabel: string;
  badge?: string;
  limitedStockText?: string;
  therapyLabel?: string;
  supportLine?: string;
  saveAmount?: number;
  relatedSlugs?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerSessionSummary {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface CustomerAddress {
  id: string;
  userId: string;
  label: string;
  recipientName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  userId: string;
  productId: string;
  createdAt: string;
  product: Product;
}

export interface OrderItemInput {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  email?: string;
  phone: string;
  address: string;
  userId?: string;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  items: OrderItemInput[];
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
}

export interface CheckoutPayload {
  customerName: string;
  email?: string;
  phone: string;
  address: string;
  userId?: string;
  addressId?: string;
  items: OrderItemInput[];
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
  concern?: string;
}

export interface CollectionPageContent {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  type: ProductType;
  highlight: string;
  featuredCategories: string[];
}

export interface IconCategory {
  label: string;
  description: string;
  href: string;
  badge?: string;
}
