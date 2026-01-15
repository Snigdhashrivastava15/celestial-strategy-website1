import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import SwastikIcon from "./SwastikIcon";
import { useBooking } from "@/contexts/BookingContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openBookingModal } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const handleBookConsultation = () => {
    openBookingModal();
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
              <SwastikIcon size={20} className="text-foreground" />
            </div>
            <div>
              <span className="font-display text-xl text-foreground tracking-wide">Planet Nakshatra</span>
              <div className="text-xs text-muted-foreground tracking-[0.2em] uppercase">Vedic Wisdom</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-body font-medium text-foreground/80 hover:text-primary transition-colors tracking-wide uppercase">
                {link.name}
              </a>
            ))}
            <Button onClick={handleBookConsultation} variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground font-body tracking-wide uppercase text-sm">
              Book Consultation
            </Button>
          </nav>

          <button className="md:hidden text-foreground p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-background border-t border-border">
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-foreground/80 hover:text-primary transition-colors py-2 font-body tracking-wide uppercase text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </a>
              ))}
              <Button onClick={handleBookConsultation} variant="default" className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-body tracking-wide uppercase">
                Book Consultation
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
