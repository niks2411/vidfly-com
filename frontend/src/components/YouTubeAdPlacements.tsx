
import { CornerDownRight, CornerRightUp } from "lucide-react";
import { motion } from "framer-motion";

const YouTubeAdPlacements = () => {
  return (
    <section className="py-20 lg:py-24 bg-blue-50/30 overflow-hidden font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            What the promotion <span className="text-red-600">looks like</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto items-stretch">

          {/* In-Stream Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-gray-100 relative z-10 h-full">
              {/* Header Skeleton */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3 w-1/3">
                  <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                </div>
                <div className="h-6 w-6 rounded-full bg-gray-100"></div>
              </div>

              {/* Video Player Mockup */}
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8 rounded-2xl aspect-video relative overflow-hidden group">
                  <img
                    src="/lovable-uploads/red-theme-vlogger.png"
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-3 left-3 right-3 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-yellow-400"></div>
                  </div>
                </div>

                <div className="col-span-4 space-y-3">
                  <div className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-sm inline-block">Ad</div>
                  <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                  <div className="h-2 w-2/3 bg-gray-100 rounded-full"></div>
                  <div className="h-20 w-full bg-gray-50 rounded-xl mt-2"></div>
                </div>
              </div>

              {/* Bottom Skeleton */}
              <div className="mt-6 flex gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-100 shrink-0"></div>
                <div className="space-y-2 w-full">
                  <div className="h-2 w-3/4 bg-gray-100 rounded-full"></div>
                  <div className="h-2 w-1/2 bg-gray-100 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Arrow & Label */}
            <div className="absolute -bottom-24 left-12 md:left-24 text-center z-0">
              <svg width="60" height="60" viewBox="0 0 100 100" className="mx-auto text-gray-600 fill-none stroke-current stroke-2 transform rotate-12 filter drop-shadow-sm">
                <path d="M90,80 Q50,60 50,15" markerEnd="url(#arrowhead)" />
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <path d="M0,0 L10,3.5 L0,7 Z" fill="currentColor" />
                  </marker>
                </defs>
              </svg>
              <p className="text-gray-500 italic mt-1 font-handwriting">Your video in In-Stream</p>
            </div>
          </motion.div>


          {/* Suggestions Card */}
          <motion.div
            className="relative pt-12 md:pt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-gray-100 relative z-10 h-full">
              {/* Header Skeleton */}
              <div className="flex items-center justify-between mb-6">
                <div className="h-2 w-16 bg-gray-100 rounded-full"></div>
                <div className="h-6 w-6 rounded-full bg-gray-100"></div>
              </div>

              <div className="grid grid-cols-12 gap-6">
                {/* Main Content Skeleton */}
                <div className="col-span-7 bg-gray-50 rounded-xl h-40"></div>

                {/* Sidebar Suggestions */}
                <div className="col-span-5 space-y-4">
                  {/* AD Item */}
                  <div className="relative group cursor-pointer">
                    <div className="rounded-xl h-20 mb-2 overflow-hidden relative">
                      <img
                        src="/lovable-uploads/red-theme-vlogger.png"
                        alt="Video Thumbnail"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex gap-2 items-center mb-1">
                      <span className="bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-sm">Ad</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full mb-1"></div>
                  </div>

                  {/* Normal Item 1 */}
                  <div>
                    <div className="bg-gray-50 rounded-xl h-20 mb-2"></div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full mb-1"></div>
                    <div className="h-1.5 w-2/3 bg-gray-100 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="h-2 w-full bg-gray-50/50 rounded-full"></div>
                <div className="h-2 w-2/3 bg-gray-50/50 rounded-full"></div>
              </div>

            </div>

            {/* Arrow & Label */}
            <div className="absolute -bottom-24 right-12 md:right-24 text-center z-0">
              <svg width="60" height="60" viewBox="0 0 100 100" className="mx-auto text-gray-600 fill-none stroke-current stroke-2 transform -rotate-12 scale-x-[-1] filter drop-shadow-sm">
                <path d="M90,80 Q50,60 50,15" markerEnd="url(#arrowhead2)" />
                <defs>
                  <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <path d="M0,0 L10,3.5 L0,7 Z" fill="currentColor" />
                  </marker>
                </defs>
              </svg>
              <p className="text-gray-500 italic mt-1 font-handwriting">Your video in Suggestions</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default YouTubeAdPlacements;
