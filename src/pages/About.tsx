import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Building, Handshake, Users, Leaf, Award, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const testimonials = [
    {
      text: "Grâce à Indupros, nous avons trouvé l'espace industriel parfait pour notre activité. Une équipe professionnelle et un accompagnement exceptionnel !",
      author: "Mohamed El Amrani",
      position: "PDG de LogiMaroc",
    },
    {
      text: "Un service exceptionnel et une expertise inégalée dans le domaine de l'immobilier industriel.",
      author: "Sarah Bennani",
      position: "Directrice des Opérations, TechIndustrie",
    },
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Transparence",
      description: "Une communication claire et honnête avec nos clients",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Innovation",
      description: "Intégration de technologies avancées pour une meilleure expérience client",
    },
    {
      icon: <Handshake className="h-8 w-8" />,
      title: "Engagement",
      description: "Accompagnement personnalisé à chaque étape du projet",
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Durabilité",
      description: "Des projets respectueux de l'environnement et économiquement viables",
    },
  ];

  const achievements = [
    { number: "500+", label: "biens industriels commercialisés" },
    { number: "4", label: "grandes régions économiques couvertes" },
    { number: "200+", label: "partenaires et investisseurs accompagnés" },
  ];

  const team = [
    {
      name: "Mehdi Alaoui",
      position: "Directeur Général",
      image: "/placeholder.svg",
    },
    {
      name: "Karim Benjelloun",
      position: "Responsable Commercial",
      image: "/placeholder.svg",
    },
    {
      name: "Amina Tazi",
      position: "Responsable Technique",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Indupros : 20 Ans d'Excellence dans l'Immobilier Industriel au Maroc
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in">
            Votre partenaire de confiance pour des solutions immobilières
            industrielles adaptées et innovantes
          </p>
          <div className="flex gap-4 justify-center animate-fade-in-up">
            <Link to="/">
              <Button size="lg" variant="default">
                Parcourez nos biens
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20">
              Contactez-nous
            </Button>
          </div>
        </div>
      </div>

      {/* Notre Histoire */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Building className="h-12 w-12 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Depuis plus de <strong>20 ans</strong>, <strong>Indupros</strong> est
              un acteur majeur du <strong>secteur immobilier industriel au
              Maroc</strong>. Fondée sur une vision ambitieuse, notre entreprise
              s'est imposée comme un <strong>partenaire de confiance</strong> pour
              les investisseurs, les propriétaires et les entreprises à la
              recherche d'espaces industriels et commerciaux stratégiquement
              situés.
            </p>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Valeurs Fondamentales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto text-primary">{value.icon}</div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Réalisations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Réalisations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-primary">
                    {achievement.number}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{achievement.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Témoignages</h2>
          <div className="max-w-3xl mx-auto">
            <Carousel>
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <Card>
                      <CardContent className="p-6">
                        <p className="text-lg italic mb-4">{testimonial.text}</p>
                        <div className="text-right">
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-gray-600">
                            {testimonial.position}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Notre Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index}>
                <CardHeader>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-center">{member.name}</CardTitle>
                  <CardDescription className="text-center">
                    {member.position}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement RSE */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Leaf className="h-12 w-12 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl font-bold mb-6">Notre Engagement RSE</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Chez <strong>Indupros</strong>, nous croyons en une croissance
              responsable. Nos projets immobiliers respectent des normes strictes
              en matière de <strong>développement durable</strong> et visent à
              réduire leur <strong>empreinte écologique</strong> tout en
              favorisant un impact social positif.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Prêt à collaborer avec un expert de l'immobilier industriel au Maroc ?
          </h2>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
              Contactez-nous maintenant
            </Button>
            <Link to="/">
              <Button size="lg" variant="secondary">
                Parcourez nos offres immobilières
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;