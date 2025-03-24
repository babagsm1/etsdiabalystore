
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/types';
import { addToCart } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    
    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} x ${product.name}`,
    });
    
    // Reset quantity after adding to cart
    setQuantity(1);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  return (
    <div className="group h-full flex flex-col bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="relative pt-[100%] overflow-hidden bg-gray-100">
        {/* Image carousel */}
        <div className="absolute inset-0 flex items-center justify-center">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} - Image ${index + 1}`}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              )}
              onError={(e) => {
                // Fallback if image fails to load
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300?text=Image+non+disponible';
              }}
            />
          ))}
        </div>

        {/* Navigation arrows (only show if more than one image) */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Image précédente"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Image suivante"
            >
              <ArrowRight size={16} />
            </button>
          </>
        )}

        {/* Image indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  index === currentImageIndex ? "bg-primary" : "bg-gray-300"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentImageIndex(index);
                }}
                aria-label={`Voir l'image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Product badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.featured && (
            <Badge className="bg-primary text-white">Vedette</Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-red-500 text-white">-{discount}%</Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="destructive">Rupture de stock</Badge>
          )}
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <div className="mb-2">
          <span className="text-sm text-muted-foreground">{product.category}</span>
          <h3 className="font-medium text-foreground line-clamp-2">{product.name}</h3>
        </div>
        
        <div className="flex items-baseline mb-4">
          <span className="text-lg font-bold">{product.price.toLocaleString()} FCFA</span>
          {product.oldPrice && (
            <span className="ml-2 text-sm text-muted-foreground line-through">
              {product.oldPrice.toLocaleString()} FCFA
            </span>
          )}
        </div>
        
        <div className="mt-auto">
          {product.stock > 0 ? (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <Button
                  onClick={decrementQuantity}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  disabled={quantity <= 1}
                >
                  <Minus size={14} />
                </Button>
                <div className="h-8 px-4 flex items-center justify-center border-y border-input">
                  {quantity}
                </div>
                <Button
                  onClick={incrementQuantity}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  disabled={quantity >= product.stock}
                >
                  <Plus size={14} />
                </Button>
                <span className="ml-2 text-xs text-muted-foreground">
                  {product.stock} disponible{product.stock > 1 ? 's' : ''}
                </span>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                className="w-full"
                variant="default"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Ajouter au panier
              </Button>
            </div>
          ) : (
            <Button disabled className="w-full">
              Rupture de stock
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
