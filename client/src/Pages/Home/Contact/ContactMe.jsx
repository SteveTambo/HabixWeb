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
        data-netlify="true"
        netlify-honeypot="bot-field"
        hidden
      >
        <input type="hidden" name="form-name" value="airdrop-form" />

        <input type="text" name="instagram" />
        <input type="text" name="tiktok" />
        <input type="email" name="email" />
        <input type="text" name="wallet-address" />
        <input type="text" name="suburb" />
        <input type="text" name="mailing-list" />
        <textarea name="message"></textarea>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}
