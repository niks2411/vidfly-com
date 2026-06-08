"use client";

import { useState, useEffect } from "react";
import { MoveRight, Share2, Facebook, Linkedin, Twitter, Calendar, Clock, BookOpen, ArrowLeft } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "@/lib/blogData";

interface BlogPostClientProps {
    article: BlogPost;
}

export default function BlogPostClient({ article }: BlogPostClientProps) {
    const [activeSection, setActiveSection] = useState("");
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        if (!article || !article.sections.length) return;

        // Set initial active section
        setActiveSection(article.sections[0].id);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3, rootMargin: "-100px 0px -40% 0px" }
        );

        article.sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        // Add observer for FAQs section too
        const faqsElement = document.getElementById("faqs");
        if (faqsElement) observer.observe(faqsElement);

        return () => observer.disconnect();
    }, [article]);

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
            setActiveSection(id);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-founders">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-[#EE2B2E] z-50 origin-left"
                style={{ scaleX }}
            />

            <main className="max-w-7xl mx-auto px-4 pt-10 md:pt-12 pb-20">
                {/* Back navigation */}
                <Link
                    href="/blog"
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold mb-10 transition-colors group text-sm uppercase tracking-wider inline-flex"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Blog
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-4 text-sm font-bold text-gray-500 mb-6 uppercase tracking-wider">
                        <span className="text-[#EE2B2E]">{article.category}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" /> {article.date}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" /> {article.readTime}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] leading-tight mb-8 tracking-tight max-w-5xl">
                        {article.title}
                    </h1>

                    <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-12 bg-gray-100 max-h-[500px]">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </header>

                <div className="flex flex-col lg:flex-row gap-12 items-start relative">
                    {/* Left Sidebar - Table of Contents */}
                    <aside className="hidden lg:block w-72 sticky top-28 space-y-3">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-4 mb-4 flex items-center gap-2">
                            <BookOpen className="w-4 h-4" /> Table of Contents
                        </div>
                        {article.sections.map((section) => (
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
                        {article.faqs && article.faqs.length > 0 && (
                            <button
                                onClick={() => scrollToSection("faqs")}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 border-l-4 ${activeSection === "faqs"
                                    ? "bg-[#EE2B2E]/5 border-[#EE2B2E] text-[#EE2B2E] font-bold"
                                    : "bg-transparent border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                    }`}
                            >
                                <span className="text-sm">Frequently Asked Questions</span>
                            </button>
                        )}
                    </aside>

                    {/* Main Content Area */}
                    <article className="flex-1 max-w-3xl">
                        <div className="prose prose-lg prose-red max-w-none">
                            {article.sections.map((section) => (
                                <div key={section.id} id={section.id} className="mb-16 scroll-mt-28">
                                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 leading-tight border-b border-gray-100 pb-3">
                                        {section.title}
                                    </h2>
                                    <div className="text-gray-700 leading-relaxed font-medium">
                                        {section.content}
                                    </div>
                                </div>
                            ))}

                            {/* FAQs Section */}
                            {article.faqs && article.faqs.length > 0 && (
                                <div id="faqs" className="mb-16 scroll-mt-28">
                                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 leading-tight border-b border-gray-100 pb-3">
                                        Frequently Asked Questions
                                    </h2>
                                    <div className="space-y-6">
                                        {article.faqs.map((faq, index) => (
                                            <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                                                <h4 className="font-extrabold text-lg text-gray-900 mb-2.5">
                                                    {faq.question}
                                                </h4>
                                                <p className="text-gray-600 text-sm font-semibold leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </article>

                    {/* Right Sidebar - CTA */}
                    <aside className="w-full lg:w-80 sticky top-28 space-y-6">
                        <div className="bg-[#1A1A1A] p-8 rounded-3xl text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#EE2B2E] blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" />
                            <h3 className="text-2xl font-bold mb-4 relative z-10 leading-tight">Ready to grow your channel?</h3>
                            <p className="text-gray-400 mb-8 text-sm relative z-10 font-medium">Start your YouTube promotion today and reach millions of targeted viewers.</p>
                            <a
                                href="/get-started"
                                className="flex items-center justify-between w-full px-6 py-4 bg-[#EE2B2E] text-white rounded-xl font-bold hover:bg-[#d41c1f] transition-all group/btn"
                            >
                                Promote Now
                                <MoveRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </a>
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
        </div>
    );
}
