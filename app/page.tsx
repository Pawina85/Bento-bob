import Navbar from '@/Components/Navbar';
import Hero from '@/Components/Hero';
import PromoBanner from '@/Components/PromoBanner';
import MenuSection from '@/Components/MenuSection';
import Footer from '@/Components/Footer';

export default function Home() {
  return (  
    <>
    <PromoBanner />
      <Navbar />
      <main className="min-h-screen bg-white ">
      <Hero />
      <MenuSection />
      <Footer />
     </main>
     </>
  );
}
