import { useState } from "react";
import { Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const VideoPromotionCalculator = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [views, setViews] = useState(1000);
  const [price, setPrice] = useState(200);

  // Calculate price based on views (₹0.21 per view)
  const calculatePrice = (viewCount: number) => {
    const basePrice = viewCount * 0.21;
    setPrice(basePrice);
  };

  const handleViewsChange = (newViews: number) => {
    const sanitizedViews = Math.max(1000, Math.min(100000, newViews));
    setViews(sanitizedViews);
    calculatePrice(sanitizedViews);
  };

  // Handle manual input in views field
  const handleViewsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, ''); // Remove commas

    // Allow empty input for user to clear and type
    if (value === '') {
      setViews(1000);
      calculatePrice(1000);
      return;
    }

    const numValue = parseInt(value);

    // Only update if it's a valid number
    if (!isNaN(numValue)) {
      handleViewsChange(numValue);
    }
  };

  // Handle blur event to enforce min/max limits
  const handleViewsBlur = () => {
    if (views < 1000) {
      setViews(1000);
      calculatePrice(1000);
    } else if (views > 100000) {
      setViews(100000);
      calculatePrice(100000);
    }
  };

  const getDiscount = () => {
    if (views >= 50000) return "10% off";
    if (views >= 10000) return "5% off";
    return null;
  };

  const presetOptions = [
    { label: "1K", value: 1000 },
    { label: "10K", value: 10000 },
    { label: "20K", value: 20000 },
    { label: "30K", value: 30000 },
    { label: "40K", value: 40000 },
    { label: "50K", value: 50000 },
    { label: "60K", value: 60000 },
    { label: "70K", value: 70000 },
    { label: "80K", value: 80000 },
    { label: "90K", value: 90000 },
    { label: "100K", value: 100000 },
  ];

  const handleStartPromotion = () => {
    if (videoUrl.trim()) {
      window.open(`https://wa.me/917355518761?text=I want to promote: ${encodeURIComponent(videoUrl)} - ${views.toLocaleString()} views - ₹${price.toLocaleString('en-IN')}`, '_blank');
    } else {
      window.open('https://wa.me/917355518761', '_blank');
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-red-50 to-white relative overflow-hidden font-montserrat">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            We will show your video to your target <span className="text-red-600">audience directly on YouTube!</span>
          </h2>

        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-10 border-4 border-red-400 relative overflow-hidden">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-400 via-red-500 to-red-400 opacity-10 pointer-events-none"></div>

          <div className="relative z-10">
            {/* URL Input */}
            <div className="mb-8">
              <div className="bg-white rounded-full shadow-xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 border-2 border-red-200 hover:border-red-300 transition-all duration-300">
                <div className="flex items-center gap-3 flex-1 px-3">
                  <Youtube className="h-6 w-6 text-red-600 flex-shrink-0" />
                  <Input
                    type="text"
                    placeholder="Enter YouTube video URL"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base bg-transparent placeholder:text-gray-400 p-0"
                  />
                </div>
                <Button
                  onClick={handleStartPromotion}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 rounded-full text-base font-bold transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Start promotion
                </Button>
              </div>
            </div>

            {/* Views and Price Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              {/* Views Input (Now Editable) */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-lg">Views</label>
                <Input
                  type="text"
                  value={views.toLocaleString('en-IN')}
                  onChange={handleViewsInputChange}
                  onBlur={handleViewsBlur}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl text-lg font-medium bg-white text-gray-900 focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all"
                  placeholder="Enter views (1,000 - 1,00,000)"
                />
                <p className="text-sm text-gray-500 mt-2">Type directly or use slider below (Min: 1,000 | Max: 1,00,000)</p>
              </div>

              {/* Price Display */}
              <div className="flex flex-col justify-center">
                <div className="text-right">
                  <div className="text-gray-600 text-base mb-1">Price</div>
                  <div className="text-4xl font-bold text-gray-900">
                    ₹{price.toLocaleString('en-IN')}
                  </div>
                  <div className="text-red-600 font-semibold mt-2 cursor-pointer hover:underline">
                    Get a discount
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Info */}
            <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-100">
              <p className="text-sm text-red-800 font-semibold text-center">
                Pricing: ₹0.21 per view
              </p>
            </div>

            {/* Slider Section */}
            <div className="relative">
              {/* Discount Labels */}
              <div className="flex justify-between mb-3 px-2">
                <span className={`text-sm font-semibold ${views >= 10000 ? 'text-red-600' : 'text-gray-400'}`}>
                  5% off
                </span>
                <span className={`text-sm font-semibold ${views >= 50000 ? 'text-red-600' : 'text-gray-400'}`}>
                  10% off
                </span>
              </div>

              {/* Range Slider */}
              <div className="relative mb-4">
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={views}
                  onChange={(e) => handleViewsChange(parseInt(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer slider"
                />
              </div>

              {/* Scale Labels (clickable presets) */}
              <div className="grid grid-cols-11 text-xs font-medium">
                {presetOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleViewsChange(opt.value)}
                    className={`text-center cursor-pointer focus:outline-none ${views === opt.value
                        ? "text-red-600 font-semibold"
                        : "text-gray-500 hover:text-red-500"
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Discount Badge */}
            {getDiscount() && (
              <div className="mt-6 text-center">
                <div className="inline-block bg-gradient-to-r from-red-100 to-red-200 text-red-700 px-6 py-2 rounded-full text-sm font-bold">
                  {getDiscount()} applied!
                </div>
              </div>
            )}
          </div>
        </div>

        <style>{`
          .slider {
            -webkit-appearance: none;
            appearance: none;
            background: linear-gradient(to right, 
              #ef4444 ${((views - 1000) / (100000 - 1000)) * 100}%, 
              #fee2e2 ${((views - 1000) / (100000 - 1000)) * 100}%);
            outline: none;
          }

          .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 28px;
            height: 28px;
            background: linear-gradient(135deg, #dc2626, #ef4444);
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
            transition: all 0.3s ease;
          }

          .slider::-webkit-slider-thumb:hover {
            transform: scale(1.15);
            box-shadow: 0 6px 16px rgba(220, 38, 38, 0.6);
          }

          .slider::-moz-range-thumb {
            width: 28px;
            height: 28px;
            background: linear-gradient(135deg, #dc2626, #ef4444);
            border-radius: 50%;
            cursor: pointer;
            border: none;
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
            transition: all 0.3s ease;
          }

          .slider::-moz-range-thumb:hover {
            transform: scale(1.15);
            box-shadow: 0 6px 16px rgba(220, 38, 38, 0.6);
          }

          .slider::-moz-range-track {
            background: transparent;
          }
        `}</style>
      </div>
    </section>
  );
};

export default VideoPromotionCalculator;
