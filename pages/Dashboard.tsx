
import React from 'react';
import { UserProfile } from '../types';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Target, 
  ArrowUpRight, 
  ArrowDownRight,
  AlertCircle
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface DashboardProps {
  user: UserProfile;
}

const mockData = [
  { name: 'Mon', traffic: 4000, rank: 24 },
  { name: 'Tue', traffic: 3000, rank: 18 },
  { name: 'Wed', traffic: 2000, rank: 22 },
  { name: 'Thu', traffic: 2780, rank: 25 },
  { name: 'Fri', traffic: 1890, rank: 30 },
  { name: 'Sat', traffic: 2390, rank: 28 },
  { name: 'Sun', traffic: 3490, rank: 21 },
];

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Avg SEO Score', value: '84', change: '+2.5%', color: 'indigo', icon: Target },
          { label: 'Organic Traffic', value: '12,402', change: '+12%', color: 'green', icon: Eye },
          { label: 'Active Keywords', value: '142', change: '-4', color: 'orange', icon: TrendingUp },
          { label: 'Backlinks', value: '1,290', change: '+24', color: 'blue', icon: Users },
        ].map((stat, i) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          return (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                  <Icon size={24} />
                </div>
                <div className={`flex items-center text-xs font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                  {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                </div>
              </div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Organic Visibility</h3>
            <select className="bg-gray-50 border-gray-200 rounded-lg text-sm p-2 outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="traffic" 
                  stroke="#6366f1" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorTraffic)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6">Critical Alerts</h3>
          <div className="space-y-4">
            {[
              { site: 'mywebsite.com', msg: 'Broken canonical tags detected', priority: 'high' },
              { site: 'shop.net', msg: 'Large CLS shift on mobile', priority: 'medium' },
              { site: 'blog.com', msg: '404 error spikes (+120%)', priority: 'high' },
              { site: 'agency.io', msg: 'SSL Certificate expiring', priority: 'medium' },
            ].map((alert, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`mt-1 ${alert.priority === 'high' ? 'text-red-500' : 'text-orange-500'}`}>
                  <AlertCircle size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">{alert.site}</p>
                  <p className="text-sm text-gray-700 font-medium">{alert.msg}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 bg-gray-50 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors">
            View All Alerts
          </button>
        </div>
      </div>

      {/* Recent Keywords */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Top Performing Keywords</h3>
          <button className="text-indigo-600 text-sm font-bold hover:underline">View All</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Keyword</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Position</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Volume</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { kw: 'best seo tools 2024', pos: '#2', vol: '12.4k', trend: 'up' },
              { kw: 'ai marketing platform', pos: '#4', vol: '8.1k', trend: 'up' },
              { kw: 'seo auditor chrome extension', pos: '#1', vol: '2.3k', trend: 'stable' },
              { kw: 'rank tracker dashboard', pos: '#12', vol: '5.6k', trend: 'down' },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-gray-700">{row.kw}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">{row.pos}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">{row.vol}</td>
                <td className="px-6 py-4">
                  {row.trend === 'up' && <div className="w-12 h-6 bg-green-100 rounded-full flex items-center justify-center"><ArrowUpRight size={14} className="text-green-600" /></div>}
                  {row.trend === 'down' && <div className="w-12 h-6 bg-red-100 rounded-full flex items-center justify-center"><ArrowDownRight size={14} className="text-red-600" /></div>}
                  {row.trend === 'stable' && <div className="w-12 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xs">-</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
