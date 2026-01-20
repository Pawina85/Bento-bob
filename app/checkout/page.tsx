'use client';

import { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { useCart } from '@/context/CartContext';
import Input from '@/Components/ui/Input';
import CheckoutSection from '@/Components/ui/CheckoutSection';
import { useSearchParams } from 'next/navigation';

// Constants
const DELIVERY_FEE = 50;
const CURRENCY = '฿';
const VALID_PROMO_CODES: Record<string, number> = {
  BENTO20: 20,
  BENTO50: 50,
};

const PICKUP_LOCATIONS: Record<string, { name: string; address: string }> = {
  sukhumvit: { name: 'Bento Bop Sukhumvit', address: '123 Sukhumvit Road, Soi 23, Bangkok' },
  siam: { name: 'Bento Bop Siam', address: '456 Rama 1 Road, Bangkok' },
};

// Format date for display
const formatDateForDisplay = (dateStr: string | null): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

// Format time for display
const formatTimeForDisplay = (timeStr: string | null): string => {
  if (!timeStr) return '';
  const [hours, minutes] = timeStr.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

type PaymentMethod = 'card' | 'promptpay' | null;

interface FormErrors {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

// Validation helpers
const validateEmail = (email: string): string | undefined => {
  if (!email) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format';
  return undefined;
};

const validatePhone = (phone: string): string | undefined => {
  if (!phone) return 'Phone is required';
  if (!/^[\d\s\-+()]{9,}$/.test(phone)) return 'Invalid phone number';
  return undefined;
};

const validateRequired = (value: string, fieldName: string): string | undefined => {
  if (!value.trim()) return `${fieldName} is required`;
  return undefined;
};

const validateCardNumber = (cardNumber: string): string | undefined => {
  if (!cardNumber) return 'Card number is required';
  const cleaned = cardNumber.replace(/\s/g, '');
  if (!/^\d{13,19}$/.test(cleaned)) return 'Invalid card number';
  return undefined;
};

const validateCardExpiry = (expiry: string): string | undefined => {
  if (!expiry) return 'Expiry date is required';
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) return 'Use MM/YY format';
  return undefined;
};

const validateCvc = (cvc: string): string | undefined => {
  if (!cvc) return 'CVC is required';
  if (!/^\d{3,4}$/.test(cvc)) return 'Invalid CVC';
  return undefined;
};

function CheckoutContent() {
  const router = useRouter();
  const { items, totalPrice } = useCart();

  // Form states
  const [hasStartedCheckout, setHasStartedCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const searchParams = useSearchParams();
  const selectedDate = searchParams.get('date');
  const selectedTime = searchParams.get('time');
  const deliveryOption = searchParams.get('type');
  const selectedLocation = searchParams.get('location');

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
    notes: '',
  });

  // Calculations
  const discount = promoApplied ? VALID_PROMO_CODES[appliedPromoCode] || 0 : 0;
  const finalTotal = totalPrice + DELIVERY_FEE - discount;

  // Format card number with spaces every 4 digits
  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ').substring(0, 19); // 16 digits + 3 spaces
  };

  // Format expiry as MM/YY
  const formatExpiry = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  // Format CVC (only digits, max 4)
  const formatCvc = (value: string): string => {
    return value.replace(/\D/g, '').substring(0, 4);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Apply formatting for card fields
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'cardExpiry') {
      formattedValue = formatExpiry(value);
    } else if (name === 'cardCvc') {
      formattedValue = formatCvc(value);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate on blur
    let error: string | undefined;
    switch (name) {
      case 'email':
        error = validateEmail(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'firstName':
        error = validateRequired(value, 'First name');
        break;
      case 'lastName':
        error = validateRequired(value, 'Last name');
        break;
      case 'address':
        error = validateRequired(value, 'Address');
        break;
      case 'city':
        error = validateRequired(value, 'City');
        break;
      case 'postalCode':
        error = validateRequired(value, 'Postal code');
        break;
      case 'cardNumber':
        error = validateCardNumber(value);
        break;
      case 'cardExpiry':
        error = validateCardExpiry(value);
        break;
      case 'cardCvc':
        error = validateCvc(value);
        break;
    }

    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      firstName: validateRequired(formData.firstName, 'First name'),
      lastName: validateRequired(formData.lastName, 'Last name'),
      address: validateRequired(formData.address, 'Address'),
      city: validateRequired(formData.city, 'City'),
      postalCode: validateRequired(formData.postalCode, 'Postal code'),
    };

    if (paymentMethod === 'card') {
      newErrors.cardNumber = validateCardNumber(formData.cardNumber);
      newErrors.cardExpiry = validateCardExpiry(formData.cardExpiry);
      newErrors.cardCvc = validateCvc(formData.cardCvc);
    }

    setErrors(newErrors);
    setTouched({
      email: true,
      phone: true,
      firstName: true,
      lastName: true,
      address: true,
      city: true,
      postalCode: true,
      cardNumber: true,
      cardExpiry: true,
      cardCvc: true,
    });

    return !Object.values(newErrors).some(Boolean);
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    setIsApplyingPromo(true);
    setPromoError('');

    // Simulate API call to validate promo code
    await new Promise((resolve) => setTimeout(resolve, 800));

    const code = promoCode.toUpperCase();
    if (VALID_PROMO_CODES[code]) {
      setPromoApplied(true);
      setAppliedPromoCode(code);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
    }

    setIsApplyingPromo(false);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      router.push('/order-confirmation');
    }, 2000);
  };

  // Empty cart
  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 pt-4">
          <div className="max-w-2xl mx-auto px-4 py-16 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
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
            <Link
              href="/cart"
              className="text-gray-500 hover:text-gray-900 text-sm flex items-center gap-1 mb-4"
            >
              ← Back to cart
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-8" noValidate>
            {/* Account */}
            <CheckoutSection title="Account">
              {!hasStartedCheckout ? (
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm">
                    Sign in for a faster checkout experience
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setHasStartedCheckout(true)}
                      className="flex-1 py-3 border-2 border-gray-900 text-gray-900 font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasStartedCheckout(true)}
                      className="flex-1 py-3 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Continue as Guest
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-green-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Continuing as guest</span>
                </div>
              )}
            </CheckoutSection>

            {/* Contact */}
            {hasStartedCheckout && (
              <CheckoutSection title="Contact">
                <div className="space-y-4">
                  <Input
                    type="email"
                    name="email"
                    label="Email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="your@email.com"
                    error={touched.email ? errors.email : undefined}
                  />
                  <Input
                    type="tel"
                    name="phone"
                    label="Phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="+66 xx xxx xxxx"
                    error={touched.phone ? errors.phone : undefined}
                  />
                </div>
              </CheckoutSection>
            )}

            {/* Delivery Address */}
            {hasStartedCheckout && (
              <CheckoutSection title="Delivery Address">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="text"
                      name="firstName"
                      label="First Name"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="John"
                      error={touched.firstName ? errors.firstName : undefined}
                    />
                    <Input
                      type="text"
                      name="lastName"
                      label="Last Name"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Doe"
                      error={touched.lastName ? errors.lastName : undefined}
                    />
                  </div>
                  <Input
                    type="text"
                    name="address"
                    label="Address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="123 Street name, Building, Floor"
                    error={touched.address ? errors.address : undefined}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="text"
                      name="city"
                      label="City"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Bangkok"
                      error={touched.city ? errors.city : undefined}
                    />
                    <Input
                      type="text"
                      name="postalCode"
                      label="Postal Code"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="10110"
                      error={touched.postalCode ? errors.postalCode : undefined}
                    />
                  </div>
                </div>
              </CheckoutSection>
            )}

            {hasStartedCheckout && (
              <CheckoutSection title={deliveryOption === 'pickup' ? 'Pickup Details' : 'Delivery Time'}>
                <div className="p-4 border-2 border-yellow-400 rounded-xl bg-yellow-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        {deliveryOption === 'pickup' ? (
                          <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {deliveryOption === 'pickup' ? 'Store Pickup' : 'Delivery'}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {formatDateForDisplay(selectedDate)} at {formatTimeForDisplay(selectedTime)}
                        </p>
                        {deliveryOption === 'pickup' && selectedLocation && PICKUP_LOCATIONS[selectedLocation] && (
                          <div className="mt-2 pt-2 border-t border-yellow-200">
                            <p className="text-gray-900 text-sm font-medium">
                              {PICKUP_LOCATIONS[selectedLocation].name}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {PICKUP_LOCATIONS[selectedLocation].address}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <Link
                      href="/cart"
                      className="text-sm text-yellow-600 hover:underline"
                    >
                      Change
                    </Link>
                  </div>
                </div>
              </CheckoutSection>
            )}

            {/* Delivery */}
            {hasStartedCheckout && (
              <CheckoutSection title="Delivery">
                <div className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Same-Day Delivery</p>
                        <p className="text-gray-500 text-sm">Delivered within 2-4 hours</p>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {CURRENCY}{DELIVERY_FEE}
                    </span>
                  </div>
                </div>
              </CheckoutSection>
            )}

            {/* Payment */}
            {hasStartedCheckout && (
              <CheckoutSection title="Payment">
                <div className="space-y-3" role="radiogroup" aria-label="Payment method">
                  {/* Credit/Debit Card */}
                  <button
                    type="button"
                    role="radio"
                    aria-checked={paymentMethod === 'card'}
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                      paymentMethod === 'card'
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        paymentMethod === 'card' ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        <svg className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-yellow-600' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Credit / Debit Card</p>
                        <p className="text-gray-500 text-sm">Visa, Mastercard, JCB</p>
                      </div>
                    </div>
                  </button>

                  {/* Card Details */}
                  {paymentMethod === 'card' && (
                    <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                      <Input
                        type="text"
                        name="cardNumber"
                        label="Card Number"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="1234 5678 9012 3456"
                        autoComplete="cc-number"
                        error={touched.cardNumber ? errors.cardNumber : undefined}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="text"
                          name="cardExpiry"
                          label="Expiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="MM/YY"
                          autoComplete="cc-exp"
                          error={touched.cardExpiry ? errors.cardExpiry : undefined}
                        />
                        <Input
                          type="text"
                          name="cardCvc"
                          label="CVC"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="123"
                          autoComplete="cc-csc"
                          error={touched.cardCvc ? errors.cardCvc : undefined}
                        />
                      </div>
                    </div>
                  )}

                  {/* PromptPay */}
                  <button
                    type="button"
                    role="radio"
                    aria-checked={paymentMethod === 'promptpay'}
                    onClick={() => setPaymentMethod('promptpay')}
                    className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                      paymentMethod === 'promptpay'
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        paymentMethod === 'promptpay' ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        <svg className={`w-5 h-5 ${paymentMethod === 'promptpay' ? 'text-yellow-600' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          PromptPay / Mobile Banking
                        </p>
                        <p className="text-gray-500 text-sm">Scan QR code to pay</p>
                      </div>
                    </div>
                  </button>

                  {/* PromptPay QR */}
                  {paymentMethod === 'promptpay' && (
                    <div className="p-4 bg-gray-50 rounded-xl text-center">
                      <p className="text-gray-600 text-sm mb-3">
                        QR code will be shown after placing order
                      </p>
                      <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                        <span className="text-gray-400">QR Code</span>
                      </div>
                    </div>
                  )}
                </div>
              </CheckoutSection>
            )}

              {hasStartedCheckout && (
              <CheckoutSection title="Order Notes (Optional)">  
              <textarea
                name="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 text-gray-900 placeholder:text-gray-400 resize-none"
                placeholder="Add any special instructions or requests for your order"
              />
              </CheckoutSection>
            )
              }

            {/* Promo Code */}
            {hasStartedCheckout && (
              <CheckoutSection title="Promo Code">
                {promoApplied ? (
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center gap-2 text-green-700">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="font-medium">{appliedPromoCode} applied</span>
                    </div>
                    <span className="text-green-700 font-bold">
                      -{CURRENCY}{discount}
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <label htmlFor="promoCode" className="sr-only">
                        Promo code
                      </label>
                      <input
                        id="promoCode"
                        type="text"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value);
                          setPromoError('');
                        }}
                        disabled={isApplyingPromo}
                        className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:border-yellow-400 text-gray-900 placeholder:text-gray-400 ${
                          promoError ? 'border-red-300' : 'border-gray-200'
                        } ${isApplyingPromo ? 'bg-gray-100' : ''}`}
                        placeholder="Enter promo code"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        disabled={isApplyingPromo}
                        className={`px-6 py-3 font-medium rounded-lg transition-colors min-w-[100px] ${
                          isApplyingPromo
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                        }`}
                      >
                        {isApplyingPromo ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                          </span>
                        ) : (
                          'Apply'
                        )}
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-red-500 text-sm">{promoError}</p>
                    )}
                  </div>
                )}
              </CheckoutSection>
            )}

            {/* Order Summary */}
            {hasStartedCheckout && (
              <CheckoutSection title="Order Summary">
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
                        {CURRENCY}{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{CURRENCY}{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span>{CURRENCY}{DELIVERY_FEE}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-{CURRENCY}{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-900 font-bold text-xl pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>{CURRENCY}{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CheckoutSection>
            )}

            {/* Place Order Button */}
            {hasStartedCheckout && (
              <button
                type="submit"
                disabled={!paymentMethod || isProcessing}
                aria-busy={isProcessing}
                className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
                  paymentMethod && !isProcessing
                    ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isProcessing
                  ? 'Processing...'
                  : `Place Order • ${CURRENCY}${finalTotal.toFixed(2)}`}
              </button>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Loading fallback for Suspense
function CheckoutLoading() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-4">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-48 bg-gray-200 rounded-2xl"></div>
            <div className="h-48 bg-gray-200 rounded-2xl"></div>
            <div className="h-48 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
}
