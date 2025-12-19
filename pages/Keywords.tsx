
import React, { useState } from 'react';
import { geminiService } from '../services/gemini';
{/* Fix: KeywordSuggestion is not exported, using KeywordMetric instead */}
import { KeywordMetric, UserProfile } from '../types';
import { Search, Sparkles, Filter, Download, ArrowUpRight, BarChart, Hash, DollarSign } from 'lucide-react';

interface KeywordsProps {
  user: UserProfile;
}

const Keywords: React.FC<KeywordsProps> = ({ user }) => {
  const [seed, setSeed] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [keywords, setKeywords] = useState<KeywordMetric[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seed) return;

    setIsLoading(true);
    try {
      {/* Fix: Call getKeywordIntelligence instead of generateKeywords */}
      const data = await geminiService.getKeywordIntelligence(seed);
      setKeywords(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getDifficultyColor = (diff: number) => {
    if (diff < 30) return 'text-green-600 bg-green-50';
    if (diff < 70) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Keyword Explorer</h2>
          <p className="text-gray-500">Uncover high-intent keywords using Gemini AI insights.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-white transition-all">
            <Filter size={16} /> Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-md">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-2">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-4 flex items-center text-gray-400">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Enter seed keyword (e.g., 'sustainable fashion')" 
            className="w-full py-4 pl-12 pr-4 outline-none font-medium"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
          />
        </div>
        <button 
          onClick={handleSearch}
          disabled={isLoading}
          className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:bg-indigo-300"
        >
          {isLoading ? <div className="animate-spin border-2 border-white/20 border-t-white w-5 h-5 rounded-full" /> : <Sparkles size={20} />}
          Analyze Keywords
        </button>
      </div>

      {keywords.length > 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase">Keyword</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase text-center">Intent</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase text-center">Volume</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase text-center">Difficulty</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase text-center">CPC</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {keywords.map((kw, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Hash size={16} />
                      </div>
                      <span className="font-bold text-gray-800">{kw.keyword}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded-lg">
                      {kw.intent}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-gray-800">{kw.volume.toLocaleString()}</span>
                      <span className="text-[10px] text-gray-400 uppercase">Avg/mo</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-full max-w-[80px] h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        {/* Fix: Keyword difficulty property is kd in KeywordMetric */}
                        <div 
                          className={`h-full rounded-full ${kw.kd < 30 ? 'bg-green-500' : kw.kd < 70 ? 'bg-orange-500' : 'bg-red-500'}`} 
                          style={{ width: `${kw.kd}%` }}
                        />
                      </div>
                      <span className={`text-xs font-bold ${getDifficultyColor(kw.kd)} px-2 py-0.5 rounded`}>
                        {kw.kd}/100
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="flex items-center justify-center gap-1 font-bold text-gray-700">
                      <DollarSign size={14} className="text-gray-400" />
                      {kw.cpc.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                      <ArrowUpRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 mb-4">
              <BarChart size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No keywords to display</h3>
            <p className="text-gray-500 max-w-sm mx-auto">Enter a seed keyword above to start generating AI-powered suggestions for your SEO campaign.</p>
          </div>
        )
      )}
    </div>
  );
};

export default Keywords;
