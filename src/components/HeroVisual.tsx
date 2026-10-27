import React, { useState, useEffect } from 'react';
import { Play, Pause, Layers, Film, Volume2, Sparkles, Sliders, Activity } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playheadPos, setPlayheadPos] = useState<number>(38); // percentage 0 - 100

  // Animate playhead continuously when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPlayheadPos((prev) => (prev >= 95 ? 5 : prev + 0.6));
    }, 40);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="relative w-full rounded-2xl bg-neutral-900/60 border border-neutral-800 shadow-2xl backdrop-blur-sm overflow-hidden flex flex-col">
      {/* Editor Window Topbar */}
      <div className="px-4 py-2.5 bg-neutral-950/90 border-b border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>
          </div>
          <span className="font-mono text-neutral-300 font-semibold flex items-center gap-1">
            <Film className="w-3.5 h-3.5 text-red-500" />
            abhay_shorts_hook_01.aep
          </span>
          <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-neutral-800 text-[10px] text-neutral-400 font-mono">
            9:16 Shorts
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="text-neutral-400 hidden sm:inline">60.00 FPS</span>
          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-red-400 font-semibold">
            {`00:0${Math.floor(playheadPos / 20)}:${Math.floor((playheadPos * 3) % 60).toString().padStart(2, '0')}`}
          </span>
        </div>
      </div>

      {/* Main Preview Monitor & Composition Canvas */}
      <div className="relative p-4 sm:p-5 flex flex-col items-center justify-center bg-gradient-to-b from-neutral-950 to-neutral-900/80 min-h-[260px] sm:min-h-[290px] overflow-hidden">
        {/* Background Subtle Grid */}
        <div className="absolute inset-0 timeline-grid opacity-20 pointer-events-none" />

        {/* 9:16 Shorts Mockup Frame */}
        <div className="relative w-44 sm:w-52 aspect-[9/16] rounded-xl bg-neutral-950 border-2 border-neutral-700/80 shadow-2xl overflow-hidden flex flex-col items-center justify-between p-3 group">
          {/* Subtle top indicator */}
          <div className="w-full flex items-center justify-between z-10 text-[9px] font-mono text-neutral-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
              REC
            </span>
            <span className="px-1.5 py-0.5 rounded bg-black/60 text-white font-semibold">4K 60fps</span>
          </div>

          {/* Animated 2D Cartoon Character & Graphics (Inspired by Abhay Create Avatar) */}
          <div className="relative w-full flex-1 flex flex-col items-center justify-center my-1">
            {/* Speed / Energy lines */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="w-28 h-28 border border-dashed border-red-500/40 rounded-full animate-spin" style={{ animationDuration: '12s' }}></div>
            </div>

            {/* Stylized Vector Character Illustration */}
            <div className="relative z-10 flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
              {/* Character Head */}
              <div className="relative">
                {/* Hair */}
                <div className="w-16 h-12 bg-neutral-900 rounded-t-2xl border-t-2 border-x-2 border-neutral-700 relative">
                  <div className="absolute -top-1 left-2 w-3 h-3 bg-neutral-900 rotate-45"></div>
                  <div className="absolute -top-1 right-3 w-4 h-3 bg-neutral-900 rotate-12"></div>
                </div>

                {/* Face */}
                <div className="w-16 h-14 bg-amber-100 rounded-b-2xl border-2 border-t-0 border-neutral-800 flex flex-col items-center relative shadow-sm">
                  {/* Cool Dark Sunglasses */}
                  <div className="mt-2 flex items-center gap-1.5 z-20">
                    <div className="w-5 h-3.5 bg-neutral-950 rounded-sm border border-neutral-700 relative shadow-sm">
                      <div className="absolute top-0.5 left-0.5 w-1.5 h-1 bg-white/40 rounded-xs"></div>
                    </div>
                    <div className="w-1.5 h-0.5 bg-neutral-900"></div>
                    <div className="w-5 h-3.5 bg-neutral-950 rounded-sm border border-neutral-700 relative shadow-sm">
                      <div className="absolute top-0.5 left-0.5 w-1.5 h-1 bg-white/40 rounded-xs"></div>
                    </div>
                  </div>

                  {/* Confident Grin */}
                  <div className="mt-2 w-5 h-2 border-b-2 border-neutral-900 rounded-full"></div>
                </div>
              </div>

              {/* Collar & Tie */}
              <div className="relative -mt-1 flex flex-col items-center">
                <div className="w-14 h-8 bg-white border-2 border-neutral-800 rounded-t-md flex justify-center relative shadow-inner">
                  {/* Tie */}
                  <div className="w-3 h-9 bg-neutral-900 border-x border-neutral-700 rounded-b-sm shadow-sm flex flex-col items-center">
                    <div className="w-1 h-2 bg-red-600 mt-1"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Motion Graphic Pop Badge */}
            <div className="absolute -bottom-1 -right-1 z-20 px-2 py-0.5 rounded-md bg-red-600 text-[10px] font-black text-white tracking-wider uppercase shadow-lg shadow-red-600/40 rotate-[-4deg] animate-bounce" style={{ animationDuration: '2.5s' }}>
              10M HOOK!
            </div>

            {/* Transform handles overlay (showing motion keyframe editing) */}
            <div className="absolute inset-x-2 inset-y-4 border border-dashed border-red-500/60 rounded pointer-events-none">
              <span className="absolute -top-1 -left-1 w-2 h-2 bg-red-500 rounded-xs"></span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-xs"></span>
              <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-500 rounded-xs"></span>
              <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-red-500 rounded-xs"></span>
            </div>
          </div>

          {/* Bottom Title bar */}
          <div className="w-full text-center z-10 pt-1 border-t border-neutral-800/80">
            <span className="text-[10px] text-neutral-300 font-semibold tracking-wide block truncate">
              Dynamic Short Storytelling
            </span>
          </div>
        </div>

        {/* Play/Pause scrub controller */}
        <div className="mt-3 flex items-center gap-2 z-10">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause preview' : 'Play preview'}
            className="w-7 h-7 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors shadow cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
          <span className="text-[11px] font-mono text-neutral-400">
            {isPlaying ? 'Live Composition Scrubbing' : 'Scrubber Paused'}
          </span>
        </div>
      </div>

      {/* Cinematic Timeline Area */}
      <div className="p-3 bg-neutral-950 border-t border-neutral-800/90 flex flex-col gap-1.5 font-mono text-[11px]">
        {/* Timeline Header Ruler */}
        <div className="relative h-5 w-full bg-neutral-900/60 rounded border border-neutral-800/60 flex items-center px-2 text-[10px] text-neutral-400 select-none">
          <div className="flex justify-between w-full">
            <span>00:00</span>
            <span>00:01</span>
            <span>00:02</span>
            <span>00:03</span>
            <span>00:04</span>
            <span>00:05</span>
          </div>
        </div>

        {/* Multi-Track Timeline Container */}
        <div className="relative flex flex-col gap-1 py-1">
          {/* Animated Scrubbing Playhead */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-30 pointer-events-none transition-all duration-75"
            style={{ left: `${playheadPos}%` }}
          >
            <div className="w-2.5 h-2.5 bg-red-500 -ml-1 rounded-sm rotate-45 shadow-sm shadow-red-500/50"></div>
          </div>

          {/* Track 1: Motion Graphic Hooks */}
          <div className="h-6 rounded bg-neutral-900 border border-neutral-800 flex items-center px-2 justify-between text-neutral-300">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-red-400" />
              <span className="text-[10px] font-medium text-neutral-300">V3: Keyframe Graphic FX</span>
            </div>
            {/* Keyframe diamonds */}
            <div className="flex items-center gap-3 pr-2">
              <span className="w-2 h-2 rotate-45 bg-amber-400 inline-block"></span>
              <span className="w-2 h-2 rotate-45 bg-amber-400 inline-block"></span>
              <span className="w-2 h-2 rotate-45 bg-amber-400 inline-block"></span>
            </div>
          </div>

          {/* Track 2: 2D Rigged Character Animation */}
          <div className="h-6 rounded bg-neutral-900 border border-neutral-800 flex items-center px-2 justify-between text-neutral-300">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-neutral-400" />
              <span className="text-[10px] font-medium text-neutral-300">V2: Vector Character Rig</span>
            </div>
            <div className="w-24 h-2.5 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[9px] text-neutral-300">
              Motion Curve
            </div>
          </div>

          {/* Track 3: Audio & SFX */}
          <div className="h-6 rounded bg-neutral-900 border border-neutral-800 flex items-center px-2 justify-between text-neutral-300">
            <div className="flex items-center gap-1.5">
              <Volume2 className="w-3 h-3 text-green-400" />
              <span className="text-[10px] font-medium text-neutral-300">A1: Voiceover & Sound Design</span>
            </div>
            {/* Waveform graphic bars */}
            <div className="flex items-center gap-0.5 h-3">
              {[4, 8, 12, 10, 6, 14, 11, 7, 12, 16, 8, 5, 13, 9, 15, 6].map((h, i) => (
                <span
                  key={i}
                  className="w-0.5 bg-green-500/80 rounded-full"
                  style={{ height: `${h}px` }}
                ></span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom tags */}
        <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-neutral-900 text-[10px] text-neutral-400">
          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 flex items-center gap-1">
            <Activity className="w-3 h-3 text-red-500" />
            Viral Short Pacing
          </span>
          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 flex items-center gap-1">
            <Sliders className="w-3 h-3 text-neutral-400" />
            Expressive 2D Animation
          </span>
        </div>
      </div>
    </div>
  );
};
