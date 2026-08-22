import type { Metadata } from 'next';
import Link from 'next/link';
import { BookMarked, GraduationCap, Calendar, Search, ChevronRight, Award, Brain, Zap, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Arabic NET/JRF Practice — UGC NET Arabic Previous Year Questions 2004–2023',
  description:
    'Practice 3,150+ UGC NET/JRF Arabic Previous Year Questions (PYQ) from 2004 to 2023. Year-wise, Unit-wise, Topic-wise practice. Free, bilingual (Arabic & English) platform.',
  alternates: { canonical: '/' },
};

const stats = [
  { value: '3,150+', label: 'Questions', labelAr: 'سؤال' },
  { value: '20', label: 'Years', labelAr: 'سنة' },
  { value: '10', label: 'Units', labelAr: 'وحدة' },
  { value: '45', label: 'Papers', labelAr: 'ورقة' },
];

const features = [
  { icon: Award, title: 'Authentic PYQs', desc: 'Sourced directly from NTA official papers.' },
  { icon: Brain, title: 'Bilingual Interface', desc: 'Seamlessly switch between Arabic and English.' },
  { icon: Zap, title: 'Detailed Analytics', desc: 'Track your speed, accuracy, and weak units.' },
];

const modes = [
  { icon: Calendar, title: 'Year-wise PYQ', titleAr: 'تدرُّب حسب السنة', desc: 'Browse full papers from 2004 to 2023 in NTA exam format.', href: '/pyq' },
  { icon: GraduationCap, title: 'Unit-wise Practice', titleAr: 'تدرُّب حسب الوحدة', desc: 'Master specific syllabus units at your own pace.', href: '/syllabus' },
  { icon: BookMarked, title: 'Saved Items', titleAr: 'العناصر المحفوظة', desc: 'Review your bookmarked questions and mistakes.', href: '/dashboard' },
  { icon: Search, title: 'Global Search', titleAr: 'البحث', desc: 'Find specific questions by keyword or topic.', href: '/search' },
];

const units = [
  { n: 1, ar: 'الشِّعْرُ الْعَرَبِيُّ', en: 'Arabic Poetry' },
  { n: 2, ar: 'النَّثْرُ الْعَرَبِيُّ', en: 'Arabic Prose' },
  { n: 3, ar: 'أَدَبُ الْمَهْجَرِ', en: 'Mahjar Literature' },
  { n: 4, ar: 'النَّقْدُ الْأَدَبِيُّ', en: 'Literary Criticism' },
  { n: 5, ar: 'الْبَلَاغَةُ وَالْعَرُوضُ', en: 'Rhetoric & Prosody' },
  { n: 6, ar: 'الْمَصَادِرُ', en: 'Sources & References' },
  { n: 7, ar: 'الْأَدَبُ الْحَدِيثُ', en: 'Modern Literature' },
  { n: 8, ar: 'الاِتِّجَاهَاتُ', en: 'Literary Movements' },
  { n: 9, ar: 'الْأَدَبُ الْهِنْدِيُّ', en: 'Indo-Arabic Literature' },
  { n: 10, ar: 'التَّرْجَمَةُ', en: 'Translation' },
];

