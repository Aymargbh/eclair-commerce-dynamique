
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BellIcon, LayoutDashboard, Menu, Package, Category, ListOrdered } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface AdminNavbarProps {
  onGoToSite: () => void;
  currentSection: string;
  onChangeSection: (section: string) => void;
}

const AdminNavbar = ({ onGoToSite, currentSection, onChangeSection }: AdminNavbarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const navItems = [
    { name: "Tableau de bord", icon: LayoutDashboard, id: "dashboard" },
    { name: "Produits", icon: Package, id: "products" },
    { name: "Catégories", icon: Category, id: "categories" },
    { name: "Commandes", icon: ListOrdered, id: "orders" },
  ];

  const NavItem = ({ item, isMobile = false }: { item: typeof navItems[0], isMobile?: boolean }) => (
    <Button 
      variant={currentSection === item.id ? "secondary" : "ghost"}
      className={cn(
        "justify-start gap-2", 
        isMobile ? "w-full" : "",
        currentSection === item.id ? "" : "text-muted-foreground"
      )}
      onClick={() => {
        onChangeSection(item.id);
        if (isMobile) setIsMobileOpen(false);
      }}
    >
      <item.icon className="h-5 w-5" />
      {item.name}
    </Button>
  );
  
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="py-4">
                <h2 className="text-xl font-bold mb-6">Administration</h2>
                <nav className="space-y-2">
                  {navItems.map(item => (
                    <NavItem key={item.id} item={item} isMobile={true} />
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          
          <h1 className="text-xl font-bold">Administration</h1>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          {navItems.map(item => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onGoToSite} className="text-white border-white hover:bg-white/20">
            Retour au site
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
