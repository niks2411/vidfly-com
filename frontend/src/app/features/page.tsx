import YouTubeAdPlacements from "@/components/YouTubeAdPlacements";
import Image from "next/image";
import { Play, Target, TrendingUp, Users, Youtube, CheckCircle, Zap, Shield, Globe, BarChart3 } from "lucide-react";

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-white font-montserrat overflow-x-hidden">
            {/* Hero Banner Section */}
            <section className="relative w-full pt-8 px-4 sm:px-6 lg:px-12 bg-white">
                <div className="max-w-[1400px] mx-auto">
                    {/* Top Banner Image - Using new featuresbg.png */}
                    <div className="relative rounded-[32px] overflow-hidden shadow-xl h-[160px] sm:h-[220px] md:h-[260px] lg:h-[300px] animate-fade-in mb-12 max-w-6xl mx-auto">
                        <Image
                            src="/featuresbg.png"
                            alt="Vidflyy Features Studio"
                            fill
                            priority
                            className="object-cover object-center"
                        />
                    </div>

                    <div className="text-center mb-24 max-w-4xl mx-auto">
                        <h1 className="section-heading text-center">
                            Vidflyy Features
                        </h1>
                        <p className="section-desc text-center !max-w-3xl mx-auto">
                            Discover how our YouTube Promotion platform saves you time and money while significantly boosting your subscriber count. Explore the powerful features we offer below.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Features Content */}
            <section className="pb-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Ad Placements Component */}
                    <div className="mb-32">
                        <YouTubeAdPlacements />
                    </div>

                    {/* Ad Types Grid */}
                    <div className="mb-32">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-12 w-2 bg-red-600 rounded-full"></div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#0E172B]">
                                Ad Types Vidflyy Uses
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "In-Feed Ads",
                                    desc: "Position your videos in search results or as suggested content, capturing the attention of viewers actively looking for related topics.",
                                    icon: <Target className="h-8 w-8 text-red-600" />,
                                    label: "Search & Suggested"
                                },
                                {
                                    title: "In-Stream Ads",
                                    desc: "Shown as commercials within other videos. They're skippable after 5 seconds, ensuring they reach viewers who are genuinely interested.",
                                    icon: <Play className="h-8 w-8 text-red-600" />,
                                    label: "Mid-video Commercials"
                                },
                                {
                                    title: "YouTube Shorts Ads",
                                    desc: "Displayed within the Shorts feed, designed to capture attention quickly in the fast-paced Shorts environment.",
                                    icon: <Zap className="h-8 w-8 text-red-600" />,
                                    label: "Short-form Growth"
                                }
                            ].map((ad, i) => (
                                <div key={i} className="group p-8 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-red-100">
                                    <div className="bg-white p-4 rounded-2xl shadow-sm inline-block mb-6 group-hover:scale-110 transition-transform">
                                        {ad.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0E172B] mb-4">{ad.title}</h3>
                                    <p className="text-gray-600 leading-relaxed mb-6">{ad.desc}</p>
                                    <span className="text-sm font-bold text-red-600 bg-red-50 px-4 py-2 rounded-full">
                                        {ad.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Targeting & Intelligence */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                        <div className="space-y-8 animate-fade-in">
                            <div className="mb-12">
                                <h2 className="text-3xl lg:text-4xl font-bold text-[#0E172B] mb-6">
                                    Precision <span className="text-red-600">Targeting</span> & Insights
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    We don't just get views; we get the <span className="font-bold text-[#0E172B]">right</span> views. Our targeting engine ensures your content finds its perfect audience.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { icon: <Users className="h-6 w-6" />, title: "Demographic", desc: "Age & Gender filters" },
                                    { icon: <Globe className="h-6 w-6" />, title: "Geographic", desc: "Location & Radius" },
                                    { icon: <BarChart3 className="h-6 w-6" />, title: "Interests", desc: "Audience affinities" },
                                    { icon: <Shield className="h-6 w-6" />, title: "Safety", desc: "Brand-safe placements" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-red-50 transition-colors">
                                        <div className="bg-red-600 text-white p-3 rounded-xl h-fit">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#0E172B]">{item.title}</h4>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative animate-fade-in">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-red-600/20 to-transparent blur-3xl opacity-50"></div>
                            <div className="relative bg-gradient-to-br from-[#0E172B] to-[#1a2b4d] rounded-[40px] p-12 overflow-hidden shadow-2xl">
                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-center">
                                        <div className="h-3 w-3 rounded-full bg-red-600"></div>
                                        <div className="h-3 w-3 rounded-full bg-red-400 opacity-50"></div>
                                        <div className="h-3 w-40 rounded-full bg-gray-700"></div>
                                    </div>
                                    <div className="h-[200px] flex items-center justify-center">
                                        <Youtube className="h-32 w-32 text-red-600 animate-pulse" />
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/5">
                                        <p className="text-white font-bold mb-2">Campaign Performance</p>
                                        <div className="flex gap-2 items-end h-12">
                                            {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                                                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-gradient-to-t from-red-600 to-red-400 rounded-t-sm"></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* Decorative Elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full -mr-32 -mt-32"></div>
                            </div>
                        </div>
                    </div>

                    {/* Promotion Section */}
                    <div className="bg-gradient-to-br from-gray-900 to-[#0E172B] rounded-[40px] p-12 md:p-20 text-white relative overflow-hidden text-center mb-20 shadow-2xl">
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
                                Promote Your Video on <br />
                                <span className="text-red-500">Competing Channels</span>
                            </h2>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                                Vidflyy's smart system suggests the best channel placements, letting you bulk add targets in seconds.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                                    <CheckCircle className="text-red-600 h-6 w-6" />
                                    <span className="font-bold">Efficient Bulk Addition</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                                    <CheckCircle className="text-red-600 h-6 w-6" />
                                    <span className="font-bold">Powerful Keyword Search</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                                    <CheckCircle className="text-red-600 h-6 w-6" />
                                    <span className="font-bold">Automatic Recommendations</span>
                                </div>
                            </div>
                        </div>
                        {/* Background elements */}
                        <Youtube className="absolute -bottom-10 -right-10 h-64 w-64 text-red-600/10 rotate-12" />
                        <TrendingUp className="absolute top-10 left-10 h-32 w-32 text-red-600/5 rotate-[-15deg]" />
                    </div>
                </div>
            </section>
        </div>
    );
}
