'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { useCart } from '@/context/CartContext';

type PaymentMethod = 'card' | 'promptpay' | null;

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  
  // Form states
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  // Calculations
  const deliveryFee = 50;
  const discount = promoApplied ? 20 : 0;
  const finalTotal = totalPrice + deliveryFee - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'BENTO20') {
      setPromoApplied(true);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect to confirmation page
      window.location.href = '/order-confirmation';
    }, 2000);
  };

  // Empty cart
  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 pt-4">
          <div className="max-w-2xl mx-auto px-4 py-16 text-center">
            <span className="text-6xl mb-4 block">🛒</span>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
            <p className="text-gray-500 mb-6">Add some items before checkout</p>
            <Link
              href="/menu"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-full transition-all"
            >
              Browse Menu
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-4">
        <div className="max-w-2xl mx-auto px-4 py-8">

          {/* Header */}
          <div className="mb-8">
            <Link href="/cart" className="text-gray-500 hover:text-gray-900 text-sm flex items-center gap-1 mb-4">
              ← Back to cart
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-8">

            {/* Section 1: Sign In */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Account
              </h2>

              {!isSignedIn ? (
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm">Sign in for a faster checkout experience</p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsSignedIn(true)}
                      className="flex-1 py-3 border-2 border-gray-900 text-gray-900 font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSignedIn(true)}
                      className="flex-1 py-3 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Continue as Guest
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-green-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Continuing as guest</span>
                </div>
              )}
            </section>

            {/* Section 2: Contact */}
            {isSignedIn && (
              <section className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Contact
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 text-gray-900 placeholder:text-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 text-gray-900 placeholder:text-gray-400"
                      placeholder="+66 xx xxx xxxx"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Section 3: Delivery Address */}
            {isSignedIn && (
              <section className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Delivery Address
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 text-gray-900 placeholder:text-gray-400"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 text-gray-900 placeholder:text-gray-400"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 text-gray-900 placeholder:text-gray-400"
                      placeholder="123 Street name, Building, Floor"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 text-gray-900 placeholder:text-gray-400"
                        placeholder="Bangkok"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 text-gray-900 placeholder:text-gray-400"
                        placeholder="10110"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Section 4: Shipping Method */}
            {isSignedIn && (
              <section className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  Delivery Time
                </h2>

                <div className="p-4 border-2 border-yellow-400 bg-yellow-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🚚</span>
                      <div>
                        <p className="font-semibold text-gray-900">Same-Day Delivery</p>
                        <p className="text-gray-500 text-sm">Delivered within 2-4 hours</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">฿{deliveryFee}</span>
                  </div>
                </div>
              </section>
            )}

            {/* Section 5: Payment */}
            {isSignedIn && (
              <section className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  Payment
                </h2>

                <div className="space-y-3">
                  {/* Credit/Debit Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                      paymentMethod === 'card'
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💳</span>
                      <div>
                        <p className="font-semibold text-gray-900">Credit / Debit Card</p>
                        <p className="text-gray-500 text-sm">Visa, Mastercard, JCB</p>
                      </div>
                    </div>
                  </button>

                  {/* Card Details */}
                  {paymentMethod === 'card' && (
                    <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 text-gray-900 placeholder:text-gray-400"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 text-gray-900 placeholder:text-gray-400"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                          <input
                            type="text"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 text-gray-900 placeholder:text-gray-400"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PromptPay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('promptpay')}
                    className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                      paymentMethod === 'promptpay'
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📱</span>
                      <div>
                        <p className="font-semibold text-gray-900">PromptPay / Mobile Banking</p>
                        <p className="text-gray-500 text-sm">Scan QR code to pay</p>
                      </div>
                    </div>
                  </button>

                  {/* PromptPay QR */}
                  {paymentMethod === 'promptpay' && (
                    <div className="p-4 bg-gray-50 rounded-xl text-center">
                      <p className="text-gray-600 text-sm mb-3">QR code will be shown after placing order</p>
                      <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                        <span className="text-gray-400">QR Code</span>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Section 6: Promo Code */}
            {isSignedIn && (
              <section className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold">6</span>
                  Promo Code
                </h2>

                {promoApplied ? (
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center gap-2 text-green-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-medium">BENTO20 applied</span>
                    </div>
                    <span className="text-green-700 font-bold">-฿{discount}</span>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 text-gray-900 placeholder:text-gray-400"
                      placeholder="Enter promo code"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* Section 7: Order Summary */}
            {isSignedIn && (
              <section className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold">7</span>
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{item.name}</p>
                        <p className="text-gray-500 text-sm">x{item.quantity}</p>
                      </div>
                      <span className="text-gray-900 font-medium">
                        ฿{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>฿{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span>฿{deliveryFee}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-฿{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-900 font-bold text-xl pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>฿{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </section>
            )}

            {/* Place Order Button */}
            {isSignedIn && (
              <button
                type="submit"
                disabled={!paymentMethod || isProcessing}
                className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
                  paymentMethod && !isProcessing
                    ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isProcessing ? 'Processing...' : `Place Order • ฿${finalTotal.toFixed(2)}`}
              </button>
            )}

          </form>

        </div>
      </main>
      <Footer />
    </>
  );
}