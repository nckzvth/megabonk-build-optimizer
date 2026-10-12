import json
import re

with open('megabonk_database_raw.json', 'r', encoding='utf-8') as f:
    raw = json.load(f)

def parse_num(val, default=0.0):
    if not val:
        return default
    # remove %, x, s, etc.
    cleaned = re.sub(r'[^\d.-]', '', val)
    try:
        return float(cleaned)
    except:
        return default

# 1. Characters
characters = []
for c in raw['characters']:
    name = c['name']
    stats_raw = c.get('stats', {})
    
    # parse stats
    stats = {
        'maxHp': parse_num(stats_raw.get('Max HP', '100'), 100),
        'hpRegen': parse_num(stats_raw.get('HP Regen', '10'), 10),
        'overheal': parse_num(stats_raw.get('Overheal', '0'), 0),
        'shield': parse_num(stats_raw.get('Shield', '0'), 0),
        'armor': parse_num(stats_raw.get('Armor', '0%'), 0), # percent
        'evasion': parse_num(stats_raw.get('Evasion', '0%'), 0), # percent
        'lifesteal': parse_num(stats_raw.get('Lifesteal', '0%'), 0), # percent
        'thorns': parse_num(stats_raw.get('Thorns', '0'), 0),
        'damage': parse_num(stats_raw.get('Damage', '1.0x'), 1.0), # multiplier
        'critChance': parse_num(stats_raw.get('Crit Chance', '5%'), 5), # percent
        'critDamage': parse_num(stats_raw.get('Crit Damage', '2.0x'), 2.0), # multiplier
        'attackSpeed': parse_num(stats_raw.get('Attack Speed', '100%'), 100), # percent
        'projectileCount': int(parse_num(stats_raw.get('Projectile Count', '1'), 1)),
        'projectileBounces': int(parse_num(stats_raw.get('Projectile Bounces', '0'), 0)),
        'size': parse_num(stats_raw.get('Size', '1.0x'), 1.0),
        'projectileSpeed': parse_num(stats_raw.get('Projectile Speed', '1.0x'), 1.0),
        'duration': parse_num(stats_raw.get('Duration', '1.0x'), 1.0),
        'damageToElites': parse_num(stats_raw.get('Damage to Elites', '1.0x'), 1.0),
        'knockback': parse_num(stats_raw.get('Knockback', '1.0x'), 1.0),
        'movementSpeed': parse_num(stats_raw.get('Movement Speed', '1.0x'), 1.0),
        'extraJumps': int(parse_num(stats_raw.get('Extra Jumps', '0'), 0)),
        'luck': parse_num(stats_raw.get('Luck', '0%'), 0),
        'pickupRange': parse_num(stats_raw.get('Pickup Range', '1.0x'), 1.0),
        'xpGain': parse_num(stats_raw.get('XP Gain', '1.0x'), 1.0),
        'goldGain': parse_num(stats_raw.get('Gold Gain', '1.0x'), 1.0),
        'silverGain': parse_num(stats_raw.get('Silver Gain', '1.0x'), 1.0)
    }

    # passive scaling formula per level
    passive_text = c.get('passive', '')
    passive_scaling = {}
    if 'Luck per level' in passive_text:
        passive_scaling['luckPerLevel'] = 2.0
    if 'Armor per level' in passive_text:
        passive_scaling['armorPerLevel'] = 1.0
    if 'Damage per level' in passive_text:
        match = re.search(r'([\d.]+)%\s*Damage per level', passive_text)
        passive_scaling['damagePerLevel'] = float(match.group(1)) if match else 1.5
    if 'Crit Chance per level' in passive_text:
        passive_scaling['critChancePerLevel'] = 1.0
    if 'Thorns per level' in passive_text:
        passive_scaling['thornsPerLevel'] = 2.0
    if 'Gold Gain per level' in passive_text:
        passive_scaling['goldGainPerLevel'] = 1.0
        passive_scaling['damagePerGold'] = 0.0005
    if 'Max HP per level' in passive_text:
        passive_scaling['maxHpPerLevel'] = 2.0
    if 'pickup range per level' in passive_text:
        passive_scaling['pickupRangePerLevel'] = 2.0
    if 'Crit Damage per level' in passive_text:
        passive_scaling['critDamagePerLevel'] = 1.0
    if 'Size per Level' in passive_text:
        passive_scaling['sizePerLevel'] = 1.0
    if 'XP Gain per level' in passive_text:
        passive_scaling['xpGainPerLevel'] = 1.0
    if 'Attack Speed per level' in passive_text:
        passive_scaling['attackSpeedPerLevel'] = 1.0
    if 'Evasion per level' in passive_text:
        passive_scaling['evasionPerLevel'] = 0.5
    if 'Lifesteal per level' in passive_text:
        passive_scaling['lifestealPerLevel'] = 1.0
    if 'Speed Demon' in passive_text:
        passive_scaling['speedToDamage'] = 0.5
    if 'Flex' in passive_text:
        passive_scaling['flexDamage'] = 2.5
    if 'Gamba' in passive_text:
        passive_scaling['randomStatPerLevel'] = True

    # Best archetype tags
    archetypes = []
    if name in ['Sir Oofie', 'Athena', 'Monke']:
        archetypes.append('Tank & Thorns')
    if name in ['CL4NK', 'Bush', 'Bandit', 'Ninja']:
        archetypes.append('Crit & Burst')
    if name in ['Calcium', 'Robinette', 'Tony McZoom']:
        archetypes.append('Speed & Scaling')
    if name in ['Megachad', 'Ogre', 'Noelle']:
        archetypes.append('AoE & Brawler')
    if name in ['Amog', 'Vlad']:
        archetypes.append('DoT & Drain')
    if name in ['Spaceman', 'Fox', 'Dicehead']:
        archetypes.append('Meta Economy & Luck')

    characters.append({
        'id': name.lower().replace(' ', '_'),
        'name': name,
        'startingWeapon': c['startingWeapon'],
        'passive': passive_text,
        'passiveScaling': passive_scaling,
        'prereq': c['prereq'],
        'silverCost': c['silverCost'],
        'stats': stats,
        'archetypes': archetypes
    })

