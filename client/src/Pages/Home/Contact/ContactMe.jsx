import "./contact.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Seo from "../../../components/Seo";

const MESSAGE_MAX = 500;

const INITIAL_FORM = {
  email: "",
  "wallet-address": "",
  suburb: "",
  "mailing-list": "",
  message: "",
};

const SUBURBS = [
  "Westlands",
  "Kilimani",
  "Kileleshwa",
  "Lavington",
  "Parklands",
  "Upper Hill",
  "Karen",
  "Lang'ata",
  "South B",
  "South C",
  "Eastleigh",
  "Embakasi",
  "Donholm",
  "Umoja",
  "Buruburu",
  "Komarock",
  "Kayole",
  "Ruaka",
  "Runda",
  "Muthaiga",
  "Gigiri",
  "Spring Valley",
  "Riverside",
  "Ngong Road",
  "Dagoretti",
  "Ngumo",
  "Hurlingham",
  "Madaraka",
  "Mlolongo",
  "Syokimau",
  "Athi River",
  "Kitengela",
  "Roysambu",
  "Kasarani",
  "Zimmerman",
  "Kahawa West",
  "Kahawa Sukari",
  "Garden Estate",
  "Thome",
  "Githurai",
  "Mirema",
  "Mountain View",
  "Kangemi",
  "Kinoo",
  "Uthiru",
  "Riruta",
  "Jamhuri Estate",
  "Kawangware",
  "Other",
];

const PERKS = [
  {
    title: "Early $HBX allocation",
    body: "Registered wallets are queued first when the WRHSE giveaway goes live.",
  },
  {
    title: "Drop alerts before anyone else",
    body: "New streetwear releases and limited runs, straight to your inbox.",
  },
  {
    title: "One wallet, one entry",
    body: "We verify the address format up front so nothing gets lost on the way.",
  },
];

/* Basic Solana address validation (base58, 32–44 chars) */
const isValidSolanaAddress = (address) =>
  /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address.trim());

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

