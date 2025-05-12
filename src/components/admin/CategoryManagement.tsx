
import { useState } from "react";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
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

interface Category {
  id: string;
  name: string;
}

interface CategoryManagementProps {
  categories: Category[];
  products: { id: number; category: string }[];
  onUpdateCategory: (oldId: string, category: Category) => void;
  onAddCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
}

const CategoryManagement = ({ 
  categories, 
  products,
  onUpdateCategory, 
  onAddCategory, 
  onDeleteCategory 
}: CategoryManagementProps) => {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({ id: "", name: "" });
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const { toast } = useToast();

  const handleEditCategory = (category: Category) => {
    setEditingCategory({ ...category });
  };

  const handleUpdateCategory = () => {
    if (editingCategory && editingCategory.id && editingCategory.name) {
      const originalCategory = categories.find(c => c.id === editingCategory.id);
      if (originalCategory) {
        onUpdateCategory(originalCategory.id, editingCategory);
        toast({
          title: "Catégorie mise à jour",
          description: `La catégorie a été mise à jour avec succès.`,
        });
      }
      setEditingCategory(null);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.id && newCategory.name) {
      // Check if ID already exists
      if (categories.some(c => c.id === newCategory.id)) {
        toast({
          title: "Erreur",
          description: "Cet identifiant de catégorie existe déjà.",
          variant: "destructive"
        });
        return;
      }
      
      onAddCategory(newCategory);
      setNewCategory({ id: "", name: "" });
      
      toast({
        title: "Catégorie ajoutée",
        description: `La catégorie ${newCategory.name} a été ajoutée avec succès.`,
      });
    }
  };

  const confirmDeleteCategory = () => {
    if (categoryToDelete) {
      // Check if any products use this category
      const productsUsingCategory = products.filter(p => p.category === categoryToDelete.id).length;
      
      if (productsUsingCategory > 0) {
        toast({
          title: "Impossible de supprimer",
          description: `Cette catégorie est utilisée par ${productsUsingCategory} produit(s).`,
          variant: "destructive"
        });
      } else {
        onDeleteCategory(categoryToDelete.id);
        toast({
          title: "Catégorie supprimée",
          description: `La catégorie ${categoryToDelete.name} a été supprimée.`,
        });
      }
      
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestion des Catégories</h2>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Ajouter une nouvelle catégorie</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="new-id">Identifiant</Label>
            <Input 
              id="new-id" 
              value={newCategory.id} 
              onChange={(e) => setNewCategory({...newCategory, id: e.target.value.toLowerCase()})}
              placeholder="electronics"
            />
            <p className="text-xs text-muted-foreground mt-1">
              L'identifiant doit être unique et sans espaces
            </p>
          </div>
          <div>
            <Label htmlFor="new-name">Nom</Label>
            <Input 
              id="new-name" 
              value={newCategory.name} 
              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
              placeholder="Électronique"
            />
          </div>
        </div>
        <Button 
          onClick={handleAddCategory} 
          disabled={!newCategory.id || !newCategory.name}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Ajouter la catégorie
        </Button>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Catégories existantes</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Identifiant</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Produits</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>
                  {editingCategory && editingCategory.id === category.id ? (
                    <Input 
                      value={editingCategory.name} 
                      onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                    />
                  ) : (
                    category.name
                  )}
                </TableCell>
                <TableCell>
                  {products.filter(p => p.category === category.id).length}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {editingCategory && editingCategory.id === category.id ? (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleUpdateCategory}
                        >
                          Enregistrer
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setEditingCategory(null)}
                        >
                          Annuler
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditCategory(category)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => setCategoryToDelete(category)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Confirmation dialog for delete */}
      <AlertDialog open={!!categoryToDelete} onOpenChange={() => setCategoryToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer la catégorie "{categoryToDelete?.name}" ? 
              {products.filter(p => p.category === categoryToDelete?.id).length > 0 && (
                <strong className="block text-red-500 mt-2">
                  Cette catégorie est utilisée par des produits et ne peut pas être supprimée.
                </strong>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteCategory}
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={products.filter(p => p.category === categoryToDelete?.id).length > 0}
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryManagement;
