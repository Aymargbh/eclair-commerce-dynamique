
import { Product } from "@/types/product";
import { products as initialProducts } from "@/data/products";
import { categories as initialCategories } from "@/data/categories";

// Clés pour le stockage local
const PRODUCTS_KEY = "lovable_admin_products";
const CATEGORIES_KEY = "lovable_admin_categories";

// Fonction pour obtenir les produits du stockage local ou utiliser les données initiales
export const getProducts = (): Product[] => {
  const storedProducts = localStorage.getItem(PRODUCTS_KEY);
  if (storedProducts) {
    return JSON.parse(storedProducts);
  }
  return initialProducts;
};

// Fonction pour sauvegarder les produits dans le stockage local
export const saveProducts = (products: Product[]): void => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

// Fonction pour obtenir les catégories du stockage local ou utiliser les données initiales
export const getCategories = (): { id: string; name: string }[] => {
  const storedCategories = localStorage.getItem(CATEGORIES_KEY);
  if (storedCategories) {
    return JSON.parse(storedCategories);
  }
  return initialCategories;
};

// Fonction pour sauvegarder les catégories dans le stockage local
export const saveCategories = (categories: { id: string; name: string }[]): void => {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};
