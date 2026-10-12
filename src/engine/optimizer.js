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
    } else if (tomeObj.name === 'Attraction Tome') {
      stats.pickupRange += (tLevel * 15) / 100;
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
      // Replaces or upgrades lowest
      existing ? existing.level += 1 : nextWeapons[0].level += 1;
    }
  } else if (offerType === 'tome') {
    upgradeCategory = 'Tome';
    const existing = nextTomes.find(t => t.name.toLowerCase() === offerName.toLowerCase());
    if (existing) {
      existing.level += 1;
    } else if (nextTomes.length < 4) {
      nextTomes.push({ name: offerName, level: 1 });
    } else {
      nextTomes[0].level += 1;
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
  if (objective === 'dps_pure') {
    compositeScore = dpsGainPct * 0.85 + (affectedWeaponsCount * 3.5);
  } else if (objective === 'tank_thorns') {
    compositeScore = ehpGainPct * 0.70 + dpsGainPct * 0.20 + (affectedWeaponsCount * 2);
  } else if (objective === 'speed_farming') {
    const econBonus = (offerLower.includes('xp') || offerLower.includes('luck') || offerLower.includes('curse') || offerLower.includes('gold')) ? 25 : 0;
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
 * Calculates marginal DPS increase for each available stat right now
 * (Generates the "What stat should I prioritize next?" radar)
 */
export function calculateStatPriorities(currentBuildState) {
  const {
    character,
    level,
    currentWeapons = [],
    currentTomes = [],
    currentItems = []
  } = currentBuildState;
  const baseDps = currentBuildState.totalDps || 50;

  const testStats = [
    { name: 'Damage Bracket (Damage Tome)', testTome: 'Damage Tome' },
    { name: 'Attack Speed (Cooldown Tome)', testTome: 'Cooldown Tome' },
    { name: 'Crit Chance (Precision Tome)', testTome: 'Precision Tome' },
    { name: 'Projectiles (Quantity Tome)', testTome: 'Quantity Tome' },
    { name: 'AoE Size (Size Tome)', testTome: 'Size Tome' },
    { name: 'Duration (Duration Tome)', testTome: 'Duration Tome' },
    { name: 'Flat Damage (Gym Sauce)', testItem: 'Gym Sauce' },
    { name: 'Multiplicative % (Beer)', testItem: 'Beer' }
  ];

  return testStats.map(s => {
    let testTomes = [...currentTomes.map(t => ({ ...t }))];
    let testItems = [...currentItems.map(i => ({ ...i }))];

    if (s.testTome) {
      const ex = testTomes.find(t => t.name === s.testTome);
      if (ex) ex.level += 1;
      else testTomes.push({ name: s.testTome, level: 1 });
    }
    if (s.testItem) {
      const ex = testItems.find(i => i.name === s.testItem);
      if (ex) ex.count += 1;
      else testItems.push({ name: s.testItem, count: 1 });
    }

    const testState = calculateBuildStats(character.name, level, currentWeapons, testTomes, testItems);
    const dpsPct = ((testState.totalDps - baseDps) / Math.max(1, baseDps)) * 100;

    return {
      statName: s.name,
      marginalDpsGainPct: Math.max(0, dpsPct)
    };
  }).sort((a, b) => b.marginalDpsGainPct - a.marginalDpsGainPct);
}
