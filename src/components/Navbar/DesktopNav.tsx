import { CustomLink } from "../CustomLink";
import Logo from "../Logo";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export const DesktopNav = ({ navItems }: { navItems: Array<{ name: string; link: string }> }) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleNavClick = (link: string) => {
    if (link.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(link.substring(1));
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(link);
    }
  };

  return (
    <div className="flex flex-row space-x-8 items-center antialiased px-6 py-3 rounded-full bg-[#222222]">
      <Logo />
      {navItems.map((navItem, idx) => (
        <button
          key={`link-${idx}`}
          onClick={() => handleNavClick(navItem.link)}
          className="text-white text-sm relative"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 transform bg-[#0EA5E9] scale-105 rounded-xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <span className="relative z-10 px-2 py-2 inline-block">
            {navItem.name}
          </span>
        </button>
      ))}
      <Link
        to="/login"
        className="font-medium text-white inline-flex items-center justify-center rounded-full bg-[#0EA5E9] text-sm px-6 py-2 transition duration-150 hover:opacity-90"
      >
        Iniciar sesión
      </Link>
    </div>
  );
};