'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/Components/Navbar';
import { categories, menuItems } from '@/data/menuData';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('bento');
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  const updateQuantity = (id: number, change: number) => {
    setQuantities(prev => ({
        ...prev,
        [id]: Math.max(0, (prev[id] || 0) + change)
    }))
    };


    return (
        <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 py-8">

                <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Menu</h1>
                <p className="text-gray-600 mb-8">Fresh ingredients, bold flavors</p>

                <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
                    {categories.map(category => (
                    <button
                       key={category.id}
                       onClick={() => setActiveCategory(category.id)}
                       className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all ${
                       activeCategory === category.id
                       ? 'bg-yellow-400 text-gray-900 font-semibold shadow-md'
                       : 'bg-white text-gray-600 hover:bg-yellow-100 border border-gray-200'
                       }`} >
                          <span>{category.icon}</span>
                            <span>{category.name}</span>
                    </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map(item => (
                    <div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <Image
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
 
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 text-lg mb-1">{item.name}</h3>
                            <p className="text-gray-500 text-sm mb-3">{item.description}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-yellow-500 font-bold text-lg">
                                ${item.price.toFixed(2)}
                            </span>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex
                                    items-center justify-center text-gray-600 font-bold transition-colors" >
                                        -
                                </button>
                                <span className="w-6 text-center font-semibold">
                                    {quantities[item.id] || 0}
                                </span>
                                <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="w-8 h-8 rounded-full bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center text-gray-900 font-bold transition-colors" >
                                        +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
                </div>
            </div>
        </main>
        </>
    )
}