# 2. Weapons
weapons = []
for w in raw['weapons']:
    name = w['name']
    affected = [a.strip() for a in w.get('affectedBy', []) if a.strip()]
    
    # Weapon classification
    w_type = 'Ranged'
    if name in ['Sword', 'Katana', 'Hero Sword', 'Corrupted Sword', 'Axe']:
        w_type = 'Melee'
    elif name in ['Aura', 'Frostwalker', 'Dragon\'s Breath']:
        w_type = 'Area Aura'
    elif name in ['Flamewalker', 'Poison Flask', 'Mines']:
        w_type = 'DoT / Hazard'
    elif name in ['Chunkers', 'Black Hole']:
        w_type = 'Orbit / Control'
    elif name in ['Aegis']:
        w_type = 'Defensive Counter'

    # Estimated base stats for dps model
    base_dmg = 25
    base_cooldown = 1.0 # seconds
    base_projectiles = 1
    if name in ['Sniper Rifle', 'Slutty Rocket', 'Dexecutioner']:
        base_dmg = 70
        base_cooldown = 2.2
    elif name in ['Shotgun', 'Revolver', 'Bow']:
        base_dmg = 20
        base_cooldown = 0.8
        base_projectiles = 3 if name == 'Shotgun' else 1
    elif name in ['Aura', 'Frostwalker']:
        base_dmg = 15
        base_cooldown = 0.5
    elif name in ['Katana', 'Sword', 'Hero Sword']:
        base_dmg = 35
        base_cooldown = 0.9
    elif name in ['Lightning Staff', 'Firestaff']:
        base_dmg = 40
        base_cooldown = 1.2

    weapons.append({
        'id': name.lower().replace(' ', '_').replace('\'', ''),
        'name': name,
        'description': w['description'],
        'unlock': w['unlock'],
        'category': w_type,
        'affectedBy': affected,
        'baseDamage': base_dmg,
        'baseCooldown': base_cooldown,
        'baseProjectiles': base_projectiles,
        'tier': 'S' if name in ['Aura', 'Revolver', 'Bow', 'Katana', 'Dexecutioner', 'Flamewalker'] else ('A' if name in ['Firestaff', 'Lightning Staff', 'Shotgun', 'Axe', 'Dragon\'s Breath', 'Chunkers'] else 'B')
    })

