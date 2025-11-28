import React from 'react';
import { User } from '../types';
import { Settings, ChevronRight, Shield, HelpCircle, Gamepad2, Gift, Bell, Crown } from 'lucide-react';

interface MineViewProps {
  user: User;
  onLogout: () => void;
}

const MineView: React.FC<MineViewProps> = ({ user, onLogout }) => {
  return (
    <div className="pb-28 animate-in zoom-in-95 duration-300">
      
      {/* Profile Header */}
      <div className="relative pt-8 pb-6 px-6 bg-gradient-to-b from-violet-900/20 to-transparent">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-fuchsia-500 to-violet-500">
                <img src={user.avatar} alt="User" className="w-full h-full rounded-full bg-black" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-black text-black flex items-center gap-1">
                <Crown size={10} /> VIP {user.vipLevel}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user.name}</h2>
              <p className="text-xs text-gray-400 font-mono">ID: {user.id}</p>
              <div className="mt-2 w-32 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
              </div>
              <p className="text-[9px] text-gray-500 mt-1">65% to VIP {user.vipLevel + 1}</p>
            </div>
          </div>
          <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white transition-colors">
            <Settings size={20} />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 bg-[#1A1128] border border-white/5 rounded-xl p-4 shadow-lg">
          <StatItem label="Total Bets" value="1,245" />
          <StatItem label="Win Rate" value="48.2%" color="text-green-400" />
          <StatItem label="Favorites" value="12" />
        </div>
      </div>

      {/* Menu Groups */}
      <div className="px-4 space-y-4">
        
        <div className="bg-[#1A1128]/50 rounded-2xl border border-white/5 overflow-hidden">
          <MenuItem icon={<Gamepad2 size={20} className="text-violet-400" />} label="Game History" />
          <MenuItem icon={<Gift size={20} className="text-pink-400" />} label="Bonus Center" badge="3 New" />
          <MenuItem icon={<Bell size={20} className="text-yellow-400" />} label="Notifications" />
        </div>

        <div className="bg-[#1A1128]/50 rounded-2xl border border-white/5 overflow-hidden">
          <MenuItem icon={<Shield size={20} className="text-emerald-400" />} label="Security Center" />
          <MenuItem icon={<HelpCircle size={20} className="text-blue-400" />} label="Support & FAQ" />
        </div>

        <button 
          onClick={onLogout}
          className="w-full py-4 text-center text-red-500 text-sm font-bold bg-[#1A1128]/30 rounded-xl hover:bg-red-900/10 transition-colors"
        >
          Log Out
        </button>

      </div>
      
    </div>
  );
};

const StatItem = ({ label, value, color }: any) => (
  <div className="text-center">
    <p className={`text-lg font-bold font-display ${color || 'text-white'}`}>{value}</p>
    <p className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</p>
  </div>
);

const MenuItem = ({ icon, label, badge }: any) => (
  <button className="w-full flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm font-medium text-gray-200 group-hover:text-white">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {badge && (
        <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
          {badge}
        </span>
      )}
      <ChevronRight size={16} className="text-gray-600 group-hover:text-gray-400" />
    </div>
  </button>
);

export default MineView;