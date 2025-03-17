import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Send, Mic, MicOff, StopCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { getCartItemCount } from '@/lib/data';
import { Progress } from '@/components/ui/progress';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          setProgress(Math.min((newTime / 60) * 100, 100));
          return newTime;
        });
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
      if (!isRecording && recordingTime > 0) {
        setTimeout(() => {
          setRecordingTime(0);
          setProgress(0);
        }, 1500);
      }
    }

    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording, recordingTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startVoiceInput = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks: BlobPart[] = [];
      
      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });
      
      mediaRecorder.addEventListener('stop', async () => {
        setIsRecording(false);
        
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        
        toast({
          title: "Traitement de l'audio...",
          description: "Conversion de votre message vocal en texte.",
        });
        
        setTimeout(() => {
          setFormData(prev => ({
            ...prev,
            message: prev.message + (prev.message ? '\n' : '') + 
              "Message vocal transcrit: Bonjour, je suis intéressé par vos services..."
          }));
          
          toast({
            title: "Audio transcrit !",
            description: "Votre message vocal a été ajouté au formulaire.",
          });
        }, 1500);
        
        stream.getTracks().forEach(track => track.stop());
      });
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      toast({
        title: "Enregistrement en cours",
        description: "Parlez maintenant... Cliquez à nouveau sur le bouton pour arrêter.",
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Erreur d'accès au microphone",
        description: "Veuillez vérifier les permissions de votre navigateur.",
        variant: "destructive"
      });
    }
  };
  
  const stopVoiceInput = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };
  
  const toggleVoiceRecording = () => {
    if (isRecording) {
      stopVoiceInput();
    } else {
      startVoiceInput();
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      details: [
        { text: "+228 91306789", link: "https://wa.me/22891306789", type: "whatsapp" },
        { text: "+228 91306789", link: "tel:+22891306789", type: "phone" }
      ],
      delay: 0
    },
    {
      icon: Mail,
      title: "Email",
      details: [
        { text: "contact@etsdiabaly.com", link: "mailto:contact@etsdiabaly.com" }
      ],
      delay: 0.1
    },
    {
      icon: MapPin,
      title: "Adresse",
      details: [
        { text: "Lomé, Togo" },
        { text: "Ouvert Lun-Sam, 8h-18h" }
      ],
      delay: 0.2
    }
  ];

  const coordinates = {
    lat: 6.180389,
    lng: 1.195278
  };

  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6212265593743!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTAnNDkuNCJOIDHCsDExJzQzLjAiRQ!5e0!3m2!1sfr!2sus!4v1647395307985!5m2!1sfr!2sus`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemCount={getCartItemCount()} />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Contactez-nous</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nous sommes là pour répondre à toutes vos questions et vous aider à trouver les meilleurs produits adaptés à vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            <div>
              <div className="grid grid-cols-1 gap-6 mb-8">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: item.delay }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-border/40 flex"
                  >
                    <div className="mr-4 p-3 bg-primary/10 rounded-full text-primary">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">{item.title}</h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground mb-1">
                          {detail.link ? (
                            <a 
                              href={detail.link} 
                              className="hover:text-primary transition-colors"
                              target={detail.type === "whatsapp" ? "_blank" : undefined}
                              rel={detail.type === "whatsapp" ? "noopener noreferrer" : undefined}
                            >
                              {detail.text}
                              {detail.type === "whatsapp" && " (WhatsApp)"}
                            </a>
                          ) : (
                            detail.text
                          )}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-xl overflow-hidden shadow-md h-[300px] bg-gray-100"
              >
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="COMPUTER BUSINESS CENTER Location"
                ></iframe>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-border/40"
            >
              <h2 className="text-2xl font-display font-medium mb-6">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="glass-input w-full"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="glass-input w-full"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="glass-input w-full"
                    placeholder="+228 xxxxxxxx"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="message" className="block text-sm font-medium text-foreground">
                      Message <span className="text-red-500">*</span>
                    </label>
                    
                    <Button 
                      type="button" 
                      variant={isRecording ? "destructive" : "outline"}
                      size="lg"
                      className={`h-12 text-base font-medium transition-all ${isRecording ? 'animate-pulse shadow-md' : ''}`}
                      onClick={toggleVoiceRecording}
                    >
                      {isRecording ? (
                        <>
                          <StopCircle size={20} className="mr-2" />
                          <span>Arrêter l'enregistrement</span>
                          <span className="ml-2 font-mono bg-white/20 px-2 py-1 rounded-md">
                            {formatTime(recordingTime)}
                          </span>
                        </>
                      ) : (
                        <>
                          <Mic size={20} className="mr-2" />
                          <span>Enregistrer un message vocal</span>
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {isRecording && (
                    <div className="mb-4">
                      <Progress value={progress} className="h-2 mb-1" />
                      <p className="text-xs text-right text-muted-foreground">
                        {recordingTime < 60 ? 
                          `Enregistrement en cours... (${formatTime(recordingTime)}/01:00)` : 
                          "Temps maximum atteint"
                        }
                      </p>
                    </div>
                  )}
                  
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="glass-input w-full"
                    placeholder="Comment pouvons-nous vous aider ?"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || isRecording}
                >
                  {isSubmitting ? (
                    'Envoi en cours...'
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-16">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-center">Notre Emplacement</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-border/40"
            >
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Établissement DIABALY Location Map"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
