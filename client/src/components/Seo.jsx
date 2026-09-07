import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.habixgroup.top";

/* Only title/description/canonical are per-route here — social-preview bots
   (WhatsApp, Facebook, Twitter, ...) fetch the raw index.html without running
   JS, so every shared URL sees the same static og:* tags in public/index.html
   regardless of path. Duplicating og:* here via Helmet would just leave two
   conflicting copies in the DOM for crawlers (Google) that do run JS. */
export default function Seo({ title, description, path = "/", noindex = false }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <link rel="canonical" href={`${SITE_URL}${path}`} />
      )}
    </Helmet>
  );
}
