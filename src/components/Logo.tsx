import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  textClassName?: string;
}

const Logo = ({ textClassName = "text-white" }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img src="/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png" alt="Logo" className="h-8 w-8" />
      <span className={`font-bold ${textClassName}`}>LUPA IA</span>
    </Link>
  );
};

export default Logo;