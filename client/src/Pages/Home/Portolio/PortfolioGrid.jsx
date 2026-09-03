import "./portfolio.css";

/* Show "wrhse.habixgroup.top" rather than the full "https://…/" URL. */
const prettyUrl = (link) => {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return link;
  }
};

export default function PortfolioGrid({ items = [] }) {
  return (
    <div className="portfolio--section--container">
      {items.map((item) => (
        <article key={item.id ?? item.title} className="portfolio--section--card">
          <div className="portfolio--section--img">
            <img
              src={item.src}
              alt={`${item.title} screenshot`}
              loading="lazy"
              decoding="async"
              width="640"
              height="400"
            />
          </div>
          <div className="portfolio--section--card--content">
            <div>
              <h3 className="portfolio--section--title">{item.title}</h3>
              <p className="text-md">{item.description}</p>
            </div>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm portfolio--link"
            >
              {prettyUrl(item.link)}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 19"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4.66667 1.66675H18V15.0001M18 1.66675L2 17.6667L18 1.66675Z"
                  stroke="currentColor"
                  strokeWidth="2.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
