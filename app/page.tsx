import Navbar from '@/Components/Navbar';
import Hero from '@/Components/Hero';
import PromoBanner from '@/Components/PromoBanner';

export default function Home() {
  return (  
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16 md:pt-20">
      <PromoBanner />
      <Hero />
     </main>
     </>
  );
}
