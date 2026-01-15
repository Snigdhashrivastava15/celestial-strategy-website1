import { Helmet } from "react-helmet-async";
import { useBooking } from "@/contexts/BookingContext";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

const Index = () => {
  const { isBookingModalOpen, closeBookingModal } = useBooking();

  return (
    <>
      <Helmet>
        <title>Planet Nakshatra | Premium Vedic Astrology by Astrologer Sameer</title>
        <meta
          name="description"
          content="Exclusive astrological advisory for high-value individuals, executives, and distinguished families. Transform your destiny with Vedic wisdom from Astrologer Sameer."
        />
        <meta name="keywords" content="vedic astrology, premium astrology, astrologer sameer, planet nakshatra, executive astrology, business astrology, muhurta, corporate astrology" />
        <meta property="og:title" content="Planet Nakshatra | Premium Vedic Astrology" />
        <meta property="og:description" content="Exclusive astrological advisory for high-value individuals and executives." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://planetnakshatra.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>

      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
    </>
  );
};

export default Index;
