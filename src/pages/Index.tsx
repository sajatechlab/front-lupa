import { Button } from "@/components/ui/button";
import { Github, Twitter } from "lucide-react";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CallToAction from "@/components/CallToAction";
import { Link } from "react-router-dom";
import { GridPattern } from "@/components/GridPattern";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";

const Index = () => {
  const pattern = {
    y: -6,
    squares: [
      [-1, 2] as [number, number],
      [1, 3] as [number, number],
      ...Array.from({ length: 10 }, () => {
        const x = Math.floor(Math.random() * 20) - 10;
        const y = Math.floor(Math.random() * 20) - 10;
        return [x, y] as [number, number];
      }),
    ] as [number, number][],
  };

  const [isHalf, setIsHalf] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (scrollY.get() > (window.innerHeight * 2) / 10) {
        setIsHalf(true);
      } else {
        setIsHalf(false);
      }
    };
    scrollY.onChange(handleScroll);
    return () => {
      scrollY.clearListeners();
    };
  }, [scrollY]);

  return (
    <div className="min-h-screen bg-background">
      {/* New Promotion Banner */}
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

      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 md:px-12">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png" alt="Logo" className="h-8 w-8" />
          <span className="font-bold">LUPA IA</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/#features" className="text-sm hover:text-primary">Funcionalidad</Link>
          <Link to="/#testimonials" className="text-sm hover:text-primary">Testimonios</Link>
          <Link to="/#pricing" className="text-sm hover:text-primary">Precio</Link>
          <Link to="/blog" className="text-sm hover:text-primary">Blogs</Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Registrarse</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-4">
        <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
          <GridPattern
            width={120}
            height={120}
            x="50%"
            y={pattern.y}
            squares={pattern.squares}
            className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-5deg] fill-tertiary/[0.05] stroke-gray-100 dark:fill-primary dark:stroke-gray-100"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto mt-32">
          <h1 className="font-semibold text-4xl sm:text-7xl text-center max-w-5xl mx-auto text-zinc-800 leading-tight tracking-tight">
            Revoluciona la manera de tener tu facturación electrónica con{" "}
            <span className="text-cyan-500">LUPA</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl tracking-tight text-zinc-600 text-center leading-normal">
            LUPA FE es una herramienta poderosa que ayuda a automatizar y digitalizar la facturación electrónica tuya o de tu negocio.{" "}
            Hazlo fácil.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center items-center mt-12">
            <Button variant="outline" asChild className="rounded-2xl">
              <Link to="/signup">Documentacion</Link>
            </Button>
            <Button asChild className="rounded-2xl">
              <Link to="/signup">Prueba gratis</Link>
            </Button>
          </div>

          <div style={{ perspective: "1000px" }} className="overflow-hidden pt-20 px-4 w-full relative">
            <motion.div
              animate={{
                rotateX: isHalf ? 0 : 45,
                scale: isHalf ? [0.8, 1.05, 1] : 0.8,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 0.5,
              }}
              className="relative w-[100%] overflow-x-hidden md:w-3/4 mx-auto h-[12rem] sm:h-[16rem] md:h-[24rem] lg:h-[32rem] -mb-12 md:-mb-32 max-w-5xl"
            >
              <img
                src="/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png"
                alt="Landing"
                className="rounded-xl md:rounded-3xl border mx-auto object-cover shadow-sm object-right-top w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <Features />
      <Testimonials />
      <Pricing />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