# 3. Tomes
tomes = []
for t in raw['tomes']:
    name = t['name']
    ability = t['ability']
    
    # Determine stat boosted
    stat_target = 'damage'
    per_level = 10.0
    bracket = 1 # damage tome bracket
    
    if 'Movement Speed' in ability:
        stat_target = 'movementSpeed'
        per_level = 10.0
        bracket = 0
    elif 'Size' in ability:
        stat_target = 'size'
        per_level = 12.0
        bracket = 8 # aoe / coverage
    elif 'Silver Gain' in ability:
        stat_target = 'silverGain'
        per_level = 15.0
        bracket = 0
    elif 'Shield' in ability:
        stat_target = 'shield'
        per_level = 20.0
        bracket = 0 # survival
    elif 'HP Regen' in ability:
        stat_target = 'hpRegen'
        per_level = 15.0
        bracket = 0 # survival
    elif 'Projectile Speed' in ability:
        stat_target = 'projectileSpeed'
        per_level = 15.0
        bracket = 8
    elif 'Crit Chance' in ability:
        stat_target = 'critChance'
        per_level = 6.0
        bracket = 7 # crit bracket
    elif 'Knockback' in ability:
        stat_target = 'knockback'
        per_level = 15.0
        bracket = 0
    elif 'Max HP' in ability:
        stat_target = 'maxHp'
        per_level = 25.0
        bracket = 0 # survival
    elif 'Evasion' in ability:
        stat_target = 'evasion'
        per_level = 5.0
        bracket = 0 # survival
    elif 'Gold' in ability:
        stat_target = 'goldGain'
        per_level = 15.0
        bracket = 0
    elif 'Damage - increases' in ability or name == 'Damage Tome':
        stat_target = 'damage'
        per_level = 12.0
        bracket = 1 # Bracket 1: Damage Tome Universal
    elif 'Attack Speed' in ability or name == 'Cooldown Tome':
        stat_target = 'attackSpeed'
        per_level = 10.0
        bracket = 6 # Attack Speed Bracket
    elif 'Thorns' in ability:
        stat_target = 'thorns'
        per_level = 10.0
        bracket = 0
    elif 'Projectile Count' in ability or name == 'Quantity Tome':
        stat_target = 'projectileCount'
        per_level = 0.5 # 1 every 2 levels
        bracket = 8 # projectile count bracket
    elif 'Lifesteal' in ability:
        stat_target = 'lifesteal'
        per_level = 4.0
        bracket = 0 # survival
    elif 'Pickup Range' in ability:
        stat_target = 'pickupRange'
        per_level = 15.0
        bracket = 0
    elif 'Armor' in ability:
        stat_target = 'armor'
        per_level = 6.0
        bracket = 0 # survival
    elif 'Duration' in ability:
        stat_target = 'duration'
        per_level = 12.0
        bracket = 8 # coverage / duration
    elif 'Luck' in ability:
        stat_target = 'luck'
        per_level = 8.0
        bracket = 0
    elif 'XP Gain' in ability:
        stat_target = 'xpGain'
        per_level = 12.0
        bracket = 0
    elif 'Difficulty' in ability:
        stat_target = 'difficulty'
        per_level = 10.0
        bracket = 0
    elif 'Chaos' in ability or name == 'Chaos Tome':
        stat_target = 'all'
        per_level = 5.0
        bracket = 0

    tomes.append({
        'id': name.lower().replace(' ', '_'),
        'name': name,
        'ability': ability,
        'objective': t['objective'],
        'silverCost': t['silverCost'],
        'statTarget': stat_target,
        'perLevel': per_level,
        'bracket': bracket,
        'tier': 'S' if name in ['Damage Tome', 'Cooldown Tome', 'Quantity Tome', 'XP Tome', 'Luck Tome', 'Armor Tome'] else ('A' if name in ['Precision Tome', 'Size Tome', 'Duration Tome', 'Cursed Tome', 'Bloody Tome'] else 'B')
    })

