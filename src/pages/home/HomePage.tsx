import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  pill5,
  recIconBell,
  recIconBookmarkActive,
  recIconBookmarkMuted,
  recIconClock,
  recIconFilter,
  recIconList,
  recIconLocation,
  recIconSearch,
  recIconSound,
  recIconSparkle,
  recIconSunrise,
  recIconUser,
  recPill1,
  recPill2,
  recPill3,
  recPill4,
} from "../../assets/figma/home";
import AppBottomNav from "../../features/layout/AppBottomNav";
import MatchingAlgorithmModal from "../../features/home/MatchingAlgorithmModal";
import SearchFilterSheet from "../../features/home/SearchFilterSheet";
type RoommatePost = {
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

function IconImg({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="block h-full w-full" draggable={false} />;
}

function TagPill({ label, bg }: { label: string; bg: string }) {
  return (
    <span className="relative flex h-[26px] items-center rounded-full border border-[rgba(122,158,130,0.1)] px-[11px] py-[5px] text-[12px] font-medium text-[#7a9e82]">
      <img alt="" src={bg} className="pointer-events-none absolute inset-0 h-full w-full rounded-full object-cover" draggable={false} />
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

function RoommateCard({ post }: { post: RoommatePost }) {
  return (
    <article className="w-full">
      <div className="w-full rounded-[16px] border border-[rgba(122,158,130,0.1)] bg-[rgba(255,255,255,0.7)] p-[17px] backdrop-blur-[2px]">
        <div className="flex items-start justify-between pb-[12px]">
          <div className="flex w-[148px] items-center gap-[10px]">
            <div
              className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-[rgba(122,158,130,0.1)] p-[2px]"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgb(226, 238, 228) 0%, rgb(209, 250, 229) 100%)",
              }}
            >
              <div className="h-[18px] w-[18.75px]">
                <IconImg src={recIconUser} alt="" />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-[14px] font-bold leading-[20px] text-[#111827]">{post.nickname}</div>
              <div className="text-[12px] leading-[16px] text-[#9ca3af]">{post.majorYear}</div>
            </div>
          </div>

          <div className="flex items-center gap-[8px]">
            {post.score && post.scoreTone ? (
              <ScoreBadge score={post.score} tone={post.scoreTone} />
            ) : null}
            <button type="button" className="flex h-[32px] w-[32px] items-center justify-center" aria-label="북마크">
              <div className="h-[18px] w-[18.75px]">
                <IconImg src={post.bookmarkIcon} alt="" />
              </div>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-[6px] pb-[8px]">
          <div className="h-[14px] w-[14.578px]">
            <IconImg src={recIconLocation} alt="" />
          </div>
          <div className="text-[12px] leading-[16px] text-[#6b7280]">{post.dormLabel}</div>
        </div>

        <div className="pb-[8px]">
          <h3 className="overflow-hidden text-[14px] font-semibold leading-[19.25px] text-[#111827]">{post.title}</h3>
        </div>

        <div className="flex items-center gap-[12px] pb-[12px]">
          <div className="flex items-center gap-[4px]">
            <div className="h-[12px] w-[12.5px]">
              <IconImg src={recIconClock} alt="" />
            </div>
            <div className="text-[12px] leading-[16px] text-[#6b7280]">{post.sleepTime}</div>
          </div>
          <div className="flex items-center gap-[4px]">
            <div className="h-[12px] w-[12.5px]">
              <IconImg src={recIconSunrise} alt="" />
            </div>
            <div className="text-[12px] leading-[16px] text-[#6b7280]">{post.wakeTime}</div>
          </div>
          <div className="flex items-center gap-[4px]">
            <div className="h-[12px] w-[12.5px]">
              <IconImg src={recIconSound} alt="" />
            </div>
            <span className="h-px w-px" aria-hidden />
          </div>
        </div>

        <div className="flex flex-wrap items-start gap-[6px]">
          {post.tags.map((t) => (
            <TagPill key={t.label} label={t.label} bg={t.bg} />
          ))}
        </div>

        <div className="pt-[12px] text-right text-[12px] leading-[16px] text-[#d1d5db]">{post.date}</div>
      </div>
    </article>
  );
}

export default function HomePage() {
  const [isAlgorithmOpen, setIsAlgorithmOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "recommended">("recommended");

  const allPosts: RoommatePost[] = [
    {
      id: "1",
      nickname: "코딩고수민준",
      majorYear: "컴퓨터공학과 2학년",
      dormLabel: "레이크홀 · \u200b",
      title: "조용하고 깔끔한 룸메이트 구해요!",
      sleepTime: "23:00 - 24:00",
      wakeTime: "07:00 - 08:00",
      bookmarkIcon: recIconBookmarkActive,
      tags: [
        { label: "일찍 취침", bg: recPill1 },
        { label: "청결", bg: recPill2 },
        { label: "흡연 안함", bg: recPill1 },
      ],
      date: "2026-03-20",
    },
    {
      id: "2",
      nickname: "새내기전전지호",
      majorYear: "전기전자공학과 1학년",
      dormLabel: "레이크홀 · \u200b",
      title: "신입생! 같이 기숙사 생활 잘 해봐요",
      sleepTime: "22:00 - 23:00",
      wakeTime: "06:30 - 07:30",
      bookmarkIcon: recIconBookmarkMuted,
      tags: [
        { label: "11시 취침", bg: recPill3 },
        { label: "청결 중시", bg: recPill1 },
        { label: "신입생", bg: recPill4 },
      ],
      date: "2026-03-21",
    },
    {
      id: "3",
      nickname: "건축하는도현",
      majorYear: "건축학과 2학년",
      dormLabel: "레이크홀 · \u200b",
      title: "건축과 2학년 - 작업 많지만 배려할게요!",
      sleepTime: "02:00 - 03:00",
      wakeTime: "08:00 - 09:00",
      bookmarkIcon: recIconBookmarkMuted,
      tags: [
        { label: "야작", bg: recPill2 },
        { label: "이어폰 착용", bg: pill5 },
        { label: "배려", bg: recPill2 },
      ],
      date: "2026-03-17",
    },
  ];

  const recommendedPosts = useMemo(
    () =>
      allPosts
        .slice(0, 2)
        .map((post, idx) => ({
          ...post,
          score: idx === 0 ? "92점" : "78점",
          scoreTone: idx === 0 ? ("primary" as const) : ("mint" as const),
        })),
    [allPosts],
  );

  const posts = activeTab === "recommended" ? recommendedPosts : allPosts;

  return (
    <div className="min-h-screen w-full bg-white">
      <div
        className="relative w-full pb-[96px]"
        style={{
          backgroundImage:
            "linear-gradient(159.99340733041024deg, rgb(240, 250, 244) 0%, rgb(255, 255, 255) 50%)",
        }}
      >
        <div className="h-[225px] w-full shrink-0" />

        <header className="absolute left-0 top-0 flex h-[225px] w-full flex-col items-start border-b border-[rgba(122,158,130,0.1)] bg-[rgba(255,255,255,0.92)] px-[20px] pb-[17px] pt-[56px] backdrop-blur-[6px]">
          <div className="flex w-full items-start pb-[16px]">
            <div className="flex h-[36px] w-full items-center justify-between">
              <div className="flex h-[28px] items-center gap-[8px]">
                <div
                  className="flex h-[28px] w-[28px] items-center justify-center rounded-[8px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgb(122, 158, 130) 0%, rgb(5, 150, 105) 100%)",
                  }}
                >
                  <span className="text-[12px] font-black leading-[16px] text-white">KM</span>
                </div>
                <div className="text-[18px] font-black leading-[28px] tracking-[-0.45px] text-[#7a9e82]">KUL:MATE</div>
              </div>
              <button type="button" className="relative flex h-[36px] w-[36px] items-center justify-center" aria-label="알림">
                <div className="h-[20px] w-[20.828px]">
                  <IconImg src={recIconBell} alt="" />
                </div>
                <span className="absolute left-[24px] top-[4px] h-[8px] w-[8px] rounded-full bg-[#f87171]" />
              </button>
            </div>
          </div>

          <div className="flex w-full items-start pb-[16px]">
            <div className="relative h-[42px] w-full">
              <div className="flex h-[42px] w-full items-center rounded-[12px] border border-[rgba(122,158,130,0.15)] bg-[rgba(243,247,244,0.4)] py-[11px] pl-[41px] pr-[17px] text-[14px] leading-[20px]">
                <span className="text-[#9ca3af]">닉네임, 학과, 키워드로 검색...</span>
              </div>
              <div className="absolute left-[12px] top-[11px] h-[20px] w-[20px]">
                <IconImg src={recIconSearch} alt="" />
              </div>
            </div>
          </div>

          <div className="flex h-[42px] w-full items-center rounded-[12px] border border-[rgba(122,158,130,0.1)] bg-[rgba(243,247,244,0.4)] p-[5px]">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`flex h-[32px] w-[154.5px] items-center justify-center gap-[6px] rounded-[8px] py-[8px] ${activeTab === "all" ? "bg-white" : ""}`}
            >
              <div className="h-[14px] w-[14.578px]">
                <IconImg src={recIconList} alt="" />
              </div>
              <span className={`text-[12px] font-bold leading-[16px] ${activeTab === "all" ? "text-[#7a9e82]" : "text-[#9ca3af]"}`}>전체 구인글</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("recommended")}
              className={`flex h-[32px] w-[154.5px] items-center justify-center gap-[6px] rounded-[8px] py-[8px] ${activeTab === "recommended" ? "bg-white" : ""}`}
            >
              <div className="h-[14px] w-[14.578px]">
                <IconImg src={recIconSparkle} alt="" />
              </div>
              <span className={`text-[12px] font-bold leading-[16px] ${activeTab === "recommended" ? "text-[#7a9e82]" : "text-[#9ca3af]"}`}>추천 룸메이트</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAlgorithmOpen(true)}
              className="ml-auto flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[rgba(122,158,130,0.1)]"
              aria-label="도움말"
            >
              <span className="text-[10px] leading-[15px] text-[#7a9e82]">?</span>
            </button>
          </div>
        </header>

        <section className="flex h-[54px] w-full items-center justify-between px-[20px] py-[12px]">
          <div className="flex items-center text-[12px] leading-[16px]">
            {activeTab === "recommended" ? (
              <>
                <span className="font-bold text-[#7a9e82]">{posts.length}명</span>
                <span className="text-[#9ca3af]">의 추천 룸메이트</span>
                <span className="text-[#d1d5db]">&nbsp;· 80점 이상</span>
              </>
            ) : (
              <>
                <span className="font-bold text-[#374151]">{posts.length}명</span>
                <span className="text-[#9ca3af]">의 룸메이트</span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="flex h-[30px] w-[70.094px] items-center gap-[6px] rounded-[12px] border border-[rgba(122,158,130,0.2)] bg-[rgba(255,255,255,0.6)] px-[13px] py-[7px]"
          >
            <div className="h-[14px] w-[14.578px]">
              <IconImg src={recIconFilter} alt="" />
            </div>
            <span className="text-[12px] font-semibold leading-[16px] text-[#6b7280]">필터</span>
          </button>
        </section>

        <main className="flex w-full flex-col items-start gap-[12px] px-[20px] pb-[12px]">
          {posts.map((p) => (
            <Link key={p.id} to="/post/detail" className="w-full">
              <RoommateCard post={p} />
            </Link>
          ))}
        </main>

        <AppBottomNav />
        <MatchingAlgorithmModal
          open={isAlgorithmOpen}
          onClose={() => setIsAlgorithmOpen(false)}
        />
        <SearchFilterSheet
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      </div>
    </div>
  );
}

