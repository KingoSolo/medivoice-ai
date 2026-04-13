import { useNavigate, Link } from 'react-router-dom';

const FEATURES = [
  {
    icon: '🎤',
    title: 'Speak Naturally',
    desc: 'Talk in Hindi, Swahili, Yoruba, Portuguese or English',
  },
  {
    icon: '🧠',
    title: 'AI-Powered Triage',
    desc: 'Powered by Llama 3.3 — understands complex symptom descriptions',
  },
  {
    icon: '🌍',
    title: 'Built for 1 Billion',
    desc: 'Designed for rural Africa, South Asia, and Latin America',
  },
];

const STATS = ['5 Languages', '0 Installs Required', '2G Compatible', 'Always Free'];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏥</span>
          <span className="font-bold text-xl">MediVoice AI</span>
        </div>
        <Link to="/about" className="text-slate-400 hover:text-white text-sm transition-colors">
          About
        </Link>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center py-10 gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="text-6xl mb-2">🏥</div>
          <h1 className="text-4xl font-black leading-tight tracking-tight">
            Healthcare guidance
            <br />
            <span className="text-blue-400">in your language</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-md mx-auto">
            Voice-powered AI health triage for communities without access to doctors.
            Speak your symptoms. Get guidance. No English needed.
          </p>
        </div>

        <button
          onClick={() => navigate('/app')}
          className="px-8 py-4 bg-blue-600 rounded-2xl text-white font-bold text-lg hover:bg-blue-500 active:scale-95 transition-all shadow-lg shadow-blue-500/30"
        >
          Check My Symptoms →
        </button>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-4 max-w-md w-full">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-slate-800 rounded-2xl p-5 text-left border border-slate-700"
            >
              <div className="text-3xl mb-2">{f.icon}</div>
              <h3 className="font-bold text-white">{f.title}</h3>
              <p className="text-slate-400 text-sm mt-1">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Impact Numbers */}
        <div className="flex flex-wrap gap-3 justify-center">
          {STATS.map((stat) => (
            <span
              key={stat}
              className="px-4 py-2 bg-slate-800 rounded-full text-slate-300 text-sm border border-slate-700"
            >
              {stat}
            </span>
          ))}
        </div>
      </main>

      {/* Disclaimer */}
      <div className="px-6 py-4 bg-amber-900/20 border-t border-amber-700/30">
        <p className="text-amber-200/70 text-xs text-center">
          ⚠️ MediVoice AI is a triage assistant, not a medical professional.
          Always consult a doctor for medical decisions.
        </p>
      </div>
    </div>
  );
}
