
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Package, ShoppingBag, Users, Settings } from 'lucide-react';
import ShopStats from '@/components/admin/ShopStats';
import ProductManagement from '@/components/admin/ProductManagement';
import TestimonialManagement from '@/components/admin/TestimonialManagement';
import OrderManagement from '@/components/admin/OrderManagement';
import ShopSettings from '@/components/admin/ShopSettings';
import { Link } from 'react-router-dom';

const Admin = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemCount={0} />
      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Administration</h1>
              <p className="text-muted-foreground">
                Gérer votre boutique et vos commandes
              </p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/">
                <Button variant="outline" className="flex items-center gap-2">
                  Retour au site
                </Button>
              </Link>
            </div>
          </div>

          <ShopStats />

          <Tabs defaultValue="products" className="space-y-4">
            <TabsList className="bg-white border">
              <TabsTrigger value="products" className="flex items-center">
                <Package className="mr-2 h-4 w-4" />
                Produits
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Commandes
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Témoignages
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="products">
              <ProductManagement />
            </TabsContent>
            
            <TabsContent value="orders">
              <OrderManagement />
            </TabsContent>
            
            <TabsContent value="testimonials">
              <TestimonialManagement />
            </TabsContent>
            
            <TabsContent value="settings">
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
