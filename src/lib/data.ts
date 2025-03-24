import { Product, CartItem, Testimonial, Order, CustomerInfo, ShopStats } from './types';
import { v4 as uuidv4 } from 'uuid';

// Mock Data for Products
const productsData: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro M1',
    description: 'Ordinateur portable Apple avec processeur M1, 8GB RAM, 256GB SSD',
    price: 675000,
    oldPrice: 750000,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1626&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    ],
    category: 'Ordinateurs',
    featured: true,
    stock: 10
  },
  {
    id: '2',
    name: 'iPhone 15 Pro',
    description: 'Smartphone Apple avec écran 6.1", 256GB de stockage, couleur Titane',
    price: 550000,
    images: [
      'https://images.unsplash.com/photo-1678685387845-62e21232281e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1678685387832-a75975c3ca59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
    ],
    category: 'Smartphones',
    featured: true,
    stock: 8
  },
  {
    id: '4',
    name: 'Dell XPS 15',
    description: 'Ordinateur portable Dell avec processeur Intel i7, 16GB RAM, 512GB SSD',
    price: 450000,
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    ],
    category: 'Ordinateurs',
    stock: 5
  },
  {
    id: '5',
    name: 'iPad Pro 12.9"',
    description: 'Tablette Apple avec écran 12.9", M2 chip, 256GB de stockage',
    price: 375000,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1633&q=80',
      'https://images.unsplash.com/photo-1589739900575-9ca4f183fefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
    ],
    category: 'Tablettes',
    stock: 12
  },
  {
    id: '6',
    name: 'AirPods Pro 2',
    description: 'Écouteurs sans fil Apple avec annulation active du bruit',
    price: 95000,
    images: [
      'https://images.unsplash.com/photo-1606741965429-5a66b36320ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1633&q=80',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
    ],
    category: 'Accessoires',
    stock: 20
  },
  {
    id: '7',
    name: 'Sony WH-1000XM5',
    description: 'Casque sans fil Sony avec annulation active du bruit',
    price: 125000,
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1646&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80'
    ],
    category: 'Accessoires',
    stock: 7
  },
  {
    id: '8',
    name: 'Microsoft Surface Laptop 5',
    description: 'Ordinateur portable Microsoft avec processeur Intel i5, 8GB RAM, 256GB SSD',
    price: 425000,
    images: [
      'https://images.unsplash.com/photo-1661961110372-8a7682543120?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1593642702909-dec73df255d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
    ],
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
    rating: 5,
    date: '2024-03-10',
    status: 'approved'
  },
  {
    id: '2',
    name: 'Awa Zongo',
    country: 'Burkina Faso',
    comment: "J'ai trouvé tout ce dont j'avais besoin pour mon bureau. Bravo !",
    rating: 4,
    date: '2024-03-15',
    status: 'approved'
  },
  {
    id: '3',
    name: 'Kodjo Tchegan',
    country: 'Togo',
    comment: 'Super site avec une bonne interface utilisateur.',
    rating: 5,
    date: '2024-04-02',
    status: 'approved'
  },
  {
    id: '4',
    name: 'Moussa Diabaté',
    country: 'Bénin',
    comment: 'Commande rapide et produits authentiques. Merci !',
    rating: 4,
    date: '2024-04-05',
    status: 'approved'
  },
  {
    id: '5',
    name: 'Mariam Sawadogo',
    country: 'Burkina Faso',
    comment: 'Service clientèle très réactif, je suis satisfaite.',
    rating: 5,
    date: '2024-03-20',
    status: 'approved'
  }
];

// Storage Keys
const PRODUCTS_STORAGE_KEY = 'ets_diabaly_products';
const CART_STORAGE_KEY = 'ets_diabaly_cart';
const ORDERS_STORAGE_KEY = 'ets_diabaly_orders';
const TESTIMONIALS_STORAGE_KEY = 'ets_diabaly_testimonials';

// Helper function to initialize local storage with default data
const initializeLocalStorage = () => {
  if (typeof window === 'undefined') return;
  
  // Initialize products if not already in local storage
  if (!localStorage.getItem(PRODUCTS_STORAGE_KEY)) {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(productsData));
  }
  
  // Initialize testimonials if not already in local storage
  if (!localStorage.getItem(TESTIMONIALS_STORAGE_KEY)) {
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(testimonialsData));
  }
  
  // Ensure orders array exists
  if (!localStorage.getItem(ORDERS_STORAGE_KEY)) {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([]));
  }
};

// Call initialization when this module is imported
if (typeof window !== 'undefined') {
  initializeLocalStorage();
}

// Product Functions
export const getAllProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(productsData);
      return;
    }
    
    const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    const products = storedProducts ? JSON.parse(storedProducts) : productsData;
    
    setTimeout(() => {
      resolve(products);
    }, 300);
  });
};

