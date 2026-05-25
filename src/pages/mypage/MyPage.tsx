import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBottomNav from "../../components/AppBottomNav";
import InfoTab from "../../features/mypage/InfoTab";
import MyPostList from "../../features/mypage/MyPostList";
import RoommateCancelModal from "../../features/mypage/RoommateCancelModal";
import SavedPostList from "../../features/mypage/SavedPostList";
import type { MyPageTab, MyPost, RoommateInfo, SavedPost, UserProfile } from "../../features/mypage/types";

// 방금 만든 실제 API 함수들을 가져옵니다. (경로는 프로젝트 구조에 맞게 살짝 조절해주세요)
import { getMyPageSummary, getMyPosts } from "../../api/mypage/mypageApi";
import { deletePost, togglePostVisibility, getBookmarkedPosts, addBookmark, removeBookmark } from "../../api/posts/postsApi";
import profileIcon from "../../assets/mypage/profile.svg";
import settingIcon from "../../assets/mypage/setting.svg";
import noticeIcon from "../../assets/mypage/notice.svg";

// 백엔드 대문자 approvalStatus 값에 맞추어 배너 데이터 매핑을 수정했습니다.
const STATUS_BANNER: Record<
  UserProfile["approvalStatus"],
  { bg: string; border: string; iconBg: string; titleColor: string; title: string; desc: string }