export default function HomePage() {
  return (
    <div className="flex-1 overflow-hidden">

      {/* ── Hero Section (Psychology: Authority & Aspiration) ── */}
      <section className="relative bg-slate-950 text-white overflow-hidden pb-12 pt-0 sm:pt-2">
        {/* Abstract Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 -left-40 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* LHS: Text Content */}
            <div className="text-left text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm font-medium mb-8 backdrop-blur-md shadow-2xl transition-transform hover:scale-105 cursor-default">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-slate-300">Updated for 2024 Syllabus</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 leading-tight mb-6 tracking-tight">
                Master UGC NET Arabic <br />
                <span className="text-emerald-400">The Smart Way.</span>
              </h1>
              
              <p dir="rtl" lang="ar" className="font-arabic text-3xl sm:text-4xl text-emerald-300/90 leading-loose mb-6 drop-shadow-md text-center lg:text-right">
                أتقن أسئلة الامتحانات السابقة بذكاء
              </p>
              
              <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0 font-medium">
                Join thousands of JRF aspirants. Practice <strong className="text-white">3,150+</strong> official PYQs, track your accuracy, and conquer all 10 syllabus units.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Link
                  href="/pyq"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-emerald-700 text-white font-bold text-lg rounded-xl overflow-hidden transition-all hover:scale-105 hover:bg-emerald-600 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] w-full sm:w-auto justify-center"
                >
                  <BookOpen size={22} className="relative z-10" />
                  <span className="relative z-10">Explore PYQs</span>
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                </Link>
                
                <Link
                  href="/syllabus"
                  className="inline-flex items-center gap-3 justify-center px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-lg rounded-xl transition-all border border-slate-800 hover:border-slate-700 w-full sm:w-auto"
                >
                  <GraduationCap size={22} />
                  Browse Syllabus
                </Link>
              </div>
            </div>

            {/* RHS: SVG Illustration */}
            <div className="hidden lg:flex justify-center items-center relative w-full">
              {/* Glow backdrop */}
              <div className="absolute inset-0 bg-emerald-500/10 blur-[120px] rounded-full"></div>
              
              <svg viewBox="-20 -70 420 500" className="w-full h-auto max-w-[500px] relative z-10 drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Defs for glow */}
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="12" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {/* The dashed connection line */}
                <polyline points="30,320 110,260 190,190 270,110 350,-10" fill="none" stroke="#eab308" strokeWidth="3" strokeDasharray="8,8" className="animate-[pulse_2s_infinite]" />
                
                {/* 3D Pillars */}
                <g className="transition-transform duration-700 hover:-translate-y-2 cursor-default">
                  {/* P1 */}
                  <g transform="translate(0, 320)">
                    <polygon points="0,0 30,-15 60,0 30,15" fill="#4ade80" />
                    <polygon points="0,0 30,15 30,75 0,60" fill="#10b981" />
                    <polygon points="30,15 60,0 60,60 30,75" fill="#047857" />
                  </g>
                  
                  {/* P2 */}
                  <g transform="translate(80, 260)">
                    <polygon points="0,0 30,-15 60,0 30,15" fill="#4ade80" />
                    <polygon points="0,0 30,15 30,105 0,90" fill="#10b981" />
                    <polygon points="30,15 60,0 60,90 30,105" fill="#047857" />
                  </g>

                  {/* P3 */}
                  <g transform="translate(160, 190)">
                    <polygon points="0,0 30,-15 60,0 30,15" fill="#4ade80" />
                    <polygon points="0,0 30,15 30,145 0,130" fill="#10b981" />
                    <polygon points="30,15 60,0 60,130 30,145" fill="#047857" />
                  </g>

                  {/* P4 */}
                  <g transform="translate(240, 110)">
                    <polygon points="0,0 30,-15 60,0 30,15" fill="#4ade80" />
                    <polygon points="0,0 30,15 30,195 0,180" fill="#10b981" />
                    <polygon points="30,15 60,0 60,180 30,195" fill="#047857" />
                  </g>

                  {/* P5 */}
                  <g transform="translate(320, 10)">
                    <polygon points="0,0 30,-15 60,0 30,15" fill="#4ade80" />
                    <polygon points="0,0 30,15 30,265 0,250" fill="#10b981" />
                    <polygon points="30,15 60,0 60,250 30,265" fill="#047857" />
                  </g>
                </g>

                {/* JRF Sunburst Logo */}
                <g transform="translate(350, -10)" className="group cursor-pointer">
                  {/* Outer Glow */}
                  <circle cx="0" cy="0" r="34" fill="#eab308" filter="url(#glow)" opacity="0.5" className="animate-pulse" />
                  
                  {/* Sunburst Rays */}
                  <g stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" className="animate-[spin_10s_linear_infinite]">
                    <line x1="0" y1="-42" x2="0" y2="-52" />
                    <line x1="0" y1="42" x2="0" y2="52" />
                    <line x1="-42" y1="0" x2="-52" y2="0" />
                    <line x1="42" y1="0" x2="52" y2="0" />
                    <line x1="-30" y1="-30" x2="-37" y2="-37" />
                    <line x1="30" y1="30" x2="37" y2="37" />
                    <line x1="-30" y1="30" x2="-37" y2="37" />
                    <line x1="30" y1="-30" x2="37" y2="-37" />
                  </g>

                  {/* Center Circle */}
                  <circle cx="0" cy="0" r="32" fill="#020617" stroke="#eab308" strokeWidth="3" />
                  
                  {/* Default JRF Text */}
                  <text x="0" y="7" fontFamily="sans-serif" fontSize="20" fontWeight="900" fill="#eab308" textAnchor="middle" letterSpacing="1" className="group-hover:opacity-0 transition-opacity duration-300">JRF</text>
                  
                  {/* Hover "PARHLE BHAI" Text */}
                  <text x="0" y="2" fontFamily="sans-serif" fontSize="10" fontWeight="900" fill="#eab308" textAnchor="middle" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <tspan x="0" dy="-4">PARHLE</tspan>
                    <tspan x="0" dy="12">BHAI</tspan>
                  </text>
                </g>
              </svg>
            </div>

          </div>

          {/* Stats Grid (Full Width Below) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 border-t border-white/10 pt-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center group">
                <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-emerald-400 transition-colors">{s.value}</div>
                <div className="text-sm text-slate-400 mt-1 font-medium uppercase tracking-wider">{s.label}</div>
                <div dir="rtl" lang="ar" className="text-sm text-slate-500 font-arabic mt-1">{s.labelAr}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Value Prop Section ── */}
      <section className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 text-emerald-600">
                  <f.icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Practice Modes (Psychology: Choice Architecture) ── */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Choose Your Practice Mode</h2>
            <p dir="rtl" lang="ar" className="text-slate-500 font-arabic text-xl">اختر طريقة التدريب المناسبة لك</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {modes.map((m, idx) => (
              <Link
                key={m.href}
                href={m.href}
                className={`group relative p-8 rounded-3xl border-2 transition-all duration-300 overflow-hidden ${
                  idx === 0 
                    ? 'border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 hover:shadow-lg hover:shadow-emerald-500/20' 
                    : 'border-slate-100 bg-white hover:border-slate-900 hover:shadow-xl'
                }`}
              >
                {idx === 0 && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">RECOMMENDED</div>
                )}
                <div className="flex items-start gap-5">
                  <div className={`p-4 rounded-2xl transition-colors ${
                    idx === 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-900 group-hover:text-white'
                  }`}>
                    <m.icon size={32} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900 mb-1">{m.title}</h3>
                    <p dir="rtl" lang="ar" className="text-slate-500 font-arabic text-lg mb-2">{m.titleAr}</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Units Grid (Psychology: Progress & Completion) ── */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Master All 10 Units</h2>
              <p className="text-slate-500">Systematically cover the entire NTA UGC NET syllabus.</p>
            </div>
            <Link href="/syllabus" className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1">
              View Detailed Syllabus <ChevronRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {units.map((u) => (
              <Link
                key={u.n}
                href={`/syllabus`}
                className="group relative bg-white border border-slate-200 rounded-2xl p-5 hover:border-emerald-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between aspect-square"
              >
                <div>
                  <div className="text-xs font-black text-slate-300 group-hover:text-emerald-200 transition-colors mb-2 text-right">0{u.n}</div>
                  <div dir="rtl" lang="ar" className="font-arabic font-bold text-slate-900 text-lg leading-snug group-hover:text-emerald-700 transition-colors">{u.ar}</div>
                </div>
                <div className="text-slate-500 text-xs font-medium leading-tight group-hover:text-slate-900 transition-colors mt-4 border-t border-slate-100 pt-3">{u.en}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-emerald-600 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-700 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to crack JRF?</h2>
          <p className="text-emerald-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Stop guessing and start practicing with actual exam data. Join today and take your Arabic preparation to the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup" className="px-8 py-4 bg-white text-emerald-700 font-bold text-lg rounded-2xl hover:bg-slate-50 hover:scale-105 transition-all shadow-xl w-full sm:w-auto">
              Create Free Account
            </Link>
            <Link href="/practice" className="px-8 py-4 text-white font-semibold text-lg rounded-2xl hover:bg-emerald-700 transition-all border border-emerald-500 w-full sm:w-auto">
              Practice as Guest
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="text-white font-bold text-xl mb-4">
                <span dir="rtl" lang="ar" className="font-arabic text-emerald-400">الْعَرَبِيَّةُ</span>
                {' '}NET/JRF
              </div>
              <p className="text-sm leading-relaxed max-w-sm">
                The ultimate platform for UGC NET/JRF Arabic preparation. Practice previous year questions, track progress, and master the syllabus.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Practice</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/pyq" className="hover:text-emerald-400 transition-colors">PYQ Papers</Link></li>
                <li><Link href="/syllabus" className="hover:text-emerald-400 transition-colors">Unit-wise Tests</Link></li>
                <li><Link href="/dashboard" className="hover:text-emerald-400 transition-colors">My Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/login" className="hover:text-emerald-400 transition-colors">Sign In</Link></li>
                <li><Link href="/signup" className="hover:text-emerald-400 transition-colors">Create Account</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>© {new Date().getFullYear()} Arabic NET/JRF. All rights reserved.</p>
            <p>Built for the Arabic academic community.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

