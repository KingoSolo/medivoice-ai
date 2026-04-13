import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Mic, AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import { useVoiceTriage } from '../hooks/UseVoiceTriage';
import { LANGUAGES, IDLE_INSTRUCTIONS, LISTENING_TEXT } from '../utils/LanguageConfig';
import TriageCard from '../components/TriageCard';

export default function AppPage() {
  const {
    appState,
    selectedLanguage,
    transcript,
    triageResult,
    errorMessage,
    isSpeaking,
    isSpeechSupported,
    selectLanguage,
    startSession,
    cancelListening,
    submitTextFallback,
    speakResult,
    stopSpeakingResult,
    resetSession,
  } = useVoiceTriage();

  const [textInput, setTextInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextSubmit = () => {
    const val = textInput.trim();
    if (val) {
      submitTextFallback(val);
      setTextInput('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-slate-400 hover:text-white transition-colors p-1 -ml-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏥</span>
            <span className="font-bold text-lg">MediVoice AI</span>
          </div>
        </div>
        <Link to="/about" className="text-slate-400 hover:text-white text-sm transition-colors">
          About
        </Link>
      </nav>

      {/* Language Selector */}
      <div className="px-4 py-3 border-b border-slate-800">
        <div className="flex gap-2 overflow-x-auto pb-0.5 no-scrollbar">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLanguage(lang)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedLanguage.code === lang.code
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.nativeName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">

        {/* ── IDLE ── */}
        {appState === 'idle' && (
          <div className="flex flex-col items-center gap-6 text-center max-w-sm w-full">
            <p className="text-slate-300 text-lg leading-relaxed px-2">
              {IDLE_INSTRUCTIONS[selectedLanguage.code]}
            </p>

            {isSpeechSupported ? (
              <>
                <button
                  onClick={startSession}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all"
                  aria-label="Start voice input"
                >
                  <Mic className="w-10 h-10 text-white" />
                </button>
                <p className="text-slate-500 text-sm">Available in 5 languages</p>
              </>
            ) : (
              <div className="w-full space-y-3">
                <p className="text-amber-400 text-sm px-2">
                  Voice not supported in this browser. Please type your symptoms.
                </p>
                <textarea
                  ref={textareaRef}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleTextSubmit();
                    }
                  }}
                  placeholder="Describe your symptoms here..."
                  rows={4}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 resize-none focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  onClick={handleTextSubmit}
                  disabled={!textInput.trim()}
                  className="w-full py-3 bg-blue-600 rounded-xl font-semibold hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  Analyse Symptoms
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── LISTENING ── */}
        {appState === 'listening' && (
          <div className="flex flex-col items-center gap-6 text-center max-w-sm w-full">
            <p className="text-blue-300 text-lg font-medium">
              {LISTENING_TEXT[selectedLanguage.code]}
            </p>

            {isSpeechSupported ? (
              <div className="relative flex items-center justify-center w-32 h-32">
                {/* Pulse rings */}
                <span className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
                <span className="absolute w-28 h-28 rounded-full bg-blue-500/15 animate-ping [animation-delay:200ms]" />
                {/* Mic button */}
                <button
                  onClick={cancelListening}
                  className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/40"
                  aria-label="Cancel listening"
                >
                  <Mic className="w-10 h-10 text-white" />
                </button>
              </div>
            ) : (
              <div className="w-full space-y-3">
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleTextSubmit();
                    }
                  }}
                  placeholder="Describe your symptoms here..."
                  rows={4}
                  autoFocus
                  className="w-full bg-slate-800 border border-blue-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 resize-none focus:outline-none transition-colors"
                />
                <button
                  onClick={handleTextSubmit}
                  disabled={!textInput.trim()}
                  className="w-full py-3 bg-blue-600 rounded-xl font-semibold hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  Analyse Symptoms
                </button>
              </div>
            )}

            <button
              onClick={cancelListening}
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

        {/* ── PROCESSING ── */}
        {appState === 'processing' && (
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-blue-500 animate-spin" />
            <div className="space-y-2">
              <p className="text-white text-lg font-medium">Analysing your symptoms...</p>
              <div className="flex gap-1.5 justify-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {appState === 'result' && triageResult && (
          <div className="w-full max-w-md space-y-4">
            {transcript && (
              <div className="bg-slate-800/60 rounded-xl px-4 py-3 border border-slate-700">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">You said</p>
                <p className="text-slate-200 text-sm italic">"{transcript}"</p>
              </div>
            )}
            <TriageCard
              result={triageResult}
              languageName={selectedLanguage.name}
              isSpeaking={isSpeaking}
              onSpeak={speakResult}
              onStop={stopSpeakingResult}
              onReset={resetSession}
            />
          </div>
        )}

        {/* ── ERROR ── */}
        {appState === 'error' && (
          <div className="flex flex-col items-center gap-6 text-center max-w-sm">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <div className="space-y-1">
              <p className="text-white text-lg font-semibold">Could not process</p>
              <p className="text-slate-400 text-sm">
                {errorMessage || 'Please try again.'}
              </p>
            </div>
            <button
              onClick={resetSession}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-xl font-semibold hover:bg-blue-500 transition-all active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        )}
      </main>

      {/* Footer disclaimer */}
      <div className="px-4 py-3 border-t border-slate-800 bg-slate-950/40">
        <p className="text-slate-600 text-xs text-center">
          ⚠️ MediVoice AI is a triage assistant, not a medical professional. Always consult a doctor.
        </p>
      </div>
    </div>
  );
}
