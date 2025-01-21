import Container from "@/components/Container";
import { Hero } from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CallToAction from "@/components/CallToAction";

const Index = () => {
  return (
    <Container>
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <CallToAction />
    </Container>
  );
};

export default Index;