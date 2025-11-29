// src/pages/YoutubeHealthBeautyPromotion.tsx
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Heart,
  Sparkles,
  Users,
  CheckCircle,
  Camera,
  Wand2,
  Play,
  Target,
  Star,
} from "lucide-react";

/* ---------------------------
   Small built-in in-view + Animated + Counter
   (so you don't need extra files)
   --------------------------- */
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
      className={`${className} transform transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
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

/* ---------------------------
   Page component
   --------------------------- */
const YoutubeHealthBeautyPromotion: React.FC = () => {
  const handleWhatsApp = (preset?: string) => {
    const text = preset || "I want to promote my health & beauty videos on YouTube";
    window.open(`https://wa.me/917355518761?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Navbar />

      {/* HERO */}
      <header className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-white py-24 lg:py-32">
        {/* decorative blobs */}
        <div className="absolute -left-32 -top-24 w-80 h-80 bg-pink-100 rounded-full opacity-25 animate-blob pointer-events-none"></div>
        <div className="absolute right-8 top-16 w-64 h-64 bg-pink-200 rounded-full opacity-18 animate-blob animation-delay-2500 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Animated delay={60}>
              <div>
                <div className="inline-flex items-center gap-3 mb-4">
                  <Heart className="h-6 w-6 text-red-600" />
                  <span className="text-xs font-semibold text-red-600 uppercase">Health & Beauty Promotion</span>
                </div>

                <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                  Get Your Beauty & Wellness Videos In Front Of Real, Engaged Viewers
                </h1>

                <p className="text-gray-600 max-w-2xl mb-6">
                  Promote skincare routines, makeup tutorials, wellness guides and product reviews to audiences most likely to engage, save and convert.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={() => handleWhatsApp("Starter beauty pack")} className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-full shadow-lg transform transition hover:scale-105">
                    Promote My Channel
                  </Button>

                  <Link to="/pricing" className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-gray-200 hover:shadow-md mt-2 sm:mt-0">
                    See Pricing
                  </Link>
                </div>

                <div className="mt-6 flex gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-red-600" /> Product-intent targeting</div>
                  <div className="flex items-center gap-2"><Users className="h-4 w-4 text-red-600" /> High-engagement viewers</div>
                </div>
              </div>
            </Animated>

            <Animated delay={180}>
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-md transform hover:-translate-y-3 transition">
                  <div className="relative overflow-hidden rounded-xl">
                    <img src="/lovable-uploads/health-beauty-hero.png" alt="Health & beauty promotion" className="w-full h-56 object-cover" loading="lazy" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-black/40 rounded-full p-4 animate-pulse">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm text-gray-500">Starter</div>
                    <div className="text-lg font-semibold text-gray-900">Start from ₹750</div>
                    <div className="text-sm text-gray-600">Reach beauty lovers, skincare seekers & wellness audiences.</div>

                    <div className="mt-4 flex gap-3">
                      <Button onClick={() => handleWhatsApp("Starter ₹750")} className="bg-red-600 text-white rounded-full px-4 py-2">Promote</Button>
                      <button onClick={() => handleWhatsApp("Custom beauty plan")} className="ml-auto text-sm text-gray-500 hover:underline">Custom plan</button>
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
                <div><Counter to={42000} /><div className="text-sm text-gray-600">Creators</div></div>
                <div><Counter to={3500000000} /><div className="text-sm text-gray-600">Real Views</div></div>
                <div><Counter to={48000} /><div className="text-sm text-gray-600">Boosts Run</div></div>
                <div><Counter to={950000} /><div className="text-sm text-gray-600">Subs Gained</div></div>
              </div>
            </div>
          </Animated>
        </div>
      </header>

      {/* WHY THIS WORKS */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Animated delay={80}>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 text-center">Why Beauty Creators Choose Our Promotions</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">We target viewers who are ready to try, buy and follow — product-intent audiences, routine watchers and trend followers.</p>
          </Animated>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Wand2, title: "Product-intent Targeting", desc: "Reach viewers searching for product reviews, routines and hauls." },
              { icon: Camera, title: "Cinematic Placement", desc: "Promote beautifully shot demos and tutorials to receptive viewers." },
              { icon: Target, title: "Conversion Focus", desc: "Optimize for saves, clicks and subscriber growth — not just plays." },
            ].map((b, i) => (
              <Animated key={b.title} delay={120 + i * 80}>
                <div className="p-6 bg-gradient-to-br from-pink-50 to-white rounded-2xl shadow-sm transform hover:-translate-y-2 transition">
                  <div className="flex items-center gap-3 mb-4"><b.icon className="h-6 w-6 text-red-600" /><h3 className="text-lg font-semibold">{b.title}</h3></div>
                  <p className="text-gray-600 text-sm">{b.desc}</p>
                </div>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE TARGET & PLACEMENTS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10">
          <Animated delay={80}>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Who We Target</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-red-600" /><div><div className="font-semibold">Skincare Enthusiasts</div><div className="text-sm">Viewers learning routines, tips & product recommendations.</div></div></li>
                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-red-600" /><div><div className="font-semibold">Makeup Fans</div><div className="text-sm">Tutorial & haul audiences who engage & save.</div></div></li>
                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-red-600" /><div><div className="font-semibold">Wellness Seekers</div><div className="text-sm">Yoga, supplements, and routine-led audiences.</div></div></li>
              </ul>
            </div>
          </Animated>

          <Animated delay={140}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="font-semibold text-gray-900 mb-4">Placement Examples</h4>
              <div className="space-y-3">
                <div className="bg-gray-100 rounded-lg p-4"><div className="font-semibold text-sm">In-stream Ads</div><div className="text-xs text-gray-600">Shown before tutorials and product demos.</div></div>
                <div className="bg-gray-100 rounded-lg p-4"><div className="font-semibold text-sm">In-feed & Search</div><div className="text-xs text-gray-600">Appears in search for product reviews and routines.</div></div>
                <div className="bg-gray-100 rounded-lg p-4"><div className="font-semibold text-sm">Shorts Promotion</div><div className="text-xs text-gray-600">Quick tips and transformations perform well in mobile placements.</div></div>
              </div>
            </div>
          </Animated>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Animated delay={80}><h3 className="text-2xl font-bold text-center mb-6">Suggested Packages for Beauty Creators</h3></Animated>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: "₹750", perks: ["Targeted views", "Short campaign", "Basic tuning"] },
              { name: "Popular", price: "₹2,800", perks: ["Product-intent targeting", "Playlist boosts", "Weekly tuning"], popular: true },
              { name: "Pro", price: "₹9,000", perks: ["Custom creatives", "Priority support", "Conversion optimization"] },
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

                  <ul className={`${p.popular ? "text-red-100" : "text-gray-700"} space-y-2 mb-6 text-sm`}>
                    {p.perks.map((perk) => <li key={perk} className="flex items-center gap-2"><CheckCircle className={`h-4 w-4 ${p.popular ? "text-red-200" : "text-red-600"}`} />{perk}</li>)}
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
      <section className="py-16 bg-pink-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Animated delay={80}><h3 className="text-2xl font-bold mb-6">Success Stories</h3></Animated>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { ch: "GlowWithRiya", stat: "+12K subs", desc: "Makeup hacks + routine promotion." },
              { ch: "HealNaturals", stat: "+9K subs", desc: "Wellness & natural beauty targeting." },
              { ch: "HairCareHub", stat: "+8K subs", desc: "Hair routines and product demos." },
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
        <div className="max-w-4xl mx-auto px-4">
          <Animated delay={80}><h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3></Animated>

          <div className="space-y-4 text-gray-700">
            {[
              { q: "Do you target product-intent viewers?", a: "Yes — we target users searching for product reviews, demos and routine videos." },
              { q: "Can you promote both shorts & long-form?", a: "Yes — we use a mix of placements depending on performance." },
              { q: "Is engagement real?", a: "Yes — campaigns run through Google Ads and target genuine viewers." },
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
            <h3 className="text-2xl font-bold">Ready to grow your Health & Beauty channel?</h3>
            <p className="text-sm text-red-100 mt-2">Start a campaign focused on real product-intent viewers and long-term followers.</p>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => handleWhatsApp("Start health & beauty campaign")} className="bg-white text-red-600 px-6 py-4 rounded-full font-semibold">
              Start Promotion
            </Button>
            <Link to="/pricing" className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-white/30">View Plans</Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* small page CSS for blob animation */}
      <style>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-40px) scale(1.06); }
          66% { transform: translate(-20px,20px) scale(0.94); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2500 { animation-delay: 2.5s; }
        .animate-pulse { animation: pulse 1.6s ease-in-out infinite; }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 0.95; }
        }
      `}</style>
    </div>
  );
};

export default YoutubeHealthBeautyPromotion;
