import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ChevronDown, Check, X } from 'lucide-react';
import { getCharacterPortrait, getWeaponIcon, getTomeIcon, getItemIcon } from '../data/gameUiIcons.js';

export default function SearchableSelect({
  options = [],
  value = '',
  onChange,
  placeholder = 'Select an option...',
  categoryFilterEnabled = true,
  className = '',
  size = 'md',
  showDescription = true
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const selectedOption = useMemo(() => {
    return options.find(o => o.name?.toLowerCase() === value?.toLowerCase()) || null;
  }, [options, value]);

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [filteredOptions]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setSearch('');
    }
  }, [isOpen]);

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

  const getOptionEmoji = (opt) => {
    if (!opt) return '🎲';
    const t = opt.type?.toLowerCase();
    if (t === 'character') return getCharacterPortrait(opt.name).emoji;
    if (t === 'weapon') return getWeaponIcon(opt.name);
    if (t === 'tome') return getTomeIcon(opt.name);
    return getItemIcon(opt.name);
  };

  return (
    <div className={`relative ${className}`} ref={containerRef} onKeyDown={handleKeyDown}>
      {/* Trigger Button styled like a Megabonk 3D Stone Slot */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 mb-input px-2.5 py-1.5 text-left transition-all cursor-pointer hover:border-[#ffe600] ${
          isOpen ? 'border-[#ffe600]' : ''
        } ${size === 'lg' ? 'py-2 text-base' : 'text-sm'}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          {selectedOption ? (
            <>
              <span className="w-6 h-6 mb-slot-blue flex items-center justify-center text-xs shrink-0">
                {getOptionEmoji(selectedOption)}
              </span>
              <span className="font-bold text-[#ffe600] truncate">
                {selectedOption.name}
              </span>
            </>
          ) : (
            <span className="text-zinc-400 italic">{placeholder}</span>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-zinc-300 shrink-0 transition-transform duration-150 ${isOpen ? 'rotate-180 text-[#ffe600]' : ''}`} />
      </button>

      {/* Megabonk Framed Popover Window */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 mb-window overflow-hidden animate-in fade-in zoom-in-95 duration-100 min-w-[270px]">
          {/* Pine-Green Search Header */}
          <div className="mb-window-header flex-col items-stretch gap-2 !p-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-zinc-300" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search upgrade..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full mb-input pl-8 pr-7 py-1 text-xs text-white placeholder-zinc-400 focus:outline-none"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-1.5 text-zinc-300 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {categoryFilterEnabled && (
              <div className="flex items-center gap-1 text-[11px] flex-wrap">
                {['ALL', 'TOME', 'WEAPON', 'ITEM'].map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveTab(cat)}
                    className={`px-2 py-0.5 font-bold uppercase cursor-pointer border ${
                      activeTab === cat
                        ? 'bg-[#2471db] text-[#ffe600] border-white'
                        : 'bg-[#16191d] text-zinc-300 border-[#525860] hover:text-white'
                    }`}
                  >
                    {cat === 'ALL' ? 'ALL' : cat === 'TOME' ? '📖 TOMES' : cat === 'WEAPON' ? '⚔️ WEAPONS' : '🎁 ITEMS'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Options List (Leaderboard Alternating Rows) */}
          <div ref={listRef} className="max-h-64 overflow-y-auto divide-y divide-[#2f343a]">
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-xs text-zinc-400">
                No matching options found for "<span className="text-[#ffe600] font-bold">{search}</span>"
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
                    className={`p-2 flex items-start justify-between gap-2 cursor-pointer transition-colors ${
                      isSelected
                        ? 'mb-row-highlight'
                        : isHighlighted
                        ? 'bg-[#2a3442]'
                        : idx % 2 === 0
                        ? 'mb-row-odd'
                        : 'mb-row-even'
                    }`}
                  >
                    <div className="flex items-start gap-2 min-w-0 flex-1">
                      <span className={`w-7 h-7 flex items-center justify-center text-sm shrink-0 ${
                        isSelected ? 'mb-slot-blue' : 'mb-slot'
                      }`}>
                        {getOptionEmoji(opt)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-bold text-[#ffe600] truncate">
                            {opt.name}
                          </span>
                          <span className="text-[10px] font-mono uppercase px-1 bg-black/40 text-zinc-300 border border-[#4a4f57]">
                            {opt.type}
                          </span>
                        </div>

                        {showDescription && (opt.desc || opt.description || opt.passive) && (
                          <p className="text-[11px] text-white mt-0.5 line-clamp-1">
                            {opt.desc || opt.description || opt.passive}
                          </p>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-[#2ee619] shrink-0 mt-1" />
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
