import type { Handler } from "@netlify/functions";
import Stripe from "stripe";
import { Resend } from "resend";

// Stripe & Resend config
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});
const resend = new Resend(process.env.RESEND_API_KEY);

// Webhook secret (Netlify environment variable STRIPE_WEBHOOK_SECRET)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const sig = event.headers["stripe-signature"];
  if (!sig) {
    return { statusCode: 400, body: "Missing Stripe signature" };
  }

  let stripeEvent: Stripe.Event;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body as string,
      sig,
      endpointSecret
    );
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed.", err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  // Handle successful checkout
  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object as Stripe.Checkout.Session;

    // Normalise l’URL publique
    const baseUrl = (process.env.PUBLIC_SITE_URL || "").replace(/\/+$/, "");
    const confirmationUrl = `${baseUrl}/order-confirmation?session_id=${session.id}`;

    try {
      // Exemple d’envoi d’email avec Resend
      await resend.emails.send({
        from: process.env.RESEND_FROM || "no-reply@yourdomain.com",
        to: session.customer_email || "test@example.com",
        subject: "Confirmation de votre commande",
        html: `
          <h1>Merci pour votre commande 🎉</h1>
          <p>Votre paiement a bien été reçu.</p>
          <p>
            Vous pouvez consulter les détails de votre commande ici : 
            <a href="${confirmationUrl}">Voir ma commande</a>
          </p>
        `,
      });

      console.log("✅ Email envoyé avec succès à", session.customer_email);
    } catch (err) {
      console.error("❌ Erreur d’envoi de l’email", err);
    }
  }

  return { statusCode: 200, body: "Webhook received" };
};
