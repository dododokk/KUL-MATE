import { useNavigate, useSearchParams } from "react-router-dom";
import PreferenceSurveyForm, { type PreferenceSurveyData } from "../../features/survey/PreferenceSurveyForm";

// TODO: 추후 API 연동 시 실제 서버 데이터로 교체
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

  const handleSubmit = () => {
    // TODO: 추후 API 연동 시 isPreferenceSurveyCompleted 상태 업데이트
    navigate(isEditMode ? "/my" : "/home", { replace: true });
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
