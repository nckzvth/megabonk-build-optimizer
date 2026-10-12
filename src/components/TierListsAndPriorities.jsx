import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  BookOpen,
  Swords,
  Package,
  Trophy,
  TrendingUp,
  Shield,
  Zap,
  Crosshair,
  Filter,
  CheckCircle2,
  Info,
  Sparkles,
  ChevronRight,
  Flame,
  Plus
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
    { id: 'leaderboard', label: 'Leaderboard God', icon: Trophy, desc: 'Prioritizes XP, Luck, Curse & Chaos for endless records' },
    { id: 'dps_pure', label: 'Glass Cannon', icon: Swords, desc: '100% focused on maximum raw multiplicative DPS' },
    { id: 'balanced', label: 'Balanced', icon: Shield, desc: 'Balanced offensive scaling and survival EHP' },
    { id: 'tank_thorns', label: 'Immortal Tank', icon: Shield, desc: 'Armor, Max HP, and Thorns reflect scaling' },
    { id: 'crit_burst', label: 'Overcrit Burst', icon: Crosshair, desc: 'Precision & Megacrit burst obliteration' },
    { id: 'speed_farming', label: 'Economy & Speed', icon: Zap, desc: 'Speed-to-damage and rapid resource farming' },
  ];

  const subTabs = [
    { id: 'stats', label: 'Stat Priority Radar', icon: BarChart3, count: `${statPriorities.length} Stats` },
    { id: 'tomes', label: 'Tomes Tier List', icon: BookOpen, count: '23 Tomes' },
    { id: 'weapons', label: 'Weapons Tier List', icon: Swords, count: '29 Weapons' },
    { id: 'items', label: 'Items Tier List', icon: Package, count: '78 Items' },
  ];

  const tierColors = {
    S: 'border-amber-500 bg-amber-500/10 text-amber-300',
    A: 'border-purple-500 bg-purple-500/10 text-purple-300',
    B: 'border-blue-500 bg-blue-500/10 text-blue-300',
    C: 'border-slate-700 bg-slate-900/40 text-slate-400',
  };

  const tierBadgeColors = {
    S: 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-lg shadow-amber-500/30',
    A: 'bg-purple-600 text-white font-bold',
    B: 'bg-blue-600 text-white font-bold',
    C: 'bg-slate-700 text-slate-300 font-bold',
  };

  return (
    <div className="space-y-6">
      {/* 1. PURPOSE & RUN CONTEXT BANNER */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Run Purpose Synchronization:
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                ACTIVE HERO: {buildState?.character?.name || 'Fox'}
              </span>
            </div>
            <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-400" />
              Dynamic Tier Lists & Stat Priority Radar
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-0.5">
              Every tier list below dynamically re-ranks based on your chosen Purpose, equipped weapons, and hero passives.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Current Purpose:</span>
            <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
              {purposes.find(p => p.id === purpose)?.label || 'Leaderboard'}
            </span>
          </div>
        </div>

        {/* Purpose Buttons */}
        <div className="pt-4">
          <label className="text-xs uppercase font-mono text-slate-400 font-bold mb-2 block">
            Change Run Purpose (Updates All Pages & Recommendations):
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {purposes.map((p) => {
              const Icon = p.icon;
              const isSelected = purpose === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setPurpose(p.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs truncate">
                    <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{p.label}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{p.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. SUB-TABS: STATS, TOMES, WEAPONS, ITEMS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap cursor-pointer border ${
                isActive
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                isActive ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. CONTENT: PURE STAT PRIORITIES */}
      {activeSubTab === 'stats' && (
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-heading font-bold text-slate-100 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-400" />
                Pure Stat Priority Ranking (Unmixed Stats)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluates how much value each raw stat adds to your active build right now, avoiding crowded brackets.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
              #1 Stat: {statPriorities[0]?.name}
            </span>
          </div>

          <div className="space-y-3">
            {statPriorities.map((stat, idx) => {
              const isTop = idx === 0;
              const maxScore = Math.max(1, statPriorities[0]?.compositeScore || 50);
              const barWidth = Math.min(100, (stat.compositeScore / maxScore) * 100);

              return (
                <div
                  key={stat.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isTop
                      ? 'bg-gradient-to-r from-amber-500/10 to-slate-950 border-amber-500 shadow-md shadow-amber-500/10'
                      : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 font-mono text-xs">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                          isTop ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        #{idx + 1}
                      </span>
                      <span className="text-base">{stat.icon}</span>
                      <span className="font-sans font-bold text-slate-100 text-sm">{stat.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {stat.category}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        stat.status === 'Essential Peak' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        stat.status === 'Strong Scaling' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {stat.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-bold">
                      <span className="text-emerald-400">+{stat.dpsGainPct.toFixed(1)}% DPS</span>
                      <span className="text-cyan-400">+{stat.ehpGainPct.toFixed(1)}% EHP</span>
                      <span className="text-amber-400">Score: {stat.compositeScore.toFixed(0)}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isTop
                          ? 'bg-gradient-to-r from-amber-500 to-emerald-400'
                          : 'bg-gradient-to-r from-slate-600 to-slate-400'
                      }`}
                      style={{ width: `${barWidth}%` }}
                    ></div>
                  </div>

                  <p className="text-[11px] text-slate-400 font-sans">{stat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. CONTENT: TOMES TIER LIST */}
      {activeSubTab === 'tomes' && (
        <div className="space-y-5">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Dynamic Tomes Tier List for <strong className="text-amber-400 uppercase">{purposes.find(p => p.id === purpose)?.label}</strong>
            </span>
            <span className="font-mono text-slate-400">23 Tomes Evaluated</span>
          </div>

          {['S', 'A', 'B', 'C'].map((tier) => {
            const tomesInTier = tomesTierList[tier] || [];
            return (
              <div key={tier} className={`p-5 rounded-2xl border ${tierColors[tier]} bg-slate-950/70 shadow-lg`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${tierBadgeColors[tier]}`}>
                    {tier}
                  </span>
                  <div>
                    <h4 className="font-heading font-black text-white text-base">
                      {tier}-Tier Tomes ({tomesInTier.length})
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {tier === 'S' ? 'Absolute top priority for your chosen purpose and loadout' :
                       tier === 'A' ? 'High value picks with strong secondary scaling' :
                       tier === 'B' ? 'Situational augments or slower ramp-up' :
                       'Low marginal utility for this run purpose'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {tomesInTier.map((t) => (
                    <div
                      key={t.name}
                      className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/70 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                            📖 {t.name}
                          </span>
                          <span className="font-mono text-xs text-amber-400 font-bold">
                            Score: {t.score.toFixed(0)}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-2 leading-snug">{t.ability}</p>
                        <p className="text-[10px] text-slate-400 font-mono italic mb-3">
                          {t.rationale}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <div className="text-[10px] font-mono text-emerald-400 font-bold">
                          +{t.dpsGainPct.toFixed(1)}% DPS
                        </div>
                        <button
                          onClick={() => onApplyUpgrade({ name: t.name, type: 'tome' })}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
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

      {/* 5. CONTENT: WEAPONS TIER LIST */}
      {activeSubTab === 'weapons' && (
        <div className="space-y-5">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Swords className="w-4 h-4 text-orange-400" />
              Dynamic Weapons Tier List for <strong className="text-amber-400">{buildState?.character?.name}</strong> ({purposes.find(p => p.id === purpose)?.label})
            </span>
            <span className="font-mono text-slate-400">29 Weapons Evaluated</span>
          </div>

          {['S', 'A', 'B', 'C'].map((tier) => {
            const weaponsInTier = weaponsTierList[tier] || [];
            return (
              <div key={tier} className={`p-5 rounded-2xl border ${tierColors[tier]} bg-slate-950/70 shadow-lg`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${tierBadgeColors[tier]}`}>
                    {tier}
                  </span>
                  <div>
                    <h4 className="font-heading font-black text-white text-base">
                      {tier}-Tier Weapons ({weaponsInTier.length})
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Ranked dynamically by synergy with {buildState?.character?.name}'s passive and active scaling tags.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {weaponsInTier.map((w) => (
                    <div
                      key={w.name}
                      className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/70 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                            ⚔️ {w.name}
                          </span>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {w.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-2 leading-snug">{w.description}</p>
                        <p className="text-[10px] text-amber-500/90 font-mono mb-2">
                          Scales with: {w.affectedBy.join(', ')}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono italic mb-3">
                          {w.rationale}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <div className="text-[10px] font-mono text-emerald-400 font-bold">
                          +{w.dpsGainPct.toFixed(1)}% DPS
                        </div>
                        <button
                          onClick={() => onApplyUpgrade({ name: w.name, type: 'weapon' })}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
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

      {/* 6. CONTENT: ITEMS TIER LIST */}
      {activeSubTab === 'items' && (
        <div className="space-y-5">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Package className="w-4 h-4 text-purple-400" />
              Dynamic Items Tier List for <strong className="text-amber-400 uppercase">{purposes.find(p => p.id === purpose)?.label}</strong>
            </span>
            <span className="font-mono text-slate-400">78 Items Evaluated</span>
          </div>

          {['S', 'A', 'B', 'C'].map((tier) => {
            const itemsInTier = itemsTierList[tier] || [];
            return (
              <div key={tier} className={`p-5 rounded-2xl border ${tierColors[tier]} bg-slate-950/70 shadow-lg`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${tierBadgeColors[tier]}`}>
                    {tier}
                  </span>
                  <div>
                    <h4 className="font-heading font-black text-white text-base">
                      {tier}-Tier Items ({itemsInTier.length})
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Ranked dynamically by synergy with your 4 equipped weapons and chosen build purpose.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {itemsInTier.map((it) => (
                    <div
                      key={it.name}
                      className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/70 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                            💎 {it.name}
                          </span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                            it.rarity === 'Legendary' ? 'text-amber-400 border-amber-500/40 bg-amber-500/10' :
                            it.rarity === 'Rare' ? 'text-purple-400 border-purple-500/40 bg-purple-500/10' :
                            it.rarity === 'Uncommon' ? 'text-blue-400 border-blue-500/40 bg-blue-500/10' :
                            'text-slate-400 border-slate-700 bg-slate-800/40'
                          }`}>
                            {it.rarity}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-2 leading-snug">{it.description}</p>
                        <p className="text-[10px] text-slate-400 font-mono italic mb-3">
                          {it.rationale}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <div className="text-[10px] font-mono text-emerald-400 font-bold">
                          +{it.dpsGainPct.toFixed(1)}% DPS
                        </div>
                        <button
                          onClick={() => onApplyUpgrade({ name: it.name, type: 'item' })}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
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
