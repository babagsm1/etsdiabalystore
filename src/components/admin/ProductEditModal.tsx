
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '@/lib/types';
import { X, Plus, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductEditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product;
}

const EMPTY_PRODUCT: Omit<Product, 'id'> = {
  name: '',
  description: '',
  price: 0,
  oldPrice: undefined,
  images: [''],
  category: '',
  featured: false,
  stock: 0
};

const ProductEditModal = ({ open, onClose, onSave, product }: ProductEditModalProps) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({...EMPTY_PRODUCT});
  const { toast } = useToast();
  const [newImageUrl, setNewImageUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isNew = !product?.id;

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({...EMPTY_PRODUCT});
    }
  }, [product, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'price' || name === 'oldPrice' || name === 'stock') {
      const numValue = name === 'oldPrice' && value === '' ? undefined : Number(value);
      setFormData(prev => ({ ...prev, [name]: numValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFeaturedChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, featured: checked }));
  };

  const handleAddImage = () => {
    if (!newImageUrl) {
      toast({
        title: "URL d'image requise",
        description: "Veuillez entrer l'URL d'une image",
        variant: "destructive"
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, newImageUrl]
    }));
    setNewImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    // Vérifier si c'est une image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Format non supporté",
        description: "Seules les images sont acceptées",
        variant: "destructive"
      });
      return;
    }
    
    // Convertir en Base64 pour stockage local
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, event.target!.result as string]
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) newErrors.name = "Le nom est requis";
    if (!formData.description) newErrors.description = "La description est requise";
    if (!formData.category) newErrors.category = "La catégorie est requise";
    if (formData.price <= 0) newErrors.price = "Le prix doit être supérieur à 0";
    if (formData.stock < 0) newErrors.stock = "Le stock ne peut pas être négatif";
    if (formData.images.length === 0) newErrors.images = "Au moins une image est requise";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    
    // S'assurer que oldPrice n'est pas inférieur au prix
    const submittedData = {
      ...formData,
      oldPrice: formData.oldPrice && formData.oldPrice <= formData.price ? undefined : formData.oldPrice
    };
    
    onSave({
      ...(product || { id: 'temp-id' }),
      ...submittedData
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? 'Ajouter un produit' : 'Modifier le produit'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du produit*</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie*</Label>
              <Input 
                id="category" 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                className={errors.category ? "border-red-500" : ""}
              />
              {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description*</Label>
            <textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows={3}
              className={`w-full rounded-md border ${errors.description ? "border-red-500" : "border-input"} px-3 py-2 text-sm`}
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Prix (FCFA)*</Label>
              <Input 
                id="price" 
                name="price" 
                type="number" 
                value={formData.price} 
                onChange={handleChange} 
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="oldPrice">Ancien prix (FCFA)</Label>
              <Input 
                id="oldPrice" 
                name="oldPrice" 
                type="number" 
                value={formData.oldPrice || ''} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stock">Stock*</Label>
              <Input 
                id="stock" 
                name="stock" 
                type="number" 
                value={formData.stock} 
                onChange={handleChange} 
                className={errors.stock ? "border-red-500" : ""}
              />
              {errors.stock && <p className="text-xs text-red-500">{errors.stock}</p>}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="featured" 
              checked={formData.featured} 
              onCheckedChange={handleFeaturedChange} 
            />
            <Label htmlFor="featured">Produit en vedette</Label>
          </div>
          
          <div className="space-y-2">
            <Label>Images*</Label>
            {errors.images && <p className="text-xs text-red-500">{errors.images}</p>}
            
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.images.map((image, index) => (
                <div key={index} className="relative w-20 h-20 border rounded-md overflow-hidden group">
                  <img 
                    src={image} 
                    alt={`Product ${index+1}`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Image+Error';
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <Label htmlFor="imageUrl">Ajouter une image via URL</Label>
                <div className="flex gap-2">
                  <Input 
                    id="imageUrl" 
                    value={newImageUrl} 
                    onChange={(e) => setNewImageUrl(e.target.value)} 
                    placeholder="https://exemple.com/image.jpg"
                  />
                  <Button 
                    type="button" 
                    onClick={handleAddImage} 
                    size="icon"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1">
                <Label htmlFor="imageFile">Ou via fichier local</Label>
                <label 
                  htmlFor="imageFile" 
                  className="flex items-center justify-center gap-2 border border-dashed rounded-md p-2 cursor-pointer hover:bg-secondary/50 transition-colors"
                >
                  <ImageIcon size={16} />
                  <span>Choisir une image</span>
                  <input 
                    type="file" 
                    id="imageFile" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>{isNew ? 'Ajouter' : 'Enregistrer'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductEditModal;
