import React from 'react';
import { Target, Cpu, BarChart3, Database, Trophy, RefreshCw, ChevronDown } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  buildState,
  onResetBuild,
  purpose = 'leaderboard',
  setPurpose
}) {
  const char = buildState?.character?.name || 'Dicehead';
  const dps = buildState?.totalDps ? buildState.totalDps.toFixed(0) : '0';
  const ehp = buildState?.ehp ? buildState.ehp.toFixed(0) : '0';

  const purposes = [
    { id: 'leaderboard', label: '👑 Leaderboard God' },
    { id: 'dps_pure', label: '⚔️ Glass Cannon (DPS)' },
    { id: 'balanced', label: '🛡️ Balanced (DPS+EHP)' },
    { id: 'tank_thorns', label: '🗿 Immortal Tank' },
    { id: 'crit_burst', label: '🎯 Overcrit Burst' },
    { id: 'speed_farming', label: '⚡ Economy & Speed' },
  ];

  const navItems = [
    { id: 'advisor', label: 'Advisor' },
    { id: 'simulator', label: 'Simulator' },
    { id: 'priorities', label: 'Tier Lists' },
    { id: 'meta', label: 'Meta Builds' },
    { id: 'database', label: 'Wiki DB' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070709]/85 backdrop-blur-2xl border-b border-white/[0.08] px-4 sm:px-6">
      <div className="max-w-7xl mx-auto h-14 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shadow-amber-500/20">
            🔨
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-sm sm:text-base tracking-tight text-white font-sans">
              MEGABONK
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
              PRO
            </span>
          </div>
        </div>

        {/* Center: Apple-style Segmented Nav (NEVER scrolls horizontally) */}
        <nav className="flex items-center bg-white/[0.04] p-0.5 rounded-full border border-white/[0.08] text-xs shrink-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1 sm:px-3.5 sm:py-1 rounded-full font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm shadow-amber-400/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Goal Selector & Live Stats */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Goal Selector Pill */}
          {setPurpose && (
            <div className="relative">
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="appearance-none bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] text-amber-300 font-semibold rounded-full pl-3 pr-7 py-1 text-xs focus:outline-none cursor-pointer transition-all"
                title="Change Run Purpose Goal"
              >
                {purposes.map((p) => (
                  <option key={p.id} value={p.id} className="bg-zinc-950 text-zinc-100">
                    {p.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-zinc-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
          )}

          {/* Compact Hero Pill (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-400 bg-white/[0.02] border border-white/[0.06] rounded-full px-3 py-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-zinc-200 font-sans font-medium">{char}</span>
            <span className="text-zinc-500">Lv.{buildState?.level || 1}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-emerald-400 font-semibold">{dps} DPS</span>
          </div>

          {/* Reset Button */}
          <button
            onClick={onResetBuild}
            title="Reset to default build"
            className="w-7 h-7 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>
    </header>
  );
}
