import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PreferenceSurveyForm, { type PreferenceSurveyData } from "../../features/survey/PreferenceSurveyForm";
import { submitPreferenceSurvey } from "../../api/survey/surveyApi";

// TODO: 수정 모드 시 기존 데이터 로드 (getPreferenceSurvey API 연동 필요)
const MOCK_EXISTING_PREFERENCE: Partial<PreferenceSurveyData> = {
  mbti: { ei: "I", sn: null, tf: "T", jp: null },
  smoking: "nonSmoker",
  eating: "notAllowed",
  showerTime: "evening",
  sleepingHabits: ["none", "moderate"],
  homeVisit: "biweekly",
  bedtime: { start: "23:00", end: "01:00" },
  wakeTime: { start: "07:00", end: "08:00" },
  returnTime: { start: "18:00", end: "20:00" },
  cleaningFreqs: [3, 4],
  tidySensitivities: [3],
  tempSensitivities: [2, 3],
};

export default function PreferenceSurveyPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get("mode") === "edit";
  const showBanner = searchParams.get("source") === "recommend";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: PreferenceSurveyData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await submitPreferenceSurvey(data);
      navigate(isEditMode ? "/my" : "/home", { replace: true });
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <PreferenceSurveyForm
      mode={isEditMode ? "edit" : "create"}
      initialData={isEditMode ? MOCK_EXISTING_PREFERENCE : undefined}
      onSubmit={handleSubmit}
      showBanner={showBanner}
    />
  );
}
