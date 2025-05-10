
import { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };
  
  if (cartItems.length === 0) {
    return (
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle>Your Cart</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-6">
          <ShoppingBag className="h-12 w-12 mx-auto text-gray-300" />
          <p className="mt-4 text-gray-500">Your cart is empty</p>
          <p className="text-sm text-gray-400 mt-2">Add some products to checkout</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Your Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <AnimatePresence>
          {cartItems.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-3 overflow-hidden"
            >
              <div className="bg-gray-100 rounded-md w-16 h-16 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              
              <div className="flex-grow min-w-0">
                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7 rounded-full"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="mx-2 text-sm w-6 text-center">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7 rounded-full"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 text-gray-400 hover:text-red-500"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <Separator />
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleCheckout}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? 'Processing...' : 'Checkout'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Cart;
