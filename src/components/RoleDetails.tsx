import React from 'react';
import { Film, Clapperboard, Sparkles, Check, Clock, Zap } from 'lucide-react';

export const RoleDetails: React.FC = () => {
  const cards = [
    {
      label: 'Role',
      title: 'Video Animator',
      description:
        'Transform concepts and scripts into punchy, high-retention 2D animated scenes, character interactions, and motion graphics that hook viewers in the first 3 seconds.',
      icon: Film,
      highlights: [
        '2D Character animation & expressive poses',
        'Kinetic typography & dynamic callouts',
        'Visual gags, memes, and narrative pacing',
      ],
      tag: 'Full / Project Basis',
    },
    {
      label: 'Work',
      title: 'YouTube Shorts & Social Content',
      description:
        'Produce engaging short-form vertical animations (9:16) for YouTube Shorts, Instagram Reels, and social channels, watched by millions of active subscribers.',
      icon: Clapperboard,
      highlights: [
        'Fast-paced 15–60s video narratives',
        'Seamless integration with voiceover & live footage',
        'Optimized for mobile retention & replayability',
      ],
      tag: 'YouTube Shorts Focus',
    },
    {
      label: 'Ideal Candidate',
      title: 'Creative, Reliable & Story-Driven',
      description:
        'You understand motion language, visual comedy, and the cadence of viral content. You have strong craft discipline, meet deadlines, and love experimenting.',
      icon: Sparkles,
      highlights: [
        'Skilled in animation & visual storytelling',
        'Proficient in After Effects, Animate, or similar tools',
        'Communicative, proactive, and open to feedback',
      ],
      tag: 'Artistic Excellence',
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-b border-neutral-900 bg-neutral-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-300 uppercase tracking-widest mb-3">
            <Zap className="w-3.5 h-3.5 text-red-500" />
            <span>Position Overview</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            The Role & What We Are Looking For
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Join the creative team behind Abhay Create to push boundaries in short-form storytelling.
          </p>
        </div>

        {/* Three Compact Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between hover:bg-neutral-900/60 shadow-lg hover:shadow-neutral-900/80"
              >
                <div>
                  {/* Top Bar with Icon & Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-white group-hover:scale-105 group-hover:border-red-500/50 transition-all">
                      <Icon className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 font-medium">
                      {card.tag}
                    </span>
                  </div>

                  {/* Role Category Label */}
                  <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mb-1">
                    {card.label}
                  </span>

                  {/* Card Title */}
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Key Bullet Highlights */}
                <div className="pt-4 border-t border-neutral-800/80 space-y-2.5">
                  {card.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-medium">
                      <div className="w-4 h-4 rounded-full bg-red-950/80 border border-red-800/60 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-red-400" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Fast Turnaround note */}
        <div className="mt-10 p-4 rounded-xl bg-neutral-900/30 border border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
            <span>
              All applications are reviewed directly by the core team. Selected animators will be invited for a paid test scene.
            </span>
          </div>
          <span className="text-neutral-400 font-mono text-[11px] shrink-0">
            Remote • Fast Feedback
          </span>
        </div>

      </div>
    </section>
  );
};
