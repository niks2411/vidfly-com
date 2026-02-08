import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Users, Heart } from "lucide-react";

const ExampleCampaign = () => {
  const [selectedBudget, setSelectedBudget] = useState("");
  const [customBudget, setCustomBudget] = useState("");

  const budgetOptions = [
    { value: "500", label: "₹500" },
    { value: "1000", label: "₹1000" },
    { value: "2000", label: "₹2000" },
    { value: "5000", label: "₹5000" },
    { value: "10000", label: "₹10000" },
    { value: "15000", label: "₹15000" },
    { value: "25000", label: "₹25000" },
    { value: "50000", label: "₹50000" }
  ];

  const formatNumber = (num: number) => {
    if (num >= 100000) {
      return `${(num / 1000).toFixed(0)}K`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getEstimates = (budget: number) => {
    if (budget === 0) {
      return {
        views: "0",
        subscribers: "0",
        likes: "0"
      };
    }

    // Views calculation: Budget / 0.20
    const totalViews = budget / 0.20;

    // Subscribers: 8-13% of views
    const minSubscribers = Math.floor(totalViews * 0.08);
    const maxSubscribers = Math.floor(totalViews * 0.13);

    // Likes: 6-9% of views
    const minLikes = Math.floor(totalViews * 0.06);
    const maxLikes = Math.floor(totalViews * 0.09);

    return {
      views: formatNumber(totalViews),
      subscribers: `${formatNumber(minSubscribers)} - ${formatNumber(maxSubscribers)}`,
      likes: `${formatNumber(minLikes)} - ${formatNumber(maxLikes)}`
    };
  };

  const currentBudget = parseInt(customBudget || selectedBudget || "0");
  const estimates = getEstimates(currentBudget);

  const handleEstimate = () => {
    console.log("Budget:", currentBudget, "Estimates:", estimates);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEstimate();
    }
  };

  const handleBudgetChange = (value: string) => {
    setCustomBudget(value);
    setSelectedBudget("");
  };

  const handleBudgetSelect = (value: string) => {
    setSelectedBudget(value);
    setCustomBudget(value); // Also update input field to show selected value
  };

  return (
    <section className="py-12 lg:py-16 bg-gray-50 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Container Box */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="grid lg:grid-cols-2">
            {/* Left Side - Campaign Performance */}
            <div className="p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-200">
              <div className="flex items-center gap-2 mb-6 p-3 bg-red-50 rounded-lg">
                <Shield className="h-5 w-5 text-red-600 flex-shrink-0" />
                <span className="text-red-700 font-medium text-sm">You're protected by VIDFLYY's satisfaction guarantee!</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">Example Campaign Performance</h3>
              <p className="text-gray-600 mb-6 text-base leading-relaxed">
                Curious about what VIDFLYY can do for your YouTube channel? Below are examples of potential reach from past campaigns at different budget levels.
              </p>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3 text-base">Enter budget</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold text-base">₹</span>
                    <input
                      type="number"
                      value={customBudget}
                      onChange={(e) => handleBudgetChange(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="0"
                      min="0"
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base transition-all"
                    />
                  </div>
                  <Button
                    onClick={handleEstimate}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 transition-all duration-300 hover:scale-105 w-full sm:w-auto text-base font-semibold"
                  >
                    Estimate
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 font-semibold mb-3 text-base">Or select your budget</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {budgetOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleBudgetSelect(option.value)}
                      className={`p-3 rounded-lg border-2 text-center font-semibold transition-all duration-200 hover:scale-105 text-sm ${selectedBudget === option.value
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-red-400'
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-red-50 rounded-lg p-4 mb-4 border border-red-100">
                <p className="text-sm text-red-800 font-semibold">
                  💡 Pricing: ₹0.20 per view
                </p>
              </div>

              <div className="text-xs text-gray-500 italic leading-relaxed">
                *Important: The figures above are estimates based on historical averages and are NOT a guarantee of future performance. Your actual results will vary based on your video's content, audience targeting, and other factors.
              </div>
            </div>

            {/* Right Side - Estimated Reach */}
            <div className="bg-gradient-to-br from-red-600 to-red-800 p-6 lg:p-10 text-white">
              <h3 className="text-2xl font-bold mb-8">Estimated Potential Reach:</h3>

              <div className="space-y-5">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Eye className="h-6 w-6 text-blue-200 flex-shrink-0" />
                    <span className="text-base font-semibold">Potential Views*</span>
                  </div>
                  <div className="text-3xl font-bold">{estimates.views}</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="h-6 w-6 text-red-300 flex-shrink-0" />
                    <span className="text-base font-semibold">Potential Subscribers*</span>
                  </div>
                  <div className="text-3xl font-bold">{estimates.subscribers}</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="h-6 w-6 text-pink-300 flex-shrink-0" />
                    <span className="text-base font-semibold">Potential Likes*</span>
                  </div>
                  <div className="text-3xl font-bold">{estimates.likes}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExampleCampaign;
