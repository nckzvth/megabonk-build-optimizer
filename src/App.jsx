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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        buildState={buildState}
        onResetBuild={handleResetBuild}
        purpose={purpose}
        setPurpose={setPurpose}
      />

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-slate-950 px-4 py-2.5 rounded-xl font-bold shadow-2xl shadow-amber-500/30 flex items-center gap-2 border border-amber-400 text-sm animate-bounce">
          <span>🔨</span>
          <span>{notification}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8">
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
      <footer className="border-t border-slate-900 bg-slate-950/90 py-6 px-4 text-center text-xs text-slate-500 font-mono">
        <p>
          Megabonk Build Optimizer • Grounded in the 8-Bracket Multiplicative Game Engine & Community Meta Data
        </p>
        <p className="mt-1 text-slate-600">
          Independent Brackets: Tome × Passive × Flat × Main % × Speed × AtkSpd × Crit/Overcrit × AoE/Projectiles
        </p>
      </footer>
    </div>
  );
}
