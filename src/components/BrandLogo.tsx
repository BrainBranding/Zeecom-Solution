import React from 'react';

interface BrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  tagline?: boolean;
  className?: string;
  onClick?: () => void;
  variant?: 'adaptive' | 'light' | 'dark';
}

/**
 * Official ZEECOM Vector Icon Mark
 * Faithfully matches the uploaded Zeecom-icon.jpg with:
 * 1. Top-Left Corner Geometric Bracket
 * 2. Upper Parallel Diagonal Band
 * 3. Central Signature Vibrant Gold/Yellow (#FFCC00) Band
 * 4. Forward-Ascending Arrow Stripe & Arrowhead
 * 5. Bottom-Right Corner Geometric Bracket
 */
export const ZeecomIconMark: React.FC<{ className?: string; isLight?: boolean }> = ({
  className = 'w-full h-full',
  isLight = false,
}) => {
  // In light theme, primary shapes use the deep brand navy (#231846).
  // In dark/ambient UI, they use high-contrast cyan/sky/indigo tones with ambient glow.
  const primaryFill = isLight ? '#231846' : 'url(#zeecom_ambient_primary)';
  const yellowFill = '#FFCC00';

  return (
    <svg
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Ambient Dark-Mode Primary Gradient */}
        <linearGradient id="zeecom_ambient_primary" x1="50" y1="50" x2="950" y2="950" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="0.5" stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>

        {/* Gold Glow Filter for High Contrast */}
        <filter id="zeecom_gold_glow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#FFCC00" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* 1. Top-Left Bracket */}
      <path
        d="M 50 50 H 540 L 370 220 H 180 V 440 L 50 310 Z"
        fill={primaryFill}
      />

      {/* 2. Upper Diagonal Band */}
      <path
        d="M 50 670 L 490 230 L 550 290 L 110 730 L 50 730 Z"
        fill={primaryFill}
      />

      {/* 3. Official Center Vibrant Yellow / Gold Band */}
      <path
        d="M 50 810 L 680 180 L 735 235 L 140 830 L 140 950 L 50 950 Z"
        fill={yellowFill}
        filter="url(#zeecom_gold_glow)"
      />

      {/* 4. Ascending Arrow Stripe & Arrowhead */}
      {/* Arrow Shaft */}
      <path
        d="M 230 950 L 350 950 L 850 450 L 790 390 Z"
        fill={primaryFill}
      />
      {/* Arrowhead */}
      <path
        d="M 730 80 L 950 50 L 920 270 L 840 210 L 780 270 L 750 240 L 810 180 Z"
        fill={primaryFill}
      />

      {/* 5. Bottom-Right Bracket */}
      <path
        d="M 950 950 H 460 L 630 780 H 820 V 560 L 950 690 Z"
        fill={primaryFill}
      />
    </svg>
  );
};

/**
 * Official ZEECOM Custom Geometric Wordmark
 * Recreates the exact sliced-Z, beveled C & O, and sharp M from Zeecom-complete-logo.jpg
 */
export const ZeecomWordmark: React.FC<{ className?: string; isLight?: boolean }> = ({
  className = 'h-6',
  isLight = false,
}) => {
  const textColor = isLight ? '#231846' : '#FFFFFF';

  return (
    <svg
      viewBox="0 0 780 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ZEECOM"
    >
      <g fill={textColor}>
        {/* Z: Custom sliced bottom-left diagonal */}
        <path d="M 10 20 H 115 V 45 L 45 115 H 115 V 140 H 10 V 115 L 80 45 H 10 Z" />
        <path d="M 10 140 L 35 115 H 55 L 30 140 Z" fill="#FFCC00" />

        {/* E: Clean geometric vertical with 3 bars */}
        <path d="M 140 20 H 235 V 45 H 168 V 68 H 225 V 93 H 168 V 115 H 235 V 140 H 140 Z" />

        {/* E: Second geometric E */}
        <path d="M 260 20 H 355 V 45 H 288 V 68 H 345 V 93 H 288 V 115 H 355 V 140 H 260 Z" />

        {/* C: Angled / Beveled Corners */}
        <path d="M 405 20 H 475 L 475 45 H 415 L 395 65 V 95 L 415 115 H 475 V 140 H 405 L 370 105 V 55 Z" />

        {/* O: Beveled Hexagonal Ring */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 525 20 H 575 L 610 55 V 105 L 575 140 H 525 L 490 105 V 55 Z M 528 45 L 515 58 V 102 L 528 115 H 572 L 585 102 V 58 L 572 45 Z"
        />

        {/* M: Sharp Angular Stems */}
        <path d="M 625 20 H 652 L 700 88 L 748 20 H 775 V 140 H 750 V 62 L 708 122 H 692 L 650 62 V 140 H 625 Z" />
      </g>
    </svg>
  );
};

/**
 * Universal BrandLogo Component
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  tagline = true,
  className = '',
  onClick,
  variant = 'adaptive'
}) => {
  const isLight = variant === 'light';

  const sizeMap = {
    xs: { icon: 'w-7 h-7', wordmark: 'h-4', badge: 'text-[9px] px-1 py-0.2', sub: 'text-[9px]' },
    sm: { icon: 'w-8 h-8', wordmark: 'h-5', badge: 'text-[10px] px-1.5 py-0.5', sub: 'text-[10px]' },
    md: { icon: 'w-10 h-10', wordmark: 'h-6', badge: 'text-xs px-1.5 py-0.5', sub: 'text-[10px]' },
    lg: { icon: 'w-14 h-14', wordmark: 'h-8', badge: 'text-xs px-2 py-0.5', sub: 'text-xs' },
    xl: { icon: 'w-20 h-20', wordmark: 'h-11', badge: 'text-sm px-2.5 py-1', sub: 'text-sm' },
  };

  const current = sizeMap[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 ${onClick ? 'cursor-pointer select-none group' : ''} ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
      aria-label="ZEECOM SOLUTION"
    >
      {/* Official ZEECOM Icon Mark */}
      <div className={`relative ${current.icon} rounded-xl p-0.5 bg-gradient-to-br from-amber-400/50 via-cyan-500/30 to-indigo-600/50 shadow-md shadow-cyan-500/10 shrink-0 transition-transform ${onClick ? 'group-hover:scale-105' : ''}`}>
        <div className="w-full h-full rounded-[10px] bg-slate-950/90 backdrop-blur-sm overflow-hidden flex items-center justify-center p-1 border border-cyan-500/20">
          <ZeecomIconMark className="w-full h-full" isLight={isLight} />
        </div>
      </div>

      {/* Brand Typography & Tagline */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <ZeecomWordmark className={`${current.wordmark} w-auto`} isLight={isLight} />
            <span className={`rounded font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30 font-mono tracking-wider ${current.badge}`}>
              SOLUTION
            </span>
          </div>
          {tagline && (
            <p className={`${current.sub} text-slate-400 font-medium tracking-tight mt-0.5`}>
              Intelligent Integrated Systems
            </p>
          )}
        </div>
      )}
    </div>
  );
};
