
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AdminPasswordProtectionProps {
  onSuccess: () => void;
}

const AdminPasswordProtection: React.FC<AdminPasswordProtectionProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const ADMIN_PASSWORD = 'Admindiabaly@2025';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      toast.error('Mot de passe incorrect');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Accès Administration
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Veuillez saisir le mot de passe administrateur
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
              className="w-full"
            />
          </div>
          <div>
            <Button 
              type="submit" 
              className="w-full"
            >
              Connexion
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPasswordProtection;
