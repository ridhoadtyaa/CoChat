import Hero from '../components/Hero';
import Feature from '../components/Feature';
import Navbar from '../components/Navbar';
import Technology from '../components/Technology';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Feature />
      <Technology />
      <FAQ />
      <Footer />
    </>
  );
}
