
import { Product } from "@/types/product";
import { products as initialProducts } from "@/data/products";
import { categories as initialCategories } from "@/data/categories";

// Clés pour le stockage local
const PRODUCTS_KEY = "lovable_admin_products";
const CATEGORIES_KEY = "lovable_admin_categories";

// Variable pour stocker les produits en mémoire
let cachedProducts: Product[] | null = null;
let cachedCategories: { id: string; name: string }[] | null = null;

// Fonction pour obtenir les produits du stockage local ou utiliser les données initiales
export const getProducts = (): Product[] => {
  if (cachedProducts) return cachedProducts;
  
  try {
    const storedProducts = localStorage.getItem(PRODUCTS_KEY);
    if (storedProducts) {
      cachedProducts = JSON.parse(storedProducts);
      return cachedProducts;
    }
    // Si pas de produits stockés, utiliser les produits initiaux et les sauvegarder
    cachedProducts = initialProducts;
    saveProducts(cachedProducts);
    return cachedProducts;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    return initialProducts;
  }
};

// Fonction pour sauvegarder les produits dans le stockage local
export const saveProducts = (products: Product[]): void => {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    cachedProducts = products; // Mettre à jour le cache
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des produits:", error);
  }
};

// Fonction pour obtenir les catégories du stockage local ou utiliser les données initiales
export const getCategories = (): { id: string; name: string }[] => {
  if (cachedCategories) return cachedCategories;
  
  try {
    const storedCategories = localStorage.getItem(CATEGORIES_KEY);
    if (storedCategories) {
      cachedCategories = JSON.parse(storedCategories);
      return cachedCategories;
    }
    // Si pas de catégories stockées, utiliser les catégories initiales et les sauvegarder
    cachedCategories = initialCategories;
    saveCategories(cachedCategories);
    return cachedCategories;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    return initialCategories;
  }
};

// Fonction pour sauvegarder les catégories dans le stockage local
export const saveCategories = (categories: { id: string; name: string }[]): void => {
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    cachedCategories = categories; // Mettre à jour le cache
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des catégories:", error);
  }
};

// Fonction pour réinitialiser le cache (utile après mise à jour)
export const clearCache = (): void => {
  cachedProducts = null;
  cachedCategories = null;
};

// Fonction pour vérifier si le localStorage est disponible
export const isStorageAvailable = (): boolean => {
  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};
