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
  const galleryRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(titleRef.current?.children || [], { y: 30, opacity: 0 });
    gsap.set(storyRef.current?.children || [], { y: 20, opacity: 0 });
    gsap.set(galleryRef.current?.children || [], { y: 40, opacity: 0, scale: 0.95 });
    gsap.set(valuesRef.current?.children || [], { y: 50, opacity: 0, scale: 0.8 });
    gsap.set(ctaRef.current, { scale: 0, opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(titleRef.current?.children || [], {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      gsap.to(storyRef.current?.children || [], {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.3,
        delay: 0.5,
        ease: 'power2.out',
      });

      gsap.to(galleryRef.current?.children || [], {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        delay: 0.8,
        ease: 'power2.out',
      });

      gsap.to(valuesRef.current?.children || [], {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top 85%',
        },
      });

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

      <main ref={pageRef} className="min-h-screen bg-gradient-to-b from-pink-50 to-white pt-20 relative z-10">
        <div className="max-w-5xl mx-auto px-4 py-12">

          {/* Title Section */}
          <div ref={titleRef} className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-yellow-500 mb-3">About Us</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">私たちについて</h1>
          </div>

          {/* Story Section */}
          <div ref={storyRef} className="text-center mb-16">
            <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed">
              Nothing fancy here. We make bento.
            </p>
            <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed">
              You eat happy.
            </p>
            <p className="text-xl md:text-2xl font-medium leading-relaxed">
              <span className="text-yellow-500">That&apos;s it.</span> 🍱
            </p>
          </div>

          {/* Restaurant Gallery */}
          <div ref={galleryRef} className="grid grid-cols-2 gap-4 mb-16">
            <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/Image/hero1.jpg"
                alt="Our restaurant"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative h-32 md:h-40 lg:h-48 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/Image/classicbento.jpeg"
                  alt="Our bento"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-32 md:h-40 lg:h-48 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/Image/salmonbento.jpg"
                  alt="Fresh ingredients"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-gray-50 rounded-3xl px-6 py-10 mb-16">
            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-8">
              What We&apos;re About
            </h2>
            <div ref={valuesRef} className="grid grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <span className="text-4xl md:text-5xl mb-3 block">🥬</span>
                <p className="text-gray-900 font-bold text-base md:text-lg">Fresh</p>
                <p className="text-gray-500 text-sm mt-1">Daily ingredients</p>
              </div>
              <div className="p-4">
                <span className="text-4xl md:text-5xl mb-3 block">⚡</span>
                <p className="text-gray-900 font-bold text-base md:text-lg">Fast</p>
                <p className="text-gray-500 text-sm mt-1">Quick delivery</p>
              </div>
              <div className="p-4">
                <span className="text-4xl md:text-5xl mb-3 block">😋</span>
                <p className="text-gray-900 font-bold text-base md:text-lg">Happy Vibes</p>
                <p className="text-gray-500 text-sm mt-1">Always delicious</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div ref={ctaRef} className="text-center pb-8">
            <p className="text-gray-600 mb-4">Hungry yet?</p>
            <Link
              href="/menu"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-10 py-4 rounded-full transition-all hover:scale-105 hover:shadow-lg"
            >
              See Our Menu 🍱
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}