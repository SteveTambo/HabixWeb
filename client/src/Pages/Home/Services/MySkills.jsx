import data from "../../../data/index.json";
import "./services.css";

export default function MySkills() {
  return (
    <section className="skills--section" id="mySkills">
      <div className="portfolio--container">
        <p className="section--title">What We Do</p>
        <h2 className="skills--section--heading">Our Core Services</h2>
      </div>
      <div className="skills--section--container">
        {data?.skills?.map((item) => (
          <div key={item.id} className="skills--section--card">
            <div className="skills--section--img">
              <img src={item.src} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="skills--section--card--content">
              <h3 className="skills--section--title">{item.title}</h3>
              <p className="skills--section--description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
