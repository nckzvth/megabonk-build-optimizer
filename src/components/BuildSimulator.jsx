import React, { useState, useMemo } from 'react';
import {
  Trash2,
  ChevronDown,
  ChevronUp,
  Ban
} from 'lucide-react';
import { characters, weapons, tomes, items } from '../data/megabonkData.js';
import {
  calculateDetailedStatPriorities,
  calculateDynamicTierLists,
  calculateBanList
} from '../engine/optimizer.js';
import { getCharacterPortrait, getWeaponIcon, getTomeIcon, getItemIcon } from '../data/gameUiIcons.js';

export default function BuildSimulator({
  character,
  setCharacter,
  level,
  setLevel,
  purpose = 'leaderboard',
  setPurpose,
  currentWeapons,
  setCurrentWeapons,
  currentTomes,
  setCurrentTomes,
  currentItems,
  setCurrentItems,
  buildState,
  onApplyUpgrade
}) {
  const [itemSearch, setItemSearch] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('ALL');
  const [activeStrategyTab, setActiveStrategyTab] = useState('shrines');
  const [showFullCharGrid, setShowFullCharGrid] = useState(true);

  // Calculate Shrine Priorities (18 authentic in-game stats offered at shrines)
  const shrinePriorities = useMemo(() => {
    const detailed = calculateDetailedStatPriorities(buildState, purpose);
    return detailed.shrineStats || [];
  }, [buildState, purpose]);

  // Calculate Item Priorities (ranked items calibrated to build)
  const itemPriorities = useMemo(() => {
    const dynamicTiers = calculateDynamicTierLists(buildState, purpose);
    const sItems = dynamicTiers.itemsTierList?.S || [];
    const aItems = dynamicTiers.itemsTierList?.A || [];
    return [...sItems, ...aItems].sort((a, b) => b.score - a.score);
  }, [buildState, purpose]);

  // Calculate Dynamic Ban List (anti-synergies, zero compatibility, traps)
  const banList = useMemo(() => {
    return calculateBanList(buildState, purpose);
  }, [buildState, purpose]);

  // Add weapon
  const handleAddWeapon = (weaponName) => {
    if (currentWeapons.length >= 4) return;
    if (currentWeapons.some(w => w.name.toLowerCase() === weaponName.toLowerCase())) return;
    setCurrentWeapons([...currentWeapons, { name: weaponName, level: 1 }]);
  };

  const handleRemoveWeapon = (index) => {
    if (currentWeapons.length <= 1) return;
    setCurrentWeapons(currentWeapons.filter((_, i) => i !== index));
  };

  const handleWeaponLevelChange = (index, newLevel) => {
    const updated = [...currentWeapons];
    updated[index].level = Math.max(1, Math.min(10, parseInt(newLevel) || 1));
    setCurrentWeapons(updated);
  };

  // Add tome
  const handleAddTome = (tomeName) => {
    if (currentTomes.length >= 4) return;
    if (currentTomes.some(t => t.name.toLowerCase() === tomeName.toLowerCase())) return;
    setCurrentTomes([...currentTomes, { name: tomeName, level: 1 }]);
  };

  const handleRemoveTome = (index) => {
    setCurrentTomes(currentTomes.filter((_, i) => i !== index));
  };

  const handleTomeLevelChange = (index, newLevel) => {
    const updated = [...currentTomes];
    updated[index].level = Math.max(1, Math.min(10, parseInt(newLevel) || 1));
    setCurrentTomes(updated);
  };

  // Items
  const handleAddItem = (itemName) => {
    const existing = currentItems.find(i => i.name.toLowerCase() === itemName.toLowerCase());
    if (existing) {
      setCurrentItems(currentItems.map(i => i.name.toLowerCase() === itemName.toLowerCase() ? { ...i, count: i.count + 1 } : i));
    } else {
      setCurrentItems([...currentItems, { name: itemName, count: 1 }]);
    }
  };

  const handleRemoveItem = (itemName) => {
    const existing = currentItems.find(i => i.name.toLowerCase() === itemName.toLowerCase());
    if (existing && existing.count > 1) {
      setCurrentItems(currentItems.map(i => i.name.toLowerCase() === itemName.toLowerCase() ? { ...i, count: i.count - 1 } : i));
    } else {
      setCurrentItems(currentItems.filter(i => i.name.toLowerCase() !== itemName.toLowerCase()));
    }
  };

  const stats = buildState?.stats || {};
  const brackets = buildState?.brackets || {};
  const heroPortrait = getCharacterPortrait(character);

  const filteredCatalogItems = items.filter(it => {
    const matchesSearch = it.name.toLowerCase().includes(itemSearch.toLowerCase()) ||
                          it.description.toLowerCase().includes(itemSearch.toLowerCase());
    const matchesRarity = selectedRarity === 'ALL' || it.rarity === selectedRarity;
    return matchesSearch && matchesRarity;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 1. SPLIT GAME WINDOWS: CHARACTER SELECTION & ARSENAL (LEFT) + MEGACHAD-STYLE TELEMETRY INSPECTOR (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT WINDOW (Cols 1-7): CHARACTER SELECTION & ARSENAL LOADOUT */}
        <div className="lg:col-span-7 space-y-6">
          {/* A. AUTHENTIC CHARACTER SELECTION WINDOW (Matches Screenshot 1 Left Panel) */}
          <div className="mb-window">
            <div className="mb-window-header">
              <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
                CHARACTER SELECTION
              </h2>
              <button
                type="button"
                onClick={() => setShowFullCharGrid(!showFullCharGrid)}
                className="mb-btn-stone px-2.5 py-0.5 text-xs uppercase"
              >
                {showFullCharGrid ? 'Compact View' : 'Show Portrait Grid'}
              </button>
            </div>

            <div className="p-4 space-y-4">
              {showFullCharGrid ? (
                /* Authentic 4-Column / 5-Column Metallic Portrait Grid with White Corner Reticles */
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                  {characters.map((c) => {
                    const isSelected = c.name.toLowerCase() === character.toLowerCase();
                    const p = getCharacterPortrait(c.name);
                    return (
                      <button
                        key={c.id || c.name}
                        type="button"
                        onClick={() => setCharacter(c.name)}
                        className={`flex flex-col border-2 border-[#a3a9b0] outline-1 outline-black transition-transform cursor-pointer ${
                          isSelected ? 'mb-reticle scale-[1.02]' : 'hover:brightness-110'
                        }`}
                      >
                        <div className={`w-full h-14 flex items-center justify-center text-2xl bg-gradient-to-b ${
                          isSelected ? 'from-[#3b82f6] to-[#1d4ed8]' : 'from-[#2e3540] to-[#1b1f26]'
                        }`}>
                          {p.emoji}
                        </div>
                        <div className={`w-full py-1 px-1 text-center text-xs font-bold truncate border-t border-[#7c828a] ${
                          isSelected ? 'bg-[#173978] text-[#ffe600]' : 'bg-[#1a1d21] text-white'
                        }`}>
                          {c.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <select
                  value={character}
                  onChange={(e) => setCharacter(e.target.value)}
                  className="w-full mb-input px-3 py-2 text-sm font-bold text-[#ffe600] cursor-pointer"
                >
                  {characters.map(c => (
                    <option key={c.name} value={c.name} className="bg-[#1c1e22] text-white">
                      {c.name} (Starter: {c.startingWeapon})
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* B. WEAPONS & TOMES ARSENAL WINDOW (Aura / Flex Icon-Slot Style) */}
          <div className="mb-window">
            <div className="mb-window-header">
              <h2 className="text-lg font-bold uppercase tracking-wider text-white">
                EQUIPPED WEAPONS ({currentWeapons.length}/4) & TOMES ({currentTomes.length}/4)
              </h2>
              <span className="text-xs font-mono text-[#ffe600]">MAX 4 SLOTS EACH</span>
            </div>

            <div className="p-4 space-y-6">
              {/* Weapons Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#3d424a] pb-1.5">
                  <span className="text-sm font-bold uppercase text-[#ffe600]">
                    ⚔️ Active Weapons ({currentWeapons.length}/4)
                  </span>
                  {currentWeapons.length < 4 && (
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          handleAddWeapon(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      defaultValue=""
                      className="mb-input px-2 py-0.5 text-xs text-[#ffe600] font-bold cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#1c1e22] text-zinc-400">+ Equip Weapon...</option>
                      {weapons.map(w => (
                        <option key={w.name} value={w.name} className="bg-[#1c1e22] text-white">
                          {w.name} ({w.category})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="space-y-2.5">
                  {currentWeapons.map((w, idx) => {
                    const resolved = buildState?.weapons?.find(rw => rw.name.toLowerCase() === w.name.toLowerCase());
                    return (
                      <div key={w.name + idx} className="p-2.5 bg-[#171a1e] border border-[#6c727a] flex items-center gap-3">
                        <div className="w-11 h-11 mb-slot-blue flex items-center justify-center text-xl shrink-0">
                          {getWeaponIcon(w.name)}
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-base text-[#ffe600] truncate">
                              {w.name}
                            </span>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-xs font-mono text-[#2ee619] font-bold">
                                {resolved?.dps ? resolved.dps.toFixed(0) : '0'} DPS
                              </span>
                              <span className="text-xs font-mono text-white font-bold">
                                Lv.{w.level}
                              </span>
                              {currentWeapons.length > 1 && (
                                <button
                                  onClick={() => handleRemoveWeapon(idx)}
                                  className="text-zinc-400 hover:text-red-400 cursor-pointer"
                                  title="Remove weapon"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <input
                              type="range"
                              min="1"
                              max="10"
                              value={w.level}
                              onChange={(e) => handleWeaponLevelChange(idx, e.target.value)}
                              className="flex-1 mb-slider"
                            />
                            <span className="text-[11px] text-zinc-300 truncate max-w-[160px]">
                              Scales: {(resolved?.affectedBy || []).slice(0, 3).join(', ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tomes Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#3d424a] pb-1.5">
                  <span className="text-sm font-bold uppercase text-[#ffe600]">
                    📖 Equipped Tomes ({currentTomes.length}/4)
                  </span>
                  {currentTomes.length < 4 && (
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          handleAddTome(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      defaultValue=""
                      className="mb-input px-2 py-0.5 text-xs text-[#ffe600] font-bold cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#1c1e22] text-zinc-400">+ Equip Tome...</option>
                      {tomes.map(t => (
                        <option key={t.name} value={t.name} className="bg-[#1c1e22] text-white">
                          {t.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="space-y-2.5">
                  {currentTomes.map((t, idx) => (
                    <div key={t.name + idx} className="p-2.5 bg-[#171a1e] border border-[#6c727a] flex items-center gap-3">
                      <div className="w-11 h-11 mb-slot-red flex items-center justify-center text-xl shrink-0">
                        {getTomeIcon(t.name)}
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-base text-[#ffe600] truncate">
                            {t.name}
                          </span>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-xs font-mono text-white font-bold">
                              Tier {t.level}
                            </span>
                            <button
                              onClick={() => handleRemoveTome(idx)}
                              className="text-zinc-400 hover:text-red-400 cursor-pointer"
                              title="Remove tome"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={t.level}
                          onChange={(e) => handleTomeLevelChange(idx, e.target.value)}
                          className="w-full mb-slider"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items Inventory Row (Matches 'Skin' square slot row in Screenshot 1) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#3d424a] pb-1.5">
                  <span className="text-sm font-bold uppercase text-[#ffe600]">
                    🎁 Inventory Items ({currentItems.reduce((acc, i) => acc + i.count, 0)} Stacked)
                  </span>
                </div>

                {/* Square Metallic Item Slots (Skin Row Style) */}
                {currentItems.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {currentItems.map((it) => (
                      <div
                        key={it.name}
                        className="mb-slot px-2.5 py-1.5 flex items-center gap-2 text-xs"
                      >
                        <span className="text-base">{getItemIcon(it.name)}</span>
                        <span className="font-bold text-white">{it.name}</span>
                        <span className="font-mono text-[#ffe600] font-bold">x{it.count}</span>
                        <button
                          onClick={() => handleRemoveItem(it.name)}
                          className="text-zinc-400 hover:text-red-400 font-bold ml-1 cursor-pointer"
                          title="Remove 1 stack"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-zinc-400 italic">No items equipped.</p>
                )}

                {/* Quick Item Search & Add */}
                <div className="pt-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search 78 items to add..."
                      value={itemSearch}
                      onChange={(e) => setItemSearch(e.target.value)}
                      className="flex-1 mb-input px-2.5 py-1 text-xs text-white"
                    />
                    <select
                      value={selectedRarity}
                      onChange={(e) => setSelectedRarity(e.target.value)}
                      className="mb-input px-2 py-1 text-xs text-[#ffe600] font-bold cursor-pointer"
                    >
                      <option value="ALL" className="bg-[#1c1e22]">All Rarities</option>
                      <option value="Common" className="bg-[#1c1e22]">Common</option>
                      <option value="Uncommon" className="bg-[#1c1e22]">Uncommon</option>
                      <option value="Rare" className="bg-[#1c1e22]">Rare</option>
                      <option value="Legendary" className="bg-[#1c1e22]">Legendary</option>
                    </select>
                  </div>

                  <div className="max-h-40 overflow-y-auto divide-y divide-[#2d3138] border border-[#5a6068]">
                    {filteredCatalogItems.slice(0, 12).map((it, idx) => (
                      <div
                        key={it.name}
                        onClick={() => handleAddItem(it.name)}
                        className={`px-3 py-1.5 flex items-center justify-between cursor-pointer text-xs hover:bg-[#2a3340] ${
                          idx % 2 === 0 ? 'mb-row-odd' : 'mb-row-even'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{getItemIcon(it.name)}</span>
                          <span className="font-bold text-white">{it.name}</span>
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">{it.rarity}</span>
                        </div>
                        <span className="text-[#ffe600] font-bold font-mono">+ Equip</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT WINDOW (Cols 8-12): MEGACHAD-STYLE CHARACTER & TELEMETRY INSPECTOR */}
        <div className="lg:col-span-5 mb-window p-5 space-y-5">
          {/* Top Character Portrait + Rank + Level Steppers (Matches Screenshot 1 Right Panel) */}
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 mb-slot-blue mb-reticle flex items-center justify-center text-4xl shrink-0">
              {heroPortrait.emoji}
            </div>
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white tracking-wide truncate">
                  {character}
                </h2>
                <select
                  value={purpose || 'leaderboard'}
                  onChange={(e) => setPurpose && setPurpose(e.target.value)}
                  className="mb-input px-2 py-0.5 text-xs text-[#ffe600] font-bold cursor-pointer"
                >
                  <option value="leaderboard" className="bg-[#1c1e22]">👑 Leaderboard</option>
                  <option value="dps_pure" className="bg-[#1c1e22]">⚔️ Glass Cannon</option>
                  <option value="balanced" className="bg-[#1c1e22]">🛡️ Balanced</option>
                  <option value="tank_thorns" className="bg-[#1c1e22]">🗿 Immortal Tank</option>
                  <option value="crit_burst" className="bg-[#1c1e22]">🎯 Overcrit</option>
                  <option value="speed_farming" className="bg-[#1c1e22]">⚡ Speed Farm</option>
                </select>
              </div>

              {/* Rank / Level + Singular Up/Down Steppers */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-white font-bold flex items-center gap-1">
                  <span className="text-[#38bdf8]">❖</span> Rank / Level {level}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setLevel(Math.max(1, level - 1))}
                    disabled={level <= 1}
                    className="mb-btn-stone w-5 h-5 flex items-center justify-center disabled:opacity-30"
                    title="Level Down (-1)"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLevel(Math.min(100, level + 1))}
                    disabled={level >= 100}
                    className="mb-btn-stone w-5 h-5 flex items-center justify-center disabled:opacity-30"
                    title="Level Up (+1)"
                  >
                    <ChevronUp className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Cyan Rank Progress Bar */}
              <input
                type="range"
                min="1"
                max="100"
                value={level}
                onChange={(e) => setLevel(parseInt(e.target.value))}
                className="w-full mb-slider"
              />

              {/* DPS & EHP Summary Line */}
              <div className="flex items-center justify-between text-xs font-mono pt-0.5">
                <span className="text-[#2ee619] font-bold">
                  ⚔️ {buildState?.totalDps ? buildState.totalDps.toFixed(0) : '0'} DPS
                </span>
                <span className="text-[#38bdf8] font-bold">
                  🛡️ {buildState?.ehp ? buildState.ehp.toFixed(0) : '0'} EHP
                </span>
              </div>
            </div>
          </div>

          {/* Character Passive Description */}
          <p className="text-xs text-white border-y border-[#3d424a] py-2.5 leading-relaxed">
            <span className="text-[#ffe600] font-bold">Passive: </span>
            {buildState?.character?.passive}
          </p>

          {/* Combat Telemetry Leaderboard Rows */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ffe600]">
              LIVE CHARACTER STATS
            </div>
            <div className="border border-[#5a6068] divide-y divide-[#2b2f36] text-xs font-mono">
              {[
                { label: 'Max Hitpoints', val: `${stats.maxHp ? stats.maxHp.toFixed(0) : 100} HP`, color: 'text-white' },
                { label: 'Shield Buffer', val: `${stats.shield ? stats.shield.toFixed(0) : 0}`, color: 'text-[#38bdf8]' },
                { label: 'Armor Reduction', val: `${stats.armor ? stats.armor.toFixed(0) : 0}%`, color: 'text-white' },
                { label: 'Evasion Rate', val: `${stats.evasion ? stats.evasion.toFixed(0) : 0}%`, color: 'text-white' },
                { label: 'HP Sustain / sec', val: `+${buildState?.sustainPerSec?.toFixed(1) || '0.0'}/s`, color: 'text-[#2ee619]' },
                { label: 'Crit Chance', val: `${stats.critChance ? stats.critChance.toFixed(0) : 5}% ${stats.critChance > 100 ? '(OVERCRIT)' : ''}`, color: 'text-[#ffe600]' },
                { label: 'Crit Damage', val: `${stats.critDamage ? stats.critDamage.toFixed(2) : 2.0}x`, color: 'text-[#ffe600]' },
                { label: 'Attack Speed', val: `${stats.attackSpeed ? stats.attackSpeed.toFixed(0) : 100}%`, color: 'text-white' },
                { label: 'Bonus Projectiles', val: `+${stats.projectileCount || 1}`, color: 'text-white' },
                { label: 'Movement Speed', val: `${stats.movementSpeed ? (stats.movementSpeed * 100).toFixed(0) : 100}%`, color: 'text-white' },
                { label: 'Luck Factor', val: `${stats.luck ? stats.luck.toFixed(0) : 0}%`, color: 'text-[#2ee619]' },
              ].map((row, idx) => (
                <div
                  key={row.label}
                  className={`flex justify-between px-3 py-1.5 ${idx % 2 === 0 ? 'mb-row-odd' : 'mb-row-even'}`}
                >
                  <span className="text-zinc-200 font-game">{row.label}</span>
                  <span className={`font-bold ${row.color}`}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 8 Multiplicative Brackets (Styled like Top-Left Quest Trackers in Screenshot 2) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ffe600]">
                8-BRACKET MULTIPLIERS
              </span>
              <span className="text-xs font-mono text-[#2ee619] font-bold">
                {buildState?.damageMultiplier ? buildState.damageMultiplier.toFixed(1) : '1.0'}x Total
              </span>
            </div>

            <div className="space-y-2">
              {[
                { name: 'B1: Damage Tome', val: brackets.b1_damageTome || 1 },
                { name: 'B2: Hero Passive', val: brackets.b2_passive || 1 },
                { name: 'B3: Flat Item Damage', val: brackets.b3_flatItems || 1 },
                { name: 'B4: Main Damage %', val: brackets.b4_mainDamage || 1 },
                { name: 'B6: Attack Speed', val: brackets.b6_attackSpeed || 1 },
                { name: 'B7: Crit Expectation', val: brackets.b7_crit || 1 },
              ].map((b) => (
                <div key={b.name} className="p-2 bg-[#16191d] border border-[#5a6068]">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#ffe600] font-bold">{b.name}</span>
                    <span className="text-[#2ee619] font-mono font-bold">{b.val.toFixed(2)}x</span>
                  </div>
                  <div className="mb-progress-track">
                    <div
                      className="mb-progress-fill-green"
                      style={{ width: `${Math.min(100, b.val * 35)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM LEADERBOARDS-STYLE WINDOW: SHRINE STATS, ITEM PRIORITIES & ALWAYS BAN LIST */}
      <div className="mb-window">
        <div className="mb-window-header flex-wrap">
          <div>
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
              SHRINE STAT PRIORITIES, ITEM HUNT & ALWAYS BAN LIST
            </h2>
          </div>
          <span className="text-xs font-mono text-[#ffe600] font-bold">
            CALIBRATED FOR {(purpose || 'leaderboard').toUpperCase()}
          </span>
        </div>

        {/* Sub-Tabs (Matches GLOBAL | FRIENDS in Screenshot 2 LEADERBOARDS) */}
        <div className="mb-subtab-bar flex-wrap">
          <button
            type="button"
            onClick={() => setActiveStrategyTab('shrines')}
            className={`mb-subtab ${activeStrategyTab === 'shrines' ? 'mb-subtab-active' : ''}`}
          >
            ⛩️ SHRINE STATS ({shrinePriorities.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveStrategyTab('items')}
            className={`mb-subtab ${activeStrategyTab === 'items' ? 'mb-subtab-active' : ''}`}
          >
            🎁 ITEM PRIORITIES ({itemPriorities.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveStrategyTab('ban_list')}
            className={`mb-subtab flex items-center gap-1.5 ${activeStrategyTab === 'ban_list' ? 'mb-subtab-active !text-red-400' : ''}`}
          >
            <Ban className="w-3.5 h-3.5 text-red-400" />
            <span>ALWAYS BAN LIST ({banList.length})</span>
          </button>
        </div>

        {/* TAB 1: SHRINE STAT UPGRADE PRIORITIES (AUTHENTIC IN-GAME STATS) */}
        {activeStrategyTab === 'shrines' && (
          <div>
            <div className="grid grid-cols-12 px-4 py-2 bg-[#141619] border-b border-[#3a3f46] text-xs font-bold text-zinc-400 uppercase tracking-wider">
              <div className="col-span-1">RANK</div>
              <div className="col-span-6">SHRINE STAT OFFERING</div>
              <div className="col-span-3 text-right">GAIN (DPS / EHP)</div>
              <div className="col-span-2 text-right">SCORE</div>
            </div>

            <div className="divide-y divide-[#2c3036]">
              {shrinePriorities.map((shrine, idx) => {
                const isTop3 = idx < 3;
                return (
                  <div
                    key={shrine.id}
                    className={`grid grid-cols-12 items-center px-4 py-2.5 text-xs sm:text-sm ${
                      isTop3 ? 'mb-row-highlight' : idx % 2 === 0 ? 'mb-row-odd' : 'mb-row-even'
                    }`}
                  >
                    <div className="col-span-1 font-mono font-bold text-white">
                      #{idx + 1}
                    </div>
                    <div className="col-span-6 flex items-center gap-3 pr-2">
                      <span className={`w-8 h-8 flex items-center justify-center text-base shrink-0 ${
                        isTop3 ? 'mb-slot-blue' : 'mb-slot'
                      }`}>
                        {shrine.icon}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-bold ${isTop3 ? 'text-[#ffe600]' : 'text-white'}`}>
                            {shrine.name}
                          </span>
                          <span className="font-mono text-xs px-1.5 py-0.2 bg-black/50 border border-[#5a6068] text-[#38bdf8] font-bold">
                            {shrine.inGameLabel}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 truncate max-w-xl">
                          {shrine.shrineAdvice || shrine.description}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-3 text-right font-mono text-xs">
                      <span className="text-[#2ee619] font-bold mr-3">+{shrine.dpsGainPct.toFixed(1)}% DPS</span>
                      <span className="text-[#38bdf8] font-bold">+{shrine.ehpGainPct.toFixed(1)}% EHP</span>
                    </div>
                    <div className="col-span-2 text-right font-mono font-bold text-[#ffe600]">
                      {shrine.compositeScore.toFixed(0)} pts
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: ITEM PRIORITIES */}
        {activeStrategyTab === 'items' && (
          <div>
            <div className="grid grid-cols-12 px-4 py-2 bg-[#141619] border-b border-[#3a3f46] text-xs font-bold text-zinc-400 uppercase tracking-wider">
              <div className="col-span-1">RANK</div>
              <div className="col-span-6">ITEM NAME & EFFECT</div>
              <div className="col-span-3 text-right">GAIN (DPS / EHP)</div>
              <div className="col-span-2 text-right">ACTION</div>
            </div>

            <div className="divide-y divide-[#2c3036]">
              {itemPriorities.map((item, idx) => {
                const isEquipped = currentItems.some(i => i.name.toLowerCase() === item.name.toLowerCase());
                const isS = idx < 10;
                return (
                  <div
                    key={item.name}
                    className={`grid grid-cols-12 items-center px-4 py-2.5 text-xs sm:text-sm ${
                      isEquipped ? 'mb-row-highlight' : idx % 2 === 0 ? 'mb-row-odd' : 'mb-row-even'
                    }`}
                  >
                    <div className="col-span-1 font-mono font-bold text-white">
                      #{idx + 1}
                    </div>
                    <div className="col-span-6 flex items-center gap-3 pr-2">
                      <span className={`w-8 h-8 flex items-center justify-center text-base shrink-0 ${
                        isS ? 'mb-slot-blue' : 'mb-slot'
                      }`}>
                        {getItemIcon(item.name)}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-[#ffe600]">{item.name}</span>
                          <span className="font-mono text-[10px] px-1.5 bg-black/50 border border-[#5a6068] text-white uppercase">
                            {item.rarity}
                          </span>
                          {isEquipped && (
                            <span className="font-mono text-[10px] px-1.5 bg-[#2ee619]/20 border border-[#2ee619] text-[#2ee619] font-bold">
                              EQUIPPED
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-300 truncate max-w-xl">
                          {item.rationale || item.description}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-3 text-right font-mono text-xs">
                      <span className="text-[#2ee619] font-bold mr-3">+{item.dpsGainPct.toFixed(1)}% DPS</span>
                      <span className="text-[#38bdf8] font-bold">+{item.ehpGainPct.toFixed(1)}% EHP</span>
                    </div>
                    <div className="col-span-2 text-right flex items-center justify-end gap-2">
                      <span className="font-mono font-bold text-[#ffe600] text-xs">
                        {item.score.toFixed(0)}
                      </span>
                      <button
                        onClick={() => handleAddItem(item.name)}
                        className="mb-btn-blue px-2.5 py-1 text-xs uppercase"
                      >
                        + Equip
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: ALWAYS BAN LIST */}
        {activeStrategyTab === 'ban_list' && (
          <div>
            <div className="grid grid-cols-12 px-4 py-2 bg-[#141619] border-b border-[#3a3f46] text-xs font-bold text-zinc-400 uppercase tracking-wider">
              <div className="col-span-2">SEVERITY</div>
              <div className="col-span-7">BANNED ITEM / TOME & ANTI-SYNERGY REASON</div>
              <div className="col-span-3 text-right">DIRECTIVE</div>
            </div>

            <div className="divide-y divide-[#2c3036]">
              {banList.map((ban, idx) => {
                const isCritical = ban.severity === 'CRITICAL';
                return (
                  <div
                    key={ban.id || idx}
                    className={`grid grid-cols-12 items-center px-4 py-3 text-xs sm:text-sm ${
                      idx % 2 === 0 ? 'mb-row-odd' : 'mb-row-even'
                    }`}
                  >
                    <div className="col-span-2">
                      <span className={`font-mono text-xs px-2 py-0.5 font-bold border ${
                        isCritical
                          ? 'bg-red-900/60 text-red-200 border-red-400'
                          : 'bg-amber-900/50 text-[#ffe600] border-[#ffe600]'
                      }`}>
                        {ban.badge}
                      </span>
                    </div>
                    <div className="col-span-7 pr-3">
                      <div className="font-bold text-[#ffe600] text-sm">
                        {ban.name} <span className="text-xs font-mono text-zinc-400">({ban.type})</span>
                      </div>
                      <p className="text-xs text-white mt-0.5">
                        {ban.reason}
                      </p>
                    </div>
                    <div className="col-span-3 text-right">
                      <span className="mb-btn-red px-3 py-1 text-xs uppercase inline-block">
                        {ban.action}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
