import "./contact.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactMe() {
  const [formData, setFormData] = useState({
    "first-name": "",
    "last-name": "",
    email: "",
    "wallet-address": "",
    referral: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]),
      )
      .join("&");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "airdrop-form",
          ...formData,
        }),
      });

      toast.success("✅ Successfully registered for the airdrop!");

      setFormData({
        "first-name": "",
        "last-name": "",
        email: "",
        "wallet-address": "",
        referral: "",
        message: "",
      });
    } catch (error) {
      toast.error("❌ Submission failed. Try again.");
    }
  };

  return (
    <section id="Contact" className="contact--section">
      <div>
        <h2>Fill in the details for an early Airdrop opportunity</h2>
      </div>

      <form
        name="airdrop-form"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        className="contact--form--container"
      >
        <input type="hidden" name="form-name" value="airdrop-form" />

        <div className="container">
          <label className="contact--label">
            <span className="text-md">First Name</span>
            <input
              type="text"
              name="first-name"
              value={formData["first-name"]}
              onChange={handleChange}
              required
              className="contact--input text-md"
            />
          </label>

          <label className="contact--label">
            <span className="text-md">Last Name</span>
            <input
              type="text"
              name="last-name"
              value={formData["last-name"]}
              onChange={handleChange}
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
              required
              className="contact--input text-md"
            />
          </label>
        </div>

        <label className="contact--label">
          <span className="text-md">How did you hear about us?</span>
          <select
            name="referral"
            value={formData.referral}
            onChange={handleChange}
            required
            className="contact--input text-md"
          >
            <option value="">Select One...</option>
            <option>Twitter</option>
            <option>Telegram</option>
            <option>Friend</option>
            <option>Website</option>
          </select>
        </label>

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

        <button type="submit" className="btn btn-outline-primary">
          Submit
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}
