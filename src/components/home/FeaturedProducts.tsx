
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/shop/ProductCard';
import { ArrowRight } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { getFeaturedProducts } from '@/lib/data';
import { Product } from '@/lib/types';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const featuredProducts = await getFeaturedProducts();
        setProducts(featuredProducts);
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
              Produits Phares
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-foreground">
              Nos meilleures sélections
            </h2>
          </div>
          <Link to="/shop" className="text-primary hover:text-primary/80 transition-colors group flex items-center text-sm">
            <span>Voir tous les produits</span>
            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div 
                key={index} 
                className="bg-card rounded-xl shadow-sm p-6 animate-pulse h-[350px] flex flex-col"
              >
                <div className="bg-muted rounded-lg h-52 w-full mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-5 bg-muted rounded w-1/2 mb-3"></div>
                <div className="h-9 bg-muted rounded mt-auto"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link to="/shop">
            <AnimatedButton size="lg" variant="outline">
              Explorer la boutique
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
