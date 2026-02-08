import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NewServices = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/get-started");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categories = [
    {
      title: "Gamers",
      description: "Level up your gaming channel with targeted promotion to passionate gamers worldwide",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
      link: "/youtube-gaming-promotion",
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "Musician",
      description: "Amplify your music and reach more listeners who love your genre",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
      link: "/youtube-music-promotion",
      color: "from-blue-600 to-cyan-600"
    },
    {
      title: "Healthy Lifestyle",
      description: "Inspire wellness and grow your health & fitness community organically",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      link: "/youtube-health-beauty-promotion",
      color: "from-green-600 to-emerald-600"
    },
    {
      title: "Vloggers",
      description: "Share your daily stories and lifestyle with an engaged audience",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
      link: "/youtube-vlogging-promotion",
      color: "from-orange-600 to-red-600"
    },
    {
      title: "Motivational Speakers",
      description: "Inspire millions with your powerful message and transformative content",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
      link: "/youtube-motivation-promotion",
      color: "from-yellow-600 to-orange-600"
    },
    {
      title: "Travel",
      description: "Take viewers on adventures around the world with stunning travel content",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
      link: "/youtube-travel-promotion",
      color: "from-teal-600 to-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-montserrat">
      {/* YouTube Channel Promotion Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-red-50 to-white relative overflow-hidden font-montserrat">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #ef4444 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header with Fade In Animation */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block mb-4">
              <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase">
                Our Services
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              YouTube Channel <span className="text-red-600 animate-text-gradient">Promotion</span>
            </h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Vidflyy promotes your YouTube videos to the right audience using Google Ads, helping all channel sizes gain higher engagement.
            </p>
          </div>

          {/* Categories Grid with Staggered Animations */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(category.link);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group animate-fade-up cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer h-full border border-gray-100">
                  {/* Image Section with Overlay */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-50 group-hover:opacity-60 transition-opacity duration-500`}></div>

                    {/* Animated shine effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                    </div>

                    {/* Category Title on Image */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-5">
                      <h3 className="text-2xl font-bold text-white tracking-tight transform group-hover:translate-y-[-4px] transition-transform duration-300">
                        {category.title}
                      </h3>
                    </div>

                    {/* Promoted Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                      Popular
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5 bg-gradient-to-b from-white to-gray-50">
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed min-h-[48px]">
                      {category.description}
                    </p>

                    {/* Enhanced Learn More Link */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-red-600 font-bold text-sm group-hover:text-red-700 transition-colors">
                        Learn More
                      </span>
                      <div className="bg-red-50 group-hover:bg-red-600 p-2 rounded-full transition-all duration-300">
                        <ArrowRight className="h-4 w-4 text-red-600 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA with Enhanced Design */}
          <div className="text-center animate-fade-up animation-delay-600">
            <div className="inline-block bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 max-w-2xl transform hover:scale-105 transition-all duration-500 border border-gray-100 hover:border-red-200 hover:shadow-red-100/50">
              {/* Heading */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                Don't see your niche?<br />
                <span className="text-red-600 animate-text-gradient">We've got you covered!</span>
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 text-base leading-relaxed max-w-xl mx-auto">
                Our promotion services work for all YouTube channel types. Let's discuss how we can help grow your channel.
              </p>

              {/* Button */}
              <Button onClick={handleGetStartedClick} className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300 hover:scale-105 active:scale-95 rounded-xl">
                Get Started Now
              </Button>

              {/* Social Proof */}
              <div className="mt-4 flex items-center justify-center gap-2 text-gray-600 text-sm">
                <span>Join 58,000+ satisfied creators</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes textGradient {
          0%, 100% {
            color: #dc2626;
          }
          50% {
            color: #ef4444;
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-fade-up {
          opacity: 0;
          animation: fadeUp 0.8s ease-out forwards;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animate-text-gradient {
          animation: textGradient 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NewServices;
