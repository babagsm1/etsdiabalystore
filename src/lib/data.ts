
import { Product, CartItem, Testimonial, Order, CustomerInfo } from './types';
import { v4 as uuidv4 } from 'uuid';

// Mock Data for Products
const productsData: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro M1',
    description: 'Ordinateur portable Apple avec processeur M1, 8GB RAM, 256GB SSD',
    price: 675000,
    oldPrice: 750000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1626&q=80',
    category: 'Ordinateurs',
    featured: true,
    stock: 10
  },
  {
    id: '2',
    name: 'iPhone 15 Pro',
    description: 'Smartphone Apple avec écran 6.1", 256GB de stockage, couleur Titane',
    price: 550000,
    image: 'https://images.unsplash.com/photo-1678685387845-62e21232281e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    category: 'Smartphones',
    featured: true,
    stock: 15
  },
  {
    id: '3',
    name: 'Samsung Galaxy S23 Ultra',
    description: 'Smartphone Samsung avec écran 6.8", 512GB de stockage, 12GB RAM',
    price: 480000,
    oldPrice: 500000,
    image: 'https://images.unsplash.com/photo-1678685387832-a75975c3ca59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    category: 'Smartphones',
    featured: true,
    stock: 8
  },
  {
    id: '4',
    name: 'Dell XPS 15',
    description: 'Ordinateur portable Dell avec processeur Intel i7, 16GB RAM, 512GB SSD',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
    category: 'Ordinateurs',
    stock: 5
  },
  {
    id: '5',
    name: 'iPad Pro 12.9"',
    description: 'Tablette Apple avec écran 12.9", M2 chip, 256GB de stockage',
    price: 375000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1633&q=80',
    category: 'Tablettes',
    stock: 12
  },
  {
    id: '6',
    name: 'AirPods Pro 2',
    description: 'Écouteurs sans fil Apple avec annulation active du bruit',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1606741965429-5a66b36320ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1633&q=80',
    category: 'Accessoires',
    stock: 20
  },
  {
    id: '7',
    name: 'Sony WH-1000XM5',
    description: 'Casque sans fil Sony avec annulation active du bruit',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1646&q=80',
    category: 'Accessoires',
    stock: 7
  },
  {
    id: '8',
    name: 'Microsoft Surface Laptop 5',
    description: 'Ordinateur portable Microsoft avec processeur Intel i5, 8GB RAM, 256GB SSD',
    price: 425000,
    image: 'https://images.unsplash.com/photo-1661961110372-8a7682543120?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Ordinateurs',
    stock: 6
  }
];

// Mock Data for Testimonials
const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Yawo Komla',
    country: 'Togo',
    comment: 'Produits de qualité et service impeccable ! Je recommande.',
    rating: 5
  },
  {
    id: '2',
    name: 'Awa Zongo',
    country: 'Burkina Faso',
    comment: "J'ai trouvé tout ce dont j'avais besoin pour mon bureau. Bravo !",
    rating: 4
  },
  {
    id: '3',
    name: 'Kodjo Tchegan',
    country: 'Togo',
    comment: 'Super site avec une bonne interface utilisateur.',
    rating: 5
  },
  {
    id: '4',
    name: 'Moussa Diabaté',
    country: 'Bénin',
    comment: 'Commande rapide et produits authentiques. Merci !',
    rating: 4
  },
  {
    id: '5',
    name: 'Mariam Sawadogo',
    country: 'Burkina Faso',
    comment: 'Service clientèle très réactif, je suis satisfaite.',
    rating: 5
  }
];

// Cart Data (localStorage mock)
const CART_STORAGE_KEY = 'computer_business_cart';
const ORDERS_STORAGE_KEY = 'computer_business_orders';
const TESTIMONIALS_STORAGE_KEY = 'computer_business_testimonials';

// Product Functions
export const getAllProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData);
    }, 500); // Simulate network delay
  });
};

export const getFeaturedProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData.filter(product => product.featured));
    }, 500); // Simulate network delay
  });
};

export const getProductById = (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData.find(product => product.id === id));
    }, 300); // Simulate network delay
  });
};

// Cart Functions
export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  const cart = localStorage.getItem(CART_STORAGE_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product: Product, quantity: number = 1): void => {
  if (typeof window === 'undefined') return;
  
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
  
  if (existingItemIndex !== -1) {
    // Update quantity if product already in cart
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cart.push({ product, quantity });
  }
  
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

export const updateCartItemQuantity = (productId: string, quantity: number): void => {
  if (typeof window === 'undefined') return;
  
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.product.id === productId);
  
  if (itemIndex !== -1) {
    cart[itemIndex].quantity = quantity;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }
};

export const removeFromCart = (productId: string): void => {
  if (typeof window === 'undefined') return;
  
  const cart = getCart();
  const updatedCart = cart.filter(item => item.product.id !== productId);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
};

export const clearCart = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]));
};

export const getCartItemCount = (): number => {
  if (typeof window === 'undefined') return 0;
  
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

// Testimonial Functions
export const getTestimonials = (): Testimonial[] => {
  if (typeof window === 'undefined') return testimonialsData;
  
  const savedTestimonials = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
  
  if (savedTestimonials) {
    // Combine saved testimonials with predefined ones
    const parsedTestimonials = JSON.parse(savedTestimonials);
    // Make sure predefined testimonials are always included
    const allTestimonials = [...testimonialsData];
    
    // Add user testimonials that aren't in the predefined list
    parsedTestimonials.forEach((userTestimonial: Testimonial) => {
      if (!allTestimonials.some(t => t.id === userTestimonial.id)) {
        allTestimonials.push(userTestimonial);
      }
    });
    
    return allTestimonials;
  }
  
  return testimonialsData;
};

export const addTestimonial = (testimonial: Omit<Testimonial, 'id'>): Testimonial => {
  if (typeof window === 'undefined') throw new Error('Cannot add testimonial on server');
  
  const newTestimonial = {
    ...testimonial,
    id: uuidv4() // Generate unique ID
  };
  
  const savedTestimonials = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
  const testimonials = savedTestimonials ? JSON.parse(savedTestimonials) : [];
  
  const updatedTestimonials = [...testimonials, newTestimonial];
  localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(updatedTestimonials));
  
  return newTestimonial;
};

// Order Functions
export const createOrder = (items: CartItem[], customerInfo: CustomerInfo): Order => {
  if (typeof window === 'undefined') throw new Error('Cannot create order on server');
  
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const newOrder: Order = {
    id: uuidv4(),
    items,
    customerInfo,
    date: new Date().toISOString(),
    status: 'pending',
    total
  };
  
  const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
  const orders = savedOrders ? JSON.parse(savedOrders) : [];
  
  const updatedOrders = [...orders, newOrder];
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
  
  return newOrder;
};

export const getOrders = (): Order[] => {
  if (typeof window === 'undefined') return [];
  
  const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
  return savedOrders ? JSON.parse(savedOrders) : [];
};

export const updateOrderStatus = (orderId: string, status: Order['status']): void => {
  if (typeof window === 'undefined') return;
  
  const orders = getOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex !== -1) {
    orders[orderIndex].status = status;
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }
};
