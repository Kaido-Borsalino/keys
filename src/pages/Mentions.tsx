
import React from 'react';
import Footer from '../components/Footer';

export default function Mentions() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 dark:text-neutral-100">
      <div className="container mx-auto px-4 py-16 max-w-3xl prose dark:prose-invert">
        <h1>Mentions légales</h1>
        <p><strong>Dernière mise à jour :</strong> 17/09/2025</p>
        
<h2>Éditeur du site</h2>
<p>SpeedKeyShop — Informations légales de l’éditeur (nom, adresse, SIRET si applicable).</p>
<h2>Hébergeur</h2>
<p>Netlify, Inc. — San Francisco, CA (ou autre selon ton hébergeur).</p>
<h2>Contact</h2>
<p>support@votredomaine.com</p>

      </div>
      <Footer />
    </div>
  );
}
