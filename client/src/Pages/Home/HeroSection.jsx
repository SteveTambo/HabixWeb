export default function HeroSection() {
  return (
    <section id="heroSection" className="hero--section">
      <div className="hero--section--content--box">
        <div className="hero--section--content">
          <p className="section--title">Welcome to Habix</p>
          <h1 className="hero--section--title">
            <span
              className="hero--section-title--color"
              style={{ color: "Black" }}
            >
              Defining a New Era using Web3
            </span>{" "}
            <br />
            Technology
          </h1>
          <p className="hero--section-description">
            We are building the infrastructure for a smarter digital
            economy—where ownership is transparent, communities create value
            together, and access to opportunity is no longer limited by
            traditional systems. By combining Solana's blockchain innovation
            with real-world utility, we empower creators, users, and businesses
            to connect, transact, and grow in a more open and trusted ecosystem
          </p>
        </div>
        <button className="btn btn-outline-primary">Get In Touch</button>
      </div>
      <div className="hero--section--img">
        <img src="./img/hbx1.jpeg" alt="Hero Section" />
      </div>
    </section>
  );
}
