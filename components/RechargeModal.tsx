import React from 'react';
import { X, Copy, QrCode, AlertCircle } from 'lucide-react';

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}

const AMOUNTS = [50, 100, 500, 1000, 5000];

const RechargeModal: React.FC<RechargeModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [selectedAmount, setSelectedAmount] = React.useState(100);
  const [network, setNetwork] = React.useState('ERC20');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0b1120] w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 border border-cyan-900/50 shadow-[0_0_50px_rgba(6,182,212,0.15)] animate-in slide-in-from-bottom duration-300">
        
        <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
          <h2 className="text-xl font-bold text-white font-sans tracking-wide">Deposit Assets</h2>
          <button onClick={onClose} className="p-1.5 rounded bg-slate-800/50 hover:bg-slate-700 text-slate-400 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Network Selection */}
        <div className="flex space-x-2 mb-6 p-1 bg-slate-900/50 rounded-lg">
           {['ERC20', 'TRC20', 'BEP20'].map(net => (
             <button
               key={net}
               onClick={() => setNetwork(net)}
               className={`flex-1 py-2 text-xs font-bold font-mono rounded-md transition-all ${network === net ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
             >
               {net}
             </button>
           ))}
        </div>

        {/* Address Display */}
        <div className="bg-black/40 border border-slate-800 rounded-xl p-4 mb-6 flex flex-col items-center">
           <div className="w-32 h-32 bg-white p-2 rounded-lg mb-4">
             {/* Mock QR */}
             <QrCode className="w-full h-full text-black" />
           </div>
           <p className="text-slate-500 text-[10px] font-mono mb-2 uppercase">Your Deposit Address ({network})</p>
           <div className="flex items-center space-x-2 bg-slate-900/80 px-3 py-2 rounded-lg border border-dashed border-slate-700 w-full justify-between group cursor-pointer hover:border-cyan-500/30 transition-colors">
              <span className="text-xs font-mono text-cyan-400 truncate">0x71C9...9A23...F2A1</span>
              <Copy size={14} className="text-slate-400 group-hover:text-cyan-400" />
           </div>
        </div>

        {/* Amount Selection for Simulation */}
        <div className="mb-6">
          <p className="text-slate-400 text-xs mb-3 font-mono">Simulate Deposit Amount:</p>
          <div className="grid grid-cols-5 gap-2">
            {AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => setSelectedAmount(amt)}
                className={`py-2 rounded font-mono text-xs font-bold transition-all border ${selectedAmount === amt ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600'}`}
              >
                {amt}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg flex items-start space-x-2 mb-6">
           <AlertCircle size={16} className="text-yellow-500 shrink-0 mt-0.5" />
           <p className="text-[10px] text-yellow-500/80 leading-tight">
             Send only USDT to this address. Sending any other asset may result in permanent loss. Requires 12 network confirmations.
           </p>
        </div>

        <button 
          onClick={() => onConfirm(selectedAmount)}
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(8,145,178,0.3)] hover:shadow-[0_4px_25px_rgba(8,145,178,0.5)] active:scale-95 transition-all uppercase tracking-widest text-sm font-sans border border-cyan-400/20"
        >
          Confirm Transaction
        </button>
      </div>
    </div>
  );
};

export default RechargeModal;