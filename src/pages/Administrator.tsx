
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/types/product';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminAuth from '@/components/admin/AdminAuth';
import ProductManagement from '@/components/admin/ProductManagement';
import CategoryManagement from '@/components/admin/CategoryManagement';
import Dashboard from '@/components/admin/Dashboard';
import OrderManagement from '@/components/admin/OrderManagement';
import { getProducts, saveProducts, getCategories, saveCategories, clearCache } from '@/services/storageService';

const Administrator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [categoryList, setCategoryList] = useState<{ id: string; name: string }[]>([]);
  const [currentSection, setCurrentSection] = useState("dashboard");
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Chargement des données depuis le localStorage au montage du composant
  useEffect(() => {
    const loadData = () => {
      try {
        // Effacer le cache avant de charger pour avoir les données les plus récentes
        clearCache();
        setProductList(getProducts());
        setCategoryList(getCategories());
        console.log("Données administrateur chargées avec succès");
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les données",
        });
      }
    };

    loadData();
  }, [toast]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    toast({
      title: "Connecté",
      description: "Bienvenue dans l'interface d'administration",
    });
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    try {
      const newProductList = productList.map(p => 
        p.id === updatedProduct.id ? updatedProduct : p
      );
      
      setProductList(newProductList);
      saveProducts(newProductList); // Sauvegarde dans le localStorage
      
      toast({
        title: "Produit mis à jour",
        description: "Les modifications ont été enregistrées avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "La mise à jour a échoué",
      });
    }
  };

  const handleAddProduct = (newProduct: Product) => {
    try {
      const updatedProducts = [...productList, newProduct];
      setProductList(updatedProducts);
      saveProducts(updatedProducts); // Sauvegarde dans le localStorage
      
      toast({
        title: "Produit ajouté",
        description: "Le nouveau produit a été enregistré avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "L'ajout a échoué",
      });
    }
  };

  const handleDeleteProduct = (productId: number) => {
    try {
      const updatedProducts = productList.filter(p => p.id !== productId);
      setProductList(updatedProducts);
      saveProducts(updatedProducts); // Sauvegarde dans le localStorage
      
      toast({
        title: "Produit supprimé",
        description: "Le produit a été supprimé avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "La suppression a échoué",
      });
    }
  };

  const handleUpdateCategory = (oldId: string, updatedCategory: { id: string; name: string }) => {
    try {
      // Update category in category list
      const updatedCategories = categoryList.map(c => c.id === oldId ? updatedCategory : c);
      setCategoryList(updatedCategories);
      saveCategories(updatedCategories); // Sauvegarde dans le localStorage
      
      // Update category in all products if the ID changed
      if (oldId !== updatedCategory.id) {
        const updatedProducts = productList.map(p => 
          p.category === oldId 
            ? { ...p, category: updatedCategory.id } 
            : p
        );
        setProductList(updatedProducts);
        saveProducts(updatedProducts); // Sauvegarde dans le localStorage
      }
      
      toast({
        title: "Catégorie mise à jour",
        description: "Les modifications ont été enregistrées avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la catégorie:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "La mise à jour a échoué",
      });
    }
  };

  const handleAddCategory = (newCategory: { id: string; name: string }) => {
    try {
      const updatedCategories = [...categoryList, newCategory];
      setCategoryList(updatedCategories);
      saveCategories(updatedCategories); // Sauvegarde dans le localStorage
      
      toast({
        title: "Catégorie ajoutée",
        description: "La nouvelle catégorie a été enregistrée avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "L'ajout a échoué",
      });
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    try {
      const updatedCategories = categoryList.filter(c => c.id !== categoryId);
      setCategoryList(updatedCategories);
      saveCategories(updatedCategories); // Sauvegarde dans le localStorage
      
      toast({
        title: "Catégorie supprimée",
        description: "La catégorie a été supprimée avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "La suppression a échoué",
      });
    }
  };

  const handleGoToSite = () => {
    navigate('/');
  };

  if (!isAuthenticated) {
    return <AdminAuth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar 
        onGoToSite={handleGoToSite}
        currentSection={currentSection}
        onChangeSection={setCurrentSection}
      />
      
      <div className="container mx-auto px-4 py-8">
        {currentSection === "dashboard" && (
          <Dashboard 
            products={productList}
            categories={categoryList}
          />
        )}
        
        {currentSection === "products" && (
          <ProductManagement 
            products={productList}
            categories={categoryList}
            onUpdateProduct={handleUpdateProduct}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
        
        {currentSection === "categories" && (
          <CategoryManagement 
            categories={categoryList}
            products={productList}
            onUpdateCategory={handleUpdateCategory}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}
        
        {currentSection === "orders" && (
          <OrderManagement />
        )}
      </div>
    </div>
  );
};

export default Administrator;
