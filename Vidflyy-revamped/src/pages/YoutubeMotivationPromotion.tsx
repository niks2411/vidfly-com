// src/pages/YoutubeMotivationPromotion.tsx
import { useRef, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Flame,
  HeartHandshake,
  Users,
  CheckCircle,
  Play,
  Target,
  Sparkles,
  ThumbsUp,
  Brain,
} from "lucide-react";

/* -----------------------------
   Built-in Animation Hooks
------------------------------ */
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(node);
          }
        });
      },
      { threshold: 0.12, ...options }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [ref.current]);

  return { ref, visible };
}

const Animated: React.FC<{ children: any; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = "",
}) => {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref as any}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transform transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
};

const Counter: React.FC<{ to: number; duration?: number }> = ({ to, duration = 1300 }) => {
  const [value, setValue] = useState(0);
  const start = useRef<number | null>(null);

  useEffect(() => {
    let frame: number;
    const step = (ts: number) => {
      if (!start.current) start.current = ts;
      const progress = Math.min((ts - start.current) / duration, 1);
      setValue(Math.floor(progress * to));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [to, duration]);

  return <span className="font-bold text-3xl lg:text-4xl text-red-600">{value.toLocaleString()}</span>;
};

/* -----------------------------
   MAIN PAGE
------------------------------ */
const YoutubeMotivationPromotion = () => {
  const wa = (msg?: string) => {
    const text = msg || "I want to promote my motivation channel on YouTube";
    window.open(`https://wa.me/917355518761?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Navbar />

      {/* HERO */}
      <header className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-white py-24 lg:py-32">
        {/* Animated background shapes */}
        <div className="absolute -left-32 -top-24 w-80 h-80 bg-yellow-200 rounded-full opacity-30 blur-xl animate-blob"></div>
        <div className="absolute right-8 top-20 w-64 h-64 bg-red-200 rounded-full opacity-20 blur-lg animate-blob animation-delay-2500"></div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT HERO TEXT */}
            <Animated delay={80}>
              <div>
                <div className="inline-flex items-center gap-3 mb-4">
                  <Flame className="h-6 w-6 text-red-600" />
                  <span className="text-xs font-semibold text-red-600 uppercase">Motivation Promotion</span>
                </div>

                <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                  Inspire Millions. Grow Your Motivation Channel With Real Interested Viewers.
                </h1>

                <p className="text-gray-600 max-w-xl mb-6">
                  Promote motivational speeches, success stories, life lessons, productivity tips and inspirational shorts to people actively seeking motivation daily.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => wa("Motivation basic package")}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full px-6 py-4 shadow-lg hover:scale-105 transition"
                  >
                    Promote My Channel
                  </Button>
                  <Link
                    to="/pricing"
                    className="rounded-full px-6 py-4 border border-gray-300 hover:shadow-md text-center mt-2 sm:mt-0"
                  >
                    View Pricing
                  </Link>
                </div>

                <div className="mt-6 flex gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2"><Brain className="h-4 w-4 text-red-600" /> Mindset-focused audience</div>
                  <div className="flex items-center gap-2"><ThumbsUp className="h-4 w-4 text-red-600" /> High retention viewers</div>
                </div>
              </div>
            </Animated>

            {/* HERO CARD */}
            <Animated delay={180}>
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-md w-full transform hover:-translate-y-3 transition">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src="/lovable-uploads/motivation-hero.png"
                      className="w-full h-56 object-cover"
                      alt="Motivation Promotion"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/40 p-4 rounded-full animate-pulse">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm text-gray-500">Starter Pack</div>
                    <div className="text-lg font-semibold text-gray-900">Start from ₹650</div>
                    <p className="text-sm text-gray-600">Perfect for new creators posting motivational shorts & speech clips.</p>

                    <div className="flex gap-3 mt-4">
                      <Button onClick={() => wa("Starter ₹650")} className="bg-red-600 text-white rounded-full px-4 py-2">
                        Promote
                      </Button>
                      <button onClick={() => wa("Custom plan")} className="text-sm text-gray-500 hover:underline ml-auto">
                        Custom plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Animated>
          </div>

          {/* STATS */}
          <Animated delay={260}>
            <div className="mt-14 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                <div><Counter to={51000} /><div className="text-sm text-gray-600">Motivational Creators</div></div>
                <div><Counter to={3100000000} /><div className="text-sm text-gray-600">Real Views Delivered</div></div>
                <div><Counter to={87000} /><div className="text-sm text-gray-600">Campaigns Run</div></div>
                <div><Counter to={1200000} /><div className="text-sm text-gray-600">Subs Gained</div></div>
              </div>
            </div>
          </Animated>
        </div>
      </header>

      {/* WHY IT WORKS */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Animated delay={100}>
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6">
              Why Motivational Channels Grow Fast With Us
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
              Motivational audiences watch more, save videos, follow channels, and return daily — our campaigns attract high-retention viewers.
            </p>
          </Animated>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: "High-retention Viewers", desc: "People who love daily inspiration and mindset content engage longer." },
              { icon: Flame, title: "Viral Shorts Boost", desc: "Short motivational clips perform best — massive mobile reach." },
              { icon: HeartHandshake, title: "Life Improvement Audiences", desc: "Viewers actively searching for positivity, discipline and success." },
            ].map((b, i) => (
              <Animated key={b.title} delay={140 + i * 80}>
                <div className="p-6 bg-gradient-to-br from-yellow-50 to-white rounded-2xl shadow hover:-translate-y-2 transition">
                  <div className="flex items-center gap-3 mb-4"><b.icon className="h-6 w-6 text-red-600" /><h3 className="font-semibold text-lg">{b.title}</h3></div>
                  <p className="text-gray-600 text-sm">{b.desc}</p>
                </div>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10">
          <Animated delay={120}>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Who We Target</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-600" />
                  <div><div className="font-semibold">Students & Young Creators</div><div className="text-sm">People preparing for exams, careers & goals.</div></div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-600" />
                  <div><div className="font-semibold">Entrepreneurs</div><div className="text-sm">Viewers searching for hustle mindset content.</div></div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-600" />
                  <div><div className="font-semibold">Fitness & Discipline Seekers</div><div className="text-sm">People wanting motivation for habits & change.</div></div>
                </li>
              </ul>
            </div>
          </Animated>

          <Animated delay={180}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="font-semibold mb-4">Best Ad Placements</h4>
              <div className="space-y-3">
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="font-semibold text-sm">Shorts Boost</div>
                  <div className="text-xs text-gray-600">Best for daily motivational messages.</div>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="font-semibold text-sm">Search Visibility</div>
                  <div className="text-xs text-gray-600">Top ranking for “motivation for study”, “success tips”, etc.</div>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="font-semibold text-sm">In-stream Ads</div>
                  <div className="text-xs text-gray-600">Shown before inspirational and self-help videos.</div>
                </div>
              </div>
            </div>
          </Animated>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Animated delay={100}><h3 className="text-2xl font-bold text-center mb-6">Recommended Packages</h3></Animated>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: "₹650", perks: ["Shorts boost", "Basic targeting", "Quick performance"] },
              { name: "Popular", price: "₹2,400", perks: ["High-retention targeting", "Search visibility", "Weekly optimization"], popular: true },
              { name: "Pro", price: "₹7,800", perks: ["Custom audience signals", "Advanced optimization", "Dedicated manager"] },
            ].map((p, i) => (
              <Animated key={p.name} delay={140 + i * 80}>
                <div className={`p-8 rounded-3xl shadow-lg transition transform hover:-translate-y-2 ${p.popular ? "bg-gradient-to-br from-red-600 to-red-700 text-white" : "bg-white"}`}>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className={`text-sm font-semibold ${p.popular ? "text-red-100" : "text-gray-500"}`}>{p.name}</div>
                      <div className={`text-3xl font-bold ${p.popular ? "text-white" : "text-gray-900"}`}>{p.price}</div>
                    </div>
                    {p.popular && <div className="px-3 py-1 bg-white/20 rounded-full text-sm">Popular</div>}
                  </div>

                  <ul className={`space-y-2 mb-6 ${p.popular ? "text-red-100" : "text-gray-700"}`}>
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2">
                        <CheckCircle className={`h-4 w-4 ${p.popular ? "text-red-200" : "text-red-600"}`} /> {perk}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => wa(`${p.name} ${p.price}`)}
                    className={`${p.popular ? "bg-white text-red-600" : "bg-red-600 text-white"} rounded-full w-full`}
                  >
                    Promote {p.price}
                  </Button>
                </div>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Animated delay={80}><h3 className="text-2xl font-bold mb-6">Creator Success Stories</h3></Animated>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { ch: "RiseWithAman", stat: "+20K subs", desc: "Daily shorts skyrocketed engagement." },
              { ch: "MindsetBoost", stat: "+14K subs", desc: "Long motivational speeches gained huge retention." },
              { ch: "LifeShift", stat: "+11K subs", desc: "Goal-oriented viewers converted strongly." },
            ].map((t, i) => (
              <Animated key={t.ch} delay={120 + i * 70}>
                <div className="bg-white p-6 rounded-2xl shadow hover:-translate-y-2 transition">
                  <div className="text-sm text-gray-500">Channel: {t.ch}</div>
                  <div className="font-semibold text-gray-900 mt-2">{t.stat}</div>
                  <p className="text-sm text-gray-600">{t.desc}</p>
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

          <div className="space-y-4">
            {[
              { q: "Do motivational shorts perform well?", a: "Yes — they have the highest retention and reach on YouTube." },
              { q: "Are viewers real?", a: "All promotions run through Google Ads targeting real users." },
              { q: "Can you promote long speeches?", a: "Yes — we optimize for long retention and engagement." },
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
            <h3 className="text-2xl font-bold">Ready to Inspire Millions?</h3>
            <p className="text-sm text-red-100 mt-2">Start promoting your motivational content today.</p>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => wa("Start motivational campaign")} className="bg-white text-red-600 px-6 py-4 rounded-full font-semibold">
              Start Promotion
            </Button>
            <Link to="/pricing" className="border border-white/30 px-6 py-4 rounded-full flex items-center">
              View Plans
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Blob Animations */}
      <style>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(35px,-45px) scale(1.05); }
          66% { transform: translate(-30px,20px) scale(0.95); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2500 { animation-delay: 2.5s; }
        .animate-pulse {
          animation: pulse 1.6s ease-in-out infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 0.95; }
        }
      `}</style>
    </div>
  );
};

export default YoutubeMotivationPromotion;
