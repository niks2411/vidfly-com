import Hero from "@/components/Hero";
import NewServices from "@/components/NewServices";
import YouTubeGrowthCampaigns from "@/components/YouTubeGrowthCampaigns";
import PromotionCTA from "@/components/PromotionCTA";
import HowItWorks from "@/components/HowItWorks";
import GoogleAdsSection from "@/components/GoogleAdsSection";
import VideoShowcaseNew from "@/components/VideoShowcaseNew";
import WeeklyBudgetCTA from "@/components/WeeklyBudgetCTA";
import ComparisonTable from "@/components/ComparisonTable";
import FAQ from "@/components/FAQ";
import { constructMetadata } from "@/lib/seo";
import { FAQSchema, HomeSoftwareApplicationSchema } from "@/components/Schema";

export const metadata = constructMetadata({
  title: "Vidflyy - YouTube Video Promotion Made Easy (Real Views & Subscribers Fast)",
  description: "Launch YouTube growth campaigns in seconds. Get real views, subscribers & engagement with zero bots. Full control. Try risk-free today!",
});

const homeFaqs = [
  {
    question: "What is YouTube channel promotion and how does Vidflyy help?",
    answer: "YouTube channel promotion is the process of increasing your video views, subscribers, and engagement through targeted marketing strategies. Vidflyy helps you promote your YouTube channel using advanced Google Ads campaigns, ensuring your videos reach real and relevant audiences who are genuinely interested in your content."
  },
  {
    question: "Is Vidflyy the best YouTube promotion company for real views and subscribers?",
    answer: "Vidflyy is designed to be one of the best YouTube promotion platforms by focusing on 100% real viewers, zero bots, and transparent campaign tracking. Unlike fake growth services, Vidflyy runs real ad campaigns that help you gain authentic views, subscribers, and engagement."
  },
  {
    question: "How does YouTube music promotion work on Vidflyy?",
    answer: "Vidflyy offers powerful YouTube music promotion services by targeting users based on their music preferences, interests, and behavior. Whether you’re an independent artist or a label, you can promote music on YouTube to reach the right audience and grow your fanbase organically."
  },
  {
    question: "Can I promote music on YouTube using ads with full control?",
    answer: "Yes, with Vidflyy you get full control over your YouTube music marketing campaigns. You can set your budget, define your audience, and launch campaigns instantly—all from a simple dashboard. This makes music promotion on YouTube fast, scalable, and effective."
  },
  {
    question: "Is there any free YouTube channel promotion available in India?",
    answer: "While completely free YouTube promotion in India is limited, Vidflyy allows you to start campaigns with a minimal budget and test performance risk-free. This gives you an affordable way to experience professional YouTube promotion without heavy upfront costs."
  },
  {
    question: "Are the views and subscribers from Vidflyy real or fake?",
    answer: "All views, subscribers, and engagement generated through Vidflyy are 100% real. The platform uses Google Ads to deliver your content to genuine users, ensuring compliance with YouTube policies and long-term channel growth."
  },
  {
    question: "How quickly can I launch a YouTube promotion campaign?",
    answer: "You can launch your YouTube promotion campaign within seconds on Vidflyy. Simply add your video, set your budget, and go live instantly. The platform is built for speed and simplicity, making it ideal for creators, brands, and marketers."
  },
  {
    question: "Who should use YouTube promotion services like Vidflyy?",
    answer: "Vidflyy is perfect for content creators, businesses, influencers, and musicians looking to grow on YouTube. Whether you’re promoting a music video, product, or personal brand, YouTube promotion services help you reach a wider and more targeted audience efficiently."
  }
];

export default function Home() {
    return (
        <div className="min-h-screen bg-white font-founders home-page-container">
            <HomeSoftwareApplicationSchema />
            <FAQSchema items={homeFaqs} />
            <Hero showStats={true} />
            <GoogleAdsSection />
            <HowItWorks />
            <YouTubeGrowthCampaigns />
            <PromotionCTA />
            <VideoShowcaseNew />
            <NewServices />
            <ComparisonTable />
            <WeeklyBudgetCTA />
            <FAQ items={homeFaqs} />
        </div>
    );
}
