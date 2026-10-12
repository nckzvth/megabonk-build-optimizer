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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT COLUMN: Character, Weapons, Tomes, Items (7 Cols) */}
      <div className="lg:col-span-7 space-y-6">
        {/* CHARACTER SELECTION */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-heading font-bold text-amber-400 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-400" />
              Character & Level
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Hero Level:</span>
              <span className="text-sm font-bold text-amber-400 font-mono">Lv.{level}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Selected Character:</label>
              <select
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {characters.map(c => (
                  <option key={c.name} value={c.name}>
                    {c.name} (Starts: {c.startingWeapon})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block flex justify-between">
                <span>Run Level (1 - 100):</span>
                <span className="font-mono text-amber-400">{level}</span>
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={level}
                onChange={(e) => setLevel(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Active Passive Preview */}
          <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
            <span className="font-bold text-amber-400">Passive Ability: </span>
            <span className="text-slate-300">{buildState?.character?.passive}</span>
          </div>
        </div>

        {/* WEAPONS LOADOUT (UP TO 4) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-heading font-bold text-amber-400 flex items-center gap-2">
              <Swords className="w-4 h-4 text-amber-400" />
              Equipped Weapons ({currentWeapons.length} / 4)
            </h3>
            {currentWeapons.length < 4 && (
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddWeapon(e.target.value);
                    e.target.value = '';
                  }
                }}
                defaultValue=""
                className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-amber-400 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="" disabled>+ Add Weapon</option>
                {weapons.map(w => (
                  <option key={w.name} value={w.name}>
                    {w.name} ({w.category})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentWeapons.map((w, idx) => {
              const resolved = buildState?.weapons?.find(rw => rw.name.toLowerCase() === w.name.toLowerCase());
              return (
                <div key={w.name + idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                      ⚔️ {w.name}
                    </span>
                    <button
                      onClick={() => handleRemoveWeapon(idx)}
                      className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span>Level: {w.level}</span>
                    <span className="text-emerald-400 font-bold">
                      {resolved?.dps ? resolved.dps.toFixed(0) : '0'} DPS
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={w.level}
                    onChange={(e) => handleWeaponLevelChange(idx, e.target.value)}
                    className="w-full accent-amber-500 cursor-pointer"
                  />

                  <div className="text-[10px] text-slate-400 mt-2 truncate">
                    Affected by: {(resolved?.affectedBy || []).join(', ') || 'Standard damage'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TOMES LOADOUT (UP TO 4) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-heading font-bold text-amber-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Equipped Tomes ({currentTomes.length} / 4)
            </h3>
            {currentTomes.length < 4 && (
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddTome(e.target.value);
                    e.target.value = '';
                  }
                }}
                defaultValue=""
                className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-amber-400 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="" disabled>+ Add Tome</option>
                {tomes.map(t => (
                  <option key={t.name} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentTomes.map((t, idx) => (
              <div key={t.name + idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                    📖 {t.name}
                  </span>
                  <button
                    onClick={() => handleRemoveTome(idx)}
                    className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>Level: {t.level}</span>
                  <span className="text-amber-400 font-bold">Tier {t.level}</span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="10"
                  value={t.level}
                  onChange={(e) => handleTomeLevelChange(idx, e.target.value)}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ITEMS INVENTORY */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-heading font-bold text-amber-400 flex items-center gap-2">
              <Package className="w-4 h-4 text-amber-400" />
              Active Inventory Items ({currentItems.reduce((acc, i) => acc + i.count, 0)})
            </h3>
          </div>

          {/* Active Items Pills */}
          {currentItems.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-4 p-3 rounded-xl bg-slate-950 border border-slate-800">
              {currentItems.map((it) => (
                <div
                  key={it.name}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs"
                >
                  <span className="font-semibold text-slate-200">{it.name}</span>
                  <span className="font-mono text-amber-400 font-bold">x{it.count}</span>
                  <button
                    onClick={() => handleRemoveItem(it.name)}
                    className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 mb-4 italic">No items currently active in inventory.</p>
          )}

          {/* Item Catalog Picker */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search items to add..."
                value={itemSearch}
                onChange={(e) => setItemSearch(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Rarities</option>
                <option value="Common">Common</option>
                <option value="Uncommon">Uncommon</option>
                <option value="Rare">Rare</option>
                <option value="Legendary">Legendary</option>
              </select>
            </div>

            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
              {filteredCatalogItems.slice(0, 15).map((it) => (
                <div
                  key={it.name}
                  onClick={() => handleAddItem(it.name)}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800/80 transition-all cursor-pointer text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200">{it.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                      it.rarity === 'Legendary' ? 'rarity-legendary' :
                      it.rarity === 'Rare' ? 'rarity-rare' :
                      it.rarity === 'Uncommon' ? 'rarity-uncommon' : 'rarity-common'
                    }`}>
                      {it.rarity}
                    </span>
                  </div>
                  <span className="text-slate-400 hover:text-amber-400 font-bold">+ Add</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Live Stat Sheet & 8 Damage Brackets (5 Cols) */}
      <div className="lg:col-span-5 space-y-6">
        {/* LIVE STAT SHEET */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <h3 className="text-base font-heading font-bold text-amber-400 flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-amber-400" />
            Live Build Character Sheet
          </h3>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs mb-4">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Total DPS</span>
              <span className="text-xl font-bold text-emerald-400">
                {buildState?.totalDps ? buildState.totalDps.toFixed(0) : '0'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Effective HP (EHP)</span>
              <span className="text-xl font-bold text-cyan-400">
                {buildState?.ehp ? buildState.ehp.toFixed(0) : '0'}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Max HP:</span>
              <span className="font-bold text-slate-200">{stats.maxHp ? stats.maxHp.toFixed(0) : 100}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Armor:</span>
              <span className="font-bold text-slate-200">{stats.armor ? stats.armor.toFixed(0) : 0}%</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Evasion:</span>
              <span className="font-bold text-slate-200">{stats.evasion ? stats.evasion.toFixed(0) : 0}%</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">HP Sustain/sec:</span>
              <span className="font-bold text-emerald-400">+{buildState?.sustainPerSec?.toFixed(1) || '0.0'}/s</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Crit Chance:</span>
              <span className="font-bold text-amber-400">
                {stats.critChance ? stats.critChance.toFixed(0) : 5}%
                {stats.critChance > 100 && (
                  <span className="text-[10px] ml-1 px-1 rounded bg-amber-500/20 text-amber-300">
                    OVERCRIT
                  </span>
                )}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Crit Damage:</span>
              <span className="font-bold text-amber-400">{stats.critDamage ? stats.critDamage.toFixed(2) : 2.0}x</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Attack Speed:</span>
              <span className="font-bold text-slate-200">{stats.attackSpeed ? stats.attackSpeed.toFixed(0) : 100}%</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Projectiles:</span>
              <span className="font-bold text-slate-200">+{stats.projectileCount || 1}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Movement Speed:</span>
              <span className="font-bold text-slate-200">{stats.movementSpeed ? (stats.movementSpeed * 100).toFixed(0) : 100}%</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-400">Luck:</span>
              <span className="font-bold text-purple-400">{stats.luck ? stats.luck.toFixed(0) : 0}%</span>
            </div>
          </div>
        </div>

        {/* 8 DAMAGE BRACKETS VISUALIZER */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-heading font-bold text-amber-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              The 8 Damage Brackets (Multiplicative)
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
              {buildState?.damageMultiplier ? buildState.damageMultiplier.toFixed(1) : '1.0'}x Total
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Independent categories that multiply together. Avoid stacking only one bracket!
          </p>

          <div className="space-y-3 font-mono text-xs">
            {/* Bracket 1 */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">B1: Damage Tome</span>
                <span className="font-bold text-amber-400">{brackets.b1_damageTome?.toFixed(2)}x</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (brackets.b1_damageTome || 1) * 35)}%` }}
                ></div>
              </div>
            </div>

            {/* Bracket 2 */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">B2: Character Passive</span>
                <span className="font-bold text-amber-400">{brackets.b2_passive?.toFixed(2)}x</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (brackets.b2_passive || 1) * 35)}%` }}
                ></div>
              </div>
            </div>

            {/* Bracket 3 */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">B3: Flat Item Damage</span>
                <span className="font-bold text-amber-400">{brackets.b3_flatItems?.toFixed(2)}x</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (brackets.b3_flatItems || 1) * 35)}%` }}
                ></div>
              </div>
            </div>

            {/* Bracket 4 */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">B4: Main Damage %</span>
                <span className="font-bold text-amber-400">{brackets.b4_mainDamage?.toFixed(2)}x</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (brackets.b4_mainDamage || 1) * 35)}%` }}
                ></div>
              </div>
            </div>

            {/* Bracket 6 */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">B6: Attack Speed</span>
                <span className="font-bold text-amber-400">{brackets.b6_attackSpeed?.toFixed(2)}x</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (brackets.b6_attackSpeed || 1) * 35)}%` }}
                ></div>
              </div>
            </div>

            {/* Bracket 7 */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">B7: Crit Expectation</span>
                <span className="font-bold text-amber-400">{brackets.b7_crit?.toFixed(2)}x</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (brackets.b7_crit || 1) * 35)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
