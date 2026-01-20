'use client';

import { ReactNode } from 'react';

interface CheckoutSectionProps {
  number: number;
  title: string;
  children: ReactNode;
}

export default function CheckoutSection({
  number,
  title,
  children,
}: CheckoutSectionProps) {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold">
          {number}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}
