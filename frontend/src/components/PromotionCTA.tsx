"use client";

import { useRouter } from "next/navigation";

const PromotionCTA = () => {
    const router = useRouter();

    const handleStartPromotion = () => {
        router.push("/get-started");
    };

    return (
        <section className="bg-[#f2f5f9] font-montserrat py-14 lg:py-18 border-t-[30px] border-b-[30px] border-white">
            <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex flex-col md:flex-row items-start justify-start gap-10 lg:gap-24">
                    {/* Left Column: Text Content */}
                    <div className="flex-1 min-w-0">
                        <h2 className="section-heading text-left lg:!whitespace-nowrap">
                            Ready to take control of your YouTube growth?
                        </h2>
                        <p className="section-desc !mx-0 text-left max-w-2xl">
                            Join thousands of creators expanding their reach with targeted YouTube Ads.
                            <br className="hidden lg:block" />
                            Get started in just minutes and start connecting with new viewers and potential fans.
                        </p>
                    </div>

                    {/* Right Column: CTA Elements - Offset to be slightly lower than heading */}
                    <div className="flex flex-col items-center gap-4 shrink-0 md:pt-8 w-full md:w-auto">
                        <button
                            onClick={handleStartPromotion}
                            className="bg-[#E52D27] hover:bg-[#CC2420] text-white font-bold text-[16px] pl-8 pr-14 sm:px-12 py-4 rounded-[4px] shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                        >
                            Start Your Promotion
                        </button>
                        <button
                            onClick={handleStartPromotion}
                            className="text-[#4299e1] hover:text-[#3182ce] text-[15px] font-bold transition-colors flex items-center gap-1"
                        >
                            Try with ₹499 <span className="text-[18px] leading-none mb-0.5">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromotionCTA;
