
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-secondary py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-xl font-display font-medium">Établissement DIABALY</h3>
          <p className="text-muted-foreground">
            Votre partenaire de confiance pour tous vos besoins en informatique et téléphonie.
          </p>
          <div className="flex items-center space-x-4">
            <a href="https://facebook.com" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://twitter.com" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="https://instagram.com" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <h3 className="text-xl font-display font-medium">Liens Rapides</h3>
          <nav className="flex flex-col space-y-2">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Accueil</Link>
            <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">Boutique</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            <Link to="/admin" className="text-muted-foreground hover:text-primary transition-colors">Administration</Link>
          </nav>
        </div>
        
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h3 className="text-xl font-display font-medium">Contactez-nous</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Phone size={16} className="text-primary" />
              <a href="https://wa.me/22891306789" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">+228 91306789 (WhatsApp)</a>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={16} className="text-primary" />
              <a href="tel:+22891306789" className="text-muted-foreground hover:text-primary transition-colors">+228 91306789</a>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={16} className="text-primary" />
              <a href="mailto:contact@etsdiabaly.com" className="text-muted-foreground hover:text-primary transition-colors">contact@etsdiabaly.com</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-foreground/10">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {currentYear} Établissement DIABALY. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
