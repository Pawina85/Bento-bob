'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Input from '@/Components/ui/Input';
import { useAuth } from '@/context/AuthContext';

interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
}

// Validation helpers
const validateEmail = (email: string): string | undefined => {
  if (!email) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format';
  return undefined;
};

const validatePassword = (password: string): string | undefined => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return undefined;
};

const validateName = (name: string): string | undefined => {
  if (!name.trim()) return 'Name is required';
  return undefined;
};

const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return undefined;
};

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [authError, setAuthError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setAuthError('');

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
      case 'password':
        error = validatePassword(value);
        break;
      case 'name':
        error = validateName(value);
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(formData.password, value);
        break;
    }

    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    if (isSignUp) {
      newErrors.name = validateName(formData.name);
      newErrors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
    }

    setErrors(newErrors);
    setTouched({
      email: true,
      password: true,
      name: true,
      confirmPassword: true,
    });

    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        await register(formData.name, formData.email, formData.password);
      } else {
        await login(formData.email, formData.password);
      }
      router.push('/');
    } catch {
      setAuthError(isSignUp ? 'Failed to create account. Please try again.' : 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
    setTouched({});
    setAuthError('');
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-4">
        <div className="max-w-md mx-auto px-4 py-8 sm:py-16">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-gray-500">
              {isSignUp
                ? 'Join Bento Bop for fresh bowls & bold flavors'
                : 'Sign in to your account to continue'}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Auth Error */}
              {authError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm text-center">{authError}</p>
                </div>
              )}

              {/* Name (Sign Up only) */}
              {isSignUp && (
                <Input
                  type="text"
                  name="name"
                  label="Full Name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="John Doe"
                  autoComplete="name"
                  error={touched.name ? errors.name : undefined}
                />
              )}

              {/* Email */}
              <Input
                type="email"
                name="email"
                label="Email"
                required
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="your@email.com"
                autoComplete="email"
                error={touched.email ? errors.email : undefined}
              />

              {/* Password */}
              <Input
                type="password"
                name="password"
                label="Password"
                required
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder={isSignUp ? 'Create a password' : 'Enter your password'}
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                error={touched.password ? errors.password : undefined}
              />

              {/* Confirm Password (Sign Up only) */}
              {isSignUp && (
                <Input
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  error={touched.confirmPassword ? errors.confirmPassword : undefined}
                />
              )}

              {/* Forgot Password (Login only) */}
              {!isSignUp && (
                <div className="text-right">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-yellow-600 hover:text-yellow-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                aria-busy={isLoading}
                className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
                  isLoading
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 hover:scale-105'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {isSignUp ? 'Creating Account...' : 'Signing In...'}
                  </span>
                ) : (
                  isSignUp ? 'Create Account' : 'Sign In'
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or continue with</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-gray-700 font-medium">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                  </svg>
                  <span className="text-gray-700 font-medium">Apple</span>
                </button>
              </div>
            </form>

            {/* Toggle Sign In / Sign Up */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="ml-2 text-yellow-600 hover:text-yellow-700 font-semibold hover:underline"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-900 text-sm flex items-center justify-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
