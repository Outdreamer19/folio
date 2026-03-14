import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.div
      initial={{ x: 150, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', bounce: 0, duration: 1, delay: 0.3 }}
      style={{
        position:          'absolute',
        top:               24,
        left:              '50%',
        transform:         'translateX(-50%)',
        zIndex:            50,
        background:        'rgba(255,255,255,0.92)',
        backdropFilter:    'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius:      28,
        height:            56,
        paddingLeft:       12,
        paddingRight:      12,
        display:           'flex',
        alignItems:        'center',
        gap:               16,
        boxShadow:         '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        minWidth:          340,
        whiteSpace:        'nowrap',
      }}
    >
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
        <img
          src="/shane-bell.jpg"
          alt="Shane Bell"
          style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0, objectFit: 'cover' }}
        />
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize:   15,
          fontWeight: 300,
          color:      'rgb(48, 48, 48)',
        }}>
          Available for work
        </span>
        <span style={{
          width:           8,
          height:          8,
          borderRadius:    '50%',
          backgroundColor: 'rgb(11, 222, 102)',
          flexShrink:      0,
          boxShadow:       '0 0 6px rgba(11,222,102,0.5)',
        }} />
      </div>

      {/* Download CV button */}
      <motion.a
        href="/Shane_Bell_CV.pdf"
        download="Shane_Bell_CV.pdf"
        whileHover={{ backgroundColor: 'rgba(94,103,230,0.12)', borderColor: 'rgb(94,103,230)' }}
        whileTap={{ scale: 0.97 }}
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          gap:            6,
          padding:        '6px 14px',
          borderRadius:   999,
          border:         '1px solid rgba(94,103,230,0.3)',
          backgroundColor:'rgba(94,103,230,0.06)',
          fontFamily:     "'Inter', sans-serif",
          fontSize:       13,
          fontWeight:     500,
          color:          'rgb(94, 103, 230)',
          textDecoration: 'none',
          flexShrink:     0,
          transition:     'background-color 0.2s, border-color 0.2s',
        }}
      >
        {/* Download icon */}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        CV
      </motion.a>

      {/* Hamburger button */}
      <button
        style={{
          width:           40,
          height:          40,
          borderRadius:    '99px',
          backgroundColor: 'rgb(94, 103, 230)',
          border:          'none',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          cursor:          'pointer',
          flexShrink:      0,
          transition:      'background-color 0.2s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgb(74, 83, 210)')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgb(94, 103, 230)')}
        aria-label="Open menu"
      >
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <rect y="0"  width="18" height="2" rx="1" fill="white" />
          <rect y="6"  width="14" height="2" rx="1" fill="white" />
          <rect y="12" width="10" height="2" rx="1" fill="white" />
        </svg>
      </button>
    </motion.div>
  );
}
