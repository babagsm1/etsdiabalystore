
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowLeft, ArrowRight, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { addTestimonial, getApprovedTestimonials } from '@/lib/data';
import { Testimonial } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const TestimonialForm = ({ onSubmit, isSubmitting }: { onSubmit: (formData: any) => void, isSubmitting: boolean }) => {
  const [formData, setFormData] = useState({ name: '', country: '', comment: '', rating: 5 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (value: string) => {
    setFormData(prev => ({ ...prev, rating: parseInt(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Votre nom"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Pays</Label>
          <Input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Votre pays"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="comment">Votre avis</Label>
        <Textarea
          id="comment"
          name="comment"
          rows={4}
          value={formData.comment}
          onChange={handleChange}
          placeholder="Partagez votre expérience avec nous..."
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="rating">Note</Label>
        <Select
          value={formData.rating.toString()}
          onValueChange={handleRatingChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une note" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 étoiles - Excellent</SelectItem>
            <SelectItem value="4">4 étoiles - Très bien</SelectItem>
            <SelectItem value="3">3 étoiles - Bien</SelectItem>
            <SelectItem value="2">2 étoiles - Moyen</SelectItem>
            <SelectItem value="1">1 étoile - Décevant</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours..." : "Envoyer mon avis"}
        </Button>
      </DialogFooter>
    </form>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Charger uniquement les témoignages approuvés pour l'affichage public
    setTestimonials(getApprovedTestimonials());
  }, []);

  const handleSubmit = (formData: any) => {
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
      
      toast({
        title: "Merci pour votre avis !",
        description: "Votre commentaire a été soumis et sera affiché après modération.",
      });

      setDialogOpen(false);
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
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Découvrez les expériences de nos clients et pourquoi ils nous font confiance pour leurs besoins en informatique et téléphonie.
          </p>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="mt-2 gap-2">
                <MessageSquare className="h-5 w-5" />
                Laisser un avis
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Partagez votre expérience</DialogTitle>
                <DialogDescription>
                  Votre avis est important pour nous et aide d'autres clients à faire leur choix.
                  Une fois soumis, votre témoignage sera affiché après modération.
                </DialogDescription>
              </DialogHeader>
              <TestimonialForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-10">
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
      </div>
    </section>
  );
};

export default Testimonials;
