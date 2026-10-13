import nodemailer from "nodemailer";

/**
 * POST /api/contact — relays the portfolio contact form to your inbox.
 *
 * Mail is sent FROM the spare account (SMTP_USER) TO CONTACT_TO, with the
 * visitor's address as Reply-To so you can answer them directly.
 *
 * Required env vars (set in Vercel → Project → Settings → Environment Variables):
 *   SMTP_USER   spare Gmail address that sends the mail
 *   SMTP_PASS   16-char Google App Password for that account (not the login password)
 *   CONTACT_TO  where messages should arrive
 * Optional:
 *   SMTP_HOST / SMTP_PORT   default smtp.gmail.com:465
 */

const LIMITS = { name: 100, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort per-instance rate limit: 5 messages / 10 min per IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request): Promise<Response> {
  const { SMTP_USER, SMTP_PASS, CONTACT_TO, SMTP_HOST, SMTP_PORT } = process.env;
  if (!SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    console.error("contact: missing SMTP_USER / SMTP_PASS / CONTACT_TO");
    return json(500, { error: "Email is not configured on the server." });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json(400, { error: "Invalid request." });
  }

  // Honeypot: real users never see or fill this field.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return json(200, { ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || name.length > LIMITS.name) return json(400, { error: "Please enter your name." });
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email)
    return json(400, { error: "Please enter a valid email address." });
  if (message.length < 10 || message.length > LIMITS.message)
    return json(400, { error: "Message should be between 10 and 5000 characters." });

  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (rateLimited(ip)) return json(429, { error: "Too many messages — please try again later." });

  const port = Number(SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST ?? "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  // Strip CR/LF so user input can't inject extra headers via the subject/name.
  const safeName = name.replace(/[\r\n]+/g, " ");

  try {
    await transporter.sendMail({
      from: { name: "Portfolio Contact", address: SMTP_USER },
      to: CONTACT_TO,
      replyTo: { name: safeName, address: email },
      subject: `Portfolio: message from ${safeName}`,
      text: `From: ${safeName} <${email}>\n\n${message}\n\n— sent via anshbhatt.space`,
      html: `<p><strong>From:</strong> ${escapeHtml(safeName)} &lt;${escapeHtml(email)}&gt;</p>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>
<hr><p style="color:#888;font-size:12px">Sent via the contact form on anshbhatt.space — just hit reply to answer.</p>`,
    });
  } catch (err) {
    console.error("contact: sendMail failed", err);
    return json(502, { error: "Couldn't send right now — please email me directly." });
  }

  return json(200, { ok: true });
}
