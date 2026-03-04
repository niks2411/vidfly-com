import Image from "next/image";

const PricingInfo = () => {
  const comparisons = [
    { vidflyy: "Real ads", others: "Bot Traffic", isBlue: true },
    { vidflyy: "Targeted audience", others: "Random views", isWhite: true },
    { vidflyy: "Long-term growth", others: "Dead engagement", isBlue: true },
    { vidflyy: "Transparent tracking", others: "No clarity", isWhite: true },
  ];

  return (
    <section className="py-24 bg-white font-founders">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[36px] md:text-[48px] font-bold text-gray-900 leading-tight tracking-tight">
            Why <span className="relative inline-block px-1">
              Vidflyy
              <svg
                className="absolute -top-[5%] -left-[10%] w-[120%] h-[120%] text-red-500 overflow-visible pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M10,50 Q10,10 50,10 Q90,10 90,50 Q90,90 50,90 Q10,90 10,50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="animate-draw-circle"
                  style={{
                    strokeDasharray: '400',
                    strokeDashoffset: '400',
                    animation: 'draw-circle 1s ease-out forwards'
                  }}
                />
              </svg>
            </span> Beats
            <br />
            Fake Promotion Services
          </h2>
        </div>

        {/* Comparison Table Header */}
        <div className="flex items-center justify-between mb-10 px-4">
          <div className="w-[42%] bg-white border-2 border-blue-500 rounded-[4px] p-6 flex items-center justify-center shadow-sm">
            <div className="flex items-center gap-2">
              <Image
                src="/lovable-uploads/0b27d722-c6a7-47e3-ae7d-aeb8461db170.png"
                alt="Vidflyy"
                width={140}
                height={40}
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
          </div>

          <div className="text-xl font-bold text-gray-900">vs</div>

          <div className="w-[42%] bg-white border border-gray-200 rounded-[4px] p-6 flex items-center justify-center shadow-sm">
            <span className="text-2xl md:text-3xl font-black text-gray-900 relative">
              Others
              <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-gray-900 -rotate-2"></div>
            </span>
          </div>
        </div>

        {/* Rows */}
        <div className="border border-gray-100 rounded-md overflow-hidden shadow-sm font-founders">
          {comparisons.map((row, index) => (
            <div
              key={index}
              className={`flex justify-between items-center px-8 py-5 border-b last:border-b-0 border-gray-100 ${row.isBlue ? 'bg-[#F4F7FB]' : 'bg-white'}`}
            >
              <span className="text-[17px] font-bold text-blue-600 tracking-tight">
                {row.vidflyy}
              </span>
              <span className="text-[17px] font-bold text-gray-500 tracking-tight">
                {row.others}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes draw-circle {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default PricingInfo;
