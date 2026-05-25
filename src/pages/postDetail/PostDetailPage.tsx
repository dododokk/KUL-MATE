import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getPost } from "../../api/posts/postsApi";
import type { PostDetail } from "../../api/posts/type";
import {
  recIconBookmarkActive,
  recIconBookmarkMuted,
  recIconBack,
  recIconReport,
} from "../../assets/figma/home";

// 컴포넌트 및 API 임포트
import ReportPage from "../report/ReportPage"; 
import RoommateRequestModal from "../../features/chat/RoommateRequestModal";
import { applyRoommate } from "../../api/request/requestApi";

const DORM_LABELS: Record<string, string> = { LAKE: "레이크홀" };
const SMOKING_LABELS: Record<string, string> = {
  SMOKER: "흡연",
  NON_SMOKER: "비흡연",
};
const SHOWER_LABELS: Record<string, string> = {
  MORNING: "아침",
  EVENING: "저녁",
  NIGHT: "밤",
};
const SLEEP_HABIT_LABELS: Record<string, string> = {
  NONE: "없음",
  SNORING: "코골이",
  GRINDING: "이갈이",
  TALKING: "잠꼬대",
};
const HOME_VISIT_LABELS: Record<string, string> = {
  WEEKLY: "매주",
  BIWEEKLY: "2주마다",
  MONTHLY: "한달마다",
  RARELY: "거의 안감",
};
const CLEANING_FREQ_LABELS = ["", "거의 안함", "가끔", "보통", "자주", "매일"];
const SENSITIVITY_LABELS = [
  "",
  "매우 약함",
  "약함",
  "보통",
  "강함",
  "매우 강함",
];

function l(map: Record<string, string>, key: string): string {
  return map[key] ?? key;
}

function SensitivityDots({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-[4px]">
      {[1, 2, 3, 4, 5].map((level) => (
        <div
          key={level}
          className={`h-[8px] w-[8px] rounded-full ${
            level <= score ? "bg-[#7a9e82]" : "bg-[#e5e7eb]"
          }`}
        />
      ))}
    </div>
  );
}

