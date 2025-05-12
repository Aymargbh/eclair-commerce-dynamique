
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products as initialProducts } from '@/data/products';
import { categories as initialCategories } from '@/data/categories';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/types/product';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminAuth from '@/components/admin/AdminAuth';
import ProductManagement from '@/components/admin/ProductManagement';
import CategoryManagement from '@/components/admin/CategoryManagement';
import Dashboard from '@/components/admin/Dashboard';
import OrderManagement from '@/components/admin/OrderManagement';

const Administrator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [categoryList, setCategoryList] = useState<typeof initialCategories>(initialCategories);
  const [currentSection, setCurrentSection] = useState("dashboard");
  
  const { toast } = useToast();
  const navigate = useNavigate();

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
  };

  const handleAddProduct = (newProduct: Product) => {
    setProductList(prev => [...prev, newProduct]);
  };

  const handleDeleteProduct = (productId: number) => {
    setProductList(prev => prev.filter(p => p.id !== productId));
  };

  const handleUpdateCategory = (oldId: string, updatedCategory: { id: string; name: string }) => {
    // Update category in category list
    setCategoryList(prev => 
      prev.map(c => c.id === oldId ? updatedCategory : c)
    );
    
    // Update category in all products if the ID changed
    if (oldId !== updatedCategory.id) {
      setProductList(prev => 
        prev.map(p => 
          p.category === oldId 
            ? { ...p, category: updatedCategory.id } 
            : p
        )
      );
    }
  };

  const handleAddCategory = (newCategory: { id: string; name: string }) => {
    setCategoryList(prev => [...prev, newCategory]);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategoryList(prev => prev.filter(c => c.id !== categoryId));
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
