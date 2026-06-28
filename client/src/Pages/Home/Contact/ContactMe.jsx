import "./contact.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const INITIAL_FORM = {
  instagram: "",
  tiktok: "",
  email: "",
  "wallet-address": "",
  suburb: "",
  "mailing-list": "",
  message: "",
};

// Basic Solana address validation (base58, 32–44 chars)
const isValidSolanaAddress = (address) =>
  /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);

export default function ContactMe() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const encode = (data) =>
    Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]),
      )
      .join("&");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side Solana address check
    if (!isValidSolanaAddress(formData["wallet-address"])) {
      toast.error(
        "❌ Invalid Solana address. Please double-check your wallet.",
      );
      return;
    }

    // Mailing list selection required
    if (!formData["mailing-list"]) {
      toast.error("❌ Please select a mailing list preference.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "airdrop-form", ...formData }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      toast.success("✅ Successfully registered for the airdrop!");
      setFormData(INITIAL_FORM);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("❌ Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="Contact" className="contact--section">
      <div>
        <h2>
          Done with Step One? Fill in the details for an early Airdrop
          opportunity : WRHSE Giveaway
        </h2>
      </div>

      {/* The hidden static form is required for Netlify to detect it at build time in SPAs */}
      <form name="airdrop-form" data-netlify="true" hidden>
        <input type="text" name="instagram" />
        <input type="text" name="tiktok" />
        <input type="email" name="email" />
        <input type="text" name="wallet-address" />
        <select name="suburb" />
        <select name="mailing-list" />
        <textarea name="message" />
      </form>

      <form
        name="airdrop-form"
        method="POST"
        onSubmit={handleSubmit}
        className="contact--form--container"
      >
        <input type="hidden" name="form-name" value="airdrop-form" />

        <div className="container">
          <label className="contact--label">
            <span className="text-md">Instagram Username</span>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="@yourhandle"
              required
              className="contact--input text-md"
            />
          </label>

          <label className="contact--label">
            <span className="text-md">TikTok Username</span>
            <input
              type="text"
              name="tiktok"
              value={formData.tiktok}
              onChange={handleChange}
              placeholder="@yourhandle"
              required
              className="contact--input text-md"
            />
          </label>

          <label className="contact--label">
            <span className="text-md">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="contact--input text-md"
            />
          </label>

          <label className="contact--label">
            <span className="text-md">Solana Public Address</span>
            <input
              type="text"
              name="wallet-address"
              value={formData["wallet-address"]}
              onChange={handleChange}
              placeholder="e.g. 7xKX..."
              required
              className="contact--input text-md"
            />
          </label>
        </div>

        <label className="contact--label">
          <span className="text-md">Which suburb are you based in?</span>
          <select
            name="suburb"
            value={formData.suburb}
            onChange={handleChange}
            required
            className="contact--input text-md"
          >
            <option value="">Select One...</option>
            <option>Westlands</option>
            <option>Kilimani</option>
            <option>Kileleshwa</option>
            <option>Lavington</option>
            <option>Parklands</option>
            <option>Upper Hill</option>
            <option>Karen</option>
            <option>Lang'ata</option>
            <option>South B</option>
            <option>South C</option>
            <option>Eastleigh</option>
            <option>Embakasi</option>
            <option>Donholm</option>
            <option>Umoja</option>
            <option>Buruburu</option>
            <option>Komarock</option>
            <option>Kayole</option>
            <option>Ruaka</option>
            <option>Runda</option>
            <option>Muthaiga</option>
            <option>Gigiri</option>
            <option>Spring Valley</option>
            <option>Riverside</option>
            <option>Ngong Road</option>
            <option>Dagoretti</option>
            <option>Ngumo</option>
            <option>Hurlingham</option>
            <option>Madaraka</option>
            <option>Mlolongo</option>
            <option>Syokimau</option>
            <option>Athi River</option>
            <option>Kitengela</option>
            <option>Roysambu</option>
            <option>Kasarani</option>
            <option>Zimmerman</option>
            <option>Kahawa West</option>
            <option>Kahawa Sukari</option>
            <option>Garden Estate</option>
            <option>Thome</option>
            <option>Githurai</option>
            <option>Mirema</option>
            <option>Mountain View</option>
            <option>Kangemi</option>
            <option>Kinoo</option>
            <option>Uthiru</option>
            <option>Riruta</option>
            <option>Jamhuri Estate</option>
            <option>Kawangware</option>
            <option>Other</option>
          </select>
        </label>

        {/* Mailing list field */}
        <div className="contact--label mailing--list--field">
          <span className="text-md mailing--list--title">
            Include in mailing list?{" "}
            <span className="required--asterisk" aria-hidden="true">
              *
            </span>
          </span>
          <p className="mailing--list--description">
            Stay updated on WRHSE drops, $HBX token news, and exclusive giveaway
            announcements.
          </p>
          <div className="mailing--list--options">
            <label className="radio--label">
              <input
                type="radio"
                name="mailing-list"
                value="Yes"
                checked={formData["mailing-list"] === "Yes"}
                onChange={handleChange}
                className="radio--input"
                required
              />
              <span className="radio--custom" aria-hidden="true" />
              <span className="text-md">Yes, keep me in the loop</span>
            </label>
            <label className="radio--label">
              <input
                type="radio"
                name="mailing-list"
                value="No"
                checked={formData["mailing-list"] === "No"}
                onChange={handleChange}
                className="radio--input"
              />
              <span className="radio--custom" aria-hidden="true" />
              <span className="text-md">No thanks</span>
            </label>
          </div>
        </div>

        <label className="contact--label">
          <span className="text-md">Any other notes?</span>
          <textarea
            name="message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            className="contact--input text-md"
          />
        </label>

        <button
          type="submit"
          className="btn btn-outline-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}
