import { Play, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const OurWorks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const videos = [
    {
      title: "Paalnilaavin Video Song",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop",
      views: "2.5M",
      category: "Music"
    },
    {
      title: "Product Advertisement",
      thumbnail: "https://plus.unsplash.com/premium_photo-1742482666813-82d3db55f2bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UHJvZHVjdCUyMEFkdmVydGlzZW1lbnQlMjBncmFwaHxlbnwwfHwwfHx8MA%3D%3D",
      views: "1.8M",
      category: "Commercial"
    },
    {
      title: "Movie Official Trailer",
      thumbnail: "https://plus.unsplash.com/premium_photo-1748035806808-80c32ffc7430?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TW92aWUlMjBPZmZpY2lhbCUyMFRyYWlsZXJ8ZW58MHx8MHx8fDA%3D",
      views: "800K",
      category: "Entertainment"
    },
    {
      title: "Tech Review Content",
      thumbnail: "https://images.unsplash.com/photo-1633307057722-a4740ba0c5d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGVjaCUyMFJldmlldyUyMENvbnRlbnR8ZW58MHx8MHx8fDA%3D",
      views: "650K",
      category: "Technology"
    },
    {
      title: "Gaming Walkthrough",
      thumbnail: "https://plus.unsplash.com/premium_photo-1744139468667-404f5dae5341?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R2FtaW5nJTIwV2Fsa3Rocm91Z2h8ZW58MHx8MHx8fDA%3D",
      views: "900K",
      category: "Gaming"
    },
    {
      title: "Educational Tutorial",
      thumbnail: "https://plus.unsplash.com/premium_photo-1661765677053-3e83770b25d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RWR1Y2F0aW9uYWwlMjBUdXRvcmlhbHxlbnwwfHwwfHx8MA%3D%3D",
      views: "450K",
      category: "Education"
    }
  ];

  // Calculate how many slides (pages) we need
  const itemsPerPage = 3;
  const totalSlides = Math.ceil(videos.length / itemsPerPage);

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  // Get current videos to display
  const startIndex = currentIndex * itemsPerPage;
  const currentVideos = videos.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-12 lg:py-16 bg-white font-montserrat relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-16 h-16 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-red-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-red-50 rounded-full opacity-25 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            OUR <span className="text-red-600">WORKS</span>
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            Showcase of successful video campaigns we've promoted across different niches and industries
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-20 bg-white border-2 border-red-400 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Video Grid */}
          <div className="overflow-hidden">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-500">
              {currentVideos.map((video, index) => (
                <div key={startIndex + index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden animate-fade-in">
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={`Thumbnail of ${video.title}`}
                      className="w-full h-44 lg:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-red-600 text-white rounded-full p-3 lg:p-4 group-hover:scale-110 transition-transform duration-300">
                        <Play className="h-6 w-6 lg:h-8 lg:w-8" />
                      </div>
                    </div>

                    {/* Views Badge */}
                    <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {video.views} views
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {video.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">Promoted Campaign</div>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-red-600 transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-20 bg-white border-2 border-red-400 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-red-600 w-8' : 'bg-gray-300 w-2.5'
              } hover:bg-red-500 cursor-pointer`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default OurWorks;
