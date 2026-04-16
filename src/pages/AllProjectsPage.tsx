import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

const ProjectShowcase = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 8px 48px rgba(0,0,0,0.1)',
        border: '1px solid rgba(0,0,0,0.07)',
      }}
    >
      <div
        style={{
          background: project.bgGradient,
          padding: `clamp(36px, 8vw, 72px) clamp(28px, 5vw, 56px)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -60,
            fontSize: 'clamp(200px, 30vw, 400px)',
            fontWeight: 900,
            color: 'rgba(255,255,255,0.07)',
            fontFamily: 'Antonio',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
            <span
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 12,
                fontFamily: 'Inter',
                fontWeight: 500,
                backdropFilter: 'blur(8px)',
              }}
            >
              {project.category}
            </span>
            <span
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 12,
                fontFamily: 'Inter',
                fontWeight: 500,
                backdropFilter: 'blur(8px)',
              }}
            >
              {project.status}
            </span>
            <span
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 12,
                fontFamily: 'Inter',
                fontWeight: 500,
                backdropFilter: 'blur(8px)',
              }}
            >
              {project.year}
            </span>
          </div>

          <h3
            style={{
              fontFamily: 'Antonio',
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: 700,
              color: 'white',
              margin: '0 0 16px 0',
              textTransform: 'uppercase',
              letterSpacing: -0.5,
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontFamily: 'Inter',
              fontSize: 18,
              color: 'rgba(255,255,255,0.8)',
              margin: '0 0 32px 0',
              lineHeight: 1.6,
              maxWidth: 600,
            }}
          >
            {project.tagline}
          </p>

          <div style={{ display: 'flex', gap: 16, marginBottom: 48, flexWrap: 'wrap' }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '12px 28px',
                  background: 'white',
                  color: 'rgb(10,10,16)',
                  border: 'none',
                  borderRadius: 12,
                  fontFamily: 'Inter',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.target as HTMLElement).style.boxShadow = '0 8px 24px rgba(255,255,255,0.25)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}
              >
                View Live Site
              </a>
            )}

            <Link
              to={`/projects/${project.slug}`}
              style={{
                padding: '12px 28px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 12,
                fontFamily: 'Inter',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                transition: 'all 0.3s ease',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.3)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.2)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              View Details
            </Link>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '12px 28px',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 12,
                  fontFamily: 'Inter',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  transition: 'all 0.3s ease',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.3)';
                  (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.2)';
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                View Source
              </a>
            )}
          </div>

          {project.screenshots?.desktop && (
            <div
              style={{
                position: 'relative',
                marginTop: 48,
                width: '100%',
              }}
            >
              <div
                style={{
                  width: '80%',
                  margin: '0 auto',
                  borderRadius: '12px 12px 0 0',
                  overflow: 'hidden',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
                }}
              >
                <img
                  src={project.screenshots.desktop}
                  alt={`${project.title} screenshot`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 100,
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div style={{ background: 'white', padding: 'clamp(36px, 8vw, 72px) clamp(28px, 5vw, 56px)' }}>
        <style>
          {`.apl-detail-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 64px;
          }
          @media (max-width: 768px) {
            .apl-detail-grid {
              grid-template-columns: 1fr;
              gap: 32px;
            }
          }`}
        </style>

        <div className="apl-detail-grid">
          <div>
            {project.description && (
              <div style={{ marginBottom: 48 }}>
                <h4
                  style={{
                    fontFamily: 'Antonio',
                    fontSize: 18,
                    fontWeight: 700,
                    color: 'rgb(10,10,16)',
                    margin: '0 0 16px 0',
                    textTransform: 'uppercase',
                    letterSpacing: -0.5,
                  }}
                >
                  Overview
                </h4>
                <p
                  style={{
                    fontFamily: 'Inter',
                    fontSize: 15,
                    color: 'rgba(10,10,16,0.7)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {project.description}
                </p>
              </div>
            )}

            {project.challenge && (
              <div style={{ marginBottom: 48 }}>
                <h4
                  style={{
                    fontFamily: 'Antonio',
                    fontSize: 18,
                    fontWeight: 700,
                    color: 'rgb(10,10,16)',
                    margin: '0 0 16px 0',
                    textTransform: 'uppercase',
                    letterSpacing: -0.5,
                  }}
                >
                  Challenge
                </h4>
                <p
                  style={{
                    fontFamily: 'Inter',
                    fontSize: 15,
                    color: 'rgba(10,10,16,0.7)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {project.challenge}
                </p>
              </div>
            )}

            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h4
                  style={{
                    fontFamily: 'Antonio',
                    fontSize: 18,
                    fontWeight: 700,
                    color: 'rgb(10,10,16)',
                    margin: '0 0 16px 0',
                    textTransform: 'uppercase',
                    letterSpacing: -0.5,
                  }}
                >
                  Highlights
                </h4>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {project.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        gap: 12,
                        marginBottom: 12,
                        alignItems: 'flex-start',
                      }}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: '#6366f1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        <span
                          style={{
                            color: 'white',
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          ✓
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: 'Inter',
                          fontSize: 15,
                          color: 'rgba(10,10,16,0.7)',
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {highlight}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            {project.techGroups && project.techGroups.length > 0 && (
              <div>
                <h4
                  style={{
                    fontFamily: 'Antonio',
                    fontSize: 18,
                    fontWeight: 700,
                    color: 'rgb(10,10,16)',
                    margin: '0 0 24px 0',
                    textTransform: 'uppercase',
                    letterSpacing: -0.5,
                  }}
                >
                  Tech Stack
                </h4>
                {project.techGroups.map((group, i) => (
                  <div key={i} style={{ marginBottom: 32 }}>
                    <div
                      style={{
                        display: 'inline-block',
                        background: '#6366f1',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: 8,
                        fontSize: 11,
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        marginBottom: 12,
                      }}
                    >
                      {group.label}
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {group.items.map((tech, j) => (
                        <span
                          key={j}
                          style={{
                            background: 'rgba(99,102,241,0.1)',
                            color: '#6366f1',
                            padding: '6px 14px',
                            borderRadius: 8,
                            fontSize: 13,
                            fontFamily: 'Inter',
                            fontWeight: 500,
                            border: '1px solid rgba(99,102,241,0.2)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function AllProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: 'rgb(10,10,16)', minHeight: '100vh' }}>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          height: 64,
          background: 'rgba(10,10,16,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 'clamp(20px, 4vw, 56px)',
          paddingRight: 'clamp(20px, 4vw, 56px)',
        }}
      >
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'Inter',
            fontSize: 13,
            fontWeight: 500,
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = 'white';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
          }}
        >
          <span style={{ fontSize: 18 }}>←</span>
          Back to portfolio
        </Link>

        <h1
          style={{
            fontFamily: 'Antonio',
            fontSize: 16,
            fontWeight: 700,
            color: 'white',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: 1,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          SHANE BELL
        </h1>

        <a
          href="/Shane_Bell_CV.pdf"
          download="Shane_Bell_CV.pdf"
          style={{
            padding: '8px 20px',
            background: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontFamily: 'Inter',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = '#4f46e5';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = '#6366f1';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          }}
        >
          Download CV
        </a>
      </nav>

      <header
        style={{
          background: 'rgb(10,10,16)',
          padding: `clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)`,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div
              style={{
                width: 2,
                height: 24,
                background: 'linear-gradient(to right, #6366f1, transparent)',
              }}
            />
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: 600,
                color: '#6366f1',
                textTransform: 'uppercase',
                letterSpacing: 2,
              }}
            >
              CASE STUDIES
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'Antonio',
              fontSize: 'clamp(56px, 9vw, 120px)',
              fontWeight: 700,
              color: 'white',
              margin: '0 0 24px 0',
              textTransform: 'uppercase',
              letterSpacing: -1,
              lineHeight: 1,
            }}
          >
            ALL PROJECTS
          </h1>

          <p
            style={{
              fontFamily: 'Inter',
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: 'rgba(255,255,255,0.5)',
              margin: '0 0 56px 0',
              lineHeight: 1.6,
              maxWidth: 600,
            }}
          >
            Explore the full range of projects I've designed and engineered. From concept to production, each showcases my approach to building scalable, user-focused digital products.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 32,
            }}
          >
            {[
              { value: '4', label: 'Products Shipped' },
              { value: '4', label: 'Live in Production' },
              { value: '20+', label: 'Technologies Used' },
              { value: '6+', label: 'Years Engineering' },
            ].map((stat, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: 'Antonio',
                    fontSize: 42,
                    fontWeight: 700,
                    color: '#6366f1',
                    margin: 0,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: 'Inter',
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    marginTop: 8,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: `clamp(56px, 8vw, 120px) clamp(20px, 4vw, 56px)`,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px, 8vw, 96px)' }}>
          {projects.map((project, index) => (
            <ProjectShowcase key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>

      <section
        style={{
          background: 'rgb(10,10,16)',
          padding: `clamp(56px, 8vw, 120px) clamp(20px, 4vw, 56px)`,
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              padding: 'clamp(32px, 6vw, 56px)',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0.05) 100%)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: 24,
            }}
          >
            <h2
              style={{
                fontFamily: 'Antonio',
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 700,
                color: 'white',
                margin: '0 0 16px 0',
                textTransform: 'uppercase',
                letterSpacing: -0.5,
              }}
            >
              Have a project in mind?
            </h2>
            <p
              style={{
                fontFamily: 'Inter',
                fontSize: 16,
                color: 'rgba(255,255,255,0.6)',
                margin: '0 0 32px 0',
                lineHeight: 1.6,
              }}
            >
              Let's collaborate on something extraordinary. I'm always interested in projects that challenge the status quo.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="mailto:contact@shanebell.dev"
                style={{
                  padding: '14px 32px',
                  background: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: 12,
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  transition: 'all 0.3s ease',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#4f46e5';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#6366f1';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                Get in Touch
              </a>
              <Link
                to="/"
                style={{
                  padding: '14px 32px',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 12,
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  transition: 'all 0.3s ease',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                Back to Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
