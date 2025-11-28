import React, { useState } from 'react';
import Header from './components/Header';
import BannerSlider from './components/BannerSlider';
import WinnersTicker from './components/WinnersTicker';
import GameGrid from './components/GameGrid';
import Navbar from './components/Navbar';
import RechargeModal from './components/RechargeModal';
import SupportChat from './components/SupportChat';
import WalletView from './components/WalletView';
import GamesView from './components/GamesView';
import MineView from './components/MineView';
import AuthView from './components/AuthView';
import { INITIAL_USER, BANNERS, GAMES, RECENT_WINNERS } from './constants';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); // Guest mode by default
  const [activeTab, setActiveTab] = useState('home');
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleLogin = (userData: Partial<User>) => {
    // Merge provided user data with default structure for the demo
    const newUser = {
      ...INITIAL_USER,
      ...userData,
      balance: 1000, // New users start with some free credits
    };
    setUser(newUser);
    setShowAuth(false);
    setActiveTab('home');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
  };

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const handleTabChange = (tab: string) => {
    // Protect routes
    if ((tab === 'wallet' || tab === 'mine') && !user) {
      openAuth('login');
      return;
    }
    setActiveTab(tab);
  };

  const handleRecharge = (amount: number) => {
    if (!user) return;
    setTimeout(() => {
      setUser(prev => prev ? ({ ...prev, balance: prev.balance + amount }) : null);
      setIsRechargeOpen(false);
    }, 1500);
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'wallet':
        // Safe check if user manually forced state, though handleTabChange prevents this
        return user ? <WalletView user={user} onDeposit={() => setIsRechargeOpen(true)} /> : null;
      case 'games':
        return <GamesView games={GAMES} />;
      case 'mine':
        return user ? <MineView user={user} onLogout={handleLogout} /> : null;
      case 'home':
      default:
        return (
          <div className="animate-in fade-in duration-500">
            <BannerSlider banners={BANNERS} />
            <WinnersTicker winners={RECENT_WINNERS} />
            <GameGrid games={GAMES} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0818] text-white font-sans selection:bg-violet-500/30 overflow-hidden relative">
      
      {/* Background Ambient Light */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-violet-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/3 right-0 w-60 h-60 bg-fuchsia-600/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="max-w-md mx-auto min-h-screen relative z-10 flex flex-col">
        {/* Header is always visible */}
        <Header 
          user={user} 
          onRecharge={() => setIsRechargeOpen(true)} 
          onLogin={() => openAuth('login')}
          onRegister={() => openAuth('register')}
        />
        
        <main className="flex-1 pb-24">
          {renderContent()}
        </main>

        <SupportChat />
        <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />
        
        {/* Modals */}
        <RechargeModal 
          isOpen={isRechargeOpen} 
          onClose={() => setIsRechargeOpen(false)} 
          onConfirm={handleRecharge}
        />

        {showAuth && (
          <AuthView 
            initialMode={authMode}
            onLogin={handleLogin} 
            onClose={() => setShowAuth(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;