
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Search, BarChart2, LogOut, Zap, Menu, X, PenTool, Radar, CreditCard, Globe } from 'lucide-react';
import { UserProfile } from '../types';
import { useTranslation } from '../context/LanguageContext';

interface LayoutProps {
  user: UserProfile | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { t, language, setLanguage } = useTranslation();

  const navItems = [
    { name: t('nav.dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('nav.audit'), path: '/audit', icon: Search },
    { name: t('nav.keywords'), path: '/keywords', icon: BarChart2 },
    { name: t('nav.writer'), path: '/writer', icon: PenTool },
    { name: t('nav.tracker'), path: '/tracker', icon: Radar },
    { name: t('nav.billing'), path: '/billing', icon: CreditCard },
  ];

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-200">
      <button 
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-2xl"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-72 bg-[#1e293b] border-r border-slate-800 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-8">
            <Link to="/" className="flex items-center gap-2 font-black text-2xl text-indigo-500">
              <Zap className="fill-indigo-500" size={32} />
              <span>Pirabel<span className="text-white">Suite</span></span>
            </Link>
          </div>

          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon size={20} className={isActive ? 'text-white' : 'group-hover:text-indigo-400'} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-6 border-t border-slate-800">
            {/* Language Switcher */}
            <div className="flex items-center justify-between mb-6 px-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Globe size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Language</span>
              </div>
              <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 text-[10px] font-black rounded-md transition-all ${language === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLanguage('fr')}
                  className={`px-2 py-1 text-[10px] font-black rounded-md transition-all ${language === 'fr' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
                >
                  FR
                </button>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 mb-4">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Usage Credits</p>
              <div className="flex justify-between items-end mb-2">
                <p className="text-2xl font-bold text-white">{user?.creditsRemaining.audits}</p>
                <p className="text-xs text-slate-500">/ 100 limit</p>
              </div>
              <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: `${(user?.creditsRemaining.audits || 0)}%` }}></div>
              </div>
            </div>
            
            <button 
              onClick={onLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
            >
              <LogOut size={18} />
              {t('nav.signout')}
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto relative">
        <header className="bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-800 py-4 px-8 sticky top-0 z-30 flex justify-between items-center">
          <h1 className="font-extrabold text-xl text-white">
            {navItems.find(i => i.path === location.pathname)?.name || 'SEO Studio'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold text-white leading-none">{user?.email}</p>
              <p className="text-[10px] font-bold text-indigo-400 uppercase">{user?.plan}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20">
              {user?.email[0].toUpperCase()}
            </div>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
