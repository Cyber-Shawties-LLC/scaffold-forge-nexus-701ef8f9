import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About Umi Nur", path: "/about" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "Patient Login", path: "/auth?type=patient" },
    { label: "Wellness Resources", path: "/wellness-resources" },
    { label: "Pricing Plans", path: "/pricing" },
    { label: "Privacy & Security", path: "/privacy-security" },
    { label: "Contact / Support", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-6">
        {menuItems.slice(0, 6).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "text-sm font-medium transition-colors hover:text-gold",
              isActive(item.path)
                ? "text-gold border-b-2 border-gold pb-1"
                : "text-primary-foreground/90"
            )}
          >
            {item.label}
          </Link>
        ))}
        <Link to="/auth">
          <Button
            variant="outline"
            className="bg-card/10 border-primary-foreground/30 text-primary-foreground hover:bg-card/20"
          >
            Sign In
          </Button>
        </Link>
      </nav>

      {/* Tablet/Mobile Hamburger Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-primary-foreground hover:bg-card/20"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[300px] sm:w-[400px] bg-gradient-to-br from-primary via-secondary to-plum z-[100]"
        >
          <div className="flex flex-col h-full">
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-primary-foreground">Menu</h2>
            </div>
            <nav className="flex-1 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-primary-foreground hover:bg-card/20 transition-colors font-medium",
                    isActive(item.path) && "bg-card/30 text-gold"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 pt-8 border-t border-primary-foreground/20">
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gold hover:bg-gold/90 text-gold-foreground">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Navigation;

