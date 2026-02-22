import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

const testimonials = [
  {
    name: "Rahul Mehta",
    role: "Gaming Channel · 34K subs",
    content: "Honestly was sceptical at first — tried boosting on my own through Google Ads and burned through ₹8,000 with barely 200 views. Vidflyy got me 11,000 views in 10 days on the same budget. The audience targeting is genuinely different.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face",
    metrics: "11K views · ₹8K budget",
    verified: true,
  },
  {
    name: "Sneha Kapoor",
    role: "Skincare & Beauty · Mumbai",
    content: "My skincare channel was stuck at 2,200 subscribers for almost 6 months. After my first Vidflyy campaign, I crossed 9K in about 5 weeks. What I liked most was that comments actually came from people interested in skincare, not bots.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face",
    metrics: "2.2K → 9K Subscribers",
    verified: true,
  },
  {
    name: "Deepak Verma",
    role: "Finance & Investing",
    content: "Running a finance channel in Hindi is competitive. Vidflyy helped me narrowly target people already watching personal finance content. My watch time per viewer went up significantly — not just click numbers. Worth every rupee.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    metrics: "Watch time up 3.2×",
    verified: true,
  },
  {
    name: "Priya Nair",
    role: "Yoga & Wellness · Bengaluru",
    content: "The support team walked me through setting up my first campaign step by step. I had zero experience with ads. Got 6,400 views on my meditation video in the first week — more than my last 3 months combined. Would recommend, especially for beginners.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?w=100&h=100&fit=crop&crop=face",
    metrics: "6.4K views in first week",
    verified: true,
  },
  {
    name: "Aakash Sharma",
    role: "Tech Unboxing · Delhi NCR",
    content: "Good experience overall. The views were real and engagement was decent. My only feedback is that the reporting dashboard could show a bit more breakdown by device. That said, my channel grew from 5K to 18K in about 2 months, so results speak for themselves.",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&crop=face",
    metrics: "5K → 18K Subscribers",
    verified: true,
  },
  {
    name: "Kavita Rawat",
    role: "Cooking Channel · Jaipur",
    content: "I make traditional Rajasthani recipes and was worried my niche was too narrow. Vidflyy proved me wrong — they found exactly the right audience. My dal baati video crossed 80,000 views organically after the initial campaign boost. Still getting new subscribers daily.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=100&h=100&fit=crop&crop=face",
    metrics: "80K+ organic views after boost",
    verified: true,
  },
];


const useVisible = () => {
  const [visible, setVisible] = useState(1);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisible(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return visible;
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = testimonials.length;
  const visible = useVisible();

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 3500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, next]);

  // Build ordered list starting from `current`
  const getVisible = () =>
    Array.from({ length: visible }, (_, i) => testimonials[(current + i) % total]);

  return (
    <section
      className="py-16 lg:py-20 bg-white font-montserrat"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="section-heading text-center">
            Client <span className="text-red-600">Reviews</span>
          </h2>
          <p className="section-desc text-center">
            Real results from genuine creators who transformed their channels with Vidflyy's proven promotion strategies
          </p>

          {/* Google Partnership Badge */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex flex-wrap items-center justify-center gap-2 bg-white px-4 py-3 rounded-full shadow-lg">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-5" />
              <span className="font-semibold text-gray-700 text-sm">Verified Partner</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.9/5</span>
            </div>
          </div>

          <div className="w-20 h-1 bg-red-600 mx-auto rounded-full" />
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Prev button */}
          <button
            onClick={prev}
            aria-label="Previous review"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-md hover:border-red-400 hover:text-red-600 transition-all duration-200"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Cards */}
          <div className="overflow-hidden px-4 py-10 -my-10">
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: `repeat(${visible}, 1fr)` }}
            >
              {getVisible().map((t, idx) => (
                <div
                  key={`${t.name}-${idx}`}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
                  style={{ animation: "tcFadeIn 0.4s ease both" }}
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 rounded-full -mr-8 -mt-8 group-hover:bg-red-100 transition-colors duration-500" />
                  <Quote className="absolute top-4 right-4 h-7 w-7 text-red-200 group-hover:text-red-300 transition-colors duration-500" />

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < t.rating ? "text-yellow-400 fill-current" : "text-gray-200 fill-current"}`}
                      />
                    ))}
                    {t.verified && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 mb-5 leading-relaxed text-sm italic relative z-10">
                    "{t.content}"
                  </p>

                  {/* Metrics */}
                  <div className="bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-semibold mb-5 inline-block">
                    {t.metrics}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-red-100"
                      loading="lazy"
                    />
                    <div>
                      <div className="font-bold text-gray-900 text-base">{t.name}</div>
                      <div className="text-red-600 font-medium text-sm">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={next}
            aria-label="Next review"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-md hover:border-red-400 hover:text-red-600 transition-all duration-200"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === current
                ? "w-6 h-2.5 bg-red-600"
                : "w-2.5 h-2.5 bg-gray-300 hover:bg-red-300"
                }`}
            />
          ))}
        </div>

        {/* Bottom stats */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6 text-base">Join thousands of successful creators who trust Vidflyy</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">5000+</div>
              <div className="text-sm text-gray-600">Happy Creators</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">4.9/5</div>
              <div className="text-sm text-gray-600">Google Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">100M+</div>
              <div className="text-sm text-gray-600">Views Generated</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tcFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .testimonials-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
