import { cn } from '@/lib/utils';
import React, { type ReactNode } from 'react';

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export const AuroraBackground = ({
  className,
  children,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn('relative flex flex-col h-screen items-center justify-center bg-white', className)}
        {...props}
      >
        <div className="aurora-wrap">
          <div className="aurora-layer" />
        </div>
        {children}
      </div>
    </main>
  );
};

// ── Standalone aurora layer ────────────────────────────────────
// Drop this inside any existing section as the first child.
export function AuroraLayer({ opacity = 0.35 }: { opacity?: number }) {
  return (
    <div className="aurora-wrap" style={{ opacity }}>
      <div className="aurora-layer" />
    </div>
  );
}
