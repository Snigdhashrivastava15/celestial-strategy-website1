import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-artdeco-bg.jpg";
import { useBooking } from "@/contexts/BookingContext";

const HeroSection = () => {
  const { openBookingModal } = useBooking();

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with Swastik pattern */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroImage})` }} />
      
      {/* Subtle darkening overlay for Swastik pattern - warm, muted tones (antique bronze & muted brown) */}
      {/* Increases visibility by ~8-10% while maintaining elegant, spiritual aesthetic */}
      <div className="absolute inset-0 swastik-darken-overlay" />
      
      {/* Subtle grain texture for natural blending - adds depth without distraction */}
      <div className="absolute inset-0 swastik-grain" />
      
      {/* Main gradient overlay for text readability - ensures content remains clear */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />

      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-secondary" />
            <Sparkles className="w-5 h-5 text-secondary" />
            <span className="text-sm font-body tracking-[0.3em] uppercase text-muted-foreground">Premium Astrological Advisory</span>
            <Sparkles className="w-5 h-5 text-secondary" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-secondary" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight drop-shadow-lg">
            Illuminate Your<span className="block text-gold-gradient mt-2 drop-shadow-md">Destiny</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="font-body text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Exclusive Vedic astrological guidance for distinguished individuals, executives, and families seeking clarity in life's most profound decisions.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={openBookingModal} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-body tracking-wide uppercase group">
              Begin Your Journey<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button onClick={scrollToServices} size="lg" variant="outline" className="border-foreground/20 text-foreground hover:bg-foreground/5 px-8 py-6 text-base font-body tracking-wide uppercase">
              Explore Services
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }} className="mt-16 pt-8 border-t border-border/50">
            <p className="text-xs font-body tracking-[0.2em] uppercase text-muted-foreground mb-6">Trusted by Leaders Across Industries</p>
            <div className="flex flex-wrap justify-center gap-8 text-muted-foreground/50">
              {["Fortune 500 CXOs", "Industrialists", "Public Figures", "Distinguished Families"].map((item, index) => (
                <span key={index} className="text-sm font-body tracking-wide">{item}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