export default function ContactMe() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    /* Clear the field's error as soon as the visitor starts fixing it. */
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const validate = () => {
    const next = {};

    if (!isValidEmail(formData.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!isValidSolanaAddress(formData["wallet-address"])) {
      next["wallet-address"] =
        "That doesn't look like a Solana address. Check for a missing character.";
    }
    if (!formData.suburb) {
      next.suburb = "Pick the area you're based in.";
    }
    if (!formData["mailing-list"]) {
      next["mailing-list"] = "Let us know if you'd like the updates.";
    }

    setErrors(next);
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const botField = e.target.elements["bot-field"]?.value ?? "";
    const found = validate();
    const firstError = Object.keys(found)[0];
    if (firstError) {
      toast.error("Please fix the highlighted fields.");
      document
        .querySelector(`[name="${firstError}"]`)
        ?.focus({ preventScroll: false });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/airdrop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, "bot-field": botField }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        /* The function re-validates server-side; surface its field errors. */
        if (payload.errors) {
          setErrors(payload.errors);
          toast.error("Please fix the highlighted fields.");
          return;
        }
        throw new Error(payload.error || `Server responded with ${response.status}`);
      }

      toast.success("You're on the list.");
      setFormData(INITIAL_FORM);
      setSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (name) =>
    `contact--input${errors[name] ? " has-error" : ""}`;

  return (
    <section id="Contact" className="contact--section">
      <Seo
        title="Join the WRHSE Airdrop | Habix Technologies"
        description="Register your wallet to join the early $HBX airdrop queue and get first sight of every WRHSE release."
        path="/contact"
      />
      <div className="contact--shell">
        {/* ------------------------------------------------ Left: the pitch */}
        <aside className="contact--aside">
          <div className="contact--aside--inner">
            <p className="contact--eyebrow">WRHSE Giveaway</p>
            <h1 className="contact--headline">
              Claim your spot in the <span>early airdrop</span>.
            </h1>
            <p className="contact--lede">
              Drop your wallet below and you'll be in the queue for the first
              $HBX distribution — plus first sight of every WRHSE release.
            </p>

            <ul className="contact--perks">
              {PERKS.map((perk) => (
                <li key={perk.title}>
                  <span className="contact--perk--icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none">
                      <path
                        d="M4.5 10.5l3.5 3.5 7.5-8"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>
                    <strong>{perk.title}</strong>
                    <span className="contact--perk--body">{perk.body}</span>
                  </span>
                </li>
              ))}
            </ul>

            <a className="contact--aside--doc" href="/giveaway.pdf" download>
              Read the giveaway terms
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M4 10h12M11 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </aside>

        {/* ------------------------------------------------ Right: the form */}
        <div className="contact--card">
          {submitted ? (
            <div className="contact--success" role="status">
              <span className="contact--success--mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12.5l4.5 4.5L19 7"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h2>You're registered.</h2>
              <p>
                We've got your wallet. Watch your inbox — allocation details go
                out before the drop.
              </p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setSubmitted(false)}
              >
                Register another wallet
              </button>
            </div>
          ) : (
            <form
              method="POST"
              action="/api/airdrop"
              onSubmit={handleSubmit}
              noValidate
              className="contact--form--container"
            >
              <p className="contact--honeypot">
                <label>
                  Leave this field empty
                  <input type="text" name="bot-field" tabIndex={-1} />
                </label>
              </p>

              <header className="contact--card--header">
                <h2>Register your wallet</h2>
                <p>Takes about a minute. No seed phrase, ever.</p>
              </header>

              <div className="container">
                <label className="contact--label">
                  <span className="contact--label--text">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "err-email" : undefined}
                    className={fieldClass("email")}
                  />
                  {errors.email && (
                    <span className="contact--error" id="err-email">
                      {errors.email}
                    </span>
                  )}
                </label>

                <label className="contact--label">
                  <span className="contact--label--text">
                    Solana public address
                  </span>
                  <input
                    type="text"
                    name="wallet-address"
                    value={formData["wallet-address"]}
                    onChange={handleChange}
                    placeholder="7xKX…"
                    spellCheck="false"
                    autoComplete="off"
                    aria-invalid={Boolean(errors["wallet-address"])}
                    aria-describedby={
                      errors["wallet-address"] ? "err-wallet" : "hint-wallet"
                    }
                    className={`${fieldClass("wallet-address")} contact--mono`}
                  />
                  {errors["wallet-address"] ? (
                    <span className="contact--error" id="err-wallet">
                      {errors["wallet-address"]}
                    </span>
                  ) : (
                    <span className="contact--hint" id="hint-wallet">
                      Your public receiving address — never your seed phrase.
                    </span>
                  )}
                </label>
              </div>

              <label className="contact--label">
                <span className="contact--label--text">
                  Which area are you based in?
                </span>
                <div className="contact--select--wrap">
                  <select
                    name="suburb"
                    value={formData.suburb}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.suburb)}
                    aria-describedby={errors.suburb ? "err-suburb" : undefined}
                    className={fieldClass("suburb")}
                  >
                    <option value="">Select one…</option>
                    {SUBURBS.map((suburb) => (
                      <option key={suburb} value={suburb}>
                        {suburb}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="contact--select--chevron"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 7.5l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {errors.suburb && (
                  <span className="contact--error" id="err-suburb">
                    {errors.suburb}
                  </span>
                )}
              </label>

              <fieldset
                className={`mailing--list--field${
                  errors["mailing-list"] ? " has-error" : ""
                }`}
              >
                <legend className="mailing--list--title">
                  Include me in the mailing list
                  <span className="required--asterisk" aria-hidden="true">
                    *
                  </span>
                </legend>
                <p className="mailing--list--description">
                  WRHSE drops, $HBX token news, and new music releases. Two
                  emails a month at most.
                </p>

                <div className="mailing--list--options">
                  {[
                    { value: "Yes", label: "Yes, keep me in the loop" },
                    { value: "No", label: "No thanks" },
                  ].map((option) => (
                    <label className="radio--label" key={option.value}>
                      <input
                        type="radio"
                        name="mailing-list"
                        value={option.value}
                        checked={formData["mailing-list"] === option.value}
                        onChange={handleChange}
                        className="radio--input"
                      />
                      <span className="radio--custom" aria-hidden="true" />
                      <span className="radio--text">{option.label}</span>
                    </label>
                  ))}
                </div>

                {errors["mailing-list"] && (
                  <span className="contact--error">
                    {errors["mailing-list"]}
                  </span>
                )}
              </fieldset>

              <label className="contact--label">
                <span className="contact--label--text">
                  Anything else?
                  <span className="contact--optional">Optional</span>
                </span>
                <textarea
                  name="message"
                  rows="4"
                  maxLength={MESSAGE_MAX}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how you found us, or what you'd like to see next."
                  className="contact--input"
                />
                <span className="contact--counter">
                  {formData.message.length}/{MESSAGE_MAX}
                </span>
              </label>

              <button
                type="submit"
                className="btn btn-primary contact--submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="contact--spinner" aria-hidden="true" />
                    Submitting…
                  </>
                ) : (
                  "Join the airdrop"
                )}
              </button>

              <p className="contact--fineprint">
                We only use your address to send the drop. No spam, unsubscribe
                any time.
              </p>
            </form>
          )}
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        newestOnTop
        theme="dark"
      />
    </section>
  );
}
