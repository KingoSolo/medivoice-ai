export function isSpeechSupported(): boolean {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let recognition: any = null;

export function startListening(
  bcp47: string,
  onResult: (transcript: string) => void,
  onError: (error: string) => void
): void {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    onError('Speech recognition not supported in this browser.');
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = bcp47;
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = event.results[0][0].transcript;
    if (transcript.trim()) {
      onResult(transcript.trim());
    } else {
      onError('No speech detected. Please try again.');
    }
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    const msg =
      event.error === 'not-allowed'
        ? 'Microphone access denied. Please allow microphone access and try again.'
        : event.error === 'no-speech'
        ? 'No speech detected. Please try again.'
        : 'Could not process speech. Please try again.';
    onError(msg);
  };

  recognition.onend = () => {
    recognition = null;
  };

  recognition.start();
}

export function stopListening(): void {
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
}
