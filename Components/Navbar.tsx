'use client';

import { useState } from 'react';

const navLinks = [
    { name: 'Home', href: '/#' },
    { name: 'About', href: '/#about' },
    { name: 'Menu', href: '/#menu' },
    { name: 'Contact', href: '/#contact' },
];


export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
            
                <a href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-xl">🍱</span>
                </div>
                <span className="text-xl font-bold text-gray-800 ">Bento <span className="text-yellow-400"> Bop</span>
                </span>
                </a>

            
            <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                    <a key={link.name}
                       href={link.href}
                       className="text-gray-600 hover:text-yellow-500 font-medium transition-colors relative group">
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"/>
                    </a>
                ))}
                  <a href="#order" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-105">
                    Order Now
                  </a>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-yellow-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>
            </div>
        {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
                <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                    <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-600 hover:text-yellow-500 hover:bg-yellow-50 font-medium px-2 py-2 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    >
                    {link.name}
                    </a>
                ))}
                    <a href="#order" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-5 py-3 rounded-full text-center transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                        Order Now
                    </a>
                </div>
            </div>
        )}
    </nav>
    </header>
    );
    }