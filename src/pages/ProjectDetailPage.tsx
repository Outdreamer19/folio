import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { projects } from '../data/projects';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const desktopMockupRef = useRef<HTMLDivElement>(null);
  const desktopMockupInView = useInView(desktopMockupRef, { once: false, amount: 0.3 });
  const mobileMockupRef = useRef<HTMLDivElement>(null);
  const mobileMockupInView = useInView(mobileMockupRef, { once: false, amount: 0.3 });

  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    if (!project) {
      navigate('/projects');
    }
  }, [project, navigate]);

  if (!project) {
    return null;
  }

  const desktopParallax = useTransform(scrollY, [0, 800], [0, 60]);

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: 'rgb(10,10,16)',
    color: '#fff',
    fontFamily: "'Inter', sans-serif",
    overflow: 'hidden',
  };

  const navbarStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    height: '64px',
    backgroundColor: 'rgba(10,10,16,0.92)',
    backdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '40px',
    paddingRight: '40px',
  };

  const navLeftStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const backArrowStyle: React.CSSProperties = {
    fontSize: '20px',
    transition: 'transform 0.3s ease',
  };

  const backLinkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'color 0.3s ease',
  };

  const navCenterStyle: React.CSSProperties = {
    fontFamily: "'Antonio', sans-serif",
    fontSize: '16px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    color: '#fff',
  };

  const viewLiveButtonStyle: React.CSSProperties = {
    padding: '8px 16px',
    fontSize: '12px',
    fontWeight: 600,
    border: `1px solid ${project.color}`,
    backgroundColor: `${project.color}10`,
    color: project.color,
    borderRadius: '6px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const heroStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: 'rgb(10,10,16)',
    position: 'relative',
    overflow: 'hidden',
    padding: '100px 40px',
    display: 'flex',
    alignItems: 'center',
  };

  const heroGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
  };

  const heroLeftStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 2,
  };

  const heroRightStyle: React.CSSProperties = {
    position: 'relative',
    height: '500px',
  };

  const badgesRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  };

  const badgeStyle: React.CSSProperties = {
    padding: '6px 12px',
    backgroundColor: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.8)',
  };

  const statusBadgeStyle: React.CSSProperties = {
    ...badgeStyle,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  };

  const pulseDotStyle: React.CSSProperties = {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  };

  const heroTitleStyle: React.CSSProperties = {
    fontFamily: "'Antonio', sans-serif",
    fontSize: 'clamp(56px, 8vw, 110px)',
    fontWeight: 700,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    lineHeight: 0.92,
    marginBottom: '16px',
  };

  const taglineStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '20px',
    fontWeight: 300,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '32px',
    lineHeight: 1.6,
  };

  const ctaRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  };

  const ctaButtonStyle: React.CSSProperties = {
    padding: '12px 28px',
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderRadius: '8px',
    textDecoration: 'none',
    cursor: 'pointer',
    fontFamily: "'Antonio', sans-serif",
    border: 'none',
    display: 'inline-block',
    transition: 'all 0.3s ease',
  };

  const ctaFilledStyle: React.CSSProperties = {
    ...ctaButtonStyle,
    backgroundColor: project.color,
    color: '#000',
  };

  const ctaOutlinedStyle: React.CSSProperties = {
    ...ctaButtonStyle,
    backgroundColor: 'transparent',
    border: '1px solid rgba(255,255,255,0.3)',
    color: '#fff',
  };

  const ghostNumberStyle: React.CSSProperties = {
    fontFamily: "'Antonio', sans-serif",
    fontSize: 'clamp(160px, 22vw, 280px)',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.04)',
    position: 'absolute',
    top: '50px',
    left: '-20px',
    lineHeight: 1,
  };

  const desktopFrameWrapperStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '600px',
  };

  const browserFrameStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '16px',
    boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
  };

  const browserHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '12px',
  };

  const trafficLightStyle: React.CSSProperties = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.2)',
  };

  const addressBarStyle: React.CSSProperties = {
    flex: 1,
    height: '20px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: '4px',
    marginLeft: '8px',
  };

  const desktopScreenStyle: React.CSSProperties = {
    width: '100%',
    height: '280px',
    borderRadius: '8px',
    objectFit: 'cover',
    objectPosition: 'top',
  };

  const phoneFrameStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '-30px',
    right: '-20px',
    width: '120px',
    height: '220px',
    borderRadius: '20px',
    backgroundColor: 'rgba(20,20,28,0.9)',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '8px',
    boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
    zIndex: 2,
    overflow: 'hidden',
  };

  const mobileScreenStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: '14px',
    objectFit: 'cover',
  };

  const overviewStripStyle: React.CSSProperties = {
    borderTop: '1px solid rgba(255,255,255,0.06)',
    backgroundColor: 'rgb(10,10,16)',
    padding: '80px 40px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
  };

  const overviewColumnStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const overviewLabelStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: project.color,
    marginBottom: '16px',
  };

  const overviewBodyStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '15px',
    fontWeight: 300,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 1.8,
  };

  const screenshotsSection: React.CSSProperties = {
    backgroundColor: 'rgb(14,14,20)',
    padding: '100px 40px',
  };

  const screenshotHeadingStyle: React.CSSProperties = {
    fontFamily: "'Antonio', sans-serif",
    fontSize: 'clamp(36px, 6vw, 64px)',
    fontWeight: 700,
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: '60px',
    letterSpacing: '-0.02em',
    position: 'relative',
  };

  const decorativeLineStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '-16px',
    left: '0',
    width: '80px',
    height: '3px',
    backgroundColor: project.color,
  };

  const screenshotsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    alignItems: 'start',
  };

  const featureTechSection: React.CSSProperties = {
    backgroundColor: 'rgb(10,10,16)',
    padding: '100px 40px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
  };

  const featuresColumnStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  };

  const featureCardStyle: React.CSSProperties = {
    borderLeft: `3px solid ${project.color}`,
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: `3px solid ${project.color}, 1px solid rgba(255,255,255,0.06)`,
    borderRadius: '12px',
    padding: '20px',
  };


  const featureBodyStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 300,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 1.6,
  };

  const techStackColumnStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  };

  const techGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const techGroupLabelStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: project.color,
  };

  const techPillsStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  };

  const ctaFooterStyle: React.CSSProperties = {
    backgroundColor: 'rgb(10,10,16)',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '80px 40px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const footerHeadingStyle: React.CSSProperties = {
    fontFamily: "'Antonio', sans-serif",
    fontSize: 'clamp(36px, 6vw, 56px)',
    fontWeight: 700,
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: '12px',
    letterSpacing: '-0.02em',
  };

  const footerSubStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '16px',
    fontWeight: 300,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '40px',
  };

  const footerButtonsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  };

  const footerButtonStyle: React.CSSProperties = {
    padding: '12px 32px',
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderRadius: '8px',
    textDecoration: 'none',
    cursor: 'pointer',
    fontFamily: "'Antonio', sans-serif",
    border: 'none',
    transition: 'all 0.3s ease',
  };

  const footerButtonFilledStyle: React.CSSProperties = {
    ...footerButtonStyle,
    backgroundColor: '#6366f1',
    color: '#fff',
  };

  const footerButtonOutlinedStyle: React.CSSProperties = {
    ...footerButtonStyle,
    backgroundColor: 'transparent',
    border: '1px solid rgba(255,255,255,0.3)',
    color: '#fff',
  };

  const scrollIndicatorStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
  };

  const arrowStyle: React.CSSProperties = {
    fontSize: '24px',
    color: 'rgba(255,255,255,0.4)',
    animation: 'bounce 2s infinite',
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <style>{`
        @keyframes aurora-drift {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.15;
          }
          50% {
            transform: translate(30px, -30px);
            opacity: 0.2;
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .overview-strip {
            grid-template-columns: 1fr !important;
          }
          .screenshots-grid {
            grid-template-columns: 1fr !important;
          }
          .feature-tech-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={navbarStyle}>
        <motion.div
          style={navLeftStyle}
          whileHover="hover"
        >
          <motion.span
            style={backArrowStyle}
            variants={{
              hover: { x: -3 },
            }}
          >
            ←
          </motion.span>
          <Link to="/projects" style={backLinkStyle}>
            Back to projects
          </Link>
        </motion.div>
        <div style={navCenterStyle}>SHANE BELL</div>
        <motion.a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={viewLiveButtonStyle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Live Site ↗
        </motion.a>
      </nav>

      {/* HERO SECTION */}
      <section style={heroStyle}>
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-100px',
            width: '800px',
            height: '800px',
            background: `radial-gradient(circle, ${project.color} 0%, transparent 70%)`,
            opacity: 0.15,
            filter: 'blur(100px)',
            animation: 'aurora-drift 8s ease-in-out infinite',
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            zIndex: 1,
          }}
        />

        <div style={heroGridStyle} className="hero-grid">
          {/* LEFT COLUMN */}
          <div style={heroLeftStyle}>
            <div style={ghostNumberStyle}>{project.number}</div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div style={badgesRowStyle}>
                <div style={badgeStyle}>{project.category}</div>
                <div style={statusBadgeStyle}>
                  <div style={pulseDotStyle} />
                  Active
                </div>
                <div style={badgeStyle}>{project.year}</div>
              </div>
            </motion.div>

            <motion.h1
              style={heroTitleStyle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {project.title}
            </motion.h1>

            <motion.p
              style={taglineStyle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {project.tagline}
            </motion.p>

            <motion.div
              style={ctaRowStyle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={ctaFilledStyle}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                VIEW LIVE SITE ↗
              </motion.a>
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={ctaOutlinedStyle}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                VIEW SOURCE
              </motion.a>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={heroRightStyle}>
            <motion.div
              ref={desktopMockupRef}
              style={{ ...desktopFrameWrapperStyle, y: desktopParallax }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div style={browserFrameStyle}>
                <div style={browserHeaderStyle}>
                  <div style={trafficLightStyle} />
                  <div style={trafficLightStyle} />
                  <div style={trafficLightStyle} />
                  <div style={addressBarStyle} />
                </div>
                <img
                  src={project.screenshots.desktop}
                  alt={`${project.title} desktop`}
                  style={desktopScreenStyle}
                />
              </div>

              <div style={phoneFrameStyle}>
                <img
                  src={project.screenshots.mobile}
                  alt={`${project.title} mobile`}
                  style={mobileScreenStyle}
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div style={scrollIndicatorStyle}>
          <div style={arrowStyle}>↓</div>
        </div>
      </section>

      {/* OVERVIEW STRIP */}
      <section style={overviewStripStyle} className="overview-strip">
        <div style={overviewColumnStyle}>
          <div style={overviewLabelStyle}>Overview</div>
          <p style={overviewBodyStyle}>{project.description}</p>
        </div>
        <div style={overviewColumnStyle}>
          <div style={overviewLabelStyle}>The Challenge</div>
          <p style={overviewBodyStyle}>{project.challenge}</p>
        </div>
      </section>

      {/* SCREENSHOTS SECTION */}
      <section style={screenshotsSection}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={screenshotHeadingStyle}>
            IN ACTION
            <div style={decorativeLineStyle} />
          </div>

          <div style={screenshotsGridStyle} className="screenshots-grid">
            <motion.div
              ref={desktopMockupRef}
              initial={{ opacity: 0, y: 40 }}
              animate={desktopMockupInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8 }}
            >
              <div style={browserFrameStyle}>
                <div style={browserHeaderStyle}>
                  <div style={trafficLightStyle} />
                  <div style={trafficLightStyle} />
                  <div style={trafficLightStyle} />
                  <div style={addressBarStyle} />
                </div>
                <img
                  src={project.screenshots.desktop}
                  alt={`${project.title} desktop`}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </div>
            </motion.div>

            <motion.div
              ref={mobileMockupRef}
              initial={{ opacity: 0, y: 40 }}
              animate={mobileMockupInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ justifySelf: 'center', width: '100%', maxWidth: '240px' }}
            >
              <div style={{ ...phoneFrameStyle, position: 'relative', bottom: 'auto', right: 'auto' }}>
                <img
                  src={project.screenshots.mobile}
                  alt={`${project.title} mobile`}
                  style={mobileScreenStyle}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES & TECH STACK */}
      <section style={featureTechSection} className="feature-tech-grid">
        <div style={featuresColumnStyle}>
          <h2 style={{ ...screenshotHeadingStyle, marginBottom: '40px' }}>KEY FEATURES</h2>
          {project.highlights.map((feature, idx) => (
            <motion.div
              key={idx}
              style={{ ...featureCardStyle, borderLeft: `3px solid ${project.color}` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <div style={featureBodyStyle}>{feature}</div>
            </motion.div>
          ))}
        </div>

        <div style={techStackColumnStyle}>
          <h2 style={{ ...screenshotHeadingStyle, marginBottom: '40px' }}>TECH STACK</h2>
          {project.techGroups.map((group, idx) => (
            <motion.div
              key={idx}
              style={techGroupStyle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <div style={techGroupLabelStyle}>{group.label}</div>
              <div style={techPillsStyle}>
                {group.items.map((item, itemIdx) => (
                  <span
                    key={itemIdx}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: `${project.color}15`,
                      border: `1px solid ${project.color}30`,
                      color: project.color,
                      fontSize: '12px',
                      fontWeight: 500,
                      borderRadius: '8px',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA FOOTER */}
      <section style={ctaFooterStyle}>
        <h2 style={footerHeadingStyle}>WANT TO BUILD SOMETHING?</h2>
        <p style={footerSubStyle}>Open to remote & hybrid roles · Available immediately</p>
        <div style={footerButtonsStyle}>
          <motion.a
            href="mailto:shane@shanebell.dev"
            style={footerButtonFilledStyle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            GET IN TOUCH
          </motion.a>
          <Link
            to="/projects"
            style={{ ...footerButtonOutlinedStyle, display: 'inline-block' }}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ display: 'inline-block' }}
            >
              BACK TO PROJECTS
            </motion.span>
          </Link>
        </div>
      </section>
    </div>
  );
}
