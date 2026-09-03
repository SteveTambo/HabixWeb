import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section id="heroSection" className="hero--section">
      <div className="hero--section--content--box">
        <div className="hero--section--content">
          <p className="section--title">Welcome to Habix Technologies</p>
          <h1 className="hero--section--title">
            Powering digital transformation through{" "}
            <span className="hero--section--title--color">
              blockchain innovation
            </span>
          </h1>
          <p className="hero--section-description">
            Habix Technologies is a technology venture studio focused on
            transforming organizational ecosystems through innovative digital
            solutions. We build proprietary blockchain transformation frameworks
            and validate them through our own platforms before deploying them
            for client organizations.
          </p>
        </div>

        <div className="hero--section--actions">
          <Link to="/portfolio" className="btn btn-primary">
            Explore our studio
          </Link>
          <Link to="/contact" className="btn btn-ghost">
            Join the airdrop
          </Link>
        </div>
      </div>

      <div className="hero--section--img">
        <img
          src="/img/ab3.webp"
          alt="Habix Technologies"
          width="1100"
          height="1100"
          fetchpriority="high"
          decoding="async"
        />
      </div>
    </section>
  );
}
