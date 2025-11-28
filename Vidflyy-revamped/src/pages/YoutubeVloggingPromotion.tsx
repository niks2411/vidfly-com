// src/pages/YoutubeVloggingPromotion.tsx
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera, Play, Users, MapPin, Heart, Video, Clock4, Star } from "lucide-react";

/* Small built-in in-view hook, Animated wrapper and Counter */
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

const Animated: React.FC<{ children: any; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
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

const Counter: React.FC<{ to: number; duration?: number }> = ({ to, duration = 1300 }) => {
  const [val, setVal] = useState(0);
  const start = useRef<number | null>(null);

  useEffect(() => {
    let rafId: number;
    const step = (ts: number) => {
      if (!start.current) start.current = ts;
      const prog = Math.min((ts - start.current) / duration, 1);
      setVal(Math.floor(prog * to));
      if (prog < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [to, duration]);

  return <span className="font-bold text-3xl lg:text-4xl text-red-600">{val.toLocaleString()}</span>;
};

const YoutubeVloggingPromotion: React.FC = () => {
  const handleWhatsApp = (preset?: string) => {
    const text = preset ? `Promote my vlog: ${preset}` : "I want to promote my vlogging channel on YouTube";
    window.open(`https://wa.me/917355518761?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Navbar />

      {/* HERO */}
      <header className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-24 lg:py-32">
        <div className="absolute -left-32 -top-24 w-80 h-80 bg-red-100 rounded-full opacity-25 animate-blob pointer-events-none"></div>
        <div className="absolute right-8 top-20 w-64 h-64 bg-red-200 rounded-full opacity-18 animate-blob animation-delay-2500 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Animated delay={60}>
              <div>
                <div className="inline-flex items-center gap-3 mb-4">
                  <Camera className="h-6 w-6 text-red-600" />
                  <span className="text-xs font-semibold text-red-600 uppercase">Vlogging Promotion</span>
                </div>

                <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                  Grow Your Vlog — Turn Casual Viewers Into Loyal Fans
                </h1>

                <p className="text-gray-600 max-w-2xl mb-6">
                  Promote daily vlogs, travel diaries, lifestyle & behind-the-scenes content to viewers who binge, comment and subscribe.
                  We optimize for watch-time, repeat views and community growth.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={() => handleWhatsApp("Vlog starter pack")} className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform">
                    Promote My Vlog
                  </Button>

                  <Link to="/pricing" className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-gray-200 hover:shadow-md mt-2 sm:mt-0">
                    See Pricing
                  </Link>
                </div>

                <div className="mt-6 flex gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2"><Video className="h-4 w-4 text-red-600" /> Shorts + Long-form</div>
                  <div className="flex items-center gap-2"><Users className="h-4 w-4 text-red-600" /> Community-focused</div>
                </div>
              </div>
            </Animated>

            <Animated delay={160}>
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-md transform hover:-translate-y-3 transition">
                  <div className="relative overflow-hidden rounded-xl">
                    <img src="/lovable-uploads/vlog-hero.png" alt="Vlog promotion" className="w-full h-56 object-cover" loading="lazy" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-black/40 rounded-full p-4 animate-pulse">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm text-gray-500">Starter</div>
                    <div className="text-lg font-semibold text-gray-900">Start from ₹650</div>
                    <div className="text-sm text-gray-600">Perfect for daily vloggers and lifestyle creators testing content fit.</div>

                    <div className="mt-4 flex gap-3">
                      <Button onClick={() => handleWhatsApp("Starter ₹650")} className="bg-red-600 text-white rounded-full px-4 py-2">Promote</Button>
                      <button onClick={() => handleWhatsApp("Need custom plan")} className="ml-auto text-sm text-gray-500 hover:underline">Custom plan</button>
                    </div>
                  </div>
                </div>
              </div>
            </Animated>
          </div>

          {/* STATS */}
          <Animated delay={260}>
            <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                <div><Counter to={58000} /><div className="text-sm text-gray-600">Creators</div></div>
                <div><Counter to={4200000000} /><div className="text-sm text-gray-600">Real Views</div></div>
                <div><Counter to={76000} /><div className="text-sm text-gray-600">Campaigns Run</div></div>
                <div><Counter to={1300000} /><div className="text-sm text-gray-600">Subs Gained</div></div>
              </div>
            </div>
          </Animated>
        </div>
      </header>

      {/* WHY VLOGGERS CHOOSE US */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animated delay={80}>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 text-center">Why Vloggers Scale With Our Campaigns</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">We target binge-watchers, niche audiences, and local viewers — the ones who subscribe, comment and share your life.</p>
          </Animated>

          <div className="grid md:grid-cols-3 gap-8">
            <Animated delay={120}>
              <div className="p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform hover:-translate-y-2 transition">
                <div className="flex items-center gap-3 mb-4"><Star className="h-6 w-6 text-red-600" /><h3 className="text-lg font-semibold">Creative Testing</h3></div>
                <p className="text-gray-600 text-sm">Multiple thumbnails and hooks to discover what drives subscriptions for your vibe.</p>
              </div>
            </Animated>

            <Animated delay={180}>
              <div className="p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform hover:-translate-y-2 transition">
                <div className="flex items-center gap-3 mb-4"><MapPin className="h-6 w-6 text-red-600" /><h3 className="text-lg font-semibold">Geo & Local Reach</h3></div>
                <p className="text-gray-600 text-sm">Grow viewership in target cities, languages and communities that matter to your niche.</p>
              </div>
            </Animated>

            <Animated delay={240}>
              <div className="p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform hover:-translate-y-2 transition">
                <div className="flex items-center gap-3 mb-4"><Clock4 className="h-6 w-6 text-red-600" /><h3 className="text-lg font-semibold">Retention-first</h3></div>
                <p className="text-gray-600 text-sm">We optimize for watch-time and return viewers — which helps YouTube recommend your channel more.</p>
              </div>
            </Animated>
          </div>
        </div>
      </section>

      {/* STEP-BY-STEP */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animated delay={80}>
            <h3 className="text-2xl font-bold text-center mb-6">How It Works — 4 Simple Steps</h3>
          </Animated>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: 1, title: "Share your vlog link", desc: "Provide video or channel link and campaign brief." },
              { n: 2, title: "Choose target", desc: "Locations, interests, and audience type." },
              { n: 3, title: "We run tests", desc: "Creative + placement testing for retention." },
              { n: 4, title: "Scale what works", desc: "Weekly reports and campaign scaling." },
            ].map((s, i) => (
              <Animated key={s.n} delay={120 + i * 90}>
                <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-2">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                    <span className="font-bold text-red-600">{s.n}</span>
                  </div>
                  <h4 className="font-semibold mb-2">{s.title}</h4>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </div>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animated delay={80}><h3 className="text-2xl font-bold text-center mb-6">Recommended Packages</h3></Animated>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: "₹650", perks: ["Shorts + in-stream", "Basic tuning", "Quick test"] },
              { name: "Growth", price: "₹2,400", perks: ["Geo + interest mix", "Weekly optimization", "Playlist pushes"], popular: true },
              { name: "Pro", price: "₹9,500", perks: ["Custom creatives", "Dedicated manager", "Conversion & retention focus"] },
            ].map((p, i) => (
              <Animated key={p.name} delay={120 + i * 100}>
                <div className={`${p.popular ? "bg-gradient-to-br from-red-600 to-red-700 text-white" : "bg-white"} rounded-3xl p-8 shadow-lg transform transition hover:-translate-y-2`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className={`text-sm font-semibold ${p.popular ? "text-red-100" : "text-gray-500"}`}>{p.name}</div>
                      <div className={`text-3xl font-bold ${p.popular ? "text-white" : "text-gray-900"}`}>{p.price}</div>
                    </div>
                    {p.popular && <div className="px-3 py-1 rounded-full bg-white/20 text-sm">Popular</div>}
                  </div>

                  <ul className={`${p.popular ? "text-red-100" : "text-gray-700"} space-y-2 mb-6`}>
                    {p.perks.map((perk) => <li key={perk} className="flex items-center gap-2"><CheckIcon /></li>)}
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

      {/* TESTIMONIALS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Animated delay={80}><h3 className="text-2xl font-bold mb-6">Creators Who Grew With Us</h3></Animated>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { ch: "DailyRohit", stat: "+11K subs", desc: "Shorts + long-form combo increased retention." },
              { ch: "FoodWalks", stat: "+7K subs", desc: "Local geo-targeting for food vlogs." },
              { ch: "HomeWithMira", stat: "+9K subs", desc: "Playlist promotion and creative testing." },
            ].map((t, i) => (
              <Animated key={t.ch} delay={120 + i * 80}>
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
          <Animated delay={80}><h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3></Animated>

          <div className="space-y-4 text-gray-700">
            {[
              { q: "Will these be real viewers?", a: "Yes — campaigns use Google Ads to reach genuine YouTube users." },
              { q: "Do you promote across Shorts and long-form?", a: "Yes — we use a mix based on content and audience." },
              { q: "How soon will I see results?", a: "Initial signals appear within 48-72 hours; optimization continues over weeks." },
            ].map((f, i) => (
              <Animated key={f.q} delay={120 + i * 70}>
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
            <h3 className="text-2xl font-bold">Ready to grow your vlog with real fans?</h3>
            <p className="text-sm text-red-100 mt-2">Start a campaign optimized for retention, community and watch-time.</p>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => handleWhatsApp("Start vlog campaign")} className="bg-white text-red-600 px-6 py-4 rounded-full font-semibold">Start Promotion</Button>
            <Link to="/pricing" className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-white/30">View Plans</Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* small CSS for blob animation */}
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

        /* tiny helper for missing CheckCircle import in this file */
        .check-dot::before { content: "✔"; display:inline-block; color: #ef4444; margin-right: 8px; font-weight:700; }
      `}</style>
    </div>
  );
};

/* small placeholder for check icon usage inside perks list (keeps markup clean) */
const CheckIcon = () => <span className="check-dot" />;

export default YoutubeVloggingPromotion;
