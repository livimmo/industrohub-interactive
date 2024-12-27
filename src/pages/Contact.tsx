import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  subject: z.string({
    required_error: "Veuillez sélectionner un objet",
  }),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
  consent: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter la politique de confidentialité",
  }),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Simuler l'envoi du formulaire
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(values);
      toast.success(
        "Votre message a bien été envoyé. Nous reviendrons vers vous sous 24h."
      );
      form.reset();
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer ultérieurement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: "Adresse",
      value: "Indupros, Quartier des Affaires, Casablanca, Maroc",
      action: () =>
        window.open(
          "https://www.google.com/maps/search/?api=1&query=Casablanca+Maroc"
        ),
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: "+212 5 22 123 456",
      action: () => window.open("tel:+212522123456"),
    },
    {
      icon: Mail,
      label: "Email",
      value: "contact@indupros.ma",
      action: () => window.open("mailto:contact@indupros.ma"),
    },
    {
      icon: Clock,
      label: "Horaires",
      value: "Lundi - Vendredi : 9h - 18h\nSamedi : 9h - 13h",
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://facebook.com",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com",
    },
    {
      icon: MessageSquare,
      label: "WhatsApp",
      href: "https://wa.me/212522123456",
    },
  ];

  const faqItems = [
    {
      question: "Comment planifier une visite d'un bien ?",
      answer:
        "Pour planifier une visite, vous pouvez nous contacter directement par téléphone ou remplir le formulaire de contact en sélectionnant 'Réservation de visite' comme objet. Notre équipe vous recontactera dans les plus brefs délais pour organiser la visite selon vos disponibilités.",
    },
    {
      question: "Quels sont vos horaires d'ouverture ?",
      answer:
        "Nos bureaux sont ouverts du lundi au vendredi de 9h à 18h et le samedi de 9h à 13h. En dehors de ces horaires, vous pouvez nous contacter par email ou via le formulaire de contact.",
    },
    {
      question: "Puis-je télécharger les documents des biens directement ?",
      answer:
        "Oui, une fois connecté à votre compte, vous pouvez accéder à tous les documents relatifs aux biens qui vous intéressent directement depuis leur fiche détaillée.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] bg-[url('/hero-contact.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative h-full flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Contactez-nous dès aujourd'hui !
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 animate-fade-in">
            Notre équipe est prête à répondre à vos questions et vous accompagner
            dans vos projets immobiliers industriels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Button
              size="lg"
              onClick={() => {
                const formElement = document.getElementById("contact-form");
                formElement?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Remplir le formulaire
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20"
              onClick={() => window.open("tel:+212522123456")}
            >
              Appeler directement
            </Button>
          </div>
        </div>
      </section>

      <div className="container py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer"
                  onClick={item.action}
                >
                  <item.icon className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold">{item.label}</h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Suivez-nous</h2>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-accent hover:bg-accent/80 transition-colors"
                  >
                    <link.icon className="w-6 h-6" />
                    <span className="sr-only">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Questions fréquentes
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Contact Form */}
          <div id="contact-form" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Envoyez-nous un message</h2>
              <p className="text-muted-foreground">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans
                les plus brefs délais.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom et Prénom *</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+212 6 XX XX XX XX"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objet de la demande *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un objet" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="information">
                            Demande d'information
                          </SelectItem>
                          <SelectItem value="visit">
                            Réservation de visite
                          </SelectItem>
                          <SelectItem value="support">
                            Support technique
                          </SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Votre message..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          J'accepte la politique de confidentialité *
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="h-[400px] bg-accent">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.72692091109!2d-7.669552299999999!3d33.5731104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca!5e0!3m2!1sfr!2sma!4v1650000000000!5m2!1sfr!2sma"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
};

export default Contact;