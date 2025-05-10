
import { useState } from 'react';
import ProductList from '@/components/ProductList';
import Cart from '@/components/Cart';
import Navbar from '@/components/Navbar';
import ProductDetail from '@/components/ProductDetail';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { ProductFilterProvider } from '@/contexts/ProductFilterContext';

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  return (
    <ProductFilterProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              {selectedProduct ? (
                <ProductDetail 
                  product={selectedProduct} 
                  onClose={() => setSelectedProduct(null)}
                />
              ) : (
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-3/4">
                    <ProductList onProductSelect={setSelectedProduct} />
                  </div>
                  <div className="w-full md:w-1/4">
                    <Cart />
                  </div>
                </div>
              )}
            </main>
          </div>
        </WishlistProvider>
      </CartProvider>
    </ProductFilterProvider>
  );
};

export default Index;
