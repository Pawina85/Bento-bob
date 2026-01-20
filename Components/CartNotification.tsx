'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart, CartItem } from '@/context/CartContext';

export default function CartNotification() {
    const { items, totalItems } = useCart();
    const [isVisible, setIsVisible] = useState(false);
    const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
    const [prevItemsLength, setPrevItemsLength] = useState(0);

    useEffect(() => {

        if (items.length > 0 && items.length > prevItemsLength) {
            const latestItem = items[items.length - 1];

            if (items.length > prevItemsLength || 
                (lastAddedItem && latestItem.id === lastAddedItem.id && latestItem.quantity > (lastAddedItem.quantity || 0))) {
                setLastAddedItem(latestItem);
                setIsVisible(true);

                const timer = setTimeout(() => {
                    setIsVisible(false);
                }, 3000);

                return () => clearTimeout(timer);
            }
        }

        setPrevItemsLength(items.length);
    }, [items, prevItemsLength, lastAddedItem]);

    if (!isVisible || !lastAddedItem) return null;

    return (
        <div className="fixed top-24 right-4 z-50 animate-slide-in">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 w-80">

                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-gray-900">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium">Added to Cart</span>
                    </div>
                    <button 
                    onClick={() => setIsVisible(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-5 h-5"fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                   
                <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <Image 
                            src={lastAddedItem.image} 
                            alt={lastAddedItem.name} 
                            fill
                            sizes="64px"
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{lastAddedItem.name}</h3>
                        <p className="text-gray-500 text-sm">{lastAddedItem.quantity}</p>
                </div>
                </div>
                <div className="space-y-2">
                    <Link 
                        href="/cart" 
                        className="block text-center py-3 border-2 border-gray-900 text-gray-900 font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
                    >
                        View Cart ({totalItems})
                    </Link>
                    <button
                    onClick={() => setIsVisible(false)}
                    className="block w-full text-center py-2 text-gray-600 hover:text-gray-900 transition-colors underline"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
            ) 
}