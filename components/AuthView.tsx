import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, ArrowRight, Gamepad2, Gift, Loader2, X } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthViewProps {
  onLogin: (userData: Partial<UserType>) => void;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin, onClose, initialMode = 'login' }) => {
  const [isLoginMode, setIsLoginMode] = useState(initialMode === 'login');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    inviteCode: ''
  });

  useEffect(() => {
    setIsLoginMode(initialMode === 'login');
  }, [initialMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      // Mock successful login/register
      onLogin({
        name: formData.username || 'NewPlayer',
        id: `u_${Math.floor(Math.random() * 10000)}`,
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-[#0F0818]/95 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors z-20"
      >
        <X size={24} />
      </button>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-sm relative z-10 animate-in zoom-in-95 duration-300">
        
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl mx-auto flex items-center justify-center transform rotate-3 shadow-[0_0_30px_rgba(139,92,246,0.5)] mb-4">
             <span className="text-3xl font-bold italic text-white">M</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">MA HASH</h1>
          <p className="text-violet-300/60 text-sm font-medium tracking-widest mt-1">NEXT GEN GAMING</p>
        </div>

        {/* Card */}
        <div className="bg-[#1A1128]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
          
          {/* Toggle */}
          <div className="flex bg-[#0F0818]/50 p-1 rounded-xl mb-6 border border-white/5">
            <button 
              onClick={() => setIsLoginMode(true)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${isLoginMode ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Log In
            </button>
            <button 
              onClick={() => setIsLoginMode(false)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${!isLoginMode ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {!isLoginMode && (
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-bold ml-1">Username</label>
                <div className="relative group">
                  <User className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-violet-400 transition-colors" size={18} />
                  <input 
                    name="username"
                    type="text" 
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full bg-[#0F0818] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-violet-500 transition-all placeholder:text-gray-700"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-bold ml-1">Email / Account</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-violet-400 transition-colors" size={18} />
                <input 
                  name="email"
                  type="text" 
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#0F0818] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-violet-500 transition-all placeholder:text-gray-700"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
               <div className="flex justify-between items-center px-1">
                 <label className="text-xs text-gray-400 font-bold">Password</label>
                 {isLoginMode && <button type="button" className="text-[10px] text-violet-400 font-bold hover:text-violet-300">Forgot?</button>}
               </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-violet-400 transition-colors" size={18} />
                <input 
                  name="password"
                  type="password" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#0F0818] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-violet-500 transition-all placeholder:text-gray-700"
                  required
                />
              </div>
            </div>

            {!isLoginMode && (
              <>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold ml-1">Confirm Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-violet-400 transition-colors" size={18} />
                    <input 
                      name="confirmPassword"
                      type="password" 
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full bg-[#0F0818] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-violet-500 transition-all placeholder:text-gray-700"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold ml-1">Invite Code (Optional)</label>
                  <div className="relative group">
                    <Gift className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-violet-400 transition-colors" size={18} />
                    <input 
                      name="inviteCode"
                      type="text" 
                      placeholder="Referral Code"
                      value={formData.inviteCode}
                      onChange={handleChange}
                      className="w-full bg-[#0F0818] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-violet-500 transition-all placeholder:text-gray-700"
                    />
                  </div>
                </div>
              </>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-violet-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 mt-4"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>{isLoginMode ? 'Start Playing' : 'Create Account'}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

        </div>

        {/* Footer */}
        <div className="mt-8 text-center space-y-4">
           <div className="flex items-center justify-center space-x-4">
              <button className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/5">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              </button>
              <button className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/5">
                <img src="https://www.svgrepo.com/show/475689/twitter-color.svg" className="w-5 h-5" alt="Twitter" />
              </button>
              <button className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/5">
                 <Gamepad2 size={20} className="text-white" />
              </button>
           </div>
           <p className="text-xs text-gray-500">By continuing, you agree to our <span className="text-violet-400 cursor-pointer">Terms of Service</span></p>
        </div>

      </div>
    </div>
  );
};

export default AuthView;