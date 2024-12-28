import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-gray-50 border-t ${className}`}>
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold">Indupros</h3>
            <p className="text-sm text-gray-600">
              La référence pour vos biens industriels et commerciaux en Belgique.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm text-gray-600 hover:text-gray-900">Accueil</a></li>
              <li><a href="#properties" className="text-sm text-gray-600 hover:text-gray-900">Biens</a></li>
              <li><a href="#about" className="text-sm text-gray-600 hover:text-gray-900">À propos</a></li>
              <li><a href="#contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">+32 0 000 00 00</li>
              <li className="text-sm text-gray-600">info@indupros.be</li>
              <li className="text-sm text-gray-600">Rue de l'Industrie 1</li>
              <li className="text-sm text-gray-600">1000 Bruxelles</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Suivez-nous</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600">
          <p>&copy; {currentYear} Indupros. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};