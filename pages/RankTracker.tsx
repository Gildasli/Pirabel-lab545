
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Radar, ArrowUpRight, ArrowDownRight, Search, Globe, Filter, Download, Plus, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RankTrackerProps {
  user: UserProfile;
}

const mockHistory = [
  { day: '1', pos: 12 },
  { day: '2', pos: 10 },
  { day: '3', pos: 11 },
  { day: '4', pos: 8 },
  { day: '5', pos: 7 },
  { day: '6', pos: 4 },
  { day: '7', pos: 3 },
];

const RankTracker: React.FC<RankTrackerProps> = ({ user }) => {
  const [keywords, setKeywords] = useState([
    { kw: 'ai seo tools', pos: 3, prev: 7, vol: '12.4k', url: '/blog/best-ai-seo-tools' },
    { kw: 'neural scraper api', pos: 1, prev: 1, vol: '2.1k', url: '/products/neural-scraper' },
    { kw: 'seo suites for agency', pos: 14, prev: 22, vol: '5.6k', url: '/' },
    { kw: 'automated ranking platform', pos: 8, prev: 6, vol: '8.9k', url: '/features' },
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter">Project: <span className="text-indigo-500">pirabel.io</span></h2>
          <p className="text-slate-500 font-medium">Tracking 142 organic keywords across 12 regions.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center gap-2">
            <Download size={18} /> Export
          </button>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black hover:bg-indigo-500 transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20">
            <Plus size={18} /> Add Keywords
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Visibility Score */}
        <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-[40px] flex flex-col">
          <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6">Organic Visibility</h3>
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-7xl font-black text-white mb-2">42%</p>
            <div className="flex items-center gap-2 text-green-500 font-bold">
              <ArrowUpRight size={20} /> +12.4% vs last week
            </div>
            <div className="mt-8 h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockHistory}>
                  <Line type="monotone" dataKey="pos" stroke="#6366f1" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Movers */}
        <div className="lg:col-span-2 bg-[#1e293b] border border-slate-800 p-8 rounded-[40px] shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-white">Top Gaining Keywords</h3>
            <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Ranking</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-700"></div> Previous</div>
            </div>
          </div>
          <div className="space-y-6">
            {keywords.slice(0, 3).map((k, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-500 font-black">
                    #{k.pos}
                  </div>
                  <div>
                    <p className="font-black text-white">{k.kw}</p>
                    <p className="text-xs text-slate-500 italic">{k.url}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-green-500">+{k.prev - k.pos} positions</p>
                  <p className="text-xs text-slate-500">{k.vol} searches</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-[#1e293b] border border-slate-800 rounded-[40px] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-800 flex justify-between items-center">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input className="bg-slate-900 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-indigo-500" placeholder="Filter keywords..." />
            </div>
            <button className="p-2 border border-slate-800 rounded-xl text-slate-500 hover:text-white"><Filter size={20} /></button>
          </div>
          <p className="text-xs font-black text-slate-500 uppercase tracking-tighter">Tracking performance v4.2.0</p>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase">Keyword & Landing Page</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase text-center">Rank</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase text-center">Delta</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase text-center">Volume</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {keywords.map((k, i) => {
              const delta = k.prev - k.pos;
              return (
                <tr key={i} className="group hover:bg-white/5 transition-colors">
                  <td className="px-8 py-6">
                    <p className="font-bold text-white mb-1">{k.kw}</p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-400">
                      <Globe size={10} /> {k.url}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`text-xl font-black ${k.pos <= 3 ? 'text-indigo-400' : 'text-white'}`}>#{k.pos}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-black ${delta > 0 ? 'text-green-500 bg-green-500/10' : delta < 0 ? 'text-red-500 bg-red-500/10' : 'text-slate-500 bg-slate-800'}`}>
                      {delta > 0 ? '+' : ''}{delta}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="text-sm font-bold text-slate-400">{k.vol}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankTracker;
