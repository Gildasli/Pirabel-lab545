
import React, { useState, useMemo } from 'react';
import { geminiService } from '../services/gemini';
import { KeywordMetric, UserProfile } from '../types';
import { Search, Sparkles, Filter, Download, ArrowUpRight, BarChart, Hash, DollarSign, ChevronUp, ChevronDown } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

interface KeywordsProps {
  user: UserProfile;
}

const Keywords: React.FC<KeywordsProps> = ({ user }) => {
  const { t } = useTranslation();
  const [seed, setSeed] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [keywords, setKeywords] = useState<KeywordMetric[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seed) return;

    setIsLoading(true);
    try {
      const data = await geminiService.getKeywordIntelligence(seed);
      setKeywords(data);
      setSortOrder(null); // Reset sort on new search
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSort = () => {
    if (sortOrder === 'asc') setSortOrder('desc');
    else if (sortOrder === 'desc') setSortOrder(null);
    else setSortOrder('asc');
  };

  const sortedKeywords = useMemo(() => {
    if (!sortOrder) return keywords;
    return [...keywords].sort((a, b) => {
      return sortOrder === 'asc' ? a.kd - b.kd : b.kd - a.kd;
    });
  }, [keywords, sortOrder]);

  const getDifficultyColor = (diff: number) => {
    if (diff < 30) return 'text-green-400 bg-green-500/10';
    if (diff < 70) return 'text-orange-400 bg-orange-500/10';
    return 'text-red-400 bg-red-500/10';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter">{t('keywords.title')}</h2>
          <p className="text-slate-500 font-medium">{t('keywords.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-800 bg-[#1e293b] rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all">
            <Filter size={14} /> {t('common.filters')}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition-all border border-slate-700">
            <Download size={14} /> {t('common.export')}
          </button>
        </div>
      </div>

      <div className="bg-[#1e293b] p-3 rounded-[32px] border border-slate-800 shadow-xl flex flex-col md:flex-row gap-2">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-5 flex items-center text-slate-500">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder={t('keywords.placeholder')} 
            className="w-full bg-transparent py-4 pl-14 pr-4 outline-none font-bold text-white placeholder:text-slate-700"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
          />
        </div>
        <button 
          onClick={handleSearch}
          disabled={isLoading}
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-600/20 active:scale-95"
        >
          {isLoading ? <Sparkles className="animate-pulse" size={20} /> : <Sparkles size={20} />}
          {t('keywords.analyzeBtn')}
        </button>
      </div>

      {sortedKeywords.length > 0 ? (
        <div className="bg-[#1e293b] rounded-[40px] border border-slate-800 shadow-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 border-b border-slate-800">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('common.keyword')}</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase text-center">{t('common.intent')}</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase text-center">{t('common.volume')}</th>
                <th 
                  className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase text-center cursor-pointer group hover:text-indigo-400 transition-colors"
                  onClick={toggleSort}
                >
                  <div className="flex items-center justify-center gap-2">
                    {t('common.difficulty')}
                    <div className="flex flex-col opacity-50 group-hover:opacity-100">
                      <ChevronUp size={10} className={sortOrder === 'asc' ? 'text-indigo-400' : ''} />
                      <ChevronDown size={10} className={sortOrder === 'desc' ? 'text-indigo-400' : ''} />
                    </div>
                  </div>
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase text-center">CPC</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sortedKeywords.map((kw, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-500">
                        <Hash size={16} />
                      </div>
                      <span className="font-bold text-white text-lg">{kw.keyword}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="text-[10px] font-black px-3 py-1 bg-slate-800 text-slate-400 rounded-full border border-slate-700">
                      {kw.intent}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-black text-white">{kw.volume.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Avg/mo</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-full max-w-[100px] h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${kw.kd < 30 ? 'bg-green-500' : kw.kd < 70 ? 'bg-orange-500' : 'bg-red-500'}`} 
                          style={{ width: `${kw.kd}%` }}
                        />
                      </div>
                      <span className={`text-[10px] font-black ${getDifficultyColor(kw.kd)} px-2 py-0.5 rounded-lg border border-white/5`}>
                        {kw.kd}/100
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex items-center justify-center gap-1 font-black text-white">
                      <DollarSign size={14} className="text-slate-500" />
                      {kw.cpc.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-slate-500 hover:text-indigo-400 transition-colors opacity-0 group-hover:opacity-100">
                      <ArrowUpRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-32 bg-[#1e293b] rounded-[48px] border-2 border-dashed border-slate-800">
            <div className="mx-auto w-20 h-20 bg-slate-900/50 rounded-3xl flex items-center justify-center text-slate-700 mb-6">
              <BarChart size={40} />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">{t('keywords.noKeywords')}</h3>
            <p className="text-slate-500 max-w-sm mx-auto font-medium">{t('keywords.noKeywordsSub')}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Keywords;
