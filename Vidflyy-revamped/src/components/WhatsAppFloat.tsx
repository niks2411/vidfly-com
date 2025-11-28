
import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/917355518761', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
};

export default WhatsAppFloat;
