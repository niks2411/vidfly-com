import { Link, ArrowRight, Sparkles, Zap, Globe, Rocket, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const VideoShowcase = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/get-started");
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
    <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-white to-red-50/30 font-montserrat relative overflow-hidden">
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
            className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            How To Promote YouTube Video
            <br />
            <span className="bg-gradient-to-r from-red-600 via-pink-600 to-red-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              with Vidflyy?
            </span>
          </motion.h2>

          <motion.p
            className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Promote your video on YouTube and attract viewers that expand your community and grow your YouTube Channel.
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <div className="relative">

          <motion.div
            className="grid lg:grid-cols-3 gap-8 lg:gap-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative group"
                variants={cardVariants}
                whileHover={{ y: -12 }}
              >
                {/* Card */}
                <motion.div
                  className={`bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl ${step.shadowColor} border-2 ${step.borderColor} ${step.hoverBorder} relative overflow-hidden transition-all duration-500 h-full group-hover:shadow-2xl`}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-current to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-current to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className="mb-6 flex justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className={`w-18 h-18 p-4 rounded-2xl bg-gradient-to-br ${step.iconBg} flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:shadow-xl`}>
                        <step.icon className="h-10 w-10 text-white" />
                      </div>
                    </motion.div>

                    <h3 className="text-xl font-bold text-slate-900 mb-4 text-center group-hover:text-slate-800 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-center text-sm leading-relaxed group-hover:text-slate-700 transition-colors">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
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

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default VideoShowcase;

