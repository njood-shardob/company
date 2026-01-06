import { Routes, Route } from "react-router-dom";


import Navbar from "./assets/Navbar/Navbar";
import Footer from "./assets/Footer/Footer";

import Home from "./assets/Home/Home";
import Projects from "./assets/Projects/Projects";
import About from "./assets/About/About";
import Contact from "./assets/Contact/Contact";

export default function App() {
  return (
    <div className="appLayout">
      <Navbar />

      <main className="appLayout__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}