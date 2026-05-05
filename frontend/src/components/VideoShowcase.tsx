"use client";

import { Link, ArrowRight, Sparkles, Zap, Globe, Rocket, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const VideoShowcase = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/get-started");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };


  const steps = [
    {
      number: "01",
      title: "Select Your Video URL",
      description: "Pick your preferred video URL to advertise on YouTube and paste it into the Vidflyy dashboard. Activate the promo code available and set your desired budget.",
      icon: Link,
      gradient: "from-red-500 via-red-600 to-pink-600",
      bgGradient: "from-red-50 to-pink-50",
      borderColor: "border-red-200",
      hoverBorder: "hover:border-red-400",
      iconBg: "from-red-500 to-pink-500",
      shadowColor: "shadow-red-200/50",
      glowColor: "red",
    },
    {
      number: "02",
      title: "Target Viewers in Ideal Location",
      description: "Target viewers in specific countries or expand globally for effective YouTube video marketing. Capture your audience and increase conversions from interested viewers.",
      icon: Globe,
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      hoverBorder: "hover:border-blue-400",
      iconBg: "from-blue-500 to-indigo-500",
      shadowColor: "shadow-blue-200/50",
      glowColor: "blue",
    },
    {
      number: "03",
      title: "Launch Your Campaign",
      description: "Once you set your target audience and interests, preview and launch your campaign. We'll ensure it connects with audiences likely to become long-term subscribers.",
      icon: Rocket,
      gradient: "from-emerald-500 via-green-600 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      borderColor: "border-emerald-200",
      hoverBorder: "hover:border-emerald-400",
      iconBg: "from-emerald-500 to-teal-500",
      shadowColor: "shadow-emerald-200/50",
      glowColor: "emerald",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-red-50/30 font-montserrat relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-red-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-400 rounded-full opacity-40"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-100 via-pink-100 to-red-100 rounded-full mb-6 shadow-lg shadow-red-100/50"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-4 w-4 text-red-600" />
            </motion.div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">3 Simple Steps</span>
          </motion.div>

          <motion.h2
            className="section-heading text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            How To Promote YouTube Video
            <br />
            <span className="text-red-600">with Vidflyy?</span>
          </motion.h2>

          <motion.p
            className="section-desc text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Promote your video on YouTube and attract viewers that expand your community and grow your YouTube Channel.
          </motion.p>
        </motion.div>

        {/* Steps Flow with Curly Arrows */}
        <div className="relative">
          <div className="relative max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 relative">
              {/* Step 1 */}
              <motion.div
                className="flex flex-col items-center text-center z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.div
                  className="relative mb-4 w-20 h-20"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-red-500 to-pink-500 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(239, 68, 68, 0.4)",
                        "0 0 40px rgba(239, 68, 68, 0.7)",
                        "0 0 20px rgba(239, 68, 68, 0.4)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <Link className="h-9 w-9 text-white" />
                  </div>
                </motion.div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 max-w-[200px]">
                  Select Your Video URL
                </h3>

              </motion.div>

              {/* Curly Arrow 1 */}
              <motion.div
                className="hidden md:block relative w-56 h-28 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                <svg className="w-full h-full" viewBox="0 0 300 120" fill="none" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="vs_gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M 20 60 Q 80 20, 150 50 Q 220 80, 280 60"
                    stroke="url(#vs_gradient1)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="1"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M 280 60 L 265 55 M 280 60 L 265 65"
                    stroke="url(#vs_gradient1)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.2, delay: 1.8 }}
                  />
                  <motion.circle
                    cx="0" cy="0" r="5"
                    fill="url(#vs_gradient1)"
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.5, delay: 0.8, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
                  >
                    <animateMotion
                      dur="1.5s"
                      begin="0.8s"
                      repeatCount="indefinite"
                      path="M 20 60 Q 80 20, 150 50 Q 220 80, 280 60"
                    />
                  </motion.circle>
                </svg>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                className="flex flex-col items-center text-center z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.div
                  className="relative mb-4 w-20 h-20"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.9, type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(99, 102, 241, 0.4)",
                        "0 0 40px rgba(99, 102, 241, 0.7)",
                        "0 0 20px rgba(99, 102, 241, 0.4)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                  />
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <Globe className="h-9 w-9 text-white" />
                  </div>
                </motion.div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 max-w-[200px]">
                  Target Ideal Location
                </h3>

              </motion.div>

              {/* Curly Arrow 2 */}
              <motion.div
                className="hidden md:block relative w-56 h-28 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.4 }}
              >
                <svg className="w-full h-full" viewBox="0 0 300 120" fill="none" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="vs_gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M 20 60 Q 80 20, 150 50 Q 220 80, 280 60"
                    stroke="url(#vs_gradient2)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="1"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1, delay: 1.4, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M 280 60 L 265 55 M 280 60 L 265 65"
                    stroke="url(#vs_gradient2)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.2, delay: 2.4 }}
                  />
                  <motion.circle
                    cx="0" cy="0" r="5"
                    fill="url(#vs_gradient2)"
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.5, delay: 1.4, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
                  >
                    <animateMotion
                      dur="1.5s"
                      begin="1.4s"
                      repeatCount="indefinite"
                      path="M 20 60 Q 80 20, 150 50 Q 220 80, 280 60"
                    />
                  </motion.circle>
                </svg>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                className="flex flex-col items-center text-center z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <motion.div
                  className="relative mb-4 w-20 h-20"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.3, type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(16, 185, 129, 0.4)",
                        "0 0 40px rgba(16, 185, 129, 0.7)",
                        "0 0 20px rgba(16, 185, 129, 0.4)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                  />
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <Rocket className="h-9 w-9 text-white" />
                  </div>
                </motion.div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 max-w-[200px]">
                  Launch Your Campaign
                </h3>

              </motion.div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="rounded-2xl bg-gradient-to-r from-red-600 via-pink-600 to-red-600 hover:from-red-700 hover:via-pink-700 hover:to-red-700 text-white font-bold px-10 py-7 text-lg shadow-2xl shadow-red-300/40 hover:shadow-red-400/50 transition-all duration-300 bg-[length:200%_auto] hover:bg-right"
            >
              <Play className="h-5 w-5 mr-2 fill-white" />
              START GROWING TODAY
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
};

export default VideoShowcase;
