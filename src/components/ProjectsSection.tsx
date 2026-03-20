import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <>
      <style>{`
        .projects-bento {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 768px) {
          .projects-bento {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section
        ref={ref}
        style={{
          background: 'rgb(10, 10, 16)',
          padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 64px)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
          }}
        >
          {/* Section Header */}
          <div
            style={{
              marginBottom: 'clamp(48px, 8vw, 80px)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: 1, minWidth: '300px' }}>
              {/* Overline */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '2px',
                    background: 'rgb(94, 103, 230)',
                  }}
                />
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'Inter, sans-serif',
                    color: 'rgb(94, 103, 230)',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  SELECTED WORK
                </span>
              </div>

              {/* Heading */}
              <h2
                style={{
                  fontSize: 'clamp(52px, 7vw, 96px)',
                  fontFamily: 'Antonio, sans-serif',
                  fontWeight: 700,
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  margin: '0 0 16px 0',
                  lineHeight: 1.1,
                }}
              >
                PROJECTS
              </h2>

              {/* Subtext */}
              <p
                style={{
                  fontSize: '16px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  color: 'rgba(255, 255, 255, 0.7)',
                  margin: 0,
                  maxWidth: '500px',
                }}
              >
                Four products shipped. Zero agencies. All mine.
              </p>
            </div>

            {/* View All Link */}
            <Link
              to="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.7)',
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                target.style.color = 'rgba(255, 255, 255, 0.7)';
              }}
            >
              View all →
            </Link>
          </div>

          {/* Projects Grid */}
          <div className="projects-bento">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} isInView={isInView} />
            ))}
          </div>

          {/* View All Projects CTA */}
          <div
            style={{
              marginTop: 'clamp(60px, 10vw, 100px)',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Link
              to="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 48px',
                fontSize: '16px',
                fontFamily: 'Antonio, sans-serif',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#ffffff',
                background: 'transparent',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '40px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                target.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                target.style.background = 'transparent';
              }}
            >
              VIEW ALL PROJECTS
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isInView: boolean;
}

function ProjectCard({ project, index, isInView }: ProjectCardProps) {
  const [, setIsHovered] = useState(false);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
        delay: isInView ? index * 0.12 : 0,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      style={{
        position: 'relative',
      }}
    >
      <Link
        to={`/projects/${project.slug}`}
        style={{
          textDecoration: 'none',
          display: 'block',
          height: '100%',
        }}
      >
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-cursor="project"
          data-cursor-color={project.color}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: `1px solid rgba(255, 255, 255, 0.07)`,
            borderRadius: '20px',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
          }}
          whileHover={{
            borderColor: `${project.color}60`,
            boxShadow: `0 0 40px ${project.color}20`,
          }}
        >
          {/* Screenshot Area */}
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              height: '260px',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <motion.img
              src={project.screenshots.desktop}
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
              }}
              whileHover={{
                scale: 1.04,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 40%, rgb(10,10,16) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Card Body */}
          <div
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            {/* Project Number */}
            <div
              style={{
                fontSize: '11px',
                fontFamily: 'Inter, sans-serif',
                color: 'rgba(255, 255, 255, 0.3)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              PROJECT {String(index + 1).padStart(2, '0')}
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: '28px',
                fontFamily: 'Antonio, sans-serif',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
                margin: '0 0 12px 0',
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h3>

            {/* Category */}
            <div
              style={{
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                color: project.color,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: '16px',
              }}
            >
              {project.category}
            </div>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <ul
                style={{
                  listStyle: 'none',
                  margin: '0 0 20px 0',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {project.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: '13px',
                      fontFamily: 'Inter, sans-serif',
                      color: 'rgba(255, 255, 255, 0.6)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        background: project.color,
                        borderRadius: '50%',
                        marginTop: '5px',
                        flexShrink: 0,
                      }}
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            {/* Tech Pills */}
            {project.tech && project.tech.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '20px',
                }}
              >
                {project.tech.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '11px',
                      fontFamily: 'Inter, sans-serif',
                      padding: '6px 12px',
                      background: `${project.color}15`,
                      color: project.color,
                      borderRadius: '20px',
                      textTransform: 'capitalize',
                      border: `1px solid ${project.color}30`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'Inter, sans-serif',
                      padding: '6px 12px',
                      color: 'rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    +{project.tech.length - 4} more
                  </span>
                )}
              </div>
            )}

            {/* Bottom Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <span
                style={{
                  fontSize: '12px',
                  fontFamily: 'Inter, sans-serif',
                  color: 'rgba(255, 255, 255, 0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {project.year}
              </span>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                }}
              >
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontSize: '12px',
                      fontFamily: 'Antonio, sans-serif',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: project.color,
                      textDecoration: 'none',
                      padding: '6px 12px',
                      border: `1px solid ${project.color}40`,
                      borderRadius: '16px',
                      transition: 'all 0.2s ease',
                      background: 'transparent',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.background = `${project.color}15`;
                      target.style.borderColor = `${project.color}70`;
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.background = 'transparent';
                      target.style.borderColor = `${project.color}40`;
                    }}
                  >
                    LIVE ↗
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontSize: '12px',
                      fontFamily: 'Antonio, sans-serif',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: 'rgba(255, 255, 255, 0.6)',
                      textDecoration: 'none',
                      padding: '6px 12px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '16px',
                      transition: 'all 0.2s ease',
                      background: 'transparent',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.background = 'rgba(255, 255, 255, 0.05)';
                      target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                      target.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.background = 'transparent';
                      target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      target.style.color = 'rgba(255, 255, 255, 0.6)';
                    }}
                  >
                    CODE
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
