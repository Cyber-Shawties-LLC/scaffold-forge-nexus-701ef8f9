import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HamburgerMenu from "@/components/navigation/HamburgerMenu";
import { Shield, Lock, Eye, FileCheck, Database, Key, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Sign Up & Verify",
      description: "Create your account and verify your identity. We use secure, HIPAA-compliant verification processes.",
      icon: CheckCircle
    },
    {
      number: "02",
      title: "Upload Your Records",
      description: "Securely upload your health records. All data is encrypted with AWS KMS before storage.",
      icon: Database
    },
    {
      number: "03",
      title: "Set Access Controls",
      description: "Control who can access your data. Set permissions for clinicians, family members, or yourself.",
      icon: Key
    },
    {
      number: "04",
      title: "Monitor & Track",
      description: "View real-time logs of all data access. Get AI-powered summaries of who viewed what and when.",
      icon: Eye
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

      {/* Content */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block rounded-full bg-gold/20 px-4 py-2 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-gold-foreground">How It Works</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              Simple, Secure, Transparent
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Get started in minutes and take control of your health data
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-8 mb-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-card/10 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10 hover:border-gold/50 transition-all"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="rounded-lg bg-gold/20 w-16 h-16 flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-gold" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-2xl font-bold text-gold">{step.number}</span>
                      <h2 className="font-serif text-2xl font-bold text-primary-foreground">
                        {step.title}
                      </h2>
                    </div>
                    <p className="text-primary-foreground/80 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Security Features */}
          <div className="bg-card/10 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10 mb-12">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-6 text-center">
              Built-In Security Features
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "KMS Encryption",
                  description: "AWS Key Management Service encrypts all data at rest"
                },
                {
                  icon: Lock,
                  title: "HIPAA Compliant",
                  description: "Full compliance with healthcare privacy regulations"
                },
                {
                  icon: FileCheck,
                  title: "Audit Logs",
                  description: "Complete transparency with detailed access logs"
                }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="rounded-lg bg-gold/20 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-primary-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-primary-foreground/80">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link to="/auth">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;

