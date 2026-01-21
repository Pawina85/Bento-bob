'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Image from 'next/image';
import Link from 'next/link';

const PICKUP_LOCATIONS = [
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

const DELIVERY_FEE = 2.0;

// Generate calendar data for a specific month
const generateCalendarData = (year: number, month: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday
  
  // Get days from previous month to fill first row
  const prevMonth = new Date(year, month, 0);
  const daysInPrevMonth = prevMonth.getDate();
  
  const calendar: Array<{
    day: number;
    value: string;
    isCurrentMonth: boolean;
    isAvailable: boolean;
    isToday: boolean;
  }> = [];
  
  // Add previous month's trailing days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const date = new Date(year, month - 1, day);
    calendar.push({
      day,
      value: date.toISOString().split('T')[0],
      isCurrentMonth: false,
      isAvailable: false,
      isToday: false,
    });
  }
  
  // Add current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    
    // Available if date is today or in the future (within 30 days)
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30);
    const isAvailable = date >= today && date <= maxDate;
    
    calendar.push({
      day,
      value: date.toISOString().split('T')[0],
      isCurrentMonth: true,
      isAvailable,
      isToday: date.getTime() === today.getTime(),
    });
  }
  
  // Add next month's leading days to complete the grid (6 rows × 7 days = 42)
  const remainingDays = 42 - calendar.length;
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day);
    calendar.push({
      day,
      value: date.toISOString().split('T')[0],
      isCurrentMonth: false,
      isAvailable: false,
      isToday: false,
    });
  }
  
  return calendar;
};

