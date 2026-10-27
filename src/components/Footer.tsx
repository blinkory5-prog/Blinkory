import React from 'react';
import { Youtube, Instagram, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-neutral-900 bg-neutral-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand & Subtitle */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <span className="font-extrabold tracking-wider text-white text-base font-mono uppercase">
              ABHAY CREATE
            </span>
          </div>
          <span className="text-xs text-neutral-400 font-medium">
            Animator Applications
          </span>
        </div>

        {/* Minimal Middle Note */}
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Shield className="w-3.5 h-3.5 text-neutral-400" />
          <span>Official Creator Hiring Portal • 4.16M Subscribers</span>
        </div>

        {/* Social Link Badges */}
        <div className="flex items-center gap-4 text-neutral-400">
          <a
            href="https://www.youtube.com/@Abhay.create"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abhay Create YouTube Channel"
            className="flex items-center gap-1.5 text-xs hover:text-white transition-colors"
          >
            <Youtube className="w-4 h-4 text-red-500" />
            <span className="hidden md:inline">@Abhay.create</span>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            className="flex items-center gap-1.5 text-xs hover:text-white transition-colors"
          >
            <Instagram className="w-4 h-4 text-neutral-400 hover:text-white" />
            <span className="hidden md:inline">Instagram</span>
          </a>
        </div>

      </div>
    </footer>
  );
};
