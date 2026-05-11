"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Youtube } from "lucide-react";

export function PlaceholdersAndVanishInput({
  placeholders,
  value,
  onChange,
  onSubmit,
  showIcon = false,
  hideSubmit = false,
  disabled = false,
  className
}: {
  placeholders: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  showIcon?: boolean;
  hideSubmit?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 2000);
  };
  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval when the tab is not visible
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation(); // Restart the interval when the tab becomes visible
    }
  };

  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newDataRef = useRef<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [animating, setAnimating] = useState(false);

  const draw = useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    const computedStyles = getComputedStyle(inputRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData: any[] = [];

    for (let t = 0; t < 800; t++) {
      let i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        let e = i + 4 * n;
        if (
          pixelData[e] !== 0 &&
          pixelData[e + 1] !== 0 &&
          pixelData[e + 2] !== 0
        ) {
          newData.push({
            x: n,
            y: t,
            color: [
              pixelData[e],
              pixelData[e + 1],
              pixelData[e + 2],
              pixelData[e + 3],
            ],
          });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (start: number, callback?: () => void) => {
    const animateFrame = (pos: number = 0) => {
      requestAnimationFrame(() => {
        const newArr = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) {
              current.r = 0;
              continue;
            }
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.08 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color: color } = t;
            if (n > pos) {
              ctx.beginPath();
              ctx.rect(n, i, s, s);
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          });
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 12);
        } else {
          setAnimating(false);
          onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
          if (callback) callback();
        }
      });
    };
    animateFrame(start);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !animating) {
      // Form submission will handle this
    }
  };

  const vanishAndSubmit = (callback?: () => void) => {
    setAnimating(true);
    draw();

    const value = inputRef.current?.value || "";
    if (value && inputRef.current) {
      const maxX = newDataRef.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0
      );
      animate(maxX, callback);
    } else {
      if (callback) callback();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (animating) return;
    vanishAndSubmit(() => {
      onSubmit && onSubmit(e);
    });
  };
  return (
    <form
      className={cn(
        "w-full relative max-w-xl mx-auto bg-white dark:bg-zinc-800 h-16 md:h-20 rounded-full overflow-hidden transition duration-200 border-[2.5px] border-[#c084fc]",
        value && "bg-gray-50",
        className
      )}
      onSubmit={handleSubmit}
    >
      <canvas
        className={cn(
          "absolute pointer-events-none text-base transform scale-50 top-[32%] origin-top-left filter invert dark:invert-0 pr-20",
          showIcon ? "left-24 md:left-32" : "left-2 sm:left-12",
          !animating ? "opacity-0" : "opacity-100"
        )}
        ref={canvasRef}
      />

      {showIcon && (
        <div className="absolute inset-y-0 left-0 px-4 md:px-6 py-2 border-r border-gray-100 flex items-center justify-center z-50">
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none" className="md:w-10 md:h-10">
            <path d="M43.2 14.4C42.7 12.5 41.2 11 39.3 10.5C35.8 9.6 24 9.6 24 9.6C24 9.6 12.2 9.6 8.7 10.5C6.8 11 5.3 12.5 4.8 14.4C3.9 17.9 3.9 24 3.9 24C3.9 24 3.9 30.1 4.8 33.6C5.3 35.5 6.8 37 8.7 37.5C12.2 38.4 24 38.4 24 38.4C24 38.4 35.8 38.4 39.3 37.5C41.2 37 42.7 35.5 43.2 33.6C44.1 30.1 44.1 24 44.1 24C44.1 24 44.1 17.9 43.2 14.4Z" fill="#E52D27" />
            <path d="M19.8 30.6L31.2 24L19.8 17.4V30.6Z" fill="white" />
          </svg>
        </div>
      )}

      <input
        onChange={(e) => {
          if (!animating) {
            onChange && onChange(e);
          }
        }}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={value}
        type="text"
        className={cn(
          "w-full relative text-[15px] md:text-lg z-50 border-none dark:text-white bg-transparent text-slate-700 h-full rounded-full focus:outline-none focus:ring-0 pr-32 md:pr-40",
          showIcon ? "pl-28 md:pl-36" : "pl-6 sm:pl-10",
          animating && "text-transparent dark:text-transparent"
        )}
      />

      {!hideSubmit && (
        <button
          disabled={disabled || !value}
          type="submit"
          className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-[42px] md:h-[52px] px-6 md:px-8 rounded-full disabled:bg-slate-200 bg-[#c084fc] hover:bg-[#a855f7] transition-all duration-300 flex items-center justify-center shadow-lg text-white font-bold text-sm md:text-base"
        >
          Let's Go!

        </button>
      )}

      <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              initial={{
                y: 5,
                opacity: 0,
              }}
              key={`current-placeholder-${currentPlaceholder}`}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -15,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "linear",
              }}
              className={cn(
                "dark:text-zinc-500 text-[13px] md:text-base font-normal text-neutral-500 text-left w-full truncate pr-32 md:pr-40",
                showIcon ? "pl-28 md:pl-36" : "pl-6 sm:pl-10"
              )}
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
