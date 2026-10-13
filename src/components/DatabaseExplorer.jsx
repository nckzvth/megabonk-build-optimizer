import React, { useState, useMemo } from 'react';
import {
  Search,
  Sparkles,
  Plus,
  Coins
} from 'lucide-react';
import { characters, weapons, tomes, items } from '../data/megabonkData.js';
import { getCharacterPortrait, getWeaponIcon, getTomeIcon, getItemIcon } from '../data/gameUiIcons.js';

export default function DatabaseExplorer({ onEquipItem, onSendToAdvisor }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('ALL');

  const unifiedDatabase = useMemo(() => {
    const list = [
      ...characters.map(c => ({
        ...c,
        category: 'Character',
        type: 'character',
        rarity: 'Common',
        subtext: `Starts with ${c.startingWeapon}`,
        desc: c.passive,
        unlockDesc: c.prereq
      })),
      ...weapons.map(w => ({
        ...w,
        category: 'Weapon',
        type: 'weapon',
        rarity: 'Common',
        subtext: `${w.category} • Tier ${w.tier}`,
        desc: w.description,
        unlockDesc: w.unlock
      })),
      ...tomes.map(t => ({
        ...t,
        category: 'Tome',
        type: 'tome',
        rarity: 'Common',
        subtext: `Tier ${t.tier} • Bracket #${t.bracket || 0}`,
        desc: t.ability,
        unlockDesc: t.objective
      })),
      ...items.map(i => ({
        ...i,
        category: 'Item',
        type: 'item',
        subtext: `${i.rarity} • Tier ${i.tier}`,
        desc: i.description,
        unlockDesc: i.objective
      }))
    ];
    return list;
  }, []);

  const filteredItems = useMemo(() => {
    return unifiedDatabase.filter(entry => {
      if (activeCategory !== 'ALL' && entry.category !== activeCategory) return false;
      if (selectedRarity !== 'ALL' && entry.rarity !== selectedRarity) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = entry.name.toLowerCase().includes(q);
        const matchesDesc = (entry.desc || '').toLowerCase().includes(q);
        const matchesUnlock = (entry.unlockDesc || '').toLowerCase().includes(q);
        const matchesTags = (entry.affectedBy || []).some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesUnlock && !matchesTags) return false;
      }

      return true;
    });
  }, [unifiedDatabase, activeCategory, selectedRarity, searchQuery]);

  const categories = [
    { id: 'ALL', label: 'ALL ENTRIES', count: unifiedDatabase.length },
    { id: 'Character', label: 'CHARACTERS', count: characters.length },
    { id: 'Weapon', label: 'WEAPONS', count: weapons.length },
    { id: 'Tome', label: 'TOMES', count: tomes.length },
    { id: 'Item', label: 'ITEMS', count: items.length },
  ];

  const getEntryIcon = (entry) => {
    if (entry.category === 'Character') return getCharacterPortrait(entry.name).emoji;
    if (entry.category === 'Weapon') return getWeaponIcon(entry.name);
    if (entry.category === 'Tome') return getTomeIcon(entry.name);
    return getItemIcon(entry.name);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-window">
        {/* Pine-Green Window Title Header */}
        <div className="mb-window-header flex-wrap">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
              MEGABONK UNLOCKS, QUESTS & WIKI COMPENDIUM
            </h1>
            <p className="text-xs text-zinc-200 mt-0.5">
              Complete database of all 20 Characters, 29 Weapons, 23 Tomes, and 78 Items with unlock quests.
            </p>
          </div>
          <span className="text-xs font-mono text-[#ffe600] font-bold">
            {filteredItems.length} MATCHING ENTRIES
          </span>
        </div>

        {/* Sub-Tabs + Search Bar */}
        <div className="mb-subtab-bar flex-wrap items-center justify-between pr-3">
          <div className="flex flex-wrap">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`mb-subtab flex items-center gap-1.5 ${isActive ? 'mb-subtab-active' : ''}`}
                >
                  <span>{cat.label}</span>
                  <span className="text-xs font-mono text-[#ffe600]">({cat.count})</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 py-1.5 pl-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-300 pointer-events-none" />
              <input
                type="text"
                placeholder="Search name, stat, quest..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-input pl-8 pr-3 py-1 text-xs text-white w-48 sm:w-64"
              />
            </div>

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
        </div>

        {/* Table Column Headers */}
        <div className="grid grid-cols-12 px-4 py-2 bg-[#141619] border-b border-[#3a3f46] text-xs font-bold text-zinc-400 uppercase tracking-wider">
          <div className="col-span-5">NAME, TYPE & IN-GAME EFFECT</div>
          <div className="col-span-5">UNLOCK QUEST & SILVER COST</div>
          <div className="col-span-2 text-right">ACTION</div>
        </div>

        {/* Alternating Striped Rows */}
        <div className="divide-y divide-[#2c3036]">
          {filteredItems.map((entry, idx) => (
            <div
              key={entry.category + entry.name + idx}
              className={`grid grid-cols-12 items-center px-4 py-3 gap-3 text-xs sm:text-sm ${
                idx % 2 === 0 ? 'mb-row-odd' : 'mb-row-even'
              }`}
            >
              {/* Col 1-5: Icon + Name + Description */}
              <div className="col-span-12 lg:col-span-5 flex items-start gap-3">
                <div className="w-10 h-10 mb-slot-blue flex items-center justify-center text-xl shrink-0">
                  {getEntryIcon(entry)}
                </div>
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-base text-[#ffe600]">
                      {entry.name}
                    </h3>
                    <span className="text-[10px] font-mono uppercase px-1.5 bg-black/50 border border-[#5a6068] text-white">
                      {entry.category}
                    </span>
                    {entry.rarity && (
                      <span className="text-[10px] font-mono uppercase px-1.5 bg-black/40 text-[#38bdf8]">
                        {entry.rarity}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white leading-relaxed">
                    {entry.desc}
                  </p>
                  {entry.affectedBy && entry.affectedBy.length > 0 && (
                    <p className="text-[11px] font-mono text-[#2ee619]">
                      Scales with: {entry.affectedBy.join(', ')}
                    </p>
                  )}
                </div>
              </div>

              {/* Col 6-10: Quest & Silver Progress Box (Matches Quest Tracker in Screenshot 2) */}
              <div className="col-span-12 lg:col-span-5">
                <div className="p-2 bg-[#16191d] border border-[#5a6068] space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#ffe600] font-bold">
                      {entry.unlockDesc ? 'Unlock Challenge:' : 'Default Unlock'}
                    </span>
                    {entry.silverCost && entry.silverCost !== 'N/A' && entry.silverCost !== 'Unlocked by Default' && (
                      <span className="text-white font-mono font-bold flex items-center gap-1">
                        <Coins className="w-3 h-3 text-slate-300" /> {entry.silverCost} Silver
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-white">
                    {entry.unlockDesc || 'Unlocked by default'}
                  </div>
                  <div className="mb-progress-track">
                    <div className="mb-progress-fill-green" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>

              {/* Col 11-12: Action Buttons */}
              <div className="col-span-12 lg:col-span-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => onSendToAdvisor(entry)}
                  className="mb-btn-stone px-2.5 py-1 text-xs uppercase flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#ffe600]" />
                  <span>Test</span>
                </button>
                <button
                  onClick={() => onEquipItem(entry)}
                  className="mb-btn-blue px-3 py-1 text-xs uppercase flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Equip</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
