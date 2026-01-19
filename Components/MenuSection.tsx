'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { categories, menuItems, type CategoryId } from '@/data/menuData';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('bento');
   const { items, addItem, updateQuantity } = useCart();

  const filteredItems = menuItems.filter(item => item.category === activeCategory);
  const displayedItems = filteredItems.slice(0, 6); // Show max 6 items

  const getQuantity = (id: number) => {
    const cartItem = items.find(item => item.id === String(id));
    return cartItem?.quantity || 0;
  }
 

  return (
    <section id="menu" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          Our Menu
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Fresh ingredients, bold flavors
        </p>

        {/* Category Tabs */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? 'bg-yellow-400 text-gray-900 font-semibold shadow-md'
                  : 'bg-white text-gray-600 hover:bg-yellow-100 border border-gray-200'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {displayedItems.map(item => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3">
                  {item.description}
                </p>

                {/* Price & Quantity */}
                {/* Price & Quantity */}
<div className="flex items-center justify-between">
  <span className="text-yellow-500 font-bold text-lg">
    ${item.price.toFixed(2)}
  </span>

  {/* Quantity Controls */}
  {/* Quantity Controls */}
{getQuantity(item.id) === 0 ? (
  <button
    onClick={() => addItem({
      id: String(item.id),
      name: item.name,
      price: item.price,
      image: item.image,
    })}
    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-full transition-colors"
  >
    + 
  </button>
) : (
  <div className="flex items-center gap-3">
    <button
      onClick={() => updateQuantity(String(item.id), getQuantity(item.id) - 1)}
      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold transition-colors"
    >
      -
    </button>
    <span className="w-6 text-center font-semibold text-gray-900">
      {getQuantity(item.id)}
    </span>
    <button
      onClick={() => updateQuantity(String(item.id), getQuantity(item.id) + 1)}
      className="w-8 h-8 rounded-full bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center text-gray-900 font-bold transition-colors"
    >
      +
    </button>
  </div>
)}
  </div>
</div>
              </div>
            
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          
          <Link
            href="/menu"
            className="inline-block border-2 border-yellow-400 text-gray-900 hover:bg-yellow-400 font-semibold px-8 py-3 rounded-full transition-all"
          >
            See Full Menu
          </Link>
        </div>

      </div>
    </section>
  );
}