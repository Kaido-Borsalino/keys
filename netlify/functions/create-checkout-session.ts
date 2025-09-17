import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2024-06-20' });

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const { cartItems, user, couponCode } = JSON.parse(event.body || '{}');

    const line_items = (cartItems || []).map((it: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: it.product.name,
          description: it.product.description,
        },
        unit_amount: Math.round(Number(it.product.price) * 100),
      },
      quantity: it.quantity || 1,
    }));

    // Optional: apply promotion code if provided
let discounts: any[] | undefined = undefined;
if (couponCode) {
  try {
    const promos = await stripe.promotionCodes.list({ code: String(couponCode), active: true, limit: 1 });
    if (promos.data[0]) {
      discounts = [{ promotion_code: promos.data[0].id }];
    }
  } catch (e) {
    console.warn('Invalid/unknown couponCode', couponCode);
  }
}
const session = await stripe.checkout.sessions.create({
      discounts,
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      success_url: `${event.headers.origin || 'http://localhost:5173'}/?paid=1`,
      cancel_url: `${event.headers.origin || 'http://localhost:5173'}/?canceled=1`,
      customer_email: user?.email,
      metadata: {
        userEmail: user?.email || '',
        cartJson: JSON.stringify({ cartItems }),
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err: any) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
