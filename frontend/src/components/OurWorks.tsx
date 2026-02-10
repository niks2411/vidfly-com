
"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

// EXISTING IMAGES from your project
// You can replace these URLs with your new images later.
const images = [
  "/lovable-uploads/1.jpg",
  "/lovable-uploads/2.jpg",
  "/lovable-uploads/3.jpg",
  "/lovable-uploads/4.jpg",
  "/lovable-uploads/5.jpg",
  "/lovable-uploads/6.jpg",
  "/lovable-uploads/7.jpg",
  "/lovable-uploads/8.jpg",
  "/lovable-uploads/9.jpg",
  "/lovable-uploads/10.jpg",
  "/lovable-uploads/11.jpg",
  "/lovable-uploads/12.jpg"
];

const OurWorks = () => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      lenis.destroy(); // Cleanup
    };
  }, []);

  return (
    <main className="w-full bg-white text-black font-montserrat">
      <div className="flex h-[50vh] items-center justify-center gap-2">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            OUR <span className="text-red-600">WORKS</span>
          </h2>
          <div className="mt-8 grid justify-items-center gap-6 text-center text-black">
            <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-black after:to-white after:content-['']">
              scroll down to see
            </span>
          </div>
        </div>
      </div>

      <div
        ref={gallery}
        className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-white p-[2vw]"
      >
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>

      <div className=" relative flex h-[15vh] items-center justify-center gap-2">
        <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-black after:to-white after:content-['']">
            scroll Up to see
          </span>
        </div>
      </div>
    </main>
  );
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full overflow-hidden rounded-xl shadow-lg">
          <img
            src={`${src}`}
            alt="project thumbnail"
            className="pointer-events-none object-cover w-full h-full"
          />
        </div>
      ))}
    </motion.div>
  );
};

export default OurWorks;
