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
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-heading font-bold text-amber-400 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Community Meta Build Presets
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Leaderboard-proven builds mathematically optimized for high-tier stage clears and endless survival.
              Every build is tagged with its strategic Purpose.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Current App Goal:</span>
            <span className="font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
              {purposeLabels[currentPurpose]?.icon} {purposeLabels[currentPurpose]?.label || currentPurpose}
            </span>
          </div>
        </div>

        {/* Filter by Purpose */}
        <div className="pt-4 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5 text-amber-400" /> Filter by Purpose:
          </span>
          <button
            onClick={() => setFilterPurpose('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
              filterPurpose === 'ALL'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
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
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                  filterPurpose === key
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {info.icon} {info.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Meta Builds */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBuilds.map((b) => {
          const isTopLeaderboard = b.id === 'leaderboard_quad_god';
          const isCurrentPurposeMatch = b.purpose === currentPurpose;
          const purposeInfo = purposeLabels[b.purpose] || { label: b.purpose, icon: '🎯', color: 'bg-slate-800 text-slate-300' };

          return (
            <div
              key={b.id}
              className={`p-5 rounded-2xl transition-all flex flex-col justify-between shadow-xl group ${
                isTopLeaderboard
                  ? 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border-2 border-amber-500/80 shadow-amber-500/20'
                  : isCurrentPurposeMatch
                  ? 'bg-slate-900/90 border-2 border-amber-500/50 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/70 border border-slate-800 hover:border-amber-500/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold border ${
                    isTopLeaderboard
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    {isTopLeaderboard ? '👑 #1 WORLD RECORD META' : b.difficulty}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-amber-400" /> {b.character}
                  </span>
                </div>

                {/* Purpose Tag Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${purposeInfo.color}`}>
                    {purposeInfo.icon} Purpose: {purposeInfo.label}
                  </span>
                  {isCurrentPurposeMatch && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                      ✓ Active Goal Match
                    </span>
                  )}
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
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Load Preset Build ({b.name})
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
