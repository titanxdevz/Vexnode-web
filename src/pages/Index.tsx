import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PartnersMarquee from "@/components/PartnersMarquee";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import LimitedTimeOfferPopup from "@/components/LimitedTimeOfferPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LimitedTimeOfferPopup />
      <TopBanner />
      <Navbar />
      <HeroSection />
      <PartnersMarquee />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <BlogSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
