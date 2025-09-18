export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-4 py-10 grid md:grid-cols-4 gap-6 text-sm text-gray-600 dark:text-gray-300">
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">SpeedKeyShop91</h4>
          <p>Licences logicielles • Facture immédiate • Paiement sécurisé</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Légal</h4>
          <ul className="space-y-1">
            <li><a href="/mentions-legales" className="hover:underline">Mentions légales</a></li>
            <li><a href="/cgv" className="hover:underline">CGV</a></li>
            <li><a href="/confidentialite" className="hover:underline">Confidentialité</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Paiements</h4>
          <p>Visa · MasterCard · Stripe</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <p><a className="hover:underline" href="mailto:speedkeyshop91@gmail.com">speedkeyshop91@gmail.com</a><br/>+33 7 88 80 39 92</p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 pb-6">
        © {new Date().getFullYear()} SpeedKeyShop91. Tous droits réservés.
      </div>
    </footer>
  );
}
