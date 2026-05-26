const MBTI_REGEX = /^[EI][NS][TF][JP]$/i;

export function isValidMbti(value: string): boolean {
  return MBTI_REGEX.test(value);
}

export function isValidScore(value: number): boolean {
  return Number.isInteger(value) && value >= 1 && value <= 5;
}
