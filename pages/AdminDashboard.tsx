
import React from 'react';
import { UserProfile } from '../types';
import { 
  Users, CreditCard, BarChart3, Activity, 
  TrendingUp, ArrowUpRight, ArrowDownRight, 
  AlertCircle, ShieldCheck, Terminal, Settings
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminDashboardProps {
  user: UserProfile;
}

const mockRevenueData = [
  { name: 'Jan', rev: 4200 },
  { name: 'Feb', rev: 5600 },
  { name: 'Mar', rev: 8900 },
  { name: 'Apr', rev: 12400 },
  { name: 'May', rev: 15600 },
  { name: 'Jun', rev: 22400 },
];

const mockUsers = [
  { id: '1', email: 'alex@startup.io', plan: 'PRO', joined: '2024-05-12', status: 'Active' },
  { id: '2', email: 'marta@agency.com', plan: 'AGENCY', joined: '2024-05-14', status: 'Active' },
  { id: '3', email: 'john@freelance.net', plan: 'FREE', joined: '2024-05-15', status: 'Inactive' },
  { id: '4', email: 'dev@tech.co', plan: 'AGENCY', joined: '2024-05-16', status: 'Active' },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  if (user.role !== 'ADMIN') {
    return (
      <div className="h-full flex items-center justify-center text-center p-12 bg-red-500/5 border border-red-500/10 rounded-[40px]">
        <div className="space-y-6">
          <AlertCircle size={64} className="text-red-500 mx-auto" />
          <h2 className="text-3xl font-black text-white">ACCESS DENIED</h2>
          <p className="text-slate-400 font-medium">Insufficient permissions to access the Pirabel Control Layer.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">System <span className="text-indigo-500">Backstage.</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">Platform Status: HEALTHY • LATENCY: 14ms</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase hover:bg-slate-700 transition-all flex items-center gap-2">
             <Settings size={16} /> Global Config
           </button>
           <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20">
             Deploy Patch v4.2.1
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Platform Users', value: '2,482', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-500/10', delta: '+124' },
          { label: 'Monthly Revenue', value: '€22.4k', icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-500/10', delta: '+€3.2k' },
          { label: 'Audit Velocity', value: '14,204', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10', delta: '+8%' },
          { label: 'Conversion', value: '14.2%', icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-500/10', delta: '+1.4%' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#1e293b] p-8 rounded-[40px] border border-slate-800 shadow-xl relative overflow-hidden group">
            <div className={`absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity`}>
               <stat.icon size={100} />
            </div>
            <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6`}>
               <stat.icon size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
               <h4 className="text-3xl font-black text-white">{stat.value}</h4>
               <span className="text-xs font-bold text-green-500 flex items-center">{stat.delta} <ArrowUpRight size={14} /></span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#1e293b] p-10 rounded-[48px] border border-slate-800 shadow-2xl">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black text-white">Revenue Trajectory</h3>
            <div className="flex gap-4">
               <span className="px-4 py-2 bg-slate-900 rounded-xl text-xs font-bold text-slate-400">Monthly</span>
               <span className="px-4 py-2 hover:bg-slate-900 rounded-xl text-xs font-bold text-slate-400 transition-all cursor-pointer">Quarterly</span>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 'bold'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 'bold'}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#0f172a', borderRadius: '24px', border: '1px solid #1e293b', padding: '16px'}}
                  itemStyle={{color: '#fff', fontWeight: 'bold'}}
                  cursor={{stroke: '#6366f1', strokeWidth: 2}}
                />
                <Area 
                  type="monotone" 
                  dataKey="rev" 
                  stroke="#6366f1" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1e293b] p-10 rounded-[48px] border border-slate-800 shadow-2xl flex flex-col">
          <h3 className="text-xl font-black text-white mb-8 flex items-center gap-2">
            <Terminal size={20} className="text-indigo-500" /> System Pulse
          </h3>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {[
              { type: 'SUCCESS', msg: 'Audit queue processed (142 links)', time: '2m ago' },
              { type: 'INFO', msg: 'New Pro subscription: alex@tech.co', time: '14m ago' },
              { type: 'ERROR', msg: 'Gemini API limit hit for user #482', time: '22m ago' },
              { type: 'WARNING', msg: 'Stripe Webhook delayed (3s retry)', time: '1h ago' },
              { type: 'SUCCESS', msg: 'Weekly MRR report emailed to Admin', time: '4h ago' },
            ].map((log, i) => (
              <div key={i} className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    log.type === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-500' :
                    log.type === 'ERROR' ? 'bg-red-500/10 text-red-500' :
                    log.type === 'WARNING' ? 'bg-amber-500/10 text-amber-500' : 'bg-indigo-500/10 text-indigo-500'
                  }`}>
                    {log.type}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">{log.time}</span>
                </div>
                <p className="text-xs text-slate-300 font-medium">{log.msg}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#1e293b] rounded-[48px] border border-slate-800 overflow-hidden shadow-2xl">
         <div className="p-8 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-xl font-black text-white">Active Entities</h3>
            <div className="flex gap-2">
               <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all">Filter</button>
               <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all">Export Users</button>
            </div>
         </div>
         <table className="w-full text-left">
            <thead className="bg-slate-900/50">
               <tr>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">User Entity</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Subscription</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Joined</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Access Level</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
               {mockUsers.map(u => (
                  <tr key={u.id} className="hover:bg-white/5 transition-colors group">
                     <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-black text-white">
                              {u.email[0].toUpperCase()}
                           </div>
                           <div>
                              <p className="font-bold text-white">{u.email}</p>
                              <p className="text-xs text-slate-500">ID: {u.id}</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-10 py-6 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                           u.plan === 'AGENCY' ? 'bg-purple-500/10 text-purple-400' :
                           u.plan === 'PRO' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-700 text-slate-300'
                        }`}>
                           {u.plan}
                        </span>
                     </td>
                     <td className="px-10 py-6 text-center text-sm font-bold text-slate-400">{u.joined}</td>
                     <td className="px-10 py-6 text-right">
                        <button className="text-indigo-500 hover:text-indigo-400 font-black text-xs uppercase tracking-widest">Manage User</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
