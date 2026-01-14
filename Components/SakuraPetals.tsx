'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SakuraPetals() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const petals: HTMLDivElement[] = [];
    const petalCount = 12;

    // Create petals
    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement('div');
      petal.innerText = '🌸';
      petal.className = 'absolute text-xl md:text-2xl opacity-70';
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.top = '-30px';
      containerRef.current.appendChild(petal);
      petals.push(petal);

      // Animate each petal
      gsap.to(petal, {
        y: window.innerHeight + 100,
        x: `+=${Math.random() * 150 - 75}`,
        rotation: Math.random() * 360,
        duration: 8 + Math.random() * 6,
        repeat: -1,
        delay: Math.random() * 5,
        ease: 'none',
        onRepeat: () => {
          gsap.set(petal, {
            x: 0,
            y: -30,
            left: `${Math.random() * 100}%`,
          });
        },
      });

      // Sway animation
      gsap.to(petal, {
        x: `+=${Math.random() * 40}`,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Fade out petals when scrolling past hero section
    gsap.to(containerRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: '600px top',
        scrub: true,
      },
    });

    return () => {
      petals.forEach((petal) => petal.remove());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    />
  );
}