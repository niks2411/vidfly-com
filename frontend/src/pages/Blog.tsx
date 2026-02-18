import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MoveRight, Share2, Facebook, Linkedin, Twitter, CheckCircle2 } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";

const blogSections = [
    { id: "why-video-marketing", title: "Why Video Marketing Matters in 2026" },
    { id: "youtube-vs-others", title: "YouTube vs Instagram: Where to Focus?" },
    { id: "monetization-strategies", title: "Advanced Monetization Strategies" },
    { id: "audience-retention", title: "Mastering Audience Retention" },
    { id: "seo-optimization", title: "YouTube SEO Growth Checklist" },
    { id: "conclusion", title: "Final Thoughts" },
    { id: "faqs", title: "Frequently Asked Questions" },
];

const Blog = () => {
    const [activeSection, setActiveSection] = useState(blogSections[0].id);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5, rootMargin: "-100px 0px -50% 0px" }
        );

        blogSections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-montserrat">
            <Navbar />

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-[#EE2B2E] z-50 origin-left"
                style={{ scaleX }}
            />

            <main className="max-w-7xl mx-auto px-4 pt-32 pb-20">
                {/* Blog Header */}
                <header className="mb-12">
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <span>Resources</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="text-gray-900 font-medium">Blog</span>
                    </nav>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] leading-tight mb-8">
                        How to Skyrocket Your YouTube Channel: The Ultimate 2026 Guide
                    </h1>

                    <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-12 bg-gray-100">
                        <img
                            src="/blog-image.webp"
                            alt="YouTube Marketing"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </header>

                <div className="flex flex-col lg:flex-row gap-12 items-start relative">

                    {/* Left Sidebar - Table of Contents */}
                    <aside className="hidden lg:block w-72 sticky top-28 space-y-4">
                        {blogSections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 border-l-4 ${activeSection === section.id
                                    ? "bg-[#EE2B2E]/5 border-[#EE2B2E] text-[#EE2B2E] font-bold"
                                    : "bg-transparent border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                    }`}
                            >
                                <span className="text-sm">{section.title}</span>
                            </button>
                        ))}
                    </aside>

                    {/* Main Content Area */}
                    <article className="flex-1 max-w-3xl">
                        <div className="prose prose-lg prose-red max-w-none">
                            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                                YouTube is no longer just a video-sharing platform; it's the world's second-largest search engine.
                                For creators and brands in 2026, understanding the nuances of professional promotion is the difference
                                between obscurity and market dominance.
                            </p>

                            <div id="why-video-marketing" className="mb-16 scroll-mt-28">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Why Video Marketing Matters in 2026</h2>
                                <p className="text-gray-700 mb-6">
                                    In a world of short-form attention spans, high-quality video content remains the gold standard for
                                    brand trust. Vidflyy has helped over 50k+ creators realize that visibility isn't just about views—it's
                                    about targeted engagement.
                                </p>
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
                                    <h4 className="font-bold mb-2">Key Takeaways:</h4>
                                    <ul className="space-y-3">
                                        <li className="flex gap-3 text-gray-700">
                                            <CheckCircle2 className="w-5 h-5 text-[#EE2B2E] shrink-0" />
                                            YouTube Music is the fastest growing streaming platform globally.
                                        </li>
                                        <li className="flex gap-3 text-gray-700">
                                            <CheckCircle2 className="w-5 h-5 text-[#EE2B2E] shrink-0" />
                                            Official Artist Channels (OAC) see 2x more organic growth.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div id="youtube-vs-others" className="mb-16 scroll-mt-28">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">2. YouTube vs Others: Where to Focus?</h2>
                                <p className="text-gray-700 mb-6">
                                    One of YouTube's biggest advantages is its tight integration with Google Ads. While platforms like
                                    TikTok are great for virality, YouTube provides sustained, long-term ROI. Your visual content feeds
                                    into a recommendation network that powers discovery for years, not just hours.
                                </p>
                                <p className="text-gray-700 mb-6">
                                    At Vidflyy, we prioritize Google Ads-driven promotion because it guarantees that your video reaches
                                    real, interested viewers who actually want to consume your content.
                                </p>
                            </div>

                            <div id="monetization-strategies" className="mb-16 scroll-mt-28">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Advanced Monetization Strategies</h2>
                                <p className="text-gray-700 mb-6">
                                    YouTube Music gives emerging artists more chances to be discovered than Spotify or Apple Music.
                                    By leveraging Vidflyy's promotion tools, you can cross-promote your music and video content
                                    simultaneously—a unique advantage over audio-only platforms.
                                </p>
                            </div>

                            <div id="audience-retention" className="mb-16 scroll-mt-28">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Mastering Audience Retention</h2>
                                <p className="text-gray-700 mb-6">
                                    The first 30 seconds of your video are crucial. We analyzed over 10,000 successful Vidflyy campaigns
                                    and found that creators who use high-impact hooks combined with professional thumbnails have a
                                    45% higher retention rate.
                                </p>
                            </div>

                            <div id="seo-optimization" className="mb-16 scroll-mt-28">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">5. YouTube SEO Growth Checklist</h2>
                                <p className="text-gray-700 mb-6">
                                    SEO isn't just for blogs. Your video titles, descriptions, and tags are the metadata that tells
                                    the algorithm who to show your content to.
                                </p>
                                <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
                                    <li>Use primary keywords in the first 2 lines of the description.</li>
                                    <li>Incorporate LSI (Latent Semantic Indexing) keywords in your tags.</li>
                                    <li>Enable closed captions for better indexing.</li>
                                </ul>
                            </div>

                            <div id="conclusion" className="mb-16 scroll-mt-28">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion</h2>
                                <p className="text-gray-700 mb-6">
                                    Success on YouTube requires a combination of great content and strategic promotion. With Vidflyy,
                                    you're not just buying views; you're building a community.
                                </p>
                            </div>

                            <div id="faqs" className="mb-16 scroll-mt-28">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">FAQs</h2>
                                <div className="space-y-6">
                                    <div className="border-b border-gray-100 pb-4">
                                        <h4 className="font-bold text-lg mb-2">How long before I see results?</h4>
                                        <p className="text-gray-600 text-sm">Most campaigns show significant impact within 24-48 hours of launch.</p>
                                    </div>
                                    <div className="border-b border-gray-100 pb-4">
                                        <h4 className="font-bold text-lg mb-2">Is the growth organic?</h4>
                                        <p className="text-gray-600 text-sm">We use Google Ads to put your video in front of real people, leading to organic engagement and subscribers.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Right Sidebar - CTA / Ads */}
                    <aside className="w-full lg:w-80 sticky top-28 space-y-6">
                        <div className="bg-[#1A1A1A] p-8 rounded-3xl text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#EE2B2E] blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" />
                            <h3 className="text-2xl font-bold mb-4 relative z-10">Ready to go Viral?</h3>
                            <p className="text-gray-400 mb-8 text-sm relative z-10">Start your YouTube promotion today and reach millions of targeted viewers.</p>
                            <button className="flex items-center justify-between w-full px-6 py-4 bg-[#EE2B2E] text-white rounded-xl font-bold hover:bg-[#d41c1f] transition-all group/btn">
                                Promote Now
                                <MoveRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className="p-6 rounded-3xl border border-gray-100 bg-white">
                            <h4 className="font-bold text-gray-900 mb-4 text-center">Share this article</h4>
                            <div className="flex justify-center gap-4">
                                <button className="p-3 bg-gray-50 rounded-full hover:bg-[#EE2B2E]/10 hover:text-[#EE2B2E] transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </button>
                                <button className="p-3 bg-gray-50 rounded-full hover:bg-[#EE2B2E]/10 hover:text-[#EE2B2E] transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </button>
                                <button className="p-3 bg-gray-50 rounded-full hover:bg-[#EE2B2E]/10 hover:text-[#EE2B2E] transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </button>
                                <button className="p-3 bg-gray-50 rounded-full hover:bg-[#EE2B2E]/10 hover:text-[#EE2B2E] transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </aside>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Blog;
