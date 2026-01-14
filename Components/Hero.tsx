'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';


export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const imagesRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    const images = [
        { src: '/Image/hero1.jpg', alt: 'the restaurant' },
        { src: '/Image/bento.png', alt: 'Bento Box' },
        { src: '/Image/soup.png', alt: 'our menu' },
        
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            
        const tl = gsap.timeline({ defaults: { ease: 'power3.out'} });

        tl.fromTo(
            titleRef.current,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 }
        );
        tl.fromTo(
            subtitleRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            '-=0.5' );

        tl.fromTo(
            imagesRef.current?.children || [],
            { y: 100, opacity: 0, scale: 0.8 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
            },
            '-=0.3'
        );
        tl.fromTo(
            buttonRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
            '-=0.2'
        );

        }, heroRef);

        return () => ctx.revert();
    }, []);
  return (
    <section className="px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto text-center">
                    <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-2">いらっしゃいませ </h1>
                    <p ref={subtitleRef} className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">welcome to <span className="text-yellow-500 font-semibold">Bento Bop</span></p>
          <div ref={imagesRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-8 mb-12">
            {images.map((image, index) => (
                <div key={index} className="relative h-48 md:h-64 lg:h-72 overflow-hidden rounded-2xl shadow-lg group">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        priority={index === 0}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"/>
                    </div>
            ))}
                    
            </div>          
                <a href="#menu" ref={buttonRef} className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-lg px-8 py-3 rounded-full transition-all hover:scale-105 hover:shadow-lg">Explore Our Menu</a>
            
        </div>
    </section>
    );
    }