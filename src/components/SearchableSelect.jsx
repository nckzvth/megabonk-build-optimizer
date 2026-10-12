import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ChevronDown, Check, X, Swords, BookOpen, Package, User } from 'lucide-react';

export default function SearchableSelect({
  options = [],
  value = '',
  onChange,
  placeholder = 'Select an option...',
  categoryFilterEnabled = true,
  className = '',
  size = 'md',
  showDescription = true,
  variant = 'default'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Find currently selected option
  const selectedOption = useMemo(() => {
    return options.find(o => o.name?.toLowerCase() === value?.toLowerCase()) || null;
  }, [options, value]);

  // Filter options based on search query and category tab
  const filteredOptions = useMemo(() => {
    let result = options;

    if (categoryFilterEnabled && activeTab !== 'ALL') {
      result = result.filter(o => o.type?.toUpperCase() === activeTab.toUpperCase());
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(o => {
        const nameMatch = o.name?.toLowerCase().includes(q);
        const descMatch = o.desc?.toLowerCase().includes(q) || o.description?.toLowerCase().includes(q);
        const tagsMatch = Array.isArray(o.affectedBy) && o.affectedBy.some(t => t.toLowerCase().includes(q));
        const typeMatch = o.type?.toLowerCase().includes(q);
        return nameMatch || descMatch || tagsMatch || typeMatch;
      });
    }

    return result;
  }, [options, search, activeTab, categoryFilterEnabled]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset highlight index when filtered results change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [filteredOptions]);

  // Focus search input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setSearch('');
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.min(prev + 1, filteredOptions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions[highlightedIndex]) {
        handleSelect(filteredOptions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  const handleSelect = (option) => {
    onChange(option.name, option);
    setIsOpen(false);
  };

  const getRarityBadgeClass = (rarity) => {
    switch (rarity) {
      case 'Legendary': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Rare': return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      case 'Uncommon': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      default: return 'text-slate-400 bg-slate-800/40 border-slate-700/40';
    }
  };

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'weapon': return <Swords className="w-3.5 h-3.5 text-orange-400" />;
      case 'tome': return <BookOpen className="w-3.5 h-3.5 text-amber-400" />;
      case 'item': return <Package className="w-3.5 h-3.5 text-purple-400" />;
      case 'character': return <User className="w-3.5 h-3.5 text-cyan-400" />;
      default: return null;
    }
  };

  return (
    <div className={`relative ${className}`} ref={containerRef} onKeyDown={handleKeyDown}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={variant === 'inline'
          ? `w-full flex items-center justify-between gap-2 bg-transparent border-b ${isOpen ? 'border-amber-400' : 'border-zinc-800 hover:border-zinc-500'} py-2 text-left transition-all cursor-pointer`
          : `w-full flex items-center justify-between gap-2 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/[0.16] rounded-xl px-3 py-2 text-left transition-all cursor-pointer backdrop-blur-md ${
              isOpen ? 'ring-1 ring-amber-400 border-amber-400 bg-white/[0.08]' : ''
            } ${size === 'lg' ? 'py-2.5 text-sm' : 'text-xs'}`
        }
      >
        <div className="flex items-center gap-2 min-w-0">
          {selectedOption ? (
            <>
              {getTypeIcon(selectedOption.type)}
              <span className="font-semibold text-zinc-100 truncate">
                {selectedOption.name}
              </span>
              {selectedOption.rarity && (
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${getRarityBadgeClass(selectedOption.rarity)}`}>
                  {selectedOption.rarity}
                </span>
              )}
            </>
          ) : (
            <span className="text-zinc-500 italic">{placeholder}</span>
          )}
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
      </button>

      {/* Popover / Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#0c0c0e]/95 border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-100">
          {/* Search Box Header */}
          <div className="p-2.5 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search upgrade..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-8 pr-7 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-2 text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Category Filter Pills */}
            {categoryFilterEnabled && (
              <div className="flex items-center gap-1 mt-2 pt-1.5 border-t border-white/[0.06] text-[10px] flex-wrap">
                {['ALL', 'TOME', 'WEAPON', 'ITEM'].map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveTab(cat)}
                    className={`px-2.5 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
                      activeTab === cat
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'bg-white/[0.03] text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200'
                    }`}
                  >
                    {cat === 'ALL' ? 'All' : cat === 'TOME' ? '📖 Tomes' : cat === 'WEAPON' ? '⚔️ Weapons' : '💎 Items'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Options List */}
          <div ref={listRef} className="max-h-60 overflow-y-auto p-1 divide-y divide-white/[0.04]">
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-xs text-zinc-500 font-mono">
                No matching options found for "<span className="text-amber-400 font-bold">{search}</span>"
              </div>
            ) : (
              filteredOptions.map((opt, idx) => {
                const isSelected = selectedOption?.name?.toLowerCase() === opt.name?.toLowerCase();
                const isHighlighted = idx === highlightedIndex;

                return (
                  <div
                    key={opt.name + idx}
                    onClick={() => handleSelect(opt)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={`p-2 rounded-xl flex items-start justify-between gap-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-400/15 text-amber-300'
                        : isHighlighted
                        ? 'bg-white/[0.08] text-white'
                        : 'text-zinc-300 hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        {getTypeIcon(opt.type)}
                        <span className={`text-xs font-bold truncate ${isSelected ? 'text-amber-400' : 'text-zinc-100'}`}>
                          {opt.name}
                        </span>
                        {opt.rarity && (
                          <span className={`text-[9px] font-mono px-1 py-0.2 rounded border ${getRarityBadgeClass(opt.rarity)}`}>
                            {opt.rarity}
                          </span>
                        )}
                        {opt.tier && (
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-white/[0.06] text-zinc-400">
                            Tier {opt.tier}
                          </span>
                        )}
                      </div>

                      {showDescription && (opt.desc || opt.description || opt.passive) && (
                        <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                          {opt.desc || opt.description || opt.passive}
                        </p>
                      )}

                      {opt.affectedBy && opt.affectedBy.length > 0 && (
                        <p className="text-[9px] text-amber-500/80 font-mono mt-0.5 truncate">
                          Scales with: {opt.affectedBy.join(', ')}
                        </p>
                      )}
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