export default function PostDetailPage() {
  const [searchParams] = useSearchParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [post, setPost] = useState<PostDetail | null>(null);

  const [showReportModal, setShowReportModal] = useState(false);
  // 🌟 룸메이트 신청 모달 상태 관리
  const [requestModal, setRequestModal] = useState<"none" | "confirm" | "success">("none");

  useEffect(() => {
    const idParam = searchParams.get("id");
    if (!idParam) return;
    const postId = Number(idParam);
    if (Number.isNaN(postId)) return;
    getPost(postId)
      .then((data) => {
        setPost(data);
        setIsBookmarked(data.bookmarked);
      })
      .catch(() => setPost(null));
  }, [searchParams]);

  const handleBookmarkToggle = () => {
    setIsBookmarked((prev) => !prev);
  };

  // 🌟 룸메이트 신청 API 호출 함수
  const handleApplyRoommate = async () => {
    if (!post) return;
    try {
      await applyRoommate(post.postId);
      setRequestModal("success");
    } catch (err: any) {
      console.error("신청 실패:", err);
      alert(err.response?.data?.message || "룸메이트 신청 중 오류가 발생했습니다.");
      setRequestModal("none");
    }
  };

  const lifestyle = post?.lifestyle;

  const infoCards = lifestyle
    ? [
        ["생활관", l(DORM_LABELS, lifestyle.dormitoryType)],
        ["MBTI", lifestyle.mbti],
        ["흡연", l(SMOKING_LABELS, lifestyle.smokingStatus)],
        ["샤워 시간", l(SHOWER_LABELS, lifestyle.showerTime)],
        ["잠버릇", l(SLEEP_HABIT_LABELS, lifestyle.sleepHabit)],
        ["본가 방문", l(HOME_VISIT_LABELS, lifestyle.homeVisitFrequency)],
        ["취침", `${lifestyle.sleepStartTime} ~ ${lifestyle.sleepEndTime}`],
        ["기상", `${lifestyle.wakeUpStartTime} ~ ${lifestyle.wakeUpEndTime}`],
      ]
    : [];

  return (
    <div className="min-h-screen bg-[#f8faf8] pb-28 relative">
      <header className="sticky top-0 z-10 flex h-[109px] items-end justify-between border-b border-[#f3f4f6] bg-white px-4 pb-[17px]">
        <Link
          to="/home"
          className="h-9 w-9 text-center leading-9 text-[#6b7280]"
        >
          <img
            src={recIconBack}
            alt="뒤로가기 아이콘"
            className="h-6 w-6 object-contain"
          />
        </Link>
        <h1 className="text-[14px] font-bold text-[#111827]">구인글 상세</h1>

        <div className="flex w-[76px] items-center justify-end gap-1 text-[#9ca3af]">
          <button
            type="button"
            onClick={handleBookmarkToggle}
            className="flex h-9 w-9 items-center justify-center"
            aria-label="북마크"
          >
            <img
              src={isBookmarked ? recIconBookmarkActive : recIconBookmarkMuted}
              alt="북마크"
              className="block h-[20px] w-[20px]"
              draggable={false}
            />
          </button>
          
          <button
            type="button"
            onClick={() => setShowReportModal(true)}
            className="flex h-9 w-9 items-center justify-center"
          >
            <img
              src={recIconReport}
              alt="신고하기 아이콘"
              className="h-6 w-6 object-contain"
            />
          </button>
        </div>
      </header>

      <main className="space-y-3 px-5 py-4">
        {/* 작성자 프로필 */}
        <section className="rounded-[16px] border border-[#f3f4f6] bg-white p-[21px]">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-[rgba(122,158,130,0.1)] text-2xl">
              👤
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[16px] font-black text-[#111827]">
                  {post?.author?.nickname ?? "-"}
                </p>
                {post?.author?.gender && (
                  <span className="rounded-full bg-[#eff6ff] px-2 py-[2px] text-[12px] font-semibold text-[#60a5fa]">
                    {post.author.gender === "MALE" ? "남" : "여"}
                  </span>
                )}
              </div>
              <p className="text-[14px] text-[#6b7280]">
                {post
                  ? `${post.author.major} ${post.author.studentNumberLabel}`
                  : ""}
              </p>
              <p className="pt-[2px] text-[12px] text-[#9ca3af]">
                {post ? l(DORM_LABELS, post.author.dormitoryType) : ""}
              </p>
            </div>
            {post && post.matchScore > 0 && (
              <div className="rounded-[12px] bg-[rgba(122,158,130,0.1)] px-3 py-1.5 text-center">
                <p className="text-[14px] font-black text-[#7a9e82]">
                  {post.matchScore}점
                </p>
                <p className="text-[12px] text-[#7a9e82]/70">일치율</p>
              </div>
            )}
          </div>
        </section>

        {/* 글 내용 */}
        <section className="rounded-[16px] border border-[#f3f4f6] bg-white p-[21px]">
          <h2 className="text-[16px] font-bold text-[#111827]">
            {post?.title ?? "-"}
          </h2>
          <p className="mt-2 text-[14px] leading-[22.75px] text-[#4b5563] whitespace-pre-wrap">
            {post?.content ?? ""}
          </p>
          {post && post.tags?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-[6px]">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[rgba(122,158,130,0.1)] px-[10px] py-1 text-[12px] font-medium text-[#7a9e82]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* 성향 정보 */}
        <section className="rounded-[16px] border border-[#f3f4f6] bg-white p-[21px]">
          <h3 className="text-[14px] font-bold text-[#1f2937]">성향 정보</h3>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {infoCards.map(([k, v]) => (
              <div key={k} className="rounded-[12px] bg-[#f9fafb] p-3">
                <p className="text-[12px] text-[#9ca3af]">{k}</p>
                <p className="text-[14px] font-semibold text-[#1f2937]">{v}</p>
              </div>
            ))}
          </div>
          {lifestyle && (
            <div className="mt-5 space-y-3 text-[12px] text-[#6b7280]">
              <div className="flex items-center justify-between">
                <span className="w-20 whitespace-nowrap">청소 빈도</span>
                <SensitivityDots score={lifestyle.cleaningFrequencyScore} />
                <span className="w-14 whitespace-nowrap text-right font-medium text-[#4b5563]">
                  {CLEANING_FREQ_LABELS[lifestyle.cleaningFrequencyScore] ?? ""}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="w-20 whitespace-nowrap">정돈 민감도</span>
                <SensitivityDots
                  score={lifestyle.organizationSensitivityScore}
                />
                <span className="w-14 whitespace-nowrap text-right font-medium text-[#4b5563]">
                  {SENSITIVITY_LABELS[lifestyle.organizationSensitivityScore] ??
                    ""}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="w-20 whitespace-nowrap">온도 민감도</span>
                <SensitivityDots
                  score={lifestyle.temperatureSensitivityScore}
                />
                <span className="w-14 whitespace-nowrap text-right font-medium text-[#4b5563]">
                  {SENSITIVITY_LABELS[lifestyle.temperatureSensitivityScore] ??
                    ""}
                </span>
              </div>
            </div>
          )}
        </section>

        <p className="px-1 text-right text-[12px] text-[#9ca3af]">
          {post ? `${post.createdAt?.slice(0, 10)} 작성` : ""}
        </p>
      </main>

      <footer className="fixed bottom-0 left-0 w-full border-t border-[#f3f4f6] bg-white px-5 pb-8 pt-[13px]">
        <div className="flex gap-3">
          <button className="h-12 flex-1 rounded-[12px] bg-[rgba(122,158,130,0.1)] text-[14px] font-bold text-[#7a9e82]">
            채팅하기
          </button>
          {/* 🌟 버튼 클릭 시 신청 확인 모달을 띄웁니다 */}
          <button 
            type="button"
            onClick={() => setRequestModal("confirm")}
            className="h-12 flex-1 rounded-[12px] bg-[#7a9e82] text-[14px] font-bold text-white"
          >
            룸메이트 신청
          </button>
        </div>
      </footer>

      {/* 신고 모달 */}
      {showReportModal && (
        <ReportPage
          targetType="POST"
          targetId={Number(searchParams.get("id"))}
          onClose={() => setShowReportModal(false)}
        />
      )}

      {/* 🌟 룸메이트 신청 확인/완료 모달 */}
      {requestModal !== "none" && post && (
        <RoommateRequestModal
          userName={post.author.nickname}
          mode={requestModal}
          onConfirm={handleApplyRoommate}
          onClose={() => setRequestModal("none")}
        />
      )}
    </div>
  );
}