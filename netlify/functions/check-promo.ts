
import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2024-06-20' });

export const handler: Handler = async (event) => {
  const code = event.queryStringParameters?.code;
  if (!code) return { statusCode: 400, body: 'Missing code' };
  try {
    const promos = await stripe.promotionCodes.list({ code: String(code), active: true, limit: 1, expand: ['data.coupon'] });
    const p = promos.data[0];
    if (!p) return { statusCode: 404, body: 'Not found' };
    const c = p.coupon as Stripe.Coupon;
    return {
      statusCode: 200,
      body: JSON.stringify({
        id: p.id,
        percent_off: c.percent_off,
        amount_off: c.amount_off,
        currency: c.currency || 'eur'
      })
    };
  } catch (e:any) {
    return { statusCode: 500, body: e.message };
  }
};
