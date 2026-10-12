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
    { id: 'ALL', label: 'All', count: unifiedDatabase.length },
    { id: 'Character', label: 'Characters', count: characters.length },
    { id: 'Weapon', label: 'Weapons', count: weapons.length },
    { id: 'Tome', label: 'Tomes', count: tomes.length },
    { id: 'Item', label: 'Items', count: items.length },
  ];

  return (
    <div className="max-w-6xl mx-auto py-4 space-y-10">
      {/* 1. TOP EDITORIAL BANNER */}
      <div className="pb-6 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
            Encyclopedia & Compendium
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Megabonk Wiki Database
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-light">
            Verified database across all characters, weapons, tomes, items, scaling tags, and unlock quests.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-zinc-500">Matching:</span>
          <span className="text-amber-400 font-bold">{filteredItems.length} entries</span>
        </div>
      </div>

      {/* 2. FILTER & SEARCH CONTROLS (APPLE SEGMENTED PILLS, NO HORIZONTAL SCROLL) */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="bg-white/[0.04] p-0.5 rounded-full border border-white/[0.08] inline-flex items-center gap-0.5 flex-wrap">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-black/20 text-slate-950 font-bold' : 'bg-white/[0.06] text-zinc-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Rarity */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, stat, quest..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-zinc-700 focus:border-amber-400 pl-8 pr-3 py-1 text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors"
            />
          </div>

          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
            className="bg-transparent border-b border-zinc-700 py-1 text-xs text-zinc-400 focus:outline-none cursor-pointer"
          >
            <option value="ALL" className="bg-zinc-950">All Rarities</option>
            <option value="Common" className="bg-zinc-950">Common</option>
            <option value="Uncommon" className="bg-zinc-950">Uncommon</option>
            <option value="Rare" className="bg-zinc-950">Rare</option>
            <option value="Legendary" className="bg-zinc-950">Legendary</option>
          </select>
        </div>
      </div>

      {/* 3. BORDERLESS PRO CATALOG LEDGER (ZERO CARDS) */}
      <div className="divide-y divide-white/[0.06] border-y border-white/[0.08]">
        {filteredItems.map((entry, idx) => {
          return (
            <div
              key={entry.category + entry.name + idx}
              className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-white/[0.015] transition-colors"
            >
              {/* Identity & Tags */}
              <div className="space-y-1 lg:w-2/5">
                <div className="flex items-center gap-2.5">
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                    entry.category === 'Character' ? 'text-blue-400 bg-blue-400/10' :
                    entry.category === 'Weapon' ? 'text-red-400 bg-red-400/10' :
                    entry.category === 'Tome' ? 'text-amber-400 bg-amber-400/10' :
                    'text-purple-400 bg-purple-400/10'
                  }`}>
                    {entry.category}
                  </span>

                  <h3 className="font-bold text-sm text-white tracking-tight">
                    {entry.name}
                  </h3>

                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                    entry.rarity === 'Legendary' ? 'text-amber-400 bg-amber-400/10' :
                    entry.rarity === 'Rare' ? 'text-purple-400 bg-purple-400/10' :
                    entry.rarity === 'Uncommon' ? 'text-blue-400 bg-blue-400/10' :
                    'text-zinc-500'
                  }`}>
                    {entry.rarity}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  {entry.desc}
                </p>

                {entry.affectedBy && entry.affectedBy.length > 0 && (
                  <p className="text-[11px] font-mono text-amber-400/80">
                    Scales: {entry.affectedBy.join(', ')}
                  </p>
                )}
              </div>

              {/* Unlock Quest & Requirements */}
              <div className="text-xs font-mono text-zinc-400 space-y-1 lg:w-2/5">
                {entry.unlockDesc ? (
                  <div className="flex items-start gap-1.5">
                    <span className="text-zinc-500 shrink-0">Quest:</span>
                    <span className="text-zinc-300 font-sans text-xs">{entry.unlockDesc}</span>
                  </div>
                ) : (
                  <span className="text-zinc-600 italic">Unlocked by default</span>
                )}

                {entry.silverCost && entry.silverCost !== 'N/A' && entry.silverCost !== 'Unlocked by Default' && (
                  <div className="text-amber-400 flex items-center gap-1 text-[11px]">
                    <Coins className="w-3 h-3" /> Cost: {entry.silverCost} Silver
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                <button
                  onClick={() => onSendToAdvisor(entry)}
                  className="px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white text-xs font-medium transition-all cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" /> Test
                </button>

                <button
                  onClick={() => onEquipItem(entry)}
                  className="px-3.5 py-1 rounded-full bg-white/[0.06] hover:bg-white text-zinc-200 hover:text-black text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
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
