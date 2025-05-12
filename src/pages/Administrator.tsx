
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
import { getProducts, saveProducts, getCategories, saveCategories } from '@/services/storageService';

const Administrator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [categoryList, setCategoryList] = useState<{ id: string; name: string }[]>([]);
  const [currentSection, setCurrentSection] = useState("dashboard");
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Chargement des données depuis le localStorage au montage du composant
  useEffect(() => {
    setProductList(getProducts());
    setCategoryList(getCategories());
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    toast({
      title: "Connecté",
      description: "Bienvenue dans l'interface d'administration",
    });
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    const newProductList = productList.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    
    setProductList(newProductList);
    saveProducts(newProductList); // Sauvegarde dans le localStorage
  };

  const handleAddProduct = (newProduct: Product) => {
    const updatedProducts = [...productList, newProduct];
    setProductList(updatedProducts);
    saveProducts(updatedProducts); // Sauvegarde dans le localStorage
  };

  const handleDeleteProduct = (productId: number) => {
    const updatedProducts = productList.filter(p => p.id !== productId);
    setProductList(updatedProducts);
    saveProducts(updatedProducts); // Sauvegarde dans le localStorage
  };

  const handleUpdateCategory = (oldId: string, updatedCategory: { id: string; name: string }) => {
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
  };

  const handleAddCategory = (newCategory: { id: string; name: string }) => {
    const updatedCategories = [...categoryList, newCategory];
    setCategoryList(updatedCategories);
    saveCategories(updatedCategories); // Sauvegarde dans le localStorage
  };

  const handleDeleteCategory = (categoryId: string) => {
    const updatedCategories = categoryList.filter(c => c.id !== categoryId);
    setCategoryList(updatedCategories);
    saveCategories(updatedCategories); // Sauvegarde dans le localStorage
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
