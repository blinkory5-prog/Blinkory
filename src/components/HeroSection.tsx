import React from 'react';
import { ArrowDown, Flame, CheckCircle2 } from 'lucide-react';
import { HeroVisual } from './HeroVisual.tsx';

interface HeroSectionProps {
  onApplyClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onApplyClick }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-neutral-900">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/60 border border-red-800/60 text-red-400 text-xs font-semibold tracking-wider uppercase">
              <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>WE&apos;RE HIRING</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Let&apos;s Create <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
                Something Insane.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl font-normal">
              We&apos;re looking for a creative animator who can turn ideas into engaging, high-quality videos. If you understand motion, timing, storytelling, and viral content, we want to hear from you.
            </p>

            {/* CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={onApplyClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold text-base transition-all shadow-lg shadow-red-600/25 cursor-pointer group"
              >
                <span>Apply for the Role</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <span className="text-xs sm:text-sm text-neutral-400 font-medium">
                Have a portfolio? Share your best work.
              </span>
            </div>

            {/* Creator Channel Footprint */}
            <div className="pt-4 border-t border-neutral-900/90 w-full flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-red-500" />
                <span>YouTube Creator: <strong className="text-neutral-200">Abhay Create</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-red-500" />
                <span>Format: <strong className="text-neutral-200">Shorts & Social Motion</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-red-500" />
                <span>Role: <strong className="text-neutral-200">Video Animator</strong></span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Area */}
          <div className="lg:col-span-5 w-full">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
};
