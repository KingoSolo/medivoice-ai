import type { TriageResult} from '../types/Index'

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are MediVoice AI, a compassionate first-aid health triage assistant for people in underserved communities who have no access to doctors. You receive spoken symptom descriptions (possibly in a non-English language) and provide structured health guidance.

CRITICAL RULES:
1. You are NOT a doctor. Always include a medical disclaimer.
2. Always respond with valid JSON ONLY — absolutely no markdown, no code blocks, no preamble, no explanation outside the JSON.
3. Translate and understand input in any language including Hindi, Swahili, Yoruba, Portuguese, and English.
4. Your responseInLanguage field MUST be written entirely in the SAME language as the user's input.
5. Keep responses compassionate, clear, and simple. Avoid complex medical jargon.
6. Never diagnose definitively — use "possible" or "likely" language.
7. For severity=emergency, always say to call emergency services immediately.
8. immediateActions should be 3-4 practical steps a person can take right now at home.

Severity guide:
- low: minor symptoms, manageable at home (cold, minor cut, mild headache)
- moderate: symptoms need monitoring, may need clinic visit in 1-2 days (fever, persistent pain)
- urgent: needs medical attention within hours (high fever, difficulty breathing, severe pain)
- emergency: life-threatening, call emergency services NOW (chest pain, unconscious, severe bleeding)

Respond ONLY with this exact JSON structure, nothing else:
{
  "severity": "low" | "moderate" | "urgent" | "emergency",
  "condition": "Brief possible condition name in English",
  "immediateActions": ["Action 1", "Action 2", "Action 3"],
  "seekCareMessage": "When and where to seek care instruction",
  "disclaimer": "This is not a medical diagnosis. Please consult a healthcare professional.",
  "responseInLanguage": "Full warm empathetic spoken response written in the SAME language as the user input"
}`;

const FALLBACK_RESULT: TriageResult = {
  severity: 'moderate',
  condition: 'Unable to Process',
  immediateActions: [
    'Please describe your symptoms again clearly',
    'Try speaking slowly and clearly',
    'If symptoms are severe, visit the nearest clinic immediately',
  ],
  seekCareMessage: 'If you feel unwell, please visit your nearest health clinic.',
  disclaimer:
    'This is not a medical diagnosis. Please consult a healthcare professional.',
  responseInLanguage:
    'I was unable to process your symptoms. Please try again, or visit a nearby health clinic if you feel unwell.',
};

export async function triageSymptoms(
  transcript: string,
  languageName: string
): Promise<TriageResult> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey || apiKey === 'your_key_here') {
    console.error('[MediVoice] VITE_GROQ_API_KEY is missing. Add it to your .env file.');
    return FALLBACK_RESULT;
  }

  if (!transcript.trim()) {
    return FALLBACK_RESULT;
  }

  try {
    const response = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 600,
        temperature: 0.3,
        response_format: { type: 'json_object' }, // force valid JSON output
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Patient symptoms described in ${languageName}: "${transcript}"`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[MediVoice] Groq API ${response.status}:`, errText);
      return FALLBACK_RESULT;
    }

    const data = await response.json();
    const rawText: string = data.choices?.[0]?.message?.content ?? '';
    console.log('[MediVoice] Raw Groq response:', rawText);

    // Strip any accidental markdown code fences
    const cleaned = rawText
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    const parsed: TriageResult = JSON.parse(cleaned);

    // Validate required fields
    if (
      !parsed.severity ||
      !parsed.condition ||
      !Array.isArray(parsed.immediateActions) ||
      !parsed.responseInLanguage
    ) {
      console.warn('Incomplete triage result, using fallback');
      return FALLBACK_RESULT;
    }

    return parsed;
  } catch (error) {
    console.error('triageSymptoms error:', error);
    return FALLBACK_RESULT;
  }
}
