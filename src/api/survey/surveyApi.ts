import type { PreferenceSurveyData } from "../../features/survey/PreferenceSurveyForm";
import type { SurveyData } from "../../features/survey/SurveyForm";
import axiosInstance from "../axiosInstance";
import type {
  MyStyleSurveyGetResponse,
  MyStyleSurveyRequest,
  MyStyleSurveyResponse,
  PreferenceSurveyRequest,
  PreferenceSurveyResponse,
  PreferenceSurveyStatusResponse,
} from "./type";

function toMyStyleRequest(data: SurveyData): MyStyleSurveyRequest {
  return {
    dormitoryType: data.dormitory === "lake" ? "LAKE" : "OTHER",
    major: data.major,
    residenceDuration: data.stayPeriod === "4months" ? "FOUR_MONTH" : "SIX_MONTH",
    gender: data.gender === "male" ? "MALE" : "FEMALE",
    mbti: `${data.mbti.ei ?? ""}${data.mbti.sn ?? ""}${data.mbti.tf ?? ""}${data.mbti.jp ?? ""}`,
    smokingStatus: data.smoking === "smoker" ? "SMOKER" : "NON_SMOKER",
    eatingInRoom: data.eating === "allowed" ? "ALLOWED" : "NOT_ALLOWED",
    showerTime: data.showerTime === "morning" ? "MORNING" : "EVENING",
    sleepHabit:
      data.sleepingHabit === "severe"
        ? "SEVERE"
        : data.sleepingHabit === "moderate"
          ? "NORMAL"
          : "NONE",
    homeVisitFrequency:
      data.homeVisit === "weekly"
        ? "WEEKLY"
        : data.homeVisit === "biweekly"
          ? "BIWEEKLY"
          : data.homeVisit === "monthly"
            ? "MONTHLY_OR_MORE"
            : "RARE",
    sleepStartTime: data.bedtime.start,
    sleepEndTime: data.bedtime.end,
    wakeUpStartTime: data.wakeTime.start,
    wakeUpEndTime: data.wakeTime.end,
    returnStartTime: data.returnTime.start,
    returnEndTime: data.returnTime.end,
    cleaningFrequencyScore: data.cleaningFreq,
    organizationSensitivityScore: data.tidySensitivity,
    temperatureSensitivityScore: data.tempSensitivity,
  };
}

const SLEEP_HABIT_MAP: Record<string, string> = {
  none: "NONE",
  moderate: "NORMAL",
  severe: "SEVERE",
};

const HOME_VISIT_MAP: Record<string, string> = {
  weekly: "WEEKLY",
  biweekly: "BIWEEKLY",
  monthly: "MONTHLY_OR_MORE",
  rarely: "RARE",
};

function toPreferenceRequest(data: PreferenceSurveyData): PreferenceSurveyRequest {
  return {
    smokingStatus:
      data.smoking === "smoker" ? "SMOKER" : data.smoking === "nonSmoker" ? "NON_SMOKER" : null,
    eatingInRoom:
      data.eating === "allowed" ? "ALLOWED" : data.eating === "notAllowed" ? "NOT_ALLOWED" : null,
    mbtiFirst: data.mbti.ei ?? "",
    mbtiSecond: data.mbti.sn ?? "",
    mbtiThird: data.mbti.tf ?? "",
    mbtiFourth: data.mbti.jp ?? "",
    showerTime:
      data.showerTime === "morning" ? "MORNING" : data.showerTime === "evening" ? "EVENING" : null,
    sleepHabits: data.sleepingHabits.map((h) => SLEEP_HABIT_MAP[h] ?? h.toUpperCase()),
    homeVisitFrequencies: data.homeVisit ? [HOME_VISIT_MAP[data.homeVisit] ?? data.homeVisit.toUpperCase()] : [],
    sleepStartTime: data.bedtime.start,
    sleepEndTime: data.bedtime.end,
    wakeUpStartTime: data.wakeTime.start,
    wakeUpEndTime: data.wakeTime.end,
    returnStartTime: data.returnTime.start,
    returnEndTime: data.returnTime.end,
    cleaningFrequencyScores: data.cleaningFreqs,
    organizationSensitivityScores: data.tidySensitivities,
    temperatureSensitivityScores: data.tempSensitivities,
  };
}

// 선호 룸메이트 설문 제출 (POST /api/surveys/preferred-roommate)
export async function submitPreferenceSurvey(data: PreferenceSurveyData): Promise<void> {
  await axiosInstance.post("/api/surveys/preferred-roommate", toPreferenceRequest(data));
}

// 선호 룸메이트 설문 수정 (PATCH /api/surveys/preferred-roommate)
export async function updatePreferenceSurvey(data: PreferenceSurveyData): Promise<void> {
  await axiosInstance.patch("/api/surveys/preferred-roommate", toPreferenceRequest(data));
}

