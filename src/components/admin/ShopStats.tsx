
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShopStats as ShopStatsType } from '@/lib/types';
import { getShopStats, getAllProducts, getPendingOrders, getApprovedTestimonials } from '@/lib/data';
import { Package, ShoppingBag, Users, DollarSign } from 'lucide-react';

const ShopStats = () => {
  const [stats, setStats] = useState<ShopStatsType>({
    productCount: 0,
    pendingOrdersCount: 0,
    testimonialCount: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      const products = await getAllProducts();
      const pendingOrders = getPendingOrders();
      const testimonials = getApprovedTestimonials();
      
      setStats({
        productCount: products.length,
        pendingOrdersCount: pendingOrders.length,
        testimonialCount: testimonials.length,
        totalRevenue: getShopStats().totalRevenue
      });
    };
    
    loadStats();
  }, []);

  const StatCard = ({ title, value, icon, textColor }: { title: string, value: string, icon: React.ReactNode, textColor: string }) => (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className={`p-3 rounded-full ${textColor.replace('text-', 'bg-')}/10 mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className={`text-2xl font-bold ${textColor}`}>{value}</h3>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Produits"
        value={`${stats.productCount}`}
        icon={<Package className="h-5 w-5 text-blue-500" />}
        textColor="text-blue-500"
      />
      <StatCard
        title="Commandes en attente"
        value={`${stats.pendingOrdersCount}`}
        icon={<ShoppingBag className="h-5 w-5 text-yellow-500" />}
        textColor="text-yellow-500"
      />
      <StatCard
        title="Témoignages"
        value={`${stats.testimonialCount}`}
        icon={<Users className="h-5 w-5 text-purple-500" />}
        textColor="text-purple-500"
      />
      <StatCard
        title="Revenu total"
        value={`${stats.totalRevenue.toLocaleString()} FCFA`}
        icon={<DollarSign className="h-5 w-5 text-green-500" />}
        textColor="text-green-500"
      />
    </div>
  );
};

export default ShopStats;
