import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getCart, updateCartItemQuantity, removeFromCart, clearCart, getCartItemCount, createOrder } from '@/lib/data';
import { CartItem, CustomerInfo } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setCartItems(getCart());
    window.scrollTo(0, 0);
  }, []);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(id, newQuantity);
      setCartItems(getCart());
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    setCartItems(getCart());
    toast({
      title: "Article retiré",
      description: "L'article a été retiré de votre panier."
    });
  };

  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
    toast({
      title: "Panier vidé",
      description: "Tous les articles ont été retirés de votre panier."
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      toast({
        title: "Informations incomplètes",
        description: "Veuillez remplir tous les champs du formulaire.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Tentative de création de commande avec les données:", {
        cartItems,
        customerInfo
      });
      
      // Create the order
      const newOrder = createOrder(cartItems, customerInfo);
      console.log("Commande créée avec succès:", newOrder);
      
      toast({
        title: "Commande effectuée avec succès",
        description: "Nous vous contacterons prochainement pour finaliser votre commande."
      });
      
      clearCart();
      setCartItems([]);
      setCustomerInfo({
        name: '',
        email: '',
        phone: '',
        address: '',
      });
      setIsSubmitting(false);
      setShowForm(false);
      
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de la commande.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const cartContent = (
    <>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 min-h-[50vh] text-center">
          <div className="p-6 rounded-full bg-secondary mb-6">
            <ShoppingCart size={48} className="text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-display font-medium mb-3">Votre panier est vide</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Vous n'avez pas encore ajouté de produits à votre panier. Découvrez notre catalogue pour trouver ce qu'il vous faut.
          </p>
          <Link to="/shop">
            <Button>
              <ArrowLeft size={16} className="mr-2" />
              Continuer les achats
            </Button>
          </Link>
        </div>
      ) : (
        <div className="py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl md:text-3xl font-display font-medium">Votre panier</h1>
              <button
                onClick={handleClearCart}
                className="text-sm text-destructive hover:text-destructive/80 transition-colors flex items-center"
              >
                <Trash2 size={14} className="mr-1" />
                Vider le panier
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-border/40 overflow-hidden">
                  <div className="divide-y divide-border/60">
                    <AnimatePresence>
                      {cartItems.map((item) => (
                        <motion.div 
                          key={item.product.id}
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                          className="p-4 md:p-6 flex flex-col md:flex-row gap-4"
                        >
                          <div className="aspect-square w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0 mx-auto md:mx-0">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{item.product.name}</h3>
                              <button
                                onClick={() => handleRemoveItem(item.product.id)}
                                className="text-gray-400 hover:text-destructive transition-colors"
                                aria-label="Retirer du panier"
                              >
                                <X size={18} />
                              </button>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{item.product.category}</p>
                            <div className="flex justify-between items-end mt-2">
                              <div className="flex items-center border border-gray-200 rounded-md">
                                <button
                                  onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                                  aria-label="Diminuer la quantité"
                                >
                                  -
                                </button>
                                <span className="px-3 py-1 text-center w-10">{item.quantity}</span>
                                <button
                                  onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                                  aria-label="Augmenter la quantité"
                                >
                                  +
                                </button>
                              </div>
                              <p className="font-medium">{(item.product.price * item.quantity).toLocaleString()} FCFA</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link to="/shop">
                    <Button variant="outline" className="text-sm">
                      <ArrowLeft size={16} className="mr-2" />
                      Continuer les achats
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-xl shadow-sm border border-border/40 p-6">
                  <h3 className="text-lg font-medium mb-4">Résumé de la commande</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span>{totalAmount.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Livraison</span>
                      <span>Calculé à la livraison</span>
                    </div>
                    <div className="border-t border-border/60 pt-3 flex justify-between font-medium">
                      <span>Total</span>
                      <span>{totalAmount.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                  
                  {!showForm ? (
                    <Button 
                      className="w-full" 
                      onClick={() => setShowForm(true)}
                    >
                      Passer commande
                    </Button>
                  ) : (
                    <form onSubmit={handleSubmitOrder} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={customerInfo.name}
                          onChange={handleInputChange}
                          className="glass-input w-full"
                          placeholder="Votre nom"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={customerInfo.email}
                          onChange={handleInputChange}
                          className="glass-input w-full"
                          placeholder="votre@email.com"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={customerInfo.phone}
                          onChange={handleInputChange}
                          className="glass-input w-full"
                          placeholder="+228 xxxxxxxx"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1">
                          Adresse de livraison
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={customerInfo.address}
                          onChange={handleInputChange}
                          className="glass-input w-full"
                          placeholder="Votre adresse"
                        />
                      </div>
                      
                      <div className="pt-2 flex flex-col gap-2">
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Traitement en cours...' : 'Confirmer la commande'}
                        </Button>
                        
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => setShowForm(false)}
                          disabled={isSubmitting}
                        >
                          Annuler
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemCount={getCartItemCount()} />
      <main className="flex-grow pt-24 pb-16">
        {cartContent}
      </main>
      <Footer />
    </div>
  );
};
