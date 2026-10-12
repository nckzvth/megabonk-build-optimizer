import React, { useState } from 'react';
import { Trophy, Swords, BookOpen, Package, User, Play, Sparkles, CheckCircle2, Shield, Crosshair, Zap, Filter, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { metaBuilds } from '../data/megabonkData.js';

export default function MetaBuilds({ onLoadBuild, currentPurpose = 'leaderboard', setPurpose }) {
  const [filterPurpose, setFilterPurpose] = useState('ALL');

  const purposeLabels = {
    leaderboard: { label: 'Leaderboard God', icon: '👑', color: 'text-amber-400' },
    dps_pure: { label: 'Glass Cannon (DPS)', icon: '⚔️', color: 'text-red-400' },
    balanced: { label: 'Balanced (DPS+EHP)', icon: '🛡️', color: 'text-blue-400' },
    tank_thorns: { label: 'Immortal Tank', icon: '🗿', color: 'text-emerald-400' },
    crit_burst: { label: 'Overcrit Burst', icon: '🎯', color: 'text-purple-400' },
    speed_farming: { label: 'Economy & Speed', icon: '⚡', color: 'text-cyan-400' },
  };

  const handleLoad = (build) => {
    onLoadBuild(build);
    if (setPurpose && build.purpose) {
      setPurpose(build.purpose);
    }
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const filteredBuilds = metaBuilds.filter(b => {
    if (filterPurpose === 'ALL') return true;
    return b.purpose === filterPurpose;
  });

  // Featured flagship build
  const flagship = metaBuilds.find(b => b.id === 'leaderboard_quad_god') || metaBuilds[0];

  return (
    <div className="max-w-6xl mx-auto py-4 space-y-14">
      {/* 1. EDITORIAL HEADER & ACTIVE GOAL (BORDERLESS) */}
      <div className="pb-6 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
            Endgame Meta Lineup
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Curated Community Archetypes
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-light">
            Mathematically tuned builds for record leaderboard depths and boss obliteration.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-zinc-500">Active Purpose:</span>
          <span className="font-semibold px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
            {purposeLabels[currentPurpose]?.icon} {purposeLabels[currentPurpose]?.label || currentPurpose}
          </span>
        </div>
      </div>

      {/* 2. APPLE KEYNOTE HERO SHOWCASE: THE FLAGSHIP BUILD (ZERO CARDS) */}
      {flagship && (
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
                👑 #1 FLAGSHIP ARCHETYPE
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Hero: <strong className="text-white">{flagship.character}</strong>
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              {flagship.name}
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 font-light max-w-3xl leading-relaxed">
              {flagship.description}
            </p>
          </div>

          {/* Large Hero Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-white/[0.08] font-mono">
            <div>
              <div className="text-[11px] text-zinc-500 uppercase tracking-widest">Tome Synergy</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1">
                4/4 Quad Tome
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">XP • Luck • Curse • Chaos</div>
            </div>

            <div>
              <div className="text-[11px] text-zinc-500 uppercase tracking-widest">Endless Scaling</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
                Infinite
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">uncapped stage ramp</div>
            </div>

            <div>
              <div className="text-[11px] text-zinc-500 uppercase tracking-widest">Hero Pick</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {flagship.character}
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">starting arsenal match</div>
            </div>

            <div>
              <div className="text-[11px] text-zinc-500 uppercase tracking-widest">Run Purpose</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 mt-1">
                Leaderboard
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">global high-score target</div>
            </div>
          </div>

          {/* Key Arsenal Stream */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-zinc-500 font-mono text-[11px] uppercase mr-1">Loadout:</span>
              {flagship.weapons.map(w => (
                <span key={w} className="px-2.5 py-1 rounded-full bg-white/[0.04] text-zinc-300 font-medium">
                  ⚔️ {w}
                </span>
              ))}
              {flagship.tomes.map(t => (
                <span key={t} className="px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-300 font-medium">
                  📖 {t}
                </span>
              ))}
            </div>

            <button
              onClick={() => handleLoad(flagship)}
              className="px-8 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-400/20 cursor-pointer flex items-center justify-center gap-2 shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Load Flagship Preset</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. FULL ARCHETYPE LINEUP (BORDERLESS COMPARISON LEDGER, ZERO CARDS) */}
      <div className="space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
              Lineup Catalog
            </span>
            <h2 className="text-xl font-bold tracking-tight text-white">
              All Archetype Presets
            </h2>
          </div>

          {/* Filter Pills (NO HORIZONTAL SCROLL) */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setFilterPurpose('ALL')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                filterPurpose === 'ALL'
                  ? 'bg-amber-400 text-slate-950 font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              All ({metaBuilds.length})
            </button>
            {Object.entries(purposeLabels).map(([key, info]) => {
              const count = metaBuilds.filter(b => b.purpose === key).length;
              if (count === 0) return null;
              return (
                <button
                  key={key}
                  onClick={() => setFilterPurpose(key)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    filterPurpose === key
                      ? 'bg-amber-400 text-slate-950 font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {info.icon} {info.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Ledger Comparison Rows */}
        <div className="divide-y divide-white/[0.06] border-y border-white/[0.08]">
          {filteredBuilds.map((b, idx) => {
            const isMatch = b.purpose === currentPurpose;
            const purposeInfo = purposeLabels[b.purpose] || { label: b.purpose, icon: '🎯', color: 'text-zinc-400' };

            return (
              <div
                key={b.id}
                className="py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-white/[0.015] transition-colors"
              >
                {/* Left: Identity & Strategy */}
                <div className="space-y-1.5 lg:w-2/5">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs text-zinc-600 font-bold">
                      {idx < 9 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <h3 className="font-bold text-base text-white tracking-tight">
                      {b.name}
                    </h3>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${purposeInfo.color} bg-white/[0.03]`}>
                      {purposeInfo.icon} {purposeInfo.label}
                    </span>
                    {isMatch && (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full text-emerald-400 bg-emerald-400/10">
                        Active Goal
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-zinc-400 font-light leading-relaxed pl-7">
                    {b.description}
                  </p>

                  <div className="text-[11px] font-mono text-zinc-500 pl-7 flex items-center gap-2">
                    <span>Hero: <strong className="text-zinc-300">{b.character}</strong></span>
                    <span>•</span>
                    <span>Difficulty: <strong className="text-zinc-300">{b.difficulty}</strong></span>
                  </div>
                </div>

                {/* Center: Weapons, Tomes & Synergy Items */}
                <div className="space-y-1.5 lg:w-2/5 pl-7 lg:pl-0">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    {b.weapons.map(w => (
                      <span key={w} className="px-2 py-0.5 rounded-full bg-white/[0.03] text-zinc-300 text-[11px]">
                        ⚔️ {w}
                      </span>
                    ))}
                    {b.tomes.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 text-[11px]">
                        📖 {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Items:</span>
                    {b.keyItems.map(item => (
                      <span key={item} className="text-[11px] text-zinc-400">
                        💎 {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Load Button */}
                <div className="shrink-0 pl-7 lg:pl-0 flex items-center justify-end">
                  <button
                    onClick={() => handleLoad(b)}
                    className="px-5 py-2 rounded-full bg-white/[0.06] hover:bg-white text-zinc-300 hover:text-black font-semibold text-xs tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Load Preset</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
