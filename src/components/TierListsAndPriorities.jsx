import React, { useState, useMemo } from 'react';
import {
  calculateDetailedStatPriorities,
  calculateDynamicTierLists
} from '../engine/optimizer.js';
import { getWeaponIcon, getTomeIcon, getItemIcon } from '../data/gameUiIcons.js';

export default function TierListsAndPriorities({
  buildState,
  purpose = 'leaderboard',
  setPurpose,
  onApplyUpgrade
}) {
  // 'weapon_upgrades' | 'shrines' | 'all_stats' | 'tomes' | 'weapons' | 'items'
  const [activeSubTab, setActiveSubTab] = useState('weapon_upgrades');
  const [statCategoryFilter, setStatCategoryFilter] = useState('ALL');

  const detailedStats = useMemo(() => {
    return calculateDetailedStatPriorities(buildState, purpose);
  }, [buildState, purpose]);

  const { weaponUpgradeStats, shrineStats, allStats } = detailedStats;

  const { tomesTierList, weaponsTierList, itemsTierList } = useMemo(() => {
    return calculateDynamicTierLists(buildState, purpose);
  }, [buildState, purpose]);

  const purposes = [
    { id: 'leaderboard', label: '👑 Leaderboard God' },
    { id: 'dps_pure', label: '⚔️ Glass Cannon (DPS)' },
    { id: 'balanced', label: '🛡️ Balanced (DPS+EHP)' },
    { id: 'tank_thorns', label: '🗿 Immortal Tank' },
    { id: 'crit_burst', label: '🎯 Overcrit Burst' },
    { id: 'speed_farming', label: '⚡ Economy & Speed' },
  ];

  const subTabs = [
    { id: 'weapon_upgrades', label: '⚔️ Weapon Upgrades', count: `${weaponUpgradeStats.length}` },
    { id: 'shrines', label: '⛩️ Shrine Stats', count: `${shrineStats.length}` },
    { id: 'all_stats', label: '📊 All Stats', count: `${allStats.length}` },
    { id: 'tomes', label: '📖 Tomes', count: '23' },
    { id: 'weapons', label: '🗡️ Weapons', count: '29' },
    { id: 'items', label: '🎁 Items', count: '78' },
  ];

  const tierColors = {
    S: { badge: 'bg-[#eab308] text-black border-white', header: 'text-[#ffe600]', desc: 'Essential Best-in-Slot' },
    A: { badge: 'bg-[#2563eb] text-white border-white', header: 'text-[#38bdf8]', desc: 'High Synergy & Scaling' },
    B: { badge: 'bg-[#16a34a] text-white border-white', header: 'text-[#2ee619]', desc: 'Situational / Solid Filler' },
    C: { badge: 'bg-[#4b5563] text-white border-zinc-400', header: 'text-zinc-300', desc: 'Low Impact / Seal Candidate' }
  };

  const renderTierRows = (tierData, typeLabel) => {
    return ['S', 'A', 'B', 'C'].map((tierKey) => {
      const entries = tierData?.[tierKey] || [];
      if (entries.length === 0) return null;
      const style = tierColors[tierKey];

      return (
        <div key={tierKey} className="mb-window mb-6">
          <div className="mb-window-header">
            <div className="flex items-center gap-3">
              <span className={`w-7 h-7 flex items-center justify-center font-mono font-black text-sm border-2 ${style.badge}`}>
                {tierKey}
              </span>
              <h3 className={`text-base sm:text-lg font-bold uppercase tracking-wider ${style.header}`}>
                TIER {tierKey} — {style.desc}
              </h3>
            </div>
            <span className="text-xs font-mono text-white font-bold">
              {entries.length} {typeLabel.toUpperCase()}S
            </span>
          </div>

          <div className="grid grid-cols-12 px-4 py-2 bg-[#141619] border-b border-[#3a3f46] text-xs font-bold text-zinc-400 uppercase tracking-wider">
            <div className="col-span-1">RANK</div>
            <div className="col-span-6">{typeLabel.toUpperCase()} & SYNERGY RATIONALE</div>
            <div className="col-span-3 text-right">GAIN (DPS / EHP)</div>
            <div className="col-span-2 text-right">ACTION</div>
          </div>

          <div className="divide-y divide-[#2c3036]">
            {entries.map((entry, idx) => {
              const icon =
                typeLabel === 'Weapon'
                  ? getWeaponIcon(entry.name)
                  : typeLabel === 'Tome'
                  ? getTomeIcon(entry.name)
                  : getItemIcon(entry.name);

              return (
                <div
                  key={entry.name}
                  className={`grid grid-cols-12 items-center px-4 py-2.5 text-xs sm:text-sm ${
                    idx % 2 === 0 ? 'mb-row-odd' : 'mb-row-even'
                  }`}
                >
                  <div className="col-span-1 font-mono font-bold text-white">
                    #{idx + 1}
                  </div>
                  <div className="col-span-6 flex items-center gap-3 pr-2">
                    <span className={`w-8 h-8 flex items-center justify-center text-base shrink-0 ${
                      tierKey === 'S' ? 'mb-slot-blue' : 'mb-slot'
                    }`}>
                      {icon}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[#ffe600]">{entry.name}</span>
                        {entry.rarity && (
                          <span className="text-[10px] font-mono px-1.5 bg-black/50 border border-[#5a6068] text-white uppercase">
                            {entry.rarity}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-200 truncate max-w-xl">
                        {entry.rationale || entry.description || entry.ability}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-3 text-right font-mono text-xs">
                    <span className="text-[#2ee619] font-bold mr-3">+{entry.dpsGainPct.toFixed(1)}% DPS</span>
                    <span className="text-[#38bdf8] font-bold">+{entry.ehpGainPct.toFixed(1)}% EHP</span>
                  </div>
                  <div className="col-span-2 text-right flex items-center justify-end gap-2">
                    <span className="font-mono font-bold text-[#ffe600] text-xs">
                      {entry.score.toFixed(0)}
                    </span>
                    {onApplyUpgrade && (
                      <button
                        onClick={() => onApplyUpgrade({ name: entry.name, type: typeLabel.toLowerCase() })}
                        className="mb-btn-blue px-2.5 py-1 text-xs uppercase"
                      >
                        + Equip
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 1. TOP WINDOW HEADER & SUB-TAB SELECTOR */}
      <div className="mb-window">
        <div className="mb-window-header flex-wrap">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
              UNBUNDLED STAT & ITEM TIER LISTS
            </h1>
            <p className="text-xs text-zinc-200 mt-0.5">
              Separate individual rankings for Weapon Upgrades, Shrine Stats, Tomes, Weapons, and Items.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold text-[#ffe600]">Active Goal:</span>
            <select
              value={purpose}
              onChange={(e) => setPurpose && setPurpose(e.target.value)}
              className="mb-input px-2.5 py-1 text-xs text-white font-bold cursor-pointer"
            >
              {purposes.map(p => (
                <option key={p.id} value={p.id} className="bg-[#1c1e22] text-white">
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Authentic Sub-Tab Strip (GLOBAL / FRIENDS style) */}
        <div className="mb-subtab-bar flex-wrap">
          {subTabs.map((tab) => {
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`mb-subtab flex items-center gap-2 ${isActive ? 'mb-subtab-active' : ''}`}
              >
                <span>{tab.label}</span>
                <span className="text-xs font-mono text-[#ffe600]">({tab.count})</span>
              </button>
            );
          })}
        </div>

        {/* 2. SUB-TAB: WEAPON UPGRADES */}
        {activeSubTab === 'weapon_upgrades' && (
          <div>
            <div className="px-4 py-2.5 bg-[#181b20] border-b border-[#3a3f46] flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-[#ffe600] font-bold uppercase">
                ⚔️ WEAPON LEVEL-UP STAT PRIORITIES — Pick these stats in exact order when leveling your equipped weapons
              </span>
              <span className="font-mono text-zinc-300">
                Active Arsenal: {(buildState?.weapons || []).map(w => w.name).join(', ')}
              </span>
            </div>

            <div className="grid grid-cols-12 px-4 py-2 bg-[#141619] border-b border-[#3a3f46] text-xs font-bold text-zinc-400 uppercase tracking-wider">
              <div className="col-span-1">RANK</div>
              <div className="col-span-6">WEAPON STAT UPGRADE & COMPATIBILITY</div>
              <div className="col-span-3 text-right">GAIN (DPS / EHP)</div>
              <div className="col-span-2 text-right">SCORE</div>
            </div>

            <div className="divide-y divide-[#2c3036]">
              {weaponUpgradeStats.map((stat, idx) => {
                const isTop = idx < 2;
                const maxScore = Math.max(1, weaponUpgradeStats[0]?.compositeScore || 50);
                const barWidth = Math.min(100, (stat.compositeScore / maxScore) * 100);

                return (
                  <div
                    key={stat.id}
                    className={`px-4 py-3 ${
                      isTop ? 'mb-row-highlight' : idx % 2 === 0 ? 'mb-row-odd' : 'mb-row-even'
                    }`}
                  >
                    <div className="grid grid-cols-12 items-center text-xs sm:text-sm mb-2">
                      <div className="col-span-1 font-mono font-bold text-white">
                        #{idx + 1}
                      </div>
                      <div className="col-span-6 flex items-center gap-3 pr-2">
                        <span className={`w-8 h-8 flex items-center justify-center text-base shrink-0 ${
                          isTop ? 'mb-slot-blue' : 'mb-slot'
                        }`}>
                          {stat.icon}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-[#ffe600]">{stat.name}</span>
                            <span className="font-mono text-xs px-1.5 bg-black/50 border border-[#5a6068] text-[#38bdf8] font-bold">
                              {stat.inGameLabel}
                            </span>
                            <span className="text-[10px] font-mono uppercase px-1.5 bg-black/40 text-zinc-300">
                              {stat.status}
                            </span>
                          </div>
                          <p className="text-xs text-white mt-0.5">
                            {stat.weaponSynergyText} — {stat.description}
                          </p>
                        </div>
                      </div>
                      <div className="col-span-3 text-right font-mono text-xs">
                        <span className="text-[#2ee619] font-bold mr-3">+{stat.dpsGainPct.toFixed(1)}% DPS</span>
                        <span className="text-[#38bdf8] font-bold">+{stat.ehpGainPct.toFixed(1)}% EHP</span>
                      </div>
                      <div className="col-span-2 text-right font-mono font-bold text-[#ffe600]">
                        {stat.compositeScore.toFixed(0)} pts
                      </div>
                    </div>

                    <div className="mb-progress-track">
                      <div
                        className={isTop ? 'mb-progress-fill-green' : 'mb-progress-fill-blue'}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. SUB-TAB: SHRINE STATS (AUTHENTIC IN-GAME STATS OFFERED AT SHRINES) */}
        {activeSubTab === 'shrines' && (
          <div>
            <div className="px-4 py-2.5 bg-[#181b20] border-b border-[#3a3f46] flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-[#ffe600] font-bold uppercase">
                ⛩️ SHRINE STAT UPGRADE PRIORITIES — Prioritize these exact in-game stats when praying at Shrines
              </span>
              <span className="font-mono text-zinc-300">
                {shrineStats.length} Authentic Shrine Stats
              </span>
            </div>

            <div className="grid grid-cols-12 px-4 py-2 bg-[#141619] border-b border-[#3a3f46] text-xs font-bold text-zinc-400 uppercase tracking-wider">
              <div className="col-span-1">RANK</div>
              <div className="col-span-6">SHRINE STAT OFFERING & IMPACT</div>
              <div className="col-span-3 text-right">GAIN (DPS / EHP)</div>
              <div className="col-span-2 text-right">SCORE</div>
            </div>

            <div className="divide-y divide-[#2c3036]">
              {shrineStats.map((stat, idx) => {
                const isTop = idx < 3;
                const maxScore = Math.max(1, shrineStats[0]?.compositeScore || 50);
                const barWidth = Math.min(100, (stat.compositeScore / maxScore) * 100);

                return (
                  <div
                    key={stat.id}
                    className={`px-4 py-3 ${
                      isTop ? 'mb-row-highlight' : idx % 2 === 0 ? 'mb-row-odd' : 'mb-row-even'
                    }`}
                  >
                    <div className="grid grid-cols-12 items-center text-xs sm:text-sm mb-2">
                      <div className="col-span-1 font-mono font-bold text-white">
                        #{idx + 1}
                      </div>
                      <div className="col-span-6 flex items-center gap-3 pr-2">
                        <span className={`w-8 h-8 flex items-center justify-center text-base shrink-0 ${
                          isTop ? 'mb-slot-blue' : 'mb-slot'
                        }`}>
                          {stat.icon}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-[#ffe600]">{stat.name}</span>
                            <span className="font-mono text-xs px-1.5 bg-black/50 border border-[#5a6068] text-[#38bdf8] font-bold">
                              {stat.inGameLabel}
                            </span>
                            <span className="text-[10px] font-mono uppercase px-1.5 bg-black/40 text-zinc-300">
                              {stat.status}
                            </span>
                          </div>
                          <p className="text-xs text-white mt-0.5">
                            {stat.shrineAdvice || stat.description}
                          </p>
                        </div>
                      </div>
                      <div className="col-span-3 text-right font-mono text-xs">
                        <span className="text-[#2ee619] font-bold mr-3">+{stat.dpsGainPct.toFixed(1)}% DPS</span>
                        <span className="text-[#38bdf8] font-bold">+{stat.ehpGainPct.toFixed(1)}% EHP</span>
                      </div>
                      <div className="col-span-2 text-right font-mono font-bold text-[#ffe600]">
                        {stat.compositeScore.toFixed(0)} pts
                      </div>
                    </div>

                    <div className="mb-progress-track">
                      <div
                        className={isTop ? 'mb-progress-fill-green' : 'mb-progress-fill-blue'}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. SUB-TAB: ALL 21 UNBUNDLED STATS */}
        {activeSubTab === 'all_stats' && (
          <div>
            <div className="px-4 py-2.5 bg-[#181b20] border-b border-[#3a3f46] flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-[#ffe600] font-bold uppercase">
                📊 ALL {allStats.length} DISCRETE UNBUNDLED STATS (MAX HP, SHIELD, ARMOR, XP, LUCK & CURSE SEPARATED)
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {['ALL', 'Offense', 'Defense', 'Leaderboard', 'Utility'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setStatCategoryFilter(cat)}
                    className={`px-2 py-0.5 text-xs font-bold uppercase border cursor-pointer ${
                      statCategoryFilter === cat
                        ? 'bg-[#2471db] text-[#ffe600] border-white'
                        : 'bg-[#141619] text-zinc-300 border-[#525860]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-[#2c3036]">
              {allStats
                .filter(s => statCategoryFilter === 'ALL' || s.category === statCategoryFilter)
                .map((stat, idx) => (
                  <div
                    key={stat.id}
                    className={`grid grid-cols-12 items-center px-4 py-2.5 text-xs sm:text-sm ${
                      idx < 3 ? 'mb-row-highlight' : idx % 2 === 0 ? 'mb-row-odd' : 'mb-row-even'
                    }`}
                  >
                    <div className="col-span-1 font-mono font-bold text-white">
                      #{idx + 1}
                    </div>
                    <div className="col-span-6 flex items-center gap-3 pr-2">
                      <span className="w-8 h-8 mb-slot flex items-center justify-center text-base shrink-0">
                        {stat.icon}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-[#ffe600]">{stat.name}</span>
                          <span className="font-mono text-xs px-1.5 bg-black/50 border border-[#5a6068] text-[#38bdf8] font-bold">
                            {stat.inGameLabel}
                          </span>
                          <span className="text-[10px] font-mono uppercase px-1.5 bg-black/40 text-zinc-300">
                            {stat.category}
                          </span>
                        </div>
                        <p className="text-xs text-white mt-0.5">
                          {stat.description}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-3 text-right font-mono text-xs">
                      <span className="text-[#2ee619] font-bold mr-3">+{stat.dpsGainPct.toFixed(1)}% DPS</span>
                      <span className="text-[#38bdf8] font-bold">+{stat.ehpGainPct.toFixed(1)}% EHP</span>
                    </div>
                    <div className="col-span-2 text-right font-mono font-bold text-[#ffe600]">
                      {stat.compositeScore.toFixed(0)} pts
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. TOMES, WEAPONS & ITEMS TIER LIST WINDOWS */}
      {activeSubTab === 'tomes' && renderTierRows(tomesTierList, 'Tome')}
      {activeSubTab === 'weapons' && renderTierRows(weaponsTierList, 'Weapon')}
      {activeSubTab === 'items' && renderTierRows(itemsTierList, 'Item')}
    </div>
  );
}
