import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HamburgerMenu from "@/components/navigation/HamburgerMenu";
import { Shield, Lock, Eye, FileCheck, Key, Database, AlertTriangle } from "lucide-react";

const PrivacySecurity = () => {
  const features = [
    {
      icon: Shield,
      title: "HIPAA-Grade Encryption",
      description: "All data is encrypted using AWS Key Management Service (KMS) with industry-standard AES-256 encryption at rest and TLS 1.3 in transit."
    },
    {
      icon: Lock,
      title: "Privacy-First Design",
      description: "We follow privacy-by-design principles. Your data is never used for advertising, and we don't sell your information to third parties."
    },
    {
      icon: Eye,
      title: "Complete Transparency",
      description: "View detailed audit logs of every access to your data. Know exactly who viewed what, when, and why."
    },
    {
      icon: Key,
      title: "Access Controls",
      description: "Granular permission system lets you control who can access your records. Revoke access at any time."
    },
    {
      icon: Database,
      title: "Secure Storage",
      description: "Data is stored in HIPAA-compliant infrastructure with regular backups and disaster recovery protocols."
    },
    {
      icon: AlertTriangle,
      title: "Security Monitoring",
      description: "24/7 monitoring with SIEM, CloudTrail, and Wazuh to detect and prevent unauthorized access attempts."
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
              <span className="text-sm font-medium text-gold-foreground">Privacy & Security</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              Your Data, Protected
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              We take your privacy seriously. Learn how we protect your sensitive health information.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card/10 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10 hover:border-gold/50 transition-all"
              >
                <div className="rounded-lg bg-gold/20 w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-bold text-primary-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-card/10 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10 mb-8">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-6">
              Compliance & Certifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <FileCheck className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary-foreground mb-2">
                    HIPAA Compliant
                  </h3>
                  <p className="text-primary-foreground/80">
                    Full compliance with the Health Insurance Portability and Accountability Act (HIPAA) regulations.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FileCheck className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary-foreground mb-2">
                    SOC 2 Type II
                  </h3>
                  <p className="text-primary-foreground/80">
                    Certified for security, availability, processing integrity, confidentiality, and privacy.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FileCheck className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary-foreground mb-2">
                    GDPR Compliant
                  </h3>
                  <p className="text-primary-foreground/80">
                    Meets European General Data Protection Regulation requirements for data privacy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/contact">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold shadow-lg">
                Have Security Questions?
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacySecurity;

