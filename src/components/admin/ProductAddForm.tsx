
import { useState } from 'react';
import { Product } from '@/types/product';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
}

interface ProductAddFormProps {
  categories: Category[];
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductAddForm = ({ categories, onSave, onCancel }: ProductAddFormProps) => {
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: categories[0]?.id || '',
    image: '',
    onSale: false,
    details: []
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'originalPrice' ? parseFloat(value) || 0 : value
    }));
  };
  
  const handleCategoryChange = (value: string) => {
    setNewProduct(prev => ({
      ...prev,
      category: value
    }));
  };
  
  const handleSaleChange = (checked: boolean) => {
    setNewProduct(prev => ({
      ...prev,
      onSale: checked,
      originalPrice: checked ? (prev.price ? prev.price * 1.2 : 0) : undefined
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category || !newProduct.image) {
      return; // Basic validation
    }
    
    onSave(newProduct as Product);
  };
  
  return (
    <Card className="bg-white p-6 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold">Ajouter un nouveau produit</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du produit</Label>
            <Input
              id="name"
              name="name"
              value={newProduct.name || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select 
              value={newProduct.category}
              onValueChange={handleCategoryChange}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Prix (€)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={newProduct.price || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="onSale" className="block mb-2">En promotion</Label>
              <div className="flex items-center gap-2">
                <Switch
                  id="onSale"
                  checked={!!newProduct.onSale}
                  onCheckedChange={handleSaleChange}
                />
                <Label htmlFor="onSale">
                  {newProduct.onSale ? "Oui" : "Non"}
                </Label>
              </div>
            </div>
            
            {newProduct.onSale && (
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Prix original (€)</Label>
                <Input
                  id="originalPrice"
                  name="originalPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={newProduct.originalPrice || ''}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={newProduct.description || ''}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="image">URL de l'image</Label>
            <Input
              id="image"
              name="image"
              value={newProduct.image || ''}
              onChange={handleChange}
              required
            />
            {newProduct.image && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-2">Aperçu:</p>
                <img 
                  src={newProduct.image} 
                  alt="Aperçu du produit" 
                  className="w-32 h-32 object-cover rounded border"
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            Ajouter
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProductAddForm;
