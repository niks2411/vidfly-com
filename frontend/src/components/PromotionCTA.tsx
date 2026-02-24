import { useNavigate } from "react-router-dom";

const PromotionCTA = () => {
    const navigate = useNavigate();

    const handleStartPromotion = () => {
        navigate("/get-started");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className="bg-[#EEF1F6] font-montserrat py-14 lg:py-20 border-t-[40px] border-b-[40px] border-white">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    {/* Left - Text */}
                    <div className="max-w-xl">
                        <h2 className="section-heading">
                            Ready to take control of your{" "}
                            <br className="hidden sm:block" />
                            YouTube growth?
                        </h2>
                        <p className="section-desc">
                            Launch your first campaign in seconds. Reach real viewers, track
                            <br className="hidden sm:block" />
                            performance, and scale with confidence.
                        </p>
                    </div>

                    {/* Right - CTA */}
                    <div className="flex flex-col items-center gap-3 shrink-0">
                        <button
                            onClick={handleStartPromotion}
                            className="bg-[#E52D27] hover:bg-[#CC2420] text-white font-bold text-[15px] px-8 py-3.5 rounded-lg transition-colors duration-200 whitespace-nowrap"
                        >
                            Start Your Promotion
                        </button>
                        <a
                            href="/get-started"
                            onClick={(e) => {
                                e.preventDefault();
                                handleStartPromotion();
                            }}
                            className="text-[#2B8AC4] hover:text-[#1E6F9F] text-[13px] font-semibold transition-colors"
                        >
                            Try with ₹499 →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromotionCTA;
