import Hero from '@/components/Hero';
import Feature from '@/components/Feature';
import Navbar from '@/components/Navbar';
import Technology from '@/components/Technology';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function Home() {
  return (
    <>
      <SEO
        url={`https://co-chat.vercel.app/`}
        openGraphType="website"
        schemaType="LandingPage"
        title="CoChat"
        description="CoChat hadir untuk memberikan kedaulatan layanan pesan sementara secara instan Indonesia dengan keamanan yang terjamin."
        image="/logo.png"
      />
      <Navbar />
      <Hero />
      <Feature />
      <Technology />
      <FAQ />
      <Footer />
    </>
  );
}
