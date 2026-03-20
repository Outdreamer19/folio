import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import TravelingCard from './components/TravelingCard';
import CustomCursor from './components/CustomCursor';
import AllProjectsPage from './pages/AllProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

// ── Home page ─────────────────────────────────────────────────
function HomePage() {
  return (
    <div style={{ backgroundColor: '#ffffff', overflowX: 'hidden' }}>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ExperienceSection />
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
      {/* Global custom cursor — rendered outside routes so it persists */}
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<AllProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
