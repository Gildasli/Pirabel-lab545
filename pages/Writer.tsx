
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { geminiService } from '../services/gemini';
import { PenTool, Sparkles, Wand2, Search, FileText, ChevronRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WriterProps {
  user: UserProfile;
}

const Writer: React.FC<WriterProps> = ({ user }) => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState<any>(null);
  const [content, setContent] = useState('');

  const handleGenerate = async () => {
    if (!topic) return;
    setIsLoading(true);
    try {
      {/* Fix: Call generateUltraLongArticle instead of generateArticle */}
      const data = await geminiService.generateUltraLongArticle(topic, user.plan);
      setArticle(data);
      setContent(data.content);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateKeywordDensity = () => {
    if (!article || !article.targetKeywords) return [];
    return article.targetKeywords.map((kw: string) => {
      const count = (content.match(new RegExp(kw, 'gi')) || []).length;
      return { kw, count, status: count > 0 ? 'good' : 'missing' };
    });
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Editor Sidebar (Controls) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-3xl">
            <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-indigo-400" /> AI Composer
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase mb-1 block">Article Topic</label>
                <textarea 
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none"
                  placeholder="e.g. The Future of Sustainable Architecture in 2025"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase mb-1 block">Target Keywords (optional)</label>
                <input 
                  type="text"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="kw1, kw2, kw3..."
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-sm hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
                Generate Article
              </button>
            </div>
          </div>

          {article && (
            <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-3xl">
              <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                <Search size={18} className="text-indigo-400" /> SEO Checklist
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-xl">
                  <span className="text-sm font-bold text-slate-400">Content Score</span>
                  <span className="text-xl font-black text-green-500">{article.seoScore || 0}%</span>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-500 uppercase">Keyword Density</p>
                  {calculateKeywordDensity().map((item: any, i: number) => (
                    <div key={i} className="flex justify-between text-xs p-2 rounded-lg bg-slate-900/30">
                      <span className="text-slate-300">{item.kw}</span>
                      <span className={item.count > 0 ? 'text-green-500' : 'text-red-400'}>{item.count}x</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Editor Area */}
        <div className="lg:col-span-3">
          <div className="bg-[#1e293b] min-h-[800px] border border-slate-800 rounded-[40px] shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-slate-900/50 border-b border-slate-800 p-4 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Article Editor v2.0</span>
              <div className="flex gap-4">
                <button className="text-xs font-bold text-slate-400 hover:text-white">Preview</button>
                <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Publish</button>
              </div>
            </div>
            
            <div className="p-12 lg:p-20 flex-1">
              {!article && !isLoading ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                  <PenTool size={64} className="text-slate-600" />
                  <h2 className="text-2xl font-black">Draft your masterpiece.</h2>
                  <p className="max-w-xs text-slate-400 font-medium">Use the left sidebar to generate or start typing manually to optimize your content.</p>
                </div>
              ) : isLoading ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                    <Sparkles className="absolute inset-0 m-auto text-indigo-400 animate-pulse" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">Neural Engine Writing...</h3>
                    <p className="text-slate-400 font-medium">Analyzing SERPs and optimizing semantic structure.</p>
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="prose prose-invert max-w-none"
                >
                  <h1 className="text-5xl font-black text-white mb-8 outline-none border-b border-transparent hover:border-slate-800 transition-all focus:border-indigo-500/50 pb-4" contentEditable suppressContentEditableWarning>
                    {article.title}
                  </h1>
                  <div 
                    className="text-xl text-slate-300 leading-relaxed outline-none min-h-[600px]"
                    contentEditable 
                    suppressContentEditableWarning
                    onInput={(e: any) => setContent(e.currentTarget.innerText)}
                  >
                    {article.content.split('\n').map((line: string, i: number) => (
                      <p key={i} className="mb-6">{line}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Writer;
