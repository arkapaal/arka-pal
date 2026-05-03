import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SpotifyNowPlaying from "./components/SpotifyNowPlaying";

export default function App() {
  return (
    <Router>
      <SmoothScroll>
        <CustomCursor />
        <SpotifyNowPlaying />
        <div className="min-h-screen bg-black">  {/* Changed from bg-white */}
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Experience />
          <Skills />
          <Projects />
          <About />
          <Contact />
          <Footer />
        </div>
        
      </SmoothScroll>
    </Router>
  );
}