import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation/Navigation";
import { Heart, BookOpen, Video, FileText, Users, Calendar } from "lucide-react";

const WellnessResources = () => {
  const resources = [
    {
      category: "Articles",
      icon: BookOpen,
      items: [
        "Understanding Women's Health Privacy",
        "Mental Health Data Protection",
        "HIPAA Rights Explained",
        "Building Healthy Habits"
      ]
    },
    {
      category: "Videos",
      icon: Video,
      items: [
        "Privacy Best Practices",
        "How to Read Your Medical Records",
        "Wellness Tips for Better Health",
        "Understanding Your Rights"
      ]
    },
    {
      category: "Guides",
      icon: FileText,
      items: [
        "Complete Privacy Guide",
        "Wellness Resource Library",
        "Healthcare Navigation Tips",
        "Data Security Handbook"
      ]
    },
    {
      category: "Community",
      icon: Users,
      items: [
        "Support Groups",
        "Discussion Forums",
        "Peer Support Network",
        "Wellness Challenges"
      ]
    }
  ];

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
          <Navigation />
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block rounded-full bg-gold/20 px-4 py-2 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-gold-foreground">Wellness Resources</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              Your Wellness Journey Starts Here
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Access educational resources, guides, and community support to help you on your health and wellness journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-card/10 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10 hover:border-gold/50 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="rounded-lg bg-gold/20 w-12 h-12 flex items-center justify-center">
                    <resource.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-primary-foreground">
                    {resource.category}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {resource.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-3 text-primary-foreground/80">
                      <Heart className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-card/10 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10 text-center">
            <Calendar className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-primary-foreground mb-4">
              Coming Soon: Wellness Events
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              Stay tuned for upcoming webinars, workshops, and wellness events
            </p>
            <Link to="/contact">
              <Button variant="outline" className="bg-card/10 border-primary-foreground/30 text-primary-foreground hover:bg-card/20">
                Get Notified
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WellnessResources;

