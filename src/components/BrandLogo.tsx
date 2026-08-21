import React from 'react';

interface BrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  tagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  tagline = true,
  className = '',
  onClick
}) => {
  const sizeMap = {
    xs: { icon: 'w-7 h-7', text: 'text-base', badge: 'text-[9px] px-1 py-0.2', sub: 'text-[9px]' },
    sm: { icon: 'w-8 h-8', text: 'text-lg', badge: 'text-[10px] px-1.5 py-0.5', sub: 'text-[10px]' },
    md: { icon: 'w-10 h-10', text: 'text-xl', badge: 'text-xs px-1.5 py-0.5', sub: 'text-[10px]' },
    lg: { icon: 'w-14 h-14', text: 'text-2xl', badge: 'text-xs px-2 py-0.5', sub: 'text-xs' },
    xl: { icon: 'w-20 h-20', text: 'text-3xl', badge: 'text-sm px-2.5 py-1', sub: 'text-sm' },
  };

  const current = sizeMap[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 ${onClick ? 'cursor-pointer select-none group' : ''} ${className}`}
    >
      {/* Logo Vector Icon Mark (100% Reliable, Zero-Latency Vector) */}
      <div className={`relative ${current.icon} rounded-xl p-0.5 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 shadow-md shadow-cyan-500/20 shrink-0 transition-transform ${onClick ? 'group-hover:scale-105' : ''}`}>
        <div className="w-full h-full rounded-[10px] bg-slate-950 overflow-hidden flex items-center justify-center relative p-1.5">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            aria-label="ZEECOM SOLUTION Brand Icon"
          >
            <defs>
              <linearGradient id="zeecom_mark_grad" x1="8" y1="10" x2="40" y2="38" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" />
                <stop offset="0.5" stopColor="#06b6d4" />
                <stop offset="1" stopColor="#6366f1" />
              </linearGradient>
              <radialGradient id="zeecom_glow" cx="24" cy="24" r="16" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0ea5e9" stopOpacity="0.4" />
                <stop offset="1" stopColor="#0ea5e9" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Background ambient glow */}
            <circle cx="24" cy="24" r="16" fill="url(#zeecom_glow)" />
            {/* Geometric Cyber Z-Chassis */}
            <path
              d="M10 13H38L16 35H38"
              stroke="url(#zeecom_mark_grad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Optical AI Camera Aperture Node */}
            <circle cx="38" cy="13" r="3.2" fill="#38bdf8" stroke="#020617" strokeWidth="1.2" />
            <circle cx="10" cy="13" r="2.2" fill="#06b6d4" />
            {/* Telecom / Audio Signal Nodes */}
            <circle cx="16" cy="35" r="2.2" fill="#818cf8" />
            <circle cx="38" cy="35" r="3.2" fill="#6366f1" stroke="#020617" strokeWidth="1.2" />
            {/* Central Optical Focus Point */}
            <circle cx="26" cy="24" r="1.8" fill="#38bdf8" />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-extrabold tracking-wider ${current.text} bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent`}>
              ZEECOM
            </span>
            <span className={`rounded font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono ${current.badge}`}>
              SOLUTION
            </span>
          </div>
          {tagline && (
            <p className={`${current.sub} text-slate-400 font-medium tracking-tight -mt-0.5`}>
              Intelligent Integrated Systems
            </p>
          )}
        </div>
      )}
    </div>
  );
};
