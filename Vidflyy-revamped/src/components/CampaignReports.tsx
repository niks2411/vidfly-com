import { BarChart3, TrendingUp, Eye, Users, MessageCircle, ThumbsUp } from "lucide-react";

const CampaignReports = () => {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-red-50 to-white relative overflow-hidden font-montserrat">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-16 h-16 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-red-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-red-50 rounded-full opacity-25 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            YouTube Video Campaign <span className="text-red-600">Reports</span>
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            Real-time analytics and detailed campaign performance reports to track your video's success
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Campaign Overview */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 lg:p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-red-600" />
              Campaign Overview
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mb-6">
              <div className="bg-blue-50 rounded-xl p-5 hover:bg-blue-100 transition-colors duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-600 font-medium text-sm">Total Reach</span>
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-blue-700">57.1K</div>
                <div className="text-xs text-blue-600 mt-1">+15% vs last week</div>
              </div>
              
              <div className="bg-red-50 rounded-xl p-5 hover:bg-red-100 transition-colors duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-red-600 font-medium text-sm">Engagement</span>
                  <TrendingUp className="h-5 w-5 text-red-600" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-red-700">29.8K</div>
                <div className="text-xs text-red-600 mt-1">+25% vs last week</div>
              </div>
            </div>

            {/* Performance Graph Mockup */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-semibold text-gray-900 mb-4 text-base">Performance Timeline</h4>
              <div className="h-40 lg:h-48 bg-gradient-to-r from-red-100 to-red-200 rounded-lg flex items-end justify-between p-4 gap-2">
                <div className="flex-1 bg-red-500 rounded-t" style={{height: '60%'}}></div>
                <div className="flex-1 bg-red-500 rounded-t" style={{height: '80%'}}></div>
                <div className="flex-1 bg-red-600 rounded-t" style={{height: '90%'}}></div>
                <div className="flex-1 bg-red-600 rounded-t" style={{height: '100%'}}></div>
                <div className="flex-1 bg-red-500 rounded-t" style={{height: '75%'}}></div>
                <div className="flex-1 bg-red-500 rounded-t" style={{height: '85%'}}></div>
              </div>
            </div>
          </div>

          {/* Video Performance */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-5 lg:p-6 hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <h3 className="text-base font-bold text-gray-900 mb-4">Top Performing Videos</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                  <div className="w-10 h-7 bg-red-600 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">▶</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">Tech Review Video</div>
                    <div className="text-xs text-gray-600">25.3K views</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                  <div className="w-10 h-7 bg-red-600 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">▶</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">Tutorial Series</div>
                    <div className="text-xs text-gray-600">18.7K views</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                  <div className="w-10 h-7 bg-red-600 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">▶</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">Product Demo</div>
                    <div className="text-xs text-gray-600">12.1K views</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 lg:p-6 hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <h3 className="text-base font-bold text-gray-900 mb-4">Engagement Metrics</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700">Likes</span>
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">2.8K</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Comments</span>
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">456</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-gray-700">New Subscribers</span>
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">189</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignReports;
