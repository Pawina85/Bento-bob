'use client';


import Button from './Button';

export default function Hero() {
  return (
    <section className="relative bg-linear-to-br from-yellow-50 to-light-100 py-16 md:py-24 overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                <div className="text-center lg:text-left order-2 lg:order-1">
                    <h1 className="text-4xl sm:text-5xl ">Hey Handsome </h1>
                </div>
            </div>
            
        </div>
    </section>
    );
    }