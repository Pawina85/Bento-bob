'use client';

import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pt-4">
  <div className="max-w-5xl mx-auto px-4 py-8">

    {/* Page Title */}
    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Us</h1>

    {/* Story Card */}
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
        📖 Our Story
      </h2>
      <p className="text-gray-700 leading-relaxed text-lg mb-3">
        Back in 2020, Bento Bop started with a simple idea — fresh, authentic Japanese bento made with love.<br />What began as a small kitchen project has grown into a place where good food meets happy people.
      </p>
      <p className="text-gray-700 leading-relaxed text-lg">
        We&apos;re not a big chain. We&apos;re just a small team who believes great food should be simple, honest, and make your day better.
      </p>
    </div>

    {/* Hours Section */}
    <div className="grid md:grid-cols-2 gap-4">
      
      {/* Opening Hours */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          🕐 Opening Hours
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-600">Monday - Friday</span>
            <span className="text-gray-900 font-semibold">10:00 - 21:00</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-600">Saturday - Sunday</span>
            <span className="text-gray-900 font-semibold">11:00 - 22:00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Public Holidays</span>
            <span className="text-gray-900 font-semibold">11:00 - 20:00</span>
          </div>
        </div>
      </div>

      {/* Delivery Hours */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          🚚 Delivery Hours
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-600">Lunch</span>
            <span className="text-gray-900 font-semibold">11:00 - 14:00</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-600">Dinner</span>
            <span className="text-gray-900 font-semibold">17:00 - 21:00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Weekend</span>
            <span className="text-gray-900 font-semibold">11:00 - 21:00</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Within 10km radius</p>
      </div>

    </div>

    {/* Visit Us Card */}
    <div className="bg-yellow-100 rounded-2xl p-6 md:p-8 mt-6 text-md">
      <p className="text-gray-900">
        Welcome to Bento Bop! Fresh bento, bold flavors, made with love. Order online for quick delivery or pick up in store. <br />

      </p>
      <br />
      <p className="text-gray-900">Great food, happy vibes — that's what we're about.</p>
      <div className="flex justify-between gap-4 mt-4 text-sm text-gray-800">
        <Link href="/contact">
        <button className="bg-stone-800 hover:bg-stone-700 text-white px-4 py-2 rounded">Contact Us</button>
        </Link>
        <Link href="/menu">
       <button className="bg-stone-800 hover:bg-stone-700 text-white px-4 py-2 rounded">See Our Menu</button>
       </Link>
      </div>
    </div>

  </div>
</main>
            <Footer />
        </>
    );
}