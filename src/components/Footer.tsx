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
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5 hover:text-primary transition duration-150" />,
      link: "https://linkedin.com/in/leonardo-castro-bb7372160",
    },
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5 hover:text-primary transition duration-150" />,
      link: "https://github.com/aceternity",
    },
  ];

  return (
    <footer className="border-t py-10">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png" alt="Logo" className="h-8 w-8" />
            <span className="font-bold">LUPA IA</span>
          </div>

          <nav className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            {navItems.map((item, idx) => (
              <Link
                key={`footer-link-${idx}`}
                to={item.link}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <Separator className="my-4" />

          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} LUPA Marketing. All rights reserved.
          </p>

          <div className="flex gap-4">
            {socials.map((social, idx) => (
              <a
                key={`social-link-${idx}`}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.name}
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