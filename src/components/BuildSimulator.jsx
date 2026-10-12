import React, { useState } from 'react';
import {
  User,
  Swords,
  BookOpen,
  Package,
  Activity,
  Shield,
  Zap,
  Crosshair,
  Heart,
  TrendingUp,
  Plus,
  Trash2,
  Sliders,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { characters, weapons, tomes, items } from '../data/megabonkData.js';

export default function BuildSimulator({
  character,
  setCharacter,
  level,
  setLevel,
  currentWeapons,
  setCurrentWeapons,
  currentTomes,
  setCurrentTomes,
  currentItems,
  setCurrentItems,
  buildState
}) {
  const [itemSearch, setItemSearch] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('ALL');

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

  // Stats
  const stats = buildState?.stats || {};
  const brackets = buildState?.brackets || {};

  // Filter items in catalog
  const filteredCatalogItems = items.filter(it => {
    const matchesSearch = it.name.toLowerCase().includes(itemSearch.toLowerCase()) ||
                          it.description.toLowerCase().includes(itemSearch.toLowerCase());
    const matchesRarity = selectedRarity === 'ALL' || it.rarity === selectedRarity;
    return matchesSearch && matchesRarity;
  });

  return (
    <div className="max-w-6xl mx-auto py-4 space-y-12">
      {/* 1. TOP EDITORIAL BANNER */}
      <div className="pb-6 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
            Pro Creative Studio
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Build Simulator & Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-light">
            Live mathematical sandbox with 8-bracket multiplicative damage calculation.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-zinc-500">Live Loadout:</span>
          <span className="text-white font-bold">{character}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-amber-400 font-semibold">Lv. {level}</span>
        </div>
      </div>

      {/* 2. APPLE STUDIO WORKBENCH (TWO OPEN ARCHITECTURAL PANES, ZERO CARDS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT PANE: Arsenal & Loadout Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-10 lg:border-r border-white/[0.08] lg:pr-10">
          {/* A. HERO & PROGRESSION */}
          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                Hero Selection & Progression
              </span>
              <span className="text-xs font-mono text-amber-400 font-bold">
                Level {level} / 100
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
              <div>
                <label className="text-[11px] text-zinc-400 uppercase font-mono block mb-1">
                  Active Hero
                </label>
                <select
                  value={character}
                  onChange={(e) => setCharacter(e.target.value)}
                  className="w-full bg-transparent border-b border-zinc-700 hover:border-zinc-400 text-white font-bold py-1.5 text-sm focus:outline-none cursor-pointer transition-colors"
                >
                  {characters.map(c => (
                    <option key={c.name} value={c.name} className="bg-zinc-950 text-white">
                      {c.name} (Starts: {c.startingWeapon})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400 uppercase font-mono mb-1">
                  <span>Level Track</span>
                  <div className="flex items-center gap-1.5 font-mono">
                    <button
                      type="button"
                      onClick={() => setLevel(Math.max(1, level - 1))}
                      disabled={level <= 1}
                      className="w-5 h-5 rounded-full bg-white/[0.06] hover:bg-white/[0.15] active:scale-95 text-zinc-300 hover:text-white flex items-center justify-center transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                      title="Level Down (-1)"
                      aria-label="Level Down (-1)"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-amber-400 font-bold font-sans text-sm min-w-10 text-center">
                      Lv. {level}
                    </span>
                    <button
                      type="button"
                      onClick={() => setLevel(Math.min(100, level + 1))}
                      disabled={level >= 100}
                      className="w-5 h-5 rounded-full bg-white/[0.06] hover:bg-white/[0.15] active:scale-95 text-zinc-300 hover:text-white flex items-center justify-center transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                      title="Level Up (+1)"
                      aria-label="Level Up (+1)"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={level}
                  onChange={(e) => setLevel(parseInt(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-1 bg-zinc-800 rounded-full mt-2"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                  <button onClick={() => setLevel(1)} className="hover:text-zinc-300 cursor-pointer">1 (Start)</button>
                  <button onClick={() => setLevel(25)} className="hover:text-zinc-300 cursor-pointer">25 (Mid)</button>
                  <button onClick={() => setLevel(50)} className="hover:text-zinc-300 cursor-pointer">50 (Boss)</button>
                  <button onClick={() => setLevel(100)} className="hover:text-zinc-300 cursor-pointer">100 (Endless)</button>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-zinc-400 font-light leading-relaxed">
              <span className="text-amber-400 font-medium">Hero Passive: </span>
              {buildState?.character?.passive}
            </div>
          </div>

          {/* B. WEAPONS DECK (4 SLOTS) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                  Weapons Deck
                </span>
                <span className="text-xs font-mono text-white font-bold">
                  ({currentWeapons.length}/4)
                </span>
              </div>

              {currentWeapons.length < 4 && (
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAddWeapon(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  defaultValue=""
                  className="bg-transparent border-b border-zinc-700 text-amber-400 text-xs font-semibold py-1 focus:outline-none cursor-pointer"
                >
                  <option value="" disabled className="bg-zinc-950 text-zinc-500">+ Add Weapon</option>
                  {weapons.map(w => (
                    <option key={w.name} value={w.name} className="bg-zinc-950 text-white">
                      {w.name} ({w.category})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="divide-y divide-white/[0.06]">
              {currentWeapons.map((w, idx) => {
                const resolved = buildState?.weapons?.find(rw => rw.name.toLowerCase() === w.name.toLowerCase());
                return (
                  <div key={w.name + idx} className="py-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-zinc-600 font-bold">0{idx + 1}</span>
                        <span className="font-bold text-sm text-white flex items-center gap-1.5">
                          ⚔️ {w.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-emerald-400 font-bold">
                          {resolved?.dps ? resolved.dps.toFixed(0) : '0'} DPS
                        </span>
                        <span className="text-xs font-mono text-zinc-400">
                          Lv. {w.level}
                        </span>
                        {currentWeapons.length > 1 && (
                          <button
                            onClick={() => handleRemoveWeapon(idx)}
                            className="text-zinc-600 hover:text-rose-400 transition-colors cursor-pointer"
                            title="Remove weapon"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={w.level}
                        onChange={(e) => handleWeaponLevelChange(idx, e.target.value)}
                        className="flex-1 accent-amber-400 cursor-pointer h-1 bg-zinc-800 rounded-full"
                      />
                      <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                        Scales: {(resolved?.affectedBy || []).slice(0, 3).join(', ')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* C. TOMES DECK (4 SLOTS) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                  Tomes Deck
                </span>
                <span className="text-xs font-mono text-white font-bold">
                  ({currentTomes.length}/4)
                </span>
              </div>

              {currentTomes.length < 4 && (
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAddTome(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  defaultValue=""
                  className="bg-transparent border-b border-zinc-700 text-amber-400 text-xs font-semibold py-1 focus:outline-none cursor-pointer"
                >
                  <option value="" disabled className="bg-zinc-950 text-zinc-500">+ Add Tome</option>
                  {tomes.map(t => (
                    <option key={t.name} value={t.name} className="bg-zinc-950 text-white">
                      {t.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="divide-y divide-white/[0.06]">
              {currentTomes.length === 0 ? (
                <div className="py-4 text-xs text-zinc-500 font-mono italic">
                  No tomes equipped. Add up to 4 tomes to activate multiplicative scaling.
                </div>
              ) : (
                currentTomes.map((t, idx) => (
                  <div key={t.name + idx} className="py-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-zinc-600 font-bold">0{idx + 1}</span>
                        <span className="font-bold text-sm text-white flex items-center gap-1.5">
                          📖 {t.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-amber-400 font-bold">
                          Tier {t.level}
                        </span>
                        <button
                          onClick={() => handleRemoveTome(idx)}
                          className="text-zinc-600 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Remove tome"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={t.level}
                        onChange={(e) => handleTomeLevelChange(idx, e.target.value)}
                        className="flex-1 accent-amber-400 cursor-pointer h-1 bg-zinc-800 rounded-full"
                      />
                      <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                        Multiplier Bracket
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* D. ACTIVE ITEMS INVENTORY & CATALOG PICKER */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                Items Inventory ({currentItems.reduce((acc, i) => acc + i.count, 0)})
              </span>
            </div>

            {/* Active Items Pills */}
            {currentItems.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {currentItems.map((it) => (
                  <div
                    key={it.name}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs"
                  >
                    <span className="font-medium text-white">{it.name}</span>
                    <span className="font-mono text-amber-400 font-bold">x{it.count}</span>
                    <button
                      onClick={() => handleRemoveItem(it.name)}
                      className="text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer ml-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 font-mono italic">No items currently equipped in inventory.</p>
            )}

            {/* Catalog Search & Add */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search item to equip..."
                  value={itemSearch}
                  onChange={(e) => setItemSearch(e.target.value)}
                  className="flex-1 bg-transparent border-b border-zinc-700 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
                <select
                  value={selectedRarity}
                  onChange={(e) => setSelectedRarity(e.target.value)}
                  className="bg-transparent border-b border-zinc-700 py-1.5 text-xs text-zinc-400 focus:outline-none cursor-pointer"
                >
                  <option value="ALL" className="bg-zinc-950">All Rarities</option>
                  <option value="Common" className="bg-zinc-950">Common</option>
                  <option value="Uncommon" className="bg-zinc-950">Uncommon</option>
                  <option value="Rare" className="bg-zinc-950">Rare</option>
                  <option value="Legendary" className="bg-zinc-950">Legendary</option>
                </select>
              </div>

              <div className="max-h-48 overflow-y-auto divide-y divide-white/[0.04] border-y border-white/[0.06]">
                {filteredCatalogItems.slice(0, 12).map((it) => (
                  <div
                    key={it.name}
                    onClick={() => handleAddItem(it.name)}
                    className="flex items-center justify-between py-2 hover:bg-white/[0.02] transition-colors cursor-pointer text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-medium text-white">{it.name}</span>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">
                        {it.rarity}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-amber-400 hover:text-white font-semibold">
                      + Add to Run
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: Live Telemetry & Engine Inspector (5 Cols) */}
        <div className="lg:col-span-5 space-y-10">
          {/* A. HEADLINE POWER OUTPUT (BIG KEYNOTE NUMBERS) */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
              Calculated Power Output
            </span>

            <div className="grid grid-cols-2 gap-6 py-4 border-y border-white/[0.08] font-mono">
              <div>
                <div className="text-[11px] text-zinc-500 uppercase tracking-widest">Total Output DPS</div>
                <div className="text-4xl font-extrabold text-emerald-400 mt-1">
                  {buildState?.totalDps ? buildState.totalDps.toFixed(0) : '0'}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">composite damage</div>
              </div>

              <div>
                <div className="text-[11px] text-zinc-500 uppercase tracking-widest">Effective HP</div>
                <div className="text-4xl font-extrabold text-cyan-400 mt-1">
                  {buildState?.ehp ? buildState.ehp.toFixed(0) : '0'}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">survival buffer</div>
              </div>
            </div>
          </div>

          {/* B. COMBAT TELEMETRY SPEC SHEET */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
              Combat Telemetry Specs
            </span>

            <div className="divide-y divide-white/[0.06] border-y border-white/[0.08] text-xs font-mono">
              <div className="flex justify-between py-2">
                <span className="text-zinc-400 font-sans">Max Hitpoints</span>
                <span className="font-bold text-white">{stats.maxHp ? stats.maxHp.toFixed(0) : 100}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-zinc-400 font-sans">Armor Reduction</span>
                <span className="font-bold text-white">{stats.armor ? stats.armor.toFixed(0) : 0}%</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-zinc-400 font-sans">Evasion Rate</span>
                <span className="font-bold text-white">{stats.evasion ? stats.evasion.toFixed(0) : 0}%</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-zinc-400 font-sans">HP Sustain / sec</span>
                <span className="font-bold text-emerald-400">+{buildState?.sustainPerSec?.toFixed(1) || '0.0'}/s</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-zinc-400 font-sans">Critical Strike Chance</span>
                <span className="font-bold text-amber-400">
                  {stats.critChance ? stats.critChance.toFixed(0) : 5}%
                  {stats.critChance > 100 && (
                    <span className="text-[10px] ml-1.5 px-1.5 py-0.2 rounded-full bg-amber-400/10 text-amber-300 font-bold">
                      OVERCRIT
                    </span>
                  )}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-zinc-400 font-sans">Critical Damage Multiplier</span>
                <span className="font-bold text-amber-400">{stats.critDamage ? stats.critDamage.toFixed(2) : 2.0}x</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-zinc-400 font-sans">Attack Speed Ratio</span>
                <span className="font-bold text-white">{stats.attackSpeed ? stats.attackSpeed.toFixed(0) : 100}%</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-zinc-400 font-sans">Bonus Projectiles</span>
                <span className="font-bold text-white">+{stats.projectileCount || 1}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-zinc-400 font-sans">Movement Speed</span>
                <span className="font-bold text-white">{stats.movementSpeed ? (stats.movementSpeed * 100).toFixed(0) : 100}%</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-zinc-400 font-sans">Luck Factor</span>
                <span className="font-bold text-purple-400">{stats.luck ? stats.luck.toFixed(0) : 0}%</span>
              </div>
            </div>
          </div>

          {/* C. MULTIPLICATIVE DAMAGE BRACKETS (8 BRACKETS) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                Multiplicative Brackets
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {buildState?.damageMultiplier ? buildState.damageMultiplier.toFixed(1) : '1.0'}x Total
              </span>
            </div>

            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Separate categories multiply together. Spread upgrades across brackets to defeat diminishing returns.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-400">B1: Damage Tome</span>
                  <span className="font-bold text-amber-400">{brackets.b1_damageTome?.toFixed(2)}x</span>
                </div>
                <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (brackets.b1_damageTome || 1) * 35)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-400">B2: Character Passive</span>
                  <span className="font-bold text-amber-400">{brackets.b2_passive?.toFixed(2)}x</span>
                </div>
                <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (brackets.b2_passive || 1) * 35)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-400">B3: Flat Item Damage</span>
                  <span className="font-bold text-amber-400">{brackets.b3_flatItems?.toFixed(2)}x</span>
                </div>
                <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (brackets.b3_flatItems || 1) * 35)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-400">B4: Main Damage %</span>
                  <span className="font-bold text-amber-400">{brackets.b4_mainDamage?.toFixed(2)}x</span>
                </div>
                <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (brackets.b4_mainDamage || 1) * 35)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-400">B6: Attack Speed</span>
                  <span className="font-bold text-amber-400">{brackets.b6_attackSpeed?.toFixed(2)}x</span>
                </div>
                <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (brackets.b6_attackSpeed || 1) * 35)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-400">B7: Crit Expectation</span>
                  <span className="font-bold text-amber-400">{brackets.b7_crit?.toFixed(2)}x</span>
                </div>
                <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-400 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (brackets.b7_crit || 1) * 35)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
