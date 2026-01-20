'use client';

import { ReactNode } from 'react';

interface CheckoutSectionProps {
  title: string;
  children: ReactNode;
}

export default function CheckoutSection({
  title,
  children,
}: CheckoutSectionProps) {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      {children}
    </section>
  );
}
