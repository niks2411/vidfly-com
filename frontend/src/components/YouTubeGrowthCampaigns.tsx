const YouTubeGrowthCampaigns = () => {
    return (
        <section className="relative font-founders">
            {/* Blue background - positioned at bottom 30% */}
            <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-[rgb(98,142,241)]"></div>

            {/* All content on top */}
            <div className="relative z-10">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-12 lg:pb-16">
                    {/* Badge */}
                    <div className="flex justify-center mb-6">
                        <span className="bg-[#1E293B] text-white text-[12px] font-semibold px-5 py-2 tracking-wide">
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

                    {/* Two Custom Built Mockup Cards - Refined to match Image 2 */}
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
                        {/* Left Card: Instream Ad Placement */}
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl border border-gray-200 flex flex-col aspect-[16/10]">
                            {/* YouTube Head */}
                            <div className="px-5 py-3.5 flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#FF0000]">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                    <span className="font-bold text-[18px] tracking-tight">YouTube</span>
                                </div>
                                <div className="h-7 w-[45%] bg-[#E5E5E5] rounded-sm hidden sm:block"></div>
                                <div className="w-8 h-8 bg-[#E5E5E5] rounded-full"></div>
                            </div>

                            {/* YouTube Content */}
                            <div className="p-5 flex gap-5 h-full">
                                {/* Main Video Area */}
                                <div className="flex-[2.5] flex flex-col gap-3">
                                    <div className="bg-[#FF4B4B] rounded-sm aspect-video flex flex-col justify-center px-8 relative">
                                        <h3 className="text-white text-[18px] lg:text-[24px] font-extrabold leading-tight">
                                            Your Video is Shown Here Before Similar Videos
                                        </h3>
                                        <div className="absolute bottom-5 left-5">
                                            <div className="bg-[#fbc02d] text-black text-[10px] font-black px-2 py-0.5 select-none">Ad</div>
                                        </div>
                                        {/* Progress bar at the very bottom */}
                                        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/10">
                                            <div className="w-[35%] h-full bg-[#fbc02d]"></div>
                                        </div>
                                    </div>
                                    <div className="h-4 w-[85%] bg-[#E5E5E5] mt-1"></div>
                                    <div className="h-4 w-[55%] bg-[#E5E5E5]"></div>
                                </div>

                                {/* Sidebar */}
                                <div className="flex-1 flex flex-col gap-4">
                                    <div>
                                        <div className="bg-[#FF4B4B] rounded-sm aspect-video flex items-center justify-center p-2 mb-2">
                                            <span className="text-white text-[13px] font-extrabold text-center leading-tight">And Here</span>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-1.5">
                                                <div className="bg-[#fbc02d] text-black text-[9px] font-black px-1.5 py-0.5 select-none">Ad</div>
                                                <div className="text-[10px] font-bold text-gray-900">Your promoted video</div>
                                            </div>
                                            <div className="text-[9px] font-medium text-gray-800 leading-none">shown as recommended</div>
                                        </div>
                                    </div>
                                    <div className="space-y-3 mt-1">
                                        <div className="h-4 w-full bg-[#E5E5E5]"></div>
                                        <div className="h-4 w-2/3 bg-[#E5E5E5]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Card: Search Ad Placement */}
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl border border-gray-200 flex flex-col aspect-[16/10]">
                            {/* YouTube Head */}
                            <div className="px-5 py-3.5 flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#FF0000]">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                    <span className="font-bold text-[18px] tracking-tight">YouTube</span>
                                </div>
                                <div className="h-7 w-[45%] bg-[#E5E5E5] rounded-sm hidden sm:block"></div>
                                <div className="w-8 h-8 bg-[#E5E5E5] rounded-full"></div>
                            </div>

                            {/* YouTube Content (Search View) */}
                            <div className="p-5 flex flex-col gap-5 h-full">
                                {/* Search Ad Result */}
                                <div className="flex gap-5 border-b border-gray-50 pb-5">
                                    <div className="bg-[#FF4B4B] rounded-sm w-[45%] aspect-video flex items-center justify-center p-5 relative">
                                        <span className="text-white text-[14px] lg:text-[18px] font-extrabold text-center leading-tight">
                                            In-feed ads will <br /> be shown here
                                        </span>
                                        <div className="absolute bottom-0 left-0 w-[25%] h-1.5 bg-[#fbc02d]"></div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-[13px] lg:text-[16px] font-bold text-gray-900 leading-tight mb-3">
                                            Your promoted video shown at the top of the search results for relevant keywords
                                        </h3>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="bg-[#fbc02d] text-black text-[9px] font-black px-1.5 py-0.5 select-none">Ad</div>
                                            <div className="text-[11px] text-gray-700">Your channel • 140k views</div>
                                        </div>
                                        <div className="h-4 w-full bg-[#E5E5E5]"></div>
                                    </div>
                                </div>

                                {/* Placeholder Results */}
                                <div className="space-y-6">
                                    <div className="flex gap-5">
                                        <div className="bg-[#E5E5E5] rounded-sm w-[45%] aspect-video"></div>
                                        <div className="flex-1 flex flex-col gap-3 pt-1">
                                            <div className="h-4 w-[100%] bg-[#E5E5E5]"></div>
                                            <div className="h-4 w-[60%] bg-[#E5E5E5]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Text */}
                    <p className="text-center text-[16px] lg:text-[20px] font-bold text-white tracking-wide opacity-90 mt-4">
                        Powered by Real Audience Targeting — Not Bots.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default YouTubeGrowthCampaigns;
