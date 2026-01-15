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
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(headerRef.current?.children || [], { y: 30, opacity: 0 });
    gsap.set(cardsRef.current?.children || [], { y: 40, opacity: 0, scale: 0.95 });
    gsap.set(valuesRef.current, { y: 30, opacity: 0 });
    gsap.set(ctaRef.current, { scale: 0, opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(headerRef.current?.children || [], {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });

      gsap.to(cardsRef.current?.children || [], {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.4,
        ease: 'back.out(1.4)',
      });

      gsap.to(valuesRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
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

      <main ref={pageRef} className="min-h-screen bg-linear-to-b bg-white pt-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">

          {/* Header */}
          <div ref={headerRef} className="text-center mb-8">
            <span className="text-4xl mb-2 block">👋</span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              Hey, we&apos;re Bento Bop!
            </h1>
            <p className="text-gray-600 text-base">Nice to meet you</p>
          </div>

          {/* Info Cards */}
          <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            
            {/* Card 1 - Location */}
            <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow text-center">
              <span className="text-3xl mb-2 block">📍</span>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Based in</p>
              <p className="font-bold text-gray-900">Bangkok, Thailand</p>
            </div>

            {/* Card 2 - Since */}
            <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow text-center">
              <span className="text-3xl mb-2 block">🗓️</span>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Since</p>
              <p className="font-bold text-gray-900">2020</p>
            </div>

            {/* Card 3 - Specialty */}
            <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow text-center">
              <span className="text-3xl mb-2 block">🍱</span>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">We make</p>
              <p className="font-bold text-gray-900">Bento</p>
            </div>

            {/* Card 4 - Mission */}
            <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow text-center">
              <span className="text-3xl mb-2 block">💛</span>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">You get</p>
              <p className="font-bold text-gray-900">Happy</p>
            </div>

          </div>

          {/* Image Section */}
          <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-lg mb-12">
            <Image
              src="/Image/hero1.jpg"
              alt="Our restaurant"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-sm opacity-80">Our home</p>
              <p className="text-xl font-bold">Where the magic happens ✨</p>
            </div>
          </div>

          {/* Values Card */}
          <div ref={valuesRef} className="relative bg-amber-50 rounded-3xl p-8 mb-12">
            <div className="absolute -top-4 left-8 bg-yellow-400 rounded-full px-3 py-1 shadow-sm">
              <span className="text-lg">✉️</span>
            </div>

            <h2 className="text-lg font-bold text-gray-900 mb-4 pt-2">A note from us</h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Back in 2020, we started Bento Bop with a simple dream — to bring
                authentic Japanese bento to people who love good food but don&apos;t
                have time to make it.
              </p>
              <p>
                What began as a small kitchen experiment quickly became our passion.
                Every box we pack is made with fresh ingredients, a little creativity,
                and a lot of love.
              </p>
              <p>
                We&apos;re not a big company. We&apos;re just a small team who believes
                that good food should be simple, honest, and make you smile.
              </p>
              <p className="text-gray-800 font-medium">
                Thank you for being part of our journey. 🍱
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-gray-900 font-semibold">— With love, The Bento Bop Team 💛</p>
            </div>
          </div>

          
          {/* CTA */}
          <div ref={ctaRef} className="text-center pb-8">
            <Link
              href="/menu"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-semibold px-10 py-4 rounded-full transition-all hover:scale-105 hover:shadow-lg"
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
