import React, { useState } from 'react';
import { Game } from '../types';
import GameGrid from './GameGrid';
import { CATEGORIES } from '../constants';
import { Search, Sparkles } from 'lucide-react';

interface GamesViewProps {
  games: Game[];
}

const GamesView: React.FC<GamesViewProps> = ({ games }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filteredGames = games.filter(g => {
    const matchesCategory = activeCategory === 'all' || g.category === activeCategory;
    const matchesSearch = g.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-4 animate-in fade-in slide-in-from-right-8 duration-500">
      
      {/* Header & Search */}
      <div className="px-4 mb-6">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="text-violet-500" />
          <span>Game Library</span>
        </h2>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search games..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1A1128] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors placeholder:text-gray-600"
          />
          <Search className="absolute left-3 top-3 text-gray-500" size={18} />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="overflow-x-auto no-scrollbar mb-6 px-4">
        <div className="flex space-x-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                activeCategory === cat.id 
                ? 'bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-900/40' 
                : 'bg-[#1A1128] text-gray-400 border-white/10 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Re-use GameGrid but pass filtered games */}
      <div className="min-h-[50vh]">
        {filteredGames.length > 0 ? (
          <GameGrid games={filteredGames} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Search size={48} className="mb-4 opacity-20" />
            <p>No games found</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default GamesView;