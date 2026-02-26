import Hero from "@/components/Hero";
import NewServices from "@/components/NewServices";
import YouTubeGrowthCampaigns from "@/components/YouTubeGrowthCampaigns";
import PromotionCTA from "@/components/PromotionCTA";
import HowItWorks from "@/components/HowItWorks";
import GoogleAdsSection from "@/components/GoogleAdsSection";
import VideoShowcaseNew from "@/components/VideoShowcaseNew";
import WeeklyBudgetCTA from "@/components/WeeklyBudgetCTA";
import ComparisonTable from "@/components/ComparisonTable";

export default function Home() {
    return (
        <div className="min-h-screen bg-white font-montserrat">
            <Hero showStats={true} />
            <GoogleAdsSection />
            <HowItWorks />
            <YouTubeGrowthCampaigns />
            <PromotionCTA />
            <VideoShowcaseNew />
            <NewServices />
            <WeeklyBudgetCTA />
            <ComparisonTable />
        </div>
    );
}
