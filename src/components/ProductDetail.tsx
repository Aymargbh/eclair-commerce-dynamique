
import { useState } from 'react';
import { X, Heart, ShoppingCart, Check, ArrowLeft, Star, Plus, Minus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/types/product';
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { Separator } from "@/components/ui/separator";

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
  const { addToCart, isInCart, increaseQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = () => {
    if (isInCart(product.id)) {
      increaseQuantity(product.id, quantity);
    } else {
      addToCart({...product, quantity});
    }
  };
  
  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="sm" onClick={onClose} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to products</span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Product Images */}
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain aspect-square"
          />
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <Button
                variant="ghost"
                size="icon"
                className={`${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-500'}`}
                onClick={handleToggleWishlist}
              >
                <Heart 
                  className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} 
                />
              </Button>
            </div>
            
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star 
                    key={index} 
                    className={`w-4 h-4 ${
                      index < product.rating 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                ({product.reviews} reviews)
              </span>
            </div>
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            
            {product.onSale && (
              <Badge className="ml-2 bg-red-500 hover:bg-red-600">
                SALE
              </Badge>
            )}
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={decreaseQty}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="mx-4 text-lg w-8 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={increaseQty}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <Button
              className="w-full text-base gap-2"
              size="lg"
              onClick={handleAddToCart}
            >
              {isInCart(product.id) ? (
                <>
                  <Check className="h-5 w-5" />
                  Add More to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-gray-50">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="p-4">
            <h3 className="font-medium mb-2">Product Details</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="specifications" className="p-4">
            <h3 className="font-medium mb-2">Technical Specifications</h3>
            <div className="space-y-2">
              {Object.entries(product.specifications || {}).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2">
                  <span className="text-gray-500">{key}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="p-4">
            <h3 className="font-medium mb-2">Customer Reviews</h3>
            <p className="text-gray-600">Based on {product.reviews} reviews</p>
            
            <div className="mt-4 space-y-4">
              {(product.reviewList || []).map((review, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{review.userName}</span>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${
                          i < review.rating 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
