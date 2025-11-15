import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

const NotAuthorized = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-plum flex items-center justify-center p-6">
      <Card className="bg-card/95 backdrop-blur-md border-primary/20 max-w-md">
        <CardContent className="p-12 text-center">
          <ShieldAlert className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="font-serif text-3xl font-bold mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-8">
            You don't have permission to access this page. Please contact your administrator if you believe this is an error.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/dashboard">
              <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
                Go to Dashboard
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotAuthorized;
