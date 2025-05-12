
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import ProductFilter from '@/components/ProductFilter';
import { Badge } from "@/components/ui/badge";
import { useProductFilter } from '@/contexts/ProductFilterContext';
import { Product } from '@/types/product';
import { getProducts } from '@/services/storageService';

interface ProductListProps {
  onProductSelect: (product: Product) => void;
}

const ProductList = ({ onProductSelect }: ProductListProps) => {
  const { searchQuery, selectedCategory, priceRange } = useProductFilter();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Chargement des produits depuis le localStorage
  useEffect(() => {
    const loadedProducts = getProducts();
    setAllProducts(loadedProducts);
  }, []);

  // Filtrage des produits
  useEffect(() => {
    let filtered = allProducts;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category === selectedCategory
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, priceRange, allProducts]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold mb-2 sm:mb-0">Products</h2>
        <ProductFilter />
      </div>
      
      {/* Applied Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {searchQuery && (
          <Badge variant="outline" className="flex items-center gap-1">
            Search: {searchQuery}
          </Badge>
        )}
        {selectedCategory && selectedCategory !== 'all' && (
          <Badge variant="outline" className="flex items-center gap-1">
            Category: {selectedCategory}
          </Badge>
        )}
        <Badge variant="outline" className="flex items-center gap-1">
          Price: ${priceRange[0]} - ${priceRange[1]}
        </Badge>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium">No products found</h3>
          <p className="text-gray-500 mt-2">Try changing your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onSelect={() => onProductSelect(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
