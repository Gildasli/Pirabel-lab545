
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, Shield, Mail, Lock } from 'lucide-react';

interface AuthProps {
  onLogin: (email: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    onLogin(email);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="mb-8 flex items-center gap-2 font-black text-3xl text-indigo-500">
        <Zap className="fill-indigo-500" />
        <span className="tracking-tighter">PIRABEL</span>
      </div>

      <div className="w-full max-w-md bg-[#1e293b] rounded-[40px] shadow-2xl border border-slate-800 p-8 lg:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none rotate-12">
          <Zap size={120} />
        </div>
        
        <div className="text-center mb-10 relative z-10">
          <h1 className="text-3xl font-black text-white tracking-tight">{isLogin ? 'Access Suite' : 'Initialize Account'}</h1>
          <p className="text-slate-400 mt-2 font-medium">Enter your credentials for the neural SEO layer.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block ml-1">Email Matrix</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-5 flex items-center text-slate-500">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-14 pr-4 outline-none focus:border-indigo-500 transition-all font-bold text-white placeholder:text-slate-700"
                placeholder="operator@pirabel.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Passcode</label>
              {isLogin && <button type="button" className="text-[10px] text-indigo-400 font-black hover:underline uppercase tracking-widest">Recover</button>}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-5 flex items-center text-slate-500">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-14 pr-4 outline-none focus:border-indigo-500 transition-all font-bold text-white placeholder:text-slate-700"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black hover:bg-indigo-500 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20 active:scale-[0.98]"
          >
            {isLogin ? 'Initialize System' : 'Create Access'} <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center relative z-10">
          <p className="text-sm text-slate-400 font-medium">
            {isLogin ? "No access key yet?" : "Already have access?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-400 font-black hover:underline"
            >
              {isLogin ? 'Deploy New Account' : 'Return to Login'}
            </button>
          </p>
        </div>
      </div>

      <div className="mt-12 flex items-center gap-8 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-indigo-500" /> AES-256 ACTIVE
        </div>
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-indigo-500" /> GEMINI PRO 3.0
        </div>
      </div>
    </div>
  );
};

export default Auth;
