const ENDPOINT = process.env.CHATWABA_LEAD_ENDPOINT || 'https://qjhvpnjkopzicpmnemwh.supabase.co/functions/v1/capture-lead';

function clean(v, max) { return typeof v === 'string' ? v.trim().slice(0, max) : ''; }

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  if (b.company_website) return res.status(200).json({ success: true }); // honeypot
  const name = clean(b.name, 100);
  const email = clean(b.email, 255);
  const address = clean(b.address, 500);
  const service = clean(b.service, 100);
  const digits = clean(b.phone, 20).replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '').replace(/^0(?=\d{10}$)/, '');
  const mobile = '+91' + digits;
  if (name.length < 2) return res.status(400).json({ error: 'Enter your full name.' });
  if (!/^\+91[6-9]\d{9}$/.test(mobile)) return res.status(400).json({ error: 'Enter a valid 10-digit Indian mobile number.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Enter a valid email address.' });
  if (address.length < 3) return res.status(400).json({ error: 'Enter your city or address.' });
  const apiKey = process.env.CHATWABA_API_KEY;
  if (!apiKey) { console.error('CHATWABA_API_KEY missing'); return res.status(503).json({ error: 'Lead service is not configured yet.' }); }
  try {
    const up = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: apiKey, name, mobile, email, address: service ? address + ' | Interested in: ' + service : address, source: 'website_form' })
    });
    if (!up.ok) { console.error('capture-lead rejected', up.status, (await up.text()).slice(0, 300)); return res.status(502).json({ error: 'Could not submit right now. Please WhatsApp us.' }); }
    return res.status(200).json({ success: true });
  } catch (e) {
    console.error(e); return res.status(502).json({ error: 'Could not submit right now. Please WhatsApp us.' });
  }
};
