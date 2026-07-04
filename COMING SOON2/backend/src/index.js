export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return json({ success: false, message: "Method not allowed" }, 405);
    }

    try {
      const missing = ["BREVO_API_KEY", "FROM_EMAIL", "TO_EMAIL"].filter(k => !env[k]);
      if (missing.length) {
        throw new Error("Missing env vars: " + missing.join(", "));
      }

      const data = await request.json();
      await sendBrevoEmail(data, env);
      return json({ success: true, message: "Registration sent! We'll contact you soon." });
    } catch (err) {
      return json({ success: false, message: err.message }, 500);
    }
  },
};

/* ─── EMAIL via BrevoSend ─────────────────────────────── */

async function sendBrevoEmail(data, env) {
  const rows = [
    ["School Email", data.email],
    ["School", data.school],
    ["Phone", data.phone || "—"],
    ["Message", data.message || "—"],
  ]
    .map(([label, val]) =>
      `<tr><td style="color:#c9ccff;width:110px">${esc(label)}</td><td>${esc(val)}</td></tr>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html><body style="font-family:Inter,sans-serif;background:#070b18;color:#eef0ff;padding:40px">
<table width="100%" cellpadding="0" cellspacing="0"
  style="max-width:560px;margin:auto;background:rgba(18,20,45,.72);border-radius:24px;border:1px solid rgba(37,99,235,.25);padding:35px">
<tr><td style="text-align:center;padding-bottom:20px">
  <h1 style="font-family:'Space Grotesk',sans-serif;color:#fff;font-size:24px;margin:0 0 5px">Digilogous 12.0</h1>
  <p style="color:#c9ccff;font-size:13px;margin:0">K.C. Garg Memorial Inter School Tech Symposium</p>
</td></tr>
<tr><td style="height:1px;background:linear-gradient(90deg,transparent,#2563EB,transparent)"></td></tr>
<tr><td style="padding:10px 0">
  <p style="margin:0 0 8px;color:#60A5FA;font-weight:600;font-size:14px">New Registration</p>
  <table cellpadding="8" style="font-size:15px;color:#eef0ff;width:100%">${rows}</table>
</td></tr></table></body></html>`;

  const resp = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": env.BREVO_API_KEY },
    body: JSON.stringify({
      sender: { name: "Digilogous 12.0", email: env.FROM_EMAIL },
      to: [{ email: env.TO_EMAIL, name: "Digilogous Team" }],
      subject: `Digilogous 12.0 — New Registration: ${data.school}`,
      htmlContent: html,
      replyTo: { email: data.email, name: data.school },
    }),
  });

  if (!resp.ok) throw new Error("Brevo email failed: " + (await resp.text()));
  return resp.json();
}

/* ─── HELPERS ─────────────────────────────────────────── */

function esc(s) {
  if (typeof s !== "string") return "";
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}
