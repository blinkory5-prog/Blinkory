import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onApplyClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onApplyClick }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-900/80 bg-neutral-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-base shadow-sm shadow-red-600/30 group-hover:scale-105 transition-transform">
              ▶
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-wider text-white text-lg leading-tight uppercase font-mono">
                ABHAY CREATE
              </span>
              <span className="text-[11px] text-neutral-400 font-medium tracking-wide">
                4.16M+ Community
              </span>
            </div>
          </a>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300 ml-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span>Animator Hiring</span>
          </div>
        </div>

        {/* Right Action */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs text-neutral-400">
            <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
            <span>Shorts & Social Motion</span>
          </div>

          <button
            type="button"
            onClick={onApplyClick}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-white text-neutral-950 hover:bg-neutral-200 active:scale-95 font-semibold text-sm transition-all shadow-sm shadow-white/10 cursor-pointer"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4 text-neutral-900" />
          </button>
        </div>
      </div>
    </header>
  );
};
