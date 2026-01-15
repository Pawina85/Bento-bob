'use client';

import { useState } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16 relative z-10">
        <div className="max-w-xl mx-auto px-4 py-4">

          {/* Header - moved closer to top */}
          <div className="text-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Restaurant Location
            </h1>
          </div>

          {/* Google Map - smaller, matching form width */}
          <div className="rounded-xl overflow-hidden shadow-md mb-6 h-48 md:h-56">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153166!3d-37.81627974202195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d6f5d4e0b8b5!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1614031234567!5m2!1sen!2sau"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Restaurant Location"
            />
          </div>

          <div className="text-center mt-8 mb-4">
            <h2 className="text-xl font-bold text-gray-900">Contact Us</h2>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <p className="text-green-700 font-medium">Thank you! Your message has been sent.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
              {/* Name field with floating label */}
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocused({ ...focused, name: true })}
                  onBlur={() => setFocused({ ...focused, name: false })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all peer"
                  placeholder=" "
                />
                <label className={`absolute left-4 transition-all pointer-events-none
                  ${formData.name || focused.name
                    ? 'top-1 text-xs text-yellow-500'
                    : 'top-3 text-gray-800'}`}>
                  Your Name
                </label>
              </div>

              {/* Email field with floating label */}
              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocused({ ...focused, email: true })}
                  onBlur={() => setFocused({ ...focused, email: false })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all peer"
                  placeholder=" "
                />
                <label className={`absolute left-4 transition-all pointer-events-none
                  ${formData.email || focused.email
                    ? 'top-1 text-xs text-yellow-500'
                    : 'top-3 text-gray-800'}`}>
                  Your Email
                </label>
              </div>

              {/* Message field with floating label */}
              <div className="relative">
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocused({ ...focused, message: true })}
                  onBlur={() => setFocused({ ...focused, message: false })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all peer resize-none"
                  placeholder=" "
                />
                <label className={`absolute left-4 transition-all pointer-events-none
                  ${formData.message || focused.message
                    ? 'top-1 text-xs text-yellow-500'
                    : 'top-3 text-gray-800'}`}>
                  Comment
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-400 text-white font-semibold py-3 rounded-xl hover:bg-yellow-500 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
