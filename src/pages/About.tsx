import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation/Navigation";
import { Shield, Lock, Eye, FileCheck, Heart } from "lucide-react";

const About = () => {
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block rounded-full bg-gold/20 px-4 py-2 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-gold-foreground">About Us</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              About Umi Nur
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Empowering individuals and healthcare providers with privacy-first technology
            </p>
          </div>

          <div className="space-y-12">
            <div className="bg-card/10 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-lg bg-gold/20 w-12 h-12 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-gold" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-primary-foreground">Our Mission</h2>
              </div>
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                Umi Nur was founded with a simple yet powerful mission: to give individuals complete control over their health data, especially sensitive information related to women's health and mental health. We believe that privacy is a fundamental right, and healthcare data deserves the highest level of protection.
              </p>
            </div>

            <div className="bg-card/10 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10">
              <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-6">Our Values</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Shield,
                    title: "Security First",
                    description: "Military-grade encryption and HIPAA compliance are non-negotiable."
                  },
                  {
                    icon: Eye,
                    title: "Transparency",
                    description: "You should always know who accessed your data and when."
                  },
                  {
                    icon: Lock,
                    title: "Privacy by Design",
                    description: "Privacy isn't an afterthought—it's built into every feature."
                  },
                  {
                    icon: FileCheck,
                    title: "AI-Assisted Protection",
                    description: "Smart technology helps you understand and protect your data."
                  }
                ].map((value, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="rounded-lg bg-gold/20 w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-primary-foreground mb-2">
                        {value.title}
                      </h3>
                      <p className="text-primary-foreground/80">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card/10 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10">
              <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-6">Why Umi Nur?</h2>
              <p className="text-primary-foreground/80 text-lg leading-relaxed mb-4">
                In an era where health data breaches are increasingly common, Umi Nur provides a secure, transparent, and user-friendly platform for managing sensitive health information. We combine cutting-edge security technology with intuitive design to make privacy accessible to everyone.
              </p>
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                Whether you're a patient seeking to protect your personal health records, a clinician needing secure documentation tools, or an administrator monitoring compliance, Umi Nur offers the tools you need to maintain the highest standards of data protection.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/auth">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold shadow-lg">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

