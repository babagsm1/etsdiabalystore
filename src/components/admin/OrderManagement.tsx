
import { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '@/lib/data';
import { Order } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Package, 
  Truck, 
  Check, 
  PackageX,
  AlertCircle,
  Search,
  Eye
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    try {
      // Récupérer les commandes et les trier par date (la plus récente en premier)
      const allOrders = getOrders();
      console.log("Commandes brutes récupérées:", allOrders);
      
      const sortedOrders = [...allOrders].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setOrders(sortedOrders);
      console.log("Commandes triées chargées:", sortedOrders);
    } catch (error) {
      console.error("Erreur lors du chargement des commandes:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les commandes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    try {
      updateOrderStatus(orderId, newStatus);
      loadOrders();
      toast({
        title: "Statut mis à jour",
        description: `La commande #${orderId.substring(0, 8)} a été mise à jour avec succès.`,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du statut.",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500 text-white">En attente</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500 text-white">En traitement</Badge>;
      case 'shipped':
        return <Badge className="bg-indigo-500 text-white">Expédié</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500 text-white">Livré</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 text-white">Annulé</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'processing':
        return <Package className="h-4 w-4 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-indigo-500" />;
      case 'delivered':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <PackageX className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des commandes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher par ID, nom ou email..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select
                value={statusFilter || ""}
                onValueChange={(value) => setStatusFilter(value || null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="processing">En traitement</SelectItem>
                  <SelectItem value="shipped">Expédié</SelectItem>
                  <SelectItem value="delivered">Livré</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Chargement des commandes...
                    </TableCell>
                  </TableRow>
                ) : filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Aucune commande trouvée
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id.substring(0, 8)}</TableCell>
                      <TableCell>
                        <div className="font-medium">{order.customerInfo.name}</div>
                        <div className="text-xs text-muted-foreground">{order.customerInfo.email}</div>
                      </TableCell>
                      <TableCell>{formatDate(order.date)}</TableCell>
                      <TableCell>{order.total.toLocaleString()} FCFA</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          {getStatusBadge(order.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => viewOrderDetails(order)}>
                                <Eye className="h-4 w-4 mr-1" /> Voir
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Détails de la commande #{order.id.substring(0, 8)}</DialogTitle>
                                <DialogDescription>
                                  Commande passée le {formatDate(order.date)}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h3 className="text-sm font-medium mb-2">Information Client</h3>
                                    <div className="space-y-1 text-sm">
                                      <p><span className="font-medium">Nom:</span> {order.customerInfo.name}</p>
                                      <p><span className="font-medium">Email:</span> {order.customerInfo.email}</p>
                                      <p><span className="font-medium">Téléphone:</span> {order.customerInfo.phone}</p>
                                      <p><span className="font-medium">Adresse:</span> {order.customerInfo.address}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-medium mb-2">Statut de la commande</h3>
                                    <div className="flex items-center gap-2 mb-4">
                                      {getStatusIcon(order.status)}
                                      {getStatusBadge(order.status)}
                                    </div>
                                    <Select
                                      value={order.status}
                                      onValueChange={(value) => handleStatusChange(order.id, value as Order['status'])}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Changer le statut" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="pending">En attente</SelectItem>
                                        <SelectItem value="processing">En traitement</SelectItem>
                                        <SelectItem value="shipped">Expédié</SelectItem>
                                        <SelectItem value="delivered">Livré</SelectItem>
                                        <SelectItem value="cancelled">Annulé</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                
                                <div>
                                  <h3 className="text-sm font-medium mb-2">Articles commandés</h3>
                                  <div className="border rounded-lg overflow-hidden">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Produit</TableHead>
                                          <TableHead>Prix unitaire</TableHead>
                                          <TableHead>Quantité</TableHead>
                                          <TableHead>Total</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {order.items.map((item, index) => (
                                          <TableRow key={index}>
                                            <TableCell>
                                              <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded bg-gray-100 overflow-hidden">
                                                  <img 
                                                    src={item.product.images[0]} 
                                                    alt={item.product.name}
                                                    className="h-full w-full object-cover"
                                                  />
                                                </div>
                                                <span>{item.product.name}</span>
                                              </div>
                                            </TableCell>
                                            <TableCell>{item.product.price.toLocaleString()} FCFA</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{(item.product.price * item.quantity).toLocaleString()} FCFA</TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                </div>
                                
                                <div className="flex justify-end">
                                  <div className="w-full max-w-xs space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">Sous-total</span>
                                      <span>{order.total.toLocaleString()} FCFA</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">Livraison</span>
                                      <span>Calculée à la livraison</span>
                                    </div>
                                    <div className="flex justify-between font-medium pt-2 border-t">
                                      <span>Total</span>
                                      <span>{order.total.toLocaleString()} FCFA</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Select
                            value={order.status}
                            onValueChange={(value) => handleStatusChange(order.id, value as Order['status'])}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Changer le statut" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">En attente</SelectItem>
                              <SelectItem value="processing">En traitement</SelectItem>
                              <SelectItem value="shipped">Expédié</SelectItem>
                              <SelectItem value="delivered">Livré</SelectItem>
                              <SelectItem value="cancelled">Annulé</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManagement;
