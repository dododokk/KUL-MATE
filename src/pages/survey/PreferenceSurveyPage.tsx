import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loadPreferenceSurvey, submitPreferenceSurvey, updatePreferenceSurvey } from "../../api/survey/surveyApi";
import PreferenceSurveyForm, { type PreferenceSurveyData } from "../../features/survey/PreferenceSurveyForm";

export default function PreferenceSurveyPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get("mode") === "edit";
  const showBanner = searchParams.get("source") === "recommend";

  const [initialData, setInitialData] = useState<Partial<PreferenceSurveyData> | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditMode) return;
    loadPreferenceSurvey()
      .then((data) => {
        setInitialData(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [isEditMode]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f9fafb]">
        <span className="text-sm text-[#9ca3af]">불러오는 중...</span>
      </div>
    );
  }

  const handleSubmit = async (data: PreferenceSurveyData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updatePreferenceSurvey(data);
      } else {
        await submitPreferenceSurvey(data);
      }
      navigate(isEditMode ? "/my" : "/home", { replace: true });
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <PreferenceSurveyForm
      mode={isEditMode ? "edit" : "create"}
      initialData={initialData}
      onSubmit={handleSubmit}
      showBanner={showBanner}
    />
  );
}
