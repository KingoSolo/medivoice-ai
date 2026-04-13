import { Volume2, VolumeX, Clock, RotateCcw } from 'lucide-react';
import type { TriageResult } from '../types/Index';

const SEVERITY_CONFIG = {
  low:       { bg: 'bg-green-500',  ring: 'ring-green-500/20',  label: 'Low Severity' },
  moderate:  { bg: 'bg-amber-500',  ring: 'ring-amber-500/20',  label: 'Moderate Severity' },
  urgent:    { bg: 'bg-orange-500', ring: 'ring-orange-500/20', label: 'Seek Care Soon' },
  emergency: { bg: 'bg-red-500',    ring: 'ring-red-500/20',    label: 'EMERGENCY — Call Now' },
} as const;

interface TriageCardProps {
  result: TriageResult;
  languageName: string;
  isSpeaking: boolean;
  onSpeak: () => void;
  onStop: () => void;
  onReset: () => void;
}

export default function TriageCard({
  result,
  languageName,
  isSpeaking,
  onSpeak,
  onStop,
  onReset,
}: TriageCardProps) {
  const severity = SEVERITY_CONFIG[result.severity];

  return (
    <div className={`w-full bg-slate-800 rounded-2xl p-6 ring-1 ${severity.ring} space-y-5`}>
      {/* Severity Badge */}
      <div className="text-center">
        <span className={`inline-block ${severity.bg} text-white font-bold text-base px-6 py-2 rounded-full`}>
          {severity.label}
        </span>
      </div>

      {/* Condition */}
      <div>
        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Possible condition</p>
        <p className="text-white text-xl font-bold mt-1">{result.condition}</p>
      </div>

      {/* Immediate Actions */}
      <div>
        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-3">Immediate Actions</p>
        <ol className="space-y-2.5">
          {result.immediateActions.map((action, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="text-slate-200 text-sm leading-relaxed">{action}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Seek Care Message */}
      <div className="flex items-start gap-2.5 bg-slate-700/50 rounded-xl p-3.5">
        <Clock className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-slate-200 text-sm leading-relaxed">{result.seekCareMessage}</p>
      </div>

      {/* Speak Button */}
      <button
        onClick={isSpeaking ? onStop : onSpeak}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
          isSpeaking
            ? 'bg-slate-600 text-white hover:bg-slate-500'
            : 'bg-blue-600 text-white hover:bg-blue-500 active:scale-95'
        }`}
      >
        {isSpeaking ? (
          <>
            <VolumeX className="w-4 h-4" />
            Stop Speaking
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4" />
            Hear this in {languageName}
          </>
        )}
      </button>

      {/* Disclaimer */}
      <p className="text-slate-500 text-xs italic text-center leading-relaxed">
        {result.disclaimer}
      </p>

      {/* Reset */}
      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 transition-all font-medium text-sm active:scale-95"
      >
        <RotateCcw className="w-4 h-4" />
        Start New Assessment
      </button>
    </div>
  );
}
