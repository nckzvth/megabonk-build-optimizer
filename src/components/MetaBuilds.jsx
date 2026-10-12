import React, { useState } from 'react';
import { Trophy, Swords, BookOpen, Package, User, Play, Sparkles, CheckCircle2, Shield, Crosshair, Zap, Filter } from 'lucide-react';
import confetti from 'canvas-confetti';
import { metaBuilds } from '../data/megabonkData.js';

export default function MetaBuilds({ onLoadBuild, currentPurpose = 'leaderboard', setPurpose }) {
  const [filterPurpose, setFilterPurpose] = useState('ALL');

  const purposeLabels = {
    leaderboard: { label: 'Leaderboard God', icon: '👑', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    dps_pure: { label: 'Glass Cannon (DPS)', icon: '⚔️', color: 'bg-red-500/20 text-red-300 border-red-500/40' },
    balanced: { label: 'Balanced (DPS+EHP)', icon: '🛡️', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
    tank_thorns: { label: 'Immortal Tank', icon: '🗿', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
    crit_burst: { label: 'Overcrit Burst', icon: '🎯', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
    speed_farming: { label: 'Economy & Speed', icon: '⚡', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
  };

  const handleLoad = (build) => {
    onLoadBuild(build);
    if (setPurpose && build.purpose) {
      setPurpose(build.purpose);
    }
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const filteredBuilds = metaBuilds.filter(b => {
    if (filterPurpose === 'ALL') return true;
    return b.purpose === filterPurpose;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-amber-400" />
            Community Meta Build Presets
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Endgame builds mathematically optimized for high-tier stage clears and endless survival.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-zinc-500">Current App Goal:</span>
          <span className="font-semibold px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
            {purposeLabels[currentPurpose]?.icon} {purposeLabels[currentPurpose]?.label || currentPurpose}
          </span>
        </div>
      </div>

      {/* Filter by Purpose */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setFilterPurpose('ALL')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
            filterPurpose === 'ALL'
              ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
              : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.07] border border-white/[0.06]'
          }`}
        >
          All Presets ({metaBuilds.length})
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
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.07] border border-white/[0.06]'
              }`}
            >
              {info.icon} {info.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid of Meta Builds */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBuilds.map((b) => {
          const isTopLeaderboard = b.id === 'leaderboard_quad_god';
          const isCurrentPurposeMatch = b.purpose === currentPurpose;
          const purposeInfo = purposeLabels[b.purpose] || { label: b.purpose, icon: '🎯', color: 'bg-white/[0.05] text-zinc-300 border-white/[0.08]' };

          return (
            <div
              key={b.id}
              className={`p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between ${
                isTopLeaderboard
                  ? 'bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-amber-400/50 ring-1 ring-amber-400/20 shadow-2xl shadow-amber-500/10'
                  : isCurrentPurposeMatch
                  ? 'bg-white/[0.03] border border-amber-400/40 shadow-xl'
                  : 'bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold ${
                    isTopLeaderboard
                      ? 'bg-amber-400 text-slate-950 font-black'
                      : 'bg-white/[0.05] text-zinc-400 border border-white/[0.08]'
                  }`}>
                    {isTopLeaderboard ? '👑 #1 WORLD RECORD' : b.difficulty}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" /> {b.character}
                  </span>
                </div>

                {/* Purpose Tag Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded-full border ${purposeInfo.color}`}>
                    {purposeInfo.icon} {purposeInfo.label}
                  </span>
                  {isCurrentPurposeMatch && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 font-semibold">
                      ✓ Active Goal
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                  {b.name}
                </h3>

                <p className="text-xs text-zinc-400 mb-5 leading-relaxed font-sans">
                  {b.description}
                </p>

                {/* Weapons */}
                <div className="mb-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold block mb-1.5">
                    Weapons:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {b.weapons.map((w) => (
                      <span
                        key={w}
                        className="text-xs px-2.5 py-0.5 rounded-lg bg-white/[0.03] text-zinc-200 border border-white/[0.06] font-medium"
                      >
                        ⚔️ {w}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tomes */}
                <div className="mb-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold block mb-1.5">
                    Tomes:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {b.tomes.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-0.5 rounded-lg bg-white/[0.03] text-amber-300 border border-white/[0.06] font-medium"
                      >
                        📖 {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Items */}
                <div className="mb-5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold block mb-1.5">
                    Synergy Items:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {b.keyItems.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2.5 py-0.5 rounded-lg bg-white/[0.03] text-purple-300 border border-white/[0.06] font-medium"
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
                className="w-full mt-2 py-2.5 px-4 rounded-full bg-white/[0.06] hover:bg-amber-400 hover:text-black text-white font-semibold text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/[0.08]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Load Preset Build
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
