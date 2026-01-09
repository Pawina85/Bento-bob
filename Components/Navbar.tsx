'use client';


export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
    <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-4">
                <a href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center ">
                <span className="text-2xl font-bold">🍱</span>
                </div>
                <span className="text-xl font-bold text-gray-900 ">Bento Bop</span>
                </a>

            </div>
            <div className="md:flex space-x-8 items-center">
                <a href="/#" className="text-gray-700 hover:text-yellow-500 font-medium transition-colors duration-300">Home</a>
                <a href="/#about" className="text-gray-700 hover:text-yellow-500 font-medium transition-colors duration-300">About</a>
                <a href="/#menu" className="text-gray-700 hover:text-yellow-500 font-medium transition-colors duration-300">Menu</a>
                <a href="/#contact" className="text-gray-700 hover:text-yellow-500 font-medium transition-colors duration-300">Contact</a>
            </div>
        </div>
    </nav>
    </header>
    );
    }