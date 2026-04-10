import "./about.css";

export default function AboutMe() {
  return (
    <section id="AboutMe" className="about--section">
      <div className="about--section--img">
        <img src="./img/hbx2.jpeg" alt="About Me" />
      </div>
      <div className="hero--section--content--box about--section--box">
        <div className="hero--section--content">
          <p className="section--title">About Us</p>
          <h1 className="skills-section--heading" style={{ fontSize: "54px" }}>
            Who We Are
          </h1>
          <p className="hero--section-description" style={{ color: "black" }}>
            The future belongs to organizations built collaboratively,
            transparently, and sustainably—where governance is shared and value
            flows to everyone who contributes. This is the vision behind Habix.
            By combining the stability of traditional structures with the
            innovation of Web3, Habix is building a tokenized ecosystem that
            rewards participation, aligns incentives, and enables business
            growth to advance alongside community prosperity
          </p>
        </div>
      </div>
    </section>
  );
}
