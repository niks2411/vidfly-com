import { Youtube, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
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
    <section id="home" className="pt-24 lg:pt-32 pb-16 lg:pb-32 bg-[#F0F3F7] relative overflow-hidden font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Content */}
          <div className="animate-fade-in space-y-8">
            <h1 className="text-5xl lg:text-7xl font-extrabold text-[#0E172B] leading-[1.1]">
              Launch YouTube Growth
              <br />
              Campaigns in Seconds
            </h1>

            <p className="text-[#64748B] text-lg lg:text-xl max-w-xl leading-relaxed">
              Get real views, subscribers & engagement on demand with full control, transparent tracking, and zero fake traffic.
            </p>

            <div className="text-xl font-bold text-[#0E172B]">
              Add video → Set budget → Launch instantly
            </div>

            {/* Input Overlay with Start Button */}
            <div className="relative max-w-lg group">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-xl shadow-lg p-1.5 transition-all duration-300 group-focus-within:shadow-2xl">
                <div className="flex items-center gap-3 flex-1 px-4">
                  <Youtube className="h-7 w-7 text-red-600 flex-shrink-0" />
                  <Input
                    type="text"
                    placeholder="Enter Video Link"
                    value={channelInput}
                    onChange={(e) => setChannelInput(e.target.value)}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg flex-1 bg-transparent placeholder:text-gray-400 p-0"
                  />
                </div>
                <Button
                  onClick={handlePromoteNow}
                  className="w-full sm:w-auto bg-[#E52D27] hover:bg-[#D42621] text-white px-8 py-7 rounded-lg text-lg font-bold transition-all duration-300 transform active:scale-95"
                >
                  Start Your Promotion
                </Button>
              </div>
            </div>

            {/* Trust Bullets */}
            <ul className="space-y-3">
              {[
                "Full control from your dashboard",
                "100% Real Viewers. Zero Bots.",
                "Try Risk-Free with VIDFLLY",
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-[#0E172B] font-semibold text-base">
                  <div className="flex-shrink-0 bg-[#E8F5E9] p-0.5 rounded-full">
                    <Check className="w-4 h-4 text-[#2E7D32] stroke-[3px]" />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: User Image */}
          <div className="relative lg:block hidden animate-fade-in">
            <div className="relative w-full">
              <img
                src="/right image.png"
                alt="Vidflyy Hero"
                className="w-full h-auto drop-shadow-2xl transform transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
