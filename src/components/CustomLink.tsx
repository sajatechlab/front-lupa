import { Link } from "react-router-dom";
import React from "react";

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const CustomLink = ({ href, children, className, onMouseEnter, onMouseLeave }: CustomLinkProps) => {
  return (
    <Link 
      to={href} 
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  );
};