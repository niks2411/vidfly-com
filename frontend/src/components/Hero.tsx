"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTrackEvent } from "@/hooks/use-track-event";

import { getVerifiedEmail } from "@/lib/verifiedEmail";

interface HeroProps {
  showStats?: boolean;
}

const Hero = ({ showStats }: HeroProps) => {
  const router = useRouter();
  const trackEvent = useTrackEvent();

  const handlePromoteNow = () => {
    trackEvent("click_hero_promote_now");
    const email = getVerifiedEmail();
    if (email) {
      router.push("/campaign");
    } else {
      router.push("/get-started");
    }
  };

  return (
    <section id="home" className="bg-white font-founders">
      {/* Fixed thin white margins on left/right */}
      <div className="px-3 sm:px-4 lg:px-6 py-3">
        {/* Gray bg stretches full width minus the thin white margins */}
        <div className="bg-[#F0F3F7] min-h-[calc(100vh-84px)] flex items-center">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-12 pb-16 lg:pb-20">
            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 items-center">
              {/* Left Column: Content */}
              <div className="animate-fade-in space-y-7">
                <h1 className="section-heading !leading-[1.15] lg:!text-[32px] xl:!text-[36px] 2xl:!text-[42px]">
                  YouTube Video Promotion That
                  <br />
                  Delivers Real Views & Subscribers
                </h1>

                <p className="section-desc !mx-0 !text-left max-w-md">
                  Get discovered by viewers who matter. Our smart
                  <br className="hidden sm:block" />
                  YouTube promotion helps creators attract engaged
                  <br className="hidden sm:block" />
                  audiences and turn attention into loyal subscribers.
                </p>

                <div className="text-[16px] font-bold text-[#0E172B]">
                  Add video → Set budget → Launch instantly
                </div>

                {/* YouTube Icon + Start Button in a combined white box */}
                <div className="inline-flex items-center bg-white p-1 rounded-[10px] shadow-sm border border-gray-100/50 max-w-full overflow-hidden sm:overflow-visible">
                  <div className="px-3 sm:px-4 py-2 border-r border-gray-100 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                      <path d="M43.2 14.4C42.7 12.5 41.2 11 39.3 10.5C35.8 9.6 24 9.6 24 9.6C24 9.6 12.2 9.6 8.7 10.5C6.8 11 5.3 12.5 4.8 14.4C3.9 17.9 3.9 24 3.9 24C3.9 24 3.9 30.1 4.8 33.6C5.3 35.5 6.8 37 8.7 37.5C12.2 38.4 24 38.4 24 38.4C24 38.4 35.8 38.4 39.3 37.5C41.2 37 42.7 35.5 43.2 33.6C44.1 30.1 44.1 24 44.1 24C44.1 24 44.1 17.9 43.2 14.4Z" fill="#E52D27" />
                      <path d="M19.8 30.6L31.2 24L19.8 17.4V30.6Z" fill="white" />
                    </svg>
                  </div>
                  <Button
                    onClick={handlePromoteNow}
                    className="bg-[#E52D27] hover:bg-[#D42621] text-white pl-6 pr-14 sm:pl-10 sm:pr-24 py-6 rounded-l-none text-[16px] sm:text-[17px] font-extrabold transition-all duration-300 h-[52px] normal-case"
                  >
                    Start Your Promotion
                  </Button>
                </div>

                {/* Trust Bullets */}
                <ul className="space-y-3 pt-2">
                  {[
                    "Full control from your dashboard",
                    "100% Real Viewers. Zero Bots.",
                    "Try Risk-Free with VIDFLYY",
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
                <div className="flex items-center gap-4 sm:gap-6 flex-nowrap sm:flex-wrap pt-4 overflow-x-auto no-scrollbar">
                  {/* Trustpilot Stars */}
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="flex gap-[2px]">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-[15px] h-[15px] sm:w-[22px] sm:h-[22px] bg-[#00B67A] flex items-center justify-center">
                          <svg className="w-2 h-2 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trustpilot Logo */}
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="#00B67A">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-[14px] sm:text-[14px] font-bold text-[#0E172B]">Trustpilot</span>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-4 sm:h-6 bg-gray-300"></div>

                  {/* SiteJabber Stars */}
                  <div className="flex items-center gap-[1px] sm:gap-[2px]">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] bg-[#FF8C00] flex items-center justify-center">
                        <svg className="w-3 h-3 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="white">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="w-px h-4 sm:h-6 bg-gray-300"></div>

                  {/* Google Rating */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    <svg className="w-5 h-5 sm:w-5 sm:h-5" viewBox="0 0 48 48">
                      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                    </svg>
                    <span className="text-[14px] sm:text-[14px] font-bold text-[#0E172B]">4.7/5</span>
                  </div>
                </div>
              </div>

              <div className="relative block animate-fade-in mt-10 lg:mt-0">
                <div className="relative w-full max-w-lg mx-auto lg:max-w-none lg:-translate-x-10">
                  <Image
                    src="/right image.png"
                    alt="Vidflyy Hero - How your videos will be seen"
                    width={700}
                    height={700}
                    priority
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
