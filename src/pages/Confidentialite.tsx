
import React from 'react';
import Footer from '../components/Footer';
export default function Confidentialite() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Politique de confidentialité</h1>
        <p>Nous collectons uniquement les données nécessaires au traitement des commandes (nom, email, informations de paiement).</p>
        <p>Vos données ne sont pas revendues. Elles sont stockées de manière sécurisée et utilisées uniquement pour le service.</p>
      </div>
      <Footer />
    </div>
  );
}
