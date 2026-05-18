import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBottomNav from "../../components/AppBottomNav";
import InfoTab from "../../features/mypage/InfoTab";
import MyPostList from "../../features/mypage/MyPostList";
import RoommateCancelModal from "../../features/mypage/RoommateCancelModal";
import SavedPostList from "../../features/mypage/SavedPostList";
import type { MyPageTab, MyPost, RoommateInfo, SavedPost, UserProfile } from "../../features/mypage/types";
import profileIcon from "../../assets/mypage/profile.svg";
import settingIcon from "../../assets/mypage/setting.svg";
import noticeIcon from "../../assets/mypage/notice.svg";

const MOCK_USER: UserProfile = {
  nickname: "초록고양이",
  department: "컴퓨터공학과",
  year: "2학년",
  dorm: "레이크홀",
  gender: "남성",
  dormStatus: "pending",
};

const MOCK_ROOMMATE: RoommateInfo = {
  nickname: "코딩고수민준",
  department: "컴퓨터공학과",
  year: "2학년",
  dorm: "레이크홀",
  matchDate: "2026-03-18",
  score: 92,
};

const MOCK_POSTS: MyPost[] = [
  {
    id: "1",
    title: "조용하고 깔끔한 룸메이트 구해요!",
    dorm: "레이크홀",
    date: "2026-03-20",
    isPublic: true,
  },
];

const MOCK_SAVED: SavedPost[] = [
  {
    id: "1",
    authorNickname: "코딩고수민준",
    authorDepartment: "컴퓨터공학과",
    title: "조용하고 깔끔한 룸메이트 구해요!",
    dorm: "레이크홀",
    date: "2026-03-20",
    tags: ["일찍 취침", "청결", "흡연 안함"],
    isBookmarked: true,
  },
  {
    id: "2",
    authorNickname: "화학유나4학년",
    authorDepartment: "화학과",
    title: "4학년, 조용하게 마지막 학기 보낼 룸메이트",
    dorm: "비레이크홀",
    date: "2026-03-18",
    tags: ["늦은 취침", "독립적", "4학년"],
    isBookmarked: true,
  },
];

const SURVEY_ITEMS = [
  { id: "lifestyle", label: "나의 생활 스타일 설문", completed: true },
  { id: "preference", label: "선호 룸메이트 성향", completed: false },
];

const STATUS_BANNER: Record<
  UserProfile["dormStatus"],
  { bg: string; border: string; iconBg: string; titleColor: string; title: string; desc: string }
> = {
  pending: {
    bg: "bg-[#fffbeb]",
    border: "border-[rgba(253,230,138,0.5)]",
    iconBg: "bg-[#fef3c7]",
    titleColor: "text-[#d97706]",
    title: "기숙사 합격증 검토 중",
    desc: "승인 전까지 구인글 작성이 제한됩니다.",
  },
  approved: {
    bg: "bg-[#f0fdf4]",
    border: "border-[rgba(167,243,208,0.5)]",
    iconBg: "bg-[#d1fae5]",
    titleColor: "text-[#059669]",
    title: "기숙사 합격증 승인 완료",
    desc: "모든 기능을 자유롭게 이용하실 수 있어요!",
  },
  rejected: {
    bg: "bg-[#fef2f2]",
    border: "border-[rgba(254,202,202,0.5)]",
    iconBg: "bg-[#fee2e2]",
    titleColor: "text-[#f87171]",
    title: "기숙사 합격증 검토 거절",
    desc: "합격증을 다시 제출해 주세요.",
  },
};

