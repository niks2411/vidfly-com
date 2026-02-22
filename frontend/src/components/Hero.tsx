import { Youtube, Star, Eye, Heart, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  showStats?: boolean;
}

const Hero = ({ showStats = false }: HeroProps) => {
  const [channelInput, setChannelInput] = useState("");
  const navigate = useNavigate();

  const handlePromoteNow = () => {
    // Store channel input in sessionStorage if provided, so it can be used later
    if (channelInput.trim()) {
      sessionStorage.setItem("vidfly_hero_channel_input", channelInput.trim());
    }
    // Navigate to get-started page, same as Get Started button
    navigate("/get-started");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="home" className="pt-24 lg:pt-28 pb-16 lg:pb-20 bg-gradient-to-br from-red-50 to-white relative overflow-hidden font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Div - Centered */}
        <div className="max-w-2xl mx-auto mb-24 lg:mb-28">
          {/* Content Div */}

          <div className="text-center animate-fade-in space-y-4">
            {/* Google Partner Badge - Below Heading */}
            <div className="flex justify-center" >
              <div className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
                <svg viewBox="0 0 272 92" className="h-4 w-auto sm:h-5">
                  <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
                  <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
                  <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" />
                  <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z" />
                  <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" />
                  <path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" />
                </svg>
                <span className="text-gray-700 font-medium text-xs sm:text-sm">Premier Partner</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              <span className="text-red-600">YouTube promotions</span>
              <br />
              starting at ₹999
            </h1>

            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-2">
              Reach a real audience interested in your content. We clear the clutter and use Google Ads for your YouTube channel promotion.
            </p>



            {/* Input Field with Promote Button */}
            <div className="w-full max-w-lg mx-auto">
              <div className="bg-white rounded-xl shadow-xl p-1.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center gap-2 flex-1 px-4">
                  <Youtube className="h-6 w-6 text-red-600 flex-shrink-0" />
                  <Input
                    type="text"
                    placeholder="Enter Name / Video Link"
                    value={channelInput}
                    onChange={(e) => setChannelInput(e.target.value)}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base flex-1 bg-transparent placeholder:text-gray-400 p-0"
                  />
                </div>
                <Button
                  onClick={handlePromoteNow}
                  className="w-full sm:w-auto rounded-xl"
                >
                  PROMOTE NOW
                </Button>
              </div>
            </div>


          </div>
        </div>

        {/* Stats Div - Conditionally rendered */}
        {showStats && (
          <div className="border-t border-gray-200 mt-8 pt-8 lg:pt-10 animate-fade-in-delay-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Video className="h-7 w-7 text-red-600" />
                </div>
                <div className="text-4xl font-bold text-red-600 mb-1">
                  58K+
                </div>
                <div className="text-xs text-gray-700 uppercase font-semibold tracking-wide">
                  Promoted YouTube Channel
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Eye className="h-7 w-7 text-red-600" />
                </div>
                <div className="text-4xl font-bold text-red-600 mb-1">
                  6.9B+
                </div>
                <div className="text-xs text-gray-700 uppercase font-semibold tracking-wide">
                  Real Views Delivered
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Heart className="h-7 w-7 text-red-600" />
                </div>
                <div className="text-4xl font-bold text-red-600 mb-1">
                  56K+
                </div>
                <div className="text-xs text-gray-700 uppercase font-semibold tracking-wide">
                  Creators Love Us
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section >
  );
};

export default Hero;
