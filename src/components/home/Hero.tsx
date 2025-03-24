
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { addTestimonial } from '@/lib/data';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewData, setReviewData] = useState({
    name: '',
    country: '',
    comment: '',
    rating: 5,
  });
  const { toast } = useToast();
  
  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRatingChange = (rating: number) => {
    setReviewData(prev => ({
      ...prev,
      rating
    }));
  };
  
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewData.name || !reviewData.country || !reviewData.comment) {
      toast({
        title: "Champs incomplets",
        description: "Veuillez remplir tous les champs du formulaire",
        variant: "destructive"
      });
      return;
    }
    
    try {
      addTestimonial(reviewData);
      
      toast({
        title: "Témoignage envoyé",
        description: "Merci pour votre avis ! Il sera visible après approbation par notre équipe."
      });
      
      setReviewDialogOpen(false);
      setReviewData({
        name: '',
        country: '',
        comment: '',
        rating: 5,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre témoignage.",
        variant: "destructive"
      });
    }
  };
  
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
          className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-8"
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
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button 
            onClick={() => setReviewDialogOpen(true)}
            variant="outline" 
            className="flex items-center gap-2 bg-primary/5 hover:bg-primary/10 border-primary/10 text-primary hover:text-primary hover:scale-105 transition-transform"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Laisser un avis</span>
          </Button>
        </motion.div>
      </div>
      
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Partagez votre expérience</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleReviewSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Votre nom</Label>
              <Input
                id="name"
                name="name"
                value={reviewData.name}
                onChange={handleReviewChange}
                placeholder="Entrez votre nom"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Pays</Label>
              <Input
                id="country"
                name="country"
                value={reviewData.country}
                onChange={handleReviewChange}
                placeholder="Votre pays"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rating">Note</Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="p-1"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= reviewData.rating 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="comment">Votre avis</Label>
              <textarea
                id="comment"
                name="comment"
                value={reviewData.comment}
                onChange={handleReviewChange}
                placeholder="Partagez votre expérience avec nous..."
                className="w-full h-24 px-3 py-2 text-base text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setReviewDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">Envoyer</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;
