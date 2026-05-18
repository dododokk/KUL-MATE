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
import ChatListPage from "../pages/chat/ChatListPage";
import ChatDetailPage from "../pages/chat/ChatDetailPage";
import AlarmPage from "../pages/alarm/AlarmPage";
import CalendarPage from "../pages/calendar/CalendarPage";
import MyPage from "../pages/mypage/MyPage";
import AccountSettingsPage from "../pages/mypage/AccountSettingsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chat" element={<ChatListPage />} />
        <Route path="/chat/:id" element={<ChatDetailPage />} />
        <Route path="/post/detail" element={<PostDetailPage />} />
        <Route path="/post/create" element={<PostCreatePage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/alarm" element={<AlarmPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/my/settings" element={<AccountSettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
