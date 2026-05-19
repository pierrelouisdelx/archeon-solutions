import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Services />
      <CaseStudies />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}