// Generate available time slots
const TIME_SLOTS = [
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '17:00', label: '5:00 PM' },
  { value: '18:00', label: '6:00 PM' },
  { value: '19:00', label: '7:00 PM' },
  { value: '20:00', label: '8:00 PM' },
];

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, updateDeliveryInfo } = useCart();
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery' | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Calendar state
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  const calendarData = generateCalendarData(currentYear, currentMonth);
  const monthName = new Date(currentYear, currentMonth).toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Prevent going to past months
  const canGoPrev = currentYear > today.getFullYear() || 
    (currentYear === today.getFullYear() && currentMonth > today.getMonth());

  const handleDateSelect = (dateValue: string) => {
    setSelectedDate(dateValue);
    setIsCalendarOpen(false);
    // Auto-open time picker after selecting date
    setIsTimeOpen(true);
  };

  const handleTimeSelect = (timeValue: string) => {
    setSelectedTime(timeValue);
    setIsTimeOpen(false);
  };

  const formatSelectedDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatSelectedTime = (timeValue: string) => {
    const slot = TIME_SLOTS.find(t => t.value === timeValue);
    return slot?.label || timeValue;
  };

  const hasSelectedDateTime = selectedDate && selectedTime;
  const canCheckout = hasSelectedDateTime && (deliveryOption === 'delivery' || (deliveryOption === 'pickup' && selectedLocation));
  const finalTotal = deliveryOption === 'delivery' ? totalPrice + DELIVERY_FEE : totalPrice;

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
              className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
            >
              ← Continue shopping
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Add some delicious bento to get started</p>
              <Link
                href="/menu"
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-6 py-3 rounded-full transition-colors"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 text-xs text-gray-500 uppercase tracking-wide pb-4 border-b border-gray-300">
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
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-stone-200 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 text-sm mt-1 text-left transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-4 md:col-span-2 text-center">
                      <span className="md:hidden text-gray-500 text-xs">Price: </span>
                      <span className="text-gray-700">${item.price.toFixed(2)}</span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-4 md:col-span-2 flex justify-center">
                      <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-gray-900 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-4 md:col-span-2 text-right">
                      <span className="md:hidden text-gray-500 text-xs">Total: </span>
                      <span className="text-gray-900 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Options */}
              <div className="py-8 border-t border-gray-300">
                <h2 className="text-sm font-medium text-gray-900 mb-4 text-center uppercase tracking-wide">
                  Select delivery method
                </h2>

                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-6">
                  <button
                    onClick={() => {
                      setDeliveryOption('pickup');
                      setSelectedLocation(null);
                    }}
                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                      deliveryOption === 'pickup'
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <svg className="w-6 h-6 mx-auto mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Store Pickup</span>
                    <span className="block text-xs text-gray-500 mt-1">Free</span>
                  </button>

                  <button
                    onClick={() => {
                      setDeliveryOption('delivery');
                      setSelectedLocation(null);
                    }}
                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                      deliveryOption === 'delivery'
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <svg className="w-6 h-6 mx-auto mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Delivery</span>
                    <span className="block text-xs text-gray-500 mt-1">${DELIVERY_FEE.toFixed(2)}</span>
                  </button>
                </div>

                {/* Pickup Locations */}
                {deliveryOption === 'pickup' && (
                  <div className="max-w-sm mx-auto">
                    <p className="text-sm text-gray-600 mb-3">Select pickup location:</p>
                    <div className="space-y-2">
                      {PICKUP_LOCATIONS.map((location) => (
                        <button
                          key={location.id}
                          onClick={() => setSelectedLocation(location.id)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            selectedLocation === location.id
                              ? 'border-yellow-400 bg-yellow-50'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 ${
                              selectedLocation === location.id
                                ? 'border-yellow-500 bg-yellow-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedLocation === location.id && (
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{location.name}</p>
                              <p className="text-gray-500 text-xs">{location.address}, {location.city}</p>
                              <p className="text-gray-400 text-xs mt-1">{location.hours}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Delivery Info */}
                {deliveryOption === 'delivery' && (
                  <p className="text-sm text-gray-500 text-center">
                    Free delivery on orders over $30
                  </p>
                )}

                {/* Date & Time Selection */}
                {deliveryOption && (
                  <div className="mt-6 max-w-sm mx-auto space-y-3">
                    
                    {/* Date Picker - Collapsible */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      {/* Date Picker Header/Trigger */}
                      <button
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className={`text-sm ${selectedDate ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                            {selectedDate ? formatSelectedDate(selectedDate) : 'Choose a date'}
                          </span>
                        </div>
                        <svg 
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isCalendarOpen ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Calendar Content - Expandable */}
                      <div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isCalendarOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-4 pb-4 border-t border-gray-100">
                          {/* Month Navigation */}
                          <div className="flex items-center justify-between py-3">
                            <button
                              onClick={goToPrevMonth}
                              disabled={!canGoPrev}
                              className={`p-1.5 rounded-full transition-colors ${
                                canGoPrev 
                                  ? 'hover:bg-gray-100 text-gray-600' 
                                  : 'text-gray-300 cursor-not-allowed'
                              }`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                            <span className="text-sm font-medium text-gray-900">
                              {monthName}
                            </span>
                            <button
                              onClick={goToNextMonth}
                              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>

                          {/* Weekday Headers */}
                          <div className="grid grid-cols-7 gap-0.5 mb-1">
                            {WEEKDAYS.map((day) => (
                              <div 
                                key={day} 
                                className="text-center text-[10px] font-medium text-gray-400 py-1"
                              >
                                {day}
                              </div>
                            ))}
                          </div>

                          {/* Calendar Grid */}
                          <div className="grid grid-cols-7 gap-0.5">
                            {calendarData.map((dateObj, index) => (
                              <button
                                key={index}
                                onClick={() => dateObj.isAvailable && handleDateSelect(dateObj.value)}
                                disabled={!dateObj.isAvailable}
                                className={`
                                  aspect-square flex items-center justify-center text-xs rounded-md transition-all
                                  ${!dateObj.isCurrentMonth 
                                    ? 'text-gray-300' 
                                    : dateObj.isAvailable
                                      ? selectedDate === dateObj.value
                                        ? 'bg-yellow-400 text-gray-900 font-bold'
                                        : 'text-gray-900 font-medium hover:bg-yellow-100'
                                      : 'text-gray-300'
                                  }
                                  ${dateObj.isToday && selectedDate !== dateObj.value ? 'ring-1 ring-yellow-400 ring-inset' : ''}
                                  ${dateObj.isAvailable ? 'cursor-pointer' : 'cursor-default'}
                                `}
                              >
                                {dateObj.day}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Time Picker - Collapsible */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      {/* Time Picker Header/Trigger */}
                      <button
                        onClick={() => setIsTimeOpen(!isTimeOpen)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className={`text-sm ${selectedTime ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                            {selectedTime ? formatSelectedTime(selectedTime) : 'Choose a time'}
                          </span>
                        </div>
                        <svg 
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isTimeOpen ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Time Slots Content - Expandable */}
                      <div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isTimeOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                          <div className="grid grid-cols-3 gap-2">
                            {TIME_SLOTS.map((time) => (
                              <button
                                key={time.value}
                                onClick={() => handleTimeSelect(time.value)}
                                className={`py-2 px-1 rounded-md text-xs font-medium transition-all ${
                                  selectedTime === time.value
                                    ? 'bg-yellow-400 text-gray-900'
                                    : 'bg-gray-50 text-gray-700 hover:bg-yellow-100'
                                }`}
                              >
                                {time.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="py-6 border-t border-gray-300">
                <div className="max-w-sm ml-auto space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
                  </div>
                  {deliveryOption === 'delivery' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery</span>
                      <span className="text-gray-900">${DELIVERY_FEE.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout */}
              <div className="flex flex-col items-end gap-2 pt-4">
                <Link
                  href={`/checkout?type=${deliveryOption}&date=${selectedDate}&time=${selectedTime}${selectedLocation ? `&location=${selectedLocation}` : ''}`}
                  onClick={() => {
                    updateDeliveryInfo({
                      type: deliveryOption,
                      location: selectedLocation,
                      date: selectedDate,
                      time: selectedTime,
                    });
                  }}
                  className={`px-8 py-4 rounded-full font-bold transition-all ${
                    canCheckout
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 hover:scale-105'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                  }`}
                >
                  Checkout
                </Link>
                {!deliveryOption && (
                  <p className="text-xs text-gray-500">Please select a delivery method</p>
                )}
                {deliveryOption === 'pickup' && !selectedLocation && (
                  <p className="text-xs text-gray-500">Please select a pickup location</p>
                )}
                {deliveryOption && !hasSelectedDateTime && (
                  <p className="text-xs text-gray-500">Please select date and time</p>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}