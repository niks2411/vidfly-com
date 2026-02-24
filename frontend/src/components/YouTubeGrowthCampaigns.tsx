const YouTubeGrowthCampaigns = () => {
    return (
        <section className="relative font-montserrat">
            {/* Blue background - positioned at bottom 30% */}
            <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-[rgb(98,142,241)]"></div>

            {/* All content on top */}
            <div className="relative z-10">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-12 lg:pb-16">
                    {/* Badge */}
                    <div className="flex justify-center mb-6">
                        <span className="bg-[#1E293B] text-white text-[12px] font-semibold px-5 py-2 rounded-full tracking-wide">
                            YouTube Growth Campaigns
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="section-heading text-center">
                        Get your video in front of <span className="text-[#E52D27]">real viewers</span> across YouTube.
                    </h2>

                    {/* Description with arrows */}
                    <div className="relative max-w-2xl mx-auto text-center mb-12">
                        {/* Left curved arrow */}
                        <svg className="absolute -left-16 top-0 w-12 h-16 text-gray-400 hidden lg:block" viewBox="0 0 50 70" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M40 5 C30 5, 10 15, 15 40 C18 55, 25 60, 25 65" strokeLinecap="round" />
                            <path d="M20 60 L25 68 L30 60" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        {/* Right curved arrow */}
                        <svg className="absolute -right-16 top-0 w-12 h-16 text-gray-400 hidden lg:block" viewBox="0 0 50 70" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M10 5 C20 5, 40 15, 35 40 C32 55, 25 60, 25 65" strokeLinecap="round" />
                            <path d="M20 60 L25 68 L30 60" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <p className="section-desc text-center">
                            Your campaigns are distributed across high-impact placements —
                            <br className="hidden sm:block" />
                            including feed, search, and recommended sections to maximize reach and
                            <br className="hidden sm:block" />
                            engagement with real audiences.
                        </p>
                    </div>

                    {/* Two Mockup Cards */}
                    {/* Two Mockup Cards */}
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-8">
                        {/* Left Card */}
                        <div className="rounded-xl overflow-hidden shadow-2xl">
                            <img src="/left.png" alt="YouTube Ad Placement Left" className="w-full h-auto" />
                        </div>

                        {/* Right Card */}
                        <div className="rounded-xl overflow-hidden shadow-2xl">
                            <img src="/right.png" alt="YouTube Ad Placement Right" className="w-full h-auto" />
                        </div>
                    </div>

                    {/* Bottom Text */}
                    <p className="text-center text-[13px] lg:text-[14px] font-semibold text-white">
                        Powered by Real Audience Targeting — Not Bots.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default YouTubeGrowthCampaigns;
