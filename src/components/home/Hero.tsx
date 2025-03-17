
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
        <div 
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1581993192008-63e896f4f744?q=80&w=2069&auto=format&fit=crop")', opacity: 0.15 }}
        />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
            Votre spécialiste en informatique et téléphonie
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight max-w-4xl mb-4"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/90">Établissement</span>{" "}
          <span className="text-foreground">DIABALY</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8"
        >
          Découvrez notre sélection premium d'ordinateurs et de téléphones des plus grandes marques à des prix compétitifs.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Link to="/shop">
            <AnimatedButton size="lg" className="group w-full sm:w-auto">
              <span>Découvrir nos produits</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </AnimatedButton>
          </Link>
          <Link to="/contact">
            <AnimatedButton variant="outline" size="lg" className="w-full sm:w-auto">
              Nous contacter
            </AnimatedButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
