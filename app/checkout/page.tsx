'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { useCart } from '@/context/CartContext';
import Input from '@/Components/ui/Input';
import CheckoutSection from '@/Components/ui/CheckoutSection';

// Constants
const DELIVERY_FEE = 50;
const CURRENCY = '฿';
const VALID_PROMO_CODES: Record<string, number> = {
  BENTO20: 20,
  BENTO50: 50,
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

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice } = useCart();

  // Form states
  const [hasStartedCheckout, setHasStartedCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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
  const discount = promoApplied ? VALID_PROMO_CODES[appliedPromoCode] || 0 : 0;
  const finalTotal = totalPrice + DELIVERY_FEE - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

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

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase();
    if (VALID_PROMO_CODES[code]) {
      setPromoApplied(true);
      setAppliedPromoCode(code);
    }
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
            <span className="text-6xl mb-4 block" role="img" aria-label="Shopping cart">
              🛒
            </span>
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
            {/* Section 1: Account */}
            <CheckoutSection number={1} title="Account">
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

            {/* Section 2: Contact */}
            {hasStartedCheckout && (
              <CheckoutSection number={2} title="Contact">
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

            {/* Section 3: Delivery Address */}
            {hasStartedCheckout && (
              <CheckoutSection number={3} title="Delivery Address">
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

            {/* Section 4: Delivery Time */}
            {hasStartedCheckout && (
              <CheckoutSection number={4} title="Delivery Time">
                <div className="p-4 border-2 border-yellow-400 bg-yellow-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" role="img" aria-label="Delivery truck">
                        🚚
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900">Same-Day Delivery</p>
                        <p className="text-gray-500 text-sm">Delivered within 2-4 hours</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">
                      {CURRENCY}{DELIVERY_FEE}
                    </span>
                  </div>
                </div>
              </CheckoutSection>
            )}

            {/* Section 5: Payment */}
            {hasStartedCheckout && (
              <CheckoutSection number={5} title="Payment">
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
                      <span className="text-2xl" role="img" aria-label="Credit card">
                        💳
                      </span>
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
                      <span className="text-2xl" role="img" aria-label="Mobile phone">
                        📱
                      </span>
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

            {/* Section 6: Promo Code */}
            {hasStartedCheckout && (
              <CheckoutSection number={6} title="Promo Code">
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
                  <div className="flex gap-2">
                    <label htmlFor="promoCode" className="sr-only">
                      Promo code
                    </label>
                    <input
                      id="promoCode"
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
              </CheckoutSection>
            )}

            {/* Section 7: Order Summary */}
            {hasStartedCheckout && (
              <CheckoutSection number={7} title="Order Summary">
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
