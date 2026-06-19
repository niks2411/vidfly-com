"use client";

import { Users, Eye, Clock, DollarSign, Target, TrendingUp, MessageCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Services = () => {
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push("/get-started");
  };

  const serviceCards = [
    {
      title: "YOUTUBE SUBSCRIBERS",
      description: "We provide real content viewers who will subscribe to your channel and engage with your content",
      features: ["100% Organic Growth", "Real Audience Engagement", "Quality Subscribers", "Long-term Results"],
      icon: Users,
      gradient: "from-red-500 to-pink-500"
    },
    {
      title: "YOUTUBE VIEWS",
      description: "We provide real content viewers for your video, bringing quality traffic at minimal cost",
      features: ["High Retention Views", "Real User Interaction", "Worldwide Campaigns", "100% Secure Process"],
      icon: Eye,
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "YOUTUBE WATCHTIME",
      description: "We provide real audience engagement to help increase your watch time and channel growth",
      features: ["Quality Watch Time", "Organic Retention", "4000 Hours Goal", "Channel Monetization"],
      icon: Clock,
      gradient: "from-purple-500 to-red-500"
    },
    {
      title: "YOUTUBE REVENUE",
      description: "We help build your YouTube revenue through strategic optimization and sponsored campaigns",
      features: ["Revenue Optimization", "SEO Enhancement", "Monetization Setup", "Ad Revenue Boost"],
      icon: DollarSign,
      gradient: "from-green-500 to-red-500"
    }
  ];

  const workSteps = [
    {
      step: "01",
      title: "Choose Your Service",
      description: "Select the perfect service package that matches your channel's growth goals and budget requirements."
    },
    {
      step: "02",
      title: "Provide Video Details",
      description: "Share your video URL, target audience preferences, and campaign specifications with our team."
    },
    {
      step: "03",
      title: "Launch Campaign",
      description: "Our advanced targeting system promotes your content to genuinely interested viewers in your niche."
    },
    {
      step: "04",
      title: "Track Results",
      description: "Receive detailed analytics reports and real-time campaign performance updates via email dashboard."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-montserrat">
      {/* Services Header with Animation */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-white relative overflow-hidden">
        {/* Background Animation Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-50 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 right-20 w-24 h-24 bg-red-100 rounded-full opacity-40 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-red-50 rounded-full opacity-20 animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Animated Header Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-5 left-10 w-8 h-8 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute top-12 right-20 w-6 h-6 bg-red-600 rounded-full animate-bounce"></div>
            <div className="absolute bottom-5 left-32 w-10 h-10 bg-red-400 rounded-full animate-pulse"></div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 relative z-10">
            OUR <span className="text-red-600">SERVICES</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto relative z-10">
            Professional YouTube promotion services designed to accelerate your channel growth through targeted campaigns
          </p>
        </div>
      </section>

      {/* Service Cards with Enhanced Design */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Animations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-red-100 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-1/2 right-20 w-16 h-16 bg-red-200 rounded-full opacity-30 animate-bounce-slow"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-red-50 rounded-full opacity-25 animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12">
            {serviceCards.map((service, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden">
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                <div className="relative z-10 p-8">
                  {/* Header Section */}
                  <div className={`bg-gradient-to-r ${service.gradient} rounded-xl p-6 mb-6 text-white group-hover:scale-105 transition-transform duration-300`}>
                    <div className="flex items-center gap-4 mb-4">
                      <service.icon className="h-8 w-8" />
                      <h3 className="text-xl font-bold">{service.title}</h3>
                    </div>
                    <p className="text-white/90">{service.description}</p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group-hover:bg-red-50 transition-colors duration-300">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleGetStartedClick}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Get Started Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section with Enhanced Design */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 right-20 w-16 h-16 bg-red-200 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-red-50 rounded-full opacity-25 animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with Animation */}
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-5 left-10 w-8 h-8 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute top-12 right-20 w-6 h-6 bg-red-600 rounded-full animate-bounce"></div>
              <div className="absolute bottom-5 left-32 w-10 h-10 bg-red-400 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 relative z-10">
              How We <span className="text-red-600">Work</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto relative z-10">
              Our proven 4-step process ensures maximum results for your YouTube promotion campaigns
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workSteps.map((step, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group relative overflow-hidden">
                {/* Background animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/0 to-red-100/0 group-hover:from-red-50/50 group-hover:to-red-100/30 transition-all duration-500 rounded-2xl"></div>

                <div className="relative z-10 text-center">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
