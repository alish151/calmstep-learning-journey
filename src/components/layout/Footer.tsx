import { Heart, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const footerLinks = {
    product: [
      { labelKey: "footer.howItWorks", href: "#how-it-works" },
      { labelKey: "footer.learningModules", href: "#learning" },
      { labelKey: "footer.forParents", href: "#parents" },
      { labelKey: "footer.accessibility", href: "#" },
    ],
    resources: [
      { labelKey: "footer.gettingStarted", href: "#" },
      { labelKey: "footer.tipsForParents", href: "#" },
      { labelKey: "footer.educatorGuide", href: "#" },
      { labelKey: "footer.faq", href: "#" },
    ],
    company: [
      { labelKey: "footer.aboutUs", href: "#" },
      { labelKey: "footer.ourMission", href: "#" },
      { labelKey: "footer.privacyPolicy", href: "#" },
      { labelKey: "footer.contact", href: "#" },
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
              {t("footer.description")}
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
            <h3 className="font-semibold text-foreground mb-4">{t("footer.product")}</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.labelKey}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-calm"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t("footer.resources")}</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.labelKey}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-calm"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t("footer.company")}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.labelKey}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-calm"
                  >
                    {t(link.labelKey)}
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
              © {currentYear} {t("footer.copyright")}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{t("footer.designedFor")}</span>
              <Heart className="w-4 h-4 text-warm fill-warm" />
              <span>{t("footer.neurodiversity")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
