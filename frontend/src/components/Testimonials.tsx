import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Arjun Patel",
      role: "Tech Reviewer",
      content: "Vidflyy completely transformed my tech channel. Within 2 months, I went from 800 subscribers to over 15K. The targeted promotion brought in genuinely interested viewers who actively engage with my content.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      metrics: "800 → 15K Subscribers",
      verified: true
    },
    {
      name: "Vikash Singh",
      role: "Educational Content",
      content: "As an educator on YouTube, reaching the right students was crucial. Vidflyy's promotion strategy helped my educational videos reach thousands of motivated learners. My channel now has over 40K subscribers who actively learn from my content.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      metrics: "40K+ Student Subscribers", 
      verified: true
    },
    {
      name: "Ananya Joshi",
      role: "Travel Vlogger",
      content: "My travel vlogs were getting lost in the sea of content until I found Vidflyy. They helped me reach travel enthusiasts who genuinely love exploring new destinations. My average views per video increased from 500 to 12K!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      metrics: "500 → 12K Views Per Video",
      verified: true
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-white  font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            Client <span className="text-red-600">Reviews</span>
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto mb-6">
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
          
          <div className="w-20 h-1 bg-red-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden group">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 rounded-full -mr-8 -mt-8 group-hover:bg-red-100 transition-colors duration-500"></div>
              <Quote className="absolute top-4 right-4 h-7 w-7 text-red-200 group-hover:text-red-300 transition-colors duration-500" />
              
              {/* Rating stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
                {testimonial.verified && (
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">Verified</span>
                )}
              </div>
              
              {/* Testimonial content */}
              <p className="text-gray-700 mb-5 leading-relaxed text-sm italic">
                "{testimonial.content}"
              </p>
              
              {/* Metrics badge */}
              <div className="bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-semibold mb-5 inline-block">
                {testimonial.metrics}
              </div>
              
              {/* Creator info */}
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-red-100"
                  loading="lazy"
                />
                <div>
                  <div className="font-bold text-gray-900 text-base">{testimonial.name}</div>
                  <div className="text-red-600 font-medium text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
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
    </section>
  );
};

export default Testimonials;
