
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-primary">
                Qui Sommes-Nous
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Découvrez l'histoire et les valeurs qui font d'Établissement DIABALY votre partenaire technologique de confiance.
              </p>
            </div>

            <Separator className="my-8" />

            {/* Company History Card */}
            <Card className="overflow-hidden bg-white/50 backdrop-blur border shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                  alt="Environnement de travail technologique" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-2">Plus de 17 ans d'expérience</Badge>
                    <h2 className="text-2xl font-bold text-white">Notre Histoire</h2>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-foreground/80 leading-relaxed">
                  Établissement DIABALY possède plus de 17 ans d'expertise dans le domaine de l'informatique et des nouvelles technologies. 
                  Notre parcours nous a façonné en tant que leader dans la fourniture de solutions informatiques innovantes et fiables.
                </p>
                <p className="mt-4 text-foreground/80 leading-relaxed">
                  Fondée avec une vision claire d'offrir des services informatiques de première qualité, 
                  notre entreprise a grandi progressivement pour devenir un acteur incontournable dans le secteur technologique en Afrique de l'Ouest.
                </p>
              </CardContent>
            </Card>

            {/* Regional Presence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <Card className="bg-white/50 backdrop-blur border shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-4">Notre Présence</h3>
                  <p className="text-foreground/80 leading-relaxed mb-4">
                    Nous opérons principalement au Togo, mais notre expertise s'étend bien au-delà des frontières nationales.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                    {['Togo', 'Côte d\'Ivoire', 'Bénin', 'Burkina Faso', 'Mali', 'Sénégal'].map((country) => (
                      <Badge key={country} variant="outline" className="justify-center py-1.5">
                        {country}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="bg-white/50 backdrop-blur border shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-4">Notre Mission</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Chez Établissement DIABALY, notre mission est d'offrir des produits technologiques de qualité à nos clients tout en assurant un excellent service clientèle.
                  </p>
                  <p className="text-foreground/80 leading-relaxed mt-4">
                    Nous nous engageons à fournir des solutions adaptées aux besoins spécifiques de chaque client, en privilégiant la qualité et l'innovation.
                  </p>
                </div>
              </Card>
            </div>

            {/* Achievements Section */}
            <Card className="mt-12 bg-white/50 backdrop-blur border shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-4">Nos Réalisations</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Expansion régionale</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Établissement d'une présence durable dans six pays d'Afrique de l'Ouest.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Partenariats stratégiques</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Collaboration avec des marques leaders dans le domaine de la technologie pour garantir des produits de qualité à nos clients.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Innovation continue</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Adoption et intégration constantes des dernières technologies pour répondre aux besoins évolutifs du marché.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Satisfaction client</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Développement d'une clientèle fidèle grâce à notre engagement envers l'excellence du service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
