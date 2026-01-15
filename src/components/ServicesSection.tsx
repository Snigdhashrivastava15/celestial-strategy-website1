import { motion } from "framer-motion";
import { Crown, Building2, Users, TrendingUp, Calendar, Shield, Home, Zap, AlertTriangle, Star } from "lucide-react";
import { useEffect, useState } from "react";
import SwastikIcon from "./SwastikIcon";
import { apiUrl } from "@/lib/api";

// DEMO-ONLY: Static fallback data
const staticServices = [
  { icon: Crown, title: "The Celestial Strategy™", description: "Long-term strategic guidance for CXOs, industrialists, and public figures.", category: "Executive" },
  { icon: Building2, title: "The Destiny Architecture™", description: "Structuring personal and professional life with planetary cycles.", category: "Personal" },
  { icon: Users, title: "The Maharaja Protocol™", description: "Generational legacy and succession planning for distinguished families.", category: "Legacy" },
  { icon: TrendingUp, title: "Cosmic Capital Advisory™", description: "Precision timing for wealth accumulation and business decisions.", category: "Wealth" },
  { icon: Calendar, title: "The Boardroom Muhurta™", description: "Timing validation for critical corporate decisions and launches.", category: "Corporate" },
  { icon: Shield, title: "The Legacy Continuum™", description: "Securing next-generation stability and sustained growth.", category: "Legacy" },
  { icon: SwastikIcon, title: "Union Intelligence™", description: "Compatibility advisory for elite marriages and business partnerships.", category: "Relationships" },
  { icon: Home, title: "The Spatial Sovereignty™", description: "Vastu guidance for power, control, and positive influence.", category: "Vastu" },
  { icon: Zap, title: "The Energetic Optimization™", description: "Precision remedies designed for high performers.", category: "Remedies" },
  { icon: AlertTriangle, title: "The Black Swan Protocol™", description: "Crisis timing and emergency advisory for unforeseen challenges.", category: "Crisis" },
  { icon: Star, title: "The Inner Circle Retainer™", description: "Ongoing subscription-based strategic astrological consultation.", category: "Retainer" },
];

const iconMap: { [key: string]: any } = {
  'The Celestial Strategy™': Crown,
  'The Destiny Architecture™': Building2,
  'The Maharaja Protocol™': Users,
  'Cosmic Capital Advisory™': TrendingUp,
  'The Boardroom Muhurta™': Calendar,
  'The Legacy Continuum™': Shield,
  'Union Intelligence™': SwastikIcon,
  'The Spatial Sovereignty™': Home,
  'The Energetic Optimization™': Zap,
  'The Black Swan Protocol™': AlertTriangle,
  'The Inner Circle Retainer™': Star,
};

interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  shortDescription?: string;
}

const ServicesSection = () => {
  const [services, setServices] = useState(staticServices);
  const [loading, setLoading] = useState(true);

  // DEMO-ONLY: Fetch services from API, fallback to static data
  useEffect(() => {
      fetch(apiUrl('services/demo'))
      .then(res => res.json())
      .then(data => {
        // Map API data to component format with icons
        const mappedServices = data.map((service: Service) => ({
          icon: iconMap[service.title] || Crown,
          title: service.title,
          description: service.shortDescription || service.description,
          category: service.category,
        }));
        setServices(mappedServices);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load services from API, using static data:', err);
        setLoading(false);
        // Keep staticServices as fallback
      });
  }, []);

  return (
    <section id="services" className="py-24 bg-muted/30 pattern-overlay">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <span className="text-sm font-body tracking-[0.3em] uppercase text-secondary">Our Expertise</span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-6 deco-line">Premium Advisory Services</h2>
          <p className="font-body text-foreground/70 max-w-2xl mx-auto mt-8">Bespoke astrological solutions crafted for those who demand excellence in every dimension of life.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group card-elegant p-8 hover:bg-card">
              <span className="inline-block text-xs font-body tracking-[0.2em] uppercase text-secondary mb-4">{service.category}</span>
              <div className="w-12 h-12 rounded bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                <service.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-3">{service.title}</h3>
              <p className="font-body text-foreground/60 leading-relaxed">{service.description}</p>
              <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-body tracking-wide">Learn More</span>
                <span className="text-lg">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
