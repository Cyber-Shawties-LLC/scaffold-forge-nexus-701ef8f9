import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import HamburgerMenu from "@/components/navigation/HamburgerMenu";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-plum">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1 className="font-serif text-3xl font-bold text-primary-foreground">
              Umi Nur
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/auth" className="hidden md:block">
              <Button variant="outline" className="bg-card/10 border-primary-foreground/30 text-primary-foreground hover:bg-card/20">
                Sign In
              </Button>
            </Link>
            <HamburgerMenu />
          </div>
        </div>
      </header>

      {/* 404 Content */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold text-primary-foreground font-serif">404</h1>
          <p className="mb-8 text-2xl text-primary-foreground/80">Oops! Page not found</p>
          <Link to="/">
            <Button size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
