
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/product";
import { TrendingUp, Package, Category, ListOrdered } from "lucide-react";

interface DashboardProps {
  products: Product[];
  categories: { id: string; name: string }[];
}

const Dashboard = ({ products, categories }: DashboardProps) => {
  // Calcul simple des statistiques
  const totalProducts = products.length;
  const totalCategories = categories.length;
  const productsInPromotion = products.filter(p => p.onSale).length;
  
  const stats = [
    {
      title: "Total de produits",
      value: totalProducts,
      icon: Package,
      color: "text-blue-500",
    },
    {
      title: "Catégories",
      value: totalCategories,
      icon: Category,
      color: "text-purple-500",
    },
    {
      title: "Produits en promotion",
      value: productsInPromotion,
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Commandes",
      value: 0,
      icon: ListOrdered,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bienvenue dans le tableau de bord administrateur</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Ce tableau de bord vous permet de gérer l'ensemble de votre catalogue de produits et des commandes.
          </p>
          <p>
            Utilisez la navigation pour accéder aux différentes sections :
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Gérer les produits (ajouter, modifier, supprimer)</li>
            <li>Gérer les catégories</li>
            <li>Suivre et gérer les commandes</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
