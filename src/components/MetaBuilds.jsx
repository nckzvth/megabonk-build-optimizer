import React, { useState } from 'react';
import { Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { metaBuilds } from '../data/megabonkData.js';
import { getCharacterPortrait, getWeaponIcon, getTomeIcon, getItemIcon } from '../data/gameUiIcons.js';

export default function MetaBuilds({ onLoadBuild, currentPurpose = 'leaderboard', setPurpose }) {
  const [filterPurpose, setFilterPurpose] = useState('ALL');

  const purposeLabels = {
    leaderboard: { label: 'Leaderboard God', icon: '👑', color: 'text-[#ffe600]' },
    dps_pure: { label: 'Glass Cannon (DPS)', icon: '⚔️', color: 'text-red-400' },
    balanced: { label: 'Balanced (DPS+EHP)', icon: '🛡️', color: 'text-[#38bdf8]' },
    tank_thorns: { label: 'Immortal Tank', icon: '🗿', color: 'text-[#2ee619]' },
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

  const flagship = metaBuilds.find(b => b.id === 'leaderboard_quad_god') || metaBuilds[0];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 1. FLAGSHIP ARCHETYPE INSPECTOR WINDOW (Matches Megachad Right Panel in Screenshot 1) */}
      {flagship && (
        <div className="mb-window">
          <div className="mb-window-header">
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
              👑 #1 WORLD RECORD FLAGSHIP ARCHETYPE
            </h2>
            <span className="text-xs font-mono text-[#ffe600] font-bold">
              HERO: {flagship.character.toUpperCase()}
            </span>
          </div>

          <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Portrait + Description */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 mb-slot-blue mb-reticle flex items-center justify-center text-4xl shrink-0">
                  {getCharacterPortrait(flagship.character).emoji}
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase text-[#ffe600] font-bold">
                    ENDLESS SCALING META BUILD
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {flagship.name}
                  </h3>
                  <div className="text-xs text-zinc-300 font-mono">
                    Hero: <strong className="text-white">{flagship.character}</strong> • Goal: <strong className="text-[#ffe600]">Leaderboard God</strong>
                  </div>
                </div>
              </div>

              <p className="text-sm text-white leading-relaxed border-y border-[#3d424a] py-3">
                {flagship.description}
              </p>

              {/* Weapons & Tomes Slot Strip (Skin Row Style) */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase text-[#ffe600]">Core Weapons & Tomes</div>
                <div className="flex flex-wrap gap-2">
                  {flagship.weapons.map(w => (
                    <span key={w} className="mb-slot-blue px-2.5 py-1 text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{getWeaponIcon(w)}</span>
                      <span>{w}</span>
                    </span>
                  ))}
                  {flagship.tomes.map(t => (
                    <span key={t} className="mb-slot-red px-2.5 py-1 text-xs font-bold text-[#ffe600] flex items-center gap-1.5">
                      <span>{getTomeIcon(t)}</span>
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Telemetry Bars + Chunky Blue CONFIRM Button */}
            <div className="lg:col-span-5 space-y-4 lg:border-l-2 border-[#3c4148] lg:pl-6">
              <div className="space-y-2">
                <div className="p-2.5 bg-[#16191d] border border-[#5a6068]">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#ffe600] font-bold">Quad Tome Synergy</span>
                    <span className="text-[#2ee619] font-mono font-bold">4 / 4 LOCKED</span>
                  </div>
                  <div className="mb-progress-track">
                    <div className="mb-progress-fill-green" style={{ width: '100%' }} />
                  </div>
                </div>

                <div className="p-2.5 bg-[#16191d] border border-[#5a6068]">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#ffe600] font-bold">Late-Game Endless Ceiling</span>
                    <span className="text-[#38bdf8] font-mono font-bold">INFINITE</span>
                  </div>
                  <div className="mb-progress-track">
                    <div className="mb-progress-fill-blue" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleLoad(flagship)}
                className="mb-btn-blue w-full py-3 text-base uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>CONFIRM & LOAD FLAGSHIP BUILD</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. ALL META ARCHETYPES LEADERBOARD WINDOW */}
      <div className="mb-window">
        <div className="mb-window-header flex-wrap">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
            CURATED COMMUNITY ARCHETYPE BUILDS
          </h2>
          <span className="text-xs font-mono text-[#ffe600] font-bold">
            {filteredBuilds.length} VERIFIED BUILDS
          </span>
        </div>

        {/* Sub-Tabs for Purpose Filtering */}
        <div className="mb-subtab-bar flex-wrap">
          <button
            onClick={() => setFilterPurpose('ALL')}
            className={`mb-subtab ${filterPurpose === 'ALL' ? 'mb-subtab-active' : ''}`}
          >
            ALL BUILDS ({metaBuilds.length})
          </button>
          {Object.entries(purposeLabels).map(([key, info]) => {
            const count = metaBuilds.filter(b => b.purpose === key).length;
            if (count === 0) return null;
            return (
              <button
                key={key}
                onClick={() => setFilterPurpose(key)}
                className={`mb-subtab ${filterPurpose === key ? 'mb-subtab-active' : ''}`}
              >
                {info.icon} {info.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Alternating Striped Build Rows */}
        <div className="divide-y divide-[#2c3036]">
          {filteredBuilds.map((b, idx) => {
            const isMatch = b.purpose === currentPurpose;
            const purposeInfo = purposeLabels[b.purpose] || { label: b.purpose, icon: '🎯', color: 'text-white' };
            const portrait = getCharacterPortrait(b.character);

            return (
              <div
                key={b.id}
                className={`p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                  isMatch ? 'mb-row-highlight' : idx % 2 === 0 ? 'mb-row-odd' : 'mb-row-even'
                }`}
              >
                {/* Left: Rank + Hero Portrait + Build Name & Description */}
                <div className="flex items-start gap-3.5 lg:w-5/12">
                  <span className="font-mono font-bold text-white text-sm pt-1">
                    #{idx + 1}
                  </span>
                  <div className="w-12 h-12 mb-slot-blue flex items-center justify-center text-2xl shrink-0">
                    {portrait.emoji}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-base text-[#ffe600]">
                        {b.name}
                      </h3>
                      <span className="text-[10px] font-mono uppercase px-1.5 bg-black/50 border border-[#5a6068] text-white">
                        {purposeInfo.icon} {purposeInfo.label}
                      </span>
                    </div>
                    <p className="text-xs text-white leading-relaxed">
                      {b.description}
                    </p>
                    <div className="text-xs font-mono text-zinc-300">
                      Hero: <strong className="text-[#ffe600]">{b.character}</strong> • Difficulty: <strong className="text-white">{b.difficulty}</strong>
                    </div>
                  </div>
                </div>

                {/* Center: Arsenal Slots */}
                <div className="space-y-2 lg:w-5/12">
                  <div className="flex flex-wrap gap-1.5">
                    {b.weapons.map(w => (
                      <span key={w} className="mb-slot px-2 py-0.5 text-xs text-white font-bold flex items-center gap-1">
                        <span>{getWeaponIcon(w)}</span>
                        <span>{w}</span>
                      </span>
                    ))}
                    {b.tomes.map(t => (
                      <span key={t} className="mb-slot px-2 py-0.5 text-xs text-[#ffe600] font-bold flex items-center gap-1">
                        <span>{getTomeIcon(t)}</span>
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-200">
                    <span className="text-[#ffe600] font-bold uppercase text-[11px]">Key Items:</span>
                    {b.keyItems.map(item => (
                      <span key={item} className="text-xs text-white">
                        {getItemIcon(item)} {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Load Button */}
                <div className="shrink-0 flex justify-end">
                  <button
                    onClick={() => handleLoad(b)}
                    className="mb-btn-blue px-5 py-2 text-xs uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>CONFIRM & LOAD</span>
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
