import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import YouTubeAdPlacements from "@/components/YouTubeAdPlacements";
import { Play, Target, TrendingUp, Users, MessageCircle, Award, Youtube, CheckCircle } from "lucide-react";

const Features = () => {
  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Navbar />
      
      {/* Features Header with YouTube Background */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <Youtube className="absolute top-10 left-10 h-20 w-20 text-red-100 opacity-30 animate-pulse" />
          <Play className="absolute top-32 right-20 h-16 w-16 text-red-200 opacity-40 animate-bounce" />
          <TrendingUp className="absolute bottom-20 left-32 h-24 w-24 text-red-100 opacity-30" />
          <Youtube className="absolute bottom-10 right-10 h-32 w-32 text-red-100 opacity-20" />
          <Play className="absolute top-1/2 left-1/4 h-12 w-12 text-red-200 opacity-30 animate-pulse" />
          <TrendingUp className="absolute top-20 right-1/3 h-18 w-18 text-red-100 opacity-40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            VIDFLYY FEATURES
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
            Discover how our YouTube Promotion platform saves you time and money while significantly boosting your subscriber count. Explore the powerful features we offer below.
          </p>
        </div>
      </section>

      {/* Creator and Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="animate-fade-in">
              <img 
                src="/lovable-uploads/1.webp" 
                alt="Content Creator" 
                className="rounded-2xl shadow-lg w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Professional Content Creator Tools
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our platform provides content creators with cutting-edge tools to maximize their YouTube presence. From ring lights to professional setups, we understand what creators need.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-red-600" />
                  <span className="text-gray-700">Professional studio setups</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-red-600" />
                  <span className="text-gray-700">High-quality lighting solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-red-600" />
                  <span className="text-gray-700">Content optimization tools</span>
                </div>
              </div>
            </div>
          </div>

          <YouTubeAdPlacements />

          {/* Ad Types Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                Ad Types VIDFLYY Uses
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">In-Feed Ads (Search Results & Suggested Video Ads):</h3>
                    <p className="text-gray-600">Position your videos in search results or as suggested content, capturing the attention of viewers actively looking for related topics. This ad type is ideal for engaging users who are exploring new videos.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">In-Stream Ads (Shown as a commercial within other videos):</h3>
                    <p className="text-gray-600">Functioning like TV commercials, these ads can appear before, during, or after other videos. They're skippable after 5 seconds, ensuring they reach viewers who are genuinely interested.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">YouTube Shorts Ads:</h3>
                    <p className="text-gray-600">Displayed within the Shorts feed, these ads are designed to capture attention quickly and drive engagement in the fast-paced Shorts environment.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-fade-in">
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 shadow-lg">
                <div className="bg-white rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Youtube className="h-8 w-8 text-red-600" />
                    <span className="text-lg font-semibold">YouTube Recommended Ads</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 h-32 flex items-center justify-center">
                    <Play className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Targeted Ad Placement</span>
                  </div>
                  <div className="bg-white rounded-lg p-3 flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Optimized for Engagement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Channel Promotion Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="animate-fade-in order-2 lg:order-1">
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 text-white shadow-lg">
                <div className="bg-white rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommend channel placements</h3>
                  <div className="space-y-3">
                    {['Rock Group Central', 'Music Time', 'Rock Group Central', 'Music Time'].map((channel, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                          <span className="text-sm text-gray-700">{channel}</span>
                        </div>
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                  <button className="bg-red-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-red-700 transition-colors">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
            <div className="animate-fade-in order-1 lg:order-2">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Promote Your Video on Competing Channels
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Efficient Bulk Addition:</h3>
                    <p className="text-gray-600">Bulk add channel and video URLs to target in seconds.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Powerful Keyword Search:</h3>
                    <p className="text-gray-600">Find related channels and videos with ease.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Automatic Recommendations:</h3>
                    <p className="text-gray-600">Let Vidflyy's smart system suggest the best channel placements for you.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Demographic Targeting Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Demographic and Location Targeting
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Age and Gender Targeting:</h3>
                    <p className="text-gray-600">Narrow down your audience to reach the right demographic.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Geographic Precision:</h3>
                    <p className="text-gray-600">Target viewers by country, state, or even a specific radius.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-fade-in">
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 text-white shadow-lg">
                <div className="bg-white rounded-xl p-16 flex items-center justify-center">
                  <CheckCircle className="h-24 w-24 text-red-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    
    </div>
  );
};

export default Features;
