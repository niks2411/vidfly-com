
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Eye, Clock, DollarSign, Play, TrendingUp, Target, Award } from "lucide-react";

const Services = () => {
  const serviceCards = [
    {
      title: "YOUTUBE SUBSCRIBERS",
      description: "We provide real content viewers who will subscribe those channels and like",
      features: ["100% Organic In-line ad", "Watch after-s Comments on video", "100% Real Audience", "100% Real"],
      bgGradient: "bg-gradient-to-r from-red-500 to-pink-500",
      icon: Users
    },
    {
      title: "YOUTUBE VIEWS",
      description: "We provide real content viewers for your video, bring traffic on videos at minimal cost",
      features: ["Real User Interaction", "High Retention Views", "Genuine Worldwide Campaigns", "100% Secure"],
      bgGradient: "bg-gradient-to-r from-orange-500 to-red-500",
      icon: Eye
    },
    {
      title: "YOUTUBE WATCHTIME",
      description: "We provide real audience for YouTube video which will help to increase watch time gradually",
      features: ["Valid Total Get Lightning retention", "240-01 to Organic Lifetime", "4000 Qualitative & Real"],
      bgGradient: "bg-gradient-to-r from-purple-500 to-red-500",
      icon: Clock
    },
    {
      title: "YOUTUBE REVENUE",
      description: "We can build your youtube total revenue of highly marketable will popular via sponsored ads",
      features: ["Complete channel optimization", "SEO Optimization", "Ranking of 1 per Ton", "Google Adsn 3 Live Trend"],
      bgGradient: "bg-gradient-to-r from-green-500 to-red-500",
      icon: DollarSign
    }
  ];

  const workSteps = [
    {
      step: "01",
      title: "Choose",
      description: "First you need to choose the service you need from the list of our services carefully."
    },
    {
      step: "02", 
      title: "Provide",
      description: "Now tell us that details you want us to know and then choose the Package and delivery time."
    },
    {
      step: "03",
      title: "Campaign",
      description: "We will then send all your targeted selected audience that will promote your videos."
    },
    {
      step: "04",
      title: "Report",
      description: "We will then send you the proof statistics within 24 hours via email."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Navbar />
      
      {/* Services Header */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            SERVICES
          </h1>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {serviceCards.map((service, index) => (
              <div key={index} className="relative">
                <div className={`${service.bgGradient} rounded-2xl p-8 text-white shadow-lg`}>
                  <div className="flex items-center gap-4 mb-4">
                    <service.icon className="h-8 w-8" />
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-white/90 mb-6">{service.description}</p>
                </div>
                <div className="mt-6 ml-8">
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-gray-700">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How We Work
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {workSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
