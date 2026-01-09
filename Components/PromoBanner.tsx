'use client';

import { useState, useEffect } from 'react';

const promos = [
    { id: 1, text: "Use code ILOVEBOB for 20% off your first order!", icon: "🎉" },
    { id: 2, text: "Free delivery on orders over $50!", icon: "🚚" },
    { id: 3, text: "Get a free drink with every Bento Box!", icon: "🥤" },
];

const STORAGE_KEY = "promoBannerDismissed";

export default function PromoBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem(STORAGE_KEY);
        if (!dismissed) {
            setIsVisible(true)
        }
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentPromoIndex((prev) => (prev + 1) % promos.length);
                setIsAnimating(false);
            }, 300);
        }, 5000);

        return () => clearInterval(interval);
        }, [isVisible]);
        const handleDismiss = () => {
            setIsVisible(false);
            localStorage.setItem(STORAGE_KEY, "true");  
        };
        if (!isVisible) return null;

        const currentPromo = promos[currentPromoIndex];

        return (
            <div className="bg-linear-to-r from-yellow-400 via-amber-400 to-yellow-500 text-gray-900 px-4 py-3 relative ">
                <div className="max-w-7xl mx-auto flex items-center justify-center">
                    <p className={`text-sm md:text-base font-semibold text-center transition-all duration-300 ${
                        isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                        <span className="mr-2">{currentPromo.icon}</span>
                        {currentPromo.text}
                    </p>
                    <button
                        onClick={handleDismiss}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-black/10 rounded-full transition-colors"
                        aria-label="Dismiss banner">     
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {promos.map((_, index) => (
                        <div
                        key={index}
                        onClick={() => setCurrentPromoIndex(index)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            index === currentPromoIndex ? 'bg-gray-900 w-3' 
                                : 'bg-gray-900/40 hover:bg-gray-900/60'
                        }`}/>
                    ))}

                </div>
            </div>
        )
        }