export const MAX_FEEDBACK_LENGTH = 1200;
export const MIN_FEEDBACK_LENGTH = 4;

export function validateAnonymousFeedback(feedback: string): string | null {
  const normalizedFeedback = feedback.trim();

  if (normalizedFeedback.length < MIN_FEEDBACK_LENGTH) {
    return `Feedback terlalu singkat. Tulis minimal ${MIN_FEEDBACK_LENGTH} karakter.`;
  }

  if (normalizedFeedback.length > MAX_FEEDBACK_LENGTH) {
    return `Feedback maksimal ${MAX_FEEDBACK_LENGTH.toLocaleString("id-ID")} karakter.`;
  }

  return null;
}
