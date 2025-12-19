
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, Shield, Search, BarChart3, Globe, Check, ArrowRight, 
  Cpu, Rocket, Layers, BarChart, MousePointer2, Smartphone, 
  Lock, Users, MessageSquare, Download, Play, Quote, PenTool, 
  CheckCircle2, Radar, Server, Activity, Terminal, Code2, Globe2,
  DollarSign
} from 'lucide-react';

const Landing: React.FC = () => {
  // Fix: Easing string type mismatch by using a numeric array or cast
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div className="bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500 selection:text-white">
      {/* 1. Header Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/70 backdrop-blur-2xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-black text-2xl text-indigo-500">
            <Zap className="fill-indigo-500" />
            <span className="tracking-tighter">PIRABEL<span className="text-white">ULTIMATE</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            <a href="#audit" className="hover:text-white transition-colors">Neural Audit</a>
            <a href="#keywords" className="hover:text-white transition-colors">Keyword Magic</a>
            <a href="#writer" className="hover:text-white transition-colors">AI Writer</a>
            <a href="#pricing" className="hover:text-white transition-colors">Monetization</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth" className="hidden sm:block text-xs font-black text-slate-400 hover:text-white uppercase tracking-widest">Login</Link>
            <Link to="/auth" className="bg-white text-black px-6 py-2.5 rounded-full font-black text-xs uppercase hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-white/5">
              Start Engineering
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section - The Engine of Organic Growth */}
      <section className="relative pt-48 pb-40 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_70%)] -z-10"></div>
        <div className="max-w-7xl mx-auto text-center relative">
          <motion.div 
            {...fadeInUp}
            className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-5 py-2 rounded-full text-[10px] font-black text-indigo-400 tracking-[0.3em] mb-10"
          >
            <Cpu size={14} /> THE NEW STANDARD IN SEO ARCHITECTURE
          </motion.div>
          <motion.h1 
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-[140px] font-black tracking-tight leading-[0.85] mb-12 bg-gradient-to-b from-white via-white to-slate-600 bg-clip-text text-transparent"
          >
            DOMINATE THE <br /> <span className="text-indigo-500">SEARCH LAYER.</span>
          </motion.h1>
          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-16 font-medium"
          >
            Pirabel Ultimate is not a tool; it's a neural infrastructure. We've fused deep site crawling, high-intent keyword intelligence, and multi-modal AI writing into a single, cohesive ranking engine.
          </motion.p>
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/auth" className="group bg-indigo-600 text-white px-12 py-6 rounded-[32px] text-lg font-black flex items-center gap-4 hover:bg-indigo-500 transition-all hover:scale-105 shadow-[0_0_50px_rgba(79,70,229,0.3)]">
              INITIALIZE PLATFORM <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <button className="flex items-center gap-3 px-12 py-6 rounded-[32px] text-lg font-black bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all border-indigo-500/10">
              <Play fill="currentColor" size={16} /> SYSTEM OVERVIEW
            </button>
          </motion.div>
        </div>
      </section>

      {/* 3. Tech Visual Grid - Social Proof */}
      <section className="py-24 border-y border-slate-900 bg-slate-950/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-30 hover:opacity-100 transition-opacity duration-1000">
            {['DATA-FOR-SEO', 'GOOGLE-CLOUD', 'GEMINI-PRO', 'STRIPE-PAY', 'SUPABASE', 'OPEN-PAGE-RANK'].map(name => (
              <span key={name} className="text-xl font-black tracking-tighter text-slate-400">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Neural Audit Section (Technical Deep-Dive) */}
      <section id="audit" className="py-40 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-32 items-center">
          <motion.div {...fadeInUp} className="space-y-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-indigo-600/40">
              <Search size={32} />
            </div>
            <div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">Technical Audit <br /><span className="text-indigo-500">at Warp Speed.</span></h2>
              <p className="text-xl text-slate-400 leading-relaxed font-medium">
                Our proprietary crawler analyzes over 250 ranking factors per second. From Core Web Vitals to semantic Hn hierarchy, we identify every bottleneck preventing you from the #1 spot.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { title: 'Crawl Engine', desc: 'JS-Ready Headless Logic' },
                { title: 'Metric Depth', desc: '250+ Ranking Factors' },
                { title: 'Real-time', desc: 'Live Performance Scan' },
                { title: 'AI Logic', desc: 'Actionable Advice' }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-sm font-black text-white">{item.title}</p>
                  <p className="text-xs text-slate-500 font-bold">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            className="relative group perspective-1000"
          >
            <div className="absolute -inset-10 bg-indigo-500/20 blur-[100px] rounded-full group-hover:bg-indigo-500/30 transition-all duration-1000"></div>
            <div className="relative bg-[#0f172a] rounded-[48px] border border-slate-800 p-8 shadow-2xl overflow-hidden">
               <div className="flex justify-between items-center mb-10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Diagnostic v2.4</div>
               </div>
               <div className="space-y-6">
                  <div className="h-12 bg-slate-900 rounded-2xl w-full animate-pulse"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-32 bg-slate-900 rounded-3xl animate-pulse"></div>
                    <div className="h-32 bg-slate-900 rounded-3xl animate-pulse delay-75"></div>
                  </div>
                  <div className="h-40 bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-6 flex flex-col justify-between">
                     <p className="text-sm font-black">AI Recommendation Engine</p>
                     <p className="text-[10px] text-indigo-300">"Your LCP is high (2.4s). Compress assets to gain +12 SEO points."</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Keyword Magic Tool (The Money Maker) */}
      <section id="keywords" className="py-40 bg-slate-950/50 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-32 max-w-4xl mx-auto space-y-6">
             <h2 className="text-6xl font-black tracking-tight">Keyword Magic <span className="text-indigo-500">Redefined.</span></h2>
             <p className="text-xl text-slate-400 font-medium leading-relaxed">
               Forget guessing. Pirabel Ultimate taps into a database of 2.4 Billion high-intent keywords to show you exactly where the revenue is hiding.
             </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Intent Mapping', icon: Radar, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
              { title: 'Volume Accuracy', icon: BarChart, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
              { title: 'CPC Intelligence', icon: DollarSign, color: 'text-amber-500', bg: 'bg-amber-500/10' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-[#0f172a] border border-slate-800 rounded-[40px] hover:border-indigo-500/50 transition-all group"
              >
                <div className={`${feature.bg} ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Deep intelligence into searcher behavior. We identify transactional, informational, and commercial intent with 99.8% precision.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AI Content Architect (Style: 3000+ words) */}
      <section id="writer" className="py-40">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
             <div className="absolute -inset-20 bg-purple-600/10 blur-[150px] -z-10"></div>
             <div className="bg-[#0f172a] rounded-[56px] border border-slate-800 p-10 shadow-2xl space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center"><PenTool size={20} /></div>
                   <p className="text-sm font-black text-white">AI Content Generator v3</p>
                </div>
                <div className="space-y-4">
                   <div className="h-6 bg-slate-900 rounded-lg w-3/4"></div>
                   <div className="h-6 bg-slate-900 rounded-lg w-full"></div>
                   <div className="h-6 bg-slate-900 rounded-lg w-5/6"></div>
                   <div className="h-6 bg-slate-900 rounded-lg w-2/3"></div>
                </div>
                <div className="pt-8 border-t border-slate-800 flex justify-between items-center">
                   <div className="flex gap-2">
                      <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black rounded-full uppercase">LSI Optimized</span>
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded-full uppercase">Human-Scale</span>
                   </div>
                   <p className="text-xs font-bold text-slate-500">4,284 Words Written</p>
                </div>
             </div>
          </motion.div>
          <motion.div {...fadeInUp} className="order-1 lg:order-2 space-y-10">
            <div className="w-16 h-16 bg-purple-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-purple-600/40">
              <Zap size={32} />
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">AI Content <br /><span className="text-purple-500">Without Compromise.</span></h2>
            <p className="text-xl text-slate-400 leading-relaxed font-medium">
              Don't just write. Engineer content that Google loves. Our AI creates 5000+ word "Skyscraper" articles in minutes, complete with semantic clustering and real-time SERP data injection.
            </p>
            <div className="space-y-4">
               {[
                 'Automated Hn structuring',
                 'Semantic keyword density control',
                 'Real-time plagiarism guardian',
                 'Automatic sitemap internal linking'
               ].map(text => (
                 <div key={text} className="flex items-center gap-3 font-bold text-slate-300">
                    <CheckCircle2 className="text-purple-500" size={20} /> {text}
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. Competitive Gap Analysis Section */}
      <section className="py-40 bg-[#050b1a] relative">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                 <h2 className="text-5xl font-black tracking-tighter">See Your Competitors' <br /><span className="text-indigo-500">Winning Strategies.</span></h2>
                 <p className="text-lg text-slate-400 font-medium">Compare your domain against 3 competitors simultaneously. Identify the keywords they rank for that you're missing.</p>
                 <div className="p-8 bg-slate-900/50 rounded-3xl border border-slate-800 space-y-6">
                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-500">
                       <span>Keyword Gap</span>
                       <span className="text-indigo-400">Analysis Active</span>
                    </div>
                    {[
                      { site: 'Competitor A', gap: 142, color: 'bg-red-500' },
                      { site: 'Competitor B', gap: 89, color: 'bg-amber-500' },
                      { site: 'Pirabel (You)', gap: 0, color: 'bg-indigo-500' }
                    ].map(item => (
                      <div key={item.site} className="space-y-2">
                        <div className="flex justify-between text-sm font-bold"><span>{item.site}</span><span>{item.gap > 0 ? `+${item.gap} kws` : 'Base'}</span></div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                           <div className={`h-full ${item.color}`} style={{ width: item.site === 'Pirabel (You)' ? '40%' : '85%' }}></div>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                 {[
                   { label: 'Authority Score', value: '78', icon: Shield },
                   { label: 'Domain Rating', value: '92', icon: Zap },
                   { label: 'Referring Domains', value: '1.4k', icon: Globe },
                   { label: 'Total Backlinks', value: '24k', icon: Layers }
                 ].map((stat, i) => (
                   <div key={i} className="p-8 bg-[#0f172a] rounded-[40px] border border-slate-800 text-center space-y-4">
                      <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-500 flex items-center justify-center"><stat.icon size={24} /></div>
                      <p className="text-3xl font-black text-white">{stat.value}</p>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* 8. White-Label Agency Branding */}
      <section className="py-40 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
           <h2 className="text-6xl font-black tracking-tight leading-tight">Your Brand, <br /><span className="text-indigo-500">Our High-Octane Data.</span></h2>
           <p className="text-xl text-slate-400 leading-relaxed font-medium">
             Agency owners: Elevate your client reports. Generate white-labeled PDF audits with your logo, brand colors, and domain. We provide the intelligence; you take the credit.
           </p>
           <div className="relative group cursor-pointer inline-block">
             <div className="absolute -inset-4 bg-indigo-600/20 blur-2xl group-hover:bg-indigo-600/40 transition-all"></div>
             <div className="relative bg-white text-black px-12 py-5 rounded-2xl font-black text-xl uppercase flex items-center gap-4 transition-transform group-hover:-translate-y-2">
                <Download /> Access White-Label Suite
             </div>
           </div>
        </div>
      </section>

      {/* 9. Core Web Vitals Monitoring Section */}
      <section className="py-40 bg-slate-950 border-y border-slate-900">
         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-32 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-1 gap-6">
               {[
                 { label: 'LCP', name: 'Largest Contentful Paint', value: '1.2s', status: 'Optimal' },
                 { label: 'FID', name: 'First Input Delay', value: '14ms', status: 'Excellent' },
                 { label: 'CLS', name: 'Cumulative Layout Shift', value: '0.01', status: 'Perfect' }
               ].map(vital => (
                 <div key={vital.label} className="p-6 bg-[#0f172a] border border-slate-800 rounded-3xl flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                       <div className="w-12 h-12 rounded-xl bg-indigo-600/10 text-indigo-500 flex items-center justify-center font-black">{vital.label}</div>
                       <div>
                          <p className="text-sm font-black text-white">{vital.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{vital.status}</p>
                       </div>
                    </div>
                    <div className="text-2xl font-black text-white">{vital.value}</div>
                 </div>
               ))}
            </div>
            <div className="order-1 lg:order-2 space-y-8">
               <h2 className="text-5xl font-black tracking-tighter">Core Web Vitals <br /><span className="text-indigo-500">Surveillance.</span></h2>
               <p className="text-lg text-slate-400 font-medium">Google's new ranking obsession, decoded. We monitor your CWV scores daily and alert you before your rankings drop.</p>
               <button className="text-indigo-500 font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:gap-4 transition-all">Explore Monitoring Engine <ArrowRight size={14} /></button>
            </div>
         </div>
      </section>

      {/* 10. Pricing Plans - The ROI Multiplier */}
      <section id="pricing" className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32 space-y-6">
             <h2 className="text-6xl font-black tracking-tighter">Monetize Your <span className="text-indigo-500">Search Growth.</span></h2>
             <p className="text-xl text-slate-400 font-medium">Select the plan that aligns with your ranking objectives.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Free */}
            <div className="p-12 rounded-[56px] bg-slate-900/30 border border-slate-800 flex flex-col hover:border-slate-700 transition-all">
              <h3 className="text-2xl font-black mb-2">Freemium</h3>
              <p className="text-6xl font-black text-white mb-10">€0 <span className="text-xl text-slate-500">/mo</span></p>
              <ul className="space-y-6 mb-16 flex-1 text-slate-400 font-bold">
                <li className="flex gap-3 items-center"><Check className="text-indigo-500" /> 3 Neural Audits / day</li>
                <li className="flex gap-3 items-center"><Check className="text-indigo-500" /> 5 Magic Keywords</li>
                <li className="flex gap-3 items-center"><Check className="text-indigo-500" /> Basic Analytics</li>
              </ul>
              <Link to="/auth" className="w-full py-6 text-center border-2 border-slate-800 rounded-3xl font-black text-sm uppercase hover:bg-slate-800 transition-all">Initialize</Link>
            </div>
            {/* PRO */}
            <div className="p-14 rounded-[56px] bg-indigo-600 text-white shadow-[0_0_80px_rgba(79,70,229,0.4)] flex flex-col transform md:-translate-y-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 bg-white/20 text-[10px] font-black tracking-[0.3em] rounded-bl-3xl">TOP RATED</div>
               <h3 className="text-2xl font-black mb-2">Solo Pro</h3>
               <p className="text-7xl font-black mb-10">€29 <span className="text-xl opacity-70">/mo</span></p>
               <ul className="space-y-6 mb-16 flex-1 text-white font-black">
                <li className="flex gap-3 items-center"><Check className="text-white" /> Unlimited Deep Audits</li>
                <li className="flex gap-3 items-center"><Check className="text-white" /> 3k Word AI Writer</li>
                <li className="flex gap-3 items-center"><Check className="text-white" /> 50 Keyword Rank Tracker</li>
                <li className="flex gap-3 items-center"><Check className="text-white" /> Competitor Gap Scan</li>
              </ul>
              <Link to="/auth" className="w-full py-6 text-center bg-white text-indigo-600 rounded-3xl font-black text-sm uppercase hover:bg-slate-100 transition-all shadow-2xl">Upgrade Now</Link>
            </div>
            {/* AGENCY */}
            <div className="p-12 rounded-[56px] bg-slate-900/30 border border-slate-800 flex flex-col hover:border-slate-700 transition-all">
              <h3 className="text-2xl font-black mb-2">Agency Elite</h3>
              <p className="text-6xl font-black text-white mb-10">€99 <span className="text-xl text-slate-500">/mo</span></p>
              <ul className="space-y-6 mb-16 flex-1 text-slate-400 font-bold">
                <li className="flex gap-3 items-center"><Check className="text-indigo-500" /> White-Label PDF Engine</li>
                <li className="flex gap-3 items-center"><Check className="text-indigo-500" /> 5k Word AI Architect</li>
                <li className="flex gap-3 items-center"><Check className="text-indigo-500" /> Full API & Webhooks</li>
                <li className="flex gap-3 items-center"><Check className="text-indigo-500" /> Multi-User Team Logic</li>
              </ul>
              <Link to="/auth" className="w-full py-6 text-center border-2 border-slate-800 rounded-3xl font-black text-sm uppercase hover:bg-slate-800 transition-all">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ Section - 50 Question Style (Condensed for Demo) */}
      <section id="faq" className="py-40 bg-slate-950/30">
        <div className="max-w-4xl mx-auto px-6">
           <h2 className="text-5xl font-black text-center mb-24 tracking-tighter">Operational FAQ</h2>
           <div className="space-y-6">
              {[
                { q: 'How does Pirabel handle JavaScript-heavy sites?', a: 'Our crawler utilizes a Headless Chrome cluster to render and execute JavaScript before analysis, ensuring dynamic content is indexed and audited correctly.' },
                { q: 'Is your AI content undetectable by Google?', a: 'We focus on quality and semantic relevance. Google rewards helpful, informational content regardless of generation method. Our AI uses RAG (Retrieval-Augmented Generation) to ensure factual accuracy.' },
                { q: 'Can I cancel my subscription anytime?', a: 'Absolutely. We offer a no-friction cancellation policy via the Stripe Customer Portal.' }
              ].map((faq, i) => (
                <details key={i} className="group bg-[#0f172a] border border-slate-800 rounded-[32px] p-8 cursor-pointer">
                   <summary className="list-none flex justify-between items-center font-black text-xl text-white">
                      {faq.q}
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-open:rotate-180 transition-transform">
                         <ArrowRight size={18} />
                      </div>
                   </summary>
                   <p className="mt-6 text-slate-400 leading-relaxed font-medium">{faq.a}</p>
                </details>
              ))}
           </div>
        </div>
      </section>

      {/* 12. Security & Compliance Footer-Banner */}
      <section className="py-20 bg-indigo-600/5 border-y border-indigo-500/10">
         <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-10">
            <div className="flex items-center gap-4">
               <Shield className="text-indigo-500" size={32} />
               <div>
                  <p className="text-lg font-black text-white">Bank-Level Security</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">256-bit AES Encryption & SOC2 Compliant</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <Lock className="text-indigo-500" size={32} />
               <div>
                  <p className="text-lg font-black text-white">Data Sovereignty</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Global GDPR & CCPA Shield Active</p>
               </div>
            </div>
         </div>
      </section>

      {/* 13. Testimonials / Proof Carousel */}
      <section className="py-40">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
               {[
                 { name: 'Sarah Chen', role: 'Head of SEO @ Velocity', quote: "Pirabel Ultimate's neural audit saved us 40 hours of manual technical work in the first week alone." },
                 { name: 'Markus Weber', role: 'Agency Founder', quote: "The white-labeling feature changed my client conversion rates. The data depth is SEMrush level but far faster." },
                 { name: 'Elena Rossi', role: 'Content Strategist', quote: "Finally an AI writer that understands semantic clusters. My long-form guides are ranking in weeks, not months." }
               ].map((t, i) => (
                 <div key={i} className="p-12 bg-slate-900/30 border border-slate-800 rounded-[48px] space-y-8">
                    <Quote size={40} className="text-indigo-500/20" />
                    <p className="text-lg text-slate-300 font-medium italic">"{t.quote}"</p>
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-slate-800"></div>
                       <div>
                          <p className="font-black text-white">{t.name}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.role}</p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 14. Final CTA Section */}
      <section className="py-60 relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2),transparent_70%)] -z-10 animate-pulse"></div>
         <div className="max-w-5xl mx-auto text-center px-6 space-y-12">
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-none text-white">READY TO <br /><span className="text-indigo-500">ENGINEER GROWTH?</span></h2>
            <p className="text-2xl text-slate-400 font-medium">Join 2,400+ technical marketers dominating the Search Layer with Pirabel.</p>
            <Link to="/auth" className="inline-block bg-white text-black px-16 py-8 rounded-[40px] text-2xl font-black uppercase hover:bg-indigo-500 hover:text-white transition-all shadow-2xl hover:scale-110">
               Initialize Free Account
            </Link>
         </div>
      </section>

      {/* 15. Massive Footer (SEO Optimized) */}
      <footer className="bg-[#020617] border-t border-slate-900 pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
            <div className="space-y-10">
              <div className="flex items-center gap-2 font-black text-3xl text-indigo-500">
                <Zap className="fill-indigo-500" />
                <span>PIRABEL<span className="text-white">ULTIMATE</span></span>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed">
                The most advanced SEO toolkit ever built. Empowering the next generation of technical marketers with deep neural intelligence.
              </p>
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"><Smartphone size={20} /></div>
                 <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"><Globe2 size={20} /></div>
                 <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"><Terminal size={20} /></div>
              </div>
            </div>
            <div>
              <h4 className="font-black text-white uppercase tracking-widest text-xs mb-10">Platform Layers</h4>
              <ul className="space-y-6 text-sm font-bold text-slate-500">
                <li><Link to="/audit" className="hover:text-indigo-400 transition-colors">Technical Audit Engine</Link></li>
                <li><Link to="/keywords" className="hover:text-indigo-400 transition-colors">Keyword Magic Tool</Link></li>
                <li><Link to="/writer" className="hover:text-indigo-400 transition-colors">Long-form AI Architect</Link></li>
                <li><Link to="/tracker" className="hover:text-indigo-400 transition-colors">Global Rank Tracker</Link></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Competitor Gap Analysis</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-white uppercase tracking-widest text-xs mb-10">Company Core</h4>
              <ul className="space-y-6 text-sm font-bold text-slate-500">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Neural Research Lab</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Engineering Blog</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Strategic Affiliation</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Status: Operational</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Security Manifest</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-white uppercase tracking-widest text-xs mb-10">Subscribe to Intel</h4>
              <p className="text-xs text-slate-500 font-medium mb-6">Receive the latest SEO algorithmic updates directly from our neural engine.</p>
              <div className="flex gap-2">
                 <input className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs outline-none focus:border-indigo-500 flex-1" placeholder="intel@agency.io" />
                 <button className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-500 transition-all"><ArrowRight size={18} /></button>
              </div>
            </div>
          </div>
          <div className="pt-16 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">© 2024 PIRABEL LABS ULTIMATE. DOMAIN: PIRABEL.IO</p>
            <div className="flex gap-10 text-[10px] font-black text-slate-600 uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy Encryption</a>
              <a href="#" className="hover:text-white transition-colors">Service Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Vault</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
