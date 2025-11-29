
import { Check, Clock, Target, TrendingUp, Shield } from "lucide-react";

const PricingInfo = () => {
  const features = [
    {
      icon: Target,
      title: "Targeted Promotion",
      description: "We promote your videos to audiences most likely to engage with your content"
    },
    {
      icon: Clock,
      title: "Quick Results",
      description: "See initial results within 24-48 hours of campaign launch"
    },
    {
      icon: TrendingUp,
      title: "Organic Growth",
      description: "All views and engagement come from real, active YouTube users"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "100% compliant with YouTube's terms of service and guidelines"
    }
  ];

  return (
    <section className="py-20 bg-white font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How <span className="text-red-600">VIDFLYY</span> Pricing Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our transparent pricing model ensures you get the best value for your investment in YouTube growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">What's Included in Every Plan</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Real, organic views from active users</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Detailed analytics and progress reports</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">24/7 customer support</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Money-back guarantee</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">YouTube ToS compliant promotion</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Targeted audience engagement</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">No password or sensitive info required</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Dedicated account manager</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingInfo;
