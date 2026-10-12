import React, { useState, useMemo } from 'react';
import Header from './components/Header.jsx';
import UpgradeAdvisor from './components/UpgradeAdvisor.jsx';
import BuildSimulator from './components/BuildSimulator.jsx';
import TierListsAndPriorities from './components/TierListsAndPriorities.jsx';
import DatabaseExplorer from './components/DatabaseExplorer.jsx';
import MetaBuilds from './components/MetaBuilds.jsx';
import { calculateBuildStats } from './engine/optimizer.js';
import { weaponMap, tomeMap, itemMap } from './data/megabonkData.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('advisor');

  // Build & Run State
  const [character, setCharacter] = useState('Dicehead');
  const [level, setLevel] = useState(8);
  const [purpose, setPurpose] = useState('leaderboard');
  const [currentWeapons, setCurrentWeapons] = useState([
    { name: 'Dice', level: 4 },
    { name: 'Firestaff', level: 3 },
    { name: 'Flamewalker', level: 2 },
    { name: 'Black Hole', level: 2 }
  ]);
  const [currentTomes, setCurrentTomes] = useState([
    { name: 'XP Tome', level: 4 },
    { name: 'Luck Tome', level: 3 },
    { name: 'Cursed Tome', level: 3 },
    { name: 'Chaos Tome', level: 2 }
  ]);
  const [currentItems, setCurrentItems] = useState([
    { name: 'Echo Shard', count: 1 },
    { name: 'Clover', count: 2 },
    { name: 'Time Bracelet', count: 1 }
  ]);

  const [notification, setNotification] = useState(null);

  // Compute live build stats using the 8-bracket mathematical engine
  const buildState = useMemo(() => {
    return calculateBuildStats(character, level, currentWeapons, currentTomes, currentItems);
  }, [character, level, currentWeapons, currentTomes, currentItems]);

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Apply upgrade selected from advisor
  const handleApplyUpgrade = (upgrade) => {
    const name = upgrade.name;
    const type = upgrade.type?.toLowerCase();

    if (type === 'weapon') {
      const existing = currentWeapons.find(w => w.name.toLowerCase() === name.toLowerCase());
      if (existing) {
        setCurrentWeapons(currentWeapons.map(w => w.name.toLowerCase() === name.toLowerCase() ? { ...w, level: Math.min(10, w.level + 1) } : w));
        showToast(`Upgraded ${name} to Level ${Math.min(10, existing.level + 1)}!`);
      } else if (currentWeapons.length < 4) {
        setCurrentWeapons([...currentWeapons, { name, level: 1 }]);
        showToast(`Equipped new Weapon: ${name}!`);
      } else {
        showToast(`Weapon slots full (4/4)! Replace a weapon in Build Simulator.`);
      }
    } else if (type === 'tome') {
      const existing = currentTomes.find(t => t.name.toLowerCase() === name.toLowerCase());
      if (existing) {
        setCurrentTomes(currentTomes.map(t => t.name.toLowerCase() === name.toLowerCase() ? { ...t, level: Math.min(10, t.level + 1) } : t));
        showToast(`Upgraded ${name} to Level ${Math.min(10, existing.level + 1)}!`);
      } else if (currentTomes.length < 4) {
        setCurrentTomes([...currentTomes, { name, level: 1 }]);
        showToast(`Equipped new Tome: ${name}!`);
      } else {
        showToast(`Tome slots full (4/4)! Replace a tome in Build Simulator.`);
      }
    } else {
      // Item
      const existing = currentItems.find(i => i.name.toLowerCase() === name.toLowerCase());
      if (existing) {
        setCurrentItems(currentItems.map(i => i.name.toLowerCase() === name.toLowerCase() ? { ...i, count: i.count + 1 } : i));
        showToast(`Added stack to ${name} (Total: ${existing.count + 1})!`);
      } else {
        setCurrentItems([...currentItems, { name, count: 1 }]);
        showToast(`Acquired Item: ${name}!`);
      }
    }
  };

  // Load a full community preset build
  const handleLoadBuild = (preset) => {
    setCharacter(preset.character);
    setCurrentWeapons(preset.weapons.map(w => ({ name: w, level: 5 })));
    setCurrentTomes(preset.tomes.map(t => ({ name: t, level: 4 })));
    setCurrentItems(preset.keyItems.map(it => ({ name: it, count: 1 })));
    if (preset.purpose) {
      setPurpose(preset.purpose);
    }
    setLevel(15);
    showToast(`Loaded preset build: ${preset.name}!`);
    setActiveTab('simulator');
  };

  // Reset to default
  const handleResetBuild = () => {
    setCharacter('Dicehead');
    setLevel(8);
    setPurpose('leaderboard');
    setCurrentWeapons([
      { name: 'Dice', level: 4 },
      { name: 'Firestaff', level: 3 },
      { name: 'Flamewalker', level: 2 },
      { name: 'Black Hole', level: 2 }
    ]);
    setCurrentTomes([
      { name: 'XP Tome', level: 4 },
      { name: 'Luck Tome', level: 3 },
      { name: 'Cursed Tome', level: 3 },
      { name: 'Chaos Tome', level: 2 }
    ]);
    setCurrentItems([
      { name: 'Echo Shard', count: 1 },
      { name: 'Clover', count: 2 },
      { name: 'Time Bracelet', count: 1 }
    ]);
    showToast('Reset to default Leaderboard build.');
  };

  // Equip directly from Database
  const handleEquipDatabaseItem = (entry) => {
    if (entry.category === 'Character') {
      setCharacter(entry.name);
      showToast(`Selected Character: ${entry.name}!`);
    } else if (entry.category === 'Weapon') {
      handleApplyUpgrade({ name: entry.name, type: 'weapon' });
    } else if (entry.category === 'Tome') {
      handleApplyUpgrade({ name: entry.name, type: 'tome' });
    } else {
      handleApplyUpgrade({ name: entry.name, type: 'item' });
    }
  };

  // Send item directly to Advisor
  const handleSendToAdvisor = (entry) => {
    setActiveTab('advisor');
    showToast(`Transferred ${entry.name} to Upgrade Advisor!`);
  };

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950 relative">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        buildState={buildState}
        onResetBuild={handleResetBuild}
        purpose={purpose}
        setPurpose={setPurpose}
      />

      {/* Apple-style Floating Toast Pill */}
      {notification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/90 backdrop-blur-2xl text-zinc-100 px-5 py-2 rounded-full font-medium shadow-2xl border border-white/[0.12] text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>{notification}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'advisor' && (
          <UpgradeAdvisor
            character={character}
            setCharacter={setCharacter}
            level={level}
            setLevel={setLevel}
            purpose={purpose}
            setPurpose={setPurpose}
            currentWeapons={currentWeapons}
            setCurrentWeapons={setCurrentWeapons}
            currentTomes={currentTomes}
            setCurrentTomes={setCurrentTomes}
            currentItems={currentItems}
            setCurrentItems={setCurrentItems}
            buildState={buildState}
            onApplyUpgrade={handleApplyUpgrade}
          />
        )}

        {activeTab === 'simulator' && (
          <BuildSimulator
            character={character}
            setCharacter={setCharacter}
            level={level}
            setLevel={setLevel}
            currentWeapons={currentWeapons}
            setCurrentWeapons={setCurrentWeapons}
            currentTomes={currentTomes}
            setCurrentTomes={setCurrentTomes}
            currentItems={currentItems}
            setCurrentItems={setCurrentItems}
            buildState={buildState}
          />
        )}

        {activeTab === 'priorities' && (
          <TierListsAndPriorities
            buildState={buildState}
            purpose={purpose}
            setPurpose={setPurpose}
            onApplyUpgrade={handleApplyUpgrade}
          />
        )}

        {activeTab === 'meta' && (
          <MetaBuilds
            onLoadBuild={handleLoadBuild}
            currentPurpose={purpose}
            setPurpose={setPurpose}
          />
        )}

        {activeTab === 'database' && (
          <DatabaseExplorer
            onEquipItem={handleEquipDatabaseItem}
            onSendToAdvisor={handleSendToAdvisor}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-black/40 py-8 px-4 text-center text-xs text-zinc-500 font-sans">
        <p className="font-medium text-zinc-400">
          Megabonk Build Optimizer Pro • 8-Bracket Multiplicative Roguelike Advisor
        </p>
        <p className="mt-1 text-zinc-600 font-mono text-[11px]">
          Tome × Passive × Flat × Main % × Speed × AtkSpd × Crit/Overcrit × AoE/Projectiles
        </p>
      </footer>
    </div>
  );
}
