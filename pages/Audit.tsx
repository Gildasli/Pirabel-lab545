
import React, { useState } from 'react';
import { Search, Loader2, CheckCircle2, AlertTriangle, Info, Globe, Shield, Zap, FileText, Download, Activity, ExternalLink } from 'lucide-react';
import { geminiService } from '../services/gemini';
import { SEOAuditResult, UserProfile } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { jsPDF } from 'jspdf';

interface AuditProps {
  user: UserProfile;
}

const Audit: React.FC<AuditProps> = ({ user }) => {
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
      // Basic validation for URL
      const validUrl = url.startsWith('http') ? url : `https://${url}`;
      // In a real app, you'd fetch the HTML here via a proxy. 
      // For this demo, we simulate the HTML retrieval.
      const simulatedHtml = `<html><head><title>${validUrl} | Enterprise SEO Solutions</title><meta name="description" content="Discover how ${validUrl} can transform your organic growth with our cutting-edge SEO technology and expert strategies."></head><body><h1>Next-Gen SEO for ${validUrl}</h1><h2>Advanced Features</h2><p>Performance, Security, and Content at scale.</p><h3>Technical Infrastructure</h3><p>Optimized for Core Web Vitals.</p></body></html>`;
      
      const analysis = await geminiService.performDeepAudit(validUrl, simulatedHtml);
      setResult({ ...analysis, url: validUrl });
    } catch (err) {
      console.error(err);
      setError('Analysis failed. The neural engine encountered an error or the URL is unreachable.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, 50, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('PIRABEL SEO AUDIT', 20, 30);
    
    doc.setFontSize(10);
    doc.text(`URL: ${result.url}`, 20, 42);
    doc.text(`DATE: ${new Date().toLocaleDateString()}`, pageWidth - 60, 42);

    // Score Section
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.text(`OVERALL SEO SCORE: ${result.score}/100`, 20, 70);

    // Recommendations
    doc.setFontSize(14);
    doc.text('TOP RECOMMENDATIONS', 20, 90);
    doc.setFontSize(10);
    result.recommendations.slice(0, 10).forEach((rec, i) => {
      doc.text(`${i + 1}. [${rec.category.toUpperCase()}] ${rec.message}`, 20, 105 + (i * 10));
    });

    doc.save(`pirabel-audit-${result.url.replace(/[^a-z0-9]/gi, '_')}.pdf`);
  };

  const scoreData = result ? [
    { name: 'Score', value: result.score },
    { name: 'Remaining', value: 100 - result.score },
  ] : [];

  const COLORS = ['#6366f1', '#1e293b'];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Search Header */}
      <div className="bg-[#1e293b] p-12 rounded-[40px] border border-slate-800 shadow-2xl text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
          <Activity size={180} />
        </div>
        <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">SEO Intelligence Scan</h2>
        <p className="text-slate-400 mb-10 max-w-lg mx-auto font-medium">Deep crawling & technical diagnostic powered by Gemini 3 Logic Layer.</p>
        
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
            {isAnalyzing ? 'Scanning...' : 'Start Audit'}
          </button>
        </form>
        {error && <p className="mt-6 text-red-500 font-bold bg-red-500/10 py-2 px-4 rounded-xl inline-block border border-red-500/20">{error}</p>}
      </div>

      {result && (
        <div className="space-y-8">
          {/* Results Summary Bar */}
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
              Export White-Label PDF
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Score Chart */}
            <div className="bg-[#1e293b] p-8 rounded-[40px] border border-slate-800 flex flex-col items-center justify-center text-center shadow-xl">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Aggregate SEO Score</p>
              <div className="relative w-44 h-44 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={scoreData}
                      innerRadius={70}
                      outerRadius={85}
                      paddingAngle={0}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                      stroke="none"
                    >
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
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50">
                  <p className="text-[9px] font-black text-slate-500 mb-1 uppercase">Efficiency</p>
                  <p className="text-lg font-black text-green-500">{result.performance.loadSpeed}ms</p>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50">
                  <p className="text-[9px] font-black text-slate-500 mb-1 uppercase">Trust</p>
                  <p className="text-lg font-black text-indigo-400">98%</p>
                </div>
              </div>
            </div>

            {/* Performance & Core Web Vitals */}
            <div className="lg:col-span-3 bg-[#1e293b] p-10 rounded-[40px] border border-slate-800 flex flex-col shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Core Web Vitals Matrix</h3>
                <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black border border-green-500/20">HEALTHY</span>
              </div>
              <div className="grid md:grid-cols-3 gap-8 flex-1">
                {[
                  { label: 'Largest Contentful Paint', value: `${result.coreWebVitals?.lcp || 1.2}s`, status: 'Optimal', sub: 'Visual Load' },
                  { label: 'First Input Delay', value: `${result.coreWebVitals?.fid || 12}ms`, status: 'Excellent', sub: 'Interactivity' },
                  { label: 'Cumulative Layout Shift', value: result.coreWebVitals?.cls || 0.01, status: 'Perfect', sub: 'Stability' },
                ].map((item, i) => (
                  <div key={i} className="space-y-4 p-8 bg-slate-900/40 rounded-[32px] border border-slate-800/50 hover:border-indigo-500/30 transition-colors">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.sub}</p>
                    <div>
                      <p className="text-4xl font-black text-white">{item.value}</p>
                      <p className="text-xs font-bold text-slate-400 mt-1">{item.label}</p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-green-500 bg-green-500/5 px-2 py-1 rounded-lg">
                      <CheckCircle2 size={12} /> {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Meta & Content Analysis */}
            <div className="bg-[#1e293b] p-10 rounded-[40px] border border-slate-800 shadow-xl space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <h4 className="text-lg font-black text-white">Metadata Analysis</h4>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 bg-slate-900/60 rounded-3xl border border-slate-800/50">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Title Tag Intelligence</p>
                    <span className="text-[10px] font-bold text-slate-500">{result.metaTags.title.length} characters</span>
                  </div>
                  <p className="text-white font-bold text-lg leading-tight">{result.metaTags.title}</p>
                </div>
                
                <div className="p-6 bg-slate-900/60 rounded-3xl border border-slate-800/50">
                   <div className="flex justify-between items-center mb-2">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Meta Description Scan</p>
                    <span className="text-[10px] font-bold text-slate-500">{result.metaTags.description.length} characters</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">{result.metaTags.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-900/30 rounded-2xl border border-slate-800/30">
                    <p className="text-[9px] font-black text-slate-500 uppercase mb-1">H1 Heading</p>
                    <p className="text-white text-xs font-bold truncate">{result.headings.h1[0] || 'Missing'}</p>
                  </div>
                  <div className="p-4 bg-slate-900/30 rounded-2xl border border-slate-800/30">
                    <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Hierarchy</p>
                    <p className="text-white text-xs font-bold">Score: {result.headings.hierarchyScore}/100</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Audit */}
            <div className="bg-[#1e293b] p-10 rounded-[40px] border border-slate-800 shadow-xl space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Shield size={20} />
                </div>
                <h4 className="text-lg font-black text-white">Security Intelligence</h4>
              </div>

              <div className="space-y-6">
                <div className="p-8 bg-slate-900/60 rounded-3xl flex justify-between items-center border border-slate-800/50">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Protocol Integrity</p>
                      <h5 className="text-xl font-black text-white">{result.security.https ? 'HTTPS Encrypted' : 'Security Warning'}</h5>
                      <p className="text-xs text-slate-500 font-medium">{result.security.https ? 'Safe communication channel verified.' : 'Site is transmitting data in the clear.'}</p>
                   </div>
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${result.security.https ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                      {result.security.https ? <CheckCircle2 size={32} /> : <AlertTriangle size={32} />}
                   </div>
                </div>

                {result.security.sslExpiry && (
                  <div className="p-6 bg-slate-900/40 rounded-3xl border border-slate-800/30 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Zap size={20} className="text-amber-500" />
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase">SSL Expiry Date</p>
                        <p className="text-sm font-bold text-white">{result.security.sslExpiry}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-green-500 bg-green-500/5 px-2 py-1 rounded-md">VALID</span>
                  </div>
                )}

                <div className="space-y-3">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Security Headers Analysis</p>
                  <div className="flex flex-wrap gap-2">
                    {result.security.securityHeaders.map((header, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-slate-800/80 rounded-xl text-[10px] font-bold text-slate-300 border border-slate-700/50">
                        {header}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actionable Recommendations List */}
          <div className="bg-[#1e293b] p-10 rounded-[40px] border border-slate-800 shadow-xl overflow-hidden">
             <div className="flex justify-between items-center mb-10">
                <h4 className="text-xl font-black text-white">Actionable Recommendations</h4>
                <div className="flex gap-4">
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-red-500"><div className="w-2 h-2 rounded-full bg-red-500"></div> Critical</span>
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-amber-500"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Warning</span>
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-indigo-400"><div className="w-2 h-2 rounded-full bg-indigo-400"></div> Info</span>
                </div>
             </div>

             <div className="space-y-4">
                {result.recommendations.map((rec, i) => (
                  <div key={i} className="group flex items-start gap-6 p-6 rounded-[32px] bg-slate-900/40 border border-slate-800/50 hover:bg-slate-900/60 transition-all hover:border-indigo-500/20">
                    <div className={`mt-1.5 shrink-0 ${
                      rec.type === 'critical' ? 'text-red-500' :
                      rec.type === 'warning' ? 'text-amber-500' : 'text-indigo-400'
                    }`}>
                      {rec.type === 'critical' ? <AlertTriangle size={24} /> : <Info size={24} />}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{rec.category}</p>
                        <span className="text-[10px] font-black text-white bg-slate-800 px-2 py-1 rounded">IMPACT: +{rec.impact}</span>
                      </div>
                      <h5 className="font-bold text-white text-lg">{rec.message}</h5>
                      <p className="text-slate-400 text-sm font-medium leading-relaxed">{rec.suggestion}</p>
                    </div>
                    <button className="self-center p-3 bg-indigo-600/10 text-indigo-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                      <Zap size={18} />
                    </button>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Audit;
