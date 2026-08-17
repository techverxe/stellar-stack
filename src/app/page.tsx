import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Pricing } from "@/components/Pricing";
import { WorkSection } from "@/components/WorkSection";
import { LocalPresence } from "@/components/LocalPresence";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main id="main">
      <Header />
      <Hero />
      <Services />
      <Pricing />
      <WorkSection />
      <LocalPresence />
      <ContactSection />
      <Footer />
    </main>
  );
}
