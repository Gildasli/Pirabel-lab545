
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="mb-8 flex items-center gap-2 font-bold text-3xl text-indigo-600">
        <Zap className="fill-indigo-600" />
        <span>Pirabel</span>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 lg:p-10">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-gray-900">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-gray-500 mt-2">Enter your details to access the SEO suite.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 block">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-700">Password</label>
              {isLogin && <a href="#" className="text-xs text-indigo-600 font-bold hover:underline">Forgot?</a>}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
          >
            {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 font-bold hover:underline"
            >
              {isLogin ? 'Sign up for free' : 'Log in here'}
            </button>
          </p>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-6 text-gray-400 text-sm">
        <div className="flex items-center gap-2">
          <Shield size={16} /> 256-bit Encryption
        </div>
        <div className="flex items-center gap-2">
          <Zap size={16} /> Gemini AI Powered
        </div>
      </div>
    </div>
  );
};

export default Auth;
