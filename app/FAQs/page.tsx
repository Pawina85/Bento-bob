'use client';

import { useState } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const faqCategories = [
  {
    title: '🛒 Ordering',
    faqs: [
      {
        question: 'How do I place an order?',
        answer: 'Browse our menu, add items to your cart, choose pickup or delivery, select your date and time, then checkout.',
      },
      {
        question: 'Can I order ahead of time?',
        answer: 'Yes! You can schedule orders up to 7 days in advance.',
      },
      {
        question: 'Is there a minimum order?',
        answer: 'No minimum order. Delivery fee is ฿50 for all deliveries.',
      },
    ],
  },
  {
    title: '🚚 Delivery & Pickup',
    faqs: [
      {
        question: 'What are delivery hours?',
        answer: 'Lunch: 11AM - 2PM. Dinner: 5PM - 9PM. Weekends: 11AM - 9PM all day.',
      },
      {
        question: 'How long does delivery take?',
        answer: '30-45 minutes depending on location.',
      },
      {
        question: 'Where do you deliver?',
        answer: 'Within 10km of Sukhumvit, Bangkok.',
      },
      {
        question: 'Is pickup available?',
        answer: 'Yes! Pickup is free at our Sukhumvit store.',
      },
    ],
  },
  {
    title: '💳 Payment',
    faqs: [
      {
        question: 'What payment methods do you accept?',
        answer: 'Credit/debit cards (Visa, Mastercard, JCB) and PromptPay.',
      },
      {
        question: 'Do you accept cash?',
        answer: 'Currently online payment only for pre-orders.',
      },
    ],
  },
  {
    title: '🍱 Food',
    faqs: [
      {
        question: 'Is the food fresh?',
        answer: 'Yes! All bento boxes are made fresh daily. Nothing frozen.',
      },
      {
        question: 'Do you have vegetarian options?',
        answer: 'Yes! Look for 🌱 items on our menu.',
      },
      {
        question: 'Can I customize my order?',
        answer: 'Add requests in "Order Notes" at checkout.',
      },
      {
        question: 'What about allergies?',
        answer: 'Let us know in order notes. Our kitchen handles soy, gluten, and sesame.',
      },
    ],
  },
  {
    title: '📍 Store Info',
    faqs: [
      {
        question: 'What are your hours?',
        answer: 'Mon-Fri: 10AM-9PM. Sat-Sun: 11AM-10PM. Holidays: 11AM-8PM.',
      },
      {
        question: 'Where are you located?',
        answer: '123 Sukhumvit Road, Soi 23, Bangkok. Near BTS Asok.',
      },
      {
        question: 'Can I cancel my order?',
        answer: 'Yes, up to 2 hours before scheduled time. Email hello@bentobop.com.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-4">
        <div className="max-w-3xl mx-auto px-4 py-8">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              FAQs
            </h1>
            <p className="text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqCategories.map((category, catIndex) => (
              <div key={catIndex}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {category.title}
                </h2>
                <div className="space-y-3">
                  {category.faqs.map((faq, faqIndex) => {
                    const id = `${catIndex}-${faqIndex}`;
                    return (
                      <div
                        key={id}
                        className="bg-white rounded-xl shadow-sm overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFAQ(id)}
                          className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900">{faq.question}</span>
                          <span className={`text-xl text-yellow-500 transition-transform ${openIndex === id ? 'rotate-45' : ''}`}>
                            +
                          </span>
                        </button>
                        {openIndex === id && (
                          <div className="px-5 pb-4">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-yellow-50 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-4">
              We&apos;re happy to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:hello@bentobop.com"
                className="inline-block bg-white border-2 border-gray-900 text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
              >
                📧 Email Us
              </a>
              <a
                href="/contact"
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-full transition-all"
              >
                💬 Contact Page
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
