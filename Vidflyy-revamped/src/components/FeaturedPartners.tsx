const FeaturedPartners = () => {
  return (
    <section className="py-12 lg:py-16 bg-white font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            YOUR ACCOUNT AND PAYMENTS ARE <span className="text-red-600">SECURED BY</span>
          </h2>
        </div>
        
        <div className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/291718af-1bda-4e86-bbb9-f8f8c9be18f8.png" 
            alt="Payment Security Partners" 
            className="max-w-full h-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedPartners;
