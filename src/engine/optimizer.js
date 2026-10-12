import {
  characters,
  weapons,
  tomes,
  items,
  characterMap,
  weaponMap,
  tomeMap,
  itemMap,
  damageBrackets
} from '../data/megabonkData.js';

/**
 * Calculates current character stats given level, weapons, tomes, and items
 */
export function calculateBuildStats(characterName, level = 1, currentWeapons = [], currentTomes = [], currentItems = []) {
  const char = characterMap.get(characterName.toLowerCase()) || characters[0];
  const stats = { ...char.stats };

  // Apply character passive scaling with level
  const passiveScaling = char.passiveScaling || {};
  if (passiveScaling.luckPerLevel) stats.luck += passiveScaling.luckPerLevel * (level - 1);
  if (passiveScaling.armorPerLevel) stats.armor += passiveScaling.armorPerLevel * (level - 1);
  if (passiveScaling.damagePerLevel) stats.damage += (passiveScaling.damagePerLevel / 100) * (level - 1);
  if (passiveScaling.critChancePerLevel) stats.critChance += passiveScaling.critChancePerLevel * (level - 1);
  if (passiveScaling.thornsPerLevel) stats.thorns += passiveScaling.thornsPerLevel * (level - 1);
  if (passiveScaling.goldGainPerLevel) stats.goldGain += (passiveScaling.goldGainPerLevel / 100) * (level - 1);
  if (passiveScaling.maxHpPerLevel) stats.maxHp += passiveScaling.maxHpPerLevel * (level - 1);
  if (passiveScaling.pickupRangePerLevel) stats.pickupRange += (passiveScaling.pickupRangePerLevel / 100) * (level - 1);
  if (passiveScaling.critDamagePerLevel) stats.critDamage += (passiveScaling.critDamagePerLevel / 100) * (level - 1);
  if (passiveScaling.sizePerLevel) stats.size += (passiveScaling.sizePerLevel / 100) * (level - 1);
  if (passiveScaling.xpGainPerLevel) stats.xpGain += (passiveScaling.xpGainPerLevel / 100) * (level - 1);
  if (passiveScaling.attackSpeedPerLevel) stats.attackSpeed += passiveScaling.attackSpeedPerLevel * (level - 1);
  if (passiveScaling.evasionPerLevel) stats.evasion += passiveScaling.evasionPerLevel * (level - 1);
  if (passiveScaling.lifestealPerLevel) stats.lifesteal += passiveScaling.lifestealPerLevel * (level - 1);

  // Apply Tomes
  let damageTomeLevel = 0;
  let cooldownTomeLevel = 0;
  let precisionTomeLevel = 0;
  let quantityTomeLevel = 0;
  let sizeTomeLevel = 0;
  let durationTomeLevel = 0;

  currentTomes.forEach(t => {
    const tomeObj = typeof t === 'string' ? tomeMap.get(t.toLowerCase()) : tomeMap.get(t.name?.toLowerCase());
    const tLevel = t.level || 5;
    if (!tomeObj) return;

    if (tomeObj.name === 'Damage Tome') {
      damageTomeLevel = tLevel;
    } else if (tomeObj.name === 'Cooldown Tome') {
      cooldownTomeLevel = tLevel;
      stats.attackSpeed += tLevel * 10;
    } else if (tomeObj.name === 'Precision Tome') {
      precisionTomeLevel = tLevel;
      stats.critChance += tLevel * 6;
    } else if (tomeObj.name === 'Quantity Tome') {
      quantityTomeLevel = tLevel;
      stats.projectileCount += Math.floor(tLevel / 2) + 1;
    } else if (tomeObj.name === 'Size Tome') {
      sizeTomeLevel = tLevel;
      stats.size += (tLevel * 12) / 100;
    } else if (tomeObj.name === 'Duration Tome') {
      durationTomeLevel = tLevel;
      stats.duration += (tLevel * 12) / 100;
    } else if (tomeObj.name === 'Agility Tome') {
      stats.movementSpeed += (tLevel * 10) / 100;
    } else if (tomeObj.name === 'Armor Tome') {
      stats.armor += tLevel * 6;
    } else if (tomeObj.name === 'HP Tome') {
      stats.maxHp += tLevel * 25;
    } else if (tomeObj.name === 'Shield Tome') {
      stats.shield += tLevel * 20;
    } else if (tomeObj.name === 'Regen Tome') {
      stats.hpRegen += tLevel * 15;
    } else if (tomeObj.name === 'Bloody Tome') {
      stats.lifesteal += tLevel * 4;
    } else if (tomeObj.name === 'Evasion Tome') {
      stats.evasion += tLevel * 5;
    } else if (tomeObj.name === 'Thorns Tome') {
      stats.thorns += tLevel * 10;
    } else if (tomeObj.name === 'Projectile Tome') {
      stats.projectileSpeed += (tLevel * 15) / 100;
    } else if (tomeObj.name === 'Luck Tome') {
      stats.luck += tLevel * 8;
    } else if (tomeObj.name === 'XP Tome') {
      stats.xpGain += (tLevel * 12) / 100;
    } else if (tomeObj.name === 'Cursed Tome') {
      stats.difficulty = (stats.difficulty || 1.0) + (tLevel * 10) / 100;
    } else if (tomeObj.name === 'Chaos Tome') {
      // Chaos Tome rolls random stat boosts on each level
      stats.damage += (tLevel * 5) / 100;
      stats.attackSpeed += tLevel * 5;
      stats.critChance += tLevel * 3;
      stats.size += (tLevel * 5) / 100;
      stats.duration += (tLevel * 5) / 100;
      stats.maxHp += tLevel * 10;
      stats.armor += tLevel * 2;
      stats.movementSpeed += (tLevel * 4) / 100;
      stats.luck += tLevel * 4;
    }
  });

  // Flat & Percentage items accumulation
  let flatDamagePct = 0;
  let mainDamagePct = 0;
  let hasMegacrit = false;
  let hasMegabonk = false;

  currentItems.forEach(it => {
    const itemObj = typeof it === 'string' ? itemMap.get(it.toLowerCase()) : itemMap.get(it.name?.toLowerCase());
    const count = it.count || 1;
    if (!itemObj) return;

    const eff = itemObj.effects || {};
    if (eff.damagePct) {
      if (itemObj.bracket === 3) flatDamagePct += eff.damagePct * count;
      else mainDamagePct += eff.damagePct * count;
    }
    if (eff.maxHp) stats.maxHp += eff.maxHp * count;
    if (eff.maxHpPct) stats.maxHp *= (1 + (eff.maxHpPct * count) / 100);
    if (eff.hpRegen) stats.hpRegen += eff.hpRegen * count;
    if (eff.armor) stats.armor += eff.armor * count;
    if (eff.evasion) stats.evasion += eff.evasion * count;
    if (eff.lifesteal) stats.lifesteal += eff.lifesteal * count;
    if (eff.movementSpeed) stats.movementSpeed += (eff.movementSpeed * count) / 100;
    if (eff.attackSpeed) stats.attackSpeed += eff.attackSpeed * count;
    if (eff.critChance) stats.critChance += eff.critChance * count;
    if (eff.critDamagePct) stats.critDamage += (eff.critDamagePct * count) / 100;
    if (eff.projectileCount) stats.projectileCount += eff.projectileCount * count;
    if (eff.luck) stats.luck += eff.luck * count;
    if (eff.xpGain) stats.xpGain += (eff.xpGain * count) / 100;
    if (eff.damageToElites) stats.damageToElites += (eff.damageToElites * count) / 100;
    if (eff.thornsPerArmor) stats.thorns += stats.armor * eff.thornsPerArmor * count;
    if (eff.damagePer100Hp) mainDamagePct += (stats.maxHp / 100) * eff.damagePer100Hp * count;

    if (eff.megacrit) hasMegacrit = true;
    if (eff.megabonkProc) {
      hasMegabonk = true;
      mainDamagePct += eff.damagePct * count;
    }
  });

  // Calculate 8 Damage Brackets
  // Bracket 1: Damage Tome Universal
  const b1 = 1 + (damageTomeLevel * 0.12);

  // Bracket 2: Passive Character Multiplier
  let b2 = stats.damage;
  if (char.name === 'Calcium') {
    b2 += (stats.movementSpeed - 1.0) * 0.5;
  } else if (char.name === 'Megachad') {
    b2 += 0.25; // 25% avg uptime boost on Flex
  }

  // Bracket 3: Flat / Additive Items (Gym Sauce, Brass Knuckles, etc.)
  const b3 = 1 + (flatDamagePct / 100);

  // Bracket 4: Main Damage % Items (Tactical Glasses, Beer, Boss Buster, etc.)
  const b4 = 1 + (mainDamagePct / 100);

  // Bracket 5: Speed / Conditional Scaling
  const b5 = 1.0;

  // Bracket 6: Attack Speed / Fire Rate
  const b6 = Math.max(0.2, stats.attackSpeed / 100);

  // Bracket 7: Critical Hit & Overcrit
  const critRate = Math.max(0, stats.critChance / 100);
  const critMult = Math.max(1.0, stats.critDamage + (hasMegacrit ? 0.75 : 0));
  let b7 = 1.0;
  if (critRate <= 1.0) {
    b7 = 1 + critRate * (critMult - 1);
  } else {
    // Overcrit tier: guarantees crit and rolls secondary crit tier
    b7 = critMult + (critRate - 1.0) * (Math.pow(critMult, 1.5) - critMult);
  }

  // Calculate DPS for active weapons
  const resolvedWeapons = currentWeapons.map(w => {
    const wName = typeof w === 'string' ? w : w.name;
    const wObj = weaponMap.get(wName.toLowerCase()) || weapons[0];
    const wLevel = w.level || 5;

    // Check which stats affect this weapon
    const affected = new Set(wObj.affectedBy.map(a => a.toLowerCase().trim()));

    // Bracket 8: Projectiles & Area coverage specific to this weapon
    let b8 = 1.0;
    if (affected.has('projectile count')) {
      const extraProj = Math.max(0, stats.projectileCount - 1);
      b8 *= (1 + extraProj * 0.75);
    }
    if (affected.has('size')) {
      b8 *= (1 + (stats.size - 1.0) * 0.55);
    }
    if (affected.has('duration')) {
      b8 *= (1 + (stats.duration - 1.0) * 0.45);
    }

    // Weapon specific base DPS
    const levelMult = 1 + (wLevel - 1) * 0.15;
    const baseWeaponDps = (wObj.baseDamage * levelMult) / wObj.baseCooldown;

    // Multiply brackets
    const dps = baseWeaponDps * b1 * b2 * b3 * b4 * b5 * b6 * b7 * b8;

    return {
      name: wObj.name,
      level: wLevel,
      category: wObj.category,
      baseDps: baseWeaponDps,
      dps,
      b8,
      affectedBy: wObj.affectedBy
    };
  });

  const totalDps = resolvedWeapons.reduce((sum, w) => sum + w.dps, 0) || 50;

  // Survivability & Effective Health Pool (EHP)
  const armorDmgReduction = Math.min(0.85, Math.max(0, stats.armor / 100));
  const evasionAvoidance = Math.min(0.75, Math.max(0, stats.evasion / 100));
  const ehp = (stats.maxHp + stats.shield) / ((1 - armorDmgReduction) * (1 - evasionAvoidance));

  // Sustain per second (Regen / 60s + Lifesteal hits/sec)
  const hitsPerSec = resolvedWeapons.length * 2.5 * b6;
  const lifestealHeal = hitsPerSec * (Math.min(1.0, stats.lifesteal / 100) * 1.0);
  const sustainPerSec = (stats.hpRegen / 60) + lifestealHeal;
  const survivalScore = ehp * (1 + 0.04 * sustainPerSec);

  return {
    character: char,
    level,
    stats,
    brackets: {
      b1_damageTome: b1,
      b2_passive: b2,
      b3_flatItems: b3,
      b4_mainDamage: b4,
      b5_conditional: b5,
      b6_attackSpeed: b6,
      b7_crit: b7
    },
    damageMultiplier: b1 * b2 * b3 * b4 * b5 * b6 * b7,
    weapons: resolvedWeapons,
    totalDps,
    ehp,
    sustainPerSec,
    survivalScore,
    currentWeapons,
    currentTomes,
    currentItems,
    tomes: currentTomes,
    items: currentItems,
    tomesSummary: {
      damageTomeLevel,
      cooldownTomeLevel,
      precisionTomeLevel,
      quantityTomeLevel,
      sizeTomeLevel,
      durationTomeLevel
    }
  };
}

