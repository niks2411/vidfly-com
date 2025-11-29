import { Youtube, Play } from "lucide-react";

const YouTubeAdPlacements = () => {
  return (
    <section className="py-12 lg:py-16 bg-white relative overflow-hidden font-montserrat">
      <div className="absolute inset-0">
        <Youtube className="absolute top-10 left-10 h-16 w-16 text-red-100 opacity-30 animate-pulse" />
        <Play className="absolute top-32 right-20 h-12 w-12 text-red-200 opacity-40 animate-bounce" />
        <Youtube className="absolute bottom-20 left-32 h-20 w-20 text-red-100 opacity-30" />
        <Play className="absolute bottom-10 right-10 h-24 w-24 text-red-100 opacity-20" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Get your video promoted across YouTube's <span className="text-red-600">top ad placements</span>
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            Reach your target audience through strategic ad placements across YouTube's platform
          </p>
        </div>

        {/* Exact YouTube Interface Recreation */}
        <div className="bg-red-600 rounded-3xl p-6 lg:p-8 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Side - Before Similar Videos */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* YouTube Header */}
              <div className="bg-white px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Youtube className="h-5 w-5 text-red-600" />
                  <span className="font-semibold text-gray-700 text-sm">YouTube</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-7 mx-2"></div>
                  <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
                </div>
              </div>
              
              {/* Main Video Area */}
              <div className="p-4">
                <div className="bg-red-500 rounded-xl p-6 lg:p-8 text-white relative mb-4">
                  <div className="absolute top-3 left-3">
                    <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">Ad</span>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg lg:text-xl font-bold mb-3">Your Video is Shown Here Before Similar Videos</h3>
                    <div className="bg-white bg-opacity-20 w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center mx-auto">
                      <Play className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Side Recommendation */}
                <div className="bg-red-400 rounded-lg p-4 text-white relative">
                  <div className="absolute top-2 left-2">
                    <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">Ad</span>
                  </div>
                  <h4 className="font-semibold mb-1 text-sm">And Here</h4>
                  <p className="text-sm text-red-100">Your promoted video shown as recommended</p>
                </div>
                
                {/* Video Descriptions */}
                <div className="mt-4 space-y-2">
                  <div className="bg-gray-200 h-3 rounded w-3/4"></div>
                  <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                </div>
              </div>
            </div>

            {/* Right Side - In-feed Ads */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* YouTube Header */}
              <div className="bg-white px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Youtube className="h-5 w-5 text-red-600" />
                  <span className="font-semibold text-gray-700 text-sm">YouTube</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-7 mx-2"></div>
                  <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
                </div>
              </div>
              
              {/* Search Results Area */}
              <div className="p-4">
                <div className="bg-red-500 rounded-xl p-5 lg:p-6 text-white relative mb-4">
                  <h3 className="text-lg font-bold mb-3">In-feed ads will be shown here</h3>
                  <div className="text-sm mb-3">Your promoted video shown at the top of the search results for relevant keywords</div>
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">Ad</span>
                    <span className="text-sm text-red-100">Your channel • 140k views</span>
                  </div>
                </div>
                
                {/* Other Search Results */}
                <div className="space-y-3">
                  <div className="bg-gray-200 h-14 rounded-lg"></div>
                  <div className="bg-gray-200 h-14 rounded-lg"></div>
                  <div className="bg-gray-200 h-14 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeAdPlacements;
