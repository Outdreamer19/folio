import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const xMotion = useMotionValue(0);
  const yMotion = useMotionValue(0);

  const xSpringRing = useSpring(xMotion, { damping: 25, stiffness: 300 });
  const ySpringRing = useSpring(yMotion, { damping: 25, stiffness: 300 });

  const xSpringDot = useSpring(xMotion, { damping: 50, stiffness: 800 });
  const ySpringDot = useSpring(yMotion, { damping: 50, stiffness: 800 });

  const [opacity, setOpacity] = useState(0);
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [projectColor, setProjectColor] = useState('');
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    document.body.style.cursor = 'none';

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setOpacity(1);
      xMotion.set(e.clientX);
      yMotion.set(e.clientY);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;

      const projectElement = target.closest('[data-cursor="project"]');
      if (projectElement) {
        setIsHoveringProject(true);
        const cursorColor = projectElement.getAttribute('data-cursor-color');
        setProjectColor(cursorColor || '');
        return;
      }

      const interactiveElement = target.closest('a, button, [role="button"]');
      if (interactiveElement) {
        setIsHoveringInteractive(true);
        return;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;

      const projectElement = target.closest('[data-cursor="project"]');
      if (projectElement) {
        setIsHoveringProject(false);
        setProjectColor('');
        return;
      }

      const interactiveElement = target.closest('a, button, [role="button"]');
      if (interactiveElement) {
        setIsHoveringInteractive(false);
        return;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [xMotion, yMotion]);

  const isTouchDevice = window.matchMedia('(hover: none)').matches;
  if (isTouchDevice) return null;

  const ringSize = isHoveringProject ? 72 : 40;
  const dotScale = isHoveringInteractive ? 1.5 : 1;
  const ringBackgroundColor = isHoveringProject ? 'rgba(255,255,255,0.15)' : 'transparent';
  const ringBorderColor = isHoveringProject && projectColor ? projectColor : '#ffffff';

  return (
    <div ref={cursorRef}>
      {/* ── Ring ── mix-blend-mode lives on the outermost fixed element so it
           blends against actual page content, not a parent stacking context   */}
      <motion.div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          x: xSpringRing,
          y: ySpringRing,
          opacity: opacity,
          // blend mode on the same element as position:fixed so it blends
          // against the viewport, not a trapped stacking context
          mixBlendMode: isHoveringProject ? 'normal' : 'difference',
        }}
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            backgroundColor: ringBackgroundColor,
            borderColor: ringBorderColor,
          }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            border: '1.5px solid',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isHoveringProject && (
            <span
              style={{
                fontFamily: 'Antonio, sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                color: '#ffffff',
                letterSpacing: '0.5px',
              }}
            >
              VIEW
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* ── Dot ── */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          x: xSpringDot,
          y: ySpringDot,
          opacity: opacity,
          mixBlendMode: 'difference',
        }}
      >
        <motion.div
          animate={{
            scale: dotScale,
          }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 8,
            height: 8,
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>
    </div>
  );
}
