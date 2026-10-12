import React from 'react';
import { Target, Cpu, BarChart3, Database, Trophy, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  buildState,
  onResetBuild,
  purpose = 'leaderboard',
  setPurpose
}) {
  const char = buildState?.character?.name || 'Fox';
  const dps = buildState?.totalDps ? buildState.totalDps.toFixed(0) : '0';
  const ehp = buildState?.ehp ? buildState.ehp.toFixed(0) : '0';

  const purposes = [
    { id: 'leaderboard', label: '👑 Leaderboard God', short: '👑 Leaderboard' },
    { id: 'dps_pure', label: '⚔️ Glass Cannon (DPS)', short: '⚔️ DPS' },
    { id: 'balanced', label: '🛡️ Balanced (DPS+EHP)', short: '🛡️ Balanced' },
    { id: 'tank_thorns', label: '🗿 Immortal Tank', short: '🗿 Tank' },
    { id: 'crit_burst', label: '🎯 Overcrit Burst', short: '🎯 Crit' },
    { id: 'speed_farming', label: '⚡ Economy & Speed', short: '⚡ Speed' },
  ];

  const navItems = [
    { id: 'advisor', label: 'Upgrade Advisor', icon: Target, badge: 'MATH ENGINE' },
    { id: 'simulator', label: 'Build Simulator', icon: Cpu, badge: 'LOADOUT' },
    { id: 'priorities', label: 'Tier Lists & Stats', icon: BarChart3, badge: 'S/A/B/C' },
    { id: 'meta', label: 'Meta Builds', icon: Trophy, badge: 'PRESETS' },
    { id: 'database', label: 'Megabonk Wiki DB', icon: Database, badge: '150 ITEMS' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 text-xl font-heading">
            🔨
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-xl tracking-wider bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
                MEGABONK
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                OPTIMIZER 8.0
              </span>
            </div>
            <p className="text-xs text-slate-400">
              8-Bracket Multiplicative Roguelike Build Advisor
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Live Build & Purpose Bar */}
        <div className="flex items-center gap-3 bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs">
          {/* Global Purpose Selector */}
          {setPurpose && (
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-mono hidden xl:inline">Goal:</span>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="bg-slate-950 border border-amber-500/50 text-amber-300 font-bold rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
                title="Change Run Purpose globally (updates all tier lists and recommendations)"
              >
                {purposes.map(p => (
                  <option key={p.id} value={p.id} className="bg-slate-950 text-slate-200">
                    {p.label}
                  </option>
                ))}
              </select>
              <div className="h-4 w-px bg-slate-700 mx-1"></div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-400">Hero:</span>
            <span className="font-bold text-amber-400">{char}</span>
            <span className="text-slate-500 font-mono">Lv.{buildState?.level || 1}</span>
          </div>
          <div className="h-4 w-px bg-slate-700"></div>
          <div className="flex items-center gap-3 font-mono">
            <div>
              <span className="text-slate-400">DPS: </span>
              <span className="font-bold text-emerald-400">{dps}</span>
            </div>
            <div>
              <span className="text-slate-400">EHP: </span>
              <span className="font-bold text-cyan-400">{ehp}</span>
            </div>
          </div>
          <button
            onClick={onResetBuild}
            title="Reset to default build"
            className="p-1 text-slate-400 hover:text-amber-400 transition-colors ml-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