export default function MyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<MyPageTab>("info");
  const [roommate, setRoommate] = useState<RoommateInfo | null>(MOCK_ROOMMATE);
  const [posts, setPosts] = useState<MyPost[]>(MOCK_POSTS);
  const [saved, setSaved] = useState<SavedPost[]>(MOCK_SAVED);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const banner = STATUS_BANNER[MOCK_USER.dormStatus];

  function handleConfirmCancel() {
    setRoommate(null);
    setShowCancelModal(false);
    setShowToast(true);
  }

  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }, [showToast]);

  function handleTogglePublic(id: string) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, isPublic: !p.isPublic } : p)));
  }

  function handleToggleBookmark(id: string) {
    setSaved((prev) => prev.map((s) => (s.id === id ? { ...s, isBookmarked: !s.isBookmarked } : s)));
  }

  const HEADER_H = 326;

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundImage: "linear-gradient(160deg, rgb(240, 250, 244) 0%, rgb(255, 255, 255) 50%)" }}
    >
      {/* Header spacer */}
      <div style={{ height: HEADER_H }} />

      {/* Fixed header */}
      <div
        className="fixed top-0 left-0 w-full z-20 pt-[56px] pb-[20px] px-[20px]"
        style={{ backgroundImage: "linear-gradient(160deg, rgb(232, 245, 238) 0%, rgb(255, 255, 255) 100%)" }}
      >
        {/* Title row */}
        <div className="flex items-center justify-between h-[32px] mb-[20px]">
          <h1 className="font-bold text-[#111827] text-[16px] leading-[24px]">마이페이지</h1>
          <button
            type="button"
            onClick={() => navigate("/my/settings")}
            className="flex items-center justify-center size-[32px]"
            aria-label="설정"
          >
            <img src={settingIcon} alt="" className="w-[20px] h-[20px]" />
          </button>
        </div>

        {/* Profile row */}
        <div className="flex items-center gap-[16px] mb-[16px]">
          <div
            className="flex items-center justify-center rounded-[16px] border-2 border-[rgba(122,158,130,0.15)] p-[2px] shrink-0 size-[64px]"
            style={{ backgroundImage: "linear-gradient(135deg, rgba(122,158,130,0.2) 0%, rgb(209,250,229) 100%)" }}
          >
            <img src={profileIcon} alt="" className="w-[30px] h-[30px]" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-[#111827] text-[16px] leading-[24px]">{MOCK_USER.nickname}</span>
            <span className="font-normal text-[#6b7280] text-[14px] leading-[20px]">
              {MOCK_USER.department} {MOCK_USER.year}
            </span>
            <span className="font-normal text-[#9ca3af] text-[12px] leading-[16px] pt-[2px]">
              {MOCK_USER.dorm} · {MOCK_USER.gender}
            </span>
          </div>
        </div>

        {/* Status banner */}
        <div
          className={`flex items-center gap-[12px] h-[60px] p-[13px] rounded-[12px] border mb-[16px] ${banner.bg} ${banner.border}`}
        >
          <div className={`flex items-center justify-center rounded-[8px] shrink-0 size-[32px] ${banner.iconBg}`}>
            <img src={noticeIcon} alt="" className="w-[16px] h-[16px]" />
          </div>
          <div className="flex flex-col">
            <span className={`font-bold text-[12px] leading-[16px] ${banner.titleColor}`}>{banner.title}</span>
            <span className="font-normal text-[#6b7280] text-[12px] leading-[16px] pt-[2px]">{banner.desc}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-[4px] h-[42px] items-center p-[5px] rounded-[12px] border border-[rgba(122,158,130,0.1)] bg-[rgba(255,255,255,0.6)]">
          {[
            { key: "info" as const, label: "정보" },
            { key: "posts" as const, label: `내 글 (${posts.length})` },
            { key: "saved" as const, label: `저장 (${saved.length})` },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 h-[32px] flex items-center justify-center rounded-[8px] transition-colors ${
                activeTab === tab.key ? "bg-[#7a9e82]" : ""
              }`}
            >
              <span
                className={`font-bold text-[12px] leading-[16px] ${
                  activeTab === tab.key ? "text-white" : "text-[#9ca3af]"
                }`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-[20px] pt-[16px] pb-[100px]">
        {activeTab === "info" && (
          <InfoTab
            roommate={roommate}
            surveyItems={SURVEY_ITEMS}
            onCancelRoommate={() => setShowCancelModal(true)}
            onChatRoommate={() => navigate("/chat")}
            onCalendarRoommate={() => navigate("/calendar")}
          />
        )}
        {activeTab === "posts" && (
          <MyPostList
            posts={posts}
            onTogglePublic={handleTogglePublic}
            onEdit={(id) => navigate(`/post/detail?id=${id}`)}
            onDelete={(id) => setPosts((prev) => prev.filter((p) => p.id !== id))}
          />
        )}
        {activeTab === "saved" && (
          <SavedPostList posts={saved} onToggleBookmark={handleToggleBookmark} />
        )}
      </div>

      <AppBottomNav />

      <RoommateCancelModal
        open={showCancelModal}
        roommateName={roommate?.nickname ?? ""}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
      />

      {/* Toast */}
      {showToast && (
        <div className="fixed top-[16px] left-1/2 -translate-x-1/2 z-50 flex items-center gap-[10px] bg-[#1f2937] rounded-[16px] px-[16px] py-[12px] shadow-lg w-[calc(100%-32px)] max-w-[384px]">
          <img src={noticeIcon} alt="" className="w-[16px] h-[16px] shrink-0" style={{ filter: "brightness(0) invert(1)" }} />
          <span className="font-medium text-white text-[14px] leading-[20px]">룸메이트 관계가 해지되었어요</span>
        </div>
      )}
    </div>
  );
}
