import React from 'react';
import { User, Transaction } from '../types';
import { ArrowUpRight, ArrowDownLeft, RefreshCcw, History, Wallet as WalletIcon, ChevronRight } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../constants';

interface WalletViewProps {
  user: User;
  onDeposit: () => void;
}

const WalletView: React.FC<WalletViewProps> = ({ user, onDeposit }) => {
  return (
    <div className="px-4 pt-4 pb-28 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <WalletIcon className="text-fuchsia-500" />
        <span>My Assets</span>
      </h2>

      {/* Main Balance Card */}
      <div className="relative w-full h-48 rounded-3xl overflow-hidden shadow-2xl mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-indigo-800"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl -ml-5 -mb-5"></div>
        
        <div className="relative z-10 p-6 flex flex-col justify-between h-full text-white">
          <div>
            <p className="text-white/70 text-sm font-medium tracking-wider">TOTAL BALANCE</p>
            <h1 className="text-4xl font-display font-bold mt-1 tracking-tight">
              ${user.balance.toLocaleString()} <span className="text-lg opacity-60">USD</span>
            </h1>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
               <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
               <span className="text-xs font-mono">Mainnet Active</span>
            </div>
            <span className="text-xs font-mono opacity-60">ID: {user.id}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        <ActionButton icon={<ArrowDownLeft />} label="Deposit" primary onClick={onDeposit} />
        <ActionButton icon={<ArrowUpRight />} label="Withdraw" />
        <ActionButton icon={<RefreshCcw />} label="Swap" />
        <ActionButton icon={<History />} label="History" />
      </div>

      {/* Crypto Assets List */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-white mb-3 px-1">Crypto Assets</h3>
        <div className="space-y-3">
          <AssetItem icon="₮" color="bg-teal-500" symbol="USDT" name="Tether" amount={user.balance} value={user.balance} />
          <AssetItem icon="₿" color="bg-orange-500" symbol="BTC" name="Bitcoin" amount={0.0042} value={12500.50} />
          <AssetItem icon="Ξ" color="bg-blue-500" symbol="ETH" name="Ethereum" amount={0.85} value={1800.25} />
        </div>
      </div>

      {/* Transactions */}
      <div>
        <div className="flex justify-between items-end mb-3 px-1">
           <h3 className="text-lg font-bold text-white">Transactions</h3>
           <button className="text-xs text-violet-400">View All</button>
        </div>
        <div className="bg-[#1A1128] border border-white/5 rounded-2xl overflow-hidden">
          {MOCK_TRANSACTIONS.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === 'deposit' || tx.type === 'win' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                }`}>
                  {tx.type === 'deposit' || tx.type === 'win' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                </div>
                <div>
                  <p className="text-sm font-bold text-white capitalize">{tx.type}</p>
                  <p className="text-[10px] text-gray-500">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold font-display ${
                  tx.type === 'deposit' || tx.type === 'win' ? 'text-green-400' : 'text-white'
                }`}>
                  {tx.type === 'deposit' || tx.type === 'win' ? '+' : '-'}{tx.amount}
                </p>
                <p className="text-[10px] text-gray-500 font-mono">{tx.currency}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

const ActionButton = ({ icon, label, primary, onClick }: { icon: React.ReactNode, label: string, primary?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all active:scale-95 ${
      primary 
      ? 'bg-white text-black border-transparent shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
      : 'bg-[#1A1128] text-gray-300 border-white/10 hover:bg-[#251838]'
    }`}
  >
    <div className={`${primary ? 'text-black' : 'text-white'}`}>{icon}</div>
    <span className="text-[10px] font-bold">{label}</span>
  </button>
);

const AssetItem = ({ icon, color, symbol, name, amount, value }: any) => (
  <div className="flex items-center justify-between bg-[#1A1128] p-4 rounded-xl border border-white/5">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold shadow-lg`}>
        {icon}
      </div>
      <div>
        <p className="font-bold text-white">{symbol}</p>
        <p className="text-xs text-gray-500">{name}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-bold text-white font-display">{amount.toLocaleString()}</p>
      <p className="text-xs text-gray-500">${value.toLocaleString()}</p>
    </div>
  </div>
);

export default WalletView;