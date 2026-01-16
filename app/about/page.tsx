'use client';

import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-stone-100 pt-4">
                <div className="max-w-2xl mx-auto px-4 py-4 md:py-12">
                    {/* Header */}
                    <h1 className="text-2xl md:text-3xl py-6 font-bold text-gray-900">About Us</h1>

                    {/* About Text */}
                    <p className="text-gray-900 text-left mb-8">
                        Back in 2020, Bento Bop started with a simple idea — fresh, authentic Japanese bento made with love. What began as a small kitchen project has grown into a place where good food meets happy people. We're not a big chain. We're just a small team who believes great food should be simple, honest, and make your day better.
                    </p>

                    {/* Opening Hours */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4 text-gray-900">🕐 Opening Hours</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center border-b pb-2 border-gray-300">
                                <span className="text-gray-600">Monday - Friday</span>
                                <span className="text-gray-900 font-medium">10:00 AM - 9:00 PM</span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2 border-gray-300">
                                <span className="text-gray-600">Saturday - Sunday</span>
                                <span className="text-gray-900 font-medium">11:00 AM - 10:00 PM</span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2 border-gray-300">
                                <span className="text-gray-600">Public Holidays</span>
                                <span className="text-gray-900 font-medium">11:00 AM - 8:00 PM</span>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Hours */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            🚚 Delivery Hours
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center border-b pb-2 border-gray-100">
                                <span className="text-gray-600">Lunch Delivery</span>
                                <span className="text-gray-900 font-medium">11:00 AM - 2:00 PM</span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2 border-gray-100">
                                <span className="text-gray-600">Dinner Delivery</span>
                                <span className="text-gray-900 font-medium">5:00 PM - 9:00 PM</span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2 border-gray-100">
                                <span className="text-gray-600">Weekend All Day Delivery</span>
                                <span className="text-gray-900 font-medium">11:00 AM - 9:00 PM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}