export const getFeaturedProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    getAllProducts().then(products => {
      resolve(products.filter(product => product.featured));
    });
  });
};

export const getProductById = (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    getAllProducts().then(products => {
      resolve(products.find(product => product.id === id));
    });
  });
};

export const addProduct = (product: Omit<Product, 'id'>): Promise<Product> => {
  return new Promise((resolve) => {
    const newProduct: Product = {
      ...product,
      id: uuidv4()
    };
    
    getAllProducts().then(products => {
      const updatedProducts = [...products, newProduct];
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedProducts));
      resolve(newProduct);
    });
  });
};

export const updateProduct = (product: Product): Promise<Product> => {
  return new Promise((resolve, reject) => {
    getAllProducts().then(products => {
      const index = products.findIndex(p => p.id === product.id);
      
      if (index === -1) {
        reject(new Error('Product not found'));
        return;
      }
      
      const updatedProducts = [...products];
      updatedProducts[index] = product;
      
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedProducts));
      resolve(product);
    });
  });
};

export const deleteProduct = (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    getAllProducts().then(products => {
      const updatedProducts = products.filter(product => product.id !== id);
      
      if (updatedProducts.length === products.length) {
        reject(new Error('Product not found'));
        return;
      }
      
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedProducts));
      resolve();
    });
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
  return savedTestimonials ? JSON.parse(savedTestimonials) : testimonialsData;
};

export const getApprovedTestimonials = (): Testimonial[] => {
  const allTestimonials = getTestimonials();
  return allTestimonials.filter(testimonial => testimonial.status === 'approved');
};

export const addTestimonial = (testimonial: Omit<Testimonial, 'id' | 'date' | 'status'>): Testimonial => {
  if (typeof window === 'undefined') throw new Error('Cannot add testimonial on server');
  
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: uuidv4(),
    date: new Date().toISOString().split('T')[0],
    status: 'pending'
  };
  
  const testimonials = getTestimonials();
  const updatedTestimonials = [...testimonials, newTestimonial];
  localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(updatedTestimonials));
  
  return newTestimonial;
};

export const updateTestimonialStatus = (id: string, status: 'approved' | 'rejected'): Testimonial | undefined => {
  if (typeof window === 'undefined') return undefined;
  
  const testimonials = getTestimonials();
  const index = testimonials.findIndex(t => t.id === id);
  
  if (index === -1) return undefined;
  
  testimonials[index].status = status;
  localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(testimonials));
  
  return testimonials[index];
};

// Order Functions
export const createOrder = (items: CartItem[], customerInfo: CustomerInfo): Order => {
  if (typeof window === 'undefined') throw new Error('Cannot create order on server');
  
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const newOrder: Order = {
    id: uuidv4(),
    items: JSON.parse(JSON.stringify(items)), // Créer une copie profonde pour éviter les problèmes de référence
    customerInfo,
    date: new Date().toISOString(),
    status: 'pending',
    total
  };
  
  console.log("Création d'une nouvelle commande:", newOrder);
  
  try {
    const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
    const orders = savedOrders ? JSON.parse(savedOrders) : [];
    
    const updatedOrders = [...orders, newOrder];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
    
    return newOrder;
  } catch (error) {
    console.error("Erreur lors de la création de la commande:", error);
    throw new Error("Impossible de créer la commande");
  }
};

export const getOrders = (): Order[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
    const orders = savedOrders ? JSON.parse(savedOrders) : [];
    console.log("Commandes récupérées:", orders);
    return orders;
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    return [];
  }
};

export const getPendingOrders = (): Order[] => {
  const orders = getOrders();
  return orders.filter(order => order.status === 'pending');
};

export const updateOrderStatus = (orderId: string, status: Order['status']): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const orders = getOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
      orders[orderIndex].status = status;
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
      console.log(`Statut de la commande ${orderId} mis à jour:`, status);
    } else {
      console.error(`Commande non trouvée: ${orderId}`);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut de la commande:", error);
    throw new Error("Impossible de mettre à jour le statut de la commande");
  }
};

// Shop Statistics
export const getShopStats = (): ShopStats => {
  return {
    productCount: typeof window !== 'undefined' ? getAllProducts().then(products => products.length) : 0,
    pendingOrdersCount: typeof window !== 'undefined' ? getPendingOrders().length : 0,
    testimonialCount: typeof window !== 'undefined' ? getTestimonials().filter(t => t.status === 'approved').length : testimonialsData.length,
    totalRevenue: typeof window !== 'undefined' ? 
      getOrders()
        .filter(order => order.status !== 'cancelled')
        .reduce((sum, order) => sum + order.total, 0) : 0
  };
};
