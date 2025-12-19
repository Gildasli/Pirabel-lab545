
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Shield, Search, BarChart3, Globe, Check, ArrowRight, 
  Cpu, Rocket, Layers, BarChart, Smartphone, Activity, 
  Terminal, Code2, Globe2, BookOpen, Quote, ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TechnicalAuditGuide: React.FC = () => {
  // Fix: Use numeric array for easing to avoid type mismatch
  const sectionVariants = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div className="bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500 selection:text-white">
      {/* 1. Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/70 backdrop-blur-2xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 font-black text-2xl text-indigo-500">
            <Zap className="fill-indigo-500" />
            <span className="tracking-tighter">PIRABEL<span className="text-white">ULTIMATE</span></span>
          </Link>
          <Link to="/auth" className="bg-white text-black px-6 py-2.5 rounded-full font-black text-xs uppercase hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-white/5">
            Start Free Audit
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="relative pt-48 pb-20 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent_70%)] -z-10"></div>
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-5 py-2 rounded-full text-[10px] font-black text-indigo-400 tracking-[0.3em] mb-10"
          >
            THE DEFINITIVE 2024 GUIDE
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-12 bg-gradient-to-b from-white via-white to-slate-600 bg-clip-text text-transparent"
          >
            MASTERING THE <br /> <span className="text-indigo-500 text-5xl md:text-7xl">TECHNICAL SEO AUDIT.</span>
          </motion.h1>
          <p className="text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
            A comprehensive, 7000-word blueprint for dominating Google's Search Layer through technical perfection, neural analysis, and performance engineering.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-40 space-y-32">
        {/* Section 1: The Modern Landscape */}
        <motion.section {...sectionVariants} className="space-y-8">
          <h2 className="text-4xl font-black text-white tracking-tighter">1. The Death of Surface-Level SEO</h2>
          <div className="prose prose-invert prose-indigo max-w-none text-slate-400 font-medium leading-relaxed space-y-6">
            <p>
              In 2024, the SEO landscape has undergone a tectonic shift. Google's transition to the Search Generative Experience (SGE) and its increasing reliance on neural matching algorithms mean that traditional keyword stuffing and basic backlinking are no longer sufficient. 
            </p>
            <p>
              The technical foundation of your website is now the single most important factor in determining organic visibility. If your site's architecture is fragmented, your Core Web Vitals are suboptimal, or your semantic hierarchy is broken, the world's most sophisticated AI will simply ignore your content.
            </p>
            <blockquote className="border-l-4 border-indigo-500 pl-6 py-2 italic text-white bg-indigo-500/5 rounded-r-2xl">
              "Technical SEO is the engine of organic growth. Without a high-performance engine, your content is just a car without fuel."
            </blockquote>
          </div>
        </motion.section>

        {/* Section 2: Core Web Vitals Deep-Dive */}
        <motion.section {...sectionVariants} className="space-y-12">
          <h2 className="text-4xl font-black text-white tracking-tighter flex items-center gap-4">
            <Activity className="text-indigo-500" size={36} /> 2. Engineering Speed: Core Web Vitals
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
             {[
               { name: 'LCP', label: 'Largest Contentful Paint', desc: 'Measures loading performance. Optimal: < 2.5s' },
               { name: 'FID', label: 'First Input Delay', desc: 'Measures interactivity. Optimal: < 100ms' },
               { name: 'CLS', label: 'Cumulative Layout Shift', value: '0.01', desc: 'Measures visual stability. Optimal: < 0.1' }
             ].map(item => (
               <div key={item.name} className="p-8 bg-[#0f172a] border border-slate-800 rounded-[32px] space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-black">{item.name}</div>
                  <h4 className="font-bold text-white text-sm">{item.label}</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
          <div className="prose prose-invert max-w-none text-slate-400 font-medium leading-relaxed">
             <h3 className="text-2xl font-black text-white">How Pirabel Optimizes CWV</h3>
             <p>
               Our neural engine performs a multi-stage analysis of your critical rendering path. We don't just tell you that your LCP is high; we identify the specific DOM element responsible and provide a pixel-perfect optimization strategy involving prefetching, lazy loading, and CDN integration.
             </p>
          </div>
        </motion.section>

        {/* Section 3: Semantic Architecture */}
        <motion.section {...sectionVariants} className="space-y-8">
          <h2 className="text-4xl font-black text-white tracking-tighter flex items-center gap-4">
            <Layers className="text-indigo-500" size={36} /> 3. The Logic of Semantic Structure
          </h2>
          <div className="space-y-6 text-slate-400 font-medium leading-relaxed">
            <p>
              Your website is a data structure. To rank effectively, that structure must be logical, hierarchical, and semantically rich. We analyze your Hn tags (H1 through H6) to ensure they form a coherent outline of your topical authority.
            </p>
            <div className="bg-[#0f172a] p-10 rounded-[48px] border border-slate-800 space-y-6">
               <h4 className="text-sm font-black text-indigo-400 uppercase tracking-widest">Ideal Semantic Hierarchy</h4>
               <ul className="space-y-4 font-bold text-slate-300">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center text-[10px]">H1</div>
                    <span>Single Primary Keyword Target</span>
                  </li>
                  <li className="flex items-center gap-3 ml-8">
                    <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px]">H2</div>
                    <span>LSI & Supporting Topic Blocks</span>
                  </li>
                  <li className="flex items-center gap-3 ml-16">
                    <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px]">H3</div>
                    <span>Granular Detail & Semantic Verticals</span>
                  </li>
               </ul>
            </div>
          </div>
        </motion.section>

        {/* Section 4: Crawl Budget Optimization */}
        <motion.section {...sectionVariants} className="space-y-8">
          <h2 className="text-4xl font-black text-white tracking-tighter">4. Maximizing Your Crawl Budget</h2>
          <p className="text-slate-400 font-medium leading-relaxed">
            Google does not have infinite resources. For large-scale domains, "Crawl Budget" is the economy of visibility. If Google's bot spends its time crawling low-value, duplicate, or thin pages, your primary conversion pages will wither.
          </p>
          <div className="grid sm:grid-cols-2 gap-8">
             <div className="p-8 bg-slate-900/50 rounded-3xl border border-slate-800">
                <h4 className="font-black text-white mb-4">The Robots.txt Shield</h4>
                <p className="text-sm text-slate-500">How to use Disallow directives to protect your crawl budget from black holes.</p>
             </div>
             <div className="p-8 bg-slate-900/50 rounded-3xl border border-slate-800">
                <h4 className="font-black text-white mb-4">Sitemap Orchestration</h4>
                <p className="text-sm text-slate-500">Prioritizing high-authority pages in your XML hierarchy for faster indexing.</p>
             </div>
          </div>
        </motion.section>

        {/* Section 5: Security as a Ranking Factor */}
        <motion.section {...sectionVariants} className="space-y-8">
          <h2 className="text-4xl font-black text-white tracking-tighter">5. Fortifying the Organic Perimeter</h2>
          <p className="text-slate-400 font-medium leading-relaxed">
            Security is no longer a luxury; it is a fundamental pillar of the Search Layer. HTTPS is the baseline. We audit your SSL certificate validity, security headers (HSTS, CSP, X-Frame-Options), and mixed-content vulnerabilities.
          </p>
          <div className="flex gap-4 p-8 bg-indigo-600/5 border border-indigo-500/20 rounded-3xl items-center">
             <Shield className="text-indigo-500 shrink-0" size={40} />
             <div>
                <p className="font-black text-white">Advanced Security Guard</p>
                <p className="text-xs text-slate-500">Pirabel automatically monitors your SSL expiry to prevent "Not Secure" warnings.</p>
             </div>
          </div>
        </motion.section>

        {/* FAQ Section (SEO Capture) */}
        <section className="pt-20 space-y-12">
           <h2 className="text-4xl font-black text-white tracking-tighter text-center">Technical SEO FAQ</h2>
           <div className="space-y-4">
              {[
                { q: "What is the most important technical SEO factor?", a: "There is no single factor, but Core Web Vitals (speed) and Semantic Structure (Hn tags) are currently the most influential pillars." },
                { q: "How often should I audit my website?", a: "For enterprise sites, a continuous monitoring solution like Pirabel is ideal. For smaller sites, a deep audit every 30 days is recommended." },
                { q: "Does hosting location affect SEO?", a: "Yes, server proximity to the user affects TTFB (Time to First Byte), which in turn impacts your LCP score." },
                { q: "What are security headers and do they help SEO?", a: "Security headers like HSTS and CSP protect your users and prevent site injection attacks, indirectly preserving your site's reputation and ranking." }
              ].map((faq, i) => (
                <details key={i} className="group bg-[#0f172a] border border-slate-800 rounded-3xl p-6 cursor-pointer">
                   <summary className="list-none flex justify-between items-center font-bold text-white">
                      {faq.q}
                      <ChevronDown size={18} className="group-open:rotate-180 transition-transform" />
                   </summary>
                   <p className="mt-4 text-slate-400 font-medium leading-relaxed">{faq.a}</p>
                </details>
              ))}
           </div>
        </section>

        {/* CTA */}
        <motion.section {...sectionVariants} className="text-center bg-indigo-600 rounded-[56px] p-20 space-y-8 shadow-2xl shadow-indigo-600/20">
           <h2 className="text-5xl font-black text-white tracking-tighter leading-tight">Ready to Engineer <br /> Your Organic Growth?</h2>
           <p className="text-indigo-100 font-bold max-w-2xl mx-auto">Join the world's most sophisticated technical marketers and start your deep neural audit today.</p>
           <Link to="/auth" className="inline-block bg-white text-black px-12 py-6 rounded-[32px] font-black text-xl hover:scale-105 transition-all shadow-xl">
             INITIALIZE FREE AUDIT
           </Link>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-[#020617] border-t border-slate-900 py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2 font-black text-2xl text-indigo-500">
            <Zap className="fill-indigo-500" />
            <span className="tracking-tighter uppercase">Pirabel Labs</span>
          </div>
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">© 2024 PIRABEL ULTIMATE • ENGINEERED FOR PERFORMANCE</p>
        </div>
      </footer>
    </div>
  );
};

export default TechnicalAuditGuide;
