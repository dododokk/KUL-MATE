export interface MyStyleSurveyRequest {
  dormitoryType: "LAKE" | "OTHER";
  major: string;
  residenceDuration: "FOUR_MONTH" | "SIX_MONTH";
  gender: "MALE" | "FEMALE";
  mbti: string;
  smokingStatus: "SMOKER" | "NON_SMOKER";
  eatingInRoom: "ALLOWED" | "NOT_ALLOWED";
  showerTime: "MORNING" | "EVENING";
  sleepHabit: "NONE" | "NORMAL" | "SEVERE";
  homeVisitFrequency: "WEEKLY" | "BIWEEKLY" | "MONTHLY_OR_MORE" | "RARE";
  sleepStartTime: string;
  sleepEndTime: string;
  wakeUpStartTime: string;
  wakeUpEndTime: string;
  returnStartTime: string;
  returnEndTime: string;
  cleaningFrequencyScore: number;
  organizationSensitivityScore: number;
  temperatureSensitivityScore: number;
}

export interface MyStyleSurveyResponse {
  success: boolean;
  message: string;
  data: unknown;
}

export interface MyStyleSurveyGetResponse {
  lifestyleId: number;
  userId: number;
  dormitoryType: "LAKE" | "OTHER";
  major: string;
  residenceDuration: "FOUR_MONTH" | "SIX_MONTH";
  gender: "MALE" | "FEMALE";
  mbti: string;
  smokingStatus: "SMOKER" | "NON_SMOKER";
  eatingInRoom: "ALLOWED" | "NOT_ALLOWED";
  showerTime: "MORNING" | "EVENING";
  sleepHabit: "NONE" | "NORMAL" | "SEVERE";
  homeVisitFrequency: "WEEKLY" | "BIWEEKLY" | "MONTHLY_OR_MORE" | "RARE";
  sleepStartTime: string;
  sleepEndTime: string;
  wakeUpStartTime: string;
  wakeUpEndTime: string;
  returnStartTime: string;
  returnEndTime: string;
  cleaningFrequencyScore: number;
  organizationSensitivityScore: number;
  temperatureSensitivityScore: number;
}

export interface PreferenceSurveyRequest {
  smokingStatus: "SMOKER" | "NON_SMOKER" | null;
  eatingInRoom: "ALLOWED" | "NOT_ALLOWED" | null;
  mbtiFirst: string;
  mbtiSecond: string;
  mbtiThird: string;
  mbtiFourth: string;
  showerTime: "MORNING" | "EVENING" | null;
  sleepHabits: string[];
  homeVisitFrequencies: string[];
  sleepStartTime: string;
  sleepEndTime: string;
  wakeUpStartTime: string;
  wakeUpEndTime: string;
  returnStartTime: string;
  returnEndTime: string;
  cleaningFrequencyScores: number[];
  organizationSensitivityScores: number[];
  temperatureSensitivityScores: number[];
}

export interface PreferenceSurveyStatusResponse {
  completed: boolean;
}

export interface PreferenceSurveyResponse {
  preferenceId: number;
  userId: number;
  smokingStatus: "SMOKER" | "NON_SMOKER";
  eatingInRoom: "ALLOWED" | "NOT_ALLOWED";
  mbtiFirst: string;
  mbtiSecond: string;
  mbtiThird: string;
  mbtiFourth: string;
  showerTime: "MORNING" | "EVENING";
  sleepHabits: string[];
  homeVisitFrequencies: string[];
  sleepStartTime: string;
  sleepEndTime: string;
  wakeUpStartTime: string;
  wakeUpEndTime: string;
  returnStartTime: string;
  returnEndTime: string;
  cleaningFrequencyScores: number[];
  organizationSensitivityScores: number[];
  temperatureSensitivityScores: number[];
}
