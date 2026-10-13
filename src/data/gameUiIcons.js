// Authentic Megabonk Character Portrait & Arsenal Visual Mapping

export const CHARACTER_PORTRAITS = {
  'Fox': { emoji: '🦊', hat: '🧙‍♂️', bg: 'from-[#1e3a5f] to-[#0f1f36]' },
  'Sir Oofie': { emoji: '🪖', hat: '⚔️', bg: 'from-[#374151] to-[#1f2937]' },
  'Calcium': { emoji: '💀', hat: '🕶️', bg: 'from-[#334155] to-[#0f172a]' },
  'Megachad': { emoji: '🗿', hat: '💪', bg: 'from-[#2563eb] to-[#1d4ed8]' },
  'Ogre': { emoji: '👹', hat: '🪓', bg: 'from-[#166534] to-[#14532d]' },
  'CL4NK': { emoji: '🤖', hat: '🤠', bg: 'from-[#78350f] to-[#451a03]' },
  'Athena': { emoji: '👸', hat: '🛡️', bg: 'from-[#854d0e] to-[#422006]' },
  'Robinette': { emoji: '🏹', hat: '🪶', bg: 'from-[#15803d] to-[#052e16]' },
  'Monke': { emoji: '🦍', hat: '🍌', bg: 'from-[#713f12] to-[#3f2209]' },
  'Tony McZoom': { emoji: '⚡', hat: '👟', bg: 'from-[#a16207] to-[#422006]' },
  'Bush': { emoji: '🌿', hat: '🎯', bg: 'from-[#14532d] to-[#052e16]' },
  'Birdo': { emoji: '🐦', hat: '🌪️', bg: 'from-[#991b1b] to-[#450a0a]' },
  'Noelle': { emoji: '❄️', hat: '🧊', bg: 'from-[#0369a1] to-[#082f49]' },
  'Amog': { emoji: '☣️', hat: '🧪', bg: 'from-[#854d0e] to-[#365314]' },
  'Spaceman': { emoji: '👨‍🚀', hat: '🌌', bg: 'from-[#312e81] to-[#1e1b4b]' },
  'Bandit': { emoji: '🥷', hat: '🗡️', bg: 'from-[#374151] to-[#111827]' },
  'Ninja': { emoji: '🥷', hat: '⚔️', bg: 'from-[#1e293b] to-[#090d16]' },
  'Vlad': { emoji: '🧛', hat: '🩸', bg: 'from-[#7f1d1d] to-[#3b0707]' },
  'Sir Chadwell': { emoji: '⚔️', hat: '👑', bg: 'from-[#4c1d95] to-[#1e1b4b]' },
  'Dicehead': { emoji: '🎲', hat: '🎩', bg: 'from-[#334155] to-[#1e293b]' },
};

export function getCharacterPortrait(charName) {
  return CHARACTER_PORTRAITS[charName] || { emoji: '🎲', hat: '⚔️', bg: 'from-[#2e3846] to-[#1a2028]' };
}

export function getWeaponIcon(weaponName = '') {
  const n = weaponName.toLowerCase();
  if (n.includes('aura')) return '💠';
  if (n.includes('sword')) return '🗡️';
  if (n.includes('fire') || n.includes('flame')) return '🔥';
  if (n.includes('bone')) return '🦴';
  if (n.includes('axe')) return '🪓';
  if (n.includes('revolver') || n.includes('sniper') || n.includes('shotgun')) return '🔫';
  if (n.includes('aegis') || n.includes('shield')) return '🛡️';
  if (n.includes('bow')) return '🏹';
  if (n.includes('banana')) return '🍌';
  if (n.includes('dagger') || n.includes('katana') || n.includes('dexecutioner')) return '🗡️';
  if (n.includes('tornado') || n.includes('wind')) return '🌪️';
  if (n.includes('frost') || n.includes('ice')) return '❄️';
  if (n.includes('poison') || n.includes('flask')) return '🧪';
  if (n.includes('black') || n.includes('hole')) return '🕳️';
  if (n.includes('blood')) return '🩸';
  if (n.includes('dice')) return '🎲';
  if (n.includes('lightning') || n.includes('zap')) return '⚡';
  return '⚔️';
}

export function getTomeIcon(tomeName = '') {
  const n = tomeName.toLowerCase();
  if (n.includes('xp')) return '📘';
  if (n.includes('luck')) return '🍀';
  if (n.includes('curse')) return '💀';
  if (n.includes('chaos')) return '🌀';
  if (n.includes('damage')) return '📕';
  if (n.includes('cooldown') || n.includes('haste') || n.includes('speed')) return '⚡';
  if (n.includes('crit') || n.includes('precision')) return '🎯';
  if (n.includes('armor') || n.includes('shield') || n.includes('hp')) return '🛡️';
  if (n.includes('size') || n.includes('area')) return '⭕';
  if (n.includes('thorn')) return '🦔';
  return '📖';
}

export function getItemIcon(itemName = '') {
  const n = itemName.toLowerCase();
  if (n.includes('clover')) return '🍀';
  if (n.includes('shard')) return '💎';
  if (n.includes('bracelet') || n.includes('clock') || n.includes('watch')) return '⌚';
  if (n.includes('cheese')) return '🧀';
  if (n.includes('backpack') || n.includes('bag')) return '🎒';
  if (n.includes('crystal') || n.includes('ice')) return '🧊';
  if (n.includes('boot') || n.includes('shoe') || n.includes('sock')) return '👢';
  if (n.includes('heart') || n.includes('hp') || n.includes('medkit')) return '❤️';
  if (n.includes('shield') || n.includes('armor') || n.includes('helm')) return '🛡️';
  if (n.includes('ring') || n.includes('amulet') || n.includes('crown')) return '👑';
  if (n.includes('magnet')) return '🧲';
  return '🎁';
}
