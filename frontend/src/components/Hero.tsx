import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  showStats?: boolean;
}

const Hero = ({ showStats }: HeroProps) => {
  const navigate = useNavigate();

  const handlePromoteNow = () => {
    navigate("/get-started");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="home" className="bg-white font-montserrat">
      {/* Fixed thin white margins on left/right */}
      <div className="px-3 sm:px-4 lg:px-6 py-3">
        {/* Gray bg stretches full width minus the thin white margins */}
        <div className="bg-[#F0F3F7] min-h-[calc(100vh-84px)] flex items-center">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-12 pb-16 lg:pb-20">
            <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 items-center">
              {/* Left Column: Content */}
              <div className="animate-fade-in space-y-7">
                <h1 className="section-heading !mb-7 !leading-[1.15]">
                  Launch YouTube Growth
                  <br />
                  Campaigns in Seconds
                </h1>

                <p className="section-desc !mx-0 !text-left max-w-md">
                  Get real views, subscribers & engagement on demand
                  <br className="hidden sm:block" />
                  with full control, transparent tracking,
                  <br className="hidden sm:block" />
                  and zero fake traffic.
                </p>

                <div className="text-[16px] font-bold text-[#0E172B]">
                  Add video → Set budget → Launch instantly
                </div>

                {/* YouTube Icon + Start Button */}
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 bg-white p-3 rounded-xl shadow-md">
                    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                      <path d="M43.2 14.4C42.7 12.5 41.2 11 39.3 10.5C35.8 9.6 24 9.6 24 9.6C24 9.6 12.2 9.6 8.7 10.5C6.8 11 5.3 12.5 4.8 14.4C3.9 17.9 3.9 24 3.9 24C3.9 24 3.9 30.1 4.8 33.6C5.3 35.5 6.8 37 8.7 37.5C12.2 38.4 24 38.4 24 38.4C24 38.4 35.8 38.4 39.3 37.5C41.2 37 42.7 35.5 43.2 33.6C44.1 30.1 44.1 24 44.1 24C44.1 24 44.1 17.9 43.2 14.4Z" fill="#E52D27" />
                      <path d="M19.8 30.6L31.2 24L19.8 17.4V30.6Z" fill="white" />
                    </svg>
                  </div>
                  <Button
                    onClick={handlePromoteNow}
                    className="bg-[#E52D27] hover:bg-[#D42621] text-white px-10 py-7 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Start Your Promotion
                  </Button>
                </div>

                {/* Trust Bullets */}
                <ul className="space-y-3 pt-2">
                  {[
                    "Full control from your dashboard",
                    "100% Real Viewers. Zero Bots.",
                    "Try Risk-Free with VIDFLLY",
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#0E172B] font-semibold text-sm">
                      <div className="flex-shrink-0">
                        <Check className="w-5 h-5 text-[#2E7D32] stroke-[3px]" />
                      </div>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>

                {/* Trust Badges */}
                <div className="flex items-center gap-6 flex-wrap pt-4">
                  {/* Trustpilot Stars */}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-[2px]">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-[22px] h-[22px] bg-[#00B67A] flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trustpilot Logo */}
                  <div className="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#00B67A">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-[14px] font-bold text-[#0E172B]">Trustpilot</span>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-6 bg-gray-300"></div>

                  {/* SiteJabber Stars */}
                  <div className="flex items-center gap-[2px]">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-[22px] h-[22px] bg-[#FF8C00] flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="w-px h-6 bg-gray-300"></div>

                  {/* Google Rating */}
                  <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 48 48">
                      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                    </svg>
                    <span className="text-[14px] font-bold text-[#0E172B]">4.7/5</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="relative lg:block hidden animate-fade-in">
                <div className="relative w-full">
                  <img
                    src="/right image.png"
                    alt="Vidflyy Hero - How your videos will be seen"
                    className="w-full h-auto drop-shadow-2xl transform transition-transform duration-700 hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
