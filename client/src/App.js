import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Pages/Home/Navbar/Navbar";
import Home from "./Pages/Home/Homescreen";
import ContactMe from "./Pages/Home/Contact/ContactMe";
import MainPortfolio from "./Pages/Home/Portolio/MainPortfolio";
import AboutMain from "./Pages/Home/About/AboutMain";
import Footer from "./Pages/Home/Footer/Footer";
import Services from "./Pages/Home/Services/Services";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/portfolio" element={<MainPortfolio />}></Route>
            <Route path="/about" element={<AboutMain />}></Route>
            <Route path="/services" element={<Services />}></Route>
            <Route path="/contact" element={<ContactMe />}></Route>
            <Route path="*" element={<div>404 Not Found</div>}></Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