# 4. Items
items = []
for it in raw['items']:
    name = it['name']
    desc = it['description']
    rarity = it['rarity'] or 'Common'
    
    # Analyze item effects and assign brackets and numerical bonuses
    effects = {}
    bracket = 0
    
    # Bracket 3: Flat Damage Items
    # Bracket 4: Main Damage % Items
    # Bracket 5: Speed / Calcium scaling
    # Bracket 6: Attack Speed
    # Bracket 7: Crit Chance & Crit Damage
    # Bracket 8: Projectiles & AoE
    
    if 'Damage by +10%' in desc or name == 'Gym Sauce':
        effects['damagePct'] = 10.0
        bracket = 3 # Flat/Additive items
    elif 'Damage by +20%' in desc or name == 'Beer':
        effects['damagePct'] = 20.0
        effects['maxHpPct'] = -5.0
        bracket = 4 # Main Damage %
    elif 'enemies above 90% HP' in desc or name == 'Tactical Glasses':
        effects['damagePct'] = 20.0
        bracket = 4
    elif 'Elites and Bosses' in desc or name == 'Boss Buster':
        effects['damageToElites'] = 15.0
        bracket = 4
    elif 'Credit Card (Red)' in name:
        effects['damagePct'] = 15.0 # average chest opening boost
        bracket = 4
    elif 'Brass Knuckles' in name:
        effects['damagePct'] = 20.0
        bracket = 3
    elif 'Idle Juice' in name:
        effects['damagePct'] = 35.0
        bracket = 3
    elif 'Demonic Soul' in name:
        effects['damagePct'] = 40.0 # stacking to 100%
        bracket = 4
    elif 'Big Bonk' in name:
        effects['megabonkProc'] = 0.02 # 2% for 20x damage (+38% expected DPS)
        effects['damagePct'] = 38.0
        bracket = 4
    elif 'Giant Fork' in name:
        effects['megacrit'] = True
        effects['critDamagePct'] = 50.0
        bracket = 7
    elif 'Backpack' in name:
        effects['projectileCount'] = 1
        bracket = 8
    elif 'Battery' in name:
        effects['attackSpeed'] = 8.0
        bracket = 6
    elif 'Turbo Skates' in name:
        effects['attackSpeed'] = 25.0
        bracket = 6
    elif 'Forbidden Juice' in name:
        effects['critChance'] = 10.0
        bracket = 7
    elif 'Demonic Blade' in name:
        effects['critHealChance'] = 25.0
    elif 'Grandma\'s Secret Tonic' in name:
        effects['critExplosion'] = 50.0
        bracket = 7
    elif 'Moldy Cheese' in name:
        effects['poisonChance'] = 40.0
    elif 'Clover' in name:
        effects['luck'] = 7.5
    elif 'Time Bracelet' in name:
        effects['xpGain'] = 8.0
    elif 'Slippery Ring' in name:
        effects['evasion'] = 15.0
    elif 'Oats' in name:
        effects['maxHp'] = 25.0
    elif 'Medkit' in name:
        effects['hpRegen'] = 35.0
    elif 'Turbo Socks' in name:
        effects['movementSpeed'] = 15.0
    elif 'Beefy Ring' in name:
        effects['damagePer100Hp'] = 20.0
        bracket = 4
    elif 'Spiky Shield' in name:
        effects['armor'] = 10.0
        effects['thornsPerArmor'] = 2.0
    elif 'Overpowered Lamp' in name:
        effects['procChanceBonus'] = 100.0
    elif 'Chonkplate' in name:
        effects['lifesteal'] = 20.0
        effects['overheal'] = 75.0
    elif 'Holy Book' in name:
        effects['maxHp'] = 100.0
        effects['hpRegen'] = 50.0
    elif 'Speed Boi' in name:
        effects['speedBoiDamage'] = 100.0
        bracket = 5

    items.append({
        'id': name.lower().replace(' ', '_').replace('\'', '').replace('(', '').replace(')', ''),
        'name': name,
        'description': desc,
        'rarity': rarity,
        'objective': it['objective'],
        'silverCost': it['silverCost'],
        'effects': effects,
        'bracket': bracket,
        'tier': 'S' if rarity == 'Legendary' or name in ['Backpack', 'Moldy Cheese', 'Tactical Glasses', 'Beefy Ring', 'Turbo Skates'] else ('A' if rarity == 'Rare' or name in ['Gym Sauce', 'Forbidden Juice', 'Beer', 'Time Bracelet', 'Clover'] else 'B')
    })

