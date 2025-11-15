import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Brain, ArrowLeft } from "lucide-react";

const ArticleDetail = () => {
  const { id } = useParams();

  const articles = {
    "1": {
      title: "Understanding HIPAA Compliance",
      icon: Lock,
      content: `
        <h2>What is HIPAA?</h2>
        <p>The Health Insurance Portability and Accountability Act (HIPAA) is a federal law that protects sensitive patient health information from being disclosed without the patient's consent or knowledge.</p>
        
        <h2>How Umi Nur Ensures HIPAA Compliance</h2>
        <p>At Umi Nur, we take HIPAA compliance seriously. Our platform implements:</p>
        <ul>
          <li>End-to-end encryption for all health data</li>
          <li>Comprehensive audit trails of all data access</li>
          <li>Strict access controls and authentication</li>
          <li>Regular security assessments and updates</li>
          <li>Business Associate Agreements with all partners</li>
        </ul>

        <h2>Your Rights Under HIPAA</h2>
        <p>As a patient, you have the right to:</p>
        <ul>
          <li>Access your health records</li>
          <li>Request corrections to your health information</li>
          <li>Receive a notice of privacy practices</li>
          <li>Request confidential communications</li>
          <li>File a complaint if you believe your privacy rights were violated</li>
        </ul>
      `
    },
    "2": {
      title: "Military-Grade Encryption Explained",
      icon: Shield,
      content: `
        <h2>What is Military-Grade Encryption?</h2>
        <p>Military-grade encryption refers to encryption standards used by defense and intelligence agencies worldwide. At Umi Nur, we use AWS Key Management Service (KMS) with AES-256 encryption.</p>
        
        <h2>How It Works</h2>
        <p>Our encryption process involves:</p>
        <ul>
          <li><strong>Data at Rest:</strong> All stored data is encrypted using AES-256</li>
          <li><strong>Data in Transit:</strong> TLS 1.3 protects data moving between systems</li>
          <li><strong>Key Management:</strong> AWS KMS handles encryption key lifecycle</li>
          <li><strong>Key Rotation:</strong> Automatic rotation of encryption keys</li>
        </ul>

        <h2>Why It Matters</h2>
        <p>Even if data is somehow accessed, military-grade encryption makes it virtually impossible to read without the proper decryption keys. This level of protection is the same used by governments and military organizations worldwide.</p>
      `
    },
    "3": {
      title: "AI-Powered Health Insights",
      icon: Brain,
      content: `
        <h2>Understanding AI in Healthcare</h2>
        <p>Artificial Intelligence is transforming healthcare by making complex data understandable and actionable. At Umi Nur, we use AI to help you understand your health data better.</p>
        
        <h2>How We Use AI</h2>
        <p>Our AI systems provide:</p>
        <ul>
          <li><strong>Plain-Language Summaries:</strong> Convert medical jargon into understandable insights</li>
          <li><strong>Pattern Detection:</strong> Identify trends in your health data</li>
          <li><strong>Access Anomalies:</strong> Alert you to unusual access patterns</li>
          <li><strong>Personalized Recommendations:</strong> Suggest relevant health resources</li>
        </ul>

        <h2>Privacy-First AI</h2>
        <p>All AI processing happens within our secure infrastructure. Your data never leaves our encrypted systems, and AI models are trained on anonymized datasets only.</p>
      `
    },
    "4": {
      title: "Your Right to Data Transparency",
      icon: Eye,
      content: `
        <h2>Why Transparency Matters</h2>
        <p>Your health data is personal and sensitive. You deserve to know exactly who accesses it, when they access it, and why. This transparency builds trust and gives you control.</p>
        
        <h2>What We Track</h2>
        <p>Every access to your health data is logged with:</p>
        <ul>
          <li>Who accessed your data (healthcare provider, administrator, etc.)</li>
          <li>When they accessed it (exact timestamp)</li>
          <li>What data they viewed</li>
          <li>Why they accessed it (appointment, emergency, etc.)</li>
          <li>Where they accessed it from (location and device)</li>
        </ul>

        <h2>Your Transparency Dashboard</h2>
        <p>Access your patient portal to see real-time logs of all data access. You can:</p>
        <ul>
          <li>Review complete access history</li>
          <li>Filter by date, provider, or data type</li>
          <li>Export access logs for your records</li>
          <li>Report suspicious access immediately</li>
        </ul>
      `
    }
  };

  const article = articles[id as keyof typeof articles];

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-plum flex items-center justify-center p-6">
        <Card className="bg-card/95 backdrop-blur-md border-primary/20 max-w-md">
          <CardContent className="p-12 text-center">
            <h2 className="font-serif text-2xl font-bold mb-4">Article Not Found</h2>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
            <Link to="/">
              <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const Icon = article.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-plum">
      {/* Header */}
      <header className="border-b border-primary-foreground/10 backdrop-blur-md bg-background/30">
        <div className="container mx-auto px-6 py-4">
          <Link to="/">
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <div className="container mx-auto px-6 py-12">
        <Card className="bg-card/95 backdrop-blur-md border-primary/20 max-w-4xl mx-auto">
          <CardHeader className="space-y-4">
            <Icon className="w-16 h-16 text-gold" />
            <CardTitle className="font-serif text-4xl">{article.title}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div 
              dangerouslySetInnerHTML={{ __html: article.content }}
              className="article-content space-y-6"
            />
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Link to="/auth">
            <Button size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
              Get Started with Umi Nur
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
