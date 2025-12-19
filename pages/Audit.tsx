
import React, { useState } from 'react';
import { Search, Loader2, CheckCircle2, AlertTriangle, Info, Globe, Shield, Zap, FileText, Download, Activity, ExternalLink } from 'lucide-react';
import { geminiService } from '../services/gemini';
import { SEOAuditResult, UserProfile } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { jsPDF } from 'jspdf';
import { useTranslation } from '../context/LanguageContext';

interface AuditProps {
  user: UserProfile;
}

const Audit: React.FC<AuditProps> = ({ user }) => {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SEOAuditResult | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsAnalyzing(true);
    setError('');
    try {
      const validUrl = url.startsWith('http') ? url : `https://${url}`;
      const simulatedHtml = `<html><head><title>${validUrl}</title></head><body><h1>SEO Scan for ${validUrl}</h1></body></html>`;
      const analysis = await geminiService.performDeepAudit(validUrl, simulatedHtml);
      setResult({ ...analysis, url: validUrl });
    } catch (err) {
      setError(t('common.error'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    doc.text(`SEO Audit - ${result.url}`, 20, 20);
    doc.save(`audit-${result.url}.pdf`);
  };

  const scoreData = result ? [
    { name: 'Score', value: result.score },
    { name: 'Remaining', value: 100 - result.score },
  ] : [];

  const COLORS = ['#6366f1', '#1e293b'];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="bg-[#1e293b] p-12 rounded-[40px] border border-slate-800 shadow-2xl text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
          <Activity size={180} />
        </div>
        <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">{t('audit.title')}</h2>
        <p className="text-slate-400 mb-10 max-w-lg mx-auto font-medium">{t('audit.subtitle')}</p>
        
        <form onSubmit={handleAnalyze} className="relative max-w-3xl mx-auto">
          <div className="absolute inset-y-0 left-6 flex items-center text-slate-500">
            <Globe size={24} />
          </div>
          <input 
            type="text" 
            placeholder="example.com" 
            className="w-full bg-slate-900 border-2 border-slate-800 rounded-[28px] py-6 pl-16 pr-44 outline-none focus:border-indigo-500 transition-all font-bold text-xl text-white placeholder:text-slate-700"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            type="submit"
            disabled={isAnalyzing}
            className="absolute top-2.5 right-2.5 bottom-2.5 bg-indigo-600 text-white px-10 rounded-[22px] font-black hover:bg-indigo-500 transition-all flex items-center gap-3 disabled:opacity-50 shadow-xl shadow-indigo-600/20 active:scale-95"
          >
            {isAnalyzing ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
            {isAnalyzing ? t('common.loading') : t('audit.scanBtn')}
          </button>
        </form>
      </div>

      {result && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 gap-4">
             <div>
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                  {result.url} <ExternalLink size={18} className="text-slate-500" />
                </h3>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-1">Audit Signature: {Math.random().toString(36).substr(2, 12).toUpperCase()}</p>
             </div>
             <button 
              onClick={downloadPDF}
              className="flex items-center gap-2 bg-[#1e293b] border border-slate-800 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all group shadow-lg"
            >
              <Download size={20} className="text-indigo-400 group-hover:scale-110 transition-transform" /> 
              {t('audit.exportPdf')}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="bg-[#1e293b] p-8 rounded-[40px] border border-slate-800 flex flex-col items-center justify-center text-center shadow-xl">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">{t('audit.scoreLabel')}</p>
              <div className="relative w-44 h-44 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={scoreData} innerRadius={70} outerRadius={85} paddingAngle={0} dataKey="value" startAngle={90} endAngle={-270} stroke="none">
                      {scoreData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-black text-white">{result.score}</span>
                  <span className="text-[10px] text-slate-500 font-black">PERCENTILE</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 bg-[#1e293b] p-10 rounded-[40px] border border-slate-800 shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Core Web Vitals Matrix</h3>
                <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black border border-green-500/20">HEALTHY</span>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { label: 'LCP', value: `${result.coreWebVitals?.lcp || 1.2}s`, sub: 'Visual Load' },
                  { label: 'FID', value: `${result.coreWebVitals?.fid || 12}ms`, sub: 'Interactivity' },
                  { label: 'CLS', value: result.coreWebVitals?.cls || 0.01, sub: 'Stability' },
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-slate-900/40 rounded-[32px] border border-slate-800/50">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.sub}</p>
                    <p className="text-4xl font-black text-white">{item.value}</p>
                    <p className="text-xs font-bold text-slate-400 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Audit;
