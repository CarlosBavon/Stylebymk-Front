import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Booking from "./pages/Booking";
import Enquiry from "./pages/Enquiry";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Privacy from "./pages/Privacy";
import CancelBooking from "./pages/CancelBooking";
import Catalogue from "./pages/Catalogue";
import "./App.css";
import ScrollToTop from './components/ScrollToTop';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <Router>
        <ScrollToTop />
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/enquiry" element={<Enquiry />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/cancel" element={<CancelBooking />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/catalogue" element={<Catalogue />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>

  );
}

export default App;