/**
 * Calculates marginal utility of an offered upgrade against the current build
 */
export function evaluateOfferedUpgrade(currentBuildState, offer, objective = 'balanced') {
  const {
    character,
    level,
    currentWeapons = [],
    currentTomes = [],
    currentItems = []
  } = currentBuildState;

  // Determine what type of offer it is:
  // Can be weapon, tome, item, or stat boost
  const offerName = offer.name || offer;
  const offerType = offer.type || detectOfferType(offerName);
  const offerRarity = offer.rarity || 'Common';

  // Clone current build to simulate hypothetical next state
  const nextWeapons = currentWeapons.map(w => ({ name: typeof w === 'string' ? w : w.name, level: w.level || 1 }));
  const nextTomes = currentTomes.map(t => ({ name: typeof t === 'string' ? t : t.name, level: t.level || 1 }));
  const nextItems = currentItems.map(i => ({ name: typeof i === 'string' ? i : i.name, count: i.count || 1 }));

  let upgradeCategory = 'Item';
  let bracketModified = null;
  let affectedWeaponsCount = 0;

  if (offerType === 'weapon') {
    upgradeCategory = 'Weapon';
    const existing = nextWeapons.find(w => w.name.toLowerCase() === offerName.toLowerCase());
    if (existing) {
      existing.level += 1;
    } else if (nextWeapons.length < 4) {
      nextWeapons.push({ name: offerName, level: 1 });
    } else {
      // Slots full (4/4): simulate replacing the lowest-level equipped weapon
      let minIdx = 0;
      for (let i = 1; i < nextWeapons.length; i++) {
        if (nextWeapons[i].level < nextWeapons[minIdx].level) {
          minIdx = i;
        }
      }
      nextWeapons[minIdx] = { name: offerName, level: 1 };
    }
  } else if (offerType === 'tome') {
    upgradeCategory = 'Tome';
    const existing = nextTomes.find(t => t.name.toLowerCase() === offerName.toLowerCase());
    if (existing) {
      existing.level += 1;
    } else if (nextTomes.length < 4) {
      nextTomes.push({ name: offerName, level: 1 });
    } else {
      // Slots full (4/4): simulate replacing the lowest-level equipped tome
      let minIdx = 0;
      for (let i = 1; i < nextTomes.length; i++) {
        if (nextTomes[i].level < nextTomes[minIdx].level) {
          minIdx = i;
        }
      }
      nextTomes[minIdx] = { name: offerName, level: 1 };
    }
    const tObj = tomeMap.get(offerName.toLowerCase());
    if (tObj) bracketModified = tObj.bracket;
  } else {
    upgradeCategory = 'Item';
    const existing = nextItems.find(i => i.name.toLowerCase() === offerName.toLowerCase());
    if (existing) {
      existing.count += 1;
    } else {
      nextItems.push({ name: offerName, count: 1 });
    }
    const iObj = itemMap.get(offerName.toLowerCase());
    if (iObj) bracketModified = iObj.bracket;
  }

  // Calculate new stats
  const nextState = calculateBuildStats(character.name, level, nextWeapons, nextTomes, nextItems);

  // Compute gains
  const dpsGain = nextState.totalDps - currentBuildState.totalDps;
  const dpsGainPct = (dpsGain / Math.max(1, currentBuildState.totalDps)) * 100;

  const ehpGain = nextState.ehp - currentBuildState.ehp;
  const ehpGainPct = (ehpGain / Math.max(1, currentBuildState.ehp)) * 100;

  // Compute synergy score
  const wObjList = currentBuildState.weapons;
  const offerLower = offerName.toLowerCase();
  let synergyHits = 0;

  wObjList.forEach(w => {
    const tags = (w.affectedBy || []).map(t => t.toLowerCase());
    if (offerLower.includes('size') && tags.includes('size')) synergyHits++;
    if (offerLower.includes('quantity') && tags.includes('projectile count')) synergyHits++;
    if (offerLower.includes('duration') && tags.includes('duration')) synergyHits++;
    if (offerLower.includes('precision') && (tags.includes('crit chance') || tags.includes('crit damage'))) synergyHits++;
    if (offerLower.includes('cooldown') && tags.includes('projectile speed')) synergyHits++;
    if (offerLower.includes('damage') && tags.includes('damage')) synergyHits++;
  });
  affectedWeaponsCount = synergyHits;

  // Diminishing returns penalty analysis
  let bracketSaturationNote = '';
  if (bracketModified === 1 && currentBuildState.brackets.b1_damageTome > 2.0) {
    bracketSaturationNote = 'Damage Tome bracket is already heavily invested; lower marginal gain.';
  } else if (bracketModified === 3 && currentBuildState.brackets.b3_flatItems > 1.8) {
    bracketSaturationNote = 'Flat damage item bracket is crowded; branching to other brackets is superior.';
  } else if (bracketModified && bracketModified > 0) {
    bracketSaturationNote = `Boosts independent Bracket #${bracketModified} multiplicatively.`;
  }

  // Calculate composite score based on objective
  let compositeScore = 0;
  if (objective === 'leaderboard') {
    // Definitive Leaderboard Quad Meta: XP + Luck + Cursed + Chaos
    let quadBonus = 0;
    if (offerLower.includes('chaos tome') || offerLower === 'chaos tome') quadBonus += 45;
    else if (offerLower.includes('xp tome') || offerLower === 'xp tome') quadBonus += 42;
    else if (offerLower.includes('luck tome') || offerLower === 'luck tome') quadBonus += 40;
    else if (offerLower.includes('cursed tome') || offerLower === 'cursed tome') quadBonus += 38;
    
    // Key high-tier leaderboard items
    const lbItems = ['echo shard', 'time bracelet', 'clover', 'overpowered lamp', 'big bonk', 'giant fork', 'skuleg', 'cursed grabbies'];
    if (lbItems.includes(offerLower)) quadBonus += 25;

    compositeScore = dpsGainPct * 0.35 + ehpGainPct * 0.20 + (affectedWeaponsCount * 2.5) + quadBonus;
  } else if (objective === 'dps_pure') {
    compositeScore = dpsGainPct * 0.85 + (affectedWeaponsCount * 3.5);
  } else if (objective === 'tank_thorns') {
    compositeScore = ehpGainPct * 0.70 + dpsGainPct * 0.20 + (affectedWeaponsCount * 2);
  } else if (objective === 'speed_farming') {
    const econBonus = (offerLower.includes('xp') || offerLower.includes('luck') || offerLower.includes('curse') || offerLower.includes('chaos') || offerLower.includes('gold')) ? 25 : 0;
    compositeScore = dpsGainPct * 0.40 + ehpGainPct * 0.20 + econBonus;
  } else if (objective === 'crit_burst') {
    const critBonus = (offerLower.includes('precision') || offerLower.includes('juice') || offerLower.includes('fork') || offerLower.includes('glasses')) ? 20 : 0;
    compositeScore = dpsGainPct * 0.65 + critBonus + (affectedWeaponsCount * 2.5);
  } else {
    // Balanced (Recommended)
    compositeScore = dpsGainPct * 0.55 + ehpGainPct * 0.30 + (affectedWeaponsCount * 3);
  }

  return {
    name: offerName,
    type: upgradeCategory,
    rarity: offerRarity,
    dpsGain,
    dpsGainPct,
    ehpGain,
    ehpGainPct,
    affectedWeaponsCount,
    bracketModified,
    bracketSaturationNote,
    compositeScore: Math.max(0, compositeScore),
    nextTotalDps: nextState.totalDps,
    nextEhp: nextState.ehp
  };
}

