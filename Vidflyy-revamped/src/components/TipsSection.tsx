import { CheckCircle } from "lucide-react";

const TipsSection = () => {
    const tips = [
        {
            title: "Optimize Your Videos for Higher Visibility",
            points: [
                "YT videos appear in up to 30% of the top 10 Google search results. Optimize your videos with YouTube SEO practices.",
                "Include target keywords in your titles and descriptions while explaining your video content.",
                "Add relevant tags to your YouTube videos to reach the right audience and maximize engagement."
            ],
            image: "/lovable-uploads/optmize.png",
            delay: "0"
        },
        {
            title: "YouTube Channel Marketing",
            points: [
                "Create an intriguing channel trailer reflecting your values, aspirations, and purpose of the channel.",
                "Organize your videos and playlists for maximum watch time. Optimize its name and description.",
                "Paste your channel's link on other social media handles to attract maximum viewers."
            ],
            image: "/lovable-uploads/ytchannel.webp",
            delay: "100",
            reverse: true
        },
        {
            title: "Use YouTube Ads That Expand Your Reach",
            points: [
                "Leverage YouTube ads to promote your video on YouTube. Choose from various ad formats.",
                "YouTube ads are known to boost your YouTube video's reach to a massive audience.",
                "Select your best videos that have already attracted decent engagement to advertise."
            ],
            image: "/lovable-uploads/ytads.webp",
            delay: "200"
        },
        {
            title: "Repurpose Videos into Shorts and Advertise",
            points: [
                "Attention span is constantly decreasing, and the adoption of YouTube Shorts is booming.",
                "Repurpose your long videos into Shorts to capture your viewers' attention.",
                "YT Shorts are powerful tools to grow your YouTube channel and attract massive viewership."
            ],
            image: "/lovable-uploads/shorts.webp",
            delay: "300",
            reverse: true
        },
        {
            title: "Consistently Promote Videos on YouTube",
            points: [
                "Create engaging content and publish them on time. The secret is consistent YouTube video promotion.",
                "With the paid channels available, getting your content in front of your ideal audience is easier.",
                "When you promote videos on YouTube with Vidflyy, they reach your ideal audience effectively."
            ],
            image: "/lovable-uploads/yt.webp",
            delay: "400"
        }
    ];

    return (
        <section className="py-12 lg:py-16 bg-gradient-to-br from-red-50 to-white relative overflow-hidden font-montserrat">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="mb-10 text-center animate-fade-in">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                        Tips on <span className="text-red-600">How To Promote Your YouTube Channel</span>
                    </h1>
                </div>


                {/* Tips - No Gap Layout */}
                <div className="space-y-0">
                    {tips.map((tip, index) => (
                        <div
                            key={index}
                            className="grid lg:grid-cols-2 items-center gap-6 py-6 border-b border-gray-100 last:border-b-0 animate-fade-up"
                            style={{ animationDelay: `${tip.delay}ms` }}
                        >
                            {/* Image - Left for odd, Right for even */}
                            {!tip.reverse && (
                                <div className="relative group order-2 lg:order-1">
                                    <div className="relative bg-gray-100 overflow-hidden rounded-2xl shadow-lg transform group-hover:scale-105 transition-all duration-500">
                                        <img
                                            src={tip.image}
                                            alt={tip.title}
                                            className="w-full h-56 lg:h-64 object-contain"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Content */}
                            <div className={`order-1 lg:order-${tip.reverse ? '1' : '2'}`}>
                                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                                    <span className="text-red-600">{tip.title.split(' ')[0]}</span> {tip.title.split(' ').slice(1).join(' ')}
                                </h2>

                                {/* Points */}
                                <div className="space-y-3">
                                    {tip.points.map((point, idx) => (
                                        <div
                                            key={idx}
                                            className="flex gap-3 items-start group/item animate-fade-up"
                                            style={{ animationDelay: `${parseInt(tip.delay) + idx * 40}ms` }}
                                        >
                                            <div className="flex-shrink-0 mt-0.5">
                                                <CheckCircle className="h-5 w-5 text-red-600" />
                                            </div>
                                            <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                                                {point}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Image - Right for even items */}
                            {tip.reverse && (
                                <div className="relative group order-2">
                                    <div className="relative bg-gray-100 overflow-hidden rounded-2xl shadow-lg transform group-hover:scale-105 transition-all duration-500">
                                        <img
                                            src={tip.image}
                                            alt={tip.title}
                                            className="w-full h-56 lg:h-64 object-contain"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom Divider */}
                <div className="w-full h-1 bg-gradient-to-r from-red-600 to-red-400 mt-10 rounded-full"></div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        .animate-fade-up { opacity: 0; animation: fadeUp 0.6s ease-out forwards; }
      `}</style>
        </section>
    );
};

export default TipsSection;
