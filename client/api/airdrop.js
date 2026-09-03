/**
 * POST /api/airdrop — WRHSE giveaway registration.
 *
 * Replaces Netlify Forms, which intercepted a POST to "/" at the edge and does
 * not exist on Vercel. Validates server-side (a client-only check is trivially
 * bypassed by posting straight to this endpoint) and emails the signup on.
 *
 * Environment variables — set these in the Vercel dashboard, NOT with a
 * REACT_APP_ prefix. Anything prefixed REACT_APP_ is compiled into the browser
 * bundle and would publish the API key.
 *
 *   RESEND_API_KEY       required — https://resend.com/api-keys
 *   AIRDROP_NOTIFY_TO    required — where signups are sent
 *   AIRDROP_NOTIFY_FROM  optional — defaults to airdrop@habixgroup.top.
 *                        Must be on a domain verified in Resend.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const MESSAGE_MAX = 500;
const OPT_IN_VALUES = new Set(["Yes", "No"]);

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

/* Base58, 32–44 chars — same rule the form applies client-side. */
const isValidSolanaAddress = (value) =>
  /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value);

const asString = (value) => (typeof value === "string" ? value.trim() : "");

const escapeHtml = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );

function validate(body) {
  const fields = {
    email: asString(body.email),
    "wallet-address": asString(body["wallet-address"]),
    suburb: asString(body.suburb),
    "mailing-list": asString(body["mailing-list"]),
    message: asString(body.message).slice(0, MESSAGE_MAX),
  };

  const errors = {};

  if (!isValidEmail(fields.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!isValidSolanaAddress(fields["wallet-address"])) {
    errors["wallet-address"] =
      "That doesn't look like a Solana address. Check for a missing character.";
  }
  if (!fields.suburb) {
    errors.suburb = "Pick the area you're based in.";
  }
  if (!OPT_IN_VALUES.has(fields["mailing-list"])) {
    errors["mailing-list"] = "Let us know if you'd like the updates.";
  }

  return { fields, errors };
}

function buildEmail(fields) {
  const rows = [
    ["Email", fields.email],
    ["Wallet", fields["wallet-address"]],
    ["Area", fields.suburb],
    ["Mailing list", fields["mailing-list"]],
    ["Notes", fields.message || "—"],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#0f1020">
      <h2 style="margin:0 0 16px;font-size:18px">New airdrop signup</h2>
      <table style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:6px 16px 6px 0;color:#74758a;vertical-align:top">${escapeHtml(label)}</td>
            <td style="padding:6px 0"><strong>${escapeHtml(value)}</strong></td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>`;

  return { text, html };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const body = typeof req.body === "object" && req.body !== null ? req.body : {};

  /* Honeypot: real people never fill this in. Return 200 so bots can't tell
     they were caught. */
  if (asString(body["bot-field"])) {
    return res.status(200).json({ ok: true });
  }

  const { fields, errors } = validate(body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.AIRDROP_NOTIFY_TO;

  if (!apiKey || !notifyTo) {
    /* Fail loudly rather than dropping the signup on the floor. */
    console.error(
      "Airdrop form is not configured: RESEND_API_KEY and/or AIRDROP_NOTIFY_TO are missing.",
    );
    return res
      .status(500)
      .json({ error: "The form isn't configured yet. Please try again later." });
  }

  const { text, html } = buildEmail(fields);

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.AIRDROP_NOTIFY_FROM ||
          "Habix Airdrop <airdrop@habixgroup.top>",
        to: [notifyTo],
        reply_to: fields.email,
        subject: `New airdrop signup — ${fields.suburb}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend rejected the request:", response.status, detail);
      return res
        .status(502)
        .json({ error: "Couldn't submit right now. Please try again." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Airdrop submission failed:", error);
    return res
      .status(502)
      .json({ error: "Couldn't submit right now. Please try again." });
  }
};
