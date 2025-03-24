
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ShopSettings as ShopSettingsType } from '@/lib/types';

const ShopSettings = () => {
  const [settings, setSettings] = useState<ShopSettingsType>({
    general: {
      shopName: 'Établissement DIABALY',
      shopEmail: 'contact@etablissement-diabaly.com',
      shopPhone: '+228 90 90 90 90',
      shopAddress: 'Lomé, Togo',
      enableFeaturedProducts: true,
      enableTestimonials: true,
    },
    shipping: {
      freeShippingThreshold: 100000,
      deliveryFee: 2000,
      estimatedDeliveryTime: '2-3 jours ouvrables',
    },
    payment: {
      acceptMobileMoney: true,
      acceptCashOnDelivery: true,
      acceptBankTransfer: false,
      paymentInstructions: 'Pour les paiements par mobile money, veuillez contacter notre service client après avoir passé commande.',
    },
  });
  
  const { toast } = useToast();
  
  // Load settings from localStorage if available
  useEffect(() => {
    const savedSettings = localStorage.getItem('ets_diabaly_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);
  
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      general: {
        ...settings.general,
        [name]: value,
      },
    });
  };
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      shipping: {
        ...settings.shipping,
        [name]: name === 'freeShippingThreshold' || name === 'deliveryFee' ? Number(value) : value,
      },
    });
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      payment: {
        ...settings.payment,
        [name]: value,
      },
    });
  };
  
  const handleToggleChange = (field: string, section: 'general' | 'payment') => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: !settings[section][field],
      },
    });
  };
  
  const handleSaveSettings = () => {
    localStorage.setItem('ets_diabaly_settings', JSON.stringify(settings));
    toast({
      title: "Paramètres sauvegardés",
      description: "Les paramètres de la boutique ont été mis à jour avec succès.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Paramètres Généraux</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shopName">Nom de la boutique</Label>
              <Input 
                id="shopName" 
                name="shopName" 
                value={settings.general.shopName} 
                onChange={handleGeneralChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shopEmail">Email de contact</Label>
              <Input 
                id="shopEmail" 
                name="shopEmail" 
                type="email" 
                value={settings.general.shopEmail} 
                onChange={handleGeneralChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shopPhone">Téléphone</Label>
              <Input 
                id="shopPhone" 
                name="shopPhone" 
                value={settings.general.shopPhone} 
                onChange={handleGeneralChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shopAddress">Adresse</Label>
              <Input 
                id="shopAddress" 
                name="shopAddress" 
                value={settings.general.shopAddress} 
                onChange={handleGeneralChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="enableFeaturedProducts">Activer les produits en vedette</Label>
              <Switch 
                id="enableFeaturedProducts" 
                checked={settings.general.enableFeaturedProducts} 
                onCheckedChange={() => handleToggleChange('enableFeaturedProducts', 'general')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enableTestimonials">Activer les témoignages</Label>
              <Switch 
                id="enableTestimonials" 
                checked={settings.general.enableTestimonials} 
                onCheckedChange={() => handleToggleChange('enableTestimonials', 'general')}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Paramètres de Livraison</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="freeShippingThreshold">Seuil de livraison gratuite (FCFA)</Label>
              <Input 
                id="freeShippingThreshold" 
                name="freeShippingThreshold" 
                type="number" 
                value={settings.shipping.freeShippingThreshold} 
                onChange={handleShippingChange}
              />
              <p className="text-sm text-muted-foreground">La livraison sera gratuite pour les commandes au-dessus de ce montant</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryFee">Frais de livraison (FCFA)</Label>
              <Input 
                id="deliveryFee" 
                name="deliveryFee" 
                type="number" 
                value={settings.shipping.deliveryFee} 
                onChange={handleShippingChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedDeliveryTime">Délai de livraison estimé</Label>
              <Input 
                id="estimatedDeliveryTime" 
                name="estimatedDeliveryTime" 
                value={settings.shipping.estimatedDeliveryTime} 
                onChange={handleShippingChange}
              />
              <p className="text-sm text-muted-foreground">Ex: 2-3 jours ouvrables</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Paramètres de Paiement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="acceptMobileMoney">Accepter les paiements Mobile Money</Label>
              <Switch 
                id="acceptMobileMoney" 
                checked={settings.payment.acceptMobileMoney} 
                onCheckedChange={() => handleToggleChange('acceptMobileMoney', 'payment')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="acceptCashOnDelivery">Accepter le paiement à la livraison</Label>
              <Switch 
                id="acceptCashOnDelivery" 
                checked={settings.payment.acceptCashOnDelivery} 
                onCheckedChange={() => handleToggleChange('acceptCashOnDelivery', 'payment')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="acceptBankTransfer">Accepter les virements bancaires</Label>
              <Switch 
                id="acceptBankTransfer" 
                checked={settings.payment.acceptBankTransfer} 
                onCheckedChange={() => handleToggleChange('acceptBankTransfer', 'payment')}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="paymentInstructions">Instructions de paiement</Label>
            <textarea 
              id="paymentInstructions" 
              name="paymentInstructions" 
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
              value={settings.payment.paymentInstructions} 
              onChange={handlePaymentChange}
            />
            <p className="text-sm text-muted-foreground">Ces instructions seront affichées aux clients lors du processus de commande</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Sauvegarder les paramètres</Button>
      </div>
    </div>
  );
};

export default ShopSettings;
