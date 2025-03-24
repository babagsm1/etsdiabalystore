
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  images: string[];
  category: string;
  featured?: boolean;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  comment: string;
  rating: number;
  date?: string;
  status?: 'pending' | 'approved' | 'rejected';
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
}

export interface ShopStats {
  productCount: number;
  pendingOrdersCount: number;
  testimonialCount: number;
  totalRevenue: number;
}

export interface ShopSettings {
  general: {
    shopName: string;
    shopEmail: string;
    shopPhone: string;
    shopAddress: string;
    enableFeaturedProducts: boolean;
    enableTestimonials: boolean;
  };
  shipping: {
    freeShippingThreshold: number;
    deliveryFee: number;
    estimatedDeliveryTime: string;
  };
  payment: {
    acceptMobileMoney: boolean;
    acceptCashOnDelivery: boolean;
    acceptBankTransfer: boolean;
    paymentInstructions: string;
  };
}
