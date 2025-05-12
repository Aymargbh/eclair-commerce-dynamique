
import { Button } from "@/components/ui/button";

interface AdminNavbarProps {
  onGoToSite: () => void;
}

const AdminNavbar = ({ onGoToSite }: AdminNavbarProps) => {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Administration</h1>
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
