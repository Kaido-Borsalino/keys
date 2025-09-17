import React from 'react';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 dark:text-neutral-100">
      <div className="container mx-auto px-4 py-16 max-w-3xl prose dark:prose-invert">
        <h1>Politique de confidentialité</h1>
        <p><strong>Dernière mise à jour :</strong> 17/09/2025</p>
        
<h2>Quelles données ?</h2>
<p>Email, informations de commande et de facturation.</p>
<h2>Pourquoi ?</h2>
<p>Traitement des commandes, facturation, support client, obligations légales.</p>
<h2>Base légale</h2>
<p>Exécution du contrat, intérêt légitime (support), obligations légales (comptabilité).</p>
<h2>Durées de conservation</h2>
<p>Factures : 10 ans. Emails/support : 3 ans.</p>
<h2>Partage</h2>
<p>Prestataires : Stripe (paiement), Resend (email). Nous ne vendons pas vos données.</p>
<h2>Transferts hors UE</h2>
<p>Certains prestataires peuvent être hors UE avec des garanties appropriées (clauses contractuelles types).</p>
<h2>Vos droits</h2>
<p>Accès, rectification, suppression, opposition. Contact : support@votredomaine.com</p>
<h2>Cookies</h2>
<p>Cookies nécessaires au fonctionnement, et mesures techniques minimales. Paramétrables dans votre navigateur.</p>

      </div>
      <Footer />
    </div>
  );
}
