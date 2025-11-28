// src/pages/YoutubeGamingPromotion.tsx
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gamepad, Youtube, Users, Target, Play, Trophy, Flame, CheckCircle } from "lucide-react";

/**
 * Self-contained useInView + Animated + Counter
 * So you don't need extra files. Drop this file in src/pages/.
 */
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
      { threshold: 0.15, ...options }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [ref.current]);

  return { ref, inView };
}

const Animated: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref as any}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transform transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {children}
    </div>
  );
};

const Counter: React.FC<{ to: number; duration?: number }> = ({ to, duration = 1200 }) => {
  const [val, setVal] = useState(0);
  const start = useRef<number | null>(null);

  useEffect(() => {
    let rafId: number;
    const step = (ts: number) => {
      if (!start.current) start.current = ts;
      const progress = Math.min((ts - start.current) / duration, 1);
      setVal(Math.floor(progress * to));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [to, duration]);

  return <span className="font-bold text-3xl lg:text-4xl text-red-600">{val.toLocaleString()}</span>;
};

const YoutubeGamingPromotion: React.FC = () => {
  const handleWhatsApp = (preset?: string) => {
    const text = preset ? `Promote my gaming channel: ${preset}` : "I want to promote my gaming channel on YouTube";
    window.open(`https://wa.me/917355518761?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Navbar />

      {/* HERO */}
      <header className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-24 lg:py-32">
        <div className="absolute -left-32 -top-24 w-80 h-80 bg-red-100 rounded-full opacity-25 animate-blob pointer-events-none"></div>
        <div className="absolute right-8 top-16 w-64 h-64 bg-red-200 rounded-full opacity-18 animate-blob animation-delay-2500 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Animated delay={60}>
              <div>
                <div className="inline-flex items-center gap-3 mb-4">
                  <Gamepad className="h-6 w-6 text-red-600" />
                  <span className="text-xs font-semibold text-red-600 uppercase">Gaming Promotion</span>
                </div>

                <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                  Grow Your Gaming Channel — Reach Real Players & Active Fans
                </h1>

                <p className="text-gray-600 max-w-2xl mb-6">
                  Target players by game, platform, and playstyle. We run conversion-focused YouTube campaigns that bring engaged viewers who subscribe, comment, and watch.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={() => handleWhatsApp("Starter gaming pack")} className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-full shadow-lg transform transition hover:scale-105">
                    Promote My Channel
                  </Button>
                  <Link to="/pricing" className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-gray-200 hover:shadow-md mt-2 sm:mt-0">
                    See Pricing
                  </Link>
                </div>

                <div className="mt-6 flex gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2"><Target className="h-4 w-4 text-red-600" /> Platform & genre focus</div>
                  <div className="flex items-center gap-2"><Users className="h-4 w-4 text-red-600" /> Community growth</div>
                </div>
              </div>
            </Animated>

            <Animated delay={180}>
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-md transform hover:-translate-y-3 transition">
                  <div className="relative overflow-hidden rounded-xl">
                    <img src="/lovable-uploads/gaming-hero.png" alt="Gaming promotion" className="w-full h-56 object-cover" loading="lazy" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-black/40 rounded-full p-4 animate-pulse">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm text-gray-500">Starter Pack</div>
                    <div className="text-lg font-semibold text-gray-900">Start from ₹700</div>
                    <div className="text-sm text-gray-600">Target specific game audiences, platforms and watch intents.</div>
                    <div className="mt-4 flex gap-3">
                      <Button onClick={() => handleWhatsApp("Starter ₹700")} className="bg-red-600 text-white rounded-full px-4 py-2">Promote</Button>
                      <button onClick={() => handleWhatsApp("Need custom plan")} className="ml-auto text-sm text-gray-500 hover:underline">Custom plan</button>
                    </div>
                  </div>
                </div>
              </div>
            </Animated>
          </div>

          {/* Stats */}
          <Animated delay={260}>
            <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                <div><Counter to={58000} /><div className="text-sm text-gray-600">Creators</div></div>
                <div><Counter to={4200000000} /><div className="text-sm text-gray-600">Real Views</div></div>
                <div><Counter to={72000} /><div className="text-sm text-gray-600">Campaigns Run</div></div>
                <div><Counter to={1500000} /><div className="text-sm text-gray-600">Subscribers Gained</div></div>
              </div>
            </div>
          </Animated>
        </div>
      </header>

      {/* WHY GAMING PROMO */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animated delay={80}>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 text-center">Why Gaming Channels Grow With Our Campaigns</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">We combine platform signals with creative testing to reach viewers most likely to subscribe and join your community.</p>
          </Animated>

          <div className="grid md:grid-cols-3 gap-8">
            <Animated delay={120}>
              <div className="p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform transition hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-4"><Trophy className="h-6 w-6 text-red-600" /><h3 className="text-lg font-semibold">Game Title Targeting</h3></div>
                <p className="text-gray-600 text-sm">Reach players searching for specific titles and creators in that genre.</p>
              </div>
            </Animated>

            <Animated delay={180}>
              <div className="p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform transition hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-4"><Flame className="h-6 w-6 text-red-600" /><h3 className="text-lg font-semibold">Live Event Boosts</h3></div>
                <p className="text-gray-600 text-sm">Promote live streams, tournaments and highlight reels when player interest is high.</p>
              </div>
            </Animated>

            <Animated delay={240}>
              <div className="p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform transition hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-4"><Users className="h-6 w-6 text-red-600" /><h3 className="text-lg font-semibold">Community Growth</h3></div>
                <p className="text-gray-600 text-sm">We optimize for comments, live viewers and repeat watchers to build active communities.</p>
              </div>
            </Animated>
          </div>
        </div>
      </section>

      {/* AUDIENCE & PLACEMENTS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
          <Animated delay={80}>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Who We Reach</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-red-600" /><div><div className="font-semibold">FPS & Competitive Players</div><div className="text-sm">Viewers who watch tutorials, highlights & pro commentary.</div></div></li>
                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-red-600" /><div><div className="font-semibold">Mobile Gaming Audiences</div><div className="text-sm">Shorts and short-form placements for mobile-first players.</div></div></li>
                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-red-600" /><div><div className="font-semibold">Casual & Indie Fans</div><div className="text-sm">Niche reach for indie titles and community builders.</div></div></li>
              </ul>
            </div>
          </Animated>

          <Animated delay={160}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="font-semibold text-gray-900 mb-4">Placement Examples</h4>
              <div className="space-y-3">
                <div className="bg-gray-100 rounded-lg p-4"><div className="font-semibold text-sm">In-stream (Pre-roll)</div><div className="text-xs text-gray-600">Shown before related gameplay videos.</div></div>
                <div className="bg-gray-100 rounded-lg p-4"><div className="font-semibold text-sm">Shorts & Clips</div><div className="text-xs text-gray-600">Mobile-first placements to capture quick viewers.</div></div>
                <div className="bg-gray-100 rounded-lg p-4"><div className="font-semibold text-sm">In-feed & Search</div><div className="text-xs text-gray-600">Top placement for discovery and channel growth.</div></div>
              </div>
            </div>
          </Animated>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animated delay={80}><h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Recommended Packages</h3></Animated>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: "₹700", perks: ["Game-targeted views", "Short boosts", "Basic tuning"] },
              { name: "Popular", price: "₹2,500", perks: ["Genre targeting", "Live boost options", "Weekly optimization"], popular: true },
              { name: "Pro", price: "₹8,000", perks: ["Custom creatives", "Dedicated manager", "Conversion optimization"] }
            ].map((p, i) => (
              <Animated key={p.name} delay={120 + i * 120}>
                <div className={`${p.popular ? "bg-gradient-to-br from-red-600 to-red-700 text-white" : "bg-white"} rounded-3xl p-8 shadow-lg transform transition hover:-translate-y-2`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className={`text-sm font-semibold ${p.popular ? "text-red-100" : "text-gray-500"}`}>{p.name}</div>
                      <div className={`text-3xl font-bold ${p.popular ? "text-white" : "text-gray-900"}`}>{p.price}</div>
                    </div>
                    {p.popular && <div className="px-3 py-1 rounded-full bg-white/20 text-sm">Popular</div>}
                  </div>

                  <ul className={`${p.popular ? "text-red-100" : "text-gray-700"} space-y-2 mb-6 text-sm`}>
                    {p.perks.map((perk) => (<li key={perk} className="flex items-center gap-2"><CheckCircle className={`h-4 w-4 ${p.popular ? "text-red-200" : "text-red-600"}`} />{perk}</li>))}
                  </ul>

                  <Button onClick={() => handleWhatsApp(`${p.name} ${p.price}`)} className={`${p.popular ? "bg-white text-red-600" : "bg-red-600 text-white"} w-full rounded-full`}>
                    Promote {p.price}
                  </Button>
                </div>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Animated delay={100}><h3 className="text-2xl font-bold mb-6">Success Stories</h3></Animated>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { ch: "SpeedRunPro", stat: "+18K subs", desc: "Short-form + playlist push." },
              { ch: "RetroPlays", stat: "+7K subs", desc: "Niche targeting for retro fans." },
              { ch: "MobileRush", stat: "+12K subs", desc: "Mobile-first shorts campaign." }
            ].map((t, i) => (
              <Animated key={t.ch} delay={140 + i * 80}>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animated delay={100}><h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3></Animated>

          <div className="space-y-4 text-gray-700">
            {[
              { q: "Can you target specific game titles?", a: "Yes — we use YouTube interest & search signals to reach fans of particular titles." },
              { q: "Do you boost live streams?", a: "Yes — we have live-event packages to boost concurrent viewers." },
              { q: "Are viewers real?", a: "Yes — campaigns run through Google Ads targeting real users." }
            ].map((f, i) => (
              <Animated key={f.q} delay={140 + i * 70}>
                <details className="p-4 border rounded-lg">
                  <summary className="font-semibold cursor-pointer">{f.q}</summary>
                  <p className="mt-2 text-sm">{f.a}</p>
                </details>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Ready to level up your gaming channel?</h3>
            <p className="text-sm text-red-100 mt-2">Start a campaign optimized for community growth and watch-time.</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => handleWhatsApp("Start gaming campaign")} className="bg-white text-red-600 px-6 py-4 rounded-full font-semibold">Start Promotion</Button>
            <Link to="/pricing" className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-white/30">View Plans</Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* page CSS */}
      <style>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-40px) scale(1.05); }
          66% { transform: translate(-20px,20px) scale(0.95); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2500 { animation-delay: 2.5s; }
        .animate-pulse { animation: pulse 1.8s ease-in-out infinite; }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 0.95; }
        }
      `}</style>
    </div>
  );
};

export default YoutubeGamingPromotion;
