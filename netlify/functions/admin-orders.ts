import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const url = process.env.SUPABASE_URL;
  if (!url || !key) return { statusCode: 200, body: JSON.stringify([]) };

  const resp = await fetch(`${url}/rest/v1/${process.env.SUPABASE_TABLE || 'orders'}?select=*`, {
    headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
  });
  const data = await resp.json();
  return { statusCode: 200, body: JSON.stringify(data) };
};
