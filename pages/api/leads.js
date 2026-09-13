import { supabaseAdmin } from "../../lib/supabaseAdmin";

const REQUIRED_FIELDS = ["name", "country", "contact", "service"];

const MAX_LENGTH = {
  name: 120,
  company: 160,
  country: 80,
  contact: 160,
  service: 120,
  budget: 60,
  message: 3000,
};

function sanitize(value, maxLen) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!supabaseAdmin) {
    console.error(
      "supabaseAdmin is not configured — check SUPABASE_SERVICE_ROLE_KEY in .env.local"
    );
    return res.status(500).json({ error: "Server not configured" });
  }

  const body = req.body || {};

  // Honeypot: a hidden field ("website") that real visitors never see or
  // fill in. Bots that auto-fill every input on a form will fill this
  // one too — if it has a value, silently drop the submission instead
  // of saving it, but still tell the bot it "succeeded" so it moves on.
  if (body.website) {
    return res.status(200).json({ success: true });
  }

  for (const field of REQUIRED_FIELDS) {
    if (!body[field] || !String(body[field]).trim()) {
      return res
        .status(400)
        .json({ error: `Missing required field: ${field}` });
    }
  }

  const lead = {
    name: sanitize(body.name, MAX_LENGTH.name),
    company: sanitize(body.company, MAX_LENGTH.company),
    country: sanitize(body.country, MAX_LENGTH.country),
    contact: sanitize(body.contact, MAX_LENGTH.contact),
    service: sanitize(body.service, MAX_LENGTH.service),
    budget: sanitize(body.budget, MAX_LENGTH.budget),
    message: sanitize(body.message, MAX_LENGTH.message),
  };

  const { error } = await supabaseAdmin.from("leads").insert(lead);

  if (error) {
    console.error("Failed to insert lead:", error.message);
    return res.status(500).json({ error: "Failed to save request" });
  }

  return res.status(200).json({ success: true });
}
