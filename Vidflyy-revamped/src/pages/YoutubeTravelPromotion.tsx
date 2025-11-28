// src/pages/YoutubeTravelPromotion.tsx
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Globe,
  MapPin,
  Youtube,
  Camera,
  Users,
  Plane,
  CheckCircle,
  Play,
  Compass,
  Mountain,
} from "lucide-react";

/* --------------------------------------------- */
/*  Small built-in animation system              */
/* --------------------------------------------- */
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.unobserve(node);
          }
        });
      },
      { threshold: 0.12, ...options }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [ref.current]);

  return { ref, inView };
}

const Animated: React.FC<{ children: any; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = "",
}) => {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref as any}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className}
        transform transition-all duration-700 ease-out
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      {children}
    </div>
  );
};

const Counter: React.FC<{ to: number; duration?: number }> = ({ to, duration = 1400 }) => {
  const [val, setVal] = useState(0);
  const start = useRef<number | null>(null);

  useEffect(() => {
    let raf: number;
    const step = (ts: number) => {
      if (!start.current) start.current = ts;
      const prog = Math.min((ts - start.current) / duration, 1);
      setVal(Math.floor(prog * to));
      if (prog < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  return <span className="font-bold text-3xl lg:text-4xl text-red-600">{val.toLocaleString()}</span>;
};

/* --------------------------------------------- */
/*  PAGE COMPONENT                               */
/* --------------------------------------------- */
const YoutubeTravelPromotion: React.FC = () => {
  const handleWhatsApp = (msg?: string) => {
    const text = msg || "I want to promote my travel channel on YouTube";
    window.open(`https://wa.me/917355518761?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Navbar />

      {/* HERO SECTION */}
      <header className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white py-24 lg:py-32">
        {/* Animated blobs */}
        <div className="absolute -left-32 -top-24 w-80 h-80 bg-blue-100 rounded-full opacity-25 animate-blob pointer-events-none"></div>
        <div className="absolute right-8 top-20 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-blob animation-delay-2500 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT TEXT */}
            <Animated delay={50}>
              <div>
                <div className="inline-flex items-center gap-3 mb-4">
                  <Globe className="h-6 w-6 text-red-600" />
                  <span className="text-xs font-semibold text-red-600 uppercase">Travel Promotion</span>
                </div>

                <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                  Grow Your Travel Channel — Reach Viewers Who Love Exploring New Destinations
                </h1>

                <p className="text-gray-600 max-w-2xl mb-6">
                  Promote your travel vlogs, cinematic journeys, and destination guides to viewers actively searching for travel,
                  adventure, tourism and lifestyle content. Real engagement. No bots.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => handleWhatsApp("Travel starter pack")}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-full shadow-lg transform transition hover:scale-105"
                  >
                    Promote My Channel
                  </Button>

                  <Link
                    to="/pricing"
                    className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-gray-200 hover:shadow-md mt-2 sm:mt-0"
                  >
                    See Pricing
                  </Link>
                </div>

                <div className="mt-6 flex gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-600" /> Destination targeting</div>
                  <div className="flex items-center gap-2"><Users className="h-4 w-4 text-red-600" /> Real travel audience</div>
                </div>
              </div>
            </Animated>

            {/* RIGHT PREVIEW CARD */}
            <Animated delay={150}>
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-md transform hover:-translate-y-3 transition">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src="/lovable-uploads/travel-hero.png"
                      alt="Travel promotion"
                      className="w-full h-56 object-cover"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-black/40 rounded-full p-4 animate-pulse">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm text-gray-500">Starter Pack</div>
                    <div className="text-lg font-semibold text-gray-900">Start from ₹600</div>
                    <div className="text-sm text-gray-600">
                      Reach travel lovers looking for destination vlogs, packing guides & adventure content.
                    </div>

                    <div className="mt-4 flex gap-3">
                      <Button
                        onClick={() => handleWhatsApp("Travel starter ₹600")}
                        className="bg-red-600 text-white rounded-full px-4 py-2"
                      >
                        Promote
                      </Button>
                      <button
                        onClick={() => handleWhatsApp("Custom plan for travel channel")}
                        className="ml-auto text-sm text-gray-500 hover:underline"
                      >
                        Custom plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Animated>

          </div>

          {/* STATS */}
          <Animated delay={250}>
            <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                <div><Counter to={37000} /><div className="text-sm text-gray-600">Travel Creators</div></div>
                <div><Counter to={2900000000} /><div className="text-sm text-gray-600">Real Views</div></div>
                <div><Counter to={95000} /><div className="text-sm text-gray-600">Campaigns Run</div></div>
                <div><Counter to={800000} /><div className="text-sm text-gray-600">Subs Gained</div></div>
              </div>
            </div>
          </Animated>
        </div>
      </header>

      {/* WHY TRAVEL PROMO WORKS */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Animated delay={80}>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 text-center">
              Why Travel Creators Grow Faster With Our Campaigns
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
              We focus on viewers interested in tourism, adventure, travel vlogging, backpacking, hotels, and destination guides.
            </p>
          </Animated>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Compass,
                title: "Interest-based Targeting",
                desc: "Reach users planning trips, searching destinations, or watching travel guides.",
              },
              {
                icon: Mountain,
                title: "Adventure Audience",
                desc: "Best for trekking, hiking, cliff-jumping, and nature lovers.",
              },
              {
                icon: Camera,
                title: "Cinematic Fans",
                desc: "Promote beautifully shot travel films to viewers who love visuals.",
              },
            ].map((box, i) => (
              <Animated key={box.title} delay={120 + i * 100}>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-sm transform hover:-translate-y-2 transition">
                  <div className="flex items-center gap-3 mb-4">
                    <box.icon className="h-6 w-6 text-red-600" />
                    <h3 className="text-lg font-semibold">{box.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{box.desc}</p>
                </div>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* 3 STEP WORKFLOW */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <Animated delay={80}>
            <h3 className="text-2xl font-bold text-center mb-6">How It Works — 3 Easy Steps</h3>
          </Animated>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Share your vlog or channel link", desc: "Tell us your niche: adventure, resort travel, budget trips." },
              { title: "Choose preferred audience", desc: "Target countries, nature lovers, photographers & tourists." },
              { title: "Get optimized growth", desc: "We fine-tune reach, retention and click-through results." },
            ].map((step, i) => (
              <Animated key={step.title} delay={120 + i * 100}>
                <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-2">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <span className="font-bold text-red-600">{i + 1}</span>
                  </div>
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Animated delay={80}>
            <h3 className="text-2xl font-bold text-center mb-6">Recommended Travel Packages</h3>
          </Animated>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: "₹600", perks: ["Destination-based reach", "Basic tuning", "Short campaign"] },
              {
                name: "Popular",
                price: "₹2,200",
                perks: ["Adventure & travel interest targeting", "Weekly optimizations", "Shorts + long-form combo"],
                popular: true,
              },
              { name: "Pro", price: "₹7,500", perks: ["Custom creatives", "Tourism-focused reach", "Dedicated optimization"] },
            ].map((p, i) => (
              <Animated key={p.name} delay={120 + i * 100}>
                <div
                  className={`rounded-3xl p-8 shadow-lg transform transition hover:-translate-y-2 ${
                    p.popular ? "bg-gradient-to-br from-red-600 to-red-700 text-white" : "bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className={`text-sm font-semibold ${p.popular ? "text-red-100" : "text-gray-500"}`}>{p.name}</div>
                      <div className={`text-3xl font-bold ${p.popular ? "text-white" : "text-gray-900"}`}>{p.price}</div>
                    </div>
                    {p.popular && <div className="px-3 py-1 rounded-full bg-white/20 text-sm">Popular</div>}
                  </div>

                  <ul className={`${p.popular ? "text-red-100" : "text-gray-700"} space-y-2 mb-6 text-sm`}>
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2">
                        <CheckCircle className={`h-4 w-4 ${p.popular ? "text-red-200" : "text-red-600"}`} />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleWhatsApp(`${p.name} ${p.price}`)}
                    className={`${p.popular ? "bg-white text-red-600" : "bg-red-600 text-white"} w-full rounded-full`}
                  >
                    Promote {p.price}
                  </Button>
                </div>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Animated delay={80}>
            <h3 className="text-2xl font-bold mb-6">Success Stories</h3>
          </Animated>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { ch: "NomadWanderer", stat: "+15K subs", desc: "Backpacking-focused targeting boosted loyal viewers." },
              { ch: "ResortReviewPro", stat: "+9K subs", desc: "Luxury travel lovers increased retention." },
              { ch: "Taste&Travel", stat: "+12K subs", desc: "Food & travel niche boosted long sessions." },
            ].map((t, i) => (
              <Animated key={t.ch} delay={120 + i * 100}>
                <div className="bg-white p-6 rounded-2xl shadow hover:-translate-y-2 transition">
                  <div className="text-sm text-gray-500 mb-2">Channel: {t.ch}</div>
                  <div className="font-semibold text-gray-900 mb-2">{t.stat}</div>
                  <div className="text-sm text-gray-600">{t.desc}</div>
                </div>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Animated delay={80}>
            <h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3>
          </Animated>

          <div className="space-y-4 text-gray-700">
            {[
              { q: "Are these real travel viewers?", a: "Yes — all ads run through Google Ads targeted at travel lovers." },
              { q: "Do you promote long travel films?", a: "Yes, performance is great for cinematic content." },
              { q: "How fast will I grow?", a: "Growth begins in 24–72 hours after campaign start." },
            ].map((f, i) => (
              <Animated key={f.q} delay={120 + i * 80}>
                <details className="p-4 border rounded-lg">
                  <summary className="font-semibold cursor-pointer">{f.q}</summary>
                  <p className="mt-2 text-sm">{f.a}</p>
                </details>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-6xl mx-auto px-4 p-10 lg:p-12 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Ready to get real travel viewers?</h3>
            <p className="text-sm text-red-100 mt-2">
              Let us promote your channel to travel lovers who truly enjoy exploring new places.
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => handleWhatsApp("Start travel campaign")}
              className="bg-white text-red-600 px-6 py-4 rounded-full font-semibold"
            >
              Start Promotion
            </Button>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-white/30"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* CSS for blob animation */}
      <style>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-40px) scale(1.06); }
          66% { transform: translate(-20px,20px) scale(0.94); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2500 { animation-delay: 2.5s; }
      `}</style>
    </div>
  );
};

export default YoutubeTravelPromotion;
