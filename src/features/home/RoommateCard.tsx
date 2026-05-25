import { useState } from "react";
import { addBookmark, removeBookmark } from "../../api/posts/postsApi";
import type { PostSummary } from "../../api/posts/type";
import {
  recIconBookmarkActive,
  recIconBookmarkMuted,
  recIconClock,
  recIconLocation,
  recIconSunrise,
  recIconUser,
  recPill1,
  recPill2,
  recPill3,
  recPill4,
} from "../../assets/figma/home";

export const pillBgs = [recPill1, recPill2, recPill3, recPill4];

export function dormLabel(type: string): string {
  if (type === "LAKE") return "레이크홀";
  return type;
}

export type RoommatePost = {
  id: string;
  nickname: string;
  majorYear: string;
  dormLabel: string;
  title: string;
  sleepTime: string;
  wakeTime: string;
  score?: string;
  scoreTone?: "primary" | "mint";
  bookmarkIcon: string;
  tags: Array<{ label: string; bg: string }>;
  date: string;
};

export function apiPostToCard(p: PostSummary): RoommatePost {
  return {
    id: String(p.postId),
    nickname: p.authorNickname,
    majorYear: `${p.major} ${p.studentNumberLabel} ${String(p.birthYear).slice(-2)}년생`,
    dormLabel: dormLabel(p.dormitoryType),
    title: p.title,
    sleepTime: `${p.sleepStartTime.slice(0, 5)} - ${p.sleepEndTime.slice(0, 5)}`,
    wakeTime: `${p.wakeUpStartTime.slice(0, 5)} - ${p.wakeUpEndTime.slice(0, 5)}`,
    bookmarkIcon: p.bookmarked ? recIconBookmarkActive : recIconBookmarkMuted,
    tags: p.tags.map((tag, i) => ({ label: tag, bg: pillBgs[i % pillBgs.length] })),
    date: p.createdAt.slice(0, 10),
  };
}

function IconImg({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="block h-full w-full" draggable={false} />;
}

function TagPill({ label, bg }: { label: string; bg: string }) {
  return (
    <span className="relative flex h-[26px] items-center rounded-full border border-[rgba(122,158,130,0.1)] px-[11px] py-[5px] text-[12px] font-medium text-[#7a9e82]">
      <img
        alt=""
        src={bg}
        className="pointer-events-none absolute inset-0 h-full w-full rounded-full object-cover"
        draggable={false}
      />
      <span className="relative leading-[16px]">{label}</span>
    </span>
  );
}

function ScoreBadge({ score, tone }: { score: string; tone: RoommatePost["scoreTone"] }) {
  if (tone === "primary") {
    return (
      <span className="flex h-[30px] items-center rounded-[12px] border border-[rgba(122,158,130,0.2)] bg-gradient-to-t from-[#f3f7f4] to-[#ecfdf5] px-[11px] py-[7px] text-[12px] font-black leading-[16px] text-[#7a9e82]">
        {score}
      </span>
    );
  }
  return (
    <span className="flex h-[30px] items-center rounded-[12px] border border-[rgba(167,243,208,0.5)] bg-gradient-to-t from-[#ecfdf5] to-[#f0fdfa] px-[11px] py-[7px] text-[12px] font-black leading-[16px] text-[#059669]">
      {score}
    </span>
  );
}

export function RoommateCard({ post }: { post: RoommatePost }) {
  const [isBookmarked, setIsBookmarked] = useState(post.bookmarkIcon === recIconBookmarkActive);

  const handleBookmarkToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (isBookmarked) {
        await removeBookmark(Number(post.id));
      } else {
        await addBookmark(Number(post.id));
      }
      setIsBookmarked((prev) => !prev);
    } catch {
      // 실패 시 상태 유지
    }
  };

  return (
    <article className="w-full">
      <div className="w-full rounded-[16px] border border-[rgba(122,158,130,0.1)] bg-[rgba(255,255,255,0.7)] p-[17px] backdrop-blur-[2px]">
        {/* 작성자 행 */}
        <div className="flex items-center justify-between pb-[12px]">
          <div className="flex h-[40px] w-[148px] shrink-0 items-center gap-[10px]">
            <div
              className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border-2 border-[rgba(122,158,130,0.1)] p-[2px]"
              style={{ backgroundImage: "linear-gradient(135deg, rgb(226, 238, 228) 0%, rgb(209, 250, 229) 100%)" }}
            >
              <div className="h-[18px] w-[18.75px]">
                <IconImg src={recIconUser} alt="" />
              </div>
            </div>
            <div className="flex h-[36px] min-w-0 flex-col items-start justify-center">
              <div className="h-[20px] overflow-hidden text-[14px] font-bold leading-[20px] text-[#111827]">
                {post.nickname}
              </div>
              <div className="h-[16px] overflow-hidden whitespace-nowrap text-[12px] leading-[16px] text-[#9ca3af]">
                {post.majorYear}
              </div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-[8px]">
            {post.score && post.scoreTone ? (
              <ScoreBadge score={post.score} tone={post.scoreTone} />
            ) : null}
            <button
              type="button"
              className="flex h-[32px] w-[32px] items-center justify-center"
              aria-label="북마크"
              onClick={handleBookmarkToggle}
            >
              <div className="h-[18px] w-[18.75px]">
                <IconImg
                  src={isBookmarked ? recIconBookmarkActive : recIconBookmarkMuted}
                  alt="북마크"
                />
              </div>
            </button>
          </div>
        </div>

        {/* 생활관 */}
        <div className="flex items-center gap-[6px] pb-[8px]">
          <div className="flex h-[16px] w-[16px] shrink-0 items-center justify-center">
            <IconImg src={recIconLocation} alt="" />
          </div>
          <div className="text-[12px] leading-[16px] text-[#6b7280]">{post.dormLabel}</div>
        </div>

        {/* 제목 */}
        <div className="pb-[8px]">
          <h3 className="overflow-hidden text-[14px] font-semibold leading-[19.25px] text-[#111827]">
            {post.title}
          </h3>
        </div>

        {/* 취침/기상 시간 */}
        <div className="flex items-center gap-[12px] pb-[12px]">
          <div className="flex items-center gap-[4px]">
            <div className="flex h-[16px] w-[16px] shrink-0 items-center justify-center">
              <IconImg src={recIconClock} alt="" />
            </div>
            <div className="text-[12px] leading-[16px] text-[#6b7280]">{post.sleepTime}</div>
          </div>
          <div className="flex items-center gap-[4px]">
            <div className="flex h-[16px] w-[16px] shrink-0 items-center justify-center">
              <IconImg src={recIconSunrise} alt="" />
            </div>
            <div className="text-[12px] leading-[16px] text-[#6b7280]">{post.wakeTime}</div>
          </div>
        </div>

        {/* 태그 */}
        <div className="flex flex-wrap items-start gap-[6px]">
          {post.tags.map((t) => (
            <TagPill key={t.label} label={t.label} bg={t.bg} />
          ))}
        </div>

        {/* 날짜 */}
        <div className="pt-[12px] text-right text-[12px] leading-[16px] text-[#d1d5db]">
          {post.date}
        </div>
      </div>
    </article>
  );
}
