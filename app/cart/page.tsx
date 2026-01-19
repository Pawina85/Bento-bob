'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    totalPrice,
  } = useCart();

  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery' | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const pickupLocations = [
    {
      id: 'sukhumvit',
      name: 'Bento Bop Sukhumvit',
      address: '123 Sukhumvit Road, Soi 23',
      city: 'Bangkok, 10110',
      hours: '10:00 - 21:00',
    },
    {
      id: 'siam',
      name: 'Bento Bop Siam',
      address: '456 Rama 1 Road',
      city: 'Bangkok, 10330',
      hours: '11:00 - 22:00',
    },
  ];

  const canCheckout = deliveryOption === 'delivery' || (deliveryOption === 'pickup' && selectedLocation);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-stone-100 pt-4">
        <div className="max-w-4xl mx-auto px-4 py-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Your Cart</h1>
            <Link
              href="/menu"
              className="text-gray-600 hover:text-yellow-500 underline transition-colors"
            >
              Continue shopping
            </Link>
          </div>

          {items.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">🍱</span>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Add some delicious bento to get started!</p>
              <Link
                href="/menu"
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-full transition-all hover:scale-105"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 text-sm text-gray-500 uppercase tracking-wide pb-4 border-b border-gray-300">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="py-6 grid grid-cols-12 gap-4 items-center">
                    
                    {/* Product */}
                    <div className="col-span-12 md:col-span-6 flex gap-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-stone-200 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-gray-500 text-sm mt-1">Serves 1-2</p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 text-sm mt-2 flex items-center gap-1 transition-colors"
                        >
                          Remove 🗑️
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-4 md:col-span-2 text-center">
                      <span className="md:hidden text-gray-500 text-sm">Price: </span>
                      <span className="text-gray-900">${item.price.toFixed(2)}</span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-4 md:col-span-2 flex justify-center">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-4 py-2 text-gray-900 font-medium border-x border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-4 md:col-span-2 text-right">
                      <span className="md:hidden text-gray-500 text-sm">Total: </span>
                      <span className="text-gray-900 font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                  </div>
                ))}
              </div>

              {/* Subtotal */}
              <div className="text-right py-6 border-t border-gray-300">
                <p className="text-xl">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="ml-4 font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Tax included. Delivery calculated at checkout.
                </p>
              </div>

              {/* Delivery Options */}
              <div className="py-8 border-t border-gray-300">
                <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">
                  Please select delivery or pick up
                </h2>

                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                  {/* Store Pickup */}
                  <button
                    onClick={() => {
                      setDeliveryOption('pickup');
                      setSelectedLocation(null);
                    }}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      deliveryOption === 'pickup'
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-3xl block mb-2">🏪</span>
                    <span className="font-semibold text-gray-900">Store Pickup</span>
                  </button>

                  {/* Delivery */}
                  <button
                    onClick={() => {
                      setDeliveryOption('delivery');
                      setSelectedLocation(null);
                    }}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      deliveryOption === 'delivery'
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-3xl block mb-2">🚚</span>
                    <span className="font-semibold text-gray-900">Delivery</span>
                  </button>
                </div>

                {/* Pickup Locations */}
                {deliveryOption === 'pickup' && (
                  <div className="max-w-md mx-auto">
                    <p className="text-gray-600 mb-4">Please select a pickup location:</p>
                    <div className="space-y-3">
                      {pickupLocations.map((location) => (
                        <button
                          key={location.id}
                          onClick={() => setSelectedLocation(location.id)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                            selectedLocation === location.id
                              ? 'border-yellow-400 bg-yellow-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                              selectedLocation === location.id
                                ? 'border-yellow-500 bg-yellow-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedLocation === location.id && (
                                <div className="w-2 h-2 bg-white rounded-full" />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{location.name}</p>
                              <p className="text-gray-600 text-sm">{location.address}</p>
                              <p className="text-gray-600 text-sm">{location.city}</p>
                              <p className="text-yellow-600 text-sm mt-1">Hours: {location.hours}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Delivery Info */}
                {deliveryOption === 'delivery' && (
                  <div className="max-w-md mx-auto text-center">
                    <p className="text-gray-600">
                      Delivery available within 10km radius.<br />
                      Delivery fee: <span className="font-semibold">$2.00</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Checkout Button */}
              <div className="flex justify-end gap-4 py-6 border-t border-gray-300">
                <button
                  disabled={!canCheckout}
                  className={`px-8 py-4 rounded-full font-bold transition-all ${
                    canCheckout
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 hover:scale-105'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Checkout
                </button>
              </div>

              {!canCheckout && deliveryOption && (
                <p className="text-red-500 text-center text-sm">
                  {deliveryOption === 'pickup' && !selectedLocation && 'Please select a pickup location to continue'}
                </p>
              )}

            </>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}