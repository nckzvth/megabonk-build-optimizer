import React from 'react';
import { RefreshCw, ChevronDown } from 'lucide-react';
import { getCharacterPortrait } from '../data/gameUiIcons.js';

export default function Header({
  activeTab,
  setActiveTab,
  buildState,
  onResetBuild,
  purpose = 'leaderboard',
  setPurpose
}) {
  const char = buildState?.character?.name || 'Dicehead';
  const portrait = getCharacterPortrait(char);
  const dps = buildState?.totalDps ? buildState.totalDps.toFixed(0) : '0';

  const purposes = [
    { id: 'leaderboard', label: '👑 Leaderboard God' },
    { id: 'dps_pure', label: '⚔️ Glass Cannon (DPS)' },
    { id: 'balanced', label: '🛡️ Balanced (DPS+EHP)' },
    { id: 'tank_thorns', label: '🗿 Immortal Tank' },
    { id: 'crit_burst', label: '🎯 Overcrit Burst' },
    { id: 'speed_farming', label: '⚡ Economy & Speed' },
  ];

  const navItems = [
    { id: 'advisor', label: 'PLAY ADVISOR' },
    { id: 'simulator', label: 'SIMULATOR' },
    { id: 'priorities', label: 'TIER LISTS' },
    { id: 'meta', label: 'META BUILDS' },
    { id: 'database', label: 'WIKI DB' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#182822]/95 border-b-2 border-[#9da3aa] shadow-[0_4px_16px_rgba(0,0,0,0.85)] px-3 sm:px-6">
      <div className="max-w-7xl mx-auto py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Authentic MEGABONK Title Logo + Yellow Subtext */}
        <div
          onClick={() => setActiveTab('advisor')}
          className="flex flex-col leading-none cursor-pointer select-none shrink-0"
        >
          <div className="flex items-center gap-2">
            <span className="mb-logo-text text-xl sm:text-2xl tracking-wider">
              MEGABONK
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#ffe600] mb-text-shadow-sm tracking-wide -mt-0.5">
            now with 10% more bonk!
          </span>
        </div>

        {/* Center: Authentic 3D Raised Stone Menu Buttons (Zero Horizontal Scroll) */}
        <nav className="flex items-center flex-wrap gap-2 sm:gap-2.5 shrink-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 sm:px-4 sm:py-1.5 text-xs sm:text-sm uppercase tracking-wider transition-all ${
                  isActive
                    ? 'mb-btn-blue mb-reticle text-white'
                    : 'mb-btn-stone text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Goal Selector + In-Game Silver/Stats Counter + Red Reset Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Run Goal Selector */}
          {setPurpose && (
            <div className="relative">
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="appearance-none mb-btn-stone pl-3 pr-7 py-1.5 text-xs sm:text-sm text-[#ffe600] font-bold focus:outline-none cursor-pointer"
                title="Change Run Purpose Goal"
              >
                {purposes.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#1c1e22] text-white">
                    {p.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#ffe600] pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
            </div>
          )}

          {/* In-Game Top-Right HUD Counter (matches the '485' silver HUD in screenshots) */}
          <div className="hidden xl:flex items-center gap-2.5 bg-[#16191d]/90 border-2 border-[#9da3aa] outline-1 outline-black px-3 py-1">
            <span className="text-base">{portrait.emoji}</span>
            <span className="text-white font-bold text-sm">{char}</span>
            <span className="text-[#38bdf8] font-bold text-xs">Rank {buildState?.level || 1}</span>
            <span className="text-zinc-500">|</span>
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-gradient-to-b from-slate-200 to-slate-400 border border-black flex items-center justify-center text-[10px] font-black text-slate-900 shadow">
                C
              </span>
              <span className="text-[#ffe600] font-bold text-sm font-mono">{dps} DPS</span>
            </div>
          </div>

          {/* Red Reset 'X' Button (matches the red X in CHARACTER SELECTION header) */}
          <button
            onClick={onResetBuild}
            title="Reset to default build"
            className="mb-btn-red w-8 h-8 flex items-center justify-center text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
