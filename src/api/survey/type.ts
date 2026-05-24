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
