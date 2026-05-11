"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTrackEvent } from "@/hooks/use-track-event";

const NewServices = () => {
  const router = useRouter();

  const categories = [
    {
      title: "Gamers",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
      link: "/youtube-gaming-promotion",
    },
    {
      title: "Musician",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
      link: "/youtube-music-promotion",
    },
    {
      title: "Healthy Lifestyle",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      link: "/youtube-health-beauty-promotion",
    },
    {
      title: "Vloggers",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
      link: "/youtube-vlogging-promotion",
    },
    {
      title: "Motivational Speakers",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
      link: "/youtube-motivation-promotion",
    },
    {
      title: "Travel",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
      link: "/youtube-travel-promotion",
    },
  ];

  // Duplicate for seamless infinite scroll
  const scrollItems = [...categories, ...categories];

  const trackEvent = useTrackEvent();

  const handleCategoryClick = (link: string, title: string) => {
    trackEvent("click_service_category", { category: title });
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-16 lg:py-20 bg-white font-montserrat overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left sm:text-center mb-12">
          <h2 className="section-heading text-left sm:text-center">
            YouTube <span className="text-red-600">Channel Promotion</span>
          </h2>
          <p className="section-desc text-left sm:text-center !mx-0 sm:!mx-auto">
            Vidflyy's YouTube promotion services are suitable for channels across multiple domains. Irrespective of your YouTube channel size, our advanced targeting options using Google Ads can promote your YouTube videos to a relevant audience, thus increasing the odds of gaining higher engagement rates.
          </p>
        </div>
      </div>

      {/* Auto-scrolling Carousel Strip */}
      <div className="relative group overflow-hidden">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

        <motion.div
          className="flex gap-4 sm:gap-10 py-4 cursor-grab active:cursor-grabbing w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 35,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }} // Constraints are managed by the loop logic
          style={{ x: 0 }}
          whileHover={{ animationPlayState: "paused" }}
          whileTap={{ animationPlayState: "paused" }}
        >
          {scrollItems.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category.link, category.title)}
              className="flex-shrink-0 w-[160px] sm:w-[280px] cursor-pointer group/card"
            >
              {/* Image */}
              <div className="relative h-[200px] sm:h-[340px] rounded-xl overflow-hidden transition-all duration-500 group-hover/card:scale-[1.03]">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="280px"
                  className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                />
              </div>
              {/* Title */}
              <p className="text-center mt-4 font-semibold text-gray-800 text-sm sm:text-lg group-hover/card:text-red-600 transition-colors duration-300">
                {category.title}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewServices;
