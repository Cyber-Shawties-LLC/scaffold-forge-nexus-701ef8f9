import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation/Navigation";
import { Check, Shield, Users, Building2 } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Personal Plan",
      price: "Free",
      period: "",
      description: "Perfect for individual users exploring privacy tools",
      icon: Shield,
      features: [
        "Access to wellness resources",
        "Personal privacy dashboard",
        "Basic account logging",
        "Secure messaging (limited)",
        "Community support"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Pro Plan",
      price: "$4.99",
      period: "/month",
      description: "Best for patients who want full control",
      icon: Users,
      features: [
        "Full medical record vault",
        "Unlimited secure messaging",
        "Symptom tracking",
        "Appointment dashboard",
        "Priority support",
        "AI-summaries of logs",
        "Advanced privacy controls"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise Plan",
      price: "Custom",
      period: "",
      description: "Ideal for practices & women's health clinics",
      icon: Building2,
      features: [
        "Admin Dashboard access",
        "Multi-clinician accounts",
        "SIEM integration",
        "CloudTrail + Wazuh monitoring",
        "Custom KMS keys",
        "Analytics + compliance reports",
        "Dedicated support",
        "Custom integrations"
      ],
      cta: "Contact Sales",
      popular: false
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
              <span className="text-sm font-medium text-gold-foreground">Pricing</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Select the plan that best fits your needs. All plans include HIPAA-compliant security.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-card/10 backdrop-blur-md rounded-2xl p-8 border transition-all ${
                  plan.popular
                    ? "border-gold/50 shadow-[0_0_30px_rgba(218,165,32,0.2)] scale-105"
                    : "border-primary-foreground/10 hover:border-gold/30"
                }`}
              >
                {plan.popular && (
                  <div className="text-center mb-4">
                    <span className="inline-block rounded-full bg-gold/20 px-3 py-1 text-sm font-medium text-gold-foreground">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="rounded-lg bg-gold/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <plan.icon className="w-8 h-8 text-gold" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-2">
                    {plan.name}
                  </h2>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-primary-foreground">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-primary-foreground/70">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-primary-foreground/80">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-primary-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={plan.name === "Enterprise Plan" ? "/contact" : "/auth"}>
                  <Button
                    size="lg"
                    className={`w-full ${
                      plan.popular
                        ? "bg-gold hover:bg-gold/90 text-gold-foreground"
                        : "bg-card/20 hover:bg-card/30 text-primary-foreground border border-primary-foreground/20"
                    } font-semibold`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="bg-card/10 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10 text-center">
            <h3 className="font-serif text-2xl font-bold text-primary-foreground mb-4">
              All Plans Include
            </h3>
            <p className="text-primary-foreground/80 text-lg mb-6">
              HIPAA-compliant security, encrypted data storage, and 24/7 monitoring
            </p>
            <Link to="/contact">
              <Button variant="outline" className="bg-card/10 border-primary-foreground/30 text-primary-foreground hover:bg-card/20">
                Have Questions? Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;

