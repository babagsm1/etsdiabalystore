
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getOrders, updateOrderStatus, getAllProducts } from '@/lib/data';
import { Order, Product } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, ShoppingBag, Users, PlusCircle, Search, Edit, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Fetch orders and products on component mount
    setOrders(getOrders());
    
    getAllProducts().then(products => {
      setProducts(products);
    });
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
    setOrders(getOrders());
    toast({
      title: "Statut mis à jour",
      description: `Le statut de la commande a été mis à jour avec succès.`
    });
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredOrders = orders.filter(order => 
    order.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemCount={0} />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-6">Administration</h1>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des commandes, produits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs defaultValue="orders" className="space-y-4">
            <TabsList>
              <TabsTrigger value="orders" className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Commandes
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center">
                <Package className="mr-2 h-4 w-4" />
                Produits
              </TabsTrigger>
              <TabsTrigger value="clients" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Clients
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des commandes</CardTitle>
                  <CardDescription>
                    Consultez et gérez toutes les commandes des clients.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredOrders.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      {searchTerm ? "Aucune commande ne correspond à votre recherche." : "Aucune commande pour le moment."}
                    </div>
                  ) : (
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredOrders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.id.slice(0, 8)}...</TableCell>
                              <TableCell>
                                <div>{order.customerInfo.name}</div>
                                <div className="text-sm text-muted-foreground">{order.customerInfo.email}</div>
                              </TableCell>
                              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                              <TableCell>{order.total.toLocaleString()} FCFA</TableCell>
                              <TableCell>
                                <Badge 
                                  className={`${getStatusColor(order.status)} text-white`}
                                >
                                  {order.status === 'pending' && 'En attente'}
                                  {order.status === 'processing' && 'En traitement'}
                                  {order.status === 'shipped' && 'Expédiée'}
                                  {order.status === 'delivered' && 'Livrée'}
                                  {order.status === 'cancelled' && 'Annulée'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <select 
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                                    className="text-sm p-1 border rounded"
                                  >
                                    <option value="pending">En attente</option>
                                    <option value="processing">En traitement</option>
                                    <option value="shipped">Expédiée</option>
                                    <option value="delivered">Livrée</option>
                                    <option value="cancelled">Annulée</option>
                                  </select>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Gestion des produits</CardTitle>
                    <CardDescription>
                      Consultez et gérez votre catalogue de produits.
                    </CardDescription>
                  </div>
                  <Button size="sm" className="flex items-center">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nouveau produit
                  </Button>
                </CardHeader>
                <CardContent>
                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      {searchTerm ? "Aucun produit ne correspond à votre recherche." : "Aucun produit pour le moment."}
                    </div>
                  ) : (
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Produit</TableHead>
                            <TableHead>Catégorie</TableHead>
                            <TableHead>Prix</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredProducts.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                                    <img 
                                      src={product.image} 
                                      alt={product.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="font-medium">{product.name}</div>
                                </div>
                              </TableCell>
                              <TableCell>{product.category}</TableCell>
                              <TableCell>{product.price.toLocaleString()} FCFA</TableCell>
                              <TableCell>{product.stock}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="clients" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Clients</CardTitle>
                  <CardDescription>
                    Consultez la liste de vos clients.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Fonctionnalité en cours de développement...
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
