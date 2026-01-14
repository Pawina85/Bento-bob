'use client';
import Image from 'next/image';


export default function Hero() {
    const images = [
        { src: '/Image/hero1.jpg', alt: 'the restaurant' },
        { src: '/Image/bento.png', alt: 'Bento Box' },
        { src: '/Image/soup.png', alt: 'our menu' },
        
    ]
  return (
    <section className="px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-2">いらっしゃいませ </h1>
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">welcome to <span className="text-yellow-500 font-semibold">Bento Bop</span></p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-8 mb-12">
            {images.map((image, index) => (
                <div key={index} className="relative h-48 md:h-64 lg:h-72overflow-hidden rounded-2xl shadow-lg group">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        priority={index === 0}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"/>
                    </div>
            ))}
                    
            </div>          
                <a href="#menu" className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-lg px-8 py-3 rounded-full transition-all hover:scale-105 hover:shadow-lg">Explore Our Menu</a>
            
        </div>
    </section>
    );
    }