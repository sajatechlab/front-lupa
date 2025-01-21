import Container from "@/components/Container";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CallToAction from "@/components/CallToAction";

const Index = () => {
  return (
    <Container>
      <div className="relative z-10 max-w-7xl mx-auto mt-32">
        <h1 className="font-semibold text-4xl sm:text-7xl text-center max-w-5xl mx-auto text-zinc-800 leading-tight tracking-tight">
          Revoluciona la manera de tener tu facturación electrónica con{" "}
          <span className="text-cyan-500">LUPA</span>
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-xl tracking-tight text-zinc-600 text-center leading-normal">
          LUPA FE es una herramienta poderosa que ayuda a automatizar y digitalizar la facturación electrónica tuya o de tu negocio.{" "}
          Hazlo fácil.
        </p>
      </div>
      <Features />
      <Testimonials />
      <Pricing />
      <CallToAction />
    </Container>
  );
};

export default Index;