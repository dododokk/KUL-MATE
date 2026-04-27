import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import OnboardingPage from "../pages/onboarding/OnboardingPage";
import SignUpPage from "../pages/signUp/SignUpPage";
import SplashPage from "../pages/splash/SplashPage";
import SurveyPage from "../pages/survey/SurveyPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
