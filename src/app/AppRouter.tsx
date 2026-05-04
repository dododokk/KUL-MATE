import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import OnboardingPage from "../pages/onboarding/OnboardingPage";
import PostCreatePage from "../pages/postCreate/PostCreatePage";
import PostDetailPage from "../pages/postDetail/PostDetailPage";
import ReportPage from "../pages/report/ReportPage";
import SignUpPage from "../pages/signUp/SignUpPage";
import SplashPage from "../pages/splash/SplashPage";
import SurveyPage from "../pages/survey/SurveyPage";
import AdminPage from "../pages/admin/AdminPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/post/detail" element={<PostDetailPage />} />
        <Route path="/post/create" element={<PostCreatePage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
