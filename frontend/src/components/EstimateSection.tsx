
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, Users, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const EstimateSection = () => {
  const router = useRouter();
  const [budget, setBudget] = useState("");
  const [estimatedViews, setEstimatedViews] = useState(0);
  const [estimatedSubscribers, setEstimatedSubscribers] = useState(0);

  const handleGetStartedClick = () => {
    router.push("/get-started");
  };

  const calculateEstimate = () => {
    const budgetAmount = parseFloat(budget) || 0;
    // Conversion rates based on Indian market
    const viewsPerRupee = 10; // Approximately 10 views per rupee
    const subscribersPerThousandViews = 15; // 1.5% conversion rate

    const views = Math.round(budgetAmount * viewsPerRupee);
    const subscribers = Math.round((views * subscribersPerThousandViews) / 1000);

    setEstimatedViews(views);
    setEstimatedSubscribers(subscribers);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      calculateEstimate();
    }
  };

  return (
    <section className="py-20 bg-white font-montserrat">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Estimate Your Promotion's <span className="text-red-600">Potential</span>
          </h2>
          <p className="text-xl text-gray-600">
            See how far your budget can take your YouTube channel
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-900 mb-2">
                  Enter Your Budget
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="5000"
                    className="w-full pl-8 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                  />
                </div>
              </div>

              <Button
                onClick={calculateEstimate}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Estimate
              </Button>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="h-6 w-6 text-blue-600" />
                  <span className="text-lg font-semibold text-gray-900">Estimated Views</span>
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  {estimatedViews.toLocaleString()}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-6 w-6 text-green-600" />
                  <span className="text-lg font-semibold text-gray-900">Estimated Subscribers</span>
                </div>
                <div className="text-3xl font-bold text-green-600">
                  {estimatedSubscribers.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Ready to start promoting your videos?
            </p>
            <Button
              onClick={handleGetStartedClick}
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-3 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EstimateSection;
