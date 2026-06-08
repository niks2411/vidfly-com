import Link from "next/link";
import { Calendar, Clock, MoveRight } from "lucide-react";
import { ARTICLES } from "@/lib/blogData";

export default function BlogListing() {
    return (
        <div className="min-h-screen bg-[#FDFDFD] font-founders">
            <main className="max-w-7xl mx-auto px-4 pt-10 md:pt-12 pb-20">
                <div>
                    {/* Header */}
                    <div className="mb-16 text-center flex flex-col items-center justify-center">
                        <h1 className="section-heading text-center !mb-6">
                            Vidflyy <span className="text-[#EE2B2E]">Blog</span>
                        </h1>
                        <p className="section-desc text-center !mx-auto max-w-3xl">
                            Discover actionable insights, guide updates, and expert tips to master the YouTube algorithm and scale your channel's revenue.
                        </p>
                    </div>

                    {/* Blog Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {ARTICLES.map((article) => (
                            <Link
                                key={article.id}
                                href={`/blog/${article.slug}`}
                                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col group hover:scale-[1.01]"
                            >
                                <div className="aspect-[16/9] w-full relative overflow-hidden bg-gray-50">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <span className="absolute top-4 left-4 bg-[#EE2B2E] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                        {article.category}
                                    </span>
                                </div>
                                <div className="p-8 flex-grow flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" /> {article.date}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" /> {article.readTime}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#EE2B2E] transition-colors leading-tight">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-500 text-[15px] leading-relaxed mb-6">
                                            {article.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center text-[#EE2B2E] font-bold gap-2 text-sm uppercase tracking-wider mt-auto">
                                        Read Article{" "}
                                        <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
