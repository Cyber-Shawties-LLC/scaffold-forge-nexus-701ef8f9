import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, FileCheck, Key, Database, MessageSquare, Heart, Users, Building2, Star, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import HamburgerMenu from "@/components/navigation/HamburgerMenu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Landing = () => {
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

      {/* What Umi Nur Does Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            What Umi Nur Does
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            A comprehensive privacy platform designed for healthcare data protection
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card/10 backdrop-blur-md rounded-2xl p-6 border border-primary-foreground/10 hover:border-gold/50 transition-all">
            <div className="rounded-lg bg-gold/20 w-12 h-12 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-serif text-xl font-bold text-primary-foreground mb-2">
              HIPAA-Grade Encryption
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Your sensitive health data is protected with AWS KMS encryption, ensuring military-grade security at rest and in transit.
            </p>
          </div>
          <div className="bg-card/10 backdrop-blur-md rounded-2xl p-6 border border-primary-foreground/10 hover:border-gold/50 transition-all">
            <div className="rounded-lg bg-gold/20 w-12 h-12 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-serif text-xl font-bold text-primary-foreground mb-2">
              Privacy-First Design
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Built with privacy by design principles. Your data is never used for advertising or sold to third parties.
            </p>
          </div>
          <div className="bg-card/10 backdrop-blur-md rounded-2xl p-6 border border-primary-foreground/10 hover:border-gold/50 transition-all">
            <div className="rounded-lg bg-gold/20 w-12 h-12 flex items-center justify-center mb-4">
              <FileCheck className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-serif text-xl font-bold text-primary-foreground mb-2">
              AI-Assisted Protection
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Get plain-language summaries of your data access logs and privacy insights powered by secure AI technology.
            </p>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Who It's For
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Designed for everyone who values health data privacy
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card/10 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10 hover:border-gold/50 transition-all">
            <div className="rounded-lg bg-gold/20 w-12 h-12 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary-foreground mb-3">
              Patients
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed mb-4">
              Seeking private protection for women's health or mental health data. Take control of your medical records with complete transparency.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span>Personal privacy dashboard</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span>Secure record vault</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span>Access control</span>
              </li>
            </ul>
          </div>
          <div className="bg-card/10 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10 hover:border-gold/50 transition-all">
            <div className="rounded-lg bg-gold/20 w-12 h-12 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary-foreground mb-3">
              Clinicians
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed mb-4">
              Needing secure documentation workflows and HIPAA-compliant tools for managing patient records.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span>Secure documentation</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span>Patient communication</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span>Compliance tools</span>
              </li>
            </ul>
          </div>
          <div className="bg-card/10 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10 hover:border-gold/50 transition-all">
            <div className="rounded-lg bg-gold/20 w-12 h-12 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary-foreground mb-3">
              Administrators
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed mb-4">
              Monitoring logs, compliance, and security across your organization with advanced analytics.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span>Security monitoring</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span>Compliance reports</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span>Audit logs</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Features Preview Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Key Features Preview
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Everything you need to protect and manage your health data
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Key,
              title: "Security (KMS Encryption)",
              description: "AWS Key Management Service encrypts all data with industry-standard AES-256 encryption."
            },
            {
              icon: Eye,
              title: "Monitoring (SIEM + CloudTrail + Wazuh)",
              description: "24/7 security monitoring with advanced threat detection and real-time alerts."
            },
            {
              icon: Database,
              title: "Privacy Dashboard",
              description: "Visualize your data access patterns and privacy settings in one comprehensive dashboard."
            },
            {
              icon: Heart,
              title: "Wellness Resources",
              description: "Access educational content, guides, and community support for your wellness journey."
            },
            {
              icon: Users,
              title: "Clinician Tools",
              description: "Secure documentation workflows and HIPAA-compliant patient management tools."
            },
            {
              icon: MessageSquare,
              title: "Secure Messaging",
              description: "End-to-end encrypted messaging between patients and healthcare providers."
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

      {/* Testimonials Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            See what our users are saying about Umi Nur
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Dr. Sarah Chen",
              role: "Women's Health Specialist",
              content: "Umi Nur has transformed how we handle patient data. The security and transparency give our patients peace of mind, and the compliance tools make our job easier.",
              rating: 5
            },
            {
              name: "Maria Rodriguez",
              role: "Patient",
              content: "Finally, a platform that puts me in control of my health records. I can see exactly who accessed my data and when. It's empowering.",
              rating: 5
            },
            {
              name: "James Wilson",
              role: "IT Administrator",
              content: "The SIEM integration and monitoring tools are excellent. We can track everything in real-time and maintain full compliance with ease.",
              rating: 5
            }
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-card/10 backdrop-blur-md rounded-2xl p-6 border border-primary-foreground/10 hover:border-gold/50 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-primary-foreground/80 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              <div>
                <p className="font-semibold text-primary-foreground">{testimonial.name}</p>
                <p className="text-sm text-primary-foreground/60">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Common questions about healthcare privacy and Umi Nur
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                question: "Is my health data really secure?",
                answer: "Yes. Umi Nur uses AWS Key Management Service (KMS) with AES-256 encryption at rest and TLS 1.3 in transit. All data is stored in HIPAA-compliant infrastructure with 24/7 security monitoring."
              },
              {
                question: "Who can access my medical records?",
                answer: "You have complete control. You decide who can access your records, and you can revoke access at any time. All access attempts are logged and visible in your privacy dashboard."
              },
              {
                question: "Is Umi Nur HIPAA compliant?",
                answer: "Yes, Umi Nur is fully HIPAA compliant. We follow all healthcare privacy regulations and maintain SOC 2 Type II certification. We also comply with GDPR for international users."
              },
              {
                question: "What happens if there's a data breach?",
                answer: "We have multiple layers of security monitoring including SIEM, CloudTrail, and Wazuh to detect and prevent unauthorized access. In the unlikely event of a breach, we have incident response protocols and will notify affected users immediately."
              },
              {
                question: "Can I export my data?",
                answer: "Yes, you can export all your data at any time in standard formats. You own your data, and you can take it with you whenever you want."
              },
              {
                question: "How does AI-assisted protection work?",
                answer: "Our AI analyzes your data access logs and provides plain-language summaries of who accessed what and when. It also helps identify unusual patterns and provides privacy recommendations, all while maintaining your data's confidentiality."
              }
            ].map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card/10 backdrop-blur-md rounded-2xl px-6 border border-primary-foreground/10"
              >
                <AccordionTrigger className="text-primary-foreground hover:no-underline font-serif text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-primary-foreground/80 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-plum rounded-3xl p-12 text-center shadow-2xl">
          <h3 className="font-serif text-4xl md:text-5xl font-bold text-plum-foreground mb-4">
            Take Control of Your Health Data Today
          </h3>
          <p className="text-plum-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of patients and healthcare providers who trust Umi Nur to protect their most sensitive data. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold shadow-lg">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="bg-card/10 border-plum-foreground/30 text-plum-foreground hover:bg-card/20">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-primary-foreground mb-4">
            Learn More About Privacy
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Explore how we protect your health information
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              id: 1,
              title: "Understanding HIPAA Compliance",
              description: "Learn how we meet healthcare privacy regulations",
              icon: Lock
            },
            {
              id: 2,
              title: "Military-Grade Encryption Explained",
              description: "Discover how we encrypt your data at rest and in transit",
              icon: Shield
            },
            {
              id: 3,
              title: "AI-Powered Health Insights",
              description: "See how AI helps you understand your health data",
              icon: FileCheck
            },
            {
              id: 4,
              title: "Your Right to Data Transparency",
              description: "Track who accesses your records and when",
              icon: Eye
            }
          ].map((article) => (
            <Link key={article.id} to={`/article/${article.id}`}>
              <div className="bg-card/10 backdrop-blur-md rounded-2xl p-6 border border-primary-foreground/10 hover:border-gold/50 transition-all hover:shadow-[0_0_30px_rgba(218,165,32,0.15)] h-full cursor-pointer">
                <div className="rounded-lg bg-gold/20 w-12 h-12 flex items-center justify-center mb-4">
                  <article.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-bold text-primary-foreground mb-2">
                  {article.title}
                </h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  {article.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-primary-foreground/10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-primary-foreground mb-4">Umi Nur</h3>
            <p className="text-primary-foreground/70 text-sm">
              Privacy-first healthcare data protection platform
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-security" className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-security" className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                  Security
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/wellness-resources" className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                  Wellness Resources
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-primary-foreground/70 text-sm pt-8 border-t border-primary-foreground/10">
          <p>© 2025 Umi Nur. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;