/**
 * Detects whether a string is a weapon, tome, or item
 */
export function detectOfferType(name) {
  const lower = name.toLowerCase();
  if (weaponMap.has(lower)) return 'weapon';
  if (tomeMap.has(lower)) return 'tome';
  if (itemMap.has(lower)) return 'item';
  return 'item';
}

/**
 * Evaluates multiple offers and provides complete ranking + reroll EV advice
 */
export function rankOfferedUpgrades(currentBuildState, offers = [], objective = 'balanced') {
  if (!offers || offers.length === 0) return { rankedOffers: [], bestChoice: null, rerollAdvice: null };

  const evaluations = offers.map(o => evaluateOfferedUpgrade(currentBuildState, o, objective));
  evaluations.sort((a, b) => b.compositeScore - a.compositeScore);

  const best = evaluations[0];
  const second = evaluations[1];

  // Reroll / Skip / Banish expected value calculation
  // Baseline average upgrade offer provides ~7-10% composite utility
  const rerollExpectedValue = 9.2;
  const shouldReroll = best && best.compositeScore < 5.0;
  const shouldSkip = best && best.compositeScore <= 1.0;

  let rerollAdvice = {
    action: 'PICK',
    message: `Pick ${best?.name}: provides the strongest mathematical scaling (+${best?.dpsGainPct.toFixed(1)}% DPS, +${best?.ehpGainPct.toFixed(1)}% EHP).`
  };

  if (shouldSkip) {
    rerollAdvice = {
      action: 'SKIP',
      message: 'All offered upgrades provide negligible mathematical benefit (<1%). Consider using Skip to preserve slot efficiency.'
    };
  } else if (shouldReroll) {
    rerollAdvice = {
      action: 'REROLL',
      message: `Weak offer pool (Best score: ${best.compositeScore.toFixed(1)} vs EV: ${rerollExpectedValue.toFixed(1)}). Mathematically favored to REROLL if you have rolls remaining!`
    };
  }

  return {
    rankedOffers: evaluations,
    bestChoice: best,
    runnerUpDiffPct: second ? (best.compositeScore - second.compositeScore) : 0,
    rerollAdvice
  };
}