> = {
  PENDING: {
    bg: "bg-[#fffbeb]",
    border: "border-[rgba(253,230,138,0.5)]",
    iconBg: "bg-[#fef3c7]",
    titleColor: "text-[#d97706]",
    title: "기숙사 합격증 검토 중",
    desc: "승인 전까지 구인글 작성이 제한됩니다.",
  },
  APPROVED: {
    bg: "bg-[#f0fdf4]",
    border: "border-[rgba(167,243,208,0.5)]",
    iconBg: "bg-[#d1fae5]",
    titleColor: "text-[#059669]",
    title: "기숙사 합격증 승인 완료",
    desc: "모든 기능을 자유롭게 이용하실 수 있어요!",
  },
  REJECTED: {
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
  
  // --- 실제 데이터를 관리할 State들 ---
  const [user, setUser] = useState<UserProfile | null>(null);
  const [roommate, setRoommate] = useState<RoommateInfo | null>(null);
  const [posts, setPosts] = useState<MyPost[]>([]);
  const [saved, setSaved] = useState<SavedPost[]>([]);
  
  // --- 로딩 및 에러 처리 State ---
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // 컴포넌트가 마운트될 때 전체 데이터를 한 번에 가져옵니다.
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 세 개의 API를 동시에 병렬로 호출하여 속도를 최적화합니다.
        const [summaryData, postsData, savedData] = await Promise.all([
          getMyPageSummary(),
          getMyPosts(),
          getBookmarkedPosts(),
        ]);

        setUser(summaryData);
        setRoommate(summaryData.roommate); // 요약 API 내부에 룸메이트 정보가 들어있습니다.
        setPosts(postsData);
        setSaved(savedData);
      } catch (err) {
        console.error("마이페이지 데이터 조회 실패:", err);
        setError("마이페이지 정보를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // 토스트 타이머
  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }, [showToast]);

  // 가짜 룸메 관계 해지 함수 (실제 연결 시 해지 API 호출 필요)
  function handleConfirmCancel() {
    setRoommate(null);
    setShowCancelModal(false);
    setShowToast(true);
  }

  async function handleTogglePublic(id: number) {
    try {
      await togglePostVisibility(id);
      setPosts((prev) => prev.map((p) => (p.postId === id ? { ...p, visible: !p.visible } : p)));
    } catch {
      alert("공개 설정 변경에 실패했습니다. 다시 시도해주세요.");
    }
  }

  async function handleToggleBookmark(id: number) {
    const post = saved.find((s) => s.postId === id);
    if (!post) return;
    try {
      if (post.bookmarked) {
        await removeBookmark(id);
        setSaved((prev) => prev.filter((s) => s.postId !== id));
      } else {
        await addBookmark(id);
        setSaved((prev) => prev.map((s) => (s.postId === id ? { ...s, bookmarked: true } : s)));
      }
    } catch {
      alert("북마크 처리에 실패했습니다. 다시 시도해주세요.");
    }
  }

  // 1. 로딩 상태 뷰 (NFR-001 요구사항 반영)
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#7a9e82]"></div>
        <p className="mt-4 text-[14px] text-[#6b7280] font-medium">정보를 안전하게 불러오는 중...</p>
      </div>
    );
  }

  // 2. 에러 상태 뷰
  if (error || !user) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-4">
        <p className="text-red-500 font-bold text-[16px] text-center">{error || "유저 정보를 찾을 수 없습니다."}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-[#7a9e82] text-white rounded-[12px] font-bold text-[14px]"
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 데이터 로딩이 완료되면 아래 배너 매핑이 정상 작동합니다.
  const banner = STATUS_BANNER[user.approvalStatus];
  const HEADER_H = 326;

  // 설문조사 아이템 매핑 데이터
  const surveyItems = [
    { id: "lifestyle", label: "나의 생활 스타일 설문", completed: user.surveyStatus.myLifestyleCompleted },
    { id: "preference", label: "선호 룸메이트 성향", completed: user.surveyStatus.preferredRoommateCompleted },
  ];

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundImage: "linear-gradient(160deg, rgb(240, 250, 244) 0%, rgb(255, 255, 255) 50%)" }}
    >
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
            {user.profileImageUrl ? (
              <img src={user.profileImageUrl} alt="프로필" className="w-full h-full rounded-[14px] object-cover" />
            ) : (
              <img src={profileIcon} alt="" className="w-[30px] h-[30px]" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-black text-[#111827] text-[16px] leading-[24px]">{user.nickname}</span>
            <span className="font-normal text-[#6b7280] text-[14px] leading-[20px]">
              {user.department} · {user.grade}학년
            </span>
            <span className="font-normal text-[#9ca3af] text-[12px] leading-[16px] pt-[2px]">
              {user.dormitoryType} · {user.gender === "MALE" ? "남성" : "여성"}
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
            <span className="font-normal text-[#6b7280] text-[12px] leading-[16px] pt-[2px]">{user.approvalDescription || banner.desc}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-[4px] h-[42px] items-center p-[5px] rounded-[12px] border border-[rgba(122,158,130,0.1)] bg-[rgba(255,255,255,0.6)]">
          {[
            { key: "info" as const, label: "정보" },
            { key: "posts" as const, label: "내 글" },
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
            surveyItems={surveyItems}
            onCancelRoommate={() => setShowCancelModal(true)}
            onChatRoommate={() => navigate("/chat")}
            onCalendarRoommate={() => navigate("/calendar")}
            onSurveyClick={(id) => {
              if (id === "lifestyle") navigate("/survey?mode=edit");
              if (id === "preference") {
                const item = surveyItems.find((s) => s.id === id);
                navigate(item?.completed ? "/survey/preference?mode=edit" : "/survey/preference");
              }
            }}
          />
        )}
        {activeTab === "posts" && (
          <MyPostList
            posts={posts}
            onPress={(id) => navigate(`/post/detail?id=${id}`)}
            onTogglePublic={handleTogglePublic}
            onEdit={(id) => {
              const post = posts.find((p) => p.postId === id);
              navigate(`/post/create?id=${id}`, { state: { visible: post?.visible ?? true } });
            }}
            onDelete={async (id) => {
              if (!window.confirm("구인글을 삭제하시겠습니까?")) return;
              try {
                await deletePost(id);
                setPosts((prev) => prev.filter((p) => p.postId !== id));
              } catch {
                alert("삭제에 실패했습니다. 다시 시도해주세요.");
              }
            }}
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