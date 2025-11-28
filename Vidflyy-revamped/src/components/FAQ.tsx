
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "How does VIDFLYY promote my videos?",
      answer: "We use targeted advertising campaigns across various platforms to promote your videos to audiences who are genuinely interested in your content. Our promotion methods are 100% compliant with YouTube's terms of service."
    },
    {
      question: "How long does it take to see results?",
      answer: "You'll typically start seeing initial results within 24-48 hours of campaign launch. However, for optimal results and sustained growth, we recommend running campaigns for the full duration specified in your chosen plan."
    },
    {
      question: "Are the views and subscribers real?",
      answer: "Yes, absolutely! All views, subscribers, and engagement come from real, active YouTube users. We never use bots or fake accounts, ensuring your channel maintains its integrity and complies with YouTube guidelines."
    },
    {
      question: "What if I'm not satisfied with the results?",
      answer: "We offer a money-back guarantee! If you're not satisfied with the results within the specified timeframe, we'll work with you to improve the campaign or provide a refund according to our terms and conditions."
    },
    {
      question: "Do I need to provide my YouTube password?",
      answer: "No, we never ask for your YouTube password or any sensitive account information. We only need your video URL to start promoting it. Your account security and privacy are our top priorities."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 font-montserrat">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-red-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Got questions? We've got answers to help you get started.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-red-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-red-600 flex-shrink-0" />
                )}
              </button>
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
