import React from 'react';
import logoImg from '../assets/images/zeecom_logo.webp';

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
      {/* Logo Icon Mark */}
      <div className={`relative ${current.icon} rounded-xl p-0.5 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 shadow-md shadow-cyan-500/20 shrink-0 transition-transform ${onClick ? 'group-hover:scale-105' : ''}`}>
        <div className="w-full h-full rounded-[10px] bg-slate-950 overflow-hidden flex items-center justify-center relative">
          <img
            src={logoImg}
            alt="ZEECOM SOLUTION Logo"
            width="56"
            height="56"
            loading="eager"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
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
