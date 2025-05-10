
import { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProductFilter } from '@/contexts/ProductFilterContext';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from 'lucide-react';
import { categories } from '@/data/categories';

const ProductFilter = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    priceRange, 
    setPriceRange 
  } = useProductFilter();
  
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  
  const handleApplyFilters = () => {
    setPriceRange(localPriceRange);
  };
  
  const handlePriceRangeChange = (value: number[]) => {
    setLocalPriceRange(value);
  };
  
  return (
    <div className="flex items-center gap-4">
      {/* Category Filter - Always Visible */}
      <Select 
        value={selectedCategory} 
        onValueChange={setSelectedCategory}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {/* Price Range Filter - In Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Price Filter</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <h4 className="font-medium">Price Range</h4>
            <Slider
              min={0}
              max={1000}
              step={10}
              value={localPriceRange}
              onValueChange={handlePriceRangeChange}
            />
            <div className="flex items-center justify-between text-sm">
              <span>${localPriceRange[0]}</span>
              <span>${localPriceRange[1]}</span>
            </div>
            <Button
              onClick={handleApplyFilters}
              className="w-full"
            >
              Apply Filters
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProductFilter;
