'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SakuraPetals() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const petals: HTMLDivElement[] = [];
    const petalCount = 25;

    // Create petals
    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement('div');
      petal.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" class="text-pink-300">
          <path fill="currentColor" d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.5.7 2.8 1.7 3.7-1.4.5-2.7 1.4-3.7 2.5C4.5 14 4 15.7 4 17.5c0 .3 0 .5.1.8.1.5.5.9 1 1 .5.1 1-.1 1.3-.5.2-.3.3-.6.3-.9 0-1.2.4-2.3 1.1-3.2.7-.9 1.7-1.5 2.8-1.7.3 0 .5-.2.7-.4.2-.3.2-.6.1-.9-.4-.8-.6-1.6-.6-2.5 0-2 1.5-3.5 3.5-3.5S18 8 18 10c0 .9-.2 1.7-.6 2.5-.1.3-.1.6.1.9.2.2.4.4.7.4 1.1.2 2.1.8 2.8 1.7.7.9 1.1 2 1.1 3.2 0 .3.1.6.3.9.3.4.8.6 1.3.5.5-.1.9-.5 1-1 .1-.3.1-.5.1-.8 0-1.8-.5-3.5-1.5-4.8-1-1.1-2.3-2-3.7-2.5 1-.9 1.7-2.2 1.7-3.7C21.5 4 19.5 2 17 2h-5z"/>
        </svg>
      `;
      petal.className = 'absolute';
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.top = '-20px';
      containerRef.current.appendChild(petal);
      petals.push(petal);

      // Animate each petal
      gsap.to(petal, {
        y: window.innerHeight + 100,
        x: `+=${Math.random() * 200 - 100}`,
        rotation: Math.random() * 360,
        duration: 5 + Math.random() * 5,
        repeat: -1,
        delay: Math.random() * 5,
        ease: 'none',
        onRepeat: () => {
          gsap.set(petal, {
            x: 0,
            y: -20,
            left: `${Math.random() * 100}%`,
          });
        },
      });

      // Sway animation
      gsap.to(petal, {
        x: `+=${Math.random() * 50}`,
        duration: 1 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    return () => {
      petals.forEach((petal) => petal.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    />
  );
}