import React from 'react';
import { Trophy, Swords, BookOpen, Package, User, Play, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { metaBuilds } from '../data/megabonkData.js';

export default function MetaBuilds({ onLoadBuild }) {
  const handleLoad = (build) => {
    onLoadBuild(build);
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h2 className="text-xl font-heading font-bold text-amber-400 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          Community Meta Build Presets
        </h2>
        <p className="text-sm text-slate-400 mt-0.5">
          Leaderboard-proven builds mathematically optimized for high-tier stage clears and endless survival.
          Click any build to load it into the Build Simulator and Upgrade Advisor.
        </p>
      </div>

      {/* Grid of Meta Builds */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {metaBuilds.map((b) => (
          <div
            key={b.id}
            className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/80 transition-all flex flex-col justify-between shadow-xl group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  {b.difficulty}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-amber-400" /> {b.character}
                </span>
              </div>

              <h3 className="text-lg font-heading font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                {b.name}
              </h3>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                {b.description}
              </p>

              {/* Weapons */}
              <div className="mb-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
                  Weapons Arsenal:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {b.weapons.map((w) => (
                    <span
                      key={w}
                      className="text-xs px-2 py-0.5 rounded-lg bg-slate-950 text-slate-200 border border-slate-800 font-semibold"
                    >
                      ⚔️ {w}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tomes */}
              <div className="mb-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
                  Core Tomes:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {b.tomes.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded-lg bg-slate-950 text-amber-300/90 border border-slate-800 font-semibold"
                    >
                      📖 {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Items */}
              <div className="mb-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
                  Synergy Items:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {b.keyItems.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2 py-0.5 rounded-lg bg-slate-950 text-purple-300/90 border border-slate-800 font-semibold"
                    >
                      💎 {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Load Button */}
            <button
              onClick={() => handleLoad(b)}
              className="w-full mt-2 py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Load Preset Build
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
