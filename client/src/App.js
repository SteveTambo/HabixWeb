import "./App.css";
import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Link,
} from "react-router-dom";

import Navbar from "./Pages/Home/Navbar/Navbar";
import Home from "./Pages/Home/Homescreen";
import Footer from "./Pages/Home/Footer/Footer";
import Seo from "./components/Seo";

/* Split the secondary routes out of the initial bundle — /contact alone pulls
   in react-toastify, which the landing page never needs. */
const ContactMe = lazy(() => import("./Pages/Home/Contact/ContactMe"));
const MainPortfolio = lazy(() => import("./Pages/Home/Portolio/MainPortfolio"));
const AboutMain = lazy(() => import("./Pages/Home/About/AboutMain"));

/* React Router keeps the old scroll position across navigations. */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function NotFound() {
  return (
    <section className="notfound--section">
      <Seo
        title="Page Not Found | Habix Technologies"
        description="The page you're looking for doesn't exist. Head back to the Habix Technologies homepage."
        noindex
      />
      <p className="section--title">404</p>
      <h1>This page hasn't been built yet.</h1>
      <p className="text-lg">
        The link may be out of date. Head back to the studio and pick up from
        there.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to home
      </Link>
    </section>
  );
}

function RouteFallback() {
  return <div className="route--fallback" role="status" aria-label="Loading" />;
}

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <ScrollToTop />
        <main>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<MainPortfolio />} />
              <Route path="/about" element={<AboutMain />} />
              <Route path="/contact" element={<ContactMe />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
