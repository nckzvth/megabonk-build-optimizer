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
  ChevronUp
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
  currentWeapons = [],
  setCurrentWeapons,
  currentTomes = [],
  setCurrentTomes,
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

  const [objective, setObjective] = useState('leaderboard');
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
    return rankOfferedUpgrades(buildState, offers.filter(o => o.name), objective);
  }, [buildState, offers, objective]);

  const { rankedOffers, bestChoice, runnerUpDiffPct, rerollAdvice } = evaluationResult;

  // Handle Character Change: Auto-equip starting weapon if no weapons or new character
  const handleCharacterChange = (newCharName) => {
    setCharacter(newCharName);
    const charObj = characterMap.get(newCharName.toLowerCase());
    if (charObj && charObj.startingWeapon && setCurrentWeapons) {
      // If player has starting weapon of old character or only 1 weapon, update or ensure starting weapon is equipped
      const existing = currentWeapons.find(w => w.name.toLowerCase() === charObj.startingWeapon.toLowerCase());
      if (!existing && currentWeapons.length > 0) {
        // Replace weapon 0 with the starting weapon of new character
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
      particleCount: 40,
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
    { id: 'leaderboard', label: 'Leaderboard God', desc: 'Prioritizes XP, Luck, Curse & Chaos for endless record runs', icon: Trophy },
    { id: 'balanced', label: 'Balanced', desc: 'Maximizes DPS while protecting EHP', icon: Shield },
    { id: 'dps_pure', label: 'Glass Cannon', desc: '100% focused on maximum DPS', icon: Swords },
    { id: 'tank_thorns', label: 'Immortal Tank', desc: 'Prioritizes Armor, Max HP, and Thorns', icon: Shield },
    { id: 'crit_burst', label: 'Overcrit Burst', desc: 'Focuses on Precision & Megacrit scaling', icon: Crosshair },
    { id: 'speed_farming', label: 'Economy Farm', desc: 'Favors Gold & Silver meta farming', icon: Zap },
  ];

  return (
    <div className="space-y-6">
      {/* 1. FIRST OPTION: PROMINENT CHARACTER & RUN LEVEL SELECTOR */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border-2 border-amber-500/60 rounded-2xl p-5 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 font-black text-xl shadow-lg shadow-amber-500/20">
              <User className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Step 1: Current Run Setup
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  SELECT YOUR CHARACTER
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-heading font-black text-white">
                Choose Character & Hero Level
              </h2>
            </div>
          </div>

          {/* Game Sync Info Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSyncInfo(!showSyncInfo)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-all cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>Can this sync with my game?</span>
            </button>
          </div>
        </div>

        {/* Sync Info Banner */}
        {showSyncInfo && (
          <div className="mt-3 p-3.5 rounded-xl bg-slate-950/90 border border-slate-700 text-xs text-slate-300 leading-relaxed font-mono">
            <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
              <AlertCircle className="w-4 h-4" />
              <span>Game Sync Status:</span>
            </div>
            <p>
              *Megabonk* runs locally as a native Steam executable and does not expose a public browser API. For browser security reasons, web apps running on GitHub Pages cannot inspect desktop memory or read running processes.
            </p>
            <p className="mt-1 text-slate-400">
              To make selection instantaneous during gameplay, this searchable dropdown lets you type any character name or upgrade in seconds!
            </p>
          </div>
        )}

        {/* Character & Level Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4">
          {/* Searchable Character Dropdown */}
          <div className="md:col-span-6">
            <label className="text-xs font-mono uppercase text-slate-400 font-bold mb-1.5 block">
              Hero Character:
            </label>
            <SearchableSelect
              options={characterOptions}
              value={character}
              onChange={(val) => handleCharacterChange(val)}
              placeholder="Search or pick a hero (e.g. Fox, CL4NK, Sir Oofie)..."
              categoryFilterEnabled={false}
              size="lg"
            />
          </div>

          {/* Level Slider & Quick Numeric Input */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-mono uppercase text-slate-400 font-bold">
                Run Level:
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Current:</span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={level}
                  onChange={(e) => setLevel(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                  className="w-16 bg-slate-950 border border-slate-700 rounded-lg px-2 py-0.5 text-sm font-bold text-amber-400 font-mono text-center focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={level}
              onChange={(e) => setLevel(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>Lv. 1 (Start)</span>
              <span>Lv. 25 (Mid-game)</span>
              <span>Lv. 50 (Boss)</span>
              <span>Lv. 100 (Endless)</span>
            </div>
          </div>
        </div>

        {/* Hero Passive Preview & Loadout Drawer Toggle */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start sm:items-center gap-2">
            <span className="font-bold text-amber-400 whitespace-nowrap">Passive:</span>
            <span className="text-slate-300 font-medium">{buildState?.character?.passive}</span>
          </div>

          <button
            onClick={() => setShowLoadoutDrawer(!showLoadoutDrawer)}
            className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer shrink-0"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showLoadoutDrawer ? 'Hide Equipped Loadout' : 'View / Edit Equipped Loadout'}</span>
            {showLoadoutDrawer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Quick Loadout Drawer */}
        {showLoadoutDrawer && (
          <div className="mt-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-400 uppercase font-bold block mb-2">Equipped Weapons (Up to 4):</span>
              <div className="flex flex-wrap gap-2">
                {currentWeapons.map((w, idx) => (
                  <span key={w.name + idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">
                    ⚔️ {w.name} <strong className="text-amber-400">Lv.{w.level}</strong>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-bold block mb-2">Equipped Tomes (Up to 4):</span>
              <div className="flex flex-wrap gap-2">
                {currentTomes.map((t, idx) => (
                  <span key={t.name + idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">
                    📖 {t.name} <strong className="text-amber-400">Lv.{t.level}</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. OBJECTIVES & CONTROLS BANNER */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-heading font-bold text-amber-400 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Step 2: Enter Offered Upgrades
            </h3>
            <p className="text-sm text-slate-400 mt-0.5">
              Type or search any upgrade below. The mathematical engine evaluates all 8 damage brackets to find the optimal choice.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={rollRandomOffers}
              className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Dices className="w-4 h-4" />
              Simulate Random Roll
            </button>
            <button
              onClick={() => setShowMathDetails(!showMathDetails)}
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold text-xs transition-all cursor-pointer border border-slate-700"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              {showMathDetails ? 'Hide Math' : 'Explain Math'}
            </button>
          </div>
        </div>

        {/* Build Objective Switcher */}
        <div className="pt-4">
          <label className="text-xs uppercase font-mono text-slate-400 font-semibold mb-2 block">
            Build Objective / Playstyle:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {objectives.map((obj) => {
              const Icon = obj.icon;
              const isSelected = objective === obj.id;
              return (
                <button
                  key={obj.id}
                  onClick={() => setObjective(obj.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <Icon className="w-3.5 h-3.5 text-amber-400" />
                    <span>{obj.label}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{obj.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. SEARCHABLE UPGRADE OFFER SLOTS */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase text-slate-400 font-bold">
            Offered Choices (Slots 1 to {offers.length}) — Click to search by typing:
          </span>
          {offers.length < 4 && (
            <button
              onClick={addOfferSlot}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add 4th Slot
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {offers.map((offer, idx) => {
            const isWinner = bestChoice && bestChoice.name.toLowerCase() === offer.name.toLowerCase();
            return (
              <div
                key={offer.id || idx}
                className={`relative p-4 rounded-xl border transition-all ${
                  isWinner
                    ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Offer Slot #{idx + 1}
                  </span>
                  {offers.length > 2 && (
                    <button
                      onClick={() => removeOfferSlot(idx)}
                      className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* SEARCHABLE DROPDOWN COMPONENT */}
                <div className="space-y-2">
                  <SearchableSelect
                    options={allChoices}
                    value={offer.name}
                    onChange={(newName, optObj) => handleOfferNameChange(idx, newName, optObj)}
                    placeholder="Search weapon, tome, or item..."
                    categoryFilterEnabled={true}
                  />

                  {/* Rarity Selector */}
                  <div className="flex items-center gap-2">
                    <select
                      value={offer.rarity}
                      onChange={(e) => handleOfferRarityChange(idx, e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-slate-300 focus:outline-none cursor-pointer"
                    >
                      <option value="Common">Common</option>
                      <option value="Uncommon">Uncommon</option>
                      <option value="Rare">Rare</option>
                      <option value="Legendary">Legendary</option>
                    </select>

                    <span className="text-[10px] font-mono uppercase px-2 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
                      {offer.type}
                    </span>
                  </div>
                </div>

                {isWinner && (
                  <div className="mt-3 pt-2 border-t border-amber-500/30 flex items-center justify-between text-xs text-amber-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5" /> Recommended
                    </span>
                    <span className="font-mono">+{bestChoice.dpsGainPct.toFixed(1)}% DPS</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. REROLL / SKIP / PICK STRATEGIC ADVISOR */}
      {rerollAdvice && (
        <div
          className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
            rerollAdvice.action === 'PICK'
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
              : rerollAdvice.action === 'REROLL'
              ? 'bg-amber-950/30 border-amber-500/40 text-amber-300'
              : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl ${
                rerollAdvice.action === 'PICK'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : rerollAdvice.action === 'REROLL'
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'bg-rose-500/20 text-rose-400'
              }`}
            >
              {rerollAdvice.action === 'PICK' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-xs tracking-wider uppercase px-2 py-0.5 rounded bg-black/40">
                  {rerollAdvice.action} RECOMMENDATION
                </span>
              </div>
              <p className="text-xs md:text-sm font-medium mt-0.5">{rerollAdvice.message}</p>
            </div>
          </div>

          {bestChoice && (
            <button
              onClick={() => onApplyUpgrade(bestChoice)}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shadow-md shadow-emerald-500/20"
            >
              Equip Best Pick ({bestChoice.name})
            </button>
          )}
        </div>
      )}

      {/* 5. MATHEMATICAL WINNER SPOTLIGHT */}
      {bestChoice && (
        <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border-2 border-amber-500/70 rounded-2xl p-6 shadow-2xl relative overflow-hidden animate-glow-gold">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-1">
                <Trophy className="w-4 h-4 text-amber-400" />
                Rank #1 Mathematically Optimal Pick
              </div>
              <h3 className="text-2xl md:text-3xl font-heading font-black text-white flex items-center gap-3">
                {bestChoice.name}
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {bestChoice.type} • {bestChoice.rarity}
                </span>
              </h3>
              <p className="text-sm text-slate-300 mt-2 max-w-2xl">
                {bestChoice.bracketSaturationNote || 'Provides superior multiplicative value across independent brackets.'}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 font-mono">
              <div className="p-2">
                <div className="text-[10px] text-slate-400 uppercase">DPS Gain</div>
                <div className="text-lg font-bold text-emerald-400">
                  +{bestChoice.dpsGainPct.toFixed(1)}%
                </div>
                <div className="text-[10px] text-slate-500">+{bestChoice.dpsGain.toFixed(1)} dps</div>
              </div>

              <div className="p-2">
                <div className="text-[10px] text-slate-400 uppercase">EHP Gain</div>
                <div className="text-lg font-bold text-cyan-400">
                  +{bestChoice.ehpGainPct.toFixed(1)}%
                </div>
                <div className="text-[10px] text-slate-500">+{bestChoice.ehpGain.toFixed(0)} hp</div>
              </div>

              <div className="p-2">
                <div className="text-[10px] text-slate-400 uppercase">Synergy</div>
                <div className="text-lg font-bold text-purple-400">
                  {bestChoice.affectedWeaponsCount} / {buildState.weapons.length}
                </div>
                <div className="text-[10px] text-slate-500">weapons scaled</div>
              </div>

              <div className="p-2">
                <div className="text-[10px] text-slate-400 uppercase">Composite Score</div>
                <div className="text-lg font-bold text-amber-400">
                  {bestChoice.compositeScore.toFixed(1)}
                </div>
                <div className="text-[10px] text-slate-500">
                  +{runnerUpDiffPct.toFixed(1)} over #2
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. RANKED COMPARISON TABLE */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
        <h3 className="text-base font-heading font-bold text-slate-200 mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          Offered Choices Comparison Ranking
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-mono uppercase text-slate-400">
                <th className="pb-3 px-3">Rank</th>
                <th className="pb-3 px-3">Upgrade</th>
                <th className="pb-3 px-3">Type</th>
                <th className="pb-3 px-3">DPS Gain</th>
                <th className="pb-3 px-3">EHP Gain</th>
                <th className="pb-3 px-3">Weapon Synergy</th>
                <th className="pb-3 px-3">Composite Score</th>
                <th className="pb-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              {rankedOffers.map((offer, idx) => {
                const isBest = idx === 0;
                return (
                  <tr
                    key={offer.name + idx}
                    className={`transition-colors ${
                      isBest ? 'bg-amber-500/5 font-semibold text-amber-300' : 'hover:bg-slate-800/30 text-slate-300'
                    }`}
                  >
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                          isBest
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {idx + 1}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-sans font-bold text-slate-100 flex items-center gap-2">
                      {offer.name}
                      {isBest && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          RECOMMENDED
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-slate-400">{offer.type}</td>
                    <td className="py-3.5 px-3 text-emerald-400">
                      +{offer.dpsGainPct.toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-3 text-cyan-400">
                      +{offer.ehpGainPct.toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-3 text-purple-400">
                      {offer.affectedWeaponsCount} scaled
                    </td>
                    <td className="py-3.5 px-3 font-bold text-amber-400">
                      {offer.compositeScore.toFixed(1)}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => onApplyUpgrade(offer)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isBest
                            ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        Pick
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. EXPLAIN THE MATH ACCORDION */}
      {showMathDetails && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-base font-heading font-bold text-amber-400 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-400" />
              Mathematical Proof & 8-Bracket Formulation
            </h4>
            <span className="text-xs font-mono text-slate-400">Megabonk Game Engine Mechanics</span>
          </div>

          <div className="text-xs text-slate-300 space-y-3 font-mono leading-relaxed">
            <p>
              In Megabonk, damage does <strong className="text-white">NOT</strong> sum together into a single percentage pool.
              Instead, upgrades are grouped into <strong className="text-amber-400">8 independent brackets</strong>.
              Bonuses within the same bracket are additive, but bonuses between different brackets are <strong className="text-emerald-400">purely multiplicative</strong>:
            </p>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 font-bold text-center text-xs overflow-x-auto">
              Final Damage = Base × B1 (Damage Tome) × B2 (Passive) × B3 (Flat Items) × B4 (Main %) × B5 (Speed) × B6 (AtkSpd) × B7 (Crit) × B8 (AoE/Proj)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 font-bold block mb-1">Diminishing Returns Principle:</span>
                Adding +50% into a bracket that already has +150% is only a <strong>+20% effective increase</strong> (2.5x → 3.0x).
                Adding +50% into a new, uninvested bracket provides a full <strong>+50% effective increase</strong> (1.0x → 1.5x)!
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 font-bold block mb-1">Overcrit & Critical Expectation:</span>
                Critical hits scale past 100% via Overcrit tiers. When Crit Chance reaches 140%, attacks guarantee Tier 1 Criticals with a 40% probability of Tier 2 Overcrits.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
