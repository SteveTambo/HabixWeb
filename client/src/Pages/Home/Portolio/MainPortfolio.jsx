import data from "../../../data/index.json";
import PortfolioGrid from "./PortfolioGrid";
import "./portfolio.css";

export default function MainPortfolio() {
  return (
    <section className="portfolio--section" id="MyPortfolio">
      <div className="portfolio--container-box">
        <div className="portfolio--container">
          <p className="sub--title">Recent Projects</p>
          <h1 className="section--heading">Our Studio Portfolio</h1>
          <p className="text-lg">
            Platforms we build, run, and prove in production before the
            frameworks behind them go to client organizations.
          </p>
        </div>
      </div>

      <PortfolioGrid items={data?.portfolio} />
    </section>
  );
}
