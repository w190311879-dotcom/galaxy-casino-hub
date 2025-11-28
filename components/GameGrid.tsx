import React from 'react';
import { Game } from '../types';

interface GameGridProps {
  games: Game[];
}

const GameGrid: React.FC<GameGridProps> = ({ games }) => {
  
  // Helper to get color style based on game index/type to match reference
  const getCardStyle = (index: number) => {
    switch(index) {
      case 0: return 'bg-gradient-to-b from-[#10B981] to-[#047857] shadow-emerald-900/50'; // Green
      case 1: return 'bg-gradient-to-b from-[#EC4899] to-[#BE185D] shadow-pink-900/50'; // Pink
      case 2: return 'bg-gradient-to-b from-[#334155] to-[#0F172A] border border-yellow-500/20 shadow-slate-900/50'; // Dark/Gold
      case 3: return 'bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] shadow-blue-900/50'; // Blue
      default: return 'bg-[#1e293b] border border-slate-700'; // Default
    }
  };

  return (
    <div className="px-4 pb-28">
      <div className="flex items-center space-x-2 mb-4 px-1">
         <span className="text-xl">🎮</span>
         <span className="font-bold text-white">Game List</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {games.map((game, index) => {
          const isLarge = index < 2; // First two items look bigger/feature in some layouts, but grid-cols-2 is standard
          const cardGradient = getCardStyle(index);
          
          return (
            <div 
              key={game.id} 
              className={`
                relative rounded-2xl p-4 overflow-hidden shadow-lg transition-transform active:scale-95 duration-200
                ${cardGradient}
                ${index === 4 ? 'col-span-2 sm:col-span-1 bg-gradient-to-r from-slate-800 to-slate-900' : ''}
                h-40 flex flex-col justify-between
              `}
            >
               {/* Background Decor */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
               
               {/* Text Content */}
               <div className="relative z-10">
                 <h3 className="font-bold text-lg text-white leading-tight drop-shadow-md">{game.title}</h3>
                 <p className="text-[10px] text-white/80 font-medium tracking-wider mt-1">{game.provider}</p>
               </div>

               {/* 3D Image */}
               <div className="absolute bottom-0 right-0 w-28 h-28 transform translate-x-4 translate-y-4">
                  <img 
                    src={game.image} 
                    alt={game.title} 
                    className={`w-full h-full object-contain drop-shadow-2xl filter ${index === 4 ? 'grayscale opacity-50' : ''}`}
                  />
               </div>
               
               {/* Special Badges */}
               {game.hashRate && (
                 <div className="absolute top-0 right-0 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-bl-lg text-[10px] font-bold text-white">
                   {game.hashRate}
                 </div>
               )}

               {/* Play Button Indicator (Visual Only) */}
               {index !== 4 && (
                 <div className="mt-auto relative z-10 opacity-80">
                   <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                     <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                   </div>
                 </div>
               )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameGrid;