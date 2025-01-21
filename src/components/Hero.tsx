import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { GridPattern } from "./GridPattern";
import { motion, useScroll } from "framer-motion";

export const Hero = () => {
  const pattern = {
    y: -6,
    squares: [
      [-1, 2],
      [1, 3],
      ...Array.from({ length: 10 }, () => [
        Math.floor(Math.random() * 20) - 10,
        Math.floor(Math.random() * 20) - 10,
      ] as [number, number]), // Type assertion to ensure it's a tuple
    ] as [number, number][], // Type assertion for the entire array
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
    <div className="px-4">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={120}
          height={120}
          x="50%"
          y={0}
          squares={pattern.squares}
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-5deg] fill-primary/[0.05] stroke-primary/20"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto mt-32">
        <h1 className="font-semibold text-4xl sm:text-7xl text-center max-w-5xl mx-auto text-zinc-800 leading-tight tracking-tight">
          Revoluciona la manera de tener tu facturación electrónica con{" "}
          <span className="text-primary">LUPA</span>
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-xl tracking-tight text-zinc-600 text-center leading-normal">
          LUPA FE es una herramienta poderosa que ayuda a automatizar y digitalizar la facturación electrónica tuya o de tu negocio.{" "}
          Hazlo fácil.
        </p>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center items-center mt-12">
          <Button
            variant="outline"
            className="rounded-2xl py-2"
            asChild
          >
            <a href="/docs">Documentacion</a>
          </Button>
          <Button variant="default" className="rounded-2xl py-2" asChild>
            <a href="/signup">Prueba gratis</a>
          </Button>
        </div>

        <div
          style={{ perspective: "1000px" }}
          className="overflow-hidden pt-20 px-4 w-full relative"
        >
          <motion.div
            animate={{
              rotateX: isHalf ? 0 : 45,
              scale: isHalf ? [0.8, 1.05, 1] : 0.8,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 0.5,
              },
            }}
            className="relative w-[100%] overflow-x-hidden md:w-3/4 mx-auto h-[12rem] sm:h-[16rem] md:h-[24rem] lg:h-[32rem] -mb-12 md:-mb-32 max-w-5xl"
          >
            <img
              src="/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png"
              alt="LUPA Dashboard Preview"
              className="rounded-xl md:rounded-3xl border mx-auto object-cover shadow-sm object-right-top w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;