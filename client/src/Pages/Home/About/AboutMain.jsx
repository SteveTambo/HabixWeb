import "./about.css";

export default function AboutMain() {
  return (
    <section id="AboutMe" className="about--section">
      <div className="about--section--img">
        <img src="./img/hbx2.jpeg" alt="About Me" />
      </div>
      <div className="hero--section--content--box about--section--box">
        <div className="hero--section--content">
          <p className="section--title">About</p>
          <h1 className="skills-section--heading" style={{ fontSize: "50px" }}>
            Why Habix?
          </h1>
          <p
            className="hero--section-description"
            style={{ color: "black", fontSize: "22px" }}
          >
            There is a critical need for a new enterprise paradigm that unifies
            diverse business lines under transparent, community-driven
            governance while maintaining efficiency and competitive advantage.
            By leveraging blockchain-based tokenization, this model enables fair
            value distribution and active stakeholder participation within a
            shared economic ecosystem supported by real-world operations and
            sustainable token economics. Habix addresses this gap by building a
            community-aligned, tokenized enterprise framework on Solana that
            integrates lifestyle retail, entertainment, and both profit and
            non-profit initiatives into a single interoperable digital
            ecosystem.
          </p>
        </div>
      </div>
    </section>
  );
}
