import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NewServices from "@/components/NewServices";
import YouTubeAdPlacements from "@/components/YouTubeAdPlacements";
import VideoShowcase from "@/components/VideoShowcase";
import VideoPromotionCalculator from "@/components/VideoPromotionCalculator";
import Stats from "@/components/Stats";
import ExampleCampaign from "@/components/ExampleCampaign";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import CampaignReports from "@/components/CampaignReports";
import OurWorks from "@/components/OurWorks";
import FeaturedPartners from "@/components/FeaturedPartners";
import Footer from "@/components/Footer";
import TipsSection from "@/components/TipsSection";
import LiveChatSupport from "@/components/LiveChatSupport";


import GoogleAdsSection from "@/components/GoogleAdsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Navbar />
      <Hero />
      <GoogleAdsSection />
      
      <VideoPromotionCalculator />
      <VideoShowcase />
      <NewServices />
      <YouTubeAdPlacements />
      <TipsSection />
      <Testimonials />
      <CampaignReports />
      <OurWorks />
      <LiveChatSupport />
      <Footer />
    </div>
  );
};

export default Index;