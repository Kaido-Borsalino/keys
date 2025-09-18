import { useEffect, useState } from "react";

export default function OrderConfirmation() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    setSessionId(url.searchParams.get("session_id"));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 dark:text-neutral-100">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-3xl font-extrabold">Merci pour votre achat 🎉</h1>
        <p className="mt-2 text-gray-600 dark:text-neutral-300">
          Votre paiement a bien été reçu. Vous allez recevoir un email récapitulatif.
        </p>
        {sessionId && (
          <p className="mt-2 text-sm text-gray-500 dark:text-neutral-400">
            Session Stripe : <code>{sessionId}</code>
          </p>
        )}
        <a href="/" className="inline-block mt-6 px-6 py-3 rounded-lg bg-blue-900 text-white hover:bg-blue-800">
          Retour à l’accueil
        </a>
      </div>
    </div>
  );
}
