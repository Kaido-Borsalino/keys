import React from 'react';
import Footer from '../components/Footer';

export default function CGV() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 dark:text-neutral-100">
      <div className="container mx-auto px-4 py-16 max-w-3xl prose dark:prose-invert">
        <h1>Conditions Générales de Vente</h1>
        <p><strong>Dernière mise à jour :</strong> 17/09/2025</p>
        
<h2>Objet</h2>
<p>Ces Conditions Générales de Vente encadrent la vente de licences logicielles numériques.</p>
<h2>Prix et paiement</h2>
<p>Les prix sont affichés en euros, TVA incluse le cas échéant. Paiement sécurisé par Stripe.</p>
<h2>Livraison</h2>
<p>La livraison est numérique. Les factures sont envoyées par email. Les clés sont transmises selon le produit.</p>
<h2>Droit de rétractation</h2>
<p>Le droit de rétractation ne s’applique pas aux contenus numériques fournis immédiatement après paiement et dont l’exécution a commencé avec votre accord.</p>
<h2>Garanties</h2>
<p>Nos licences sont destinées à un usage légal. Toute utilisation non conforme annule la garantie.</p>
<h2>Responsabilité</h2>
<p>Le vendeur ne saurait être tenu responsable des dommages indirects liés à l’usage des logiciels.</p>
<h2>RGPD</h2>
<p>Nous traitons vos données (email, infos de commande) pour exécuter votre achat et respecter nos obligations légales. Vous disposez d’un droit d’accès, de rectification et de suppression.</p>
<h2>Cookies</h2>
<p>Des cookies techniques sont utilisés pour le fonctionnement (panier, session). Vous pouvez les gérer via votre navigateur.</p>
<h2>Litiges</h2>
<p>En cas de litige, une solution amiable sera recherchée. À défaut, compétence des tribunaux du ressort du siège social.</p>
<h2>Contact</h2>
<p>support@votredomaine.com</p>

      </div>
      <Footer />
    </div>
  );
}
