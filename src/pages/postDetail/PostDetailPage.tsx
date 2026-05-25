import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  getPost,
  deletePost,
  addBookmark,
  removeBookmark,
} from "../../api/posts/postsApi";
import type { PostDetail } from "../../api/posts/type";
import { getOrCreateChatRoom } from "../../api/chat/chatApi";
import {
  recIconBookmarkActive,
  recIconBookmarkMuted,
  recIconBack,
  recIconReport,
} from "../../assets/figma/home";
import editIcon from "../../assets/mypage/edit-mypost.svg";
import deleteIcon from "../../assets/mypage/delete-mypost.svg";
import ReportPage from "../report/ReportPage";

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
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [post, setPost] = useState<PostDetail | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const currentUserId = Number(localStorage.getItem("kul_userId"));

  useEffect(() => {
    const idParam = searchParams.get("id");
    if (!idParam) return;
    const postId = Number(idParam);
    if (Number.isNaN(postId)) return;
    getPost(postId)
      .then((data) => {
        setPost(data);
        setIsBookmarked(data.bookmarked); // 백엔드 응답에 맞게 수정 필요시 확인
      })
      .catch(() => setPost(null));
  }, [searchParams]);

  const handleBookmarkToggle = async () => {
    if (!post) return;
    try {
      if (isBookmarked) {
        await removeBookmark(post.postId);
      } else {
        await addBookmark(post.postId);
      }
      setIsBookmarked((prev) => !prev);
    } catch {
      alert("북마크 처리에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleDelete = async () => {
    if (!post) return;
    if (!window.confirm("구인글을 삭제하시겠습니까?")) return;
    setIsDeleting(true);
    try {
      await deletePost(post.postId);
      navigate("/home", { replace: true });
    } catch {
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsDeleting(false);
    }
  };

  const isMyPost = !!post && post.author.authorId === currentUserId;

  const lifestyle = post?.lifestyle;

  const infoCards = lifestyle
    ? [
        ["생활관", l(DORM_LABELS, lifestyle.dormitoryType)],
        ["MBTI", lifestyle.mbti],
        ["흡연", l(SMOKING_LABELS, lifestyle.smokingStatus)],
        ["샤워 시간", l(SHOWER_LABELS, lifestyle.showerTime)],
        ["잠버릇", l(SLEEP_HABIT_LABELS, lifestyle.sleepHabit)],
        ["본가 방문", l(HOME_VISIT_LABELS, lifestyle.homeVisitFrequency)],
        [
          "취침",
          `${lifestyle.sleepStartTime.slice(0, 5)} ~ ${lifestyle.sleepEndTime.slice(0, 5)}`,
        ],
        [
          "기상",
          `${lifestyle.wakeUpStartTime.slice(0, 5)} ~ ${lifestyle.wakeUpEndTime.slice(0, 5)}`,
        ],
      ]
    : [];

  return (
    <div className="min-h-screen bg-[#f8faf8] pb-28">
      <header className="sticky top-0 z-10 flex h-[109px] items-end justify-between border-b border-[#f3f4f6] bg-white px-4 pb-[17px]">
        <div className="flex w-[76px] items-center justify-start">
          <Link
            to="/home"
            className="flex h-9 w-9 items-center justify-center text-[#6b7280]"
          >
            <img
              src={recIconBack}
              alt="뒤로가기 아이콘"
              className="h-6 w-6 object-contain"
            />
          </Link>
        </div>

        <h1 className="flex h-9 items-center text-[14px] font-bold text-[#111827]">
          구인글 상세
        </h1>

        <div className="flex w-[76px] items-center justify-end gap-1 text-[#9ca3af]">
          {isMyPost ? (
            <>
              <Link
                to={`/post/create?id=${post.postId}`}
                className="flex h-9 w-9 items-center justify-center"
                aria-label="수정"
              >
                <img src={editIcon} alt="수정" className="h-4 w-4 object-contain" />
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex h-9 w-9 items-center justify-center disabled:opacity-50"
                aria-label="삭제"
              >
                <img src={deleteIcon} alt="삭제" className="h-4 w-4 object-contain" />
              </button>
            </>
          ) : (
            <>
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
                aria-label="신고하기"
              >
                <img src={recIconReport} alt="신고하기 아이콘" className="h-6 w-6 object-contain" />
              </button>
            </>
          )}
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
          {!isMyPost && (
            <button
              type="button"
              disabled={isChatLoading || !post}
              onClick={async () => {
                if (!post) return;
                setIsChatLoading(true);
                try {
                  const room = await getOrCreateChatRoom(post.postId);
                  navigate(`/chat/${room.roomId}`, {
                    state: {
                      opponentNickname: room.opponentNickname,
                      matchScore: room.matchScore,
                      dormitoryType: room.dormitoryType,
                    },
                  });
                } catch {
                  alert("채팅방을 열 수 없습니다. 다시 시도해주세요.");
                } finally {
                  setIsChatLoading(false);
                }
              }}
              className="h-12 flex-1 rounded-[12px] bg-[rgba(122,158,130,0.1)] text-[14px] font-bold text-[#7a9e82] disabled:opacity-50"
            >
              {isChatLoading ? "연결 중..." : "채팅하기"}
            </button>
          )}
          <button className="h-12 flex-1 rounded-[12px] bg-[#7a9e82] text-[14px] font-bold text-white">
            룸메이트 신청
          </button>
        </div>
      </footer>

      {showReportModal && post && (
        <ReportPage
          targetType="POST"
          targetId={post.postId}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </div>
  );
}
