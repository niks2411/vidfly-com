import { Play, Users, TrendingUp, Youtube, Target, BarChart3, Link } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoShowcase = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/917355518761', '_blank');
  };

  return (
    <section className="py-12 lg:py-16 bg-white font-montserrat relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            How To Promote YouTube Video with <span className="text-red-600">Vidflyy?</span>
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            Promote your video on YouTube and attract viewers that expand your community and grow your YouTube Channel.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {/* Step 1 - Select Your Video URL */}
          <div className="relative group">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                01
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center relative overflow-hidden group hover:scale-105 transition-all duration-300 pt-12 h-full">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Select Your Video URL</h3>
              <p className="text-gray-600 mb-4 text-left text-sm leading-relaxed">
                Pick your preferred video URL to advertise on YouTube and paste it into the <a href="https://Vidflyy.com/dashboard/channel-link?source=al" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline font-semibold">Vidflyy dashboard</a>. Activate the promo code available and set your desired budget.
              </p>
              
              {/* Video Mock-up */}
              <div className="bg-gray-900 rounded-xl p-4 mb-4 mx-auto">
                <div className="bg-red-600 rounded-lg p-5 text-white text-center relative">
                  <Link className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-sm font-medium">Paste Video URL</div>
                  <div className="absolute top-2 right-2 bg-red-500 rounded px-2 py-1 text-xs">
                    URL
                  </div>
                </div>
                <div className="mt-3 bg-gray-800 rounded px-3 py-2 text-white text-xs text-left">
                  <span className="text-gray-400">youtube.com/watch?v=...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 - Target Viewers in Ideal Location */}
          <div className="relative group">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                02
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 text-center relative overflow-hidden group hover:scale-105 transition-all duration-300 pt-12 h-full">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Target Viewers in Ideal Location</h3>
              <p className="text-gray-600 mb-4 text-left text-sm leading-relaxed">
                Target viewers in specific countries or expand globally for effective YouTube video marketing. It helps capture your audience and increase conversions from viewers interested in your content.
              </p>
              
              {/* Location Targeting Mock-up */}
              <div className="bg-white rounded-xl p-4 mb-4 border-2 border-yellow-200">
                <div className="mb-3">
                  <Target className="h-8 w-8 text-red-600 mx-auto mb-2" />
                </div>
                <div className="space-y-2">
                  <div className="bg-red-100 text-red-800 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between">
                    <span>🇺🇸 United States</span>
                    <span className="text-xs">Selected</span>
                  </div>
                  <div className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm flex items-center justify-between">
                    <span>🇬🇧 United Kingdom</span>
                  </div>
                  <div className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm flex items-center justify-between">
                    <span>🌍 Global</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 - Create Campaign */}
          <div className="relative group">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                03
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center relative overflow-hidden group hover:scale-105 transition-all duration-300 pt-12 h-full">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Create Campaign</h3>
              <p className="text-gray-600 mb-4 text-left text-sm leading-relaxed">
                Once you set your target audience and their related interests, preview and launch your campaign. We'll ensure it connects with audiences likely to become long-term subscribers.
              </p>
              
              {/* Campaign Dashboard Mock-up */}
              <div className="bg-white rounded-xl p-4 mb-4 border-2 border-green-200">
                <div className="mb-3">
                  <BarChart3 className="h-8 w-8 text-red-600 mx-auto" />
                </div>
                <div className="space-y-2">
                  <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Campaign Ready
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Audience: 50K+
                  </div>
                  <div className="bg-red-100 text-red-800 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    High Conversion
                  </div>
                </div>
                <Button className="w-full mt-3" size="sm">
                  LAUNCH CAMPAIGN
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            onClick={handleWhatsAppClick}
            size="lg"
            className="rounded-xl"
          >
            START GROWING TODAY →
          </Button>
          <p className="text-gray-600 text-sm mt-4">
            Join 58,000+ creators who trust Vidflyy
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
