const HowItWorks = () => {
    const steps = [
        {
            number: "1",
            title: "Add Your Video Link",
            description: "Paste your YouTube link and get started instantly.",
        },
        {
            number: "2",
            title: "Set Your Goal & budget",
            description: (
                <>
                    Choose views, subscribers, or engagement with{" "}
                    <span className="font-bold">your budget</span>.
                </>
            ),
        },
        {
            number: "3",
            title: "Launch & Track",
            description: "Go live instantly and monitor your campaign in real time.",
        },
    ];

    return (
        <section className="relative bg-[#F5F7FA] font-montserrat py-16 lg:py-24">
            {/* Dark left border strip */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#1E1B4B]"></div>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Badge */}
                <div className="mb-5">
                    <span className="bg-[#E52D27] text-white text-[11px] font-bold px-4 py-2 rounded-md uppercase tracking-wider">
                        How VIDFLYY Works
                    </span>
                </div>

                {/* Heading */}
                <h2 className="section-heading max-w-xl">
                    Get your video in front of real viewers — instantly.
                </h2>

                {/* Description */}
                <p className="section-desc max-w-xl mb-12 lg:mb-16">
                    Just add your video, choose your growth goal, and launch your campaign in
                    seconds. VIDFLYY's system delivers real views, subscribers, and
                    engagement with full transparency and control.
                </p>

                {/* Three Step Cards */}
                <div className="relative grid md:grid-cols-3 gap-8 lg:gap-10 mb-10">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Card */}
                            <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                                {/* Image placeholder */}
                                <div className="bg-[#F0F3F7] aspect-[4/3] flex items-center justify-center relative">
                                    {/* Step number watermark */}
                                    <span className="absolute bottom-2 right-3 text-[80px] font-extrabold text-gray-200/60 leading-none select-none">
                                        {step.number}
                                    </span>
                                    {/* Small video icon for step 1 */}
                                    {index === 0 && (
                                        <div className="absolute top-3 left-3">
                                            <div className="w-8 h-6 bg-white rounded border border-gray-200 flex items-center justify-center">
                                                <svg width="10" height="8" viewBox="0 0 10 8" fill="#999">
                                                    <path d="M0 0h7v5H0z" />
                                                    <path d="M7 1l3 1.5L7 4z" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Text below card */}
                            <div className="mt-4">
                                <h3 className="text-[16px] lg:text-[18px] font-bold text-[#0E172B] mb-1.5">
                                    {step.title}
                                </h3>
                                <p className="text-[12px] lg:text-[13px] text-[#64748B] leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Curved arrow between cards */}
                            {index < 2 && (
                                <svg
                                    className="hidden md:block absolute -right-6 lg:-right-7 top-[35%] w-10 h-10 text-gray-400 z-10"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <path d="M5 20 C15 10, 25 10, 30 18" strokeLinecap="round" />
                                    <path d="M26 14 L31 19 L26 22" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom text */}
                <p className="text-[13px] lg:text-[14px] font-bold text-[#E52D27]">
                    No bots. No fake engagement. 100% transparent campaigns. *
                </p>
            </div>
        </section>
    );
};

export default HowItWorks;
