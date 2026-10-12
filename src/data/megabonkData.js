// Megabonk Complete Database
export const db = {
  "characters": [
    {
      "id": "fox",
      "name": "Fox",
      "startingWeapon": "Firestaff",
      "passive": "RNG Blessing: Gain 2% Luck per level.",
      "passiveScaling": {
        "luckPerLevel": 2.0
      },
      "prereq": "Unlocked by Default",
      "silverCost": "Unlocked by Default",
      "stats": {
        "maxHp": 100.0,
        "hpRegen": 10.0,
        "overheal": 0.0,
        "shield": 0.0,
        "armor": 0.0,
        "evasion": 6.0,
        "lifesteal": 0.0,
        "thorns": 0.0,
        "damage": 1.0,
        "critChance": 1.0,
        "critDamage": 2.0,
        "attackSpeed": 100.0,
        "projectileCount": 0,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 1.0,
        "extraJumps": 0,
        "luck": 15.0,
        "pickupRange": 9.0,
        "xpGain": 1.0,
        "goldGain": 1.0,
        "silverGain": 1.0
      },
      "archetypes": [
        "Meta Economy & Luck"
      ]
    },
    {
      "id": "sir_oofie",
      "name": "Sir Oofie",
      "startingWeapon": "Sword",
      "passive": "Reinforced: Gain 1% Armor per level.",
      "passiveScaling": {
        "armorPerLevel": 1.0
      },
      "prereq": "Unlocked by Default",
      "silverCost": "Unlocked by Default",
      "stats": {
        "maxHp": 150.0,
        "hpRegen": 10.0,
        "overheal": 0.0,
        "shield": 0.0,
        "armor": 17.0,
        "evasion": 1.0,
        "lifesteal": 0.0,
        "thorns": 0.0,
        "damage": 1.0,
        "critChance": 1.0,
        "critDamage": 2.0,
        "attackSpeed": 100.0,
        "projectileCount": 0,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 1.0,
        "extraJumps": 0,
        "luck": 0.0,
        "pickupRange": 5.0,
        "xpGain": 1.0,
        "goldGain": 1.0,
        "silverGain": 1.0
      },
      "archetypes": [
        "Tank & Thorns"
      ]
    },
    {
      "id": "calcium",
      "name": "Calcium",
      "startingWeapon": "Bone",
      "passive": "Speed Demon: Speed builds up over time, but is halved when you take damage. Also gain damage based on speed.",
      "passiveScaling": {
        "speedToDamage": 0.5
      },
      "prereq": "Kill 1,000 Skeletons Buy Bone",
      "silverCost": "9",
      "stats": {
        "maxHp": 100.0,
        "hpRegen": 10.0,
        "overheal": 0.0,
        "shield": 0.0,
        "armor": 0.0,
        "evasion": 1.0,
        "lifesteal": 0.0,
        "thorns": 0.0,
        "damage": 1.0,
        "critChance": 1.0,
        "critDamage": 2.0,
        "attackSpeed": 100.0,
        "projectileCount": 0,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 1.2,
        "extraJumps": 0,
        "luck": 0.0,
        "pickupRange": 8.0,
        "xpGain": 1.0,
        "goldGain": 1.0,
        "silverGain": 1.0
      },
      "archetypes": [
        "Speed & Scaling"
      ]
    },
    {
      "id": "megachad",
      "name": "Megachad",
      "startingWeapon": "Aura",
      "passive": "Flex: Flex to stop damage. Cooldown -0.2s per level. Gain 2.5% Damage when flexing.",
      "passiveScaling": {
        "flexDamage": 2.5
      },
      "prereq": "Get the Damage Tome to level 7",
      "silverCost": "10",
      "stats": {
        "maxHp": 120.0,
        "hpRegen": 10.0,
        "overheal": 0.0,
        "shield": 0.0,
        "armor": 0.0,
        "evasion": 1.0,
        "lifesteal": 0.0,
        "thorns": 0.0,
        "damage": 1.0,
        "critChance": 1.0,
        "critDamage": 2.0,
        "attackSpeed": 100.0,
        "projectileCount": 0,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 1.0,
        "extraJumps": 0,
        "luck": 0.0,
        "pickupRange": 5.0,
        "xpGain": 1.0,
        "goldGain": 1.0,
        "silverGain": 1.0
      },
      "archetypes": [
        "AoE & Brawler"
      ]
    },
    {
      "id": "ogre",
      "name": "Ogre",
      "startingWeapon": "Axe",
      "passive": "Warrior: Gain 1.5% Damage per level.",
      "passiveScaling": {
        "damagePerLevel": 1.5
      },
      "prereq": "Kill 15,000 Goblins Buy Axe",
      "silverCost": "12",
      "stats": {
        "maxHp": 140.0,
        "hpRegen": 10.0,
        "overheal": 0.0,
        "shield": 0.0,
        "armor": 6.0,
        "evasion": 1.0,
        "lifesteal": 0.0,
        "thorns": 0.0,
        "damage": 1.1,
        "critChance": 1.0,
        "critDamage": 2.0,
        "attackSpeed": 100.0,
        "projectileCount": 0,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 0.9,
        "extraJumps": 0,
        "luck": -1.0,
        "pickupRange": 5.0,
        "xpGain": 1.0,
        "goldGain": 1.0,
        "silverGain": 1.0
      },
      "archetypes": [
        "AoE & Brawler"
      ]
    },
    {
      "id": "cl4nk",
      "name": "CL4NK",
      "startingWeapon": "Revolver",
      "passive": "Crit Happens: Gain 1% Crit Chance per level.",
      "passiveScaling": {
        "critChancePerLevel": 1.0
      },
      "prereq": "Complete Forest Tier 1 Buy Revolver",
      "silverCost": "14",
      "stats": {
        "maxHp": 40.0,
        "hpRegen": 10.0,
        "overheal": 0.0,
        "shield": 50.0,
        "armor": 0.0,
        "evasion": 1.0,
        "lifesteal": 0.0,
        "thorns": 0.0,
        "damage": 1.0,
        "critChance": 1.0,
        "critDamage": 2.0,
        "attackSpeed": 100.0,
        "projectileCount": 0,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 1.1,
        "extraJumps": 0,
        "luck": 0.0,
        "pickupRange": 8.0,
        "xpGain": 1.0,
        "goldGain": 1.0,
        "silverGain": 1.0
      },
      "archetypes": [
        "Crit & Burst"
      ]
    },
    {
      "id": "athena",
      "name": "Athena",
      "startingWeapon": "Aegis",
      "passive": "Lock in: Deal more damage on lower HP. Gain 2 Thorns per level.",
      "passiveScaling": {
        "thornsPerLevel": 2.0
      },
      "prereq": "Get the Thornes Tome to level 9 Buy Aegis",
      "silverCost": "16",
      "stats": {
        "maxHp": 125.0,
        "hpRegen": 10.0,
        "overheal": 0.0,
        "shield": 0.0,
        "armor": 17.0,
        "evasion": 1.0,
        "lifesteal": 0.0,
        "thorns": 5.0,
        "damage": 1.0,
        "critChance": 1.0,
        "critDamage": 2.0,
        "attackSpeed": 25091193.0,
        "projectileCount": 0,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 1.0,
        "extraJumps": 0,
        "luck": 0.0,
        "pickupRange": 5.0,
        "xpGain": 1.0,
        "goldGain": 1.0,
        "silverGain": 1.0
      },
      "archetypes": [
        "Tank & Thorns"
      ]
    },
    {
      "id": "robinette",
      "name": "Robinette",
      "startingWeapon": "Bow",
      "passive": "Stonks: Gain 1% Gold Gain per level. Also increase Damage slightly by total Gold in inventory.",
      "passiveScaling": {
        "goldGainPerLevel": 1.0,
        "damagePerGold": 0.0005
      },
      "prereq": "Complete Forest Tier 2 Buy Bow",
      "silverCost": "",
      "stats": {
        "maxHp": 100.0,
        "hpRegen": 10.0,
        "overheal": 0.0,
        "shield": 0.0,
        "armor": 0.0,
        "evasion": 1.0,
        "lifesteal": 0.0,
        "thorns": 0.0,
        "damage": 1.0,
        "critChance": 1.0,
        "critDamage": 2.0,
        "attackSpeed": 100.0,
        "projectileCount": 0,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 1.1,
        "extraJumps": 0,
        "luck": 0.0,
        "pickupRange": 8.0,
        "xpGain": 1.0,
        "goldGain": 1.0,
        "silverGain": 1.0
      },
      "archetypes": [
        "Speed & Scaling"
      ]
    },
    {
      "id": "monke",
      "name": "Monke",
      "startingWeapon": "Bananarang",
      "passive": "Monke Grip: Climb up walls. Also gain +2 Max HP per level.",
      "passiveScaling": {
        "maxHpPerLevel": 2.0
      },
      "prereq": "Find and Release Monke in the Forest",
      "silverCost": "18",
      "stats": {
        "maxHp": 135.0,
        "hpRegen": 10.0,
        "overheal": 0.0,
        "shield": 0.0,
        "armor": 0.0,
        "evasion": 1.0,
        "lifesteal": 0.0,
        "thorns": 0.0,
        "damage": 1.2,
        "critChance": 1.0,
        "critDamage": 2.0,
        "attackSpeed": 100.0,
        "projectileCount": 0,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 1.0,
        "extraJumps": 0,
        "luck": 0.0,
        "pickupRange": 5.0,
        "xpGain": 1.0,
        "goldGain": 1.0,
        "silverGain": 1.0
      },
      "archetypes": [
        "Tank & Thorns"
      ]
    },
    {
      "id": "tony_mczoom",
      "name": "Tony McZoom",
      "startingWeapon": "Wireless Dagger",
      "passive": "Zap: Charge an electric attack by moving around. Gain 2% pickup range per level.",
      "passiveScaling": {
        "pickupRangePerLevel": 2.0
      },
      "prereq": "Complete 2 Challenges Buy Wireless Dagger",
      "silverCost": "19",
      "stats": {
        "maxHp": 70.0,
        "hpRegen": 10.0,
        "overheal": 0.0,
        "shield": 10.0,
        "armor": 0.0,
        "evasion": 1.0,
        "lifesteal": 0.0,
        "thorns": 0.0,
        "damage": 1.0,
        "critChance": 1.0,
        "critDamage": 2.0,
        "attackSpeed": 100.0,
        "projectileCount": 0,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 1.3,
        "extraJumps": 0,
        "luck": 0.0,
        "pickupRange": 8.0,
        "xpGain": 1.0,
        "goldGain": 1.0,
        "silverGain": 1.0
      },
      "archetypes": [
        "Speed & Scaling"
      ]
    },
    {
      "id": "bush",
      "name": "Bush",
      "startingWeapon": "Sniper Rifle",
      "passive": "Bullseye: Random enemies are marked. Also gain 1% Crit Damage per level.",
      "passiveScaling": {
        "damagePerLevel": 1.5,
        "critDamagePerLevel": 1.0
      },
      "prereq": "Find and Defeat Bush in the Forest Buy Sniper Rifle",
      "silverCost": "21",
      "stats": {
        "maxHp": 100,
        "hpRegen": 10,
        "overheal": 0,
        "shield": 0,
        "armor": 0,
        "evasion": 0,
        "lifesteal": 0,
        "thorns": 0,
        "damage": 1.0,
        "critChance": 5,
        "critDamage": 2.0,
        "attackSpeed": 100,
        "projectileCount": 1,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 1.0,
        "extraJumps": 0,
        "luck": 0,
        "pickupRange": 1.0,
        "xpGain": 1.0,
        "goldGain": 1.0,
        "silverGain": 1.0
      },
      "archetypes": [
        "Crit & Burst"
      ]
    },
    {
      "id": "birdo",
      "name": "Birdo",
      "startingWeapon": "Tornado",
      "passive": "Float: Hold \"Jump\" to float in the air. Also gain 1% Airborne Damage per level.",
      "passiveScaling": {
        "damagePerLevel": 1.5
      },
      "prereq": "Kill 100 enemies using Tornado weapon while carried by a tornado on Desert Buy Tornado",
      "silverCost": "",
      "stats": {
        "maxHp": 100.0,
        "hpRegen": 10.0,
        "overheal": 0.0,
        "shield": 0.0,
        "armor": 0.0,
        "evasion": 1.0,
        "lifesteal": 0.0,
        "thorns": 0.0,
        "damage": 1.0,
        "critChance": 1.0,
        "critDamage": 2.0,
        "attackSpeed": 100.0,
        "projectileCount": 0,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 1.1,
        "extraJumps": 1,
        "luck": 0.0,
        "pickupRange": 10.0,
        "xpGain": 1.0,
        "goldGain": 1.0,
        "silverGain": 1.0
      },
      "archetypes": []
    },
    {
      "id": "noelle",
      "name": "Noelle",
      "startingWeapon": "Frostwalker",
      "passive": "Enduring: Gain 1% Size per Level. Also increase Damage per currently frozen enemy.",
      "passiveScaling": {
        "sizePerLevel": 1.0
      },
      "prereq": "Use a Microwave to duplicate Ice Crystal 3 times in a row Buy Frostwalker",
      "silverCost": "",
      "stats": {
        "maxHp": 100.0,
        "hpRegen": 10.0,
        "overheal": 0.0,
        "shield": 0.0,
        "armor": 0.0,
        "evasion": 6.0,
        "lifesteal": 0.0,
        "thorns": 0.0,
        "damage": 1.0,
        "critChance": 1.0,
        "critDamage": 2.0,
        "attackSpeed": 100.0,
        "projectileCount": 0,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 1.1,
        "extraJumps": 0,
        "luck": 0.0,
        "pickupRange": 10.0,
        "xpGain": 1.0,
        "goldGain": 1.0,
        "silverGain": 1.0
      },
      "archetypes": [
        "AoE & Brawler"
      ]
    },
    {
      "id": "amog",
      "name": "Amog",
      "startingWeapon": "Poison Flask",
      "passive": "Plague: Poisoned enemies explode on death, poisoning nearby enemies.",
      "passiveScaling": {},
      "prereq": "Posion 50.000 enemies with Moldy Cheese Buy Poison Flash",
      "silverCost": "26",
      "stats": {
        "maxHp": 100,
        "hpRegen": 10,
        "overheal": 0,
        "shield": 0,
        "armor": 0,
        "evasion": 0,
        "lifesteal": 0,
        "thorns": 0,
        "damage": 1.0,
        "critChance": 5,
        "critDamage": 2.0,
        "attackSpeed": 100,
        "projectileCount": 1,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 1.0,
        "extraJumps": 0,
        "luck": 0,
        "pickupRange": 1.0,
        "xpGain": 1.0,
        "goldGain": 1.0,
        "silverGain": 1.0
      },
      "archetypes": [
        "DoT & Drain"
      ]
    },
    {
      "id": "spaceman",
      "name": "Spaceman",
      "startingWeapon": "Blackhole",
      "passive": "Quantum XP Theory: Gain 1% XP Gain per level.",
      "passiveScaling": {
        "xpGainPerLevel": 1.0
      },
      "prereq": "Complete 6 Challenges Buy Blackhole",
      "silverCost": "28",
      "stats": {
        "maxHp": 100,
        "hpRegen": 10,
        "overheal": 0,
        "shield": 0,
        "armor": 0,
        "evasion": 0,
        "lifesteal": 0,
        "thorns": 0,
        "damage": 1.0,
        "critChance": 5,
        "critDamage": 2.0,
        "attackSpeed": 100,
        "projectileCount": 1,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 1.0,
        "extraJumps": 0,
        "luck": 0,
        "pickupRange": 1.0,
        "xpGain": 1.0,
        "goldGain": 1.0,
        "silverGain": 1.0
      },
      "archetypes": [
        "Meta Economy & Luck"
      ]
    },
    {
      "id": "bandit",
      "name": "Bandit",
      "startingWeapon": "Dexecutioner",
      "passive": "Flowstate: Gain 1% Attack Speed per level.",
      "passiveScaling": {
        "attackSpeedPerLevel": 1.0
      },
      "prereq": "Find and Defeat Bandit in the Desert Buy Dexecutioner",
      "silverCost": "30",
      "stats": {
        "maxHp": 100,
        "hpRegen": 10,
        "overheal": 0,
        "shield": 0,
        "armor": 0,
        "evasion": 0,
        "lifesteal": 0,
        "thorns": 0,
        "damage": 1.0,
        "critChance": 5,
        "critDamage": 2.0,
        "attackSpeed": 100,
        "projectileCount": 1,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 1.0,
        "extraJumps": 0,
        "luck": 0,
        "pickupRange": 1.0,
        "xpGain": 1.0,
        "goldGain": 1.0,
        "silverGain": 1.0
      },
      "archetypes": [
        "Crit & Burst"
      ]
    },
    {
      "id": "ninja",
      "name": "Ninja",
      "startingWeapon": "Katana",
      "passive": "Shadowstep: Execute an enemy upon evading them. Also gain 0.5% Evasion per level.",
      "passiveScaling": {
        "evasionPerLevel": 0.5
      },
      "prereq": "Complete Desert Tier 1 Buy Katana",
      "silverCost": "32",
      "stats": {
        "maxHp": 100.0,
        "hpRegen": 10.0,
        "overheal": 0.0,
        "shield": 0.0,
        "armor": 0.0,
        "evasion": 6.0,
        "lifesteal": 0.0,
        "thorns": 0.0,
        "damage": 1.0,
        "critChance": 1.0,
        "critDamage": 2.0,
        "attackSpeed": 100.0,
        "projectileCount": 0,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 1.2,
        "extraJumps": 0,
        "luck": 0.0,
        "pickupRange": 8.0,
        "xpGain": 1.0,
        "goldGain": 1.0,
        "silverGain": 1.0
      },
      "archetypes": [
        "Crit & Burst"
      ]
    },
    {
      "id": "vlad",
      "name": "Vlad",
      "startingWeapon": "Blood Magic",
      "passive": "Vampire: Gain 1% Lifesteal per level.",
      "passiveScaling": {
        "lifestealPerLevel": 1.0
      },
      "prereq": "Complete Desert Tier 2 Buy Blood Magic",
      "silverCost": "32",
      "stats": {
        "maxHp": 100.0,
        "hpRegen": 10.0,
        "overheal": 0.0,
        "shield": 0.0,
        "armor": 0.0,
        "evasion": 0.0,
        "lifesteal": 0.0,
        "thorns": 0.0,
        "damage": 1.0,
        "critChance": 5.0,
        "critDamage": 2.0,
        "attackSpeed": 100.0,
        "projectileCount": 1,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 1.0,
        "extraJumps": 0,
        "luck": 0.0,
        "pickupRange": 1.0,
        "xpGain": 1.0,
        "goldGain": 1.0,
        "silverGain": 1.0
      },
      "archetypes": [
        "DoT & Drain"
      ]
    },
    {
      "id": "sir_chadwell",
      "name": "Sir Chadwell",
      "startingWeapon": "Corrupted Sword",
      "passive": "Gain 1% Difficulty per level.",
      "passiveScaling": {},
      "prereq": "Complete Forest Tier 3 Buy Corrupted Sword",
      "silverCost": "33",
      "stats": {
        "maxHp": 100,
        "hpRegen": 10,
        "overheal": 0,
        "shield": 0,
        "armor": 0,
        "evasion": 0,
        "lifesteal": 0,
        "thorns": 0,
        "damage": 1.0,
        "critChance": 5,
        "critDamage": 2.0,
        "attackSpeed": 100,
        "projectileCount": 1,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 1.0,
        "extraJumps": 0,
        "luck": 0,
        "pickupRange": 1.0,
        "xpGain": 1.0,
        "goldGain": 1.0,
        "silverGain": 1.0
      },
      "archetypes": []
    },
    {
      "id": "dicehead",
      "name": "Dicehead",
      "startingWeapon": "Dice",
      "passive": "Gamba: Gain a Random Stat per level.",
      "passiveScaling": {
        "randomStatPerLevel": true
      },
      "prereq": "Complete 100 Quests Buy Dice",
      "silverCost": "",
      "stats": {
        "maxHp": 100.0,
        "hpRegen": 10.0,
        "overheal": 0.0,
        "shield": 0.0,
        "armor": 0.0,
        "evasion": 6.0,
        "lifesteal": 0.0,
        "thorns": 0.0,
        "damage": 1.0,
        "critChance": 6.0,
        "critDamage": 2.0,
        "attackSpeed": 100.0,
        "projectileCount": 0,
        "projectileBounces": 0,
        "size": 1.0,
        "projectileSpeed": 1.0,
        "duration": 1.0,
        "damageToElites": 1.0,
        "knockback": 1.0,
        "movementSpeed": 1.0,
        "extraJumps": 0,
        "luck": 0.0,
        "pickupRange": 10.0,
        "xpGain": 1.0,
        "goldGain": 1.1,
        "silverGain": 1.0
      },
      "archetypes": [
        "Meta Economy & Luck"
      ]
    }
  ],
  "weapons": [
    {
      "id": "flamewalker",
      "name": "Flamewalker",
      "description": "Leaves a trail of fire behind you.",
      "unlock": "Unlocked by default",
      "category": "DoT / Hazard",
      "affectedBy": [
        "Size",
        "Projectile Count",
        "Duration",
        "Damage"
      ],
      "baseDamage": 25,
      "baseCooldown": 1.0,
      "baseProjectiles": 1,
      "tier": "S"
    },
    {
      "id": "sword",
      "name": "Sword",
      "description": "Slashes through multiple enemies.",
      "unlock": "Unlocked by default",
      "category": "Melee",
      "affectedBy": [
        "Size",
        "Projectile Count",
        "Damage",
        "Knockback"
      ],
      "baseDamage": 35,
      "baseCooldown": 0.9,
      "baseProjectiles": 1,
      "tier": "B"
    },
    {
      "id": "lightning_staff",
      "name": "Lightning Staff",
      "description": "Summons lightning to smite nearby enemies.",
      "unlock": "Unlocked by default",
      "category": "Ranged",
      "affectedBy": [
        "Damage",
        "Projectile Bounces",
        "Projectile Count",
        "Size"
      ],
      "baseDamage": 40,
      "baseCooldown": 1.2,
      "baseProjectiles": 1,
      "tier": "A"
    },
    {
      "id": "firestaff",
      "name": "Firestaff",
      "description": "Shoots fireballs that explode on impact.",
      "unlock": "Unlocked by default",
      "category": "Ranged",
      "affectedBy": [
        "Projectile Speed",
        "Size",
        "Damage",
        "Projectile Count"
      ],
      "baseDamage": 40,
      "baseCooldown": 1.2,
      "baseProjectiles": 1,
      "tier": "A"
    },
    {
      "id": "chunkers",
      "name": "Chunkers",
      "description": "Summons Chunky rocks that orbit around you.",
      "unlock": "Unlocked by default",
      "category": "Orbit / Control",
      "affectedBy": [
        "Size",
        "Damage",
        "Knockback",
        "Projectile Speed",
        "Projectile Count"
      ],
      "baseDamage": 25,
      "baseCooldown": 1.0,
      "baseProjectiles": 1,
      "tier": "A"
    },
    {
      "id": "bone",
      "name": "Bone",
      "description": "Throws bones that bounce off enemies.",
      "unlock": "Unlocked by default",
      "category": "Ranged",
      "affectedBy": [
        "Damage",
        "Projectile Bounces",
        "Projectile Speed",
        "Knockback",
        "Projectile Count"
      ],
      "baseDamage": 25,
      "baseCooldown": 1.0,
      "baseProjectiles": 1,
      "tier": "B"
    },
    {
      "id": "bow",
      "name": "Bow",
      "description": "Shoots arrows that pierce enemies.",
      "unlock": "Unlocked by default",
      "category": "Ranged",
      "affectedBy": [
        "Crit Chance",
        "Crit Damage",
        "Damage",
        "Projectile Count",
        "Projectile Speed",
        "Size"
      ],
      "baseDamage": 20,
      "baseCooldown": 0.8,
      "baseProjectiles": 1,
      "tier": "S"
    },
    {
      "id": "revolver",
      "name": "Revolver",
      "description": "Fires multiple bullets at enemies.",
      "unlock": "Kill 7.500 enemies",
      "category": "Ranged",
      "affectedBy": [
        "Crit Chance",
        "Crit Damage",
        "Damage",
        "Projectile Bounces",
        "Projectile Count",
        "Projectile Speed"
      ],
      "baseDamage": 20,
      "baseCooldown": 0.8,
      "baseProjectiles": 1,
      "tier": "S"
    },
    {
      "id": "aegis",
      "name": "Aegis",
      "description": "Blocks incoming attacks and sends out shockwaves.",
      "unlock": "Block 500 damage with armor as sir Oofie",
      "category": "Defensive Counter",
      "affectedBy": [
        "Projectile Count",
        "Size",
        "Damage",
        "Knockback"
      ],
      "baseDamage": 25,
      "baseCooldown": 1.0,
      "baseProjectiles": 1,
      "tier": "B"
    },
    {
      "id": "bananarang",
      "name": "Bananarang",
      "description": "Throws bananas that return to the owner.",
      "unlock": "Find the hidden Banana",
      "category": "Ranged",
      "affectedBy": [
        "Damage",
        "Projectile Count",
        "Projectile Speed",
        "Size"
      ],
      "baseDamage": 25,
      "baseCooldown": 1.0,
      "baseProjectiles": 1,
      "tier": "B"
    },
    {
      "id": "aura",
      "name": "Aura",
      "description": "Damage enemies in an area around you.",
      "unlock": "Don't take any damage for 2 minutes",
      "category": "Area Aura",
      "affectedBy": [
        "Damage",
        "Size"
      ],
      "baseDamage": 15,
      "baseCooldown": 0.5,
      "baseProjectiles": 1,
      "tier": "S"
    },
    {
      "id": "axe",
      "name": "Axe",
      "description": "Throws spinning axes that deal area-damage.",
      "unlock": "Kill 2.000 enemies using the Sword",
      "category": "Melee",
      "affectedBy": [
        "Projectile Count",
        "Duration",
        "Damage",
        "Size"
      ],
      "baseDamage": 25,
      "baseCooldown": 1.0,
      "baseProjectiles": 1,
      "tier": "A"
    },
    {
      "id": "space_noodle",
      "name": "Space Noodle",
      "description": "attaches to a nearby enemy. Deals damage to enemies in-between.",
      "unlock": "Complete Desert Tier 2 as Tony McZoom",
      "category": "Ranged",
      "affectedBy": [
        "Damage",
        "Size",
        "Duration"
      ],
      "baseDamage": 25,
      "baseCooldown": 1.0,
      "baseProjectiles": 1,
      "tier": "B"
    },
    {
      "id": "sniper_rifle",
      "name": "Sniper Rifle",
      "description": "Fires piercing bullets. Can be manually aimed.",
      "unlock": "Get Precision Tome to Level 10",
      "category": "Ranged",
      "affectedBy": [
        "Damage",
        "Projectile Count",
        "Size"
      ],
      "baseDamage": 70,
      "baseCooldown": 2.2,
      "baseProjectiles": 1,
      "tier": "B"
    },
    {
      "id": "slutty_rocket",
      "name": "Slutty Rocket",
      "description": "Fires Homing Missiles.",
      "unlock": "Kill 15.000 enemies as CL4NK",
      "category": "Ranged",
      "affectedBy": [
        "Projectile Speed",
        "Projectile Count",
        "Damage",
        "Crit Chance"
      ],
      "baseDamage": 70,
      "baseCooldown": 2.2,
      "baseProjectiles": 1,
      "tier": "B"
    },
    {
      "id": "shotgun",
      "name": "Shotgun",
      "description": "Fires a spread shot, stronger at close range. Can be manually aimed.",
      "unlock": "5% chance to find upon breaking a Tumbleweed on Desert Stage 2",
      "category": "Ranged",
      "affectedBy": [
        "Crit Chance",
        "Damage",
        "Knockback",
        "Projectile Count",
        "Size"
      ],
      "baseDamage": 20,
      "baseCooldown": 0.8,
      "baseProjectiles": 3,
      "tier": "A"
    },
    {
      "id": "mines",
      "name": "Mines",
      "description": "Deploys mines around you that explode when enemies get close.",
      "unlock": "Kill 7.500 enemies with Slutty Rocket",
      "category": "DoT / Hazard",
      "affectedBy": [
        "Duration",
        "Damage",
        "Size",
        "Projectile Count"
      ],
      "baseDamage": 25,
      "baseCooldown": 1.0,
      "baseProjectiles": 1,
      "tier": "B"
    },
    {
      "id": "wireless_dagger",
      "name": "Wireless Dagger",
      "description": "Fires smart daggers at your enemies. Wireless tech goes crazy these days.",
      "unlock": "Get the Lightning Staff to level 15",
      "category": "Ranged",
      "affectedBy": [
        "Projectile Count",
        "Projectile Speed",
        "Damage",
        "Projectile Bounces"
      ],
      "baseDamage": 25,
      "baseCooldown": 1.0,
      "baseProjectiles": 1,
      "tier": "B"
    },
    {
      "id": "frostwalker",
      "name": "Frostwalker",
      "description": "Freezes and damages enemies in an area around you.",
      "unlock": "Freeze 1.000 enemies with the Ice Cube",
      "category": "Area Aura",
      "affectedBy": [
        "Damage",
        "Size",
        "Duration"
      ],
      "baseDamage": 15,
      "baseCooldown": 0.5,
      "baseProjectiles": 1,
      "tier": "B"
    },
    {
      "id": "tornado",
      "name": "Tornado",
      "description": "Sends out tornadoes, knocking enemies back.",
      "unlock": "Charge a Charge Shrine during a Sandstorm on Desert",
      "category": "Ranged",
      "affectedBy": [
        "Knockback",
        "Damage",
        "Size",
        "Projectile Speed",
        "Projectile Count"
      ],
      "baseDamage": 25,
      "baseCooldown": 1.0,
      "baseProjectiles": 1,
      "tier": "B"
    },
    {
      "id": "dexecutioner",
      "name": "Dexecutioner",
      "description": "A piercing blade. Small chance to instantly execute an enemy.",
      "unlock": "Kill 12,500 enemies using the Sword",
      "category": "Ranged",
      "affectedBy": [
        "Crit Chance",
        "Damage",
        "Size",
        "Projectile Count"
      ],
      "baseDamage": 70,
      "baseCooldown": 2.2,
      "baseProjectiles": 1,
      "tier": "S"
    },
    {
      "id": "blood_magic",
      "name": "Blood Magic",
      "description": "Summons blood magic. 5% chance to increase Max HP upon killing enemies.",
      "unlock": "Get the Bloody Tome to level 12",
      "category": "Ranged",
      "affectedBy": [
        "Damage",
        "Projectile Count",
        "Size"
      ],
      "baseDamage": 25,
      "baseCooldown": 1.0,
      "baseProjectiles": 1,
      "tier": "B"
    },
    {
      "id": "black_hole",
      "name": "Black Hole",
      "description": "Shoots a black hole that pulls enemies in.",
      "unlock": "Get Knockback Tome to level 10",
      "category": "Orbit / Control",
      "affectedBy": [
        "Duration",
        "Damage",
        "Size",
        "Projectile Count"
      ],
      "baseDamage": 25,
      "baseCooldown": 1.0,
      "baseProjectiles": 1,
      "tier": "B"
    },
    {
      "id": "poison_flask",
      "name": "Poison Flask",
      "description": "Throws toxic flasks on enemies, dealing area-damage and poisoning them.",
      "unlock": "Kill Scorpionussy Miniboss on Desert 3 times",
      "category": "DoT / Hazard",
      "affectedBy": [
        "Damage",
        "Duration",
        "Projectile Count",
        "Projectile Speed",
        "Size"
      ],
      "baseDamage": 25,
      "baseCooldown": 1.0,
      "baseProjectiles": 1,
      "tier": "B"
    },
    {
      "id": "katana",
      "name": "Katana",
      "description": "A Sharp Blade that targets the closest enemy.",
      "unlock": "5% chance to find upon breaking a Tumbleweed on Desert Stage 1",
      "category": "Melee",
      "affectedBy": [
        "Size",
        "Duration",
        "Projectile Count",
        "Damage",
        "Critical Chance",
        "Critical Damage"
      ],
      "baseDamage": 35,
      "baseCooldown": 0.9,
      "baseProjectiles": 1,
      "tier": "S"
    },
    {
      "id": "dragons_breath",
      "name": "Dragon's Breath",
      "description": "Fires a fierce dragon's breath in the movement direction.",
      "unlock": "Kill 1.000 Wisp as Fox on Desert",
      "category": "Area Aura",
      "affectedBy": [
        "Damage",
        "Duration",
        "Size"
      ],
      "baseDamage": 25,
      "baseCooldown": 1.0,
      "baseProjectiles": 1,
      "tier": "A"
    },
    {
      "id": "dice",
      "name": "Dice",
      "description": "Throw dice that deal 1-6 damage. Rolling a 6 increases the weapons Crit Chance permanently.",
      "unlock": "Get Luck Tome to level 12",
      "category": "Ranged",
      "affectedBy": [
        "Size",
        "Crit Chance",
        "Damage",
        "Crit Damage",
        "Projectile Speed",
        "Projectile Count"
      ],
      "baseDamage": 25,
      "baseCooldown": 1.0,
      "baseProjectiles": 1,
      "tier": "B"
    },
    {
      "id": "hero_sword",
      "name": "Hero Sword",
      "description": "Slashes through multiple enemies and fires a slashing projectile.",
      "unlock": "Defeat a Stage Boss without picking up any items, powerups or using shrines",
      "category": "Melee",
      "affectedBy": [
        "Damage",
        "Projectile Count",
        "Projectile Speed",
        "Size"
      ],
      "baseDamage": 35,
      "baseCooldown": 0.9,
      "baseProjectiles": 1,
      "tier": "B"
    },
    {
      "id": "corrupted_sword",
      "name": "Corrupted Sword",
      "description": "Slashes in both directions. Deals increased damage at low HP.",
      "unlock": "Get Cursed Tome to level 20 in under 10 minutes",
      "category": "Melee",
      "affectedBy": [],
      "baseDamage": 25,
      "baseCooldown": 1.0,
      "baseProjectiles": 1,
      "tier": "B"
    }
  ],
  "tomes": [
    {
      "id": "agility_tome",
      "name": "Agility Tome",
      "ability": "+Movement Speed - How fast you move",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "statTarget": "movementSpeed",
      "perLevel": 10.0,
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "size_tome",
      "name": "Size Tome",
      "ability": "+Size - The size of your attacks, projectiles, explosions, and more",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "statTarget": "size",
      "perLevel": 12.0,
      "bracket": 8,
      "tier": "A"
    },
    {
      "id": "silver_tome",
      "name": "Silver Tome",
      "ability": "+Silver Gain - Gives you more silver from all sources",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "statTarget": "silverGain",
      "perLevel": 15.0,
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "shield_tome",
      "name": "Shield Tome",
      "ability": "+Shield - Shield takes damage instead of losing HP before it breaks. Shield regenerates quickly after not taking damage for a while",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "statTarget": "shield",
      "perLevel": 20.0,
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "regen_tome",
      "name": "Regen Tome",
      "ability": "+HP Regen - The amount of HP you regenerate per minute",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "statTarget": "hpRegen",
      "perLevel": 15.0,
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "projectile_tome",
      "name": "Projectile Tome",
      "ability": "+Projectile Speed - The speed of your projectiles",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "statTarget": "projectileSpeed",
      "perLevel": 15.0,
      "bracket": 8,
      "tier": "B"
    },
    {
      "id": "precision_tome",
      "name": "Precision Tome",
      "ability": "+Crit Chance - Chance to deal critical damage. More than 100% Crit Chance let's you Overcrit, dealing more damage",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "statTarget": "critChance",
      "perLevel": 6.0,
      "bracket": 7,
      "tier": "A"
    },
    {
      "id": "knockback_tome",
      "name": "Knockback Tome",
      "ability": "+Knockback - The distance you push enemies when hitting them",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "statTarget": "knockback",
      "perLevel": 15.0,
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "hp_tome",
      "name": "HP Tome",
      "ability": "+Max HP - Max HP",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "statTarget": "maxHp",
      "perLevel": 25.0,
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "evasion_tome",
      "name": "Evasion Tome",
      "ability": "+Evasion - Evasion is the chance to avoid an attack, taking no damage",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "statTarget": "evasion",
      "perLevel": 5.0,
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "gold_tome",
      "name": "Gold Tome",
      "ability": "+Gold - Gives you more gold from all resources",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "statTarget": "goldGain",
      "perLevel": 15.0,
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "damage_tome",
      "name": "Damage Tome",
      "ability": "+Damage - increases the damage of your attacks",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "statTarget": "damage",
      "perLevel": 12.0,
      "bracket": 1,
      "tier": "S"
    },
    {
      "id": "cooldown_tome",
      "name": "Cooldown Tome",
      "ability": "+Attack Speed - How quickly you shoot projectiles and perform attacks",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "statTarget": "attackSpeed",
      "perLevel": 10.0,
      "bracket": 6,
      "tier": "S"
    },
    {
      "id": "thorns_tome",
      "name": "Thorns Tome",
      "ability": "+Thorns - Deal damage to enemies when they attack you",
      "objective": "Block 250 attacks with Aegis",
      "silverCost": "9",
      "statTarget": "thorns",
      "perLevel": 10.0,
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "quantity_tome",
      "name": "Quantity Tome",
      "ability": "+Projectile Count - Increases the number of attacks/projectiles",
      "objective": "Fire 5,000 projectiles",
      "silverCost": "9",
      "statTarget": "projectileCount",
      "perLevel": 0.5,
      "bracket": 8,
      "tier": "S"
    },
    {
      "id": "bloody_tome",
      "name": "Bloody Tome",
      "ability": "+Lifesteal - Your chance to heal for 1 when you hit an enemy. Over 100% will guarantee 1 heal, and give a chance to heal for a total of 2",
      "objective": "Kill 12,000 enemies",
      "silverCost": "9",
      "statTarget": "lifesteal",
      "perLevel": 4.0,
      "bracket": 0,
      "tier": "A"
    },
    {
      "id": "attraction_tome",
      "name": "Attraction Tome",
      "ability": "+Pickup Range - Pickup Range increases the distance from which you pick up XP",
      "objective": "Use the Shrine of Succ 8 times",
      "silverCost": "9",
      "statTarget": "pickupRange",
      "perLevel": 15.0,
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "armor_tome",
      "name": "Armor Tome",
      "ability": "+Armor - Armor reduces the damage you take",
      "objective": "Kill 5,000 enemies as Sir Oofie",
      "silverCost": "9",
      "statTarget": "armor",
      "perLevel": 6.0,
      "bracket": 0,
      "tier": "S"
    },
    {
      "id": "duration_tome",
      "name": "Duration Tome",
      "ability": "+Duration - The duration of your attacks and projectiles",
      "objective": "Upgrade Axe to level 10",
      "silverCost": "9",
      "statTarget": "duration",
      "perLevel": 12.0,
      "bracket": 8,
      "tier": "A"
    },
    {
      "id": "luck_tome",
      "name": "Luck Tome",
      "ability": "+Luck - Luck increases you chance to get higher tier offers from leveling up, shrines and more",
      "objective": "0.01% chance to drop when killing an enemy",
      "silverCost": "10",
      "statTarget": "luck",
      "perLevel": 8.0,
      "bracket": 0,
      "tier": "S"
    },
    {
      "id": "xp_tome",
      "name": "XP Tome",
      "ability": "+XP Gain - Gives you more XP from all sources",
      "objective": "Break 20 pots in a single run",
      "silverCost": "12",
      "statTarget": "xpGain",
      "perLevel": 12.0,
      "bracket": 0,
      "tier": "S"
    },
    {
      "id": "cursed_tome",
      "name": "Cursed Tome",
      "ability": "+Difficulty - Increases enemy quantity, health, speed, & strength.",
      "objective": "Beat the Stage Boss in under 5 minutes",
      "silverCost": "",
      "statTarget": "difficulty",
      "perLevel": 10.0,
      "bracket": 0,
      "tier": "A"
    },
    {
      "id": "chaos_tome",
      "name": "Chaos Tome",
      "ability": "Boost a random stat",
      "objective": "Charge all Charge Shrines on a Tier 3 run across all 3 stages without leaving the charge zone",
      "silverCost": "",
      "statTarget": "all",
      "perLevel": 5.0,
      "bracket": 0,
      "tier": "B"
    }
  ],
  "items": [
    {
      "id": "moldy_cheese",
      "name": "Moldy Cheese",
      "description": "+40% chance to poison enemies on hit. Moldy Cheese my beloved <3.",
      "rarity": "Common",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {
        "poisonChance": 40.0
      },
      "bracket": 0,
      "tier": "S"
    },
    {
      "id": "borgar",
      "name": "Borgar",
      "description": "+2% chance to spawn Borgar upon killing an enemy.",
      "rarity": "Common",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "wrench",
      "name": "Wrench",
      "description": "Charge Shrine: Charge 4% faster and get 7.5% increased rewards.",
      "rarity": "Common",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "clover",
      "name": "Clover",
      "description": "Increase Luck by +7.5%.",
      "rarity": "Common",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {
        "luck": 7.5
      },
      "bracket": 0,
      "tier": "A"
    },
    {
      "id": "time_bracelet",
      "name": "Time Bracelet",
      "description": "+8% XP Gain . Definitely not just a normal watch.",
      "rarity": "Common",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {
        "xpGain": 8.0
      },
      "bracket": 0,
      "tier": "A"
    },
    {
      "id": "slippery_ring",
      "name": "Slippery Ring",
      "description": "Increase Evasion by +15%.",
      "rarity": "Common",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {
        "evasion": 15.0
      },
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "golden_glove",
      "name": "Golden Glove",
      "description": "Earn +15% more Gold from killing enemies.",
      "rarity": "Common",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "gym_sauce",
      "name": "Gym Sauce",
      "description": "Increase Damage by +10%.",
      "rarity": "Common",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {
        "damagePct": 10.0
      },
      "bracket": 3,
      "tier": "A"
    },
    {
      "id": "oats",
      "name": "Oats",
      "description": "Increase Max HP by +25.",
      "rarity": "Common",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {
        "maxHp": 25.0
      },
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "medkit",
      "name": "Medkit",
      "description": "Increase HP Regen by +35.",
      "rarity": "Common",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {
        "hpRegen": 35.0
      },
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "turbo_socks",
      "name": "Turbo Socks",
      "description": "Increase Movement Speed by +15%.",
      "rarity": "Common",
      "objective": "Upgrade agility tome to Level 5",
      "silverCost": "5",
      "effects": {
        "movementSpeed": 15.0
      },
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "tactical_glasses",
      "name": "Tactical Glasses",
      "description": "+20% more damage to enemies above 90% HP.",
      "rarity": "Common",
      "objective": "Defeat a Miniboss in 25 seconds or less",
      "silverCost": "5",
      "effects": {
        "damagePct": 20.0
      },
      "bracket": 4,
      "tier": "S"
    },
    {
      "id": "battery",
      "name": "Battery",
      "description": "Increase Attack Speed by +8%.",
      "rarity": "Common",
      "objective": "Upgrade Cooldown Tome to level 5",
      "silverCost": "5",
      "effects": {
        "attackSpeed": 8.0
      },
      "bracket": 6,
      "tier": "B"
    },
    {
      "id": "forbidden_juice",
      "name": "Forbidden Juice",
      "description": "Increase Crit Chance by +10%.",
      "rarity": "Common",
      "objective": "Crit 100 times",
      "silverCost": "5",
      "effects": {
        "critChance": 10.0
      },
      "bracket": 7,
      "tier": "A"
    },
    {
      "id": "cursed_doll",
      "name": "Cursed Doll",
      "description": "Curse an enemy, dealing 30% of their Max HP every second.",
      "rarity": "Common",
      "objective": "Die 10 times",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "boss_buster",
      "name": "Boss Buster",
      "description": "+15% more damage to Elites and Bosses.",
      "rarity": "Common",
      "objective": "Defeat a Stage Boss in under 30 seconds of spawning",
      "silverCost": "",
      "effects": {
        "damageToElites": 15.0
      },
      "bracket": 4,
      "tier": "B"
    },
    {
      "id": "key",
      "name": "Key",
      "description": "+10% chance to open chests for free.",
      "rarity": "Common",
      "objective": "Purchase 25 chests",
      "silverCost": "5",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "ice_crystal",
      "name": "ice Crystal",
      "description": "+7.5% chance to freeze enemies upon hitting them.",
      "rarity": "Common",
      "objective": "Get 50 kills with Frostwalker",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "skuleg",
      "name": "Skuleg",
      "description": "Increase Difficulty by +7%.",
      "rarity": "Common",
      "objective": "Obtain 40% Difficulty",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "ghost",
      "name": "Ghost",
      "description": "Using an interactable summons ghosts.",
      "rarity": "Common",
      "objective": "Survive the Final Swarm for 60 seconds",
      "silverCost": "7",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "cactus",
      "name": "Cactus",
      "description": "Shoots out spikes upon taking damage. Damage scales with Thorns .",
      "rarity": "Common",
      "objective": "Kill 100 cactus enemies with Thorns damage",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "credit_card_red",
      "name": "Credit Card (Red)",
      "description": "Increase Damage by +2,5% when opening a chest.",
      "rarity": "Uncommon",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {
        "damagePct": 15.0
      },
      "bracket": 4,
      "tier": "B"
    },
    {
      "id": "golden_shield",
      "name": "Golden Shield",
      "description": "Get extra gold when taking damage.",
      "rarity": "Uncommon",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "thunder_mitts",
      "name": "Thunder Mitts",
      "description": "Upon hitting an enemy, clap their cheeks so hard it generates a lightning strike. 10s cooldown.",
      "rarity": "Uncommon",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "feathers",
      "name": "Feathers",
      "description": "Jump higher and further.",
      "rarity": "Uncommon",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "electric_plug",
      "name": "Electric plug",
      "description": "Upon taking damage, send out an electric shock to nearby enemies.",
      "rarity": "Uncommon",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "cowards_cloak",
      "name": "Coward's cloak",
      "description": "Boost Movement Speed upon taking damage. Also gains +5% Movement Speed.",
      "rarity": "Uncommon",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "unstable_transfusion",
      "name": "Unstable Transfusion",
      "description": "+27% chance to apply a stack of Bloodmark when hitting an enemy.",
      "rarity": "Uncommon",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "beer",
      "name": "Beer",
      "description": "+20% Damage at the cost of -5% Max HP.",
      "rarity": "Uncommon",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {
        "damagePct": 20.0,
        "maxHpPct": -5.0
      },
      "bracket": 4,
      "tier": "A"
    },
    {
      "id": "beacon",
      "name": "Beacon",
      "description": "Charging a Charge Shrine will turn it into a healing zone. Also spawn +2 extra Charge Shrine for future stages.",
      "rarity": "Uncommon",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "backpack",
      "name": "Backpack",
      "description": "+1 Projectile Count for all Weapons.",
      "rarity": "Uncommon",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {
        "projectileCount": 1
      },
      "bracket": 8,
      "tier": "S"
    },
    {
      "id": "phantom_shroud",
      "name": "Phantom Shroud",
      "description": "After evading, deal 2x Damage next attack, and temporarily increase Attack Speed ans Movement Speed.",
      "rarity": "Uncommon",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "campfire",
      "name": "Campfire",
      "description": "Standing still heals you.",
      "rarity": "Uncommon",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "brass_knuckles",
      "name": "Brass Knuckles",
      "description": "Deal +20% more damage to nearby enemies.",
      "rarity": "Uncommon",
      "objective": "Kill 5.000 enemies with the Sword",
      "silverCost": "",
      "effects": {
        "damagePct": 20.0
      },
      "bracket": 3,
      "tier": "B"
    },
    {
      "id": "demonic_blade",
      "name": "Demonic Blade",
      "description": "Crits have a +25% chance to heal you.",
      "rarity": "Uncommon",
      "objective": "Heal for 350HP using Lifesteal",
      "silverCost": "9",
      "effects": {
        "critHealChance": 25.0
      },
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "demonic_blood",
      "name": "Demonic Blood",
      "description": "Increase Max HP by +0,5 per kill (Max 200 stacks).",
      "rarity": "Uncommon",
      "objective": "Increase Max HP with Blood Magic 400 times",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "echo_shard",
      "name": "Echo Shard",
      "description": "+12% chance to spawn an extra XP shard when killing an enemy.",
      "rarity": "Uncommon",
      "objective": "Upgrade XP Tome to Level 8",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "moldy_gloves",
      "name": "Moldy Gloves",
      "description": "Creates a moldy poison cloud upon hittin an enemy. the gloves are covered in a moist, moldy and slimy texture.",
      "rarity": "Uncommon",
      "objective": "Use a Microwave to duplicate Moldy Cheese 3 times in a row",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "golden_sneakers",
      "name": "Golden Sneakers",
      "description": "Earn money by moving around.",
      "rarity": "Uncommon",
      "objective": "Break 150 pots",
      "silverCost": "9",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "idle_juice",
      "name": "Idle Juice",
      "description": "The longer you stand still, the more damage you do. Max +100% damage.",
      "rarity": "Uncommon",
      "objective": "Kill 500 enemies while standing still",
      "silverCost": "10",
      "effects": {
        "damagePct": 35.0
      },
      "bracket": 3,
      "tier": "B"
    },
    {
      "id": "leeching_crystal",
      "name": "Leeching Crystal",
      "description": "+50 Max HP at the cost of -50%HP Regen.",
      "rarity": "Uncommon",
      "objective": "Upgrade Regen Tome to lvl 8",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "kevin",
      "name": "Kevin",
      "description": "Kevin hates you. +25% chance that Kevin will punch you whenever you hit an enemy. Kevin cannot kill you, but he really wants to.",
      "rarity": "Uncommon",
      "objective": "Obtain 3 Leeching Crystal in a run",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "B"
    },
    {
      "id": "beefy_ring",
      "name": "Beefy Ring",
      "description": "Increase damage by +20% per 100 max HP.",
      "rarity": "Rare",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {
        "damagePer100Hp": 20.0
      },
      "bracket": 4,
      "tier": "S"
    },
    {
      "id": "credit_card_green",
      "name": "Credit Card (Green)",
      "description": "Increase Luck by +2% when opening a chest.",
      "rarity": "Rare",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "A"
    },
    {
      "id": "spiky_shield",
      "name": "Spiky Shield",
      "description": "Gain +2 Thorns for every 1% Armor . Also gains 10% Armor.",
      "rarity": "Rare",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {
        "armor": 10.0,
        "thornsPerArmor": 2.0
      },
      "bracket": 0,
      "tier": "A"
    },
    {
      "id": "scarf",
      "name": "Scarf",
      "description": "Deal 50% more Damage while airborne.",
      "rarity": "Rare",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "A"
    },
    {
      "id": "slurp_gloves",
      "name": "Slurp Gloves",
      "description": "Cast blood magic upon hitting an enemy, damaging nearby enemies and healing you for 7.5%. 9s cooldown.",
      "rarity": "Rare",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "A"
    },
    {
      "id": "mirror",
      "name": "Mirror",
      "description": "Reflect any incoming damage back to the attacker, and gain a short invulnerability.",
      "rarity": "Rare",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "A"
    },
    {
      "id": "turbo_skates",
      "name": "Turbo Skates",
      "description": "The faster you move, the more Attack Speed you gain. Max 40% per stack.",
      "rarity": "Rare",
      "objective": "Upgrade both Cooldown Tome and Agility Tome to level 5 in a run",
      "silverCost": "",
      "effects": {
        "attackSpeed": 25.0
      },
      "bracket": 6,
      "tier": "S"
    },
    {
      "id": "slutty_cannon",
      "name": "Slutty Cannon",
      "description": "20% chance to spawn missiles upon killing an enemy.",
      "rarity": "Rare",
      "objective": "Kill 5,000 enemies with Slutty Rocket",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "A"
    },
    {
      "id": "shattered_knowledge",
      "name": "Shattered Knowledge",
      "description": "XP shards now slice through enemies, dealing damage as they pass. Knowledge really hurts.",
      "rarity": "Rare",
      "objective": "Upgrade Attraction Tome to Level 8",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "A"
    },
    {
      "id": "quin\u2019s_mask",
      "name": "Quin\u2019s Mask",
      "description": "Thorns damage has a 50% chance to explode.",
      "rarity": "Rare",
      "objective": "Defeat a Stage Boss as Athena, landing the killing blow with Aegis",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "A"
    },
    {
      "id": "toxic_barrel",
      "name": "Toxic Barrel",
      "description": "Releases a toxic waste upon taking damage, poisoning all nearby enemies.",
      "rarity": "Rare",
      "objective": "Kill 2,000 enemies using Poison damage",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "A"
    },
    {
      "id": "gas_mask",
      "name": "Gas Mask",
      "description": "Gain Armor and Overheal for every enemy infected with poison.",
      "rarity": "Rare",
      "objective": "Kill 5,000 enemies using Amog",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "A"
    },
    {
      "id": "gamer_goggles",
      "name": "Gamer Goggles",
      "description": "Increased Damage the lower your HP.",
      "rarity": "Rare",
      "objective": "Defeat a Stage Boss with less than 10% HP",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "A"
    },
    {
      "id": "eagle_claw",
      "name": "Eagle Claw",
      "description": "66% Damage vs airborne enemies, 8% chance to launch them into the air.",
      "rarity": "Rare",
      "objective": "Kill 10,000 enemies as Birdo",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "A"
    },
    {
      "id": "demonic_soul",
      "name": "Demonic Soul",
      "description": "Increase Damage by 0,1% per kill (max 100%).",
      "rarity": "Rare",
      "objective": "Reach level 30 as Calcium",
      "silverCost": "12",
      "effects": {
        "damagePct": 40.0
      },
      "bracket": 4,
      "tier": "A"
    },
    {
      "id": "bob_dead",
      "name": "Bob (Dead)",
      "description": "For every 14 units moved, summon Bob (he's dead).",
      "rarity": "Rare",
      "objective": "Survive the final swarm for 2 minutes",
      "silverCost": "12",
      "effects": {},
      "bracket": 0,
      "tier": "A"
    },
    {
      "id": "grandmas_secret_tonic",
      "name": "Grandma's Secret Tonic",
      "description": "Crits have a 50%chance to explode and damage nearby enemies for 50% damage.",
      "rarity": "Rare",
      "objective": "Kill 3,000 enemies with Sniper Rifle",
      "silverCost": "",
      "effects": {
        "critExplosion": 50.0
      },
      "bracket": 7,
      "tier": "A"
    },
    {
      "id": "cursed_grabbies",
      "name": "Cursed grabbies",
      "description": "+10% difficulty, 0.8x Max HP. 5% to cast cursed magic upon hitting an enemy, damaging nearby enemies.",
      "rarity": "Rare",
      "objective": "Get the Cursed Tome to level 10",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "A"
    },
    {
      "id": "overpowered_lamp",
      "name": "Overpowered Lamp",
      "description": "+1 chance to proc on hit effects.",
      "rarity": "Legendary",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {
        "procChanceBonus": 100.0
      },
      "bracket": 0,
      "tier": "S"
    },
    {
      "id": "za_warudo",
      "name": "Za Warudo",
      "description": "Upon taking damage that would kill you, freeze time. Breaks after one use.",
      "rarity": "Legendary",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "S"
    },
    {
      "id": "big_bonk",
      "name": "Big Bonk",
      "description": "2% chance to BONK an enemy, dealing 20x damage.",
      "rarity": "Legendary",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {
        "megabonkProc": 0.02,
        "damagePct": 38.0
      },
      "bracket": 4,
      "tier": "S"
    },
    {
      "id": "spicy_meatball",
      "name": "Spicy Meatball",
      "description": "Attacks have a 25% chance to explode, dealing 65% Damage to surrounding enemies.",
      "rarity": "Legendary",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "S"
    },
    {
      "id": "ice_cube",
      "name": "Ice Cube",
      "description": "20% chance to inflict ice damage when hitting enemies. Ice can now freeze enemies.",
      "rarity": "Legendary",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "S"
    },
    {
      "id": "giant_fork",
      "name": "Giant Fork",
      "description": "You can eat so much spaghetti with this bad boi. Also crits have a chance to become Megacrits.",
      "rarity": "Legendary",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {
        "megacrit": true,
        "critDamagePct": 50.0
      },
      "bracket": 7,
      "tier": "S"
    },
    {
      "id": "power_gloves",
      "name": "Power Gloves",
      "description": "8% chance upon hitting an enemy to create a giant blast, damaging and knocking away enemies.",
      "rarity": "Legendary",
      "objective": "Unlocked by default",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "S"
    },
    {
      "id": "lightning_orb",
      "name": "Lightning Orb",
      "description": "25% chance to summon lightning when hitting enemies. Lightning can now stun enemies.",
      "rarity": "Legendary",
      "objective": "Kill 3,000 enemies using Lightning damage",
      "silverCost": "N/A",
      "effects": {},
      "bracket": 0,
      "tier": "S"
    },
    {
      "id": "chonkplate",
      "name": "Chonkplate",
      "description": "Healing above Max HP allows you to Overheal by 75%. Also gives 20% Lifesteal.",
      "rarity": "Legendary",
      "objective": "Get Max HP to 500",
      "silverCost": "",
      "effects": {
        "lifesteal": 20.0,
        "overheal": 75.0
      },
      "bracket": 0,
      "tier": "S"
    },
    {
      "id": "dragonfire",
      "name": "Dragonfire",
      "description": "15% chance to summon dragonfire when hitting enemies. Fire damage can now apply burn.",
      "rarity": "Legendary",
      "objective": "Kill 4,000 enemies using fire damage",
      "silverCost": "18",
      "effects": {},
      "bracket": 0,
      "tier": "S"
    },
    {
      "id": "sucky_magnet",
      "name": "Sucky Magnet",
      "description": "Periodically drag in all XP around you.",
      "rarity": "Legendary",
      "objective": "Complete every single Charge Shrine on one map",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "S"
    },
    {
      "id": "holy_book",
      "name": "Holy Book",
      "description": "100 Max HP, 50 HP Regen. Healing will now radiate damage to nearby enemies.",
      "rarity": "Legendary",
      "objective": "Kill a first Stage Boss without taking any damage that run",
      "silverCost": "",
      "effects": {
        "maxHp": 100.0,
        "hpRegen": 50.0
      },
      "bracket": 0,
      "tier": "S"
    },
    {
      "id": "speed_boi",
      "name": "Speed Boi",
      "description": "Upon taking damage below 50% Max HP, slow down time and deal 2x damage.",
      "rarity": "Legendary",
      "objective": "Complete a stage with at least 2 Boss Curse activated",
      "silverCost": "",
      "effects": {
        "speedBoiDamage": 100.0
      },
      "bracket": 5,
      "tier": "S"
    },
    {
      "id": "energy_core",
      "name": "Energy Core",
      "description": "Shoot energy orbs at enemies.",
      "rarity": "Legendary",
      "objective": "Defeat the Final Boss 2 times",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "S"
    },
    {
      "id": "anvil",
      "name": "Anvil",
      "description": "Weapon Upgrades can now have +1 stats.",
      "rarity": "Legendary",
      "objective": "Complete 3 Challenges",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "S"
    },
    {
      "id": "soul_harvester",
      "name": "Soul Harvester",
      "description": "killing an enemy summons 2 homing souls.",
      "rarity": "Legendary",
      "objective": "Survive the Final Swarm for 6 minutes",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "S"
    },
    {
      "id": "joes_dagger",
      "name": "Joe's Dagger",
      "description": "1% chance to execute an enemy. Performing Execute increases Damage by 1%.",
      "rarity": "Legendary",
      "objective": "Kill 10,000 enemies using the Dexecutioner",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "S"
    },
    {
      "id": "bloody_cleaver",
      "name": "Bloody Cleaver",
      "description": "Lifesteal now activates Bloodmark stacks. Also adds 50% chance to apply Bloodmark.",
      "rarity": "Legendary",
      "objective": "Reach level 50 as Vlad",
      "silverCost": "",
      "effects": {},
      "bracket": 0,
      "tier": "S"
    }
  ],
  "metaBuilds": [
    {
      "id": "holy_trinity",
      "name": "The Holy Trinity (XP + Curse + Luck)",
      "description": "The premier competitive endgame build. Stacks XP, Curse difficulty, and Luck to maximize item drops, shrine rarity, and rapid level progression.",
      "character": "Fox",
      "weapons": [
        "Firestaff",
        "Aura",
        "Flamewalker",
        "Katana"
      ],
      "tomes": [
        "XP Tome",
        "Luck Tome",
        "Cursed Tome",
        "Damage Tome"
      ],
      "keyItems": [
        "Clover",
        "Time Bracelet",
        "Echo Shard",
        "Overpowered Lamp"
      ],
      "difficulty": "High Risk / Infinite Scaling"
    },
    {
      "id": "cl4nk_overcrit",
      "name": "CL4NK 100%+ Overcrit Shredder",
      "description": "Stack Crit Chance above 100% to trigger Overcrits and Giant Fork Megacrits. Obliterates stage bosses in seconds.",
      "character": "CL4NK",
      "weapons": [
        "Revolver",
        "Bow",
        "Sniper Rifle",
        "Dexecutioner"
      ],
      "tomes": [
        "Precision Tome",
        "Damage Tome",
        "Cooldown Tome",
        "Quantity Tome"
      ],
      "keyItems": [
        "Giant Fork",
        "Forbidden Juice",
        "Tactical Glasses",
        "Backpack"
      ],
      "difficulty": "Moderate / Pure DPS"
    },
    {
      "id": "sir_oofie_immortal",
      "name": "Sir Oofie Immortal Thorns Fortress",
      "description": "Combines +1% Armor per level with Spiky Shield (+2 Thorns per 1% Armor) and Chonkplate overheal to passively kill mobs by touching them.",
      "character": "Sir Oofie",
      "weapons": [
        "Sword",
        "Aegis",
        "Chunkers",
        "Aura"
      ],
      "tomes": [
        "Armor Tome",
        "HP Tome",
        "Thorns Tome",
        "Regen Tome"
      ],
      "keyItems": [
        "Spiky Shield",
        "Chonkplate",
        "Holy Book",
        "Cactus"
      ],
      "difficulty": "Easy / High Survivability"
    },
    {
      "id": "calcium_hyper_speed",
      "name": "Calcium Hyper-Sonic Speed Demon",
      "description": "Converts massive movement speed into raw multiplicative damage via Speed Demon passive and Turbo Skates attack speed.",
      "character": "Calcium",
      "weapons": [
        "Bone",
        "Wireless Dagger",
        "Flamewalker",
        "Revolver"
      ],
      "tomes": [
        "Agility Tome",
        "Damage Tome",
        "Cooldown Tome",
        "Quantity Tome"
      ],
      "keyItems": [
        "Turbo Socks",
        "Turbo Skates",
        "Coward's cloak",
        "Golden Sneakers"
      ],
      "difficulty": "High Skill / Fast Paced"
    },
    {
      "id": "amog_poison_apocalypse",
      "name": "Amog Toxic Epidemic Cloud",
      "description": "Infects whole screens with cascading poison corpse explosions using Moldy Cheese, Gas Mask, and Poison Flask.",
      "character": "Amog",
      "weapons": [
        "Poison Flask",
        "Flamewalker",
        "Aura",
        "Black Hole"
      ],
      "tomes": [
        "Duration Tome",
        "Size Tome",
        "Damage Tome",
        "Quantity Tome"
      ],
      "keyItems": [
        "Moldy Cheese",
        "Gas Mask",
        "Toxic Barrel",
        "Moldy Gloves"
      ],
      "difficulty": "Crowd Control Specialist"
    },
    {
      "id": "megachad_infinite_flex",
      "name": "Megachad Infinite Flex Brawler",
      "description": "Utilizes the Flex invulnerability cooldown reduction to maintain near 100% damage immunity and 100% uptime on the +2.5% flexing damage multiplier.",
      "character": "Megachad",
      "weapons": [
        "Aura",
        "Axe",
        "Dragon's Breath",
        "Chunkers"
      ],
      "tomes": [
        "Damage Tome",
        "Size Tome",
        "Armor Tome",
        "Cooldown Tome"
      ],
      "keyItems": [
        "Gym Sauce",
        "Beefy Ring",
        "Oats",
        "Big Bonk"
      ],
      "difficulty": "Beginner Friendly"
    }
  ],
  "damageBrackets": [
    {
      "bracket": 1,
      "name": "Damage Tome Universal",
      "description": "The universal Damage Tome multiplier. Multiplies with all other brackets.",
      "formula": "1 + (DamageTomeLevel * 0.12)"
    },
    {
      "bracket": 2,
      "name": "Character Passive Multiplier",
      "description": "Character-specific scaling (e.g. Noelle frozen multiplier, Ogre warrior passive, Robinette gold scaling).",
      "formula": "1 + PassiveBonus"
    },
    {
      "bracket": 3,
      "name": "Flat Damage Upgrades",
      "description": "Additive category for flat item damage: Gym Sauce (+10%), Brass Knuckles (+20%), Idle Juice.",
      "formula": "1 + Sum(FlatDamageItems)"
    },
    {
      "bracket": 4,
      "name": "Main \"Damage %\" Multiplier",
      "description": "Multiplicative bracket for Tactical Glasses, Boss Buster, Beer, Demonic Soul, Big Bonk.",
      "formula": "1 + Sum(PctDamageItems)"
    },
    {
      "bracket": 5,
      "name": "Speed & Conditional Scaling",
      "description": "Speed-to-damage (Speedy Boi, Calcium Speed Demon, Airborne damage).",
      "formula": "1 + ConditionalBonus"
    },
    {
      "bracket": 6,
      "name": "Attack Speed / Fire Rate",
      "description": "Cooldown Tome and Attack Speed items (Battery, Turbo Skates). Directly scales attacks/sec.",
      "formula": "BaseRate * (1 + AttackSpeedBonus / 100)"
    },
    {
      "bracket": 7,
      "name": "Critical Expectation & Overcrit",
      "description": "Precision Tome, Forbidden Juice, Giant Fork. Scales through Overcrit (Tier 1 & Tier 2).",
      "formula": "1 + (CritChance% * (CritDamageMult - 1)) + OvercritBonus"
    },
    {
      "bracket": 8,
      "name": "Projectiles, AoE Size & Duration",
      "description": "Quantity Tome, Backpack, Size Tome, Duration Tome. Only applies to weapons tagged with these stats!",
      "formula": "Projectiles * (1 + SizeBonus) * (1 + DurationBonus)"
    }
  ]
};

export const {
  characters,
  weapons,
  tomes,
  items,
  metaBuilds,
  damageBrackets
} = db;

export const characterMap = new Map(characters.map(c => [c.name.toLowerCase(), c]));
export const weaponMap = new Map(weapons.map(w => [w.name.toLowerCase(), w]));
export const tomeMap = new Map(tomes.map(t => [t.name.toLowerCase(), t]));
export const itemMap = new Map(items.map(i => [i.name.toLowerCase(), i]));

export default db;
