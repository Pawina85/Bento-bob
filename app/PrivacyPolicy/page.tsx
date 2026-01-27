'use client';

import { useState } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const fagCategories = [
    {
        question: 'How do i place an order?',
        answer: 'Browse our menu, add items to your cart, choose pickup or delivery, select your date and time, then checkout.'
    },
    { 
        question: 'Can i order ahead of time?',
        answer: 'Yes! You can schedule orders up to 7 days in advance.'
    },
    { 
        question: 'Is there a minimum order for delivery?',
        answer: 'No minimum order. Delivery fee is ฿50 for all deliveries'
    },
]
{
    title: '🚚 Delivery & Pickup'
    fags: [
        {
            question: 'What are we delivery hours',
            answer: 'Lunch: 11AM - 2PM. Dinner: 5PM - 9PM. Weekend: 11AM - 9PM all day.'
        },
        {
            question: 'How long does delivery take?',
            answer: 'Delivery typically takes 30-45 minutes depending on your location.'
        },
        {
            question: 'Where do you deliver?',
            answer: 'We deliver within a 10 km radius of our store location.'
        },
        {
            question: 'Is pickup available?',
            answer: 'Yes, you can choose to pick up your order at our store during business hours.'
        }
    ]
}
{
    title: '💳 Payment'
    faqs: [
        {
            question: 'What payment methods do you accept?',
        answer: 'Credit/debit cards (Visa, Mastercard, JCB) and PromptPay.',
      },
      {
        question: 'Do you accept cash?',
        answer: 'Currently online payment only for pre-orders.',
      },
    ]
}
{
    title: '🍱 Food'
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
      }
    ]
  }
  {
    title: '📍 Store Info'
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
      }
    ]
  }
