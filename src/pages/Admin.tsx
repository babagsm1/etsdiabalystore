
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Package, ShoppingBag, Users, Settings, ChevronLeft } from 'lucide-react';
import ShopStats from '@/components/admin/ShopStats';
import ProductManagement from '@/components/admin/ProductManagement';
import TestimonialManagement from '@/components/admin/TestimonialManagement';
import OrderManagement from '@/components/admin/OrderManagement';
import ShopSettings from '@/components/admin/ShopSettings';
import { Link } from 'react-router-dom';
import AdminPasswordProtection from '@/components/admin/AdminPasswordProtection';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  if (!isAuthenticated) {
    return (
      <AdminPasswordProtection 
        onSuccess={() => setIsAuthenticated(true)} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemCount={0} />
      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 text-gray-900">Administration</h1>
              <p className="text-muted-foreground">
                Gérer votre boutique et vos commandes
              </p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/">
                <Button variant="outline" className="flex items-center gap-2 hover:bg-primary/5">
                  <ChevronLeft className="h-4 w-4" />
                  Retour au site
                </Button>
              </Link>
            </div>
          </div>

          <ShopStats />

          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="bg-white border shadow-sm rounded-lg p-1 h-auto flex flex-wrap md:flex-nowrap">
              <TabsTrigger value="products" className="flex items-center data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md py-2 px-3">
                <Package className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Produits</span>
                <span className="md:hidden">Produits</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md py-2 px-3">
                <ShoppingBag className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Commandes</span>
                <span className="md:hidden">Cmd</span>
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="flex items-center data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md py-2 px-3">
                <Users className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Témoignages</span>
                <span className="md:hidden">Avis</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md py-2 px-3">
                <Settings className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Paramètres</span>
                <span className="md:hidden">Params</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <ProductManagement />
            </TabsContent>
            
            <TabsContent value="orders" className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <OrderManagement />
            </TabsContent>
            
            <TabsContent value="testimonials" className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <TestimonialManagement />
            </TabsContent>
            
            <TabsContent value="settings" className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <ShopSettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