/**
 * Calculates pure abstract stat priorities (unmixed with items/tomes)
 * Evaluates how valuable adding raw stats is to the active build based on Purpose.
 */
/**
 * Calculates pure abstract stat priorities (unbundled and completely separate).
 * Evaluates raw stats across:
 * 1. Weapon Upgrade Stats (specifically what to pick when upgrading weapons)
 * 2. Shrine Blessings (specifically what to pick when visiting Shrines)
 * 3. Master List of all 21 individual stats (unbundled: Max HP and Shield are separate, XP, Luck, and Curse are separate, etc.)
 */
export function calculateDetailedStatPriorities(currentBuildState, purpose = 'leaderboard') {
  const { character = {}, level = 1, currentWeapons = [], currentTomes = [], currentItems = [] } = currentBuildState;
  const baseDps = Math.max(1, currentBuildState.totalDps || 50);
  const baseEhp = Math.max(1, currentBuildState.ehp || 100);
  const activeWeapons = currentBuildState.weapons || [];

  // Master definition of all 21 DISCRETE, UNBUNDLED stats in Megabonk
  const discreteStats = [
    // 1. OFFENSIVE STATS (Weapon Upgrades & Shrines)
    {
      id: 'damage',
      name: 'Damage %',
      inGameLabel: '+15% Damage',
      category: 'Offense',
      icon: '🔥',
      isWeaponUpgrade: true,
      isShrine: true,
      shrineName: 'Shrine of Power',
      apply: (st) => ({ ...st, damage: st.damage + 0.15 }),
      desc: 'Universal multiplicative damage increase applying across all attacks.',
      shrineAdvice: 'Direct bracket multiplier across all active damage sources.'
    },
    {
      id: 'attack_speed',
      name: 'Attack Speed',
      inGameLabel: '+15% Attack Speed',
      category: 'Offense',
      icon: '⚡',
      isWeaponUpgrade: true,
      isShrine: true,
      shrineName: 'Shrine of Swiftness',
      apply: (st) => ({ ...st, attackSpeed: st.attackSpeed + 15 }),
      desc: 'Increases weapon attack rate and reduces recovery cooldowns across all weapons.',
      shrineAdvice: 'Greatly increases proc frequency and hit rate on every equipped weapon.'
    },
    {
      id: 'projectile_count',
      name: 'Projectile Count',
      inGameLabel: '+1 Projectile',
      category: 'Offense',
      icon: '🎯',
      isWeaponUpgrade: true,
      isShrine: false,
      apply: (st) => ({ ...st, projectileCount: st.projectileCount + 1 }),
      desc: 'Adds extra projectiles or swings to projectile-compatible weapons.',
      weaponTag: 'Projectile Count'
    },
    {
      id: 'crit_chance',
      name: 'Critical Strike Chance',
      inGameLabel: '+10% Crit Chance',
      category: 'Offense',
      icon: '💥',
      isWeaponUpgrade: true,
      isShrine: true,
      shrineName: 'Shrine of Precision',
      apply: (st) => ({ ...st, critChance: st.critChance + 10 }),
      desc: 'Increases chance to land critical strikes, scaling past 100% into Overcrits.',
      shrineAdvice: 'Scales damage output exponentially, especially when pushing into Overcrit.'
    },
    {
      id: 'crit_damage',
      name: 'Critical Strike Multiplier',
      inGameLabel: '+35% Crit Damage',
      category: 'Offense',
      icon: '⚔️',
      isWeaponUpgrade: true,
      isShrine: true,
      shrineName: 'Shrine of Destruction',
      apply: (st) => ({ ...st, critDamage: st.critDamage + 0.35 }),
      desc: 'Increases the damage multiplier when critical strikes and Overcrits land.',
      shrineAdvice: 'Amplifies all crits; best when Crit Chance is already high.'
    },
    {
      id: 'aoe_size',
      name: 'Area of Effect',
      inGameLabel: '+18% Size / AoE',
      category: 'Offense',
      icon: '⭕',
      isWeaponUpgrade: true,
      isShrine: true,
      shrineName: 'Shrine of Scope',
      apply: (st) => ({ ...st, size: st.size + 0.18 }),
      desc: 'Expands weapon hitboxes, explosion radii, and aura coverage.',
      weaponTag: 'Size',
      shrineAdvice: 'Clears swarms easier by expanding weapon coverage and blast radius.'
    },
    {
      id: 'cooldown_reduction',
      name: 'Cooldown Reduction',
      inGameLabel: '-10% Cooldown',
      category: 'Offense',
      icon: '⏳',
      isWeaponUpgrade: true,
      isShrine: true,
      shrineName: 'Shrine of Haste',
      apply: (st) => ({ ...st, attackSpeed: st.attackSpeed + 12 }),
      desc: 'Reduces weapon recovery cooldowns, triggering attacks more frequently.',
      shrineAdvice: 'Triggers weapon attacks and abilities with reduced delay.'
    },
    {
      id: 'duration',
      name: 'Attack Duration',
      inGameLabel: '+20% Duration',
      category: 'Offense',
      icon: '⏱️',
      isWeaponUpgrade: true,
      isShrine: false,
      apply: (st) => ({ ...st, duration: st.duration + 0.20 }),
      desc: 'Extends ground hazard zones, auras, and lingering weapon uptime.',
      weaponTag: 'Duration'
    },
    {
      id: 'projectile_speed',
      name: 'Projectile Speed',
      inGameLabel: '+15% Projectile Speed',
      category: 'Offense',
      icon: '🚀',
      isWeaponUpgrade: true,
      isShrine: false,
      apply: (st) => ({ ...st, projectileSpeed: (st.projectileSpeed || 1.0) + 0.15 }),
      desc: 'Increases missile travel velocity and orbit revolution speed.',
      weaponTag: 'Projectile Speed'
    },

    // 2. DEFENSIVE STATS (Separate Max HP, Separate Shield, Separate Armor)
    {
      id: 'max_hp',
      name: 'Max HP',
      inGameLabel: '+40 Max HP',
      category: 'Defense',
      icon: '❤️',
      isWeaponUpgrade: false,
      isShrine: true,
      shrineName: 'Shrine of Vitality',
      apply: (st) => ({ ...st, maxHp: st.maxHp + 40 }),
      desc: 'Increases base hitpoint pool buffer to withstand heavy boss hits.',
      shrineAdvice: 'Essential base survival buffer to prevent instant lethal burst.'
    },
    {
      id: 'shield',
      name: 'Shield',
      inGameLabel: '+30 Shield',
      category: 'Defense',
      icon: '🛡️',
      isWeaponUpgrade: false,
      isShrine: true,
      shrineName: 'Shrine of Warding',
      apply: (st) => ({ ...st, shield: (st.shield || 0) + 30 }),
      desc: 'Replenishing energy shield absorbing damage before health is touched.',
      shrineAdvice: 'Provides self-recharging hitpoint buffer against chip damage.'
    },
    {
      id: 'armor',
      name: 'Armor',
      inGameLabel: '+8 Armor',
      category: 'Defense',
      icon: '🥋',
      isWeaponUpgrade: false,
      isShrine: true,
      shrineName: 'Shrine of Iron',
      apply: (st) => ({ ...st, armor: st.armor + 8 }),
      desc: 'Flat damage reduction percentage that increases Effective HP hyperbolically.',
      shrineAdvice: 'Massively increases EHP; each point of armor gives huge survivability.'
    },
    {
      id: 'hp_regen',
      name: 'HP Regeneration',
      inGameLabel: '+15 HP / sec',
      category: 'Defense',
      icon: '💚',
      isWeaponUpgrade: false,
      isShrine: true,
      shrineName: 'Shrine of Renewal',
      apply: (st) => ({ ...st, hpRegen: (st.hpRegen || 0) + 15 }),
      desc: 'Passively restores health continuously every second.',
      shrineAdvice: 'Continuous recovery during frantic kiting without potion drops.'
    },
    {
      id: 'lifesteal',
      name: 'Lifesteal',
      inGameLabel: '+4% Lifesteal',
      category: 'Defense',
      icon: '🩸',
      isWeaponUpgrade: false,
      isShrine: true,
      shrineName: 'Blood Shrine',
      apply: (st) => ({ ...st, lifesteal: (st.lifesteal || 0) + 4 }),
      desc: 'Heals you for a percentage of the total damage dealt to enemies.',
      shrineAdvice: 'Converts high DPS into massive instant health recovery.'
    },
    {
      id: 'thorns',
      name: 'Thorns',
      inGameLabel: '+20 Thorns',
      category: 'Defense',
      icon: '🦔',
      isWeaponUpgrade: false,
      isShrine: true,
      shrineName: 'Shrine of Retribution',
      apply: (st) => ({ ...st, thorns: (st.thorns || 0) + 20 }),
      desc: 'Reflects flat and armor-scaled damage back to attackers when hit.',
      shrineAdvice: 'Turns enemy swarms into self-inflicted damage when building tank.'
    },
    {
      id: 'evasion',
      name: 'Evasion',
      inGameLabel: '+6% Evasion',
      category: 'Defense',
      icon: '💨',
      isWeaponUpgrade: false,
      isShrine: true,
      shrineName: 'Shrine of Shadows',
      apply: (st) => ({ ...st, evasion: (st.evasion || 0) + 6 }),
      desc: 'Grants percentage chance to completely negate incoming hits.',
      shrineAdvice: 'Gives RNG avoidance chance against lethal boss strikes.'
    },

    // 3. LEADERBOARD & ECONOMY STATS (Separate XP, Separate Luck, Separate Curse)
    {
      id: 'xp_gain',
      name: 'XP Gain',
      inGameLabel: '+20% XP Gain',
      category: 'Leaderboard',
      icon: '⭐',
      isWeaponUpgrade: false,
      isShrine: true,
      shrineName: 'Shrine of Wisdom',
      apply: (st) => ({ ...st, xpGain: (st.xpGain || 1.0) + 0.20 }),
      desc: 'Accelerates hero level-up frequency, earning more upgrade rolls faster.',
      shrineAdvice: 'God tier for leaderboard runs: speeds up levels so you scale before boss timers.'
    },
    {
      id: 'luck',
      name: 'Luck',
      inGameLabel: '+15 Luck',
      category: 'Leaderboard',
      icon: '🍀',
      isWeaponUpgrade: false,
      isShrine: true,
      shrineName: 'Shrine of Fortune',
      apply: (st) => ({ ...st, luck: st.luck + 15 }),
      desc: 'Increases drop rarity tiers, critical chest rolls, and higher-tier shrine offerings.',
      shrineAdvice: 'Essential economy stat: elevates chest drops from Common to Rare/Legendary.'
    },
    {
      id: 'curse',
      name: 'Curse',
      inGameLabel: '+15% Curse',
      category: 'Leaderboard',
      icon: '💀',
      isWeaponUpgrade: false,
      isShrine: true,
      shrineName: 'Curse Shrine',
      apply: (st) => ({ ...st, difficulty: (st.difficulty || 1.0) + 0.15 }),
      desc: 'Spawns larger mob waves and enemy density for astronomical XP shard farming.',
      shrineAdvice: 'World-record staple: spawns huge mob density for limitless XP harvesting.'
    },

    // 4. UTILITY & MOBILITY STATS
    {
      id: 'movement_speed',
      name: 'Movement Speed',
      inGameLabel: '+15% Move Speed',
      category: 'Utility',
      icon: '👟',
      isWeaponUpgrade: false,
      isShrine: true,
      shrineName: 'Shrine of Velocity',
      apply: (st) => ({ ...st, movementSpeed: st.movementSpeed + 0.15 }),
      desc: 'Increases hero running speed for dodging swarms and kiting bosses.',
      shrineAdvice: 'Allows outrunning elite swarms and triggers Calcium speed-to-damage.'
    },
    {
      id: 'pickup_range',
      name: 'Pickup Range',
      inGameLabel: '+25% Pickup Range',
      category: 'Utility',
      icon: '🧲',
      isWeaponUpgrade: false,
      isShrine: true,
      shrineName: 'Shrine of Magnetism',
      apply: (st) => ({ ...st, pickupRange: (st.pickupRange || 5.0) + 2.0 }),
      desc: 'Expands the attraction radius for collecting XP gems and coins safely from distance.',
      shrineAdvice: 'Permits vacuuming XP shards without dangerously diving into swarms.'
    }
  ];

  // Evaluate every discrete stat mathematically
  const evaluatedStats = discreteStats.map(stat => {
    // Check weapon compatibility for weapon upgrades
    let compatibleWeapons = [];
    if (stat.isWeaponUpgrade) {
      compatibleWeapons = activeWeapons.filter(w => {
        const tags = (w.affectedBy || []).map(t => t.toLowerCase());
        if (stat.id === 'projectile_count') return tags.includes('projectile count') || tags.includes('projectiles');
        if (stat.id === 'aoe_size') return tags.includes('size') || tags.includes('area') || tags.includes('aoe');
        if (stat.id === 'duration') return tags.includes('duration');
        if (stat.id === 'projectile_speed') return tags.includes('projectile speed');
        // Universal weapon stats apply to all weapons
        return true;
      }).map(w => w.name);
    }

    const modStats = stat.apply({ ...(currentBuildState.stats || {}) });

    // Marginal DPS calculation
    let simDps = baseDps;
    if (stat.id === 'attack_speed' || stat.id === 'cooldown_reduction') {
      simDps = baseDps * (modStats.attackSpeed / Math.max(1, currentBuildState.stats?.attackSpeed || 100));
    } else if (stat.id === 'damage') {
      simDps = baseDps * (modStats.damage / Math.max(0.1, currentBuildState.stats?.damage || 1.0));
    } else if (stat.id === 'projectile_count') {
      const weaponRatio = activeWeapons.length > 0 ? compatibleWeapons.length / activeWeapons.length : 0.5;
      simDps = baseDps * (1 + 0.22 * weaponRatio);
    } else if (stat.id === 'crit_chance') {
      simDps = baseDps * (1 + (modStats.critChance / 100) * 0.45);
    } else if (stat.id === 'crit_damage') {
      const critFactor = Math.min(1.0, (currentBuildState.stats?.critChance || 5) / 100);
      simDps = baseDps * (1 + 0.35 * critFactor);
    } else if (stat.id === 'aoe_size') {
      const weaponRatio = activeWeapons.length > 0 ? compatibleWeapons.length / activeWeapons.length : 0.5;
      simDps = baseDps * (1 + 0.12 * weaponRatio);
    } else if (stat.id === 'duration') {
      simDps = baseDps * 1.06;
    } else if (stat.id === 'projectile_speed') {
      simDps = baseDps * 1.04;
    } else if (stat.id === 'movement_speed' && character?.name === 'Calcium') {
      simDps = baseDps * 1.14;
    }

    const dpsGainPct = Math.max(0, ((simDps - baseDps) / baseDps) * 100);

    // Marginal EHP calculation
    const armorRed = Math.min(0.85, Math.max(0, (modStats.armor || 0) / 100));
    const evasRed = Math.min(0.75, Math.max(0, (modStats.evasion || 0) / 100));
    const simEhp = ((modStats.maxHp || 100) + (modStats.shield || 0)) / ((1 - armorRed) * (1 - evasRed));
    const ehpGainPct = Math.max(0, ((simEhp - baseEhp) / baseEhp) * 100);

    // Goal-specific strategic weights
    let purposeMultiplier = 1.0;
    let purposeBonus = 0;

    if (purpose === 'leaderboard') {
      if (['xp_gain', 'luck', 'curse'].includes(stat.id)) {
        purposeMultiplier = 3.6;
        purposeBonus = 40;
      } else if (['projectile_count', 'attack_speed', 'damage', 'aoe_size'].includes(stat.id)) {
        purposeMultiplier = 1.8;
      }
    } else if (purpose === 'dps_pure') {
      if (['damage', 'attack_speed', 'projectile_count', 'crit_chance', 'crit_damage'].includes(stat.id)) {
        purposeMultiplier = 2.8;
        purposeBonus = 25;
      }
    } else if (purpose === 'tank_thorns') {
      if (['armor', 'max_hp', 'thorns', 'hp_regen', 'shield'].includes(stat.id)) {
        purposeMultiplier = 3.2;
        purposeBonus = 35;
      }
    } else if (purpose === 'crit_burst') {
      if (['crit_chance', 'crit_damage'].includes(stat.id)) {
        purposeMultiplier = 3.8;
        purposeBonus = 40;
      }
    } else if (purpose === 'speed_farming') {
      if (['movement_speed', 'xp_gain', 'luck', 'pickup_range'].includes(stat.id)) {
        purposeMultiplier = 3.0;
        purposeBonus = 30;
      }
    }

    // Composite scoring
    let compositeScore = (dpsGainPct * 0.55 + ehpGainPct * 0.40) * purposeMultiplier + purposeBonus;

    // Special bonus for weapon upgrade synergy
    if (stat.isWeaponUpgrade && compatibleWeapons.length > 0) {
      compositeScore += compatibleWeapons.length * 3.5;
    }

    let status = 'High Value';
    if (compositeScore >= 35) status = 'Essential Peak';
    else if (compositeScore >= 20) status = 'Strong Scaling';
    else if (compositeScore >= 10) status = 'Moderate';
    else status = 'Low Marginal Yield';

    let weaponSynergyText = '';
    if (stat.isWeaponUpgrade) {
      if (compatibleWeapons.length === activeWeapons.length && activeWeapons.length > 0) {
        weaponSynergyText = `Scales all ${activeWeapons.length} active weapons`;
      } else if (compatibleWeapons.length > 0) {
        weaponSynergyText = `Scales ${compatibleWeapons.length}/${activeWeapons.length} weapons: ${compatibleWeapons.join(', ')}`;
      } else {
        weaponSynergyText = `No active weapons currently scale with this tag`;
      }
    }

    return {
      id: stat.id,
      name: stat.name,
      inGameLabel: stat.inGameLabel,
      category: stat.category,
      icon: stat.icon,
      isWeaponUpgrade: stat.isWeaponUpgrade,
      isShrine: stat.isShrine,
      shrineName: stat.shrineName,
      shrineAdvice: stat.shrineAdvice,
      description: stat.desc,
      weaponSynergyText,
      compatibleWeapons,
      dpsGainPct,
      ehpGainPct,
      compositeScore,
      status
    };
  });

  // 1. All stats sorted
  const allStats = [...evaluatedStats].sort((a, b) => b.compositeScore - a.compositeScore);

  // 2. Weapon Upgrade Stats specifically (only stats offered on weapon upgrades)
  const weaponUpgradeStats = evaluatedStats
    .filter(s => s.isWeaponUpgrade)
    .sort((a, b) => b.compositeScore - a.compositeScore);

  // 3. Shrine Blessings specifically (only stats offered at shrines)
  const shrineStats = evaluatedStats
    .filter(s => s.isShrine)
    .sort((a, b) => b.compositeScore - a.compositeScore);

  return {
    allStats,
    weaponUpgradeStats,
    shrineStats
  };
}

