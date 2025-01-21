import React from "react";
import { navItems } from "@/constants/navItems";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  const socials = [
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5 hover:text-primary transition duration-150" />,
      link: "https://twitter.com/aceternitylabs",
      ariaLabel: "Visítanos en Twitter",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5 hover:text-primary transition duration-150" />,
      link: "https://linkedin.com/in/leonardo-castro-bb7372160",
      ariaLabel: "Conéctate con nosotros en LinkedIn",
    },
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5 hover:text-primary transition duration-150" />,
      link: "https://github.com/aceternity",
      ariaLabel: "Explora nuestro código en GitHub",
    },
  ];

  return (
    <footer className="border-t py-12 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img 
              src="/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png" 
              alt="LUPA IA Logo" 
              className="h-10 w-10 object-contain" 
            />
            <span className="font-bold text-lg tracking-tight">LUPA IA</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
            {navItems.map((item, idx) => (
              <Link
                key={`footer-link-${idx}`}
                to={item.link}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <Separator className="w-full max-w-[80%]" />

          <p className="text-sm text-muted-foreground text-center max-w-[600px] mx-auto">
            © {new Date().getFullYear()} LUPA Marketing. 
            <br className="sm:hidden" /> 
            Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-6">
            {socials.map((social, idx) => (
              <a
                key={`social-link-${idx}`}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label={social.ariaLabel}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;