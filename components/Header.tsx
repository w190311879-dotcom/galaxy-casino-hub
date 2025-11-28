import React from 'react';
import { User } from '../types';
import { Plus } from 'lucide-react';

interface HeaderProps {
  user: User | null;
  onRecharge: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onRecharge, onLogin, onRegister }) => {
  return (
    <div className="sticky top-0 z-40 pt-4 pb-2 px-4 bg-transparent">
      <div className="flex items-center justify-between">
        
        {/* Logo Area */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center transform rotate-3 shadow-lg shadow-violet-500/30">
             <span className="text-xl font-bold italic text-white">M</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold leading-none tracking-tight">MA HASH</h1>
            <span className="text-[10px] text-violet-300 tracking-widest font-display">CASINO DEFI</span>
          </div>
        </div>

        {/* Right Side: Auth Buttons or User Profile */}
        {user ? (
          <div className="flex items-center space-x-3">
             {/* Balance Pill */}
             <div className="flex items-center bg-[#1A1128]/80 backdrop-blur-md rounded-full border border-white/10 p-1 pr-1.5 pl-3 space-x-3 shadow-lg">
                <div className="flex items-center space-x-1">
                   <span className="text-game-gold text-lg">🏛</span>
                   <span className="text-sm font-display font-bold text-white tabular-nums tracking-wide">
                     {user.balance.toLocaleString()}
                   </span>
                </div>
                <button 
                  onClick={onRecharge}
                  className="w-7 h-7 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-md"
                >
                  <Plus size={16} className="text-white" strokeWidth={3} />
                </button>
             </div>

             {/* Avatar */}
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 p-0.5 shadow-xl">
               <img 
                 src={user.avatar} 
                 alt="Profile" 
                 className="w-full h-full rounded-full bg-[#1A1128]"
               />
             </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <button 
              onClick={onLogin}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/5 transition-colors"
            >
              Log In
            </button>
            <button 
              onClick={onRegister}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-500/20 hover:scale-105 active:scale-95 transition-transform"
            >
              Register
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Header;