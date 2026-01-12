'use client';

import Image from 'next/image';
import Button from './Button';

export default function Hero() {
  return (
    <section className="relative bg-linear-to-br from-white-50 to-light-100 py-16 md:py-24 overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="gap-12 items-center max-w-7xl mx-auto">
                <div className="flex items-center">
                    <h1 className="text-lg sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">Wholesome Food. <br />Honest Flavors. </h1>
                    <div className="relative w-full h-70 sm:h-87.5 lg:h-150 rounded-3xl overflow-hidden shadow-2xl">
                        <Image src={'/Image/bento.png'} alt={'Bento Box'} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw" 
                        className="object-cover object-center"/>
                    </div>
                </div>
            </div>
            
        </div>
    </section>
    );
    }