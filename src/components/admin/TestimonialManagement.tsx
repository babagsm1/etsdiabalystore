
import { useState, useEffect } from 'react';
import { getTestimonials, updateTestimonialStatus } from '@/lib/data';
import { Testimonial } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = () => {
    setTestimonials(getTestimonials());
  };

  const handleStatusChange = (id: string, status: 'approved' | 'rejected') => {
    const result = updateTestimonialStatus(id, status);
    
    if (result) {
      loadTestimonials();
      toast({
        title: status === 'approved' ? 'Témoignage approuvé' : 'Témoignage rejeté',
        description: 'Le statut du témoignage a été mis à jour avec succès.',
      });
    }
  };

  const filteredTestimonials = testimonials.filter(testimonial => 
    testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500 text-white">Approuvé</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 text-white">Rejeté</Badge>;
      default:
        return <Badge className="bg-yellow-500 text-white">En attente</Badge>;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-white rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Gestion des témoignages</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Approuvez ou rejetez les témoignages des clients. Seuls les témoignages approuvés seront affichés sur le site.
        </p>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Témoignage</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTestimonials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center p-4 text-muted-foreground">
                    Aucun témoignage trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredTestimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.country}</div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <div className="whitespace-normal line-clamp-2">{testimonial.comment}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {testimonial.rating}
                        <Star size={14} className="ml-1 text-yellow-400 fill-yellow-400" />
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(testimonial.date)}</TableCell>
                    <TableCell>{getStatusBadge(testimonial.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {testimonial.status !== 'approved' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-green-500 text-green-500 hover:bg-green-50"
                            onClick={() => handleStatusChange(testimonial.id, 'approved')}
                          >
                            <Check size={16} className="mr-1" />
                            Approuver
                          </Button>
                        )}
                        
                        {testimonial.status !== 'rejected' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-red-500 text-red-500 hover:bg-red-50"
                            onClick={() => handleStatusChange(testimonial.id, 'rejected')}
                          >
                            <X size={16} className="mr-1" />
                            Rejeter
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TestimonialManagement;
