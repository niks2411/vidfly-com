import { Link, ArrowRight, Sparkles, Zap, Globe, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const VideoShowcase = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/917355518761', '_blank');
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
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: {
        duration: 0.5,
      },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 12,
      },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-red-50 font-montserrat relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-pink-100 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Sparkles className="h-4 w-4 text-red-600" />
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">3 Simple Steps</span>
          </motion.div>
          
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            How To Promote YouTube Video with{" "}
            <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Vidflyy?
            </span>
          </motion.h2>
          
          <motion.p
            className="text-base lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Promote your video on YouTube and attract viewers that expand your community and grow your YouTube Channel.
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 lg:gap-10 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Step 1 - Select Your Video URL */}
          <motion.div
            className="relative group"
            variants={cardVariants}
            whileHover={{ y: -8 }}
          >
            {/* Floating Badge */}
            <motion.div
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20"
              variants={badgeVariants}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-red-600 rounded-full blur-lg opacity-50"
                  variants={pulseVariants}
                  animate="animate"
                />
                <div className="relative w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-2xl border-4 border-white">
                  01
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-3xl p-8 shadow-xl border-2 border-red-100 relative overflow-hidden group-hover:border-red-300 transition-all duration-300 pt-16 h-full"
              whileHover={{ scale: 1.02 }}
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/0 to-red-50/0 group-hover:from-red-50/50 group-hover:to-red-50/30 transition-all duration-300 rounded-3xl" />
              
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <motion.div
                  className="mb-6 flex justify-center"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                    <Link className="h-8 w-8 text-white" />
                  </div>
                </motion.div>

                <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Select Your Video URL</h3>
                <p className="text-slate-600 text-center text-sm leading-relaxed">
                  Pick your preferred video URL to advertise on YouTube and paste it into the{" "}
                  <a
                    href="https://Vidflyy.com/dashboard/channel-link?source=al"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:underline font-semibold"
                  >
                    Vidflyy dashboard
                  </a>
                  . Activate the promo code available and set your desired budget.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Step 2 - Target Viewers in Ideal Location */}
          <motion.div
            className="relative group"
            variants={cardVariants}
            whileHover={{ y: -8 }}
          >
            {/* Floating Badge */}
            <motion.div
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20"
              variants={badgeVariants}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-blue-600 rounded-full blur-lg opacity-50"
                  variants={pulseVariants}
                  animate="animate"
                />
                <div className="relative w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-2xl border-4 border-white">
                  02
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-100 relative overflow-hidden group-hover:border-blue-300 transition-all duration-300 pt-16 h-full"
              whileHover={{ scale: 1.02 }}
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:to-blue-50/30 transition-all duration-300 rounded-3xl" />
              
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

              <div className="relative z-10">
                <motion.div
                  className="mb-6 flex justify-center"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                </motion.div>

                <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Target Viewers in Ideal Location</h3>
                <p className="text-slate-600 text-center text-sm leading-relaxed">
                  Target viewers in specific countries or expand globally for effective YouTube video marketing. It helps capture your audience and increase conversions from viewers interested in your content.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Step 3 - Create Campaign */}
          <motion.div
            className="relative group"
            variants={cardVariants}
            whileHover={{ y: -8 }}
          >
            {/* Floating Badge */}
            <motion.div
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20"
              variants={badgeVariants}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-green-600 rounded-full blur-lg opacity-50"
                  variants={pulseVariants}
                  animate="animate"
                />
                <div className="relative w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-2xl border-4 border-white">
                  03
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-3xl p-8 shadow-xl border-2 border-green-100 relative overflow-hidden group-hover:border-green-300 transition-all duration-300 pt-16 h-full"
              whileHover={{ scale: 1.02 }}
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-green-50/0 group-hover:from-green-50/50 group-hover:to-green-50/30 transition-all duration-300 rounded-3xl" />
              
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

              <div className="relative z-10">
                <motion.div
                  className="mb-6 flex justify-center"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                    <Rocket className="h-8 w-8 text-white" />
                  </div>
                </motion.div>

                <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Create Campaign</h3>
                <p className="text-slate-600 text-center text-sm leading-relaxed">
                  Once you set your target audience and their related interests, preview and launch your campaign. We'll ensure it connects with audiences likely to become long-term subscribers.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleWhatsAppClick}
              size="lg"
              className="rounded-2xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold px-8 py-6 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <Zap className="h-5 w-5 mr-2" />
              START GROWING TODAY
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </motion.div>
          <motion.p
            className="text-slate-600 text-sm mt-6 font-medium"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Join <span className="font-bold text-red-600">58,000+</span> creators who trust Vidflyy
          </motion.p>
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          background-size: 1000px 100%;
        }
      `}</style>
    </section>
  );
};

export default VideoShowcase;
