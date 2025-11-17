import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HamburgerMenu from "@/components/navigation/HamburgerMenu";
import { Mail, MessageCircle, Phone, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Contact = () => {
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block rounded-full bg-gold/20 px-4 py-2 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-gold-foreground">Contact Us</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to our support team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card/10 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10">
              <h2 className="font-serif text-2xl font-bold text-primary-foreground mb-6">
                Send us a Message
              </h2>
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-primary-foreground">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="bg-card/20 border-primary-foreground/20 text-primary-foreground mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-primary-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="bg-card/20 border-primary-foreground/20 text-primary-foreground mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-primary-foreground">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="What can we help with?"
                    className="bg-card/20 border-primary-foreground/20 text-primary-foreground mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-primary-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more..."
                    className="bg-card/20 border-primary-foreground/20 text-primary-foreground mt-2 min-h-[120px]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-semibold"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-card/10 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10">
                <h2 className="font-serif text-2xl font-bold text-primary-foreground mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-gold/20 w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-primary-foreground mb-1">
                        Email
                      </h3>
                      <p className="text-primary-foreground/80">
                        support@uminur.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-gold/20 w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-primary-foreground mb-1">
                        Live Chat
                      </h3>
                      <p className="text-primary-foreground/80">
                        Available 24/7 for Pro and Enterprise users
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-gold/20 w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-primary-foreground mb-1">
                        Phone
                      </h3>
                      <p className="text-primary-foreground/80">
                        1-800-UMI-NUR (1-800-864-687)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-gold/20 w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-primary-foreground mb-1">
                        Support Hours
                      </h3>
                      <p className="text-primary-foreground/80">
                        Monday - Friday: 9 AM - 6 PM EST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card/10 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10">
                <h3 className="font-serif text-xl font-bold text-primary-foreground mb-4">
                  Need Immediate Help?
                </h3>
                <p className="text-primary-foreground/80 mb-6">
                  For urgent security concerns or account issues, please contact our security team immediately.
                </p>
                <Link to="/auth">
                  <Button variant="outline" className="w-full bg-card/10 border-primary-foreground/30 text-primary-foreground hover:bg-card/20">
                    Access Support Portal
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

