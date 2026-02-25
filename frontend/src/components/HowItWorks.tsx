const HowItWorks = () => {
    const steps = [
        {
            number: "1",
            title: "Add Your Video Link",
            description: "Paste your YouTube link and get started instantly.",
            height: "h-[320px] lg:h-[380px]",
            imgHeight: "h-[200px] lg:h-[240px]",
            hasTopBar: true
        },
        {
            number: "2",
            title: "Set Your Goal & budget",
            description: (
                <>
                    Choose views, subscribers, or engagement with{" "}
                    <span className="font-bold text-gray-900">your budget</span>.
                </>
            ),
            height: "h-[360px] lg:h-[440px]",
            imgHeight: "h-[240px] lg:h-[300px]",
        },
        {
            number: "3",
            title: "Launch & Track",
            description: "Go live instantly and monitor your campaign in real time.",
            height: "h-[400px] lg:h-[500px]",
            imgHeight: "h-[280px] lg:h-[360px]",
        },
    ];

    return (
        <section className="relative bg-[#F8FAFC] font-montserrat pt-12 lg:pt-16 pb-20 lg:pb-32 overflow-hidden">
            <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section from Image 2 */}
                <div className="mb-10 lg:mb-12">
                    <div className="inline-block bg-[#E52D27] text-white text-[13px] font-bold px-4 py-2 rounded-sm mb-8">
                        How VIDFLLY Works
                    </div>
                    <h2 className="section-heading mb-6 max-w-2xl">
                        Get your video in front of real viewers — instantly.
                    </h2>
                    <p className="text-[15px] lg:text-[17px] text-gray-700 font-medium leading-relaxed max-w-3xl">
                        Just add your video, choose your growth goal, and launch your campaign in
                        seconds. <span className="font-bold">VIDFLLY's</span> system delivers real views, subscribers, and
                        engagement with full transparency and control.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-end justify-center gap-6 lg:gap-8 relative">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-center w-full md:w-1/3 relative group">
                            {/* Card Container */}
                            <div className={`w-full bg-white rounded-sm shadow-md border border-gray-100 flex flex-col p-4 relative overflow-hidden transition-all duration-300 hover:shadow-xl ${step.height} z-10`}>

                                {/* Top UI for first card */}
                                {step.hasTopBar && (
                                    <div className="flex items-center justify-between mb-3 px-1">
                                        <div className="flex items-center gap-1">
                                            <div className="w-3 h-3 bg-red-600 rounded-sm"></div>
                                            <div className="w-10 h-1.5 bg-gray-200 rounded-full"></div>
                                        </div>
                                        <div className="w-3.5 h-3.5 bg-gray-300 rounded-full"></div>
                                    </div>
                                )}

                                {/* Placeholder Image Area */}
                                <div className={`w-full ${step.imgHeight} bg-[#E5E7EB] rounded-sm mb-6`}></div>

                                {/* Text Content */}
                                <div className="relative z-10 pr-4">
                                    <h3 className="text-xl lg:text-2xl font-bold text-[#0E172B] mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed max-w-[240px]">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Large Faint Number */}
                                <span className="absolute bottom-[-10px] right-2 text-[100px] lg:text-[140px] font-black text-gray-50 select-none leading-none z-0">
                                    {step.number}
                                </span>
                            </div>

                            {/* Connecting Arrow (Desktop only) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute -right-12 top-1/2 -translate-y-1/2 w-24 h-16 z-20 pointer-events-none">
                                    <svg width="100%" height="100%" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 30 C 20 10, 40 10, 60 25 C 80 40, 90 20, 95 15" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" fill="none" />
                                        <path d="M85 18 L 95 15 L 94 25" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                        <circle cx="15" cy="45" r="8" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom Guarantee Text */}
                <div className="text-center mt-20">
                    <p className="text-[16px] lg:text-[20px] font-bold text-[#E52D27] tracking-tight">
                        No bots. No fake engagement. 100% transparent campaigns. *
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
