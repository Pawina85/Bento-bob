'use client';

import { useState, useEffect, use } from 'react';

const promo = [
    { id: 1, text: "Use code ILOVEBOB for 20% off your first order!", icon: "🎉" },
    { id: 2, text: "Free delivery on orders over $50!", icon: "🚚" },
    { id: 3, text: "Get a free drink with every Bento Box!", icon: "🥤" },
];

const STORAGE_KEY = "promoBannerDismissed";

export default function PromoBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
    const [isAnimatting, setIsAnimating] = useState(false);

    useEffect(() => {
        const dissmissed = localStorage.getItem(STORAGE_KEY);
        if (!dissmissed) {
            setIsVisible(true)
        }
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentPromoIndex((prev) => (prev + 1) % promo.length);
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

        const currentPromo = promo[currentPromoIndex];

        return (
            <div className="bg-linear-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black px-4 py-2 relative animate-slide-down">
                <div className="max-w-7xl mx-auto flex items-center justify-center">
                    <p className={`text-sm md:text-base font-meduim text-center pr-8 transition-all duration-300 ${
                        isAnimatting ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                        <span className="mr-2">{currentPromo.icon}</span>
                        {currentPromo.text}
                    </p>
                    <button
                        onClick={handleDismiss}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hovetr:bg-white/20 rounded-full transition-colors"
                        aria-label="Dismiss promotional banner">     
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-1">
                    {promo.map((_, index) => (
                        <div
                        key={index}
                        className={`w-1 h-1 rounded-full transition-all ${
                            index === currentPromoIndex ? 'bg-white' : 'bg-white/40'
                        }`}/>
                    ))}

                </div>
            </div>
        )
        }