'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { menuItems } from '@/data/menuData';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Menu', href: '/menu' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof menuItems>([]);
  const router = useRouter();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = menuItems.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filtered);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/menu?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-xl">🍱</span>
            </div>
            <span className="text-xl font-bold text-gray-800">
              Bento <span className="text-yellow-500">Bop</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-yellow-500 font-medium transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Icons - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 transition-colors ${isSearchOpen ? 'text-yellow-500' : 'text-gray-600 hover:text-yellow-500'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Login / User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-2 text-gray-600 hover:text-yellow-500 transition-colors"
                >
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 font-semibold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="p-2 text-gray-600 hover:text-yellow-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2 text-gray-600 hover:text-yellow-500 transition-colors relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-xs font-bold rounded-full flex items-center justify-center text-gray-900">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Right Icons - Mobile */}
          <div className="flex md:hidden items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 transition-colors ${isSearchOpen ? 'text-yellow-500' : 'text-gray-600 hover:text-yellow-500'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2 text-gray-600 hover:text-yellow-500 transition-colors relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-xs font-bold rounded-full flex items-center justify-center text-gray-900">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-yellow-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-yellow-500 hover:bg-yellow-50 font-medium px-4 py-3 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Login / User in Mobile Menu */}
              {user ? (
                <>
                  <div className="px-4 py-3 border-t border-gray-100 mt-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-yellow-600 font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-gray-600 hover:text-yellow-500 hover:bg-yellow-50 font-medium px-4 py-3 rounded-lg transition-colors flex items-center gap-2 w-full text-left"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-yellow-500 hover:bg-yellow-50 font-medium px-4 py-3 rounded-lg transition-colors flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-100 p-4">
            <form className="max-w-2xl mx-auto flex gap-2" onSubmit={handleSubmit}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for bento, drinks, and desserts..."
                autoFocus
                className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 text-gray-900 placeholder:text-gray-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-full transition-colors"
              >
                Search
              </button>
            </form>

            {/* Live Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="max-w-2xl mx-auto mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                {searchResults.slice(0, 5).map(item => (
                  <Link
                    key={item.id}
                    href={`/menu?search=${encodeURIComponent(item.name)}`}
                    className="flex items-center gap-3 p-3 hover:bg-yellow-50 transition-colors border-b border-gray-50 last:border-b-0"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <span className="text-yellow-500 font-bold">${item.price.toFixed(2)}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* No Results Message */}
            {searchQuery.trim() !== '' && searchResults.length === 0 && (
              <div className="max-w-2xl mx-auto mt-2 p-4 text-center text-gray-500">
                No items found for &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}