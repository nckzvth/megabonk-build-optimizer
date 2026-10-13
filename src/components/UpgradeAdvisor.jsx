import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Dices,
  Info,
  Trash2,
  Plus,
  Calculator,
  ChevronDown,
  ChevronUp,
  Package
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { rankOfferedUpgrades } from '../engine/optimizer.js';
import { characters, weapons, tomes, items } from '../data/megabonkData.js';
import { getCharacterPortrait, getWeaponIcon, getTomeIcon, getItemIcon } from '../data/gameUiIcons.js';
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
  // Advisor Mode: 'level_up' (4 mixed offers, default FIRST) vs 'item_event' (up to 3 items)
  const [advisorMode, setAdvisorMode] = useState('level_up');

  // Item Event Offers (up to 3 event choices)
  const [itemOffers, setItemOffers] = useState([
    { id: 101, name: 'Echo Shard', rarity: 'Rare', type: 'item' },
    { id: 102, name: 'Clover', rarity: 'Uncommon', type: 'item' },
    { id: 103, name: 'Time Bracelet', rarity: 'Legendary', type: 'item' },
  ]);

  // Level-Up Roll Offers (up to 4 mixed slots)
  const [levelUpOffers, setLevelUpOffers] = useState([
    { id: 1, name: 'Damage Tome', rarity: 'Common', type: 'tome' },
    { id: 2, name: 'Cooldown Tome', rarity: 'Common', type: 'tome' },
    { id: 3, name: 'Backpack', rarity: 'Uncommon', type: 'item' },
    { id: 4, name: 'Moldy Cheese', rarity: 'Common', type: 'item' },
  ]);

  const activePurpose = purpose || 'leaderboard';
  const [showMathDetails, setShowMathDetails] = useState(false);
  const [showSyncInfo, setShowSyncInfo] = useState(false);

  // Pure Items pool for Item Event mode (all 78 items)
  const itemChoices = useMemo(() => {
    return items.map(i => ({
      name: i.name,
      type: 'item',
      rarity: i.rarity || 'Common',
      tier: i.tier,
      desc: i.description
    }));
  }, []);

  // Formatted options for standard level-up select (weapons, tomes, items)
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

  const activeOffers = advisorMode === 'item_event' ? itemOffers : levelUpOffers;

  const characterOptions = useMemo(() => {
    return characters.map(c => ({
      name: c.name,
      type: 'character',
      desc: c.passive,
      startingWeapon: c.startingWeapon
    }));
  }, []);

  const evaluationResult = useMemo(() => {
    return rankOfferedUpgrades(buildState, activeOffers.filter(o => o.name), activePurpose);
  }, [buildState, activeOffers, activePurpose]);

  const { rankedOffers, bestChoice, runnerUpDiffPct } = evaluationResult;

  const handleCharacterChange = (newCharName) => {
    setCharacter(newCharName);
  };

  const rollRandomOffers = () => {
    if (advisorMode === 'item_event') {
      const pool = [...itemChoices];
      const shuffled = pool.sort(() => 0.5 - Math.random());
      const newOffers = shuffled.slice(0, 3).map((it, idx) => ({
        id: Date.now() + idx,
        name: it.name,
        type: 'item',
        rarity: it.rarity || 'Common'
      }));
      setItemOffers(newOffers);
    } else {
      const pool = [...allChoices];
      const shuffled = pool.sort(() => 0.5 - Math.random());
      const newOffers = shuffled.slice(0, 4).map((item, idx) => ({
        id: Date.now() + idx,
        name: item.name,
        type: item.type,
        rarity: item.rarity || 'Common'
      }));
      setLevelUpOffers(newOffers);
    }
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleOfferNameChange = (index, newName, optObj) => {
    if (advisorMode === 'item_event') {
      const updated = [...itemOffers];
      updated[index] = {
        ...updated[index],
        name: newName,
        type: 'item',
        rarity: optObj?.rarity || updated[index]?.rarity || 'Common'
      };
      setItemOffers(updated);
    } else {
      const updated = [...levelUpOffers];
      updated[index] = {
        ...updated[index],
        name: newName,
        type: optObj?.type || 'item',
        rarity: optObj?.rarity || updated[index]?.rarity || 'Common'
      };
      setLevelUpOffers(updated);
    }
  };

  const handleOfferRarityChange = (index, newRarity) => {
    if (advisorMode === 'item_event') {
      const updated = [...itemOffers];
      updated[index] = { ...updated[index], rarity: newRarity };
      setItemOffers(updated);
    } else {
      const updated = [...levelUpOffers];
      updated[index] = { ...updated[index], rarity: newRarity };
      setLevelUpOffers(updated);
    }
  };

  const removeOfferSlot = (index) => {
    if (advisorMode === 'item_event') {
      if (itemOffers.length <= 1) return;
      setItemOffers(itemOffers.filter((_, i) => i !== index));
    } else {
      if (levelUpOffers.length <= 2) return;
      setLevelUpOffers(levelUpOffers.filter((_, i) => i !== index));
    }
  };

  const addOfferSlot = () => {
    if (advisorMode === 'item_event') {
      if (itemOffers.length >= 3) return;
      const existingNames = new Set(itemOffers.map(o => o.name?.toLowerCase()));
      const nextChoice = itemChoices.find(c => !existingNames.has(c.name.toLowerCase())) || itemChoices[0];
      setItemOffers([
        ...itemOffers,
        {
          id: Date.now(),
          name: nextChoice.name,
          type: 'item',
          rarity: nextChoice.rarity || 'Common'
        }
      ]);
    } else {
      if (levelUpOffers.length >= 4) return;
      setLevelUpOffers([
        ...levelUpOffers,
        { id: Date.now(), name: 'Damage Tome', type: 'tome', rarity: 'Common' }
      ]);
    }
  };

  const objectives = [
    { id: 'leaderboard', label: '👑 Leaderboard God', desc: 'Prioritizes XP, Luck, Curse & Chaos for endless record runs' },
    { id: 'dps_pure', label: '⚔️ Glass Cannon', desc: '100% focused on maximum DPS' },
    { id: 'balanced', label: '🛡️ Balanced', desc: 'Maximizes DPS while protecting EHP' },
    { id: 'tank_thorns', label: '🗿 Immortal Tank', desc: 'Prioritizes Armor, Max HP, and Thorns' },
    { id: 'crit_burst', label: '🎯 Overcrit Burst', desc: 'Focuses on Precision & Megacrit scaling' },
    { id: 'speed_farming', label: '⚡ Economy Farm', desc: 'Favors Gold & Silver meta farming' },
  ];

  const heroPortrait = getCharacterPortrait(character);
  const starterWeapon = buildState?.character?.startingWeapon || 'Weapon';

  const getOfferIcon = (offer) => {
    if (!offer) return '🎲';
    const t = offer.type?.toLowerCase();
    if (t === 'weapon') return getWeaponIcon(offer.name);
    if (t === 'tome') return getTomeIcon(offer.name);
    return getItemIcon(offer.name);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 1. MEGABONK CHARACTER & RUN INSPECTOR BAR (Matches Screenshot 1 Megachad Header) */}
      <div className="mb-window p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Hero Portrait + Name + Rank Bar (Cols 1-5) */}
          <div className="md:col-span-5 flex items-start gap-3.5">
            <div className="w-16 h-16 mb-slot-blue mb-reticle flex items-center justify-center text-3xl shrink-0">
              {heroPortrait.emoji}
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs uppercase tracking-wider text-[#ffe600] font-bold">
                  ACTIVE CHARACTER
                </span>
                <button
                  onClick={() => setShowSyncInfo(!showSyncInfo)}
                  className="text-xs text-zinc-300 hover:text-[#ffe600] flex items-center gap-1 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" /> Steam sync?
                </button>
              </div>
              <SearchableSelect
                options={characterOptions}
                value={character}
                onChange={(val) => handleCharacterChange(val)}
                placeholder="Select hero..."
                categoryFilterEnabled={false}
              />
              {/* Starter Weapon & Passive Tag (Aura / Flex style) */}
              <div className="flex items-center gap-3 pt-1 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-4 h-4 mb-slot-blue inline-flex items-center justify-center text-[10px]">
                    {getWeaponIcon(starterWeapon)}
                  </span>
                  <span className="text-[#ffe600] font-bold">{starterWeapon}</span>
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-white truncate" title={buildState?.character?.passive}>
                  {buildState?.character?.passive}
                </span>
              </div>
            </div>
          </div>

          {/* Rank / Level Progression Bar with Singular Steppers (Cols 6-9) */}
          <div className="md:col-span-4 space-y-1.5 md:border-x-2 border-[#3c4148] md:px-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-sm bg-slate-300 text-slate-950 font-black text-[10px] flex items-center justify-center border border-black">
                  ❖
                </span>
                <span className="text-white font-bold text-sm">Rank / Level {level}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setLevel(Math.max(1, level - 1))}
                  disabled={level <= 1}
                  className="mb-btn-stone w-6 h-6 flex items-center justify-center disabled:opacity-30"
                  title="Level Down (-1)"
                  aria-label="Level Down (-1)"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <span className="text-[#ffe600] font-bold font-mono text-xs px-1.5">
                  Lv.{level}
                </span>
                <button
                  type="button"
                  onClick={() => setLevel(Math.min(100, level + 1))}
                  disabled={level >= 100}
                  className="mb-btn-stone w-6 h-6 flex items-center justify-center disabled:opacity-30"
                  title="Level Up (+1)"
                  aria-label="Level Up (+1)"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Cyan-Blue XP Progress Bar (Matches 'Rank 38' bar in Screenshot 1) */}
            <input
              type="range"
              min="1"
              max="100"
              value={level}
              onChange={(e) => setLevel(parseInt(e.target.value))}
              className="w-full mb-slider"
            />

            <div className="flex justify-between text-[11px] text-zinc-300 font-mono">
              <button onClick={() => setLevel(1)} className="hover:text-[#ffe600] cursor-pointer">Lv.1</button>
              <button onClick={() => setLevel(25)} className="hover:text-[#ffe600] cursor-pointer">Lv.25</button>
              <button onClick={() => setLevel(50)} className="hover:text-[#ffe600] cursor-pointer">Lv.50</button>
              <button onClick={() => setLevel(100)} className="hover:text-[#ffe600] cursor-pointer">Lv.100</button>
            </div>
          </div>

          {/* Strategic Run Purpose (Cols 10-12) */}
          <div className="md:col-span-3 space-y-1">
            <label className="text-xs uppercase tracking-wider text-[#ffe600] font-bold block">
              RUN PURPOSE / GOAL
            </label>
            <select
              value={activePurpose}
              onChange={(e) => setPurpose && setPurpose(e.target.value)}
              className="w-full mb-input px-2.5 py-1.5 text-sm text-white font-bold focus:outline-none cursor-pointer"
            >
              {objectives.map((obj) => (
                <option key={obj.id} value={obj.id} className="bg-[#1c1e22] text-white">
                  {obj.label}
                </option>
              ))}
            </select>
            <div className="text-xs text-zinc-300 truncate">
              {objectives.find(o => o.id === activePurpose)?.desc}
            </div>
          </div>
        </div>

        {showSyncInfo && (
          <div className="mt-3 pt-3 border-t border-[#454a52] text-xs text-zinc-200">
            <span className="text-[#ffe600] font-bold">NOTE:</span> Megabonk runs locally on Steam without an external live telemetry socket. Select your in-game offerings below for instant 8-bracket calculation.
          </div>
        )}
      </div>

      {/* 2. THE INTERACTIVE ROLL STAGE WINDOW (ZERO LAYOUT SHIFT 4-COLUMN GRID) */}
      <div className="mb-window">
        {/* Authentic Pine-Green Window Title Header */}
        <div className="mb-window-header flex-wrap">
          <div className="flex items-center gap-3">
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
              {advisorMode === 'level_up' ? 'LEVEL-UP PROGRESSION ROLL' : 'ITEM EVENT SELECTION (CHEST / SHRINE)'}
            </h2>
            <span className="text-xs font-mono text-[#ffe600] font-bold">
              [{advisorMode === 'level_up' ? '4 UPGRADE SLOTS' : `${activeOffers.length} OF 3 ITEM CHOICES`}]
            </span>
          </div>

          {/* Mode Switcher + Roll Controls (Level-Up FIRST, Item Event SECOND) */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              type="button"
              onClick={() => setAdvisorMode('level_up')}
              className={`px-3 py-1 text-xs uppercase flex items-center gap-1.5 ${
                advisorMode === 'level_up'
                  ? 'mb-btn-blue mb-reticle text-white'
                  : 'mb-btn-stone text-zinc-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ffe600]" />
              <span>Level-Up Roll</span>
            </button>

            <button
              type="button"
              onClick={() => setAdvisorMode('item_event')}
              className={`px-3 py-1 text-xs uppercase flex items-center gap-1.5 ${
                advisorMode === 'item_event'
                  ? 'mb-btn-blue mb-reticle text-white'
                  : 'mb-btn-stone text-zinc-200'
              }`}
            >
              <Package className="w-3.5 h-3.5 text-[#ffe600]" />
              <span>Item Event (Up to 3)</span>
            </button>

            <button
              type="button"
              onClick={rollRandomOffers}
              className="mb-btn-stone px-3 py-1 text-xs uppercase flex items-center gap-1.5"
            >
              <Dices className="w-3.5 h-3.5 text-[#ffe600]" />
              <span>Simulate Roll</span>
            </button>

            <button
              type="button"
              onClick={() => setShowMathDetails(!showMathDetails)}
              className="mb-btn-stone px-3 py-1 text-xs uppercase flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-[#ffe600]" />
              <span>{showMathDetails ? 'Hide Math' : 'Math Formula'}</span>
            </button>
          </div>
        </div>

        {/* Stable 4-Column Selection Grid (CLS = 0) */}
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {activeOffers.map((offer, idx) => {
            const isWinner = bestChoice && bestChoice.name.toLowerCase() === offer.name.toLowerCase();
            const rankedEntry = rankedOffers.find(r => r.name.toLowerCase() === offer.name.toLowerCase());

            return (
              <div
                key={offer.id || idx}
                className={`p-3.5 flex flex-col justify-between transition-all ${
                  isWinner
                    ? 'bg-[#1e3252]/90 border-2 border-[#ffe600] outline-2 outline-black mb-reticle'
                    : 'bg-[#181b1f] border-2 border-[#8e959e] outline-1 outline-black'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Header Row: Slot Index & Best Choice Badge */}
                  <div className="flex items-center justify-between h-5 text-xs">
                    <span className="font-mono text-zinc-300 font-bold">
                      {advisorMode === 'item_event' ? `CHOICE #${idx + 1}` : `SLOT #${idx + 1}`}
                    </span>
                    {isWinner ? (
                      <span className="text-[#ffe600] font-bold uppercase tracking-wider text-xs">
                        ★ BEST PICK
                      </span>
                    ) : (
                      activeOffers.length > (advisorMode === 'item_event' ? 1 : 2) && (
                        <button
                          onClick={() => removeOfferSlot(idx)}
                          className="text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                          title="Remove slot"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )
                    )}
                  </div>

                  {/* Upgrade Picker */}
                  <SearchableSelect
                    options={advisorMode === 'item_event' ? itemChoices : allChoices}
                    value={offer.name}
                    onChange={(newName, optObj) => handleOfferNameChange(idx, newName, optObj)}
                    placeholder={advisorMode === 'item_event' ? 'Search 78 items...' : 'Search upgrade...'}
                    categoryFilterEnabled={advisorMode !== 'item_event'}
                  />

                  {/* Rarity & Category Row */}
                  <div className="flex items-center justify-between text-xs pt-0.5 h-6">
                    <select
                      value={offer.rarity}
                      onChange={(e) => handleOfferRarityChange(idx, e.target.value)}
                      className="mb-input px-2 py-0.5 text-xs text-white cursor-pointer focus:outline-none"
                    >
                      <option value="Common" className="bg-[#1c1e22]">Common</option>
                      <option value="Uncommon" className="bg-[#1c1e22]">Uncommon</option>
                      <option value="Rare" className="bg-[#1c1e22]">Rare</option>
                      <option value="Legendary" className="bg-[#1c1e22]">Legendary</option>
                    </select>
                    <span className="text-xs font-mono text-[#ffe600] uppercase font-bold">
                      {offer.type}
                    </span>
                  </div>
                </div>

                {/* Bottom Quest-Style Progress Bar & Delta Readout (Fixed Min-Height for Zero CLS) */}
                <div className="pt-3 mt-2 border-t border-[#3b4048] min-h-[54px] flex flex-col justify-end">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className={isWinner ? 'text-[#2ee619] font-bold' : 'text-zinc-200'}>
                      {rankedEntry
                        ? (rankedEntry.dpsGainPct > 0
                            ? `+${rankedEntry.dpsGainPct.toFixed(1)}% DPS`
                            : (rankedEntry.ehpGainPct > 0 ? `+${rankedEntry.ehpGainPct.toFixed(1)}% EHP` : 'Utility'))
                        : '—'}
                    </span>
                    <span className="text-[#ffe600] font-bold">
                      {rankedEntry ? `${rankedEntry.compositeScore.toFixed(0)} pts` : '0 pts'}
                    </span>
                  </div>
                  <div className="mb-progress-track">
                    <div
                      className={isWinner ? 'mb-progress-fill-green' : 'mb-progress-fill-blue'}
                      style={{
                        width: `${Math.min(100, Math.max(8, ((rankedEntry?.compositeScore || 0) / Math.max(1, bestChoice?.compositeScore || 100)) * 100))}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* 4th Column Placeholder in Item Event Mode (Guarantees 0 Horizontal Layout Shift) */}
          {advisorMode === 'item_event' && activeOffers.length < 4 && (
            <div className="hidden lg:flex flex-col justify-center items-center p-4 bg-[#14171b]/80 border-2 border-dashed border-[#5c626b] text-center space-y-2 min-h-[175px]">
              {activeOffers.length < 3 ? (
                <button
                  type="button"
                  onClick={addOfferSlot}
                  className="mb-btn-stone px-4 py-2 text-xs uppercase flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4 text-[#ffe600]" />
                  <span>+ Add 3rd Item Slot</span>
                </button>
              ) : (
                <>
                  <Package className="w-6 h-6 text-[#ffe600]" />
                  <div className="text-xs font-bold text-[#ffe600] uppercase">
                    EVENT CAP: 3 ITEMS
                  </div>
                  <p className="text-xs text-zinc-300 max-w-[180px]">
                    Chests, Bosses, and Shrines offer up to 3 choices in Megabonk.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. SPLIT GAME PANELS: MEGACHAD-STYLE WINNER INSPECTOR (LEFT) + LEADERBOARD TABLE (RIGHT) */}
      {bestChoice && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel (Cols 1-6): Winner Inspector (Matches Megachad Right Panel in Screenshot 1) */}
          <div className="lg:col-span-6 mb-window p-5 space-y-5">
            {/* Top Portrait + Title */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 mb-slot-blue mb-reticle flex items-center justify-center text-3xl shrink-0">
                {getOfferIcon(bestChoice)}
              </div>
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono uppercase px-2 py-0.5 bg-[#2471db] text-white font-bold border border-white">
                    ★ #1 RECOMMENDED PICK
                  </span>
                  <span className="text-xs font-mono text-[#ffe600]">
                    +{runnerUpDiffPct.toFixed(1)}% over #2
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide truncate">
                  {bestChoice.name}
                </h3>
                <div className="text-xs font-mono text-zinc-300 uppercase">
                  {bestChoice.type} • {bestChoice.rarity} • Score: <span className="text-[#ffe600] font-bold">{bestChoice.compositeScore.toFixed(0)} pts</span>
                </div>
              </div>
            </div>

            {/* Flavor / Bracket Explanation */}
            <p className="text-sm text-white leading-relaxed border-y border-[#3d424a] py-3">
              {bestChoice.bracketSaturationNote || 'Provides the highest effective multiplicative gain across your active damage and survival brackets.'}
            </p>

            {/* Aura / Flex Style Stat Breakdown Rows */}
            <div className="space-y-3">
              {/* Offense / DPS Row */}
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 mb-slot-blue flex items-center justify-center text-xl shrink-0">
                  ⚔️
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[#ffe600] font-bold text-sm">Marginal Damage Output</span>
                    <span className="text-[#2ee619] font-mono font-bold text-sm">
                      +{bestChoice.dpsGainPct.toFixed(1)}% DPS (+{bestChoice.dpsGain.toFixed(1)})
                    </span>
                  </div>
                  <p className="text-xs text-zinc-200">
                    Scales {bestChoice.affectedWeaponsCount} of {buildState.weapons.length} equipped weapons in your arsenal.
                  </p>
                </div>
              </div>

              {/* Defense / EHP Row */}
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 mb-slot-red flex items-center justify-center text-xl shrink-0">
                  🛡️
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[#ffe600] font-bold text-sm">Survivability & EHP</span>
                    <span className="text-[#38bdf8] font-mono font-bold text-sm">
                      +{bestChoice.ehpGainPct.toFixed(1)}% EHP (+{bestChoice.ehpGain.toFixed(0)} HP)
                    </span>
                  </div>
                  <p className="text-xs text-zinc-200">
                    Calibrated for {objectives.find(o => o.id === activePurpose)?.label}.
                  </p>
                </div>
              </div>
            </div>

            {/* Authentic Chunky 3D Royal Blue CONFIRM Button (Exact match to Screenshot 1) */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => onApplyUpgrade(bestChoice)}
                className="mb-btn-blue px-10 py-2.5 text-base sm:text-lg uppercase tracking-wider w-full sm:w-auto min-w-[220px]"
              >
                CONFIRM & EQUIP ({bestChoice.name})
              </button>
            </div>
          </div>

          {/* Right Panel (Cols 7-12): Authentic LEADERBOARDS-Style Comparison Window */}
          <div className="lg:col-span-6 mb-window">
            <div className="mb-window-header">
              <h3 className="text-lg font-bold uppercase tracking-wider text-white">
                OFFERINGS LEADERBOARD
              </h3>
              <span className="text-xs font-mono text-[#ffe600] font-bold">
                Goal: {objectives.find(o => o.id === activePurpose)?.label}
              </span>
            </div>

            {/* Table Column Headers (RANK | UPGRADE | DPS / EHP | SCORE) */}
            <div className="grid grid-cols-12 px-4 py-2 bg-[#141619] border-b border-[#3a3f46] text-xs font-bold text-zinc-400 uppercase tracking-wider">
              <div className="col-span-2">RANK</div>
              <div className="col-span-5">UPGRADE</div>
              <div className="col-span-3 text-right">GAIN</div>
              <div className="col-span-2 text-right">SCORE</div>
            </div>

            {/* Alternating Striped Rows (Matches Screenshot 2 LEADERBOARDS) */}
            <div className="divide-y divide-[#2c3036]">
              {rankedOffers.map((offer, idx) => {
                const isBest = idx === 0;
                return (
                  <div
                    key={offer.name + idx}
                    className={`grid grid-cols-12 items-center px-4 py-3 text-sm ${
                      isBest
                        ? 'mb-row-highlight'
                        : idx % 2 === 0
                        ? 'mb-row-odd'
                        : 'mb-row-even'
                    }`}
                  >
                    <div className="col-span-2 font-bold text-white font-mono">
                      #{idx + 1}
                    </div>
                    <div className="col-span-5 flex items-center gap-2 min-w-0 pr-2">
                      <span className="w-6 h-6 mb-slot flex items-center justify-center text-xs shrink-0">
                        {getOfferIcon(offer)}
                      </span>
                      <div className="truncate">
                        <span className={`font-bold ${isBest ? 'text-[#ffe600]' : 'text-white'}`}>
                          {offer.name}
                        </span>
                        <span className="block text-[10px] font-mono text-zinc-400 uppercase">
                          {offer.type} • {offer.affectedWeaponsCount}W scaled
                        </span>
                      </div>
                    </div>
                    <div className="col-span-3 text-right font-mono text-xs">
                      <div className="text-[#2ee619] font-bold">+{offer.dpsGainPct.toFixed(1)}% DPS</div>
                      <div className="text-[#38bdf8]">+{offer.ehpGainPct.toFixed(1)}% EHP</div>
                    </div>
                    <div className="col-span-2 text-right flex flex-col items-end gap-1">
                      <span className="text-[#ffe600] font-bold font-mono">
                        {offer.compositeScore.toFixed(0)}
                      </span>
                      <button
                        onClick={() => onApplyUpgrade(offer)}
                        className="mb-btn-stone px-2 py-0.5 text-[10px] uppercase"
                      >
                        Equip
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4. FORMULA PROOF WINDOW */}
      {showMathDetails && (
        <div className="mb-window">
          <div className="mb-window-header">
            <h3 className="text-base font-bold uppercase tracking-wider text-white">
              MEGABONK 8-BRACKET MULTIPLICATIVE DAMAGE ENGINE
            </h3>
            <span className="text-xs font-mono text-[#ffe600]">VERIFIED FORMULA</span>
          </div>
          <div className="p-4 space-y-3 text-xs">
            <p className="text-white">
              Megabonk multiplies damage across 8 independent brackets rather than adding all percentages into one pool:
            </p>
            <div className="p-3 bg-[#121417] border-2 border-[#6c727a] text-[#ffe600] font-mono font-bold text-center">
              Final Damage = Base × B1 (Damage Tome) × B2 (Passive) × B3 (Flat) × B4 (Main %) × B5 (Speed) × B6 (AtkSpd) × B7 (Crit/Overcrit) × B8 (AoE/Proj)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
