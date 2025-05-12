
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

interface ProductEditFormProps {
  product: Product;
  categories: Category[];
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductEditForm = ({ product, categories, onSave, onCancel }: ProductEditFormProps) => {
  const [editedProduct, setEditedProduct] = useState<Product>({...product});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setEditedProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'originalPrice' ? parseFloat(value) || 0 : value
    }));
  };
  
  const handleCategoryChange = (value: string) => {
    setEditedProduct(prev => ({
      ...prev,
      category: value
    }));
  };
  
  const handleSaleChange = (checked: boolean) => {
    setEditedProduct(prev => ({
      ...prev,
      onSale: checked,
      originalPrice: checked ? (prev.originalPrice || prev.price * 1.2) : undefined
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedProduct);
  };
  
  return (
    <Card className="bg-white p-6 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold">Modifier le produit</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du produit</Label>
            <Input
              id="name"
              name="name"
              value={editedProduct.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select 
              value={editedProduct.category}
              onValueChange={handleCategoryChange}
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
              value={editedProduct.price}
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
                  checked={!!editedProduct.onSale}
                  onCheckedChange={handleSaleChange}
                />
                <Label htmlFor="onSale">
                  {editedProduct.onSale ? "Oui" : "Non"}
                </Label>
              </div>
            </div>
            
            {editedProduct.onSale && (
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Prix original (€)</Label>
                <Input
                  id="originalPrice"
                  name="originalPrice"
                  type="number"
                  step="0.01"
                  value={editedProduct.originalPrice || ''}
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
              value={editedProduct.description}
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
              value={editedProduct.image}
              onChange={handleChange}
              required
            />
            {editedProduct.image && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-2">Aperçu:</p>
                <img 
                  src={editedProduct.image} 
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
            Enregistrer
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProductEditForm;
