
import { ShieldCheck, TrendingUp, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

const OurAdvantages = () => {
    const advantages = [
        {
            icon: ShieldCheck,
            title: "Reliability",
            description: "Vidflyy uses Google Ads to promote YouTube content. We work with recognized payment systems. You can pause or cancel your campaign at any time.",
            delay: 0.2
        },
        {
            icon: TrendingUp,
            title: "Efficiency",
            description: "Your promotion has a cumulative effect, and you can always contact us for assistance.",
            delay: 0.4
        },
        {
            icon: ThumbsUp,
            title: "Convenience",
            description: "We have made things as simple as possible. Keep creating your awesome content and don't waste your time with setting up your promotion. We will do it for you!",
            delay: 0.6
        }
    ];

    return (
        <section className="py-16 lg:py-24 bg-white font-montserrat overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Our advantages
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-10 lg:gap-14 text-center">
                    {advantages.map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: item.delay }}
                        >
                            <div className="bg-red-50 p-6 rounded-full mb-6 group hover:bg-red-100 transition-colors duration-300">
                                <item.icon className="h-10 w-10 text-red-600 group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed max-w-sm">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurAdvantages;
