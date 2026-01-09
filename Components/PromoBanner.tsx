'use client';

import { ST } from 'next/dist/shared/lib/utils';
import { useState, useEffect, use } from 'react';

const promo = [
    { id: 1, text: "Use code ILOVEBOB for 20% off your first order!" },
    { id: 2, text: "Free delivery on orders over $50!" },
    { id: 3, text: "Get a free drink with every Bento Box!" },
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
    } []);

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
            <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-white px-4 py-2 relative animate-slide-down">
                <div className="max-w-7xl mx-auto flex items-center justify-center">
                    <p className={`text-sm md:text-base font-meduim text-center pr-8 transition-all duration-300 ${
                        isAnimatting ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                        <span></span>
                    </p>
                </div>
            </div>
        )
        }