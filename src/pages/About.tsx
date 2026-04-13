import { Link } from 'react-router-dom';

const HOW_IT_WORKS = [
  {
    step: '1',
    icon: '🎤',
    title: 'Speak',
    desc: 'Select your language and tap the mic. Describe your symptoms naturally, in your own language.',
  },
  {
    step: '2',
    icon: '🧠',
    title: 'AI Analyses',
    desc: 'Llama 3.3 70B via Groq processes your symptoms in milliseconds, understanding any language.',
  },
  {
    step: '3',
    icon: '📋',
    title: 'Get Guidance',
    desc: 'Receive a severity rating, immediate action steps, and a spoken response — all in your language.',
  },
];

const TECH = [
  { name: 'Groq + Llama 3.3', desc: 'Ultra-fast multilingual AI triage' },
  { name: 'Web Speech API', desc: 'Browser-native voice input and output' },
  { name: 'React + Vite', desc: 'Fast, modern progressive web app' },
  { name: 'Zero Dependencies', desc: 'No install, no account, always free' },
];

const LANGUAGES = [
  { flag: '🇺🇸', name: 'English',    nativeName: 'English',   region: 'Global baseline' },
  { flag: '🇮🇳', name: 'Hindi',      nativeName: 'हिन्दी',     region: 'India, South Asia' },
  { flag: '🇰🇪', name: 'Swahili',    nativeName: 'Kiswahili', region: 'East Africa' },
  { flag: '🇧🇷', name: 'Portuguese', nativeName: 'Português', region: 'Brazil, West Africa' },
  { flag: '🇳🇬', name: 'Yoruba',     nativeName: 'Yorùbá',    region: 'Nigeria, West Africa' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🏥</span>
          <span className="font-bold text-lg">MediVoice AI</span>
        </Link>
        <Link
          to="/app"
          className="px-4 py-2 bg-blue-600 rounded-xl text-sm font-medium hover:bg-blue-500 transition-colors"
        >
          Try It
        </Link>
      </nav>

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-10 space-y-12">
        {/* The Problem */}
        <section>
          <h2 className="text-2xl font-bold mb-4">The Problem</h2>
          <p className="text-slate-400 leading-relaxed">
            Over <strong className="text-white">1 billion people</strong> in rural Africa, South Asia,
            and Latin America have no reliable access to a doctor. When they get sick they either travel
            hours to a clinic, guess, or do nothing. The barrier isn't just distance — it's language.
            Most AI health tools assume English and a keyboard. Most rural patients have neither.
          </p>
          <p className="text-slate-400 leading-relaxed mt-3 font-medium text-white">
            MediVoice AI breaks both barriers simultaneously.
          </p>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="space-y-3">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.step} className="flex gap-4 bg-slate-800 rounded-xl p-4 border border-slate-700">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-semibold">
                    {s.icon} {s.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Technology</h2>
          <div className="grid grid-cols-2 gap-3">
            {TECH.map((t) => (
              <div key={t.name} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <p className="font-semibold text-sm text-white">{t.name}</p>
                <p className="text-slate-400 text-xs mt-1">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Supported Languages</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800 text-slate-400 text-left">
                  <th className="px-4 py-3 font-medium">Language</th>
                  <th className="px-4 py-3 font-medium">Native</th>
                  <th className="px-4 py-3 font-medium">Region</th>
                </tr>
              </thead>
              <tbody>
                {LANGUAGES.map((lang, i) => (
                  <tr
                    key={lang.name}
                    className={`border-t border-slate-700 ${i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-800/40'}`}
                  >
                    <td className="px-4 py-3">
                      {lang.flag} {lang.name}
                    </td>
                    <td className="px-4 py-3 text-slate-400">{lang.nativeName}</td>
                    <td className="px-4 py-3 text-slate-400">{lang.region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-5">
          <h2 className="text-lg font-bold text-amber-300 mb-2">⚠️ Important Disclaimer</h2>
          <p className="text-amber-200/70 text-sm leading-relaxed">
            MediVoice AI is an AI-powered first-aid triage assistant, not a licensed medical
            professional. This tool provides general guidance only and does not constitute medical
            advice, diagnosis, or treatment. Always consult a qualified healthcare professional for
            medical decisions. In an emergency, contact local emergency services immediately.
          </p>
        </section>
      </main>
    </div>
  );
}
