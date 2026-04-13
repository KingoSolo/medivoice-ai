// ─── languageConfig.ts ──────────────────────────────────────────────
import type { LanguageConfig } from '../types/Index';

export const LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English',    nativeName: 'English',   bcp47: 'en-US', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi',      nativeName: 'हिन्दी',     bcp47: 'hi-IN', flag: '🇮🇳' },
  { code: 'sw', name: 'Swahili',    nativeName: 'Kiswahili', bcp47: 'sw-KE', flag: '🇰🇪' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', bcp47: 'pt-BR', flag: '🇧🇷' },
  { code: 'yo', name: 'Yoruba',     nativeName: 'Yorùbá',    bcp47: 'yo-NG', flag: '🇳🇬' },
];

// Idle instruction text hardcoded in each language
export const IDLE_INSTRUCTIONS: Record<string, string> = {
  en: 'Tap the mic and describe how you\'re feeling',
  hi: 'माइक दबाएं और बताएं आप कैसा महसूस कर रहे हैं',
  sw: 'Bonyeza kitufe cha sauti na elezea hali yako',
  pt: 'Toque no microfone e descreva como você está se sentindo',
  yo: 'Tẹ bọtini ohun ati ṣapejuwe bi o ṣe rilara',
};

export const LISTENING_TEXT: Record<string, string> = {
  en: 'Listening… speak your symptoms',
  hi: 'सुन रहा हूं… अपने लक्षण बताएं',
  sw: 'Sikiliza… eleza dalili zako',
  pt: 'Ouvindo… descreva seus sintomas',
  yo: 'Tẹtisi… ṣapejuwe awọn aami aisan rẹ',
};

export const SPEAK_BUTTON_TEXT: Record<string, string> = {
  en: 'Hear response in English',
  hi: 'हिन्दी में सुनें',
  sw: 'Sikiliza kwa Kiswahili',
  pt: 'Ouvir em Português',
  yo: 'Gbọ ni Yorùbá',
};
