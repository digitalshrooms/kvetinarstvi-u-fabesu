import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Sortiment from '@/components/Sortiment';
import Gallery from '@/components/Gallery';
import WhyUs from '@/components/WhyUs';
import Testimonials from '@/components/Testimonials';
import Process from '@/components/Process';
import InquiryForm from '@/components/InquiryForm';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-blush-50">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Sortiment />
        <Gallery />
        <Testimonials />
        <WhyUs />
        <Process />
        <InquiryForm />
        <About />
      </main>
      <Footer />
    </div>
  );
}
