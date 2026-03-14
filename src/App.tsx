import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroSection     from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import AboutSection    from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection  from './components/ContactSection';
import Footer          from './components/Footer';
import TravelingCard   from './components/TravelingCard';
import AllProjectsPage from './pages/AllProjectsPage';

// ── Home page ─────────────────────────────────────────────────
function HomePage() {
  return (
    <div style={{ backgroundColor: '#ffffff', overflowX: 'hidden' }}>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      {/* Single card — position: fixed, scroll-driven across all sections */}
      <TravelingCard />
    </div>
  );
}

// ── App with Router ───────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/projects" element={<AllProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
