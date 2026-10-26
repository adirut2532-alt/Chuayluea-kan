# Secure Proxy — ตั้งค่าบน iPhone (ฟรี ~5 นาที)

เก็บ Telegram Bot Token และ Gemini API Key ไว้ฝั่งเซิร์ฟเวอร์ ไม่ให้คนเปิดดูโค้ดหน้าเว็บแล้วเอาไปใช้ได้

## 1. สร้าง key ใหม่ (ของเดิมหลุดสาธารณะแล้ว ต้องเปลี่ยน)
- **Telegram:** แชทกับ @BotFather → `/revoke` → เลือกบอท → ได้ token ใหม่
- **Gemini:** aistudio.google.com/apikey → ลบ key เก่า → Create API key ใหม่

## 2. สร้าง Worker
1. เข้า dash.cloudflare.com (สมัครฟรี) → **Workers & Pages → Create → Create Worker**
2. ตั้งชื่อ `chuayluea-proxy` → **Deploy**
3. กด **Edit code** → ลบโค้ดเดิม → วางเนื้อหาไฟล์ `worker.js` ทั้งหมด → **Deploy**

## 3. ใส่ค่าลับ
Worker → **Settings → Variables and Secrets → Add**
| ชื่อ | ประเภท | ค่า |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Secret | token ใหม่จากข้อ 1 |
| `TELEGRAM_CHAT_ID` | Text | `-1004428607725` |
| `GEMINI_API_KEY` | Secret | key ใหม่จากข้อ 1 |

## 4. ผูกกับแอป
ก๊อป URL ของ Worker (เช่น `https://chuayluea-proxy.xxxx.workers.dev`)
แล้วใส่ใน `index.html` บรรทัด `const PROXY_URL = "";`
