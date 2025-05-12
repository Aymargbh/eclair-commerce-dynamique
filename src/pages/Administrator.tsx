
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { products } from '@/data/products';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/types/product';
import { categories } from '@/data/categories';
import ProductEditForm from '@/components/admin/ProductEditForm';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminAuth from '@/components/admin/AdminAuth';

const Administrator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [productList, setProductList] = useState<Product[]>(products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    toast({
      title: "Connecté",
      description: "Bienvenue dans l'interface d'administration",
    });
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    const newProductList = productList.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    
    setProductList(newProductList);
    setSelectedProduct(null);
    
    toast({
      title: "Produit mis à jour",
      description: `${updatedProduct.name} a été mis à jour avec succès.`,
    });

    // Dans une vraie application, ici nous sauvegarderions les modifications
    // dans une base de données ou une API
    console.log("Produit mis à jour:", updatedProduct);
  };

  const handleGoToSite = () => {
    navigate('/');
  };

  if (!isAuthenticated) {
    return <AdminAuth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar onGoToSite={handleGoToSite} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Gestion des Produits</h1>
        
        {selectedProduct ? (
          <ProductEditForm 
            product={selectedProduct} 
            categories={categories}
            onSave={handleUpdateProduct}
            onCancel={() => setSelectedProduct(null)}
          />
        ) : (
          <div className="bg-white p-6 rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productList.map((product) => (
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditProduct(product)}
                      >
                        Modifier
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Administrator;
