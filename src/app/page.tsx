import Newsletter from "@/components/layout/Newsletter";
import LogoSlider from "@/components/layout/LogoSlider";
import Hero from "@/components/layout/Hero";
import Benefits from "@/components/layout/Benefits";
import Categories from "@/components/layout/Categories";
import FeaturedProducts from "@/components/layout/FeaturedProducts";
import Container from "@/components/layout/Container";
import About from "@/components/layout/About";

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <Container>
        <LogoSlider />
      </Container>
      <Categories />
      <FeaturedProducts />
      <About />
      <Newsletter />
    </>
  );
}
