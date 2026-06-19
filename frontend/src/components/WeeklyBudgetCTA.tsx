"use client";

import { Youtube, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

const WeeklyBudgetCTA = () => {
    const [inputVal, setInputVal] = useState("");
    const router = useRouter();

    const handleStart = () => {
        sessionStorage.setItem("channelInput", inputVal);
        router.push("/get-started");
    };

    return (
        <section className="py-16 lg:py-20 bg-white font-founders">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="bg-white rounded-[2.5rem] shadow-2xl shadow-red-100/50 p-10 lg:p-16 text-center max-w-5xl mx-auto relative overflow-hidden border border-red-50"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Subtle background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50 pointer-events-none"></div>

                    <h2 className="section-heading text-left sm:text-center relative z-10">
                        Weekly budgets begin at{" "}
                        <span className="text-red-600">₹999 per week</span>
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto relative z-10">
                        <div className="relative w-full">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600">
                                <Youtube className="w-6 h-6" />
                            </div>
                            <Input
                                type="text"
                                placeholder="Enter YouTube channel name or URL"
                                className="w-full h-14 pl-12 pr-4 rounded-xl border-gray-200 text-lg shadow-sm focus-visible:ring-red-500 transition-all font-medium"
                                value={inputVal}
                                onChange={(e) => setInputVal(e.target.value)}
                            />
                        </div>
                        <Button
                            className="h-14 px-8 rounded-xl bg-red-600 hover:bg-red-700 text-white text-lg font-bold shadow-none whitespace-nowrap w-full md:w-auto transition-all duration-300 hover:scale-105 active:scale-95 uppercase"
                            onClick={handleStart}
                        >
                            Start your promotion
                        </Button>
                    </div>

                    {/* Decorative Arrow and Text - Only visible on very large screens to prevent overlap */}
                    <div className="hidden xl:block absolute right-10 top-1/2 -translate-y-1/2 translate-x-4">
                        <div className="relative">
                            <svg width="100" height="60" viewBox="0 0 100 60" className="text-gray-300 fill-none stroke-current stroke-2 transform rotate-12">
                                <path d="M80,10 Q50,30 20,30" markerEnd="url(#arrowhead_cta)" />
                                <defs>
                                    <marker id="arrowhead_cta" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                                    </marker>
                                </defs>
                            </svg>
                            <p className="absolute -top-6 -right-5 w-40 text-left text-gray-400 font-handwriting transform -rotate-6 text-sm">
                                Start promoting your channel right now
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 relative z-10">
                        <span className="text-gray-400 text-sm">or </span>
                        <button className="text-gray-500 hover:text-red-600 text-sm font-medium transition-colors hover:underline">
                            sign in with YouTube
                        </button>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default WeeklyBudgetCTA;
