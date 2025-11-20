import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    product: [
      { label: "Features", path: "/#features" },
      { label: "Pricing", path: "/pricing" },
      { label: "How It Works", path: "/how-it-works" },
      { label: "Wellness Resources", path: "/wellness-resources" },
    ],
    company: [
      { label: "About Us", path: "/about" },
      { label: "Contact", path: "/contact" },
      { label: "Careers", path: "#" },
      { label: "Blog", path: "#" },
    ],
    legal: [
      { label: "Privacy Policy", path: "/privacy-security" },
      { label: "Terms of Service", path: "#" },
      { label: "Security", path: "/privacy-security" },
      { label: "HIPAA Compliance", path: "#" },
      { label: "Security Admin Portal", path: "/security-admin/login" },
    ],
  };

  return (
    <footer className="bg-transparent border-t border-primary-foreground/10 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              <span className="font-serif text-2xl font-bold text-primary-foreground">
                Umi Nur
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Privacy-first healthcare platform protecting your most sensitive health data.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4 text-primary-foreground">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-primary-foreground">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4 text-primary-foreground">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} Umi Nur. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
