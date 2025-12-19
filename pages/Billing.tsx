
import React from 'react';
import { UserProfile, UserPlan } from '../types';
import { CreditCard, Check, Zap, Shield, Crown, RefreshCw, BarChart3, Clock } from 'lucide-react';

interface BillingProps {
  user: UserProfile;
}

const Billing: React.FC<BillingProps> = ({ user }) => {
  const plans = [
    {
      name: UserPlan.FREE,
      price: '0',
      description: 'Ideal for small personal projects and basic SEO discovery.',
      features: ['3 Deep Audits per day', '5 Keyword searches', 'Standard UI access', 'Community support'],
      color: 'slate',
      icon: Shield
    },
    {
      name: UserPlan.PRO,
      price: '29',
      description: 'The ultimate toolkit for freelance SEOs and content marketers.',
      features: ['Unlimited Deep Audits', '3k Word AI Architect', 'Competitor Gap analysis', 'Daily Rank Tracking', 'Priority Support'],
      color: 'indigo',
      icon: Zap,
      popular: true
    },
    {
      name: UserPlan.AGENCY,
      price: '99',
      description: 'Built for scale. Professional reporting for enterprise clients.',
      features: ['White-label PDF Engine', '5k Word AI Architect', 'Full API & Webhook Access', 'Multi-user Team Seats', '24/7 Dedicated Agent'],
      color: 'purple',
      icon: Crown
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Current Subscription Status */}
      <div className="bg-[#1e293b] p-10 rounded-[40px] border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <BarChart3 size={160} />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <CreditCard size={24} />
             </div>
             <div>
                <h2 className="text-2xl font-black text-white">Subscription Management</h2>
                <p className="text-slate-400 font-medium">Your account is currently on the <span className="text-indigo-400 font-bold uppercase">{user.plan}</span> plan.</p>
             </div>
          </div>
          <div className="flex items-center gap-6 pt-2">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <Clock size={14} /> Next Billing: June 15, 2024
             </div>
             <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <RefreshCw size={14} /> Auto-renew: Active
             </div>
          </div>
        </div>
        <button className="bg-white text-black px-10 py-4 rounded-2xl font-black hover:bg-slate-200 transition-all shadow-xl active:scale-95 z-10">
          Manage via Stripe
        </button>
      </div>

      {/* Credit Usage Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'SEO Audits', used: 100 - user.creditsRemaining.audits, total: 100, color: 'bg-indigo-500' },
           { label: 'Keyword Queries', used: 1000 - user.creditsRemaining.keywords, total: 1000, color: 'bg-emerald-500' },
           { label: 'AI Words', used: 50000 - user.creditsRemaining.aiWords, total: 50000, color: 'bg-purple-500' },
         ].map(stat => (
           <div key={stat.label} className="bg-[#1e293b] p-8 rounded-[32px] border border-slate-800 shadow-lg">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{stat.label} Consumption</p>
              <div className="flex justify-between items-end mb-3">
                 <h4 className="text-3xl font-black text-white">{stat.total - stat.used}</h4>
                 <p className="text-xs font-bold text-slate-500">Credits Remaining</p>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                 <div 
                   className={`h-full ${stat.color} rounded-full transition-all duration-1000`} 
                   style={{ width: `${((stat.total - stat.used) / stat.total) * 100}%` }}
                 ></div>
              </div>
           </div>
         ))}
      </div>

      {/* Plan Selection Grid */}
      <div className="space-y-10">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white tracking-tight">Scale Your Search Presence</h3>
          <p className="text-slate-400 mt-2 font-medium">Upgrade or switch plans anytime. No hidden fees.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const isCurrent = user.plan === plan.name;
            const buttonColor = plan.name === UserPlan.PRO ? 'bg-white text-black' : 'bg-slate-800 text-white';
            const iconColor = plan.name === UserPlan.PRO ? 'text-indigo-400' : 'text-slate-400';
            
            return (
              <div 
                key={plan.name} 
                className={`p-10 rounded-[48px] border flex flex-col relative transition-all duration-500 hover:-translate-y-2 ${
                  plan.popular 
                  ? 'bg-[#1e293b] border-indigo-500 shadow-2xl shadow-indigo-500/20' 
                  : 'bg-[#1e293b]/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-widest border-4 border-[#0f172a]">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 ${iconColor}`}>
                    <plan.icon size={28} />
                  </div>
                  <h4 className="text-xl font-black text-white mb-2">{plan.name}</h4>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-5xl font-black text-white">€{plan.price}</span>
                    <span className="text-slate-500 font-bold">/mo</span>
                  </div>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map(feat => (
                    <li key={feat} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                      <Check className="text-indigo-500" size={18} /> {feat}
                    </li>
                  ))}
                </ul>

                <button 
                  disabled={isCurrent}
                  className={`w-full py-5 rounded-3xl font-black text-sm uppercase transition-all shadow-lg active:scale-95 disabled:opacity-50 ${
                    isCurrent ? 'bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed' : buttonColor
                  }`}
                >
                  {isCurrent ? 'Current Plan' : `Upgrade to ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Security Footer */}
      <div className="flex justify-center items-center gap-8 py-10 opacity-40">
        <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-500 uppercase">
          <Shield size={16} /> 256-Bit SSL Security
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-500 uppercase">
          <RefreshCw size={16} /> Secure Stripe Gateway
        </div>
      </div>
    </div>
  );
};

export default Billing;
