import { useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { updateOnboarding } from "../../api/auth/authApi";
import {
  getMyStyleSurvey,
  submitMyStyleSurvey,
  updateMyStyleSurvey,
} from "../../api/survey/surveyApi";
import SurveyForm, { type SurveyData } from "../../features/survey/SurveyForm";

export default function SurveyPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get("mode") === "edit";

  const [initialData, setInitialData] = useState<
    Partial<SurveyData> | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(isEditMode);

  useEffect(() => {
    if (!isEditMode) return;
    getMyStyleSurvey()
      .then((data) => {
        setInitialData(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [isEditMode]);

  if (
    !isEditMode &&
    localStorage.getItem("kul_isOnboardingCompleted") === "true"
  ) {
    return <Navigate to="/home" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f9fafb]">
        <span className="text-sm text-[#9ca3af]">불러오는 중...</span>
      </div>
    );
  }

  const handleSubmit = async (data: SurveyData) => {
    if (isEditMode) {
      await updateMyStyleSurvey(data);
      navigate("/my", { replace: true });
    } else {
      await submitMyStyleSurvey(data);
      await updateOnboarding();
      localStorage.setItem("kul_isOnboardingCompleted", "true");
      navigate("/home", { replace: true });
    }
  };

  return (
    <SurveyForm
      mode={isEditMode ? "edit" : "create"}
      initialData={initialData}
      onSubmit={handleSubmit}
    />
  );
}
