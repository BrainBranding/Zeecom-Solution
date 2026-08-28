import React from 'react';

/**
 * Exact ZEECOM Icon-Only Mark
 * Preserves exact uploaded geometry, deep purple (#261653), and vibrant yellow (#FFD51B).
 */
export const ZeecomIconMark: React.FC<{
  className?: string;
  size?: number | string;
}> = ({ className = 'w-8 h-8', size }) => {
  return (
    <svg
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-hidden="true"
    >
      {/* 1. Top-Left Purple Bracket */}
      <path
        d="M 50 60 H 540 L 350 250 H 180 V 430 L 50 300 Z"
        fill="#261653"
      />

      {/* 2. Upper Parallel Purple Diagonal Band */}
      <path
        d="M 50 670 L 490 230 L 550 290 L 110 730 L 50 730 Z"
        fill="#261653"
      />

      {/* 3. Vibrant Yellow Center Stripe */}
      <path
        d="M 50 810 L 680 180 L 740 240 L 140 840 L 140 940 L 50 940 Z"
        fill="#FFD51B"
      />

      {/* 4. Ascending Purple Arrow Stripe & Arrowhead */}
      <path
        d="M 230 940 L 350 940 L 850 440 L 790 380 Z"
        fill="#261653"
      />
      <path
        d="M 725 80 L 950 50 L 920 275 L 835 210 L 780 265 L 745 230 L 805 170 Z"
        fill="#261653"
      />

      {/* 5. Bottom-Right Purple Bracket */}
      <path
        d="M 950 940 H 460 L 650 750 H 820 V 570 L 950 700 Z"
        fill="#261653"
      />
    </svg>
  );
};

/**
 * Exact ZEECOM Wordmark Vector
 * Deep Purple (#261653) with geometric cuts matching uploaded typography
 */
