import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import About from "@/components/About";
import AcademicAffiliations from "@/components/AcademicAffiliations";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <TrustedBy />
      <Services />
      <CaseStudies />
      <About />
      <AcademicAffiliations />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
