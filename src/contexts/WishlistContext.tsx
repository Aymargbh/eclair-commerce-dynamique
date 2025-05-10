
import { createContext, useContext, useState } from 'react';
import { toast } from "sonner";
import { Product } from '@/types/product';

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  
  const addToWishlist = (product: Product) => {
    setWishlistItems(prevItems => {
      const exists = prevItems.some(item => item.id === product.id);
      
      if (!exists) {
        toast.success(`Added ${product.name} to wishlist`);
        return [...prevItems, product];
      }
      
      return prevItems;
    });
  };
  
  const removeFromWishlist = (productId: number) => {
    setWishlistItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
    
    toast.info("Item removed from wishlist");
  };
  
  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId);
  };
  
  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
