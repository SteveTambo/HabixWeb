export default function HeroSection() {
  return (
    <section id="heroSection" className="hero--section">
      <div className="hero--section--content--box">
        <div className="hero--section--content">
          <p className="section--title">Welcome to Habix Technologies</p>
          <h1 className="hero--section--title">
            <span
              className="hero--section-title--color"
              style={{ color: "Black" }}
            >
              Powering Digital Transformation Through Blockchain Innovation
            </span>{" "}
            <br />
            Technology
          </h1>
          <p className="hero--section-description">
            Habix Technologies is a technology venture studio focused on
            transforming organizational ecosystems through innovative digital
            solutions. We build proprietary blockchain transformation frameworks
            and validate them through our own platforms before deploying them
            for client organizations
          </p>
        </div>
      </div>
      <div className="hero--section--img">
        <img src="./img/ab3.png" alt="Hero Section" />
      </div>
    </section>
  );
}
