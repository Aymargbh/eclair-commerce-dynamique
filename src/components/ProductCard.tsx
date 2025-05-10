
import { useState } from 'react';
import { Heart, ShoppingCart, Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/types/product';
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  onSelect: () => void;
}

const ProductCard = ({ product, onSelect }: ProductCardProps) => {
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card 
        className="h-full overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onSelect}
      >
        <div className="relative pt-[100%] bg-gray-100 overflow-hidden">
          {product.onSale && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 z-10">
              SALE
            </Badge>
          )}
          
          <motion.img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            initial={false}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
          
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
              isInWishlist(product.id) ? 'text-red-500' : 'text-gray-500'
            }`}
            onClick={handleToggleWishlist}
          >
            <Heart 
              className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} 
            />
          </Button>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-medium text-base line-clamp-1">{product.name}</h3>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.description}</p>
        </CardContent>
        
        <CardFooter className="px-4 pb-4 pt-0">
          <Button 
            className="w-full text-sm gap-2"
            variant={isInCart(product.id) ? "secondary" : "default"}
            onClick={handleAddToCart}
            disabled={isInCart(product.id)}
          >
            {isInCart(product.id) ? (
              <>
                <Check className="h-4 w-4" />
                Added to cart
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Add to cart
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
