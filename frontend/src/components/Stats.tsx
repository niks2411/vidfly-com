
import { useState, useEffect, useRef } from "react";
import { Users, Eye, Heart, Clock } from "lucide-react";

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { 
      number: 50000, 
      suffix: "K+", 
      label: "Channels Grown", 
      icon: Users,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    { 
      number: 350, 
      suffix: "B+", 
      label: "Views Delivered", 
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    { 
      number: 98, 
      suffix: "%", 
      label: "Satisfaction Rate", 
      icon: Heart,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    { 
      number: 24, 
      suffix: "/7", 
      label: "Support Available", 
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  const [animatedNumbers, setAnimatedNumbers] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        let startTime: number;
        const duration = 2000;
        const startValue = 0;
        const endValue = stat.number;

        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

          setAnimatedNumbers(prev => {
            const newNumbers = [...prev];
            newNumbers[index] = currentValue;
            return newNumbers;
          });

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        setTimeout(() => {
          requestAnimationFrame(animate);
        }, index * 200);
      });
    }
  }, [isVisible]);

  const formatNumber = (num: number, originalStat: any) => {
    if (originalStat.suffix === "M+") {
      return (num / 1000000).toFixed(num >= 1000000 ? 0 : 1);
    } else if (originalStat.suffix === "K+") {
      return (num / 1000).toFixed(num >= 1000 ? 0 : 1);
    }
    return num.toString();
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-900 font-montserrat relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 animate-fade-in">
            Our Track <span className="text-red-500">Record</span>
          </h2>
          <p className="text-xl text-gray-300 animate-fade-in-delay">
            Proven results that speak for themselves
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 transform border border-gray-700 hover:border-red-500 relative overflow-hidden">
                <div className="relative z-10">
                  <div className={`${stat.bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  
                  <div className={`text-4xl lg:text-5xl font-bold text-white mb-2 animate-scale-in`} style={{ animationDelay: `${index * 0.2}s` }}>
                    {formatNumber(animatedNumbers[index], stat)}{stat.suffix}
                  </div>
                  <div className="text-gray-400 font-medium animate-slide-up" style={{ animationDelay: `${index * 0.2 + 0.3}s` }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