export const ZeecomWordmark: React.FC<{
  className?: string;
  fill?: string;
}> = ({ className = 'h-5', fill = '#261653' }) => {
  return (
    <svg
      viewBox="0 0 880 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ZEECOM"
    >
      <g fill={fill}>
        {/* Z: Sliced diagonal */}
        <path d="M 0 0 H 130 V 28 L 50 112 H 130 V 140 H 0 V 112 L 80 28 H 0 Z" />

        {/* E1: Geometric 3-bar */}
        <path d="M 155 0 H 265 V 28 H 188 V 56 H 255 V 84 H 188 V 112 H 265 V 140 H 155 Z" />

        {/* E2: Second geometric E */}
        <path d="M 290 0 H 400 V 28 H 323 V 56 H 390 V 84 H 323 V 112 H 400 V 140 H 290 Z" />

        {/* C: Beveled Octagonal Cuts */}
        <path d="M 460 0 H 540 V 28 H 472 L 448 52 V 88 L 472 112 H 540 V 140 H 460 L 420 100 V 40 Z" />

        {/* O: Beveled Ring */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 595 0 H 655 L 695 40 V 100 L 655 140 H 595 L 555 100 V 40 Z M 598 28 L 583 43 V 97 L 598 112 H 652 L 667 97 V 43 L 652 28 Z"
        />

        {/* M: Sharp Angular Stems */}
        <path d="M 710 0 H 742 L 795 82 L 848 0 H 880 V 140 H 852 V 52 L 805 125 H 785 L 738 52 V 140 H 710 Z" />
      </g>
    </svg>
  );
};

export interface BrandLogoProps {
  /** Size scale: 'xs' | 'sm' | 'md' | 'lg' | 'xl' */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** 'complete' uses the full logo with icon + wordmark, 'icon' uses icon-only */
  format?: 'complete' | 'icon';
  /** 'horizontal' (side-by-side icon + wordmark) or 'stacked' (icon above wordmark) */
  layout?: 'horizontal' | 'stacked';
  /** Show the "SOLUTION" badge alongside or under */
  solutionBadge?: boolean;
  /** Show tagline "Intelligent Integrated Systems" */
  tagline?: boolean;
  /** Extra container className */
  className?: string;
  /** Click action */
  onClick?: () => void;
  /** Light container background tone (defaults to true for dark website background) */
  withContainer?: boolean;
}

/**
 * Universal Zeecom Brand Logo Component
 * - Preserves exact uploaded logo geometry, colors (#261653 & #FFD51B), and typography.
 * - Renders within a subtle, clean white/light container so dark-purple elements remain high-contrast & crisp against the dark theme.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  format = 'complete',
  layout = 'horizontal',
  solutionBadge = true,
  tagline = false,
  className = '',
  onClick,
  withContainer = true,
}) => {
  // Dimension mappings with calibrated proportions & minimal empty container padding
  const dimensions = {
    xs: {
      icon: 'w-6 h-6',
      wordmark: 'h-3.5',
      badge: 'text-[8.5px] px-1 py-0.2',
      container: 'px-1.5 py-0.5 gap-1.5 rounded-md',
      tagline: 'text-[9px]',
    },
    sm: {
      icon: 'w-7 sm:w-8 h-7 sm:h-8',
      wordmark: 'h-4 sm:h-4.5',
      badge: 'text-[9px] sm:text-[9.5px] px-1.5 py-0.5',
      container: 'px-2 py-0.5 sm:px-2.5 sm:py-0.5 gap-1.5 sm:gap-2 rounded-lg',
      tagline: 'text-[10px]',
    },
    md: {
      // Header standard size: slightly increased, tight padding
      icon: 'w-9 h-9 sm:w-10 sm:h-10',
      wordmark: 'h-5 sm:h-6',
      badge: 'text-[9.5px] sm:text-[10px] px-1.5 py-0.5',
      container: 'px-2 py-0.5 sm:px-2.5 sm:py-1 gap-2 sm:gap-2.5 rounded-lg',
      tagline: 'text-[11px]',
    },
    lg: {
      // Hero section size: ~25% larger with compact container padding
      icon: 'w-12 h-12 sm:w-14 sm:h-14',
      wordmark: 'h-7 sm:h-8',
      badge: 'text-xs px-2 py-0.5',
      container: 'px-2.5 py-1 sm:px-3 sm:py-1.5 gap-2.5 sm:gap-3 rounded-xl',
      tagline: 'text-xs',
    },
    xl: {
      icon: 'w-16 h-16 sm:w-20 sm:h-20',
      wordmark: 'h-10 sm:h-12',
      badge: 'text-sm px-2.5 py-1',
      container: 'px-3.5 py-1.5 sm:px-4 sm:py-2 gap-3.5 sm:gap-4 rounded-2xl',
      tagline: 'text-sm',
    },
  }[size];

  // Subtle clean light container to ensure dark purple #261653 elements are perfectly legible
  const containerClasses = withContainer
    ? 'bg-white/95 hover:bg-white text-slate-950 shadow-sm shadow-black/20 border border-white/30 backdrop-blur-md transition-all'
    : '';

  // ICON ONLY VARIANT
  if (format === 'icon') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center ${containerClasses} ${dimensions.container} ${
          onClick ? 'cursor-pointer select-none group' : ''
        } ${className}`}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
        aria-label="ZEECOM"
      >
        <ZeecomIconMark className={`${dimensions.icon} shrink-0 transition-transform ${onClick ? 'group-hover:scale-105' : ''}`} />
      </div>
    );
  }

  // STACKED COMPLETE LOGO (Exact aspect ratio matching uploaded Zeecom-complete-logo-transparent.png)
  if (layout === 'stacked') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex flex-col items-center justify-center text-center ${containerClasses} ${dimensions.container} ${
          onClick ? 'cursor-pointer select-none group' : ''
        } ${className}`}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
        aria-label="ZEECOM SOLUTION"
      >
        <ZeecomIconMark className={`${dimensions.icon} shrink-0 transition-transform ${onClick ? 'group-hover:scale-105' : ''}`} />
        <div className="mt-1.5 flex items-center justify-center gap-1.5">
          <ZeecomWordmark className={`${dimensions.wordmark} w-auto`} />
          {solutionBadge && (
            <span className={`font-mono font-bold uppercase rounded bg-[#261653] text-[#FFD51B] ${dimensions.badge}`}>
              SOLUTION
            </span>
          )}
        </div>
        {tagline && (
          <p className={`${dimensions.tagline} text-slate-600 font-medium tracking-tight mt-1`}>
            Intelligent Integrated Systems
          </p>
        )}
      </div>
    );
  }

  // HORIZONTAL COMPLETE LOGO (Cleanest lockup for navigation headers & footers)
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center ${containerClasses} ${dimensions.container} ${
        onClick ? 'cursor-pointer select-none group' : ''
      } ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
      aria-label="ZEECOM SOLUTION"
    >
      {/* Icon Mark */}
      <ZeecomIconMark className={`${dimensions.icon} shrink-0 transition-transform ${onClick ? 'group-hover:scale-105' : ''}`} />

      {/* Wordmark & Badge */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <ZeecomWordmark className={`${dimensions.wordmark} w-auto shrink-0`} />
          {solutionBadge && (
            <span className={`font-mono font-extrabold uppercase rounded bg-[#261653] text-[#FFD51B] tracking-wider ${dimensions.badge}`}>
              SOLUTION
            </span>
          )}
        </div>
        {tagline && (
          <p className={`${dimensions.tagline} text-slate-600 font-medium tracking-tight -mt-0.5`}>
            Intelligent Integrated Systems
          </p>
        )}
      </div>
    </div>
  );
};
