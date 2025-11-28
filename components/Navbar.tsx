import React from 'react';
import { Home, Grid, User, Wallet } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Background with Blur and Curve */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-[#150a24]/95 backdrop-blur-xl border-t border-white/5 rounded-t-[20px] shadow-[0_-5px_20px_rgba(0,0,0,0.5)]"></div>
      
      <div className="relative flex justify-around items-center h-20 max-w-md mx-auto px-2">
        
        <NavItem 
          icon={<Home size={24} />} 
          label="Home" 
          isActive={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
        />
        <NavItem 
          icon={<Wallet size={24} />} 
          label="Wallet" 
          isActive={activeTab === 'wallet'} 
          onClick={() => setActiveTab('wallet')} 
        />
        
        {/* Center Floating Button - Always goes to Home or Game */}
        <div className="relative -top-6 group cursor-pointer" onClick={() => setActiveTab('home')}>
           <div className="absolute inset-0 bg-violet-600 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
           <div className="w-16 h-16 bg-gradient-to-b from-violet-500 to-fuchsia-600 rounded-full flex items-center justify-center shadow-xl border-4 border-[#0F0818] relative z-10 transform transition-transform active:scale-95">
             <div className="w-6 h-6 bg-white rounded-md transform rotate-45 shadow-inner"></div>
           </div>
        </div>
        
        <NavItem 
          icon={<Grid size={24} />} 
          label="Games" 
          isActive={activeTab === 'games'} 
          onClick={() => setActiveTab('games')} 
        />
        <NavItem 
          icon={<User size={24} />} 
          label="Mine" 
          isActive={activeTab === 'mine'} 
          onClick={() => setActiveTab('mine')} 
        />
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-16 space-y-1 ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
  >
    <div className={`transition-all duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(139,92,246,0.6)] text-violet-400' : ''}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-violet-200' : 'text-slate-500'}`}>{label}</span> 
  </button>
);

export default Navbar;