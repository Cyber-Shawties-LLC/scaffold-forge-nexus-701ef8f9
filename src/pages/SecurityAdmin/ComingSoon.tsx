import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ComingSoonProps {
  moduleName?: string;
}

const ComingSoon = ({ moduleName = 'This module' }: ComingSoonProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-plum p-6">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/security-admin/dashboard')}
          className="mb-6 text-primary-foreground hover:text-gold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="bg-card/95 backdrop-blur-md border-primary/20 shadow-luxury">
          <CardHeader className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-4">
              <Clock className="w-10 h-10 text-muted-foreground" />
            </div>
            <CardTitle className="font-serif text-4xl font-bold">Coming Soon</CardTitle>
            <CardDescription className="text-lg">
              {moduleName} is currently under development
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-muted-foreground">
              We're working hard to bring you this security module. Check back soon for updates!
            </p>
            <Button
              onClick={() => navigate('/security-admin/dashboard')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComingSoon;

