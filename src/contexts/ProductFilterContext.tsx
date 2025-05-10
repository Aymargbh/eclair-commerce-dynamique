
import { createContext, useContext, useState } from 'react';

interface ProductFilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
}

const ProductFilterContext = createContext<ProductFilterContextType | undefined>(undefined);

export const ProductFilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  
  return (
    <ProductFilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
};

export const useProductFilter = () => {
  const context = useContext(ProductFilterContext);
  if (context === undefined) {
    throw new Error('useProductFilter must be used within a ProductFilterProvider');
  }
  return context;
};
