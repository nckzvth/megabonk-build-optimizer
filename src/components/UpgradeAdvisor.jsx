import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Trophy,
  Dices,
  Info,
  Shield,
  Swords,
  Zap,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Plus,
  Calculator,
  Crosshair,
  User,
  Sliders,
  ChevronDown,
  ChevronUp,
  Flame,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { rankOfferedUpgrades } from '../engine/optimizer.js';
import { characters, weapons, tomes, items, characterMap } from '../data/megabonkData.js';
import SearchableSelect from './SearchableSelect.jsx';

export default function UpgradeAdvisor({
  character,
  setCharacter,
  level,
  setLevel,
  purpose = 'leaderboard',
  setPurpose,
  currentWeapons = [],
  setCurrentWeapons,
  currentTomes = [],
  setCurrentTomes,
  currentItems = [],
  setCurrentItems,
  buildState,
  onApplyUpgrade
}) {
  // 3-4 Offered Upgrades
  const [offers, setOffers] = useState([
    { id: 1, name: 'Damage Tome', rarity: 'Common', type: 'tome' },
    { id: 2, name: 'Cooldown Tome', rarity: 'Common', type: 'tome' },
    { id: 3, name: 'Backpack', rarity: 'Uncommon', type: 'item' },
    { id: 4, name: 'Moldy Cheese', rarity: 'Common', type: 'item' },
  ]);

  const activePurpose = purpose || 'leaderboard';
  const [showMathDetails, setShowMathDetails] = useState(false);
  const [showSyncInfo, setShowSyncInfo] = useState(false);
  const [showLoadoutDrawer, setShowLoadoutDrawer] = useState(false);

  // Formatted options for searchable select
  const allChoices = useMemo(() => {
    return [
      ...tomes.map(t => ({
        name: t.name,
        type: 'tome',
        rarity: 'Common',
        tier: t.tier,
        desc: t.ability,
        bracket: t.bracket
      })),
      ...weapons.map(w => ({
        name: w.name,
        type: 'weapon',
        rarity: 'Common',
        tier: w.tier,
        desc: w.description,
        affectedBy: w.affectedBy
      })),
      ...items.map(i => ({
        name: i.name,
        type: 'item',
        rarity: i.rarity || 'Common',
        tier: i.tier,
        desc: i.description
      }))
    ];
  }, []);

  // Character options for searchable character picker
  const characterOptions = useMemo(() => {
    return characters.map(c => ({
      name: c.name,
      type: 'character',
      desc: c.passive,
      startingWeapon: c.startingWeapon
    }));
  }, []);

  // Run mathematical evaluation
  const evaluationResult = useMemo(() => {
    return rankOfferedUpgrades(buildState, offers.filter(o => o.name), activePurpose);
  }, [buildState, offers, activePurpose]);

  const { rankedOffers, bestChoice, runnerUpDiffPct, rerollAdvice } = evaluationResult;

  // Handle Character Change: Auto-equip starting weapon if no weapons or new character
  const handleCharacterChange = (newCharName) => {
    setCharacter(newCharName);
    const charObj = characterMap.get(newCharName.toLowerCase());
    if (charObj && charObj.startingWeapon && setCurrentWeapons) {
      const existing = currentWeapons.find(w => w.name.toLowerCase() === charObj.startingWeapon.toLowerCase());
      if (!existing && currentWeapons.length > 0) {
        const updated = [...currentWeapons];
        updated[0] = { name: charObj.startingWeapon, level: updated[0].level || 1 };
        setCurrentWeapons(updated);
      }
    }
  };

  // Quick Roll Random Offers (simulate a level-up roll)
  const rollRandomOffers = () => {
    const pool = [...allChoices];
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const newOffers = shuffled.slice(0, 4).map((item, idx) => ({
      id: idx + 1,
      name: item.name,
      type: item.type,
      rarity: item.rarity || 'Common'
    }));
    setOffers(newOffers);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  // Update offer name/rarity
  const handleOfferNameChange = (index, newName, optObj) => {
    const updated = [...offers];
    updated[index] = {
      ...updated[index],
      name: newName,
      type: optObj?.type || 'item',
      rarity: optObj?.rarity || updated[index].rarity || 'Common'
    };
    setOffers(updated);
  };

  const handleOfferRarityChange = (index, newRarity) => {
    const updated = [...offers];
    updated[index] = { ...updated[index], rarity: newRarity };
    setOffers(updated);
  };

  const removeOfferSlot = (index) => {
    if (offers.length <= 2) return;
    setOffers(offers.filter((_, i) => i !== index));
  };

  const addOfferSlot = () => {
    if (offers.length >= 4) return;
    setOffers([...offers, { id: Date.now(), name: 'Damage Tome', type: 'tome', rarity: 'Common' }]);
  };

  const objectives = [
    { id: 'leaderboard', label: '👑 Leaderboard God', desc: 'Prioritizes XP, Luck, Curse & Chaos for endless record runs' },
    { id: 'dps_pure', label: '⚔️ Glass Cannon', desc: '100% focused on maximum DPS' },
    { id: 'balanced', label: '🛡️ Balanced', desc: 'Maximizes DPS while protecting EHP' },
    { id: 'tank_thorns', label: '🗿 Immortal Tank', desc: 'Prioritizes Armor, Max HP, and Thorns' },
    { id: 'crit_burst', label: '🎯 Overcrit Burst', desc: 'Focuses on Precision & Megacrit scaling' },
    { id: 'speed_farming', label: '⚡ Economy Farm', desc: 'Favors Gold & Silver meta farming' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 1. APPLE-STYLE UNIFIED RUN CONSOLE */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 backdrop-blur-2xl shadow-xl transition-all">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Hero Picker */}
          <div className="md:col-span-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Hero Character
              </span>
              <button
                onClick={() => setShowSyncInfo(!showSyncInfo)}
                className="text-[11px] text-zinc-500 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Info className="w-3 h-3" /> Sync info
              </button>
            </div>
            <SearchableSelect
              options={characterOptions}
              value={character}
              onChange={(val) => handleCharacterChange(val)}
              placeholder="Select hero..."
              categoryFilterEnabled={false}
              size="lg"
            />
            <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-2">
              <strong className="text-amber-400 font-medium">Passive:</strong> {buildState?.character?.passive}
            </p>
          </div>

          {/* Level Slider */}
          <div className="md:col-span-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Run Level
              </span>
              <span className="font-mono font-bold text-sm text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                Lv. {level}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={level}
              onChange={(e) => setLevel(parseInt(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-1.5 bg-white/[0.08] rounded-full"
            />
            <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
              <button onClick={() => setLevel(1)} className="hover:text-zinc-300 cursor-pointer">1</button>
              <button onClick={() => setLevel(25)} className="hover:text-zinc-300 cursor-pointer">25</button>
              <button onClick={() => setLevel(50)} className="hover:text-zinc-300 cursor-pointer">50</button>
              <button onClick={() => setLevel(100)} className="hover:text-zinc-300 cursor-pointer">100 (Endless)</button>
            </div>
          </div>

          {/* Run Purpose Goal */}
          <div className="md:col-span-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Run Purpose
              </span>
              <span className="text-[11px] font-mono font-semibold text-amber-400">
                Active Goal
              </span>
            </div>
            <select
              value={activePurpose}
              onChange={(e) => setPurpose && setPurpose(e.target.value)}
              className="w-full bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/[0.16] rounded-xl px-3.5 py-2.5 text-xs text-amber-300 font-semibold focus:outline-none cursor-pointer transition-all"
            >
              {objectives.map((obj) => (
                <option key={obj.id} value={obj.id} className="bg-zinc-950 text-zinc-200">
                  {obj.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-zinc-400 leading-relaxed truncate">
              {objectives.find(o => o.id === activePurpose)?.desc}
            </p>
          </div>
        </div>

        {/* Sync Info Note */}
        {showSyncInfo && (
          <div className="mt-4 pt-4 border-t border-white/[0.06] text-xs text-zinc-400 leading-relaxed font-sans">
            <p>
              Megabonk runs as a native desktop executable without a browser bridge. This optimizer lets you type or roll offered upgrades instantly to find the mathematical optimum in seconds.
            </p>
          </div>
        )}

        {/* Collapsible Loadout Disclosure */}
        <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
          <button
            onClick={() => setShowLoadoutDrawer(!showLoadoutDrawer)}
            className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>{showLoadoutDrawer ? 'Hide Equipped Loadout' : `View Equipped Loadout (${currentWeapons.length} Weapons • ${currentTomes.length} Tomes)`}</span>
            {showLoadoutDrawer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <span className="text-zinc-500 font-mono text-[11px]">
            {buildState?.weapons?.length || 0} Weapons active • {buildState?.totalDps?.toFixed(0)} DPS
          </span>
        </div>

        {/* Loadout Chips Drawer */}
        {showLoadoutDrawer && (
          <div className="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-zinc-500 uppercase text-[10px] tracking-wider font-semibold block mb-2">Weapons:</span>
              <div className="flex flex-wrap gap-1.5">
                {currentWeapons.map((w, idx) => (
                  <span key={w.name + idx} className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-zinc-300">
                    ⚔️ {w.name} <strong className="text-amber-400">Lv.{w.level}</strong>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-zinc-500 uppercase text-[10px] tracking-wider font-semibold block mb-2">Tomes:</span>
              <div className="flex flex-wrap gap-1.5">
                {currentTomes.map((t, idx) => (
                  <span key={t.name + idx} className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-zinc-300">
                    📖 {t.name} <strong className="text-amber-400">Lv.{t.level}</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. OFFERED UPGRADES DECK */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Offered Upgrades
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Enter the upgrades presented on your level-up screen to calculate the optimal choice.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={rollRandomOffers}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-zinc-200 text-xs font-medium transition-all cursor-pointer"
            >
              <Dices className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulate Roll</span>
            </button>
            <button
              onClick={() => setShowMathDetails(!showMathDetails)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-zinc-200 text-xs font-medium transition-all cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>{showMathDetails ? 'Hide Proof' : 'Formula Proof'}</span>
            </button>
          </div>
        </div>

        {/* 4 Single-Layer Upgrade Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {offers.map((offer, idx) => {
            const isWinner = bestChoice && bestChoice.name.toLowerCase() === offer.name.toLowerCase();
            return (
              <div
                key={offer.id || idx}
                className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isWinner
                    ? 'bg-amber-500/[0.04] border-amber-400/60 ring-1 ring-amber-400/30 shadow-xl shadow-amber-500/10'
                    : 'bg-white/[0.02] hover:bg-white/[0.04] border-white/[0.07]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                      Slot #{idx + 1}
                    </span>
                    {offers.length > 2 && (
                      <button
                        onClick={() => removeOfferSlot(idx)}
                        className="text-zinc-600 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Remove slot"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Searchable Select */}
                  <div className="space-y-2 mb-3">
                    <SearchableSelect
                      options={allChoices}
                      value={offer.name}
                      onChange={(newName, optObj) => handleOfferNameChange(idx, newName, optObj)}
                      placeholder="Search upgrade..."
                      categoryFilterEnabled={true}
                    />

                    {/* Rarity & Type */}
                    <div className="flex items-center gap-2">
                      <select
                        value={offer.rarity}
                        onChange={(e) => handleOfferRarityChange(idx, e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-2 py-1 text-[11px] text-zinc-300 focus:outline-none cursor-pointer"
                      >
                        <option value="Common" className="bg-zinc-950">Common</option>
                        <option value="Uncommon" className="bg-zinc-950">Uncommon</option>
                        <option value="Rare" className="bg-zinc-950">Rare</option>
                        <option value="Legendary" className="bg-zinc-950">Legendary</option>
                      </select>

                      <span className="text-[10px] font-mono uppercase px-2 py-1 rounded bg-white/[0.04] text-zinc-400 border border-white/[0.06] shrink-0">
                        {offer.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Slot Status / Score */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  {isWinner ? (
                    <span className="text-amber-400 font-semibold text-[11px] flex items-center gap-1">
                      ★ Best Pick
                    </span>
                  ) : (
                    <span className="text-zinc-500 text-[11px]">Option #{idx + 1}</span>
                  )}
                  {bestChoice && isWinner ? (
                    <span className="text-emerald-400 font-mono font-bold text-[11px]">
                      +{bestChoice.dpsGainPct.toFixed(1)}% DPS
                    </span>
                  ) : (
                    <span className="text-zinc-500 font-mono text-[11px]">
                      {rankedOffers.find(r => r.name.toLowerCase() === offer.name.toLowerCase())?.dpsGainPct
                        ? `+${rankedOffers.find(r => r.name.toLowerCase() === offer.name.toLowerCase())?.dpsGainPct.toFixed(1)}%`
                        : '—'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. APPLE KEYNOTE RECOMMENDATION SHOWCASE */}
      {bestChoice && (
        <div className="bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent border border-white/[0.09] rounded-3xl p-6 md:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          {/* Subtle warm glow background */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  ★ Optimal Upgrade
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  +{runnerUpDiffPct.toFixed(1)}% higher than #2
                </span>
              </div>

              <div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  {bestChoice.name}
                </h3>
                <span className="text-xs font-mono uppercase text-zinc-400 block mt-1">
                  {bestChoice.type} • {bestChoice.rarity}
                </span>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                {bestChoice.bracketSaturationNote || 'Provides the highest effective multiplier across uncrowded damage brackets.'}
              </p>
            </div>

            {/* Metrics & Action Column */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end">
              {/* Stat Pillars */}
              <div className="grid grid-cols-4 gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center font-mono">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">DPS</div>
                  <div className="text-base font-bold text-emerald-400">
                    +{bestChoice.dpsGainPct.toFixed(1)}%
                  </div>
                </div>
                <div className="border-l border-white/[0.06]">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">EHP</div>
                  <div className="text-base font-bold text-cyan-400">
                    +{bestChoice.ehpGainPct.toFixed(1)}%
                  </div>
                </div>
                <div className="border-l border-white/[0.06]">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Synergy</div>
                  <div className="text-base font-bold text-purple-400">
                    {bestChoice.affectedWeaponsCount}/{buildState.weapons.length}
                  </div>
                </div>
                <div className="border-l border-white/[0.06]">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Score</div>
                  <div className="text-base font-bold text-amber-400">
                    {bestChoice.compositeScore.toFixed(0)}
                  </div>
                </div>
              </div>

              {/* Big Apple CTA */}
              <button
                onClick={() => onApplyUpgrade(bestChoice)}
                className="w-full sm:w-auto px-8 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-full text-sm transition-all shadow-lg shadow-amber-400/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Equip Upgrade ({bestChoice.name})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. RANKED COMPARISON TABLE */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6">
        <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          Offered Choices Ranking
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-zinc-500 font-mono uppercase text-[11px]">
                <th className="pb-3 px-3">#</th>
                <th className="pb-3 px-3">Upgrade</th>
                <th className="pb-3 px-3">Type</th>
                <th className="pb-3 px-3">DPS Gain</th>
                <th className="pb-3 px-3">EHP Gain</th>
                <th className="pb-3 px-3">Synergy</th>
                <th className="pb-3 px-3">Score</th>
                <th className="pb-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] font-mono">
              {rankedOffers.map((offer, idx) => {
                const isBest = idx === 0;
                return (
                  <tr
                    key={offer.name + idx}
                    className={`transition-colors ${
                      isBest ? 'bg-amber-400/[0.04] text-amber-300 font-medium' : 'text-zinc-300 hover:bg-white/[0.02]'
                    }`}
                  >
                    <td className="py-3 px-3 text-zinc-500 font-bold">{idx + 1}</td>
                    <td className="py-3 px-3 font-sans font-semibold text-white flex items-center gap-2">
                      {offer.name}
                      {isBest && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-400/15 text-amber-400 font-bold">
                          BEST
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-zinc-500 uppercase text-[11px]">{offer.type}</td>
                    <td className="py-3 px-3 text-emerald-400">+{offer.dpsGainPct.toFixed(1)}%</td>
                    <td className="py-3 px-3 text-cyan-400">+{offer.ehpGainPct.toFixed(1)}%</td>
                    <td className="py-3 px-3 text-purple-400">{offer.affectedWeaponsCount} scaled</td>
                    <td className="py-3 px-3 font-bold text-amber-400">{offer.compositeScore.toFixed(1)}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onApplyUpgrade(offer)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          isBest
                            ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                            : 'bg-white/[0.05] hover:bg-white/[0.1] text-zinc-200'
                        }`}
                      >
                        Equip
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. FORMULA PROOF ACCORDION */}
      {showMathDetails && (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2 uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-amber-400" />
              Mathematical Proof & 8-Bracket Formulation
            </h4>
            <span className="text-xs font-mono text-zinc-500">Megabonk Multiplicative Engine</span>
          </div>

          <div className="text-xs text-zinc-300 space-y-3 font-mono leading-relaxed">
            <p>
              In Megabonk, damage does <strong className="text-white">NOT</strong> sum into a single pool. Upgrades are divided into <strong className="text-amber-400">8 independent brackets</strong> that multiply together:
            </p>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-amber-300 font-bold text-center text-xs overflow-x-auto">
              Final Damage = Base × B1 (Damage Tome) × B2 (Passive) × B3 (Flat Items) × B4 (Main %) × B5 (Speed) × B6 (AtkSpd) × B7 (Crit) × B8 (AoE/Proj)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-[11px]">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <strong className="text-white block mb-1">Diminishing Returns:</strong>
                Adding +50% into a saturated bracket provides marginal utility. Adding +50% into a fresh uncrowded bracket yields full multiplicative value.
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <strong className="text-white block mb-1">Overcrit Probability:</strong>
                Crit chance above 100% rolls for Tier 2 Megacrits (e.g., 140% crit = 100% Tier 1 + 40% Tier 2).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
