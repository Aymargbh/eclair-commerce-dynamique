
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/components/ui/use-toast';

interface AdminAuthProps {
  onLogin: () => void;
}

const AdminAuth = ({ onLogin }: AdminAuthProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  // Dans une vraie application, ceci serait remplacé par une vérification
  // d'authentification sécurisée côté serveur
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Version simplifiée pour démonstration
    if (username === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      setError('Identifiants incorrects');
      toast({
        variant: "destructive",
        title: "Erreur d'authentification",
        description: "Nom d'utilisateur ou mot de passe incorrect.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Administration</CardTitle>
          <CardDescription>
            Connectez-vous pour accéder à l'interface d'administration
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input 
                id="username" 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminAuth;
