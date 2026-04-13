export interface TriageResult {
  severity: 'low' | 'moderate' | 'urgent' | 'emergency';
  condition: string;
  immediateActions: string[];
  seekCareMessage: string;
  disclaimer: string;
  responseInLanguage: string;
}

export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  bcp47: string;
  flag: string;
}

export type AppState = 'idle' | 'listening' | 'processing' | 'result' | 'error';
