import { calculateBuildStats, rankOfferedUpgrades, calculateStatPriorities } from './src/engine/optimizer.js';

// Test a build
const buildState = calculateBuildStats(
  'Fox',
  5,
  [{ name: 'Firestaff', level: 3 }, { name: 'Aura', level: 2 }],
  [{ name: 'Damage Tome', level: 3 }, { name: 'XP Tome', level: 2 }],
  [{ name: 'Gym Sauce', count: 1 }, { name: 'Clover', count: 2 }]
);

console.log('Build stats successfully calculated:');
console.log('Character:', buildState.character.name);
console.log('Total DPS:', buildState.totalDps.toFixed(1));
console.log('EHP:', buildState.ehp.toFixed(1));
console.log('Damage Multiplier:', buildState.damageMultiplier.toFixed(2));

// Test offer ranking
const offers = [
  { name: 'Damage Tome', type: 'tome', rarity: 'Common' },
  { name: 'Cooldown Tome', type: 'tome', rarity: 'Common' },
  { name: 'Backpack', type: 'item', rarity: 'Uncommon' },
  { name: 'Moldy Cheese', type: 'item', rarity: 'Common' }
];

const ranking = rankOfferedUpgrades(buildState, offers, 'balanced');
console.log('\nUpgrade ranking results:');
console.log('Best pick:', ranking.bestChoice.name, `(+${ranking.bestChoice.dpsGainPct.toFixed(1)}% DPS, Score: ${ranking.bestChoice.compositeScore.toFixed(1)})`);
console.log('Reroll advice:', ranking.rerollAdvice.action, '-', ranking.rerollAdvice.message);

ranking.rankedOffers.forEach((o, i) => {
  console.log(`Rank #${i+1}: ${o.name} | +${o.dpsGainPct.toFixed(1)}% DPS | +${o.ehpGainPct.toFixed(1)}% EHP | Score: ${o.compositeScore.toFixed(1)}`);
});

const priorities = calculateStatPriorities(buildState);
console.log('\nTop Stat Priority right now:');
priorities.slice(0, 3).forEach(p => console.log(`- ${p.statName}: +${p.marginalDpsGainPct.toFixed(1)}% DPS`));
