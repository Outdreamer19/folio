import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionItem {
  id: number;
  title: string;
  items: string[];
}

const services: AccordionItem[] = [
  {
    id: 1,
    title: '1. FULL STACK DEVELOPMENT',
    items: [
      'End-to-end web application development with Laravel & Vue.js',
      'RESTful API design and third-party API integrations',
      'Database architecture and optimised SQL query design',
      'CI/CD pipelines via Laravel Forge on Digital Ocean',
    ],
  },
  {
    id: 2,
    title: '2. SAAS PRODUCTS',
    items: [
      'SaaS platform architecture from zero to production',
      'Stripe payment integration: one-time and subscriptions',
      'Multi-role authentication and user management systems',
      'Scalable, maintainable codebases built to grow with the product',
    ],
  },
  {
    id: 3,
    title: '3. FRONTEND ENGINEERING',
    items: [
      'Reactive SPAs with Vue 3 (Composition API) and React',
      'Responsive, mobile-first UI with TailwindCSS and SASS',
      'TypeScript for type-safe, maintainable front-end code',
      'Performance optimisation and component-level architecture',
    ],
  },
  {
    id: 4,
    title: '4. TECHNICAL LEADERSHIP',
    items: [
      'Mentoring junior developers and code review',
      'Translating business requirements into technical solutions',
      'Cross-functional collaboration with designers, BAs, and QA',
      'Agile delivery: pragmatic balance of speed, cost, and quality',
    ],
  },
];

function AccordionRow({ item }: { item: AccordionItem }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div style={{ height: 1, backgroundColor: 'rgba(48,48,48,0.12)' }} />

      <button
        onClick={() => setOpen(!open)}
        style={{
          width:      '100%',
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding:    '20px 0',
          background: 'transparent',
          border:     'none',
          cursor:     'pointer',
          textAlign:  'left',
        }}
      >
        <span style={{
          fontFamily:    "'Antonio', sans-serif",
          fontSize:      32,
          fontWeight:    400,
          color:         'rgb(48, 48, 48)',
          textTransform: 'uppercase',
          letterSpacing: '0.01em',
        }}>
          {item.title}
        </span>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          style={{
            width:           36,
            height:          36,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            borderRadius:    '50%',
            backgroundColor: open ? 'rgb(94, 103, 230)' : 'rgba(48,48,48,0.07)',
            flexShrink:      0,
            transition:      'background-color 0.25s ease',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 9L7 4L12 9"
              stroke={open ? 'white' : 'rgb(48,48,48)'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
            style={{ overflow: 'hidden' }}
          >
            <ul style={{
              paddingBottom: 24,
              paddingLeft:   0,
              listStyle:     'none',
              display:       'flex',
              flexDirection: 'column',
              gap:           10,
            }}>
              {item.items.map((s, i) => (
                <li key={i} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize:   15,
                  fontWeight: 300,
                  color:      'rgb(48, 48, 48)',
                  display:    'flex',
                  alignItems: 'center',
                  gap:        10,
                }}>
                  <span style={{
                    width:           6,
                    height:          6,
                    borderRadius:    '50%',
                    backgroundColor: 'rgb(94, 103, 230)',
                    flexShrink:      0,
                  }} />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      style={{
        width:           '100%',
        backgroundColor: '#ffffff',
        padding:         '100px 40px',
      }}
    >
      <div style={{
        maxWidth:            1200,
        margin:              '0 auto',
        display:             'grid',
        gridTemplateColumns: '1fr 1fr',
        gap:                 80,
        alignItems:          'start',
      }}>
        {/* LEFT — accordion */}
        <div>
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            style={{ marginBottom: 52 }}
          >
            <h2 style={{
              fontFamily:    "'Antonio', sans-serif",
              fontSize:      'clamp(32px, 4vw, 48px)',
              fontWeight:    700,
              color:         'rgb(48, 48, 48)',
              textTransform: 'uppercase',
              lineHeight:    1.1,
              letterSpacing: '-0.01em',
              marginBottom:  16,
            }}>
              WHAT I BUILD FOR YOU
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize:   16,
              fontWeight: 300,
              color:      'rgb(48, 48, 48)',
              lineHeight: 1.6,
              maxWidth:   460,
            }}>
              I build things end to end. From the database up to the UI, I take ownership
              of the full product and care about performance, reliability and clean code.
            </p>
          </motion.div>

          <div>
            {services.map((service) => (
              <AccordionRow key={service.id} item={service} />
            ))}
            <div style={{ height: 1, backgroundColor: 'rgba(48,48,48,0.12)' }} />
          </div>
        </div>

        {/* RIGHT — empty spacer; the fixed TravelingCard overlays this area */}
        <div style={{ minHeight: 380 }} />
      </div>
    </section>
  );
}
