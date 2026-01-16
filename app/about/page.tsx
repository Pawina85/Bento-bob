'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function AboutPage() {
    return (
        <>
        <Navbar />
    <main className="min-h-screen bg-stone-100 pt-4">
        <div className="max-w-2xl mx-auto px-4 py-4 md:py-16">
            <h1 className="text-2xl md:text-3xl py-8 font-bold text-gray-900">About Us</h1>
            <p className="text-xl ">Back in 2020, Bento Bop started with a simple idea — fresh, authentic Japanese bento made with love. What began as a small kitchen project has grown into a place where good food meets happy people. We're not a big chain. We're just a small team who believes great food should be simple, honest, and make your day better.
</p>
        </div>
    </main>
    <Footer />
        </>
    );
}