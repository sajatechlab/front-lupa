import { CustomLink } from "./CustomLink";

interface LogoProps {
  textClassName?: string;
}

const Logo = ({ textClassName }: LogoProps) => {
  return (
    <CustomLink href="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded" />
      <span className={`text-foreground font-medium ${textClassName}`}>
        LUPA IA
      </span>
    </CustomLink>
  );
};

export default Logo;