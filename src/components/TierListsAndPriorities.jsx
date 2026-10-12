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

  return (
    <div className="space-y-10 max-w-6xl mx-auto py-4">
      {/* 1. EDITORIAL HEADER & PURPOSE RIBBON (BORDERLESS) */}
      <div className="pb-6 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
            Engine Calibration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Dynamic Tier Lists & Priorities
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-light">
            Mathematically re-ranked for <strong className="text-white font-medium">{buildState?.character?.name}</strong> based on uncrowded damage brackets.
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

      {/* 2. APPLE-STYLE SEGMENTED SUB-TABS (NEVER scrolls horizontally) */}
      <div className="flex items-center justify-start">
        <div className="bg-white/[0.04] p-0.5 rounded-full border border-white/[0.08] inline-flex items-center gap-0.5">
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

      {/* 3. SUB-TAB: PURE STAT PRIORITIES (APPLE SPEC SHEET LIST, ZERO CARDS) */}
      {activeSubTab === 'stats' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-500 pb-2">
            <span>Priority Rank & Statistic</span>
            <span>Marginal Scaling & Score</span>
          </div>

          <div className="divide-y divide-white/[0.06] border-y border-white/[0.08]">
            {statPriorities.map((stat, idx) => {
              const isTop = idx === 0;
              const maxScore = Math.max(1, statPriorities[0]?.compositeScore || 50);
              const barWidth = Math.min(100, (stat.compositeScore / maxScore) * 100);

              return (
                <div
                  key={stat.id}
                  className={`py-4 transition-colors ${
                    isTop ? 'bg-amber-400/[0.02]' : 'hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
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

                  <p className="text-xs text-zinc-400 font-light pl-9 sm:pl-9 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. SUB-TAB: TOMES TIER LIST (BORDERLESS PRO LEDGER, ZERO CARDS) */}
      {activeSubTab === 'tomes' && (
        <div className="space-y-12">
          {['S', 'A', 'B', 'C'].map((tier) => {
            const tomesInTier = tomesTierList[tier] || [];
            return (
              <div key={tier} className="space-y-4">
                {/* Tier Headline */}
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

                {/* Ledger Rows */}
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

      {/* 5. SUB-TAB: WEAPONS TIER LIST (BORDERLESS PRO LEDGER, ZERO CARDS) */}
      {activeSubTab === 'weapons' && (
        <div className="space-y-12">
          {['S', 'A', 'B', 'C'].map((tier) => {
            const weaponsInTier = weaponsTierList[tier] || [];
            return (
              <div key={tier} className="space-y-4">
                {/* Tier Headline */}
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

                {/* Ledger Rows */}
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

      {/* 6. SUB-TAB: ITEMS TIER LIST (BORDERLESS PRO LEDGER, ZERO CARDS) */}
      {activeSubTab === 'items' && (
        <div className="space-y-12">
          {['S', 'A', 'B', 'C'].map((tier) => {
            const itemsInTier = itemsTierList[tier] || [];
            return (
              <div key={tier} className="space-y-4">
                {/* Tier Headline */}
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

                {/* Ledger Rows */}
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
