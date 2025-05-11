
import { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Type pour le formulaire de contact
type CheckoutFormValues = {
  name: string;
  phone: string;
  address: string;
};

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Configuration du formulaire avec react-hook-form
  const form = useForm<CheckoutFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      address: ""
    }
  });
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    setIsDialogOpen(true);
  };
  
  const formatOrderMessage = (formData: CheckoutFormValues) => {
    const itemsList = cartItems.map(item => 
      `• ${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`
    ).join("%0A");
    
    return `Hello, I'd like to place an order:%0A%0A*Products:*%0A${itemsList}%0A%0A*Subtotal:* $${subtotal.toFixed(2)}%0A*Shipping:* $${shipping.toFixed(2)}%0A*Total:* $${total.toFixed(2)}%0A%0A*My Info:*%0AName: ${formData.name}%0APhone: ${formData.phone}%0AAddress: ${formData.address}`;
  };
  
  const onSubmit = (formData: CheckoutFormValues) => {
    // Numéro WhatsApp du propriétaire (à remplacer par votre numéro réel)
    const phoneNumber = "+22946905492"; // Remplacez par votre numéro avec l'indicatif du pays
    
    // Préparation du message avec les détails de la commande
    const message = formatOrderMessage(formData);
    
    // Création du lien WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Redirection vers WhatsApp
    window.open(whatsappUrl, "_blank");
    
    // Fermeture du formulaire et nettoyage du panier
    setIsDialogOpen(false);
    setIsCheckingOut(false);
    clearCart();
    
    toast.success("Votre commande a été envoyée sur WhatsApp");
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
    <>
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
            Commander via WhatsApp
          </Button>
        </CardFooter>
      </Card>
      
      {/* Dialog de formulaire de contact */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Finalisez votre commande</DialogTitle>
            <DialogDescription>
              Veuillez fournir vos informations pour finaliser la commande via WhatsApp
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez votre nom complet" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre numéro de téléphone" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse de livraison</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre adresse complète" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end pt-2">
                <Button type="submit">
                  Continuer sur WhatsApp
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Cart;
