import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Mic, BarChart2, HeartPulse, CheckCircle, ChevronRight, Pill, Volume2 } from 'lucide-react';

const FEATURES = [
  {
    Icon: Mic,
    title: 'Voice Recognition',
    desc: 'Speak naturally in your language — AI understands and triages your symptoms instantly.',
  },
  {
    Icon: BarChart2,
    title: 'AI-Powered Analysis',
    desc: 'Llama 3.3 70B assesses severity, likely conditions, and next steps in seconds.',
  },
  {
    Icon: HeartPulse,
    title: 'Built for Underserved',
    desc: 'Designed for 1 billion people in rural Africa, South Asia, and Latin America.',
  },
];

const STATS = ['5 Languages', '0 Installs Required', '2G Compatible', 'Always Free'];

function PhoneMockup() {
  return (
    <div className="relative flex justify-center items-center">
      {/* Floating card — top right */}
      <div className="absolute -right-4 top-16 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
          <HeartPulse className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-white font-headline">Dr. AI Assistant</p>
          <p className="text-[10px] text-slate-400">Ready to consult</p>
        </div>
      </div>

      {/* Floating card — bottom left */}
      <div className="absolute -left-4 bottom-24 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
          <Pill className="w-4 h-4 text-red-400" />
        </div>
        <p className="text-xs font-bold text-white font-headline">Antihistamines</p>
      </div>

      {/* Phone frame */}
      <div className="relative w-[280px] h-[560px] bg-slate-950 rounded-[3rem] p-2.5 shadow-2xl ring-4 ring-slate-700 border-2 border-slate-600">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-950 rounded-b-2xl z-10" />

        {/* Screen */}
        <div className="h-full w-full bg-slate-100 rounded-[2.5rem] overflow-hidden flex flex-col">
          {/* Screen header */}
          <div className="px-5 pt-9 pb-3 flex items-center justify-between">
            <div className="w-5 h-5 rounded-full bg-slate-300" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Analysis Result</span>
            <div className="w-5 h-5 rounded-full bg-slate-300" />
          </div>

          {/* Result icon */}
          <div className="flex flex-col items-center py-3">
            <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mb-2">
              <CheckCircle className="w-8 h-8 text-teal-600" strokeWidth={2} />
            </div>
            <p className="text-sm font-bold text-blue-900 font-headline">Assessment Complete</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Voice data analysed</p>
          </div>

          {/* Cards */}
          <div className="flex-1 px-4 space-y-2.5 overflow-hidden">
            {/* Severity */}
            <div className="p-3 rounded-xl bg-white shadow-sm">
              <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1">Severity</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-blue-900 font-headline">Moderate</span>
                <div className="flex gap-1">
                  <div className="w-5 h-1.5 rounded-full bg-blue-700" />
                  <div className="w-5 h-1.5 rounded-full bg-blue-700" />
                  <div className="w-5 h-1.5 rounded-full bg-slate-200" />
                </div>
              </div>
            </div>

            {/* Condition */}
            <div className="p-3 rounded-xl bg-white shadow-sm flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-blue-700 flex-shrink-0" />
              <div>
                <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Possible Condition</p>
                <p className="text-sm font-bold text-slate-800 font-headline">Seasonal Allergy</p>
              </div>
            </div>

            {/* Next steps */}
            <div className="p-3 rounded-xl bg-blue-800 flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-blue-300 font-bold">Next Steps</p>
                <p className="text-sm font-bold text-white font-headline">Consultation</p>
              </div>
              <ChevronRight className="w-4 h-4 text-blue-300" />
            </div>
          </div>

          {/* Voice wave bar */}
          <div className="mx-4 mb-4 mt-3 h-14 rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center gap-1.5 px-5">
            {[3, 6, 10, 5, 9, 3, 7, 11, 4, 8].map((h, i) => (
              <div
                key={i}
                className="w-1 rounded-full bg-white/70"
                style={{ height: `${h * 4}px`, opacity: i % 3 === 0 ? 0.4 : i % 2 === 0 ? 0.7 : 1 }}
              />
            ))}
            <Volume2 className="w-4 h-4 text-white/60 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col font-body">
      {/* Nav — keep existing */}
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏥</span>
          <span className="font-bold text-xl font-headline">MediVoice AI</span>
        </div>
        <Link to="/about" className="text-slate-400 hover:text-white text-sm transition-colors">
          About
        </Link>
      </nav>

      <main className="flex-1 overflow-hidden">
        {/* ── Hero ── */}
        <section className="relative px-6 pt-10 pb-20 container mx-auto">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <div className="space-y-7 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                AI-Powered Diagnostics
              </div>

              <h1 className="text-5xl lg:text-6xl font-headline font-extrabold tracking-tighter leading-[1.05]">
                MediVoice AI
                <span className="block text-blue-400 mt-1">Clinical Precision</span>
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Speak your symptoms, see the solution. Voice-powered AI health triage
                for communities without access to doctors — in any language, on any phone.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => navigate('/app')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-headline font-bold rounded-full shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 transition-transform"
                >
                  Start Voice Scan
                </button>
                <a
                  href="https://youtu.be/6cLJb13_cBA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-slate-800 border border-slate-700 text-white font-headline font-bold rounded-full hover:bg-slate-700 transition-colors text-center"
                >
                  View Demo
                </a>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
                {STATS.map((s) => (
                  <span key={s} className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-full text-slate-300 text-xs">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — phone mockup (hidden on small screens) */}
            <div className="hidden lg:flex justify-center">
              <PhoneMockup />
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="px-6 pb-24 container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="p-7 rounded-3xl bg-slate-800/60 border border-slate-700/60 flex flex-col gap-4 hover:border-blue-500/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-lg font-headline font-bold text-white">{title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Disclaimer */}
      <div className="px-6 py-4 bg-amber-900/20 border-t border-amber-700/30">
        <p className="text-amber-200/60 text-xs text-center">
          ⚠️ MediVoice AI is a triage assistant, not a medical professional.
          Always consult a doctor for medical decisions.
        </p>
      </div>
    </div>
  );
}
