'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import SakuraPetals from '@/Components/SakuraPetals';
import Image from 'next/image'; 
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const storyRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Set initial states immediately
        gsap.set(titleRef.current?.children || [], { y: 30, opacity: 0 });
        gsap.set(storyRef.current?.children || [], { y: 20, opacity: 0 });
        gsap.set(valuesRef.current?.children || [], { y: 50, opacity: 0, scale: 0.8 });
        gsap.set(ctaRef.current, { scale: 0, opacity: 0 });

        const ctx = gsap.context(() => {
            // Title animation
            gsap.to(titleRef.current?.children || [], {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
            });

            // Story animation
            gsap.to(storyRef.current?.children || [], {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.3,
                delay: 0.5,
                ease: 'power2.out',
            });

            // Values animation with ScrollTrigger
            gsap.to(valuesRef.current?.children || [], {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.15,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: valuesRef.current,
                    start: 'top 80%',
                },
            });

            // CTA animation with ScrollTrigger
            gsap.to(ctaRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: 'top 90%',
                },
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

  return (
    <>
    <Navbar />
    <SakuraPetals />
    <main ref={pageRef} className="min-h-screen bg-linear-to-b from-pink-50 to-white pt-20 relative z-10">
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Title Section */}
            <div ref={titleRef} className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 gsap-fade">
                    私たちについて
                </h1>
                <p className="text-xl text-gray-600 gsap-fade">About Us</p>
            </div>

            {/* Story Section */}
            <div ref={storyRef} className="text-center mb-8">
                <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed gsap-fade">
                    Nothing fancy here, We make bento.
                </p>
                <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed gsap-fade">You eat happy.</p>
                <p className="text-xl md:text-2xl font-medium leading-relaxed gsap-fade">
                    <span className="text-yellow-500">That&apos;s it.</span>
                </p>
            </div>

            {/* Restaurant Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                <div className="relative h-48 rounded-xl overflow-hidden shadow-lg col-span-2 md:col-span-2 md:row-span-2 md:h-full">
                    <Image
                        src="/Image/hero1.jpg"
                        alt="Our restaurant"
                        fill
                        sizes="(max-width: 768px) 100vw, 66vw"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="relative h-48 md:h-40 rounded-xl overflow-hidden shadow-lg">
                    <Image
                        src="/Image/classicbento.jpeg"
                        alt="Our bento"
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="relative h-48 md:h-40 rounded-xl overflow-hidden shadow-lg">
                    <Image
                        src="/Image/salmonbento.jpg"
                        alt="Fresh ingredients"
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </div>

            {/* Values Section */}
            <div ref={valuesRef} className="grid grid-cols-3 gap-4 text-center mb-8">
                <div className="p-3 gsap-fade">
                    <span className="text-3xl md:text-4xl mb-1 block">🥬</span>
                    <p className="text-gray-900 font-bold text-sm md:text-base">Fresh</p>
                </div>
                <div className="p-3 gsap-fade">
                    <span className="text-3xl md:text-4xl mb-1 block">⚡</span>
                    <p className="text-gray-900 font-bold text-sm md:text-base">Fast</p>
                </div>
                <div className="p-3 gsap-fade">
                    <span className="text-3xl md:text-4xl mb-1 block">😋</span>
                    <p className="text-gray-900 font-bold text-sm md:text-base">Happy Vibes</p>
                </div>
            </div>

            {/* CTA Button */}
            <div ref={ctaRef} className="text-center">
                <Link href="/menu"
                    className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-4 rounded-full transition-all hover:scale-105">
                    See Our Menu
                </Link>
            </div>
        </div>
    </main>
    <Footer />
    </>
  );
}