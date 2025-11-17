import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const HamburgerMenu = () => {
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About Umi Nur", path: "/about" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "Patient Login", path: "/auth?type=patient" },
    { label: "Admin Login", path: "/auth?type=admin" },
    { label: "Wellness Resources", path: "/wellness-resources" },
    { label: "Pricing Plans", path: "/pricing" },
    { label: "Privacy & Security", path: "/privacy-security" },
    { label: "Contact / Support", path: "/contact" },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-card/20 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gradient-to-br from-primary via-secondary to-plum">
        <div className="flex flex-col h-full">
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-primary-foreground">Menu</h2>
          </div>
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-4 py-3 rounded-lg text-primary-foreground hover:bg-card/20 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 pt-8 border-t border-primary-foreground/20">
            <Link to="/auth">
              <Button className="w-full bg-gold hover:bg-gold/90 text-gold-foreground">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;