# 5. Meta Builds & Archetypes
meta_builds = [
    {
        'id': 'holy_trinity',
        'name': 'The Holy Trinity (XP + Curse + Luck)',
        'description': 'The premier competitive endgame build. Stacks XP, Curse difficulty, and Luck to maximize item drops, shrine rarity, and rapid level progression.',
        'character': 'Fox',
        'weapons': ['Firestaff', 'Aura', 'Flamewalker', 'Katana'],
        'tomes': ['XP Tome', 'Luck Tome', 'Cursed Tome', 'Damage Tome'],
        'keyItems': ['Clover', 'Time Bracelet', 'Echo Shard', 'Overpowered Lamp'],
        'difficulty': 'High Risk / Infinite Scaling'
    },
    {
        'id': 'cl4nk_overcrit',
        'name': 'CL4NK 100%+ Overcrit Shredder',
        'description': 'Stack Crit Chance above 100% to trigger Overcrits and Giant Fork Megacrits. Obliterates stage bosses in seconds.',
        'character': 'CL4NK',
        'weapons': ['Revolver', 'Bow', 'Sniper Rifle', 'Dexecutioner'],
        'tomes': ['Precision Tome', 'Damage Tome', 'Cooldown Tome', 'Quantity Tome'],
        'keyItems': ['Giant Fork', 'Forbidden Juice', 'Tactical Glasses', 'Backpack'],
        'difficulty': 'Moderate / Pure DPS'
    },
    {
        'id': 'sir_oofie_immortal',
        'name': 'Sir Oofie Immortal Thorns Fortress',
        'description': 'Combines +1% Armor per level with Spiky Shield (+2 Thorns per 1% Armor) and Chonkplate overheal to passively kill mobs by touching them.',
        'character': 'Sir Oofie',
        'weapons': ['Sword', 'Aegis', 'Chunkers', 'Aura'],
        'tomes': ['Armor Tome', 'HP Tome', 'Thorns Tome', 'Regen Tome'],
        'keyItems': ['Spiky Shield', 'Chonkplate', 'Holy Book', 'Cactus'],
        'difficulty': 'Easy / High Survivability'
    },
    {
        'id': 'calcium_hyper_speed',
        'name': 'Calcium Hyper-Sonic Speed Demon',
        'description': 'Converts massive movement speed into raw multiplicative damage via Speed Demon passive and Turbo Skates attack speed.',
        'character': 'Calcium',
        'weapons': ['Bone', 'Wireless Dagger', 'Flamewalker', 'Revolver'],
        'tomes': ['Agility Tome', 'Damage Tome', 'Cooldown Tome', 'Quantity Tome'],
        'keyItems': ['Turbo Socks', 'Turbo Skates', 'Coward\'s cloak', 'Golden Sneakers'],
        'difficulty': 'High Skill / Fast Paced'
    },
    {
        'id': 'amog_poison_apocalypse',
        'name': 'Amog Toxic Epidemic Cloud',
        'description': 'Infects whole screens with cascading poison corpse explosions using Moldy Cheese, Gas Mask, and Poison Flask.',
        'character': 'Amog',
        'weapons': ['Poison Flask', 'Flamewalker', 'Aura', 'Black Hole'],
        'tomes': ['Duration Tome', 'Size Tome', 'Damage Tome', 'Quantity Tome'],
        'keyItems': ['Moldy Cheese', 'Gas Mask', 'Toxic Barrel', 'Moldy Gloves'],
        'difficulty': 'Crowd Control Specialist'
    },
    {
        'id': 'megachad_infinite_flex',
        'name': 'Megachad Infinite Flex Brawler',
        'description': 'Utilizes the Flex invulnerability cooldown reduction to maintain near 100% damage immunity and 100% uptime on the +2.5% flexing damage multiplier.',
        'character': 'Megachad',
        'weapons': ['Aura', 'Axe', 'Dragon\'s Breath', 'Chunkers'],
        'tomes': ['Damage Tome', 'Size Tome', 'Armor Tome', 'Cooldown Tome'],
        'keyItems': ['Gym Sauce', 'Beefy Ring', 'Oats', 'Big Bonk'],
        'difficulty': 'Beginner Friendly'
    }
]

