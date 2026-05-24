import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import SurveyForm, { type SurveyData } from "../../features/survey/SurveyForm";

// TODO: 추후 API 연동 시 실제 서버 데이터로 교체
const MOCK_EXISTING_SURVEY: Partial<SurveyData> = {
  gender: "female",
  major: "컴퓨터공학부",
  stayPeriod: "4months",
  dormitory: "lake",
  mbti: { ei: "E", sn: "S", tf: "T", jp: "J" },
  smoking: "nonSmoker",
  eating: "notAllowed",
  showerTime: "morning",
  sleepingHabit: "none",
  homeVisit: "biweekly",
  bedtime: { start: "23:00", end: "01:00" },
  wakeTime: { start: "07:00", end: "08:00" },
  returnTime: { start: "18:00", end: "20:00" },
  cleaningFreq: 4,
  tidySensitivity: 3,
  tempSensitivity: 2,
};

export default function SurveyPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get("mode") === "edit";

  if (!isEditMode && localStorage.getItem("kul_isOnboardingCompleted") === "true") {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = () => {
    if (!isEditMode) {
      localStorage.setItem("kul_isOnboardingCompleted", "true");
      navigate("/home", { replace: true });
    } else {
      navigate("/my", { replace: true });
    }
  };

  return (
    <SurveyForm
      mode={isEditMode ? "edit" : "create"}
      initialData={isEditMode ? MOCK_EXISTING_SURVEY : undefined}
      onSubmit={handleSubmit}
    />
  );
}
