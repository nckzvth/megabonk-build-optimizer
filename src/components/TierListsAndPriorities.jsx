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
  ArrowRight,
  Flame,
  Sparkles,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { calculateDetailedStatPriorities, calculateDynamicTierLists } from '../engine/optimizer.js';

export default function TierListsAndPriorities({
  buildState,
  purpose,
  setPurpose,
  onApplyUpgrade
}) {
  // 'weapon_upgrades' | 'shrines' | 'all_stats' | 'tomes' | 'weapons' | 'items'
  const [activeSubTab, setActiveSubTab] = useState('weapon_upgrades');
  const [statCategoryFilter, setStatCategoryFilter] = useState('ALL');

  // Calculate detailed, unbundled stat priorities
  const detailedStats = useMemo(() => {
    return calculateDetailedStatPriorities(buildState, purpose);
  }, [buildState, purpose]);

  const { weaponUpgradeStats, shrineStats, allStats } = detailedStats;

  // Calculate dynamic tier lists for Tomes, Weapons, Items
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
    { id: 'weapon_upgrades', label: 'Weapon Upgrades', count: `${weaponUpgradeStats.length}` },
    { id: 'shrines', label: 'Shrine Stats', count: `${shrineStats.length}` },
    { id: 'all_stats', label: 'All Stats', count: `${allStats.length}` },
    { id: 'tomes', label: 'Tomes', count: '23' },
    { id: 'weapons', label: 'Weapons', count: '29' },
    { id: 'items', label: 'Items', count: '78' },
  ];

  const tierColors = {
    S: 'text-amber-400',
    A: 'text-purple-400',
    B: 'text-blue-400',
    C: 'text-zinc-500',
  };

  const tierDescriptions = {
    S: 'Top mathematical value for your current weapons and purpose',
    A: 'High value scaling choices with solid multiplier efficiency',
    B: 'Situational augments or late-game ramp choices',
    C: 'Lower marginal scaling for this build goal',
  };

  // Filter for master stats list
  const filteredAllStats = useMemo(() => {
    if (statCategoryFilter === 'ALL') return allStats;
    return allStats.filter(s => s.category.toUpperCase() === statCategoryFilter.toUpperCase());
  }, [allStats, statCategoryFilter]);

  const activeWeaponsList = buildState?.weapons || [];

  return (
    <div className="space-y-10 max-w-6xl mx-auto py-4">
      {/* 1. EDITORIAL HEADER & ACTIVE GOAL (BORDERLESS) */}
      <div className="pb-6 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
            Engine Optimization & Stat Ledger
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Unbundled Stat & Item Tier Lists
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-light">
            Separate individual rankings for <strong className="text-white font-medium">Weapon Upgrades</strong>, <strong className="text-white font-medium">Shrine Stats</strong>, and all discrete stats without grouping.
          </p>
        </div>

        {/* Goal Selector Pill */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-zinc-500 font-mono hidden sm:inline">Active Goal:</span>
          <select
            value={purpose}
            onChange={(e) => setPurpose && setPurpose(e.target.value)}
            className="bg-transparent border-b border-zinc-700 hover:border-zinc-400 text-amber-300 font-semibold py-1 px-1 text-xs focus:outline-none cursor-pointer transition-colors"
          >
            {purposes.map(p => (
              <option key={p.id} value={p.id} className="bg-zinc-950 text-zinc-200">
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. APPLE-STYLE SEGMENTED SUB-TABS (NO HORIZONTAL SCROLL) */}
      <div className="flex items-center justify-start">
        <div className="bg-white/[0.04] p-0.5 rounded-full border border-white/[0.08] inline-flex items-center gap-0.5 flex-wrap">
          {subTabs.map((tab) => {
            const isActive = activeSubTab === tab.id || (activeSubTab === 'stats' && tab.id === 'weapon_upgrades');
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
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

      {/* 3. SUB-TAB: WEAPON UPGRADE STATS (EXACTLY WHAT TO PICK ON WEAPON LEVEL-UPS) */}
      {(activeSubTab === 'weapon_upgrades' || activeSubTab === 'stats') && (
        <div className="space-y-6">
          <div className="pb-4 border-b border-white/[0.06] flex flex-col md:flex-row md:items-baseline justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-base">⚔️</span>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Weapon Upgrade Stat Priorities
                </h2>
              </div>
              <p className="text-xs text-zinc-400 mt-1 font-light">
                When leveling up a weapon or choosing weapon enchantments, pick these stats in order.
              </p>
            </div>

            {/* Active Equipped Weapons Pills */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs font-mono">
              <span className="text-zinc-500 text-[11px] uppercase">Active Arsenal:</span>
              {activeWeaponsList.map(w => (
                <span key={w.name} className="px-2 py-0.5 rounded-full bg-white/[0.04] text-zinc-300 text-[11px]">
                  ⚔️ {w.name}
                </span>
              ))}
            </div>
          </div>

          <div className="divide-y divide-white/[0.06] border-y border-white/[0.08]">
            {weaponUpgradeStats.map((stat, idx) => {
              const isTop = idx === 0;
              const maxScore = Math.max(1, weaponUpgradeStats[0]?.compositeScore || 50);
              const barWidth = Math.min(100, (stat.compositeScore / maxScore) * 100);

              return (
                <div
                  key={stat.id}
                  className={`py-4 transition-colors ${
                    isTop ? 'bg-amber-400/[0.02]' : 'hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`font-mono text-xs font-bold w-6 ${
                        isTop ? 'text-amber-400' : 'text-zinc-600'
                      }`}>
                        {idx < 9 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <span className="text-base">{stat.icon}</span>
                      <span className="font-bold text-white text-sm tracking-tight">{stat.name}</span>
                      <span className="text-xs font-mono text-amber-300 font-semibold px-2 py-0.5 rounded-full bg-amber-400/10">
                        {stat.inGameLabel}
                      </span>
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-semibold ${
                        stat.status === 'Essential Peak' ? 'text-amber-400 bg-amber-400/10' :
                        stat.status === 'Strong Scaling' ? 'text-emerald-400 bg-emerald-400/10' :
                        'text-zinc-500 bg-white/[0.02]'
                      }`}>
                        {stat.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono pl-9 sm:pl-0">
                      <span className="text-emerald-400 font-semibold">+{stat.dpsGainPct.toFixed(1)}% DPS</span>
                      <span className="text-amber-400 font-bold">{stat.compositeScore.toFixed(0)} pts</span>
                    </div>
                  </div>

                  {/* Clean Hairline Gauge */}
                  <div className="w-full h-0.5 bg-white/[0.06] rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full ${
                        isTop ? 'bg-amber-400' : 'bg-zinc-600'
                      }`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pl-9">
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      {stat.description}
                    </p>
                    {stat.weaponSynergyText && (
                      <span className="text-[11px] font-mono text-amber-400/90 shrink-0">
                        {stat.weaponSynergyText}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. SUB-TAB: SHRINE STATS (EXACTLY WHAT TO PICK AT SHRINES) */}
      {activeSubTab === 'shrines' && (
        <div className="space-y-6">
          <div className="pb-4 border-b border-white/[0.06] flex flex-col md:flex-row md:items-baseline justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-base">⛩️</span>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Shrine Stat Priorities
                </h2>
              </div>
              <p className="text-xs text-zinc-400 mt-1 font-light">
                When choosing stat upgrades at Shrines during your run, prioritize these in-game stats in exact order.
              </p>
            </div>

            <span className="text-xs font-mono text-amber-300 font-semibold px-3 py-1 rounded-full bg-amber-400/10">
              Calibrated for: {purposes.find(p => p.id === purpose)?.label}
            </span>
          </div>

          <div className="divide-y divide-white/[0.06] border-y border-white/[0.08]">
            {shrineStats.map((stat, idx) => {
              const isTop = idx === 0;
              const maxScore = Math.max(1, shrineStats[0]?.compositeScore || 50);
              const barWidth = Math.min(100, (stat.compositeScore / maxScore) * 100);

              return (
                <div
                  key={stat.id}
                  className={`py-4 transition-colors ${
                    isTop ? 'bg-amber-400/[0.02]' : 'hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`font-mono text-xs font-bold w-6 ${
                        isTop ? 'text-amber-400' : 'text-zinc-600'
                      }`}>
                        {idx < 9 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <span className="text-base">{stat.icon}</span>
                      <span className="font-bold text-white text-sm tracking-tight">{stat.name}</span>
                      <span className="text-xs font-mono text-cyan-300 font-semibold px-2 py-0.5 rounded-full bg-cyan-400/10">
                        {stat.inGameLabel}
                      </span>
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-semibold ${
                        stat.status === 'Essential Peak' ? 'text-amber-400 bg-amber-400/10' :
                        stat.status === 'Strong Scaling' ? 'text-emerald-400 bg-emerald-400/10' :
                        'text-zinc-500 bg-white/[0.02]'
                      }`}>
                        {stat.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono pl-9 sm:pl-0">
                      <span className="text-emerald-400 font-semibold">+{stat.dpsGainPct.toFixed(1)}% DPS</span>
                      <span className="text-cyan-400 font-semibold">+{stat.ehpGainPct.toFixed(1)}% EHP</span>
                      <span className="text-amber-400 font-bold">{stat.compositeScore.toFixed(0)} pts</span>
                    </div>
                  </div>

                  {/* Clean Hairline Gauge */}
                  <div className="w-full h-0.5 bg-white/[0.06] rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full ${
                        isTop ? 'bg-amber-400' : 'bg-zinc-600'
                      }`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>

                  <p className="text-xs text-zinc-300 font-light pl-9 leading-relaxed">
                    <span className="text-amber-400 font-medium">Stat Impact: </span>
                    {stat.shrineAdvice || stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. SUB-TAB: ALL STATS (UNBUNDLED MASTER LIST OF ALL 21 SEPARATE STATS) */}
      {activeSubTab === 'all_stats' && (
        <div className="space-y-6">
          <div className="pb-4 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Master Stat Priorities (All 21 Discrete Stats)
              </h2>
              <p className="text-xs text-zinc-400 mt-1 font-light">
                Zero bundled groups. Max HP, Shield, XP, Luck, Curse, and Damage are all separate individual stats.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs">
              {['ALL', 'OFFENSE', 'DEFENSE', 'LEADERBOARD', 'UTILITY'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setStatCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    statCategoryFilter === cat
                      ? 'bg-amber-400 text-slate-950 font-semibold'
                      : 'text-zinc-400 hover:text-white bg-white/[0.04]'
                  }`}
                >
                  {cat === 'ALL' ? `All (${allStats.length})` : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-white/[0.06] border-y border-white/[0.08]">
            {filteredAllStats.map((stat, idx) => {
              const isTop = idx === 0;
              const maxScore = Math.max(1, allStats[0]?.compositeScore || 50);
              const barWidth = Math.min(100, (stat.compositeScore / maxScore) * 100);

              return (
                <div
                  key={stat.id}
                  className={`py-4 transition-colors ${
                    isTop ? 'bg-amber-400/[0.02]' : 'hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`font-mono text-xs font-bold w-6 ${
                        isTop ? 'text-amber-400' : 'text-zinc-600'
                      }`}>
                        {idx < 9 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <span className="text-base">{stat.icon}</span>
                      <span className="font-bold text-white text-sm tracking-tight">{stat.name}</span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/[0.04] text-zinc-400">
                        {stat.category}
                      </span>
                      {stat.isWeaponUpgrade && (
                        <span className="text-[10px] font-mono text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
                          ⚔️ Weapon
                        </span>
                      )}
                      {stat.isShrine && (
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">
                          ⛩️ Shrine
                        </span>
                      )}
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-semibold ${
                        stat.status === 'Essential Peak' ? 'text-amber-400 bg-amber-400/10' :
                        stat.status === 'Strong Scaling' ? 'text-emerald-400 bg-emerald-400/10' :
                        'text-zinc-500 bg-white/[0.02]'
                      }`}>
                        {stat.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono pl-9 sm:pl-0">
                      <span className="text-emerald-400 font-semibold">+{stat.dpsGainPct.toFixed(1)}% DPS</span>
                      <span className="text-cyan-400 font-semibold">+{stat.ehpGainPct.toFixed(1)}% EHP</span>
                      <span className="text-amber-400 font-bold">{stat.compositeScore.toFixed(0)} pts</span>
                    </div>
                  </div>

                  <div className="w-full h-0.5 bg-white/[0.06] rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full ${
                        isTop ? 'bg-amber-400' : 'bg-zinc-600'
                      }`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>

                  <p className="text-xs text-zinc-400 font-light pl-9 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. SUB-TAB: TOMES TIER LIST (BORDERLESS PRO LEDGER) */}
      {activeSubTab === 'tomes' && (
        <div className="space-y-12">
          {['S', 'A', 'B', 'C'].map((tier) => {
            const tomesInTier = tomesTierList[tier] || [];
            return (
              <div key={tier} className="space-y-4">
                <div className="flex items-baseline gap-3 pb-2 border-b border-white/[0.08]">
                  <span className={`text-2xl font-black font-mono ${tierColors[tier]}`}>
                    {tier}
                  </span>
                  <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Tier Tomes ({tomesInTier.length})
                  </span>
                  <span className="text-xs text-zinc-500 font-light hidden sm:inline">
                    — {tierDescriptions[tier]}
                  </span>
                </div>

                <div className="divide-y divide-white/[0.06]">
                  {tomesInTier.map((t) => (
                    <div
                      key={t.name}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-sm text-white flex items-center gap-1.5">
                            📖 {t.name}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500 uppercase px-2 py-0.5 rounded-full bg-white/[0.04]">
                            Bracket #{t.bracket || 0}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 font-light leading-relaxed">
                          {t.ability}
                        </p>
                        <p className="text-[11px] text-zinc-500 font-light italic">
                          {t.rationale}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 shrink-0 sm:self-center">
                        <span className="text-xs font-mono text-emerald-400 font-semibold">
                          +{t.dpsGainPct.toFixed(1)}% DPS
                        </span>
                        <span className="text-xs font-mono text-amber-400 font-bold min-w-14 text-right">
                          {t.score.toFixed(0)} pts
                        </span>
                        <button
                          onClick={() => onApplyUpgrade({ name: t.name, type: 'tome' })}
                          className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/[0.06] hover:bg-white text-zinc-300 hover:text-black transition-all cursor-pointer flex items-center gap-1"
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

      {/* 7. SUB-TAB: WEAPONS TIER LIST (BORDERLESS PRO LEDGER) */}
      {activeSubTab === 'weapons' && (
        <div className="space-y-12">
          {['S', 'A', 'B', 'C'].map((tier) => {
            const weaponsInTier = weaponsTierList[tier] || [];
            return (
              <div key={tier} className="space-y-4">
                <div className="flex items-baseline gap-3 pb-2 border-b border-white/[0.08]">
                  <span className={`text-2xl font-black font-mono ${tierColors[tier]}`}>
                    {tier}
                  </span>
                  <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Tier Weapons ({weaponsInTier.length})
                  </span>
                  <span className="text-xs text-zinc-500 font-light hidden sm:inline">
                    — Ranked dynamically by synergy with {buildState?.character?.name}'s tags
                  </span>
                </div>

                <div className="divide-y divide-white/[0.06]">
                  {weaponsInTier.map((w) => (
                    <div
                      key={w.name}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-sm text-white flex items-center gap-1.5">
                            ⚔️ {w.name}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500 uppercase px-2 py-0.5 rounded-full bg-white/[0.04]">
                            {w.category}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 font-light leading-relaxed">
                          {w.description}
                        </p>
                        <p className="text-[11px] text-amber-400/80 font-mono">
                          Scales: {w.affectedBy.join(', ')}
                        </p>
                        <p className="text-[11px] text-zinc-500 font-light italic">
                          {w.rationale}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 shrink-0 sm:self-center">
                        <span className="text-xs font-mono text-emerald-400 font-semibold">
                          +{w.dpsGainPct.toFixed(1)}% DPS
                        </span>
                        <span className="text-xs font-mono text-amber-400 font-bold min-w-14 text-right">
                          {w.score.toFixed(0)} pts
                        </span>
                        <button
                          onClick={() => onApplyUpgrade({ name: w.name, type: 'weapon' })}
                          className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/[0.06] hover:bg-white text-zinc-300 hover:text-black transition-all cursor-pointer flex items-center gap-1"
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

      {/* 8. SUB-TAB: ITEMS TIER LIST (BORDERLESS PRO LEDGER) */}
      {activeSubTab === 'items' && (
        <div className="space-y-12">
          {['S', 'A', 'B', 'C'].map((tier) => {
            const itemsInTier = itemsTierList[tier] || [];
            return (
              <div key={tier} className="space-y-4">
                <div className="flex items-baseline gap-3 pb-2 border-b border-white/[0.08]">
                  <span className={`text-2xl font-black font-mono ${tierColors[tier]}`}>
                    {tier}
                  </span>
                  <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Tier Items ({itemsInTier.length})
                  </span>
                  <span className="text-xs text-zinc-500 font-light hidden sm:inline">
                    — Scaled with your current 4 active weapons and multipliers
                  </span>
                </div>

                <div className="divide-y divide-white/[0.06]">
                  {itemsInTier.map((it) => (
                    <div
                      key={it.name}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-sm text-white flex items-center gap-1.5">
                            💎 {it.name}
                          </span>
                          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                            it.rarity === 'Legendary' ? 'text-amber-400 bg-amber-400/10' :
                            it.rarity === 'Rare' ? 'text-purple-400 bg-purple-400/10' :
                            it.rarity === 'Uncommon' ? 'text-blue-400 bg-blue-400/10' :
                            'text-zinc-500 bg-white/[0.04]'
                          }`}>
                            {it.rarity}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 font-light leading-relaxed">
                          {it.description}
                        </p>
                        <p className="text-[11px] text-zinc-500 font-light italic">
                          {it.rationale}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 shrink-0 sm:self-center">
                        <span className="text-xs font-mono text-emerald-400 font-semibold">
                          +{it.dpsGainPct.toFixed(1)}% DPS
                        </span>
                        <span className="text-xs font-mono text-amber-400 font-bold min-w-14 text-right">
                          {it.score.toFixed(0)} pts
                        </span>
                        <button
                          onClick={() => onApplyUpgrade({ name: it.name, type: 'item' })}
                          className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/[0.06] hover:bg-white text-zinc-300 hover:text-black transition-all cursor-pointer flex items-center gap-1"
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
