import type { Handler } from "@netlify/functions";
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY as string;

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }
  if (!stripeSecret || stripeSecret.includes("dummy")) {
    return { statusCode: 400, body: "Stripe n'est pas configuré (clé secrète manquante)." };
  }

  const stripe = new Stripe(stripeSecret, { apiVersion: "2024-06-20" });

  try {
    const { items } = JSON.parse(event.body || "{}") as {
      items: { id: string; title: string; price: number; qty: number }[];
    };

    const baseUrl = (process.env.PUBLIC_SITE_URL || "").replace(/\/+$/, "");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: "eur",
      payment_method_types: ["card"],
      line_items: items.map((it) => ({
        quantity: it.qty,
        price_data: {
          currency: "eur",
          product_data: {
            name: it.title,
            metadata: { id: it.id },
          },
          unit_amount: Math.round(it.price * 100),
        },
      })),
      success_url: `${baseUrl}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err: any) {
    console.error(err);
    return { statusCode: 500, body: `Stripe error: ${err.message || "unknown"}` };
    }
};
