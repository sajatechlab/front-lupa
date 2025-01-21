import { clsx } from "clsx";
import { useLocation } from "react-router-dom";
import React from "react";
import { Footer } from "./Footer";
import { Helmet } from "react-helmet";

interface MetaProps {
  title?: string;
  description?: string;
  type?: string;
  image?: string;
}

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  meta?: MetaProps;
}

export const Container = (props: ContainerProps) => {
  const { children, className, meta: customMeta } = props;
  const location = useLocation();

  const meta = {
    title: "LUPA-IA | Automatización Inteligente para tu Negocio",
    description: "LUPA es una SaaS que automatiza procesos. Está creada con IA para ayudar a empresarios y personas.",
    type: "website",
    image: "/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png",
    ...customMeta,
  };

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://lupa-ia.com${location.pathname}`}
        />
        <link
          rel="canonical"
          href={`https://lupa-ia.com${location.pathname}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="LUPA IA" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@lupaia" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Helmet>
      <div className="fixed top-0 h-14 w-full bg-gray-100 text-sm z-[999] bg-transparent backdrop-blur-2xl flex justify-center items-center">
        Usa LUPAMIGOS para un 25% descuento!
        <a
          className="text-white inline-flex items-center justify-center rounded-[10px] bg-gradient-to-b from-[#464d55] to-[#25292e] text-sm px-4 py-2 transition duration-150 shadow-[0_10px_20px_rgba(0,_0,_0,_.1),0_3px_6px_rgba(0,_0,_0,_.05)] hover:shadow-[rgba(0,_1,_0,_.2)_0_2px_8px] active:outline-none hover:opacity-80 ml-1"
          href="https://aceternity.lemonsqueezy.com/checkout/buy/ad25bad9-a669-4c62-ad84-5970ec0c0c12"
          target="__blank"
        >
          Compra ahora
        </a>
      </div>
      <div className="h-10"></div>
      <nav className="flex items-center justify-between p-6 md:px-12">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png" alt="Logo" className="h-8 w-8" />
          <span className="font-bold">LUPA IA</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="/#features" className="text-sm hover:text-primary">Funcionalidad</a>
          <a href="/#testimonials" className="text-sm hover:text-primary">Testimonios</a>
          <a href="/#pricing" className="text-sm hover:text-primary">Precio</a>
          <a href="/blog" className="text-sm hover:text-primary">Blogs</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="/login" className="text-sm hover:text-primary">Login</a>
          <a href="/signup" className="text-sm hover:text-primary bg-primary text-primary-foreground px-4 py-2 rounded-md">Registrarse</a>
        </div>
      </nav>
      <main className={clsx("antialiased", className)}>{children}</main>
      <Footer />
    </>
  );
};

export default Container;