// 선호 룸메이트 설문 내용 조회 후 폼 형식으로 변환 (GET /api/surveys/preferred-roommate)
export async function loadPreferenceSurvey(): Promise<Partial<PreferenceSurveyData>> {
  const { data } = await axiosInstance.get<PreferenceSurveyResponse>(
    "/api/surveys/preferred-roommate",
  );
  const hhmm = (t: string) => t?.slice(0, 5) ?? "00:00";
  const SLEEP_HABIT_REVERSE: Record<string, PreferenceSurveyData["sleepingHabits"][number]> = {
    NONE: "none",
    NORMAL: "moderate",
    SEVERE: "severe",
  };
  const HOME_VISIT_REVERSE: Record<string, NonNullable<PreferenceSurveyData["homeVisit"]>> = {
    WEEKLY: "weekly",
    BIWEEKLY: "biweekly",
    MONTHLY_OR_MORE: "monthly",
    RARE: "rarely",
  };
  return {
    smoking: data.smokingStatus === "SMOKER" ? "smoker" : "nonSmoker",
    eating: data.eatingInRoom === "ALLOWED" ? "allowed" : "notAllowed",
    mbti: {
      ei: (data.mbtiFirst as "E" | "I") || null,
      sn: (data.mbtiSecond as "S" | "N") || null,
      tf: (data.mbtiThird as "T" | "F") || null,
      jp: (data.mbtiFourth as "J" | "P") || null,
    },
    showerTime: data.showerTime === "MORNING" ? "morning" : data.showerTime === "EVENING" ? "evening" : null,
    sleepingHabits: data.sleepHabits
      .map((h) => SLEEP_HABIT_REVERSE[h])
      .filter((h): h is PreferenceSurveyData["sleepingHabits"][number] => !!h),
    homeVisit: data.homeVisitFrequencies.length > 0
      ? (HOME_VISIT_REVERSE[data.homeVisitFrequencies[0]] ?? null)
      : null,
    bedtime: { start: hhmm(data.sleepStartTime), end: hhmm(data.sleepEndTime) },
    wakeTime: { start: hhmm(data.wakeUpStartTime), end: hhmm(data.wakeUpEndTime) },
    returnTime: { start: hhmm(data.returnStartTime), end: hhmm(data.returnEndTime) },
    cleaningFreqs: data.cleaningFrequencyScores,
    tidySensitivities: data.organizationSensitivityScores,
    tempSensitivities: data.temperatureSensitivityScores,
  };
}

// 선호 룸메이트 설문 완료 여부 조회 (GET /api/surveys/preferred-roommate/status)
export async function getPreferenceSurveyStatus(): Promise<PreferenceSurveyStatusResponse> {
  const { data } = await axiosInstance.get<PreferenceSurveyStatusResponse>(
    "/api/surveys/preferred-roommate/status",
  );
  return data;
}

// 선호 룸메이트 설문 내용 조회 (GET /api/surveys/preferred-roommate)
export async function getPreferenceSurvey(): Promise<PreferenceSurveyResponse> {
  const { data } = await axiosInstance.get<PreferenceSurveyResponse>(
    "/api/surveys/preferred-roommate",
  );
  return data;
}

// 내 스타일 설문 조회 (GET /api/surveys/my-style)
export async function getMyStyleSurvey(): Promise<SurveyData> {
  const { data } = await axiosInstance.get<MyStyleSurveyGetResponse>("/api/surveys/my-style");
  const mbti = data.mbti ?? "";
  const hhmm = (t: string) => t?.slice(0, 5) ?? "00:00";
  return {
    dormitory: data.dormitoryType === "LAKE" ? "lake" : "nonLake",
    major: data.major,
    stayPeriod: data.residenceDuration === "FOUR_MONTH" ? "4months" : "6months",
    gender: data.gender === "MALE" ? "male" : "female",
    mbti: {
      ei: (mbti[0] as "E" | "I") ?? null,
      sn: (mbti[1] as "S" | "N") ?? null,
      tf: (mbti[2] as "T" | "F") ?? null,
      jp: (mbti[3] as "J" | "P") ?? null,
    },
    smoking: data.smokingStatus === "SMOKER" ? "smoker" : "nonSmoker",
    eating: data.eatingInRoom === "ALLOWED" ? "allowed" : "notAllowed",
    showerTime: data.showerTime === "MORNING" ? "morning" : "evening",
    sleepingHabit:
      data.sleepHabit === "SEVERE" ? "severe" : data.sleepHabit === "NORMAL" ? "moderate" : "none",
    homeVisit:
      data.homeVisitFrequency === "WEEKLY"
        ? "weekly"
        : data.homeVisitFrequency === "BIWEEKLY"
          ? "biweekly"
          : data.homeVisitFrequency === "MONTHLY_OR_MORE"
            ? "monthly"
            : "rarely",
    bedtime: { start: hhmm(data.sleepStartTime), end: hhmm(data.sleepEndTime) },
    wakeTime: { start: hhmm(data.wakeUpStartTime), end: hhmm(data.wakeUpEndTime) },
    returnTime: { start: hhmm(data.returnStartTime), end: hhmm(data.returnEndTime) },
    cleaningFreq: data.cleaningFrequencyScore,
    tidySensitivity: data.organizationSensitivityScore,
    tempSensitivity: data.temperatureSensitivityScore,
  };
}

// 내 스타일 설문 제출 (POST /api/surveys/my-style)
export async function submitMyStyleSurvey(data: SurveyData): Promise<MyStyleSurveyResponse> {
  const { data: res } = await axiosInstance.post<MyStyleSurveyResponse>(
    "/api/surveys/my-style",
    toMyStyleRequest(data),
  );
  return res;
}

// 내 스타일 설문 수정 (PATCH /api/surveys/my-style)
export async function updateMyStyleSurvey(data: SurveyData): Promise<void> {
  await axiosInstance.patch("/api/surveys/my-style", toMyStyleRequest(data));
}
