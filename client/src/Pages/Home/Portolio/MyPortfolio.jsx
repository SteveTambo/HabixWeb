import data from "../../../data/index.json";
import PortfolioGrid from "./PortfolioGrid";
import "./portfolio.css";

export default function MyPortfolio() {
  return (
    <section className="portfolio--section" id="MyPortfolio">
      <div className="portfolio--container-box">
        <div className="portfolio--container">
          <p className="sub--title">Recent Projects</p>
          <h2 className="section--heading">Our Studio Portfolio</h2>
        </div>
        <div>
          <a href="/whitepaper.pdf" download className="whitepaper-link">
            <span className="btn btn-github">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 0v6h6M9 15h6M9 11h3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Proposed $HBX Blockchain Ecosystem
            </span>
          </a>
        </div>
      </div>

      <PortfolioGrid items={data?.portfolio} />
    </section>
  );
}
