import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  BookOpen,
  Swords,
  Package,
  Trophy,
  Shield,
  Zap,
  Crosshair,
  Plus,
  ArrowRight
} from 'lucide-react';
import { calculatePureStatPriorities, calculateDynamicTierLists } from '../engine/optimizer.js';

export default function TierListsAndPriorities({
  buildState,
  purpose,
  setPurpose,
  onApplyUpgrade
}) {
  const [activeSubTab, setActiveSubTab] = useState('stats'); // 'stats' | 'tomes' | 'weapons' | 'items'

  // Calculate pure stat priorities
  const statPriorities = useMemo(() => {
    return calculatePureStatPriorities(buildState, purpose);
  }, [buildState, purpose]);

  // Calculate dynamic tier lists
  const { tomesTierList, weaponsTierList, itemsTierList } = useMemo(() => {
    return calculateDynamicTierLists(buildState, purpose);
  }, [buildState, purpose]);

  const purposes = [
    { id: 'leaderboard', label: '👑 Leaderboard God', desc: 'XP, Luck, Curse & Chaos for endless record runs' },
    { id: 'dps_pure', label: '⚔️ Glass Cannon', desc: '100% focused on maximum raw multiplicative DPS' },
    { id: 'balanced', label: '🛡️ Balanced', desc: 'Balanced offensive scaling and survival EHP' },
    { id: 'tank_thorns', label: '🗿 Immortal Tank', desc: 'Armor, Max HP, and Thorns reflect scaling' },
    { id: 'crit_burst', label: '🎯 Overcrit Burst', desc: 'Precision & Megacrit burst obliteration' },
    { id: 'speed_farming', label: '⚡ Economy & Speed', desc: 'Speed-to-damage and rapid resource farming' },
  ];

  const subTabs = [
    { id: 'stats', label: 'Stat Priorities', count: `${statPriorities.length}` },
    { id: 'tomes', label: 'Tomes Tier List', count: '23' },
    { id: 'weapons', label: 'Weapons Tier List', count: '29' },
    { id: 'items', label: 'Items Tier List', count: '78' },
  ];

  const tierBadgeStyles = {
    S: 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/20',
    A: 'bg-purple-500 text-white font-bold shadow-md shadow-purple-500/20',
    B: 'bg-blue-500 text-white font-bold',
    C: 'bg-zinc-700 text-zinc-300 font-bold',
  };

  const currentPurposeObj = purposes.find(p => p.id === purpose) || purposes[0];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 1. APPLE-STYLE HEADER & PURPOSE BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            Dynamic Tier Lists & Stat Priorities
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Re-ranks every tome, weapon, and item in real time based on <strong className="text-zinc-200">{buildState?.character?.name}</strong> and your chosen purpose.
          </p>
        </div>

        {/* Purpose Indicator & Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 font-mono hidden sm:inline">Active Goal:</span>
          <select
            value={purpose}
            onChange={(e) => setPurpose && setPurpose(e.target.value)}
            className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-amber-300 font-semibold rounded-full px-3.5 py-1.5 text-xs focus:outline-none cursor-pointer transition-all"
          >
            {purposes.map(p => (
              <option key={p.id} value={p.id} className="bg-zinc-950 text-zinc-200">
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. APPLE-STYLE SEGMENTED SUB-TABS (NEVER scrolls horizontally) */}
      <div className="flex items-center justify-center sm:justify-start">
        <div className="bg-white/[0.04] p-1 rounded-full border border-white/[0.08] inline-flex items-center gap-1">
          {subTabs.map((tab) => {
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm shadow-amber-400/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-black/20 text-slate-950 font-bold' : 'bg-white/[0.06] text-zinc-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SUB-TAB: PURE STAT PRIORITIES */}
      {activeSubTab === 'stats' && (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Pure Stat Priority Ranking
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Calculates the marginal multiplier of adding raw unmixed stats to your current loadout.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
              #1 Stat: {statPriorities[0]?.name}
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {statPriorities.map((stat, idx) => {
              const isTop = idx === 0;
              const maxScore = Math.max(1, statPriorities[0]?.compositeScore || 50);
              const barWidth = Math.min(100, (stat.compositeScore / maxScore) * 100);

              return (
                <div
                  key={stat.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isTop
                      ? 'bg-amber-400/[0.03] border-amber-400/40 ring-1 ring-amber-400/20 shadow-md shadow-amber-400/5'
                      : 'bg-white/[0.02] hover:bg-white/[0.04] border-white/[0.05]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 font-mono text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold ${
                        isTop ? 'bg-amber-400 text-slate-950' : 'bg-white/[0.06] text-zinc-400'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="text-base">{stat.icon}</span>
                      <span className="font-sans font-bold text-white text-sm">{stat.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
                        {stat.category}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        stat.status === 'Essential Peak' ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30' :
                        stat.status === 'Strong Scaling' ? 'bg-emerald-400/15 text-emerald-300 border border-emerald-400/30' :
                        'bg-white/[0.04] text-zinc-400'
                      }`}>
                        {stat.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-emerald-400 font-semibold">+{stat.dpsGainPct.toFixed(1)}% DPS</span>
                      <span className="text-cyan-400 font-semibold">+{stat.ehpGainPct.toFixed(1)}% EHP</span>
                      <span className="text-amber-400 font-bold">Score: {stat.compositeScore.toFixed(0)}</span>
                    </div>
                  </div>

                  {/* Sleek Progress Bar */}
                  <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isTop
                          ? 'bg-gradient-to-r from-amber-400 to-emerald-400'
                          : 'bg-zinc-500'
                      }`}
                      style={{ width: `${barWidth}%` }}
                    ></div>
                  </div>

                  <p className="text-xs text-zinc-400 font-sans">{stat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. SUB-TAB: TOMES TIER LIST */}
      {activeSubTab === 'tomes' && (
        <div className="space-y-6">
          {['S', 'A', 'B', 'C'].map((tier) => {
            const tomesInTier = tomesTierList[tier] || [];
            return (
              <div key={tier} className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${tierBadgeStyles[tier]}`}>
                    {tier}
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-base tracking-tight">
                      {tier}-Tier Tomes ({tomesInTier.length})
                    </h4>
                    <p className="text-xs text-zinc-400">
                      {tier === 'S' ? 'Top mathematical value for your current weapons and purpose' :
                       tier === 'A' ? 'High value scaling choices with solid multiplier efficiency' :
                       tier === 'B' ? 'Situational augments or late-game ramp' :
                       'Lower marginal scaling for this build goal'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {tomesInTier.map((t) => (
                    <div
                      key={t.name}
                      className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-sm text-zinc-100 flex items-center gap-1.5">
                            📖 {t.name}
                          </span>
                          <span className="font-mono text-xs text-amber-400 font-semibold">
                            {t.score.toFixed(0)} pts
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 mb-2 leading-relaxed">{t.ability}</p>
                        <p className="text-[11px] text-zinc-500 font-sans italic mb-3">
                          {t.rationale}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                        <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                          +{t.dpsGainPct.toFixed(1)}% DPS
                        </span>
                        <button
                          onClick={() => onApplyUpgrade({ name: t.name, type: 'tome' })}
                          className="px-3 py-1 rounded-full bg-white/[0.05] hover:bg-amber-400 hover:text-black text-zinc-300 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Equip
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. SUB-TAB: WEAPONS TIER LIST */}
      {activeSubTab === 'weapons' && (
        <div className="space-y-6">
          {['S', 'A', 'B', 'C'].map((tier) => {
            const weaponsInTier = weaponsTierList[tier] || [];
            return (
              <div key={tier} className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${tierBadgeStyles[tier]}`}>
                    {tier}
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-base tracking-tight">
                      {tier}-Tier Weapons ({weaponsInTier.length})
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Ranked dynamically by synergy with {buildState?.character?.name}'s passive and projectile scaling tags.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {weaponsInTier.map((w) => (
                    <div
                      key={w.name}
                      className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-sm text-zinc-100 flex items-center gap-1.5">
                            ⚔️ {w.name}
                          </span>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
                            {w.category}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 mb-2 leading-relaxed">{w.description}</p>
                        <p className="text-[11px] text-amber-400/90 font-mono mb-2">
                          Scales: {w.affectedBy.join(', ')}
                        </p>
                        <p className="text-[11px] text-zinc-500 font-sans italic mb-3">
                          {w.rationale}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                        <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                          +{w.dpsGainPct.toFixed(1)}% DPS
                        </span>
                        <button
                          onClick={() => onApplyUpgrade({ name: w.name, type: 'weapon' })}
                          className="px-3 py-1 rounded-full bg-white/[0.05] hover:bg-amber-400 hover:text-black text-zinc-300 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Equip
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 6. SUB-TAB: ITEMS TIER LIST */}
      {activeSubTab === 'items' && (
        <div className="space-y-6">
          {['S', 'A', 'B', 'C'].map((tier) => {
            const itemsInTier = itemsTierList[tier] || [];
            return (
              <div key={tier} className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${tierBadgeStyles[tier]}`}>
                    {tier}
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-base tracking-tight">
                      {tier}-Tier Items ({itemsInTier.length})
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Ranked dynamically by synergy with your 4 active weapons and damage multipliers.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {itemsInTier.map((it) => (
                    <div
                      key={it.name}
                      className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-sm text-zinc-100 flex items-center gap-1.5">
                            💎 {it.name}
                          </span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                            it.rarity === 'Legendary' ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' :
                            it.rarity === 'Rare' ? 'text-purple-400 border-purple-500/30 bg-purple-500/10' :
                            it.rarity === 'Uncommon' ? 'text-blue-400 border-blue-500/30 bg-blue-500/10' :
                            'text-zinc-400 border-zinc-700 bg-zinc-800/40'
                          }`}>
                            {it.rarity}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 mb-2 leading-relaxed">{it.description}</p>
                        <p className="text-[11px] text-zinc-500 font-sans italic mb-3">
                          {it.rationale}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                        <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                          +{it.dpsGainPct.toFixed(1)}% DPS
                        </span>
                        <button
                          onClick={() => onApplyUpgrade({ name: it.name, type: 'item' })}
                          className="px-3 py-1 rounded-full bg-white/[0.05] hover:bg-amber-400 hover:text-black text-zinc-300 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Equip
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
