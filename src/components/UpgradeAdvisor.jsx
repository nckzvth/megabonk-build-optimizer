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
    <div className="space-y-12 max-w-6xl mx-auto py-4">
      {/* 1. RUN SETUP RIBBON (BORDERLESS, TYPOGRAPHIC) */}
      <div className="pb-8 border-b border-white/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-8">
        {/* Hero Character */}
        <div className="space-y-1.5 md:w-1/3">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-zinc-500">
            <span>Hero Character</span>
            <button
              onClick={() => setShowSyncInfo(!showSyncInfo)}
              className="text-[11px] text-zinc-500 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Info className="w-3 h-3" /> Steam sync?
            </button>
          </div>
          <SearchableSelect
            options={characterOptions}
            value={character}
            onChange={(val) => handleCharacterChange(val)}
            placeholder="Select hero..."
            categoryFilterEnabled={false}
            variant="inline"
          />
          <div className="text-xs text-zinc-400 pt-1 font-sans">
            <span className="text-amber-400 font-medium">Passive:</span> {buildState?.character?.passive}
          </div>
        </div>

        {/* Level Slider */}
        <div className="space-y-2 md:w-1/3">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-zinc-500">
            <span>Level Progression</span>
            <span className="text-amber-400 font-bold font-sans text-sm">Lv. {level}</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={level}
            onChange={(e) => setLevel(parseInt(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer h-1 bg-zinc-800 rounded-full"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
            <button onClick={() => setLevel(1)} className="hover:text-zinc-300 cursor-pointer">1 (Start)</button>
            <button onClick={() => setLevel(25)} className="hover:text-zinc-300 cursor-pointer">25 (Mid)</button>
            <button onClick={() => setLevel(50)} className="hover:text-zinc-300 cursor-pointer">50 (Boss)</button>
            <button onClick={() => setLevel(100)} className="hover:text-zinc-300 cursor-pointer">100 (Endless)</button>
          </div>
        </div>

        {/* Strategic Purpose */}
        <div className="space-y-1.5 md:w-1/4">
          <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block">
            Run Goal
          </label>
          <select
            value={activePurpose}
            onChange={(e) => setPurpose && setPurpose(e.target.value)}
            className="w-full bg-transparent border-b border-zinc-800 hover:border-zinc-500 py-2 text-sm text-amber-300 font-semibold focus:outline-none cursor-pointer transition-colors"
          >
            {objectives.map((obj) => (
              <option key={obj.id} value={obj.id} className="bg-zinc-950 text-zinc-200">
                {obj.label}
              </option>
            ))}
          </select>
          <div className="text-[11px] text-zinc-500 truncate font-sans">
            {objectives.find(o => o.id === activePurpose)?.desc}
          </div>
        </div>
      </div>

      {/* Sync Info Modal Note */}
      {showSyncInfo && (
        <div className="p-4 border-l-2 border-amber-400 bg-amber-400/[0.02] text-xs text-zinc-400 font-sans leading-relaxed">
          *Megabonk* runs locally as a native Steam executable without a browser API. To optimize on the fly, type your 4 level-up rolls into the slots below to get the instantaneous mathematical answer.
        </div>
      )}

      {/* 2. THE LEVEL-UP STAGE: 4 OPEN UPGRADE SLOTS (ZERO CARDS) */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
              Interactive Stage
            </span>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Current Level-Up Offerings
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={rollRandomOffers}
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Dices className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulate Roll</span>
            </button>
            <button
              onClick={() => setShowMathDetails(!showMathDetails)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>{showMathDetails ? 'Hide Proof' : 'Formula Proof'}</span>
            </button>
          </div>
        </div>

        {/* 4 Open Architectural Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-6 border-y border-white/[0.08]">
          {offers.map((offer, idx) => {
            const isWinner = bestChoice && bestChoice.name.toLowerCase() === offer.name.toLowerCase();
            return (
              <div key={offer.id || idx} className="space-y-3 relative flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Slot Number & Winner Tag */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-600 tracking-wider">SLOT 0{idx + 1}</span>
                    {isWinner ? (
                      <span className="text-amber-400 font-sans font-bold text-[11px] uppercase tracking-wider flex items-center gap-1">
                        ★ Best Choice
                      </span>
                    ) : (
                      offers.length > 2 && (
                        <button
                          onClick={() => removeOfferSlot(idx)}
                          className="text-zinc-600 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Remove slot"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )
                    )}
                  </div>

                  {/* Borderless Inline Selector */}
                  <SearchableSelect
                    options={allChoices}
                    value={offer.name}
                    onChange={(newName, optObj) => handleOfferNameChange(idx, newName, optObj)}
                    placeholder="Search upgrade..."
                    categoryFilterEnabled={true}
                    variant="inline"
                  />

                  {/* Rarity & Type */}
                  <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                    <select
                      value={offer.rarity}
                      onChange={(e) => handleOfferRarityChange(idx, e.target.value)}
                      className="bg-transparent text-zinc-400 hover:text-zinc-200 cursor-pointer focus:outline-none text-[11px]"
                    >
                      <option value="Common" className="bg-zinc-950">Common</option>
                      <option value="Uncommon" className="bg-zinc-950">Uncommon</option>
                      <option value="Rare" className="bg-zinc-950">Rare</option>
                      <option value="Legendary" className="bg-zinc-950">Legendary</option>
                    </select>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      {offer.type}
                    </span>
                  </div>
                </div>

                {/* Mathematical Delta Preview */}
                <div className="pt-4">
                  {isWinner ? (
                    <div className="text-emerald-400 font-mono font-bold text-sm">
                      +{bestChoice.dpsGainPct.toFixed(1)}% Net DPS
                    </div>
                  ) : (
                    <div className="text-zinc-600 font-mono text-xs">
                      {rankedOffers.find(r => r.name.toLowerCase() === offer.name.toLowerCase())?.dpsGainPct
                        ? `+${rankedOffers.find(r => r.name.toLowerCase() === offer.name.toLowerCase())?.dpsGainPct.toFixed(1)}% DPS`
                        : '—'}
                    </div>
                  )}

                  {/* Glowing gold baseline indicator for the winning choice */}
                  {isWinner && (
                    <div className="h-0.5 w-full bg-amber-400 shadow-md shadow-amber-400/50 rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. APPLE KEYNOTE HERO CALLOUT (BORDERLESS, TYPOGRAPHIC FOCAL POINT) */}
      {bestChoice && (
        <div className="py-8 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block">
              Optimal Upgrade Decision
            </span>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-4">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
                {bestChoice.name}
              </h1>
              <span className="text-sm font-mono text-zinc-400 uppercase tracking-wider">
                {bestChoice.type} • {bestChoice.rarity}
              </span>
            </div>
            <p className="text-base sm:text-lg text-zinc-400 max-w-3xl font-light leading-relaxed">
              {bestChoice.bracketSaturationNote || 'Provides the highest effective multiplier across uncrowded damage brackets.'}
            </p>
          </div>

          {/* Large Hero Metric Strip (Zero Cards, Clean Numbers) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-6 border-y border-white/[0.08] font-mono">
            <div>
              <div className="text-[11px] text-zinc-500 uppercase tracking-widest">Marginal DPS</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mt-1">
                +{bestChoice.dpsGainPct.toFixed(1)}%
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">+{bestChoice.dpsGain.toFixed(1)} dps</div>
            </div>

            <div>
              <div className="text-[11px] text-zinc-500 uppercase tracking-widest">Survival EHP</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 mt-1">
                +{bestChoice.ehpGainPct.toFixed(1)}%
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">+{bestChoice.ehpGain.toFixed(0)} hp</div>
            </div>

            <div>
              <div className="text-[11px] text-zinc-500 uppercase tracking-widest">Weapons Scaled</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-400 mt-1">
                {bestChoice.affectedWeaponsCount} / {buildState.weapons.length}
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">active arsenal</div>
            </div>

            <div>
              <div className="text-[11px] text-zinc-500 uppercase tracking-widest">Synergy Score</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 mt-1">
                {bestChoice.compositeScore.toFixed(0)}
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">+{runnerUpDiffPct.toFixed(1)}% over #2</div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              onClick={() => onApplyUpgrade(bestChoice)}
              className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-full text-sm transition-all shadow-xl shadow-amber-400/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Equip {bestChoice.name} in Loadout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-zinc-500 font-mono">
              Instantly applies to your live build stats and equips into simulator.
            </span>
          </div>
        </div>
      )}

      {/* 4. SPEC SHEET: COMPARISON RANKING (BORDERLESS LIST) */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500">
          Full Roll Comparison Breakdown
        </h3>

        <div className="divide-y divide-white/[0.06] border-y border-white/[0.08]">
          {rankedOffers.map((offer, idx) => {
            const isBest = idx === 0;
            return (
              <div
                key={offer.name + idx}
                className={`py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                  isBest ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-zinc-600 font-bold">0{idx + 1}</span>
                  <div>
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <span className={isBest ? 'text-amber-400' : 'text-zinc-200'}>{offer.name}</span>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase px-1.5 py-0.5 rounded bg-white/[0.04]">
                        {offer.type}
                      </span>
                      {isBest && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-400 font-bold">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 font-mono text-xs">
                  <span className="text-emerald-400 font-semibold">+{offer.dpsGainPct.toFixed(1)}% DPS</span>
                  <span className="text-cyan-400">+{offer.ehpGainPct.toFixed(1)}% EHP</span>
                  <span className="text-zinc-400">{offer.affectedWeaponsCount} scaled</span>
                  <span className="text-amber-400 font-bold">{offer.compositeScore.toFixed(0)} pts</span>
                  <button
                    onClick={() => onApplyUpgrade(offer)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isBest
                        ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                        : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300'
                    }`}
                  >
                    Equip
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. FORMULA PROOF ACCORDION */}
      {showMathDetails && (
        <div className="py-6 space-y-4 border-t border-white/[0.08] font-mono text-xs">
          <div className="flex items-center justify-between text-zinc-500 uppercase tracking-widest text-[11px]">
            <span>Megabonk 8-Bracket Multiplicative Formulation</span>
          </div>

          <p className="text-zinc-400 leading-relaxed font-sans">
            Megabonk does <strong className="text-white">not</strong> sum damage into a single additive stat pool. Bonuses across brackets multiply:
          </p>

          <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-amber-300 font-bold text-center text-xs overflow-x-auto">
            Final Damage = Base × B1 (Damage Tome) × B2 (Passive) × B3 (Flat) × B4 (Main %) × B5 (Speed) × B6 (AtkSpd) × B7 (Crit) × B8 (AoE/Proj)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-400 text-[11px] pt-2">
            <div>
              <strong className="text-zinc-200 block mb-1">Diminishing Returns:</strong>
              Statically stacking an already heavy bracket yields lower relative gain than distributing bonuses into uncrowded brackets.
            </div>
            <div>
              <strong className="text-zinc-200 block mb-1">Overcrit Probability:</strong>
              Crit chance &gt; 100% guarantees Tier 1 crits and begins rolling for Tier 2 Megacrits.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
