// src/pages/YoutubeMusicPromotion.tsx
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Youtube, Music, Play, Headphones, Users, CheckCircle, Star } from "lucide-react";

/**
 * Self-contained small useInView hook and Animated wrapper so you don't need
 * to add separate files. This will reveal children when they scroll into view.
 */
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref.current]);

  return { ref, inView };
}

const Animated: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
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

/* small counter used in stats */
const Counter: React.FC<{ to: number; duration?: number }> = ({ to, duration = 1200 }) => {
  const [value, setValue] = useState(0);
  const start = useRef<number | null>(null);

  useEffect(() => {
    let rafId: number;
    const step = (ts: number) => {
      if (!start.current) start.current = ts;
      const progress = Math.min((ts - start.current) / duration, 1);
      setValue(Math.floor(progress * to));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [to, duration]);

  return <span className="font-bold text-3xl lg:text-4xl text-red-600">{value.toLocaleString()}</span>;
};

const YoutubeMusicPromotion: React.FC = () => {
  const handleWhatsApp = (preset?: string) => {
    const text = preset ? `Promote my music: ${preset}` : "I want to promote my music video on YouTube";
    window.open(`https://wa.me/917355518761?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Navbar />

     {/* HERO */}
<header className="relative overflow-hidden bg-[#1a1a2e] py-16 lg:py-24">
  {/* Subtle animated blobs - RED THEME */}
  <div className="absolute -left-20 top-10 w-96 h-96 bg-red-600 rounded-full opacity-10 blur-3xl animate-blob pointer-events-none"></div>
  <div className="absolute right-10 bottom-10 w-80 h-80 bg-red-500 rounded-full opacity-10 blur-3xl animate-blob animation-delay-2000 pointer-events-none"></div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      {/* Left Side - Content */}
      <Animated className="" delay={50}>
        <div className="space-y-6">
          {/* Google Partner Badge */}
          <div className="inline-block">
            <div className="bg-gray-700/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-gray-300">Google Partner</span>
            </div>
          </div>

          {/* Main Heading - RED GRADIENT */}
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            <div className="text-white mb-2">YouTube Music Video</div>
            <div className="flex items-center gap-3">
              <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent font-extrabold">
                Promotion
              </span>
              <span className="text-white">Service</span>
            </div>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-base lg:text-lg leading-relaxed max-w-lg">
            Reach thousands of targeted real music fans<br />
            with your YouTube video!
          </p>

          {/* Input Box */}
          <div className="pt-2">
            <div className="bg-white rounded-full p-1.5 flex items-center gap-2 shadow-2xl max-w-2xl">
              <div className="flex items-center gap-3 flex-1 px-4 py-1">
                <Youtube className="h-5 w-5 text-red-600 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Enter your YouTube video URL"
                  className="flex-1 border-0 focus:outline-none text-sm bg-transparent placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Features with Checkmarks */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-700/50">
                <CheckCircle className="h-3.5 w-3.5 text-green-400" />
              </div>
              <span className="text-gray-300 text-sm">Legal. We use YouTube Ads only</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-700/50">
                <CheckCircle className="h-3.5 w-3.5 text-green-400" />
              </div>
              <span className="text-gray-300 text-sm">Start as low as $24.5</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-700/50">
                <CheckCircle className="h-3.5 w-3.5 text-green-400" />
              </div>
              <span className="text-gray-300 text-sm">Real followers, views, likes and comments</span>
            </div>
          </div>
        </div>
      </Animated>

      {/* Right Side - Music Image */}
      <Animated className="" delay={150}>
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-xl">
            <img 
              src="/lovable-uploads/music.png" 
              alt="Music Promotion Visualization" 
              className="w-full h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
        </div>
      </Animated>
    </div>
  </div>
</header>



      {/* WHY IT WORKS */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animated delay={60}>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 text-center">Why Music Promotion Works</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">We combine YouTube ad placements with music-focused targeting to reach listeners that convert into subscribers and playlist followers.</p>
          </Animated>

          <div className="grid md:grid-cols-3 gap-8">
            <Animated delay={120}>
              <div className="p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform transition hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-4"><Music className="h-6 w-6 text-red-600" /><h3 className="text-lg font-semibold">Genre & Mood Targeting</h3></div>
                <p className="text-gray-600 text-sm">Reach listeners by genre (EDM, Indie, Hip-hop) and mood (chill, workout, study).</p>
              </div>
            </Animated>

            <Animated delay={180}>
              <div className="p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform transition hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-4"><Play className="h-6 w-6 text-red-600" /><h3 className="text-lg font-semibold">Smart Placements</h3></div>
                <p className="text-gray-600 text-sm">In-stream, in-feed, and recommended placements tuned to music listeners increase discovery & saves.</p>
              </div>
            </Animated>

            <Animated delay={240}>
              <div className="p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform transition hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-4"><Users className="h-6 w-6 text-red-600" /><h3 className="text-lg font-semibold">Fan Conversion</h3></div>
                <p className="text-gray-600 text-sm">Focus on long-term subscribers and playlist adds — not just one-time views.</p>
              </div>
            </Animated>
          </div>
        </div>
      </section>

      {/* 3 STEP FLOW */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animated delay={60}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works — 3 Easy Steps</h3>
          </Animated>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Share your track", desc: "Paste video link or channel link and brief." },
              { title: "Target listeners", desc: "Pick genres, countries & interests." },
              { title: "We optimize", desc: "Creative testing & placement tuning for retention." }
            ].map((s, i) => (
              <Animated key={i} delay={120 + i * 80}>
                <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-2">
                  <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
                    <span className="font-bold text-red-600">{i + 1}</span>
                  </div>
                  <h4 className="font-semibold mb-2">{s.title}</h4>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </div>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES WITH STAGGER */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animated delay={80}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Suggested Packages</h3>
          </Animated>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: "₹500", perks: ["Targeted views", "Basic optimization", "Short burst"] },
              { name: "Growth", price: "₹2,000", perks: ["Advanced targeting", "Playlist pushes", "Weekly tuning"], popular: true },
              { name: "Pro", price: "₹6,500", perks: ["Custom creatives", "Priority support", "Conversion optimization"] }
            ].map((p, i) => (
              <Animated key={p.name} delay={120 + i * 120}>
                <div className={`rounded-3xl p-8 shadow-lg transition transform hover:-translate-y-2 ${p.popular ? "bg-gradient-to-br from-red-600 to-red-700 text-white" : "bg-white"}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className={`text-sm font-semibold ${p.popular ? "text-red-100" : "text-gray-500"}`}>{p.name}</div>
                      <div className={`text-3xl font-bold ${p.popular ? "text-white" : "text-gray-900"}`}>{p.price}</div>
                    </div>
                    {p.popular && <div className="px-3 py-1 rounded-full bg-white/20 text-sm">Popular</div>}
                  </div>

                  <p className={`${p.popular ? "text-red-100" : "text-gray-600"} mb-4 text-sm`}>{p.name === "Growth" ? "Best for steady audience building" : "Great for testing & quick gains"}</p>

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

      {/* TESTIMONIALS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Animated delay={80}>
            <h3 className="text-2xl font-bold mb-6">Success Stories</h3>
          </Animated>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { ch: "IndieBeats", stat: "+9K subs", desc: "Playlist & short-form combo worked wonders." },
              { ch: "ClubElectro", stat: "+14K subs", desc: "Genre targeting to EDM fans." },
              { ch: "CalmPiano", stat: "+6K subs", desc: "Study & relaxation audience boosted streams." }
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animated delay={80}>
            <h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3>
          </Animated>

          <div className="space-y-4 text-gray-700">
            {[
              { q: "Are these real listeners?", a: "Yes — campaigns are run via Google Ads and target real users by interest." },
              { q: "Can you promote playlists?", a: "Yes. Playlist promotion is effective for bingeable content." },
              { q: "How soon will I see results?", a: "Initial signals appear within 24-72 hours; optimization continues over 1-2 weeks." }
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Ready to get real listeners for your music?</h3>
            <p className="text-sm text-red-100 mt-2">Start a campaign optimized for streams, playlist adds & long-term subscribers.</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => handleWhatsApp("Start music campaign")} className="bg-white text-red-600 px-6 py-4 rounded-full font-semibold">Start Promotion</Button>
            <Link to="/pricing" className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-white/30">View Plans</Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Page-specific small CSS for keyframes used above */}
      <style>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-40px) scale(1.05); }
          66% { transform: translate(-20px,20px) scale(0.95); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
};

export default YoutubeMusicPromotion;
