import React from 'react';
import { Winner } from '../types';
import { Trophy } from 'lucide-react';

interface WinnersTickerProps {
  winners: Winner[];
}

const WinnersTicker: React.FC<WinnersTickerProps> = ({ winners }) => {
  return (
    <div className="py-4 px-4">
      <div className="flex items-center space-x-2 mb-3 px-1">
        <Trophy size={16} className="text-yellow-500" />
        <span className="text-sm font-bold text-gray-300">Recent Winners</span>
      </div>
      
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex space-x-3 w-max">
          {winners.map((winner, index) => (
            <div 
              key={`${winner.id}-${index}`} 
              className="flex flex-col items-center bg-[#1A1128] border border-white/5 rounded-xl p-2 w-[85px] relative group"
            >
              {/* Image */}
              <div className="w-12 h-12 mb-1 transition-transform group-hover:-translate-y-1">
                <img 
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/golden-egg-5360049-4491763.png" 
                  alt="Win"
                  className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(245,158,11,0.3)]"
                />
              </div>
              
              {/* Hammer Icon Overlay */}
              <div className="absolute top-1 right-1 bg-black/50 rounded-full p-0.5">
                 <span className="text-[8px]">🔨</span>
              </div>

              {/* Text */}
              <span className="text-[10px] text-gray-400 truncate w-full text-center font-medium">{winner.wallet}</span>
              <span className="text-xs font-display font-bold text-yellow-400">${winner.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WinnersTicker;