
import { useState } from "react";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { Edit, Plus, Trash2 } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ProductEditForm from "./ProductEditForm";
import ProductAddForm from "./ProductAddForm";
import { useToast } from "@/components/ui/use-toast";

interface ProductManagementProps {
  products: Product[];
  categories: { id: string; name: string }[];
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
}

const ProductManagement = ({ 
  products, 
  categories, 
  onUpdateProduct, 
  onAddProduct, 
  onDeleteProduct 
}: ProductManagementProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const { toast } = useToast();

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsAddingProduct(false);
  };

  const handleAddNewClick = () => {
    setIsAddingProduct(true);
    setSelectedProduct(null);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    onUpdateProduct(updatedProduct);
    setSelectedProduct(null);
    
    toast({
      title: "Produit mis à jour",
      description: `${updatedProduct.name} a été mis à jour avec succès.`,
    });
  };

  const handleAddProduct = (newProduct: Product) => {
    onAddProduct({
      ...newProduct,
      id: Math.max(0, ...products.map(p => p.id)) + 1,
      rating: 0,
      reviews: 0,
      details: []
    });
    setIsAddingProduct(false);
    
    toast({
      title: "Produit ajouté",
      description: `${newProduct.name} a été ajouté avec succès.`,
    });
  };

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      onDeleteProduct(productToDelete.id);
      toast({
        title: "Produit supprimé",
        description: `${productToDelete.name} a été supprimé avec succès.`,
      });
      setProductToDelete(null);
    }
  };

  if (selectedProduct) {
    return (
      <ProductEditForm
        product={selectedProduct}
        categories={categories}
        onSave={handleUpdateProduct}
        onCancel={() => setSelectedProduct(null)}
      />
    );
  }

  if (isAddingProduct) {
    return (
      <ProductAddForm
        categories={categories}
        onSave={handleAddProduct}
        onCancel={() => setIsAddingProduct(false)}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestion des Produits</h2>
        <Button onClick={handleAddNewClick} className="flex items-center gap-2">
          <Plus size={16} />
          Ajouter un produit
        </Button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-12 h-12 object-cover rounded"
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  {categories.find(c => c.id === product.category)?.name || product.category}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setProductToDelete(product)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation dialog for delete */}
      <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le produit "{productToDelete?.name}" ? 
              Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteProduct}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductManagement;
