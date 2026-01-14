import Link from "next/link";
export default function Footer() {
    return (
      
        <footer className="bg-yellow-900 text-gray-300 ">
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
               
               {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

                    {/*section 1 */}
                    <div>
                    <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
                    <ul className="space-y-4">
                        <li><Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link></li>
                        <li><Link href="/menu" className="hover:text-yellow-400 transition-colors">Menu</Link></li>
                        <li><Link href="/about" className="hover:text-yellow-400 transition-colors">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link></li>
                        <li><Link href="/faqs" className="hover:text-yellow-400 transition-colors">FAQs</Link></li>
                        <li><Link href="/terms" className="hover:text-yellow-400 transition-colors">Terms of Service</Link></li>
                        <li><Link href="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link></li>
                    </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Our Menu</h3>
                        <ul className="space-y-4">
                            <li><Link href="/menu?category=bento" className="hover:text-yellow-400 transition-colors">Bento Boxes</Link></li>
                            <li><Link href="/menu?category=sides" className="hover:text-yellow-400 transition-colors">Sides</Link></li>
                            <li><Link href="/menu?category=drinks" className="hover:text-yellow-400 transition-colors">Drinks</Link></li>
                            <li><Link href="/menu?category=desserts" className="hover:text-yellow-400 transition-colors">Desserts</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
                        <div className="space-y-4">
                            <p>
                                <span className="text-white">Address:</span><br />
                                123 Sukhumvit Street,<br />
                                Bangkok, Thailand
                            </p>
                            <p>
                                <span className="text-white">Email:</span><br />
                                <a href="mailto:hello@bentobop.com" className="hover:text-yellow-400 transition-colors">hello@bentobop.com</a>
                            </p>
                            <p>
                                <span className="text-white">Phone:</span><br />
                                <a href="tel:+6621234567" className="hover:text-yellow-400 transition-colors">+66 2 123 4567</a>
                            </p>
                        </div>
                    </div>

                </div>

            {/* Footer Bottom */}
            <div className="flex justify-center gap-6 mt-12 pt-8 border-t border-yellow-800">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" >
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
                </a>
            </div>

            <div className="text-center text-gray-400 text-sm mt-8">
                © {new Date().getFullYear()} BentoBop. All rights reserved.
            </div>
            </div>
        </footer>
       
            );
}