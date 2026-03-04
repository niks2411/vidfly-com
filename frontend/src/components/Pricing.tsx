import Navbar from "@/components/Navbar";
import EstimateSection from "@/components/EstimateSection";
import PricingInfo from "@/components/PricingInfo";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ExampleCampaign from "@/components/ExampleCampaign";
import ScrollProgress from "@/components/ScrollProgress";
import { Check, Users, Eye, Heart, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTrackEvent } from "@/hooks/use-track-event";
import { promotionPackages } from "./CampaignPackages";

const PricingPage = () => {
  const router = useRouter();
  const trackEvent = useTrackEvent();

  // View-based promotion packages (kept in sync with /campaign/packages)
  const viewPlans = promotionPackages.map((pkg) => {
    const totalViews = (pkg as any).totalViews || pkg.views;
    const hasAI = pkg.hasAI;
    const discount = (pkg as any).discount as number | undefined;
    const bonusViews = (pkg as any).bonusViews as number | undefined;
    const isPopular = (pkg as any).isPopular;
    const isPremium = (pkg as any).isPremium;

    return {
      name: pkg.name,
      price: `₹${pkg.price.toLocaleString()}`,
      originalPrice: undefined as string | undefined,
      description: "YouTube Video Promotion",
      subscribers: undefined as string | undefined,
      watchHours: `${totalViews.toLocaleString()}+ Views`,
      popular: isPopular || isPremium,
      badge: isPremium ? "PREMIUM" : isPopular ? "MOST POPULAR" : undefined,
      features: [
        `${totalViews.toLocaleString()}+ real, high-intent viewers`,
        hasAI ? "AI targeting included" : "Standard niche-based targeting",
        "Multi-format promotion (TrueView, In-Feed & Shorts)",
        "Safe, Google Ads–compliant delivery",
        ...(discount && bonusViews
          ? [
            `${discount}% instant discount`,
            `+${bonusViews.toLocaleString()} bonus views included`,
          ]
          : []),
      ],
    };
  });

  const subscriptionPlans = [
    {
      name: "Trial Package",
      price: "₹799",
      originalPrice: "₹999",
      description: "Perfect for Beginners",
      subscribers: "100-120 SUBSCRIBERS",
      popular: false,
      badge: "STARTER",
      features: [
        "Real audience engagement",
        "Organic likes & comments",
        "Quality subscribers",
        "24/7 support",
        "Money-back guarantee"
      ]
    },
    {
      name: "Trust Package",
      price: "₹1,499",
      originalPrice: "₹1,999",
      description: "Most Popular Choice",
      subscribers: "250-300 SUBSCRIBERS",
      popular: true,
      badge: "BESTSELLER",
      features: [
        "Premium targeting options",
        "Enhanced engagement",
        "Priority customer support",
        "Detailed analytics report",
        "Growth strategy consultation"
      ]
    },
    {
      name: "Expert Package",
      price: "₹5,999",
      originalPrice: "₹7,999",
      description: "For Serious Creators",
      subscribers: "1000-1200 SUBSCRIBERS",
      popular: false,
      badge: "PROFESSIONAL",
      features: [
        "Advanced demographic targeting",
        "Multi-platform promotion",
        "Dedicated account manager",
        "Custom campaign strategy",
        "Monthly performance reviews"
      ]
    }
  ];

  const monetizationPlans = [
    {
      name: "Beginner",
      price: "₹12000",
      period: "",
      description: "YouTube Advertising",
      watchHours: "4000 Watch Hours",
      popular: false,
      features: [
        "Likes",
        "Comments",
        "Subscribers",
        "Engagement"
      ]
    },
    {
      name: "Ultimate",
      price: "₹18000",
      period: "",
      description: "YouTube Advertising",
      watchHours: "4000 Watch Hours + 1000 Subscribers",
      popular: true,
      badge: "25% OFF",
      features: [
        "Likes",
        "Comments",
        "Subscribers",
        "Engagement"
      ]
    }
  ];

  const handleGetStartedClick = (planName?: string) => {
    trackEvent("click_pricing_get_started", { plan: planName || "unknown" });
    router.push("/get-started");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const PlanGrid = ({ plans, title }: { plans: any[]; title: string }) => (
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{title}</h3>
      <div
        className={`grid ${plans.length === 2 ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-3"
          } gap-8`}
      >
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br from-red-50 via-white to-red-50 rounded-2xl p-8 shadow-lg relative animate-card-float border-2 border-red-100 hover:border-red-300 transition-all duration-500 hover:scale-105 ${plan.popular ? "ring-2 ring-red-500 scale-105" : ""
              }`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {plan.badge && (
              <div className="absolute -top-4 right-4">
                <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold rotate-12 animate-pulse">
                  {plan.badge}
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <div className="bg-red-600 text-white py-4 px-6 rounded-xl mb-4 animate-gradient-shift" style={{ background: 'linear-gradient(45deg, #dc2626, #ef4444, #dc2626)' }}>
                <h4 className="text-xl font-bold">{plan.name}</h4>
                <p className="text-red-100 text-sm">{plan.description}</p>
              </div>

              <div className="mb-4 animate-price-scale">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.originalPrice && (
                    <div className="text-right">
                      <span className="text-lg text-gray-400 line-through block">{plan.originalPrice}</span>
                      <span className="text-green-600 text-sm font-semibold">Save 20%</span>
                    </div>
                  )}
                </div>
              </div>

              {plan.subscribers && (
                <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                  {plan.subscribers}
                </div>
              )}

              {plan.watchHours && (
                <div className="text-gray-700 font-medium mb-4">
                  {plan.watchHours}
                </div>
              )}
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-3 animate-feature-slide-in" style={{ animationDelay: `${(index * 0.1) + (featureIndex * 0.1)}s` }}>
                  <div className="flex items-center gap-2 text-gray-700">
                    {feature === 'Views' && <Eye className="h-4 w-4 text-gray-500" />}
                    {feature === 'Likes' && <Heart className="h-4 w-4 text-gray-500" />}
                    {feature === 'Comments' && <div className="h-4 w-4 rounded-full bg-gray-400"></div>}
                    {feature === 'Subscribers' && <Users className="h-4 w-4 text-gray-500" />}
                    {feature === 'Engagement' && <div className="h-4 w-4 rounded-full bg-gray-400 flex items-center justify-center"><span className="text-xs">+</span></div>}
                    {!['Views', 'Likes', 'Comments', 'Subscribers', 'Engagement'].includes(feature) && <Check className="h-4 w-4 text-green-600" />}
                    <span>{feature}</span>
                  </div>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleGetStartedClick(plan.name)}
              className={`w-full py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 animate-button-pulse ${plan.popular ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
            >
              🚀 GET STARTED NOW
            </Button>

          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-founders">
      <Navbar />

      {/* Hero Section for Pricing Page with red themed background */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-pink-50 relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-red-200 rounded-full opacity-15 animate-float"></div>
          <div className="absolute top-1/2 right-20 w-16 h-16 bg-red-300 rounded-full opacity-20 animate-bounce-slow"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-red-100 rounded-full opacity-25 animate-pulse-slow"></div>
          <div className="absolute top-1/4 right-1/4 w-18 h-18 bg-red-200 rounded-full opacity-10 animate-morph"></div>
          <div className="absolute bottom-1/4 left-1/4 w-22 h-22 bg-red-150 rounded-full opacity-15 animate-rotate-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="section-heading text-center !mb-4">
            Pricing <span className="text-red-600 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text  ">Plans</span>
          </h1>
          <p className="section-desc text-center max-w-3xl mx-auto">
            Choose the perfect plan to grow your YouTube channel and maximize your reach.
          </p>
        </div>
      </section>

      {/* Example Campaign Performance Section */}
      <ExampleCampaign />

      {/* Subscription and Monetization Plans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading text-center !mb-4">
              Choose Your <span className="text-red-600">Plan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible pricing plans designed to fit every creator's needs and budget.
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Subscribers Plan</h3>
            <p className="text-center text-gray-600 mb-8 max-w-4xl mx-auto">We Advertise Your YouTube Video in Form Of True View Discovery Ad until The Channel Achieves Commited Target of Subscribers.</p>
            <PlanGrid plans={subscriptionPlans} title="" />
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Monetization Plan</h3>
            <p className="text-center text-gray-600 mb-8 max-w-4xl mx-auto">We Achieve YouTube Watch Hour Criteria With The Help Of Ads Platform, We Reward People To Watch Your Video On Different Games & Websites</p>
            <PlanGrid plans={monetizationPlans} title="" />
          </div>
        </div>
      </section>

      <PricingInfo />
      <FAQ />
      <Footer />
    </div>
  );
};

export default PricingPage;