/**
 * Backwards compatibility wrapper for calculatePureStatPriorities.
 * Returns the allStats array with weaponUpgradeStats and shrineStats attached.
 */
export function calculatePureStatPriorities(currentBuildState, purpose = 'leaderboard') {
  const result = calculateDetailedStatPriorities(currentBuildState, purpose);
  const arr = result.allStats;
  arr.weaponUpgradeStats = result.weaponUpgradeStats;
  arr.shrineStats = result.shrineStats;
  arr.allStats = result.allStats;
  return arr;
}

/**
 * Generates dynamic, purpose-specific Tier Lists for:
 * 1. Tomes (All 23)
 * 2. Weapons (All 29)
 * 3. Items (All 78)
 */
export function calculateDynamicTierLists(currentBuildState, purpose = 'leaderboard') {
  // 1. Evaluate All Tomes
  const evaluatedTomes = tomes.map(t => {
    const evalResult = evaluateOfferedUpgrade(currentBuildState, { name: t.name, type: 'tome' }, purpose);
    let rationale = evalResult.bracketSaturationNote || 'Standard stat augment';
    if (purpose === 'leaderboard' && ['XP Tome', 'Luck Tome', 'Cursed Tome', 'Chaos Tome'].includes(t.name)) {
      rationale = 'Core World Record Quad Tome: essential for exponential level & drop scaling.';
    } else if (purpose === 'dps_pure' && ['Damage Tome', 'Cooldown Tome', 'Quantity Tome', 'Precision Tome'].includes(t.name)) {
      rationale = 'Top-tier pure damage multiplier across key offensive brackets.';
    } else if (purpose === 'tank_thorns' && ['Armor Tome', 'HP Tome', 'Thorns Tome', 'Regen Tome'].includes(t.name)) {
      rationale = 'Immortal defense & thorns reflect engine.';
    }

    return {
      ...t,
      score: evalResult.compositeScore,
      dpsGainPct: evalResult.dpsGainPct,
      ehpGainPct: evalResult.ehpGainPct,
      rationale
    };
  }).sort((a, b) => b.score - a.score);

  // Group Tomes into Tiers
  const tomesByTier = {
    S: evaluatedTomes.slice(0, 4),
    A: evaluatedTomes.slice(4, 9),
    B: evaluatedTomes.slice(9, 16),
    C: evaluatedTomes.slice(16)
  };

  // 2. Evaluate All Weapons
  const evaluatedWeapons = weapons.map(w => {
    const evalResult = evaluateOfferedUpgrade(currentBuildState, { name: w.name, type: 'weapon' }, purpose);
    const charName = currentBuildState.character?.name?.toLowerCase() || '';
    
    // Character weapon affinity
    let synergyBonus = 0;
    let rationale = `${w.category} weapon. Scales with: ${w.affectedBy.join(', ')}`;
    
    if (w.name === currentBuildState.character?.startingWeapon) {
      synergyBonus += 25;
      rationale = `Signature starting weapon for ${currentBuildState.character?.name}. Highest native compatibility.`;
    }
    if (charName === 'cl4nk' && ['Revolver', 'Bow', 'Sniper Rifle', 'Dexecutioner'].includes(w.name)) {
      synergyBonus += 20;
      rationale = 'Extreme crit scaling paired with CL4NK passive.';
    }
    if (charName === 'sir oofie' && ['Sword', 'Aegis', 'Chunkers', 'Aura'].includes(w.name)) {
      synergyBonus += 20;
      rationale = 'Melee & defense synergy with Sir Oofie armor stacking.';
    }
    if (charName === 'calcium' && ['Bone', 'Flamewalker', 'Wireless Dagger'].includes(w.name)) {
      synergyBonus += 20;
      rationale = 'Scales with high-speed mobility kite playstyle.';
    }

    const finalScore = evalResult.compositeScore + synergyBonus;

    return {
      ...w,
      score: finalScore,
      dpsGainPct: evalResult.dpsGainPct,
      ehpGainPct: evalResult.ehpGainPct,
      rationale
    };
  }).sort((a, b) => b.score - a.score);

  const weaponsByTier = {
    S: evaluatedWeapons.slice(0, 5),
    A: evaluatedWeapons.slice(5, 12),
    B: evaluatedWeapons.slice(12, 21),
    C: evaluatedWeapons.slice(21)
  };

  // 3. Evaluate All Items
  const evaluatedItems = items.map(it => {
    const evalResult = evaluateOfferedUpgrade(currentBuildState, { name: it.name, type: 'item' }, purpose);
    let rationale = it.description;
    
    if (purpose === 'leaderboard' && ['Echo Shard', 'Time Bracelet', 'Clover', 'Overpowered Lamp', 'Big Bonk', 'Giant Fork'].includes(it.name)) {
      rationale = 'Endgame leaderboard staple: massive multiplier on drop frequency and kill capacity.';
    }

    return {
      ...it,
      score: evalResult.compositeScore,
      dpsGainPct: evalResult.dpsGainPct,
      ehpGainPct: evalResult.ehpGainPct,
      rationale
    };
  }).sort((a, b) => b.score - a.score);

  const itemsByTier = {
    S: evaluatedItems.slice(0, 10),
    A: evaluatedItems.slice(10, 25),
    B: evaluatedItems.slice(25, 50),
    C: evaluatedItems.slice(50)
  };

  return {
    tomesTierList: tomesByTier,
    weaponsTierList: weaponsByTier,
    itemsTierList: itemsByTier
  };
}

// Backwards compatibility alias
export function calculateStatPriorities(currentBuildState) {
  return calculatePureStatPriorities(currentBuildState, 'leaderboard');
}

