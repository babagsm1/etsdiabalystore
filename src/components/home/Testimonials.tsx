
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { addTestimonial, getApprovedTestimonials } from '@/lib/data';
import { Testimonial } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const TestimonialCard = ({ testimonial, className }: { testimonial: Testimonial; className?: string }) => (
  <div className={cn(
    "bg-white rounded-xl shadow-sm p-6 border border-border/40",
    "transform transition-all hover:shadow-md",
    className
  )}>
    <div className="flex items-center space-x-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={16} 
          className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
        />
      ))}
    </div>
    <blockquote className="text-foreground/90 mb-4">"{testimonial.comment}"</blockquote>
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-foreground">{testimonial.name}</p>
        <p className="text-sm text-muted-foreground">{testimonial.country}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', country: '', comment: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Charger uniquement les témoignages approuvés pour l'affichage public
    setTestimonials(getApprovedTestimonials());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'rating' ? parseInt(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation
    if (!formData.name || !formData.country || !formData.comment) {
      toast({
        title: "Erreur de formulaire",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Add the new testimonial - it will be pending until approved
      addTestimonial(formData);
      
      // Reset form
      setFormData({ name: '', country: '', comment: '', rating: 5 });
      
      toast({
        title: "Merci pour votre avis !",
        description: "Votre commentaire a été soumis et sera affiché après modération.",
      });
    } catch (error) {
      toast({
        title: "Une erreur est survenue",
        description: "Impossible d'ajouter votre commentaire pour le moment. Veuillez réessayer plus tard.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex((currentIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((currentIndex - 1 + testimonials.length) % testimonials.length);
  };

  // S'assurer qu'il y a suffisamment de témoignages à afficher
  if (testimonials.length === 0) {
    return null;
  }

  const displayedTestimonials = testimonials.slice(currentIndex, currentIndex + 3);
  if (displayedTestimonials.length < 3 && testimonials.length >= 3) {
    displayedTestimonials.push(...testimonials.slice(0, 3 - displayedTestimonials.length));
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-foreground mb-4">
            Ce que nos clients disent
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez les expériences de nos clients et pourquoi ils nous font confiance pour leurs besoins en informatique et téléphonie.
          </p>
        </div>

        <div className="mb-16">
          <div className="hidden lg:grid grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {displayedTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:hidden relative">
            <AnimatePresence mode="wait">
              {testimonials.length > 0 && (
                <motion.div
                  key={testimonials[currentIndex].id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto max-w-md"
                >
                  <TestimonialCard testimonial={testimonials[currentIndex]} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white/90 border border-border/40 shadow-sm hover:bg-primary/5 transition-colors"
                aria-label="Commentaire précédent"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white/90 border border-border/40 shadow-sm hover:bg-primary/5 transition-colors"
                aria-label="Commentaire suivant"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-secondary/70 rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-display font-medium mb-6 text-center">Partagez votre expérience</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="glass-input w-full"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-foreground mb-1">
                  Pays
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="glass-input w-full"
                  placeholder="Votre pays"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-foreground mb-1">
                Votre avis
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                value={formData.comment}
                onChange={handleChange}
                className="glass-input w-full"
                placeholder="Partagez votre expérience avec nous..."
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-foreground mb-1">
                Note
              </label>
              <select
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="glass-input w-full"
              >
                <option value="5">5 étoiles - Excellent</option>
                <option value="4">4 étoiles - Très bien</option>
                <option value="3">3 étoiles - Bien</option>
                <option value="2">2 étoiles - Moyen</option>
                <option value="1">1 étoile - Décevant</option>
              </select>
            </div>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer mon avis'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
