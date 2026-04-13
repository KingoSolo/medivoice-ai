export function isSpeechSynthesisSupported(): boolean {
  return 'speechSynthesis' in window;
}

function getBestVoice(bcp47: string): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const lang = bcp47.toLowerCase();
  const baseLang = lang.split('-')[0];

  // Prefer high-quality named voices (Google/Microsoft/Apple) in language order
  const preferred = voices.filter(
    (v) =>
      v.lang.toLowerCase() === lang &&
      /google|microsoft|samantha|alex|karen|daniel/i.test(v.name)
  );
  if (preferred.length) return preferred[0];

  // Any exact locale match
  const exact = voices.find((v) => v.lang.toLowerCase() === lang);
  if (exact) return exact;

  // Any voice sharing the base language (e.g. 'hi' matches 'hi-IN')
  return voices.find((v) => v.lang.toLowerCase().startsWith(baseLang)) ?? null;
}

export function speakText(
  text: string,
  bcp47: string,
  onStart?: () => void,
  onEnd?: () => void
): void {
  if (!isSpeechSynthesisSupported()) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = bcp47;
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  const voice = getBestVoice(bcp47);
  if (voice) utterance.voice = voice;

  if (onStart) utterance.onstart = onStart;
  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  // Chrome sometimes needs a small delay after cancel() before speaking
  setTimeout(() => window.speechSynthesis.speak(utterance), 50);
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
