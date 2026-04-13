export function isSpeechSynthesisSupported(): boolean {
  return 'speechSynthesis' in window;
}

// Voices load asynchronously — wait for them to be ready
function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }
    window.speechSynthesis.onvoiceschanged = () => {
      resolve(window.speechSynthesis.getVoices());
    };
  });
}

// Known low-quality / robotic / cartoon voices to avoid
const BAD_VOICE_PATTERN = /zira|hazel|david|fred|victoria|junior|bahh|bells|boing|bubbles|cellos|deranged|good|hysterical|organ|pipe|trinoids|whisper|wobble|zarvox|compact/i;

// Ranked preference: Google > Microsoft > Apple premium > any other
const GOOD_VOICE_PATTERN = /google|microsoft|samantha|alex|karen|daniel|moira|tessa|fiona|rishi/i;

function pickVoice(
  voices: SpeechSynthesisVoice[],
  bcp47: string
): SpeechSynthesisVoice | null {
  const lang = bcp47.toLowerCase();
  const baseLang = lang.split('-')[0];

  const forLang = voices.filter(
    (v) =>
      v.lang.toLowerCase() === lang ||
      v.lang.toLowerCase().startsWith(baseLang)
  );

  if (!forLang.length) return null;

  // 1. High-quality voice for this exact locale
  const premium = forLang.find(
    (v) => GOOD_VOICE_PATTERN.test(v.name) && !BAD_VOICE_PATTERN.test(v.name)
  );
  if (premium) return premium;

  // 2. Any voice that isn't in the bad list
  const decent = forLang.find((v) => !BAD_VOICE_PATTERN.test(v.name));
  if (decent) return decent;

  // 3. Last resort — whatever is available
  return forLang[0];
}

export function speakText(
  text: string,
  bcp47: string,
  onStart?: () => void,
  onEnd?: () => void
): void {
  if (!isSpeechSynthesisSupported()) return;

  window.speechSynthesis.cancel();

  loadVoices().then((voices) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = bcp47;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voice = pickVoice(voices, bcp47);
    if (voice) {
      utterance.voice = voice;
      console.log('[MediVoice] Using voice:', voice.name, voice.lang);
    }

    if (onStart) utterance.onstart = onStart;
    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    // Small delay so cancel() fully clears before speaking
    setTimeout(() => window.speechSynthesis.speak(utterance), 50);
  });
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
