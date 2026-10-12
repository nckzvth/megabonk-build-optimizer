import React, { useState, useMemo } from 'react';
import {
  Database,
  Search,
  Filter,
  User,
  Swords,
  BookOpen,
  Package,
  Sparkles,
  ExternalLink,
  Plus,
  Coins,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { characters, weapons, tomes, items } from '../data/megabonkData.js';

export default function DatabaseExplorer({ onEquipItem, onSendToAdvisor }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('ALL');
  const [selectedItemDetail, setSelectedItemDetail] = useState(null);

  // Combine items with category tag
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

  // Filter items
  const filteredItems = useMemo(() => {
    return unifiedDatabase.filter(entry => {
      // Category filter
      if (activeCategory !== 'ALL' && entry.category !== activeCategory) return false;

      // Rarity filter
      if (selectedRarity !== 'ALL' && entry.rarity !== selectedRarity) return false;

      // Search query
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
    { id: 'ALL', label: `All Entries (${unifiedDatabase.length})`, icon: Database },
    { id: 'Character', label: `Characters (${characters.length})`, icon: User },
    { id: 'Weapon', label: `Weapons (${weapons.length})`, icon: Swords },
    { id: 'Tome', label: `Tomes (${tomes.length})`, icon: BookOpen },
    { id: 'Item', label: `Items (${items.length})`, icon: Package },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-heading font-bold text-amber-400 flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-400" />
              Megabonk Complete Encyclopedia
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Verified community database: 20 Characters, 29 Weapons, 23 Tomes, and 78 Items with unlock quests and scaling tags.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {filteredItems.length} matching entries
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="pt-4 flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Rarity */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, stat, quest..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Rarities</option>
              <option value="Common">Common</option>
              <option value="Uncommon">Uncommon</option>
              <option value="Rare">Rare</option>
              <option value="Legendary">Legendary</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Database Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((entry) => {
          const rarityBorder =
            entry.rarity === 'Legendary'
              ? 'border-amber-500/60 shadow-amber-500/10'
              : entry.rarity === 'Rare'
              ? 'border-purple-500/50'
              : entry.rarity === 'Uncommon'
              ? 'border-blue-500/50'
              : 'border-slate-800';

          return (
            <div
              key={entry.category + entry.name}
              className={`p-4 rounded-2xl bg-slate-900/60 border ${rarityBorder} shadow-lg hover:border-amber-500/70 transition-all flex flex-col justify-between group`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                      {entry.category}
                    </span>
                    <h3 className="text-base font-heading font-bold text-white group-hover:text-amber-300 transition-colors">
                      {entry.name}
                    </h3>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      entry.rarity === 'Legendary'
                        ? 'rarity-legendary font-bold'
                        : entry.rarity === 'Rare'
                        ? 'rarity-rare'
                        : entry.rarity === 'Uncommon'
                        ? 'rarity-uncommon'
                        : 'rarity-common'
                    }`}
                  >
                    {entry.rarity}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                  {entry.desc}
                </p>

                {/* Affected By / Tags (for weapons) */}
                {entry.affectedBy && entry.affectedBy.length > 0 && (
                  <div className="mb-3">
                    <span className="text-[10px] font-mono text-slate-400 block mb-1">
                      Affected by Stats:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {entry.affectedBy.map((aff) => (
                        <span
                          key={aff}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                        >
                          {aff}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Unlock Requirement */}
                {entry.unlockDesc && (
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] font-mono mb-3">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-0.5">
                      <HelpCircle className="w-3 h-3 text-amber-400" />
                      <span>Unlock Requirement:</span>
                    </div>
                    <div className="text-slate-300">{entry.unlockDesc}</div>
                    {entry.silverCost && entry.silverCost !== 'N/A' && entry.silverCost !== 'Unlocked by Default' && (
                      <div className="text-amber-400 mt-1 flex items-center gap-1">
                        <Coins className="w-3 h-3" /> Cost: {entry.silverCost} Silver
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSendToAdvisor(entry)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" /> Test in Advisor
                </button>

                <button
                  onClick={() => onEquipItem(entry)}
                  className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Equip
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
