
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = ({ cartItemCount = 0 }: { cartItemCount?: number }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Boutique', path: '/shop' },
    { name: 'Contact', path: '/contact' },
  ];

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          aria-label="Établissement DIABALY - Retour à l'accueil"
        >
          <span className={cn(
            "font-display font-bold text-xl transition-colors",
            isScrolled ? "text-primary" : "text-primary"
          )}>
            Établissement DIABALY
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === item.path 
                  ? "text-primary"
                  : "text-foreground/80"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link 
            to="/cart" 
            className="relative p-2 text-foreground/80 hover:text-primary transition-colors"
            aria-label="Voir le panier"
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link to="/admin">
            <Button variant="ghost" size="sm" className="font-medium">Admin</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <Link 
            to="/cart" 
            className="relative p-2 text-foreground/80 hover:text-primary transition-colors"
            aria-label="Voir le panier"
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                {cartItemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-foreground/80 hover:text-primary transition-colors"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden absolute left-0 right-0 px-6 py-4 bg-white/95 backdrop-blur-lg shadow-md transition-all duration-300 ease-in-out",
          isMobileMenuOpen 
            ? "top-full opacity-100 translate-y-0" 
            : "top-full opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-4 pb-4">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "text-sm font-medium p-2 rounded-md transition-colors",
                location.pathname === item.path 
                  ? "text-primary bg-primary/5"
                  : "text-foreground/80 hover:text-primary hover:bg-primary/5"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link 
            to="/admin"
            className="text-sm font-medium p-2 rounded-md transition-colors text-foreground/80 hover:text-primary hover:bg-primary/5"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
