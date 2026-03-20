import { Link } from 'react-router-dom';

// ── Social icon components ─────────────────────────────────────
function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

// ── Footer ─────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: 'Work',     href: '#services', to: null     },
    { label: 'About',    href: '#about',    to: null     },
    { label: 'Projects', href: null,        to: '/projects' },
    { label: 'Contact',  href: '#contact',  to: null     },
  ];

  const socialLinks = [
    { Icon: XIcon,        label: 'X',        href: '#' },
    { Icon: LinkedInIcon, label: 'LinkedIn',  href: 'https://www.linkedin.com/in/shane-bell-740b8569' },
    { Icon: GithubIcon,   label: 'GitHub',    href: 'https://github.com/Outdreamer19' },
  ];

  return (
    <footer style={{
      backgroundColor: 'rgb(18, 18, 22)',
      color:           '#ffffff',
      padding:         'clamp(48px, 6vw, 80px) clamp(24px, 6vw, 96px) clamp(28px, 4vw, 40px)',
      boxSizing:       'border-box',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* ── Top row: name + nav + socials ── */}
        <div style={{
          display:         'flex',
          alignItems:      'flex-start',
          justifyContent:  'space-between',
          flexWrap:        'wrap',
          gap:             32,
          paddingBottom:   48,
          borderBottom:    '1px solid rgba(255,255,255,0.08)',
          marginBottom:    32,
        }}>

          {/* Brand */}
          <div>
            <p style={{
              fontFamily:    "'Antonio', sans-serif",
              fontSize:      28,
              fontWeight:    700,
              letterSpacing: '-0.01em',
              margin:        '0 0 6px',
              color:         '#ffffff',
            }}>
              SHANE BELL
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize:   13,
              fontWeight: 300,
              color:      'rgba(255,255,255,0.45)',
              margin:     0,
            }}>
              Software Engineer · Luton, UK
            </p>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
            {navLinks.map(({ label, href, to }) =>
              to ? (
                <Link
                  key={label}
                  to={to}
                  style={{
                    fontFamily:     "'Inter', sans-serif",
                    fontSize:       14,
                    fontWeight:     400,
                    color:          'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                    transition:     'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  {label}
                </Link>
              ) : (
                <a
                  key={label}
                  href={href!}
                  style={{
                    fontFamily:     "'Inter', sans-serif",
                    fontSize:       14,
                    fontWeight:     400,
                    color:          'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                    transition:     'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  {label}
                </a>
              )
            )}
          </nav>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {socialLinks.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width:           40,
                  height:          40,
                  borderRadius:    '50%',
                  border:          '1px solid rgba(255,255,255,0.12)',
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  color:           'rgba(255,255,255,0.55)',
                  textDecoration:  'none',
                  transition:      'border-color 0.2s, color 0.2s, background-color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor      = 'rgb(94,103,230)';
                  e.currentTarget.style.color            = '#ffffff';
                  e.currentTarget.style.backgroundColor  = 'rgba(94,103,230,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor      = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.color            = 'rgba(255,255,255,0.55)';
                  e.currentTarget.style.backgroundColor  = 'transparent';
                }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* ── Bottom row: copyright + availability badge ── */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          flexWrap:       'wrap',
          gap:            16,
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize:   13,
            fontWeight: 300,
            color:      'rgba(255,255,255,0.35)',
            margin:     0,
          }}>
            © {year} Shane Bell. All rights reserved.
          </p>

          <div style={{
            display:         'flex',
            alignItems:      'center',
            gap:             8,
            padding:         '6px 14px',
            borderRadius:    999,
            border:          '1px solid rgba(52,211,153,0.3)',
            backgroundColor: 'rgba(52,211,153,0.08)',
          }}>
            <span style={{
              width:           7,
              height:          7,
              borderRadius:    '50%',
              backgroundColor: 'rgb(52,211,153)',
              display:         'inline-block',
              boxShadow:       '0 0 6px rgb(52,211,153)',
            }} />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize:   12,
              fontWeight: 500,
              color:      'rgb(52,211,153)',
            }}>
              Available for work
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
