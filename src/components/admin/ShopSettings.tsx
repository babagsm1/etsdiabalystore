
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { Settings, Banknote, Truck, Store } from 'lucide-react';

// Simuler un stockage des paramètres
const getShopSettings = () => {
  const storedSettings = localStorage.getItem('ets_diabaly_settings');
  return storedSettings ? JSON.parse(storedSettings) : {
    general: {
      shopName: 'ETS DIABALY',
      shopEmail: 'contact@etsdiabaly.com',
      shopPhone: '+228 91 89 45 68',
      shopAddress: 'Lomé, Togo',
      enableFeaturedProducts: true,
      enableTestimonials: true
    },
    shipping: {
      freeShippingThreshold: 100000,
      deliveryFee: 5000,
      estimatedDeliveryTime: '2-5 jours'
    },
    payment: {
      acceptMobileMoney: true,
      acceptCashOnDelivery: true,
      acceptBankTransfer: false,
      paymentInstructions: 'Les détails de paiement vous seront envoyés par email après confirmation de la commande.'
    }
  };
};

const saveShopSettings = (settings: any) => {
  localStorage.setItem('ets_diabaly_settings', JSON.stringify(settings));
};

const ShopSettings = () => {
  const [settings, setSettings] = useState(getShopSettings());
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      general: {
        ...prev.general,
        [name]: value
      }
    }));
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        [name]: name.includes('fee') || name.includes('Threshold') ? parseInt(value) : value
      }
    }));
  };

  const handleSwitchChange = (checked: boolean, section: string, name: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: checked
      }
    }));
  };

  const handlePaymentInstructionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSettings(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        paymentInstructions: e.target.value
      }
    }));
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simuler un délai d'API
    setTimeout(() => {
      saveShopSettings(settings);
      toast({
        title: "Paramètres enregistrés",
        description: "Les paramètres de la boutique ont été mis à jour avec succès."
      });
      setIsSaving(false);
    }, 800);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Paramètres de la boutique</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span>Général</span>
            </TabsTrigger>
            <TabsTrigger value="shipping" className="flex items-center gap-1">
              <Truck className="h-4 w-4" />
              <span>Livraison</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-1">
              <Banknote className="h-4 w-4" />
              <span>Paiement</span>
            </TabsTrigger>
            <TabsTrigger value="store" className="flex items-center gap-1">
              <Store className="h-4 w-4" />
              <span>Boutique</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
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
                <Label htmlFor="shopEmail">Email</Label>
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
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableFeaturedProducts">Activer les produits en vedette</Label>
                  <p className="text-sm text-muted-foreground">
                    Afficher la section des produits en vedette sur la page d'accueil
                  </p>
                </div>
                <Switch
                  id="enableFeaturedProducts"
                  checked={settings.general.enableFeaturedProducts}
                  onCheckedChange={(checked) => handleSwitchChange(checked, 'general', 'enableFeaturedProducts')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableTestimonials">Activer les témoignages</Label>
                  <p className="text-sm text-muted-foreground">
                    Afficher la section témoignages sur la page d'accueil
                  </p>
                </div>
                <Switch
                  id="enableTestimonials"
                  checked={settings.general.enableTestimonials}
                  onCheckedChange={(checked) => handleSwitchChange(checked, 'general', 'enableTestimonials')}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping" className="space-y-4">
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
                <p className="text-xs text-muted-foreground">
                  La livraison sera gratuite pour les commandes dépassant ce montant
                </p>
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
                <p className="text-xs text-muted-foreground">
                  Exemple: "2-5 jours ouvrables"
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="payment" className="space-y-4">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="acceptMobileMoney">Mobile Money</Label>
                  <p className="text-sm text-muted-foreground">
                    Accepter les paiements par Mobile Money (T-Money, Flooz, etc)
                  </p>
                </div>
                <Switch
                  id="acceptMobileMoney"
                  checked={settings.payment.acceptMobileMoney}
                  onCheckedChange={(checked) => handleSwitchChange(checked, 'payment', 'acceptMobileMoney')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="acceptCashOnDelivery">Paiement à la livraison</Label>
                  <p className="text-sm text-muted-foreground">
                    Permettre aux clients de payer à la réception de leur commande
                  </p>
                </div>
                <Switch
                  id="acceptCashOnDelivery"
                  checked={settings.payment.acceptCashOnDelivery}
                  onCheckedChange={(checked) => handleSwitchChange(checked, 'payment', 'acceptCashOnDelivery')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="acceptBankTransfer">Virement bancaire</Label>
                  <p className="text-sm text-muted-foreground">
                    Accepter les paiements par virement bancaire
                  </p>
                </div>
                <Switch
                  id="acceptBankTransfer"
                  checked={settings.payment.acceptBankTransfer}
                  onCheckedChange={(checked) => handleSwitchChange(checked, 'payment', 'acceptBankTransfer')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="paymentInstructions">Instructions de paiement</Label>
                <Textarea
                  id="paymentInstructions"
                  rows={4}
                  value={settings.payment.paymentInstructions}
                  onChange={handlePaymentInstructionsChange}
                  placeholder="Instructions pour le paiement (ex: coordonnées bancaires, procédure, etc.)"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="store" className="space-y-4">
            <div className="p-8 text-center text-muted-foreground">
              Plus de paramètres de boutique seront ajoutés dans les prochaines mises à jour.
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveSettings} disabled={isSaving}>
            {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopSettings;
