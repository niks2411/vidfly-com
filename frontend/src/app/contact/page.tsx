"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { motion } from "framer-motion";

export default function ContactPage() {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        channel: '',
        message: ''
    });

    const handleWhatsAppClick = () => {
        const phoneNumber = '917355518761';
        const whatsappMessage = `*New Contact Form Submission*

*Name:* ${formData.name || 'Not provided'}
*Email:* ${formData.email || 'Not provided'}
*Channel:* ${formData.channel || 'Not provided'}
*Message:* ${formData.message || 'Not provided'}

*Submitted from:* Contact Page`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappUrl, '_blank');

        toast({
            title: "Message Sent!",
            description: "Redirecting to WhatsApp...",
        });

        setFormData({ name: '', email: '', channel: '', message: '' });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleWhatsAppClick();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-white font-founders">
            {/* Contact Header with Animation */}
            <section className="py-20 bg-gradient-to-br from-red-50 to-gray-50 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute top-1/2 right-20 w-16 h-16 bg-red-200 rounded-full opacity-30 animate-bounce"></div>
                    <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-red-50 rounded-full opacity-25 animate-pulse"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left sm:text-center relative z-10">
                    <h1 className="section-heading text-left sm:text-center !mb-6">
                        Contact <span className="text-red-600">Us</span>
                    </h1>
                    <p className="section-desc !text-left sm:!text-center !mx-0 sm:!mx-auto max-w-3xl">
                        Ready to grow your YouTube channel? Get in touch with our team and let's discuss your promotion strategy.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="animate-fade-in">
                            <h2 className="section-heading !text-left !mb-8">Get in Touch</h2>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-300">
                                    <div className="bg-red-600 p-3 rounded-full">
                                        <MessageCircle className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                                        <p className="text-gray-600">+91 7355518761</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                                    <div className="bg-gray-600 p-3 rounded-full">
                                        <Mail className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Email</h3>
                                        <p className="text-gray-600">info@videopromotion.digital</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                                    <div className="bg-gray-600 p-3 rounded-full">
                                        <Clock className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Working Hours</h3>
                                        <p className="text-gray-600">24/7 Customer Support</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 text-white">
                                <h3 className="text-xl font-bold mb-4">Ready to Start Growing?</h3>
                                <p className="text-red-100 mb-6">
                                    Contact us now and get a free consultation on how to grow your YouTube channel effectively.
                                </p>
                                <Button
                                    onClick={handleWhatsAppClick}
                                    className="bg-white text-red-600 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    Start WhatsApp Chat
                                </Button>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="animate-fade-in-delay">
                            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300"
                                                placeholder="Your name"
                                            />
                                        </motion.div>
                                    </div>

                                    <div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            viewport={{ once: true }}
                                        >
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300"
                                                placeholder="your@email.com"
                                            />
                                        </motion.div>
                                    </div>

                                    <div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                            viewport={{ once: true }}
                                        >
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                YouTube Channel URL
                                            </label>
                                            <input
                                                type="url"
                                                name="channel"
                                                value={formData.channel}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300"
                                                placeholder="https://youtube.com/channel/..."
                                            />
                                        </motion.div>
                                    </div>

                                    <div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.4 }}
                                            viewport={{ once: true }}
                                        >
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Message
                                            </label>
                                            <textarea
                                                rows={4}
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300"
                                                placeholder="Tell us about your goals and how we can help..."
                                            ></textarea>
                                        </motion.div>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                        viewport={{ once: true }}
                                    >
                                        <Button
                                            type="submit"
                                            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                                        >
                                            Send Message via WhatsApp
                                        </Button>
                                    </motion.div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
