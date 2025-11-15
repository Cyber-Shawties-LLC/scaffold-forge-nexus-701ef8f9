import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Activity, Apple, Moon, Dumbbell, BookOpen } from "lucide-react";

const WellnessResources = () => {
  const resources = [
    {
      id: 1,
      title: "Heart Health",
      description: "Tips for maintaining cardiovascular wellness",
      icon: Heart,
      articles: 12,
      color: "text-red-500"
    },
    {
      id: 2,
      title: "Mental Wellness",
      description: "Strategies for emotional and mental health",
      icon: Brain,
      articles: 18,
      color: "text-purple-500"
    },
    {
      id: 3,
      title: "Nutrition",
      description: "Healthy eating guidelines and meal plans",
      icon: Apple,
      articles: 24,
      color: "text-green-500"
    },
    {
      id: 4,
      title: "Sleep Health",
      description: "Improving sleep quality and patterns",
      icon: Moon,
      articles: 8,
      color: "text-blue-500"
    },
    {
      id: 5,
      title: "Exercise",
      description: "Fitness routines and activity tracking",
      icon: Dumbbell,
      articles: 15,
      color: "text-orange-500"
    },
    {
      id: 6,
      title: "Health Education",
      description: "Understanding your health conditions",
      icon: BookOpen,
      articles: 20,
      color: "text-gold"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold">Wellness Resources</h2>
        <p className="text-muted-foreground">Educational content and health guidance</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Card key={resource.id} className="hover:border-gold/50 transition-all cursor-pointer">
            <CardHeader>
              <resource.icon className={`w-12 h-12 ${resource.color} mb-3`} />
              <CardTitle className="font-serif">{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {resource.articles} articles available
              </p>
              <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
                Explore
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Recommended For You</CardTitle>
          <CardDescription>Personalized health resources based on your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: "Managing Stress in Daily Life", category: "Mental Wellness", readTime: "5 min" },
              { title: "Heart-Healthy Mediterranean Diet", category: "Nutrition", readTime: "8 min" },
              { title: "Beginner's Guide to Morning Yoga", category: "Exercise", readTime: "10 min" },
            ].map((article, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors cursor-pointer">
                <div>
                  <p className="font-medium">{article.title}</p>
                  <p className="text-sm text-muted-foreground">{article.category}</p>
                </div>
                <div className="text-sm text-muted-foreground">{article.readTime}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Brain = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
);

export default WellnessResources;
