import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import PDFDocument from 'pdfkit';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2024-06-20' });
const resend = new Resend(process.env.RESEND_API_KEY as string);

function makeNumber(sessionId: string, created: number) {
  const d = new Date(created);
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  const tail = sessionId.slice(-6).toUpperCase();
  return `F-${y}${m}${day}-${tail}`;
}

function buildInvoicePdf(order: any): Promise<Buffer> {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const chunks: Buffer[] = [];
    doc.on('data', (d) => chunks.push(d as any));
    doc.on('end', () => resolve(Buffer.concat(chunks)));

    doc.fontSize(20).text('SpeedKeyShop', { align: 'left' });
    doc.fontSize(10).text('Facture', { align: 'left' });
    doc.moveDown();
    doc.fontSize(12).text(`Facture N°: ${makeNumber(order.id, order.created)}`);
    doc.text(`Commande: ${order.id}`);
    doc.text(`Client: ${order.email}`);
    doc.text(`Date: ${new Date(order.created).toLocaleString('fr-FR')}`);
    doc.moveDown();
    doc.text('Détails:');
    order.items.forEach((it: any) => {
      doc.text(`- ${it.name} x${it.quantity} : ${it.amount_total / 100}€`);
    });
    doc.moveDown();
    doc.text(`Total: ${(order.amount_total / 100).toFixed(2)}€`, { bold: true });
    doc.end();
  });
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const sig = event.headers['stripe-signature'] as string;
  let evt: Stripe.Event;

  try {
    evt = stripe.webhooks.constructEvent(event.body as string, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (err: any) {
    console.error('Webhook signature failed', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (evt.type === 'checkout.session.completed') {
    const session = evt.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email || (session.customer_email as string);
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });

    const order = {
      id: session.id,
      email,
      amount_total: session.amount_total || 0,
      items: lineItems.data.map((li) => ({
        name: li.description,
        quantity: li.quantity,
        amount_total: (li.amount_total as number) || (li.amount_subtotal as number) || 0,
      })),
      created: Date.now(),
    };

    // Optional: store in Supabase
    try {
      if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const resp = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${process.env.SUPABASE_TABLE || 'orders'}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
          },
          body: JSON.stringify({
            id: order.id,
            email: order.email,
            amount_total: order.amount_total,
            items: order.items,
            created: new Date(order.created).toISOString()
          })
        });
        if (!resp.ok) console.error('Supabase insert failed', await resp.text());
      }
    } catch (e) {
      console.error('Supabase error', e);
    }

    // Build invoice PDF
    const pdf = await buildInvoicePdf(order);

    // Send email
    try {
      if (email && process.env.RESEND_API_KEY) {
        const brandColor = '#0f2a5f';
      const html = `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; padding:24px">
          <div style="max-width:640px;margin:0 auto;border:1px solid #eee;border-radius:12px;overflow:hidden">
            <div style="background:${brandColor};color:#fff;padding:20px 24px">
              <h1 style="margin:0;font-size:20px">SpeedKeyShop</h1>
              <div style="opacity:.9;font-size:13px">Merci pour votre commande</div>
            </div>
            <div style="padding:24px">
              <p>Bonjour ${email || ''},</p>
              <p>Merci pour votre achat. Vous trouverez ci-joint votre facture au format PDF.</p>
              <p style="margin-top:16px;margin-bottom:8px;font-weight:600">Détails :</p>
              <ul style="padding-left:18px;margin-top:0">
                ${order.items.map((it:any)=>`<li>${it.name} x${it.quantity} — ${(it.amount_total/100).toFixed(2)}€</li>`).join('')}
              </ul>
              <p style="margin-top:8px"><strong>Total :</strong> ${(order.amount_total/100).toFixed(2)}€</p>
              <div style="margin-top:24px">
                <a href="${(process.env.PUBLIC_SITE_URL||'').replace(/\\/$/,'')}/order-confirmation?session_id=${order.id}" 
                   style="background:${brandColor};color:#fff;padding:12px 16px;text-decoration:none;border-radius:8px;display:inline-block">
                  Voir ma commande
                </a>
              </div>
              <p style="margin-top:24px;color:#666;font-size:12px">Logiciels / licences numériques — non remboursables après activation.</p>
            </div>
          </div>
        </div>
      `;
      await resend.emails.send({
          from: process.env.RESEND_FROM || 'no-reply@example.com',
          to: email,
          subject: 'Votre commande - SpeedKeyShop',
          html,
          text: 'Merci pour votre achat. Veuillez trouver votre facture en pièce jointe. Les clés seront envoyées séparément si nécessaire.',
          attachments: [
            {
              filename: `facture-${order.id}.pdf`,
              content: pdf.toString('base64'),
              contentType: 'application/pdf'
            }
          ]
        });
      }
    } catch (e) {
      console.error('Email send error', e);
    }
  }

  return { statusCode: 200, body: 'ok' };
};
