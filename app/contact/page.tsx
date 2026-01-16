'use client';

import { useState } from 'react';
import Link from 'next/link';


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', comment: '' });
    }, 1000);
  };

  return (
    <>
      

      <main className="min-h-screen bg-stone-100 pt-4">
        <div className="max-w-2xl mx-auto px-4 py-4  md:py-16">

          {/* Header - moved closer to top */}
          
            <h1 className="text-2xl tmd:text-3xl py-8 font-bold text-gray-900">
              Contact Us
            </h1>
          

          
          <div className="mb-10 space-y-1 text-black text-left">
            <p>Address: 123 Sukhumvit Road, Bangkok, Thailand 10110</p>
            <p>
              Email:{' '}
              <Link href="mailto:hello@bentobop.com"
              className="underline hover:text-yellow-600 transition-colors"
              >hello@bentobop.com</Link>
            </p>
          <p>Phone: +66 1234 5678</p>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <span className='text-5xl mb-4 block'>🎉</span>
              <h3 className="text-2xl font-serif text-gray-900 mb-2">Message Sent</h3>
              <p className="text-gray-600 mb-6">We&apos;ll get back to you shortly.</p>
            <button onClick={() => setSubmitted(false)}
              className="text-gray-900 underline hover:text-yellow-600 transition-colors">
              Send another message
            </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field with floating label */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-gray-400 rounded-sm focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-500 text-gray-600"
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-transparent border border-gray-400 rounded-sm focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-500 text-gray-600"
                  placeholder="Email *"
                />
              </div>

              <input type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value})}
              className="w-full px-4 py-3 bg-transparent border border-gray-400 rounded-sm focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-500 text-gray-600"
              placeholder="Phone number" />

              <textarea
              required
              rows={5}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value})}
              className="w-full px-4 py-3 bg-transparent border border-gray-400 rounded-sm focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-500 text-gray-600"
              placeholder="Comment"
              />
              <button
              type="submit"
              disabled={isSubmitting}
              className="bg-stone-800 hover:bg-stone-900 disabled:bg-stone-600 text-white px-8 rounded-sm focus:outline-none focus:border-gray-900 transition-colors resize-none"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
       
              
        </div>
      </main>

      
    </>
  );
}
