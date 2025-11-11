import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-plum">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl font-bold text-primary-foreground">
            Umi Nur
          </h1>
          <Link to="/auth">
            <Button variant="outline" className="bg-card/10 border-primary-foreground/30 text-primary-foreground hover:bg-card/20">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="inline-block rounded-full bg-gold/20 px-4 py-2 backdrop-blur-sm">
            <span className="text-sm font-medium text-gold-foreground">Privacy-First Healthcare</span>
          </div>
          
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-primary-foreground leading-tight">
            Your Health Data,
            <br />
            <span className="text-gold">Your Control</span>
          </h2>
          
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Umi Nur is a cloud-native, AI-assisted privacy platform designed to protect women's health and mental health data with military-grade encryption and HIPAA compliance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link to="/auth">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg hover:shadow-xl transition-all">
                Get Started
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-card/10 border-primary-foreground/30 text-primary-foreground hover:bg-card/20">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Shield,
              title: "Military-Grade Encryption",
              description: "Your data is protected with AWS KMS encryption at rest and in transit."
            },
            {
              icon: Eye,
              title: "Complete Transparency",
              description: "See exactly who accessed your records and when with detailed audit trails."
            },
            {
              icon: Lock,
              title: "HIPAA Compliant",
              description: "Full compliance with healthcare privacy regulations and data sovereignty."
            },
            {
              icon: FileCheck,
              title: "AI-Powered Insights",
              description: "Plain-language summaries and privacy education powered by secure AI."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-card/10 backdrop-blur-md rounded-2xl p-6 border border-primary-foreground/10 hover:border-gold/50 transition-all hover:shadow-[0_0_30px_rgba(218,165,32,0.15)]"
            >
              <div className="rounded-lg bg-gold/20 w-12 h-12 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-plum rounded-3xl p-12 text-center shadow-2xl">
          <h3 className="font-serif text-4xl font-bold text-plum-foreground mb-4">
            Ready to Take Control?
          </h3>
          <p className="text-plum-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
            Join healthcare providers and patients who trust Umi Nur to protect their most sensitive data.
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold shadow-lg">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-primary-foreground/10">
        <div className="text-center text-primary-foreground/70">
          <p>© 2025 Umi Nur. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;