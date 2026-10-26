/**
 * ช่วยเหลือกาญ — Secure Proxy (Cloudflare Worker, ฟรี)
 * เก็บ Telegram Bot Token และ Gemini API Key ไว้ฝั่งเซิร์ฟเวอร์ ไม่ให้หลุดในหน้าเว็บ
 *
 * ตั้งค่า (Settings → Variables and Secrets):
 *   TELEGRAM_BOT_TOKEN  (Secret)  token จาก @BotFather
 *   TELEGRAM_CHAT_ID    (Text)    เช่น -1004428607725
 *   GEMINI_API_KEY      (Secret)  key จาก aistudio.google.com/apikey
 *
 * เส้นทาง:
 *   POST /tg/sendMessage | /tg/sendPhoto | /tg/sendVoice
 *   POST /gemini
 * ทุกคำขอต้องแนบ Authorization: Bearer <Firebase ID token> ของผู้ใช้ที่ล็อกอินแล้ว
 */

const FIREBASE_PROJECT_ID = 'chuaylueakan';
const ALLOWED_ORIGINS = ['https://adirut2532-alt.github.io'];
const TG_METHODS = new Set(['sendMessage', 'sendPhoto', 'sendVoice']);
const GEMINI_MODEL = 'gemini-2.5-flash';
const MAX_BODY = 8 * 1024 * 1024; // 8MB

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const cors = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    };
    const reply = (body, status = 200) =>
      new Response(typeof body === 'string' ? body : JSON.stringify(body), {
        status, headers: { 'Content-Type': 'application/json', ...cors },
      });

    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method !== 'POST') return reply({ error: 'method_not_allowed' }, 405);
    if (!ALLOWED_ORIGINS.includes(origin)) return reply({ error: 'forbidden_origin' }, 403);
    if (Number(req.headers.get('Content-Length') || 0) > MAX_BODY) return reply({ error: 'too_large' }, 413);

    // ---- ตรวจว่าเป็นผู้ใช้ที่ล็อกอินจริง ----
    const token = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
    const user = await verifyFirebaseToken(token).catch(() => null);
    if (!user) return reply({ error: 'unauthorized' }, 401);

    const path = new URL(req.url).pathname;

    // ---- Telegram ----
    if (path.startsWith('/tg/')) {
      const method = path.slice(4);
      if (!TG_METHODS.has(method)) return reply({ error: 'bad_method' }, 400);
      const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`;
      const ct = req.headers.get('Content-Type') || '';
      let res;
      if (ct.includes('multipart/form-data')) {
        const form = await req.formData();
        form.set('chat_id', env.TELEGRAM_CHAT_ID); // บังคับห้องปลายทาง
        res = await fetch(url, { method: 'POST', body: form });
      } else {
        const body = await req.json().catch(() => ({}));
        body.chat_id = env.TELEGRAM_CHAT_ID;
        if (typeof body.text === 'string') body.text = body.text.slice(0, 4000);
        res = await fetch(url, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
        });
      }
      return reply(await res.text(), res.status);
    }

    // ---- Gemini ----
    if (path === '/gemini') {
      const payload = await req.text();
      if (payload.length > 50000) return reply({ error: 'too_large' }, 413);
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload },
      );
      return reply(await res.text(), res.status);
    }

    return reply({ error: 'not_found' }, 404);
  },
};

/* ---------- ตรวจ Firebase ID token (RS256) ด้วย WebCrypto ---------- */
let _jwks = null, _jwksExp = 0;
async function getKeys() {
  if (_jwks && Date.now() < _jwksExp) return _jwks;
  const r = await fetch('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com');
  const data = await r.json();
  const maxAge = Number((r.headers.get('Cache-Control') || '').match(/max-age=(\d+)/)?.[1] || 3600);
  _jwks = data.keys; _jwksExp = Date.now() + maxAge * 1000;
  return _jwks;
}
const b64url = s => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), c => c.charCodeAt(0));

async function verifyFirebaseToken(jwt) {
  const [h, p, s] = jwt.split('.');
  if (!h || !p || !s) return null;
  const header = JSON.parse(new TextDecoder().decode(b64url(h)));
  const payload = JSON.parse(new TextDecoder().decode(b64url(p)));
  if (header.alg !== 'RS256') return null;
  const jwk = (await getKeys()).find(k => k.kid === header.kid);
  if (!jwk) return null;
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64url(s), new TextEncoder().encode(`${h}.${p}`));
  const now = Math.floor(Date.now() / 1000);
  if (!ok || payload.aud !== FIREBASE_PROJECT_ID || payload.iss !== `https://securetoken.google.com/${FIREBASE_PROJECT_ID}` || payload.exp < now || !payload.sub) return null;
  return { uid: payload.sub, email: payload.email || '' };
}
