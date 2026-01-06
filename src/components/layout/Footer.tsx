import { Heart, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Learning Modules", href: "#learning" },
      { label: "For Parents", href: "#parents" },
      { label: "Accessibility", href: "#" },
    ],
    resources: [
      { label: "Getting Started", href: "#" },
      { label: "Tips for Parents", href: "#" },
      { label: "Educator Guide", href: "#" },
      { label: "FAQ", href: "#" },
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Our Mission", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Contact", href: "#" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="text-xl font-bold text-foreground">CalmStep</span>
            </a>
            <p className="text-muted-foreground max-w-sm mb-6">
              A gentle learning space designed for children with autism. 
              Learning at your own pace, without pressure.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary-light transition-calm"
                aria-label="Email us"
              >
                <Mail className="w-5 h-5 text-muted-foreground" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary-light transition-calm"
                aria-label="Contact support"
              >
                <MessageCircle className="w-5 h-5 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-calm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-calm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-calm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} CalmStep. Made with care for every child.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Designed with</span>
              <Heart className="w-4 h-4 text-warm fill-warm" />
              <span>for neurodiversity</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
