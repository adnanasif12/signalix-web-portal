const DEFAULT_RECIPIENT = "ashibadnan42@gmail.com";

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendLeadEmail(lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.LEADS_EMAIL || DEFAULT_RECIPIENT;
  const sender = process.env.RESEND_FROM_EMAIL || "Signalix Leads <onboarding@resend.dev>";

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const subject = `New Quote Request — ${lead.name || "Website Visitor"}`;
  const fields = [
    ["Name", lead.name],
    ["Business / Company", lead.company],
    ["Country", lead.country],
    ["WhatsApp / Email", lead.contact],
    ["Service Needed", lead.service],
    ["Budget Range", lead.budget],
    ["Project Description", lead.message],
  ];
  const html = fields
    .map(
      ([label, value]) =>
        `<p><strong>${escapeHtml(label)}:</strong><br />${escapeHtml(value) || "-"}</p>`
    )
    .join("");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      subject,
      html: `<h2>New quote request</h2>${html}`,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend email failed (${response.status}): ${details}`);
  }

  const result = await response.json();
  return result.id;
}