# 6. Damage Brackets Reference
damage_brackets = [
    {
        'bracket': 1,
        'name': 'Damage Tome Universal',
        'description': 'The universal Damage Tome multiplier. Multiplies with all other brackets.',
        'formula': '1 + (DamageTomeLevel * 0.12)'
    },
    {
        'bracket': 2,
        'name': 'Character Passive Multiplier',
        'description': 'Character-specific scaling (e.g. Noelle frozen multiplier, Ogre warrior passive, Robinette gold scaling).',
        'formula': '1 + PassiveBonus'
    },
    {
        'bracket': 3,
        'name': 'Flat Damage Upgrades',
        'description': 'Additive category for flat item damage: Gym Sauce (+10%), Brass Knuckles (+20%), Idle Juice.',
        'formula': '1 + Sum(FlatDamageItems)'
    },
    {
        'bracket': 4,
        'name': 'Main "Damage %" Multiplier',
        'description': 'Multiplicative bracket for Tactical Glasses, Boss Buster, Beer, Demonic Soul, Big Bonk.',
        'formula': '1 + Sum(PctDamageItems)'
    },
    {
        'bracket': 5,
        'name': 'Speed & Conditional Scaling',
        'description': 'Speed-to-damage (Speedy Boi, Calcium Speed Demon, Airborne damage).',
        'formula': '1 + ConditionalBonus'
    },
    {
        'bracket': 6,
        'name': 'Attack Speed / Fire Rate',
        'description': 'Cooldown Tome and Attack Speed items (Battery, Turbo Skates). Directly scales attacks/sec.',
        'formula': 'BaseRate * (1 + AttackSpeedBonus / 100)'
    },
    {
        'bracket': 7,
        'name': 'Critical Expectation & Overcrit',
        'description': 'Precision Tome, Forbidden Juice, Giant Fork. Scales through Overcrit (Tier 1 & Tier 2).',
        'formula': '1 + (CritChance% * (CritDamageMult - 1)) + OvercritBonus'
    },
    {
        'bracket': 8,
        'name': 'Projectiles, AoE Size & Duration',
        'description': 'Quantity Tome, Backpack, Size Tome, Duration Tome. Only applies to weapons tagged with these stats!',
        'formula': 'Projectiles * (1 + SizeBonus) * (1 + DurationBonus)'
    }
]

database = {
    'characters': characters,
    'weapons': weapons,
    'tomes': tomes,
    'items': items,
    'metaBuilds': meta_builds,
    'damageBrackets': damage_brackets
}

with open('megabonk_data.json', 'w', encoding='utf-8') as f:
    json.dump(database, f, indent=2)

print('Built full database megabonk_data.json successfully!')
print(f'Total: {len(characters)} Characters, {len(weapons)} Weapons, {len(tomes)} Tomes, {len(items)} Items, {len(meta_builds)} Meta Builds.')
