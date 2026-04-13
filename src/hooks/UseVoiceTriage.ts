import { useState, useCallback } from 'react';
import type { AppState, LanguageConfig, TriageResult } from '../types/Index';
import { LANGUAGES } from '../utils/LanguageConfig';
import { triageSymptoms } from '../utils/GroqAPI';
import { startListening, stopListening, isSpeechSupported } from '../utils/speechInput';
import { speakText, stopSpeaking } from '../utils/speechOutput';

export function useVoiceTriage() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageConfig>(LANGUAGES[0]);
  const [transcript, setTranscript] = useState<string>('');
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const selectLanguage = useCallback((lang: LanguageConfig) => {
    setSelectedLanguage(lang);
    setAppState('idle');
    setTranscript('');
    setTriageResult(null);
    setErrorMessage('');
  }, []);

  const handleTranscriptReceived = useCallback(
    async (text: string) => {
      setTranscript(text);
      setAppState('processing');
      const result = await triageSymptoms(text, selectedLanguage.name);
      setTriageResult(result);
      setAppState('result');
    },
    [selectedLanguage]
  );

  const handleError = useCallback((msg: string) => {
    setErrorMessage(msg);
    setAppState('error');
  }, []);

  const startSession = useCallback(() => {
    setAppState('listening');
    setTranscript('');
    setTriageResult(null);
    setErrorMessage('');

    if (isSpeechSupported()) {
      startListening(selectedLanguage.bcp47, handleTranscriptReceived, handleError);
    }
  }, [selectedLanguage, handleTranscriptReceived, handleError]);

  const cancelListening = useCallback(() => {
    stopListening();
    setAppState('idle');
  }, []);

  const submitTextFallback = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      await handleTranscriptReceived(text.trim());
    },
    [handleTranscriptReceived]
  );

  const speakResult = useCallback(() => {
    if (!triageResult) return;
    speakText(
      triageResult.responseInLanguage,
      selectedLanguage.bcp47,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  }, [triageResult, selectedLanguage]);

  const stopSpeakingResult = useCallback(() => {
    stopSpeaking();
    setIsSpeaking(false);
  }, []);

  const resetSession = useCallback(() => {
    stopListening();
    stopSpeaking();
    setAppState('idle');
    setTranscript('');
    setTriageResult(null);
    setErrorMessage('');
    setIsSpeaking(false);
  }, []);

  return {
    appState,
    selectedLanguage,
    transcript,
    triageResult,
    errorMessage,
    isSpeaking,
    isSpeechSupported: isSpeechSupported(),
    selectLanguage,
    startSession,
    cancelListening,
    submitTextFallback,
    speakResult,
    stopSpeakingResult,
    resetSession,
  };
}
