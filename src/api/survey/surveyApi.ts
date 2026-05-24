import type { SurveyData } from "../../features/survey/SurveyForm";
import axiosInstance from "../axiosInstance";
import type { MyStyleSurveyRequest, MyStyleSurveyResponse } from "./type";

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

// 내 스타일 설문 제출 (POST /api/surveys/my-style)
export async function submitMyStyleSurvey(data: SurveyData): Promise<MyStyleSurveyResponse> {
  const { data: res } = await axiosInstance.post<MyStyleSurveyResponse>(
    "/api/surveys/my-style",
    toMyStyleRequest(data),
  );
  return res;
}
