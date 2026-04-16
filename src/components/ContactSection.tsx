import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ── Wave-hand emoji button ─────────────────────────────────────
function WaveButton() {
  const [waving, setWaving] = useState(false);
  return (
    <motion.button
      aria-label="Say hello"
      onClick={() => setWaving(w => !w)}
      animate={waving ? { rotate: [0, -20, 20, -20, 20, 0] } : { rotate: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.08 }}
      style={{
        position:        'absolute',
        bottom:          -28,
        left:            -28,
        width:           80,
        height:          80,
        borderRadius:    '50%',
        backgroundColor: 'rgb(94, 103, 230)',
        border:          'none',
        cursor:          'pointer',
        fontSize:        34,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        boxShadow:       '0 8px 32px rgba(94,103,230,0.35)',
        zIndex:          10,
      }}
    >
      👋
    </motion.button>
  );
}

// ── Label component ────────────────────────────────────────────
function FieldLabel({ children }: { children: string }) {
  return (
    <label style={{
      fontFamily:  "'Inter', sans-serif",
      fontSize:    13,
      fontWeight:  500,
      color:       'rgb(94, 103, 230)',
      letterSpacing: '0.04em',
      marginBottom: 6,
      display:     'block',
    }}>
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  width:           '100%',
  padding:         '14px 16px',
  backgroundColor: 'rgb(245, 245, 248)',
  border:          '1px solid transparent',
  borderRadius:    12,
  fontFamily:      "'Inter', sans-serif",
  fontSize:        15,
  color:           'rgb(30, 30, 30)',
  outline:         'none',
  transition:      'border-color 0.2s, background-color 0.2s',
  boxSizing:       'border-box' as const,
};

// ── Services list ──────────────────────────────────────────────
const SERVICES = [
  'Full Stack Development',
  'SaaS Product Build',
  'Frontend Engineering',
  'Technical Leadership',
  'Other',
];

// ── Main component ─────────────────────────────────────────────
export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject  = encodeURIComponent(`Portfolio Enquiry — ${form.service || 'General'}`);
    const body     = encodeURIComponent(
      `Hi Shane,\n\nName: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\n\n${form.message}`
    );
    window.open(`mailto:shane@shanebell.dev?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  const fadeUp = (delay = 0) => ({
    initial:   { opacity: 0, y: 32 },
    animate:   inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  });

  return (
    <section
      id="contact"
      style={{
        width:           '100%',
        backgroundColor: '#ffffff',
        padding:         'clamp(60px, 10vw, 140px) clamp(20px, 6vw, 96px)',
        boxSizing:       'border-box',
      }}
    >
      <style>{`
        .contact-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: clamp(260px, 38%, 460px) 1fr;
          gap: clamp(40px, 6vw, 96px);
          align-items: center;
        }
        .contact-photo { display: block; }
        .contact-name-email { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 767px) {
          .contact-grid { grid-template-columns: 1fr; gap: 32px; }
          .contact-photo { display: none; }
          .contact-name-email { grid-template-columns: 1fr; gap: 16px; }
        }
      `}</style>
      <div
        ref={ref}
        className="contact-grid"
      >
        {/* ── LEFT: portrait card (hidden on mobile) ─────────── */}
        <motion.div {...fadeUp(0)} className="contact-photo" style={{ position: 'relative' }}>
          <div style={{
            borderRadius:  24,
            overflow:      'hidden',
            aspectRatio:   '3 / 4',
            backgroundColor: '#f0f0f0',
            boxShadow:     '0 24px 64px rgba(0,0,0,0.10)',
          }}>
            <img
              src="/shane-bell.jpg"
              alt="Shane Bell"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
            />
          </div>
          <WaveButton />
        </motion.div>

        {/* ── RIGHT: heading + form ────────────────────────────── */}
        <div>
          {/* Heading */}
          <motion.h2 {...fadeUp(0.1)} style={{
            fontFamily:    "'Antonio', sans-serif",
            fontSize:      'clamp(48px, 6vw, 86px)',
            fontWeight:    700,
            color:         'rgb(24, 24, 24)',
            textTransform: 'uppercase',
            lineHeight:    0.92,
            letterSpacing: '-0.02em',
            margin:        '0 0 20px',
          }}>
            Let's Work<br />Together
          </motion.h2>

          <motion.p {...fadeUp(0.15)} style={{
            fontFamily: "'Inter', sans-serif",
            fontSize:   16,
            fontWeight: 300,
            color:      'rgb(80, 80, 90)',
            lineHeight: 1.65,
            margin:     '0 0 36px',
            maxWidth:   480,
          }}>
            Got a project in mind? I'd love to hear about it. Drop me a message
            and I'll get back to you.
          </motion.p>

          {/* Form */}
          <motion.form {...fadeUp(0.2)} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Name + Email row */}
            <div className="contact-name-email" style={{ display: 'grid', gap: 16 }}>
              <div>
                <FieldLabel>Name</FieldLabel>
                <input
                  type="text"
                  placeholder="John Smith"
                  value={form.name}
                  required
                  onChange={e => handleChange('name', e.target.value)}
                  onFocus={() => setFocused('name')}
                  onBlur={()  => setFocused(null)}
                  style={{
                    ...inputStyle,
                    borderColor: focused === 'name' ? 'rgb(94,103,230)' : 'transparent',
                    backgroundColor: focused === 'name' ? '#ffffff' : 'rgb(245,245,248)',
                  }}
                />
              </div>
              <div>
                <FieldLabel>Email</FieldLabel>
                <input
                  type="email"
                  placeholder="johnsmith@gmail.com"
                  value={form.email}
                  required
                  onChange={e => handleChange('email', e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={()  => setFocused(null)}
                  style={{
                    ...inputStyle,
                    borderColor: focused === 'email' ? 'rgb(94,103,230)' : 'transparent',
                    backgroundColor: focused === 'email' ? '#ffffff' : 'rgb(245,245,248)',
                  }}
                />
              </div>
            </div>

            {/* Service dropdown */}
            <div>
              <FieldLabel>Service Needed ?</FieldLabel>
              <div style={{ position: 'relative' }}>
                <select
                  value={form.service}
                  onChange={e => handleChange('service', e.target.value)}
                  onFocus={() => setFocused('service')}
                  onBlur={()  => setFocused(null)}
                  style={{
                    ...inputStyle,
                    appearance:  'none',
                    cursor:      'pointer',
                    borderColor: focused === 'service' ? 'rgb(94,103,230)' : 'transparent',
                    backgroundColor: focused === 'service' ? '#ffffff' : 'rgb(245,245,248)',
                    color:       form.service ? 'rgb(30,30,30)' : 'rgb(160,160,170)',
                    paddingRight: 44,
                  }}
                >
                  <option value="" disabled>Select...</option>
                  {SERVICES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {/* Chevron */}
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="rgb(120,120,130)" strokeWidth="2" strokeLinecap="round"
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>

            {/* Message textarea */}
            <div>
              <FieldLabel>What Can I Help You...</FieldLabel>
              <textarea
                rows={5}
                placeholder="Hello, I'd like to enquire about..."
                value={form.message}
                onChange={e => handleChange('message', e.target.value)}
                onFocus={() => setFocused('message')}
                onBlur={()  => setFocused(null)}
                style={{
                  ...inputStyle,
                  resize:      'vertical',
                  minHeight:   130,
                  borderColor: focused === 'message' ? 'rgb(94,103,230)' : 'transparent',
                  backgroundColor: focused === 'message' ? '#ffffff' : 'rgb(245,245,248)',
                  lineHeight:  1.6,
                }}
              />
            </div>

            {/* Submit */}
            <div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{  scale: 0.98 }}
                style={{
                  padding:         '15px 48px',
                  backgroundColor: submitted ? 'rgb(52,211,153)' : 'transparent',
                  border:          `2px solid ${submitted ? 'rgb(52,211,153)' : 'rgb(94,103,230)'}`,
                  borderRadius:    999,
                  fontFamily:      "'Antonio', sans-serif",
                  fontSize:        16,
                  fontWeight:      700,
                  letterSpacing:   '0.12em',
                  color:           submitted ? '#ffffff' : 'rgb(94,103,230)',
                  cursor:          'pointer',
                  transition:      'background-color 0.25s, border-color 0.25s, color 0.25s',
                }}
              >
                {submitted ? '✓ MESSAGE SENT' : 'SUBMIT'}
              </motion.button>
            </div>

          </motion.form>
        </div>
      </div>
    </section>
  );
}
