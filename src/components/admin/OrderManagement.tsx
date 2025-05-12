
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

const OrderManagement = () => {
  // Mock data pour les commandes (dans une vraie application, cela viendrait d'une API)
  const orders = [
    {
      id: "ORD-1234",
      date: "2025-05-10",
      customer: "Jean Dupont",
      total: 249.97,
      status: "delivered",
      items: 3
    },
    {
      id: "ORD-1235",
      date: "2025-05-11",
      customer: "Marie Lambert",
      total: 129.99,
      status: "processing",
      items: 1
    },
    {
      id: "ORD-1236",
      date: "2025-05-12",
      customer: "Thomas Bernard",
      total: 89.98,
      status: "shipped",
      items: 2
    }
  ];

  // Stats pour le tableau de bord des commandes
  const stats = [
    {
      label: "Commandes totales",
      value: 3
    },
    {
      label: "Chiffre d'affaires",
      value: "469,94 €"
    },
    {
      label: "En attente",
      value: 1
    }
  ];

  // Helper pour afficher le statut de la commande
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "processing":
        return <Badge className="bg-amber-500">En traitement</Badge>;
      case "shipped":
        return <Badge className="bg-blue-500">Expédiée</Badge>;
      case "delivered":
        return <Badge className="bg-green-500">Livrée</Badge>;
      default:
        return <Badge>Inconnue</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestion des Commandes</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Dernières commandes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="py-2 px-4 text-left">N° commande</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Client</th>
                  <th className="py-2 px-4 text-left">Articles</th>
                  <th className="py-2 px-4 text-left">Total</th>
                  <th className="py-2 px-4 text-left">Statut</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4">{order.date}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4">{order.items}</td>
                    <td className="py-3 px-4">{order.total.toFixed(2)} €</td>
                    <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {orders.length === 0 && (
            <p className="py-6 text-center text-muted-foreground">
              Aucune commande pour le moment
            </p>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Suivi des commandes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Ce module afficherait normalement un graphique montrant l'évolution des commandes 
            au fil du temps. Dans une vraie application, ce serait intégré avec une API de 
            suivi des commandes et des données historiques.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManagement;
