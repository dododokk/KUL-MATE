import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getPosts, searchPosts } from "../../api/posts/postsApi";
import type { SearchPostsParams } from "../../api/posts/postsApi";
import { getPreferenceSurveyStatus } from "../../api/survey/surveyApi";
import {
  recIconBell,
  recIconFilter,
  recIconList,
  recIconSearch,
  recIconSparkle,
} from "../../assets/figma/home";
import AppBottomNav from "../../components/AppBottomNav";
import MatchingAlgorithmModal from "../../features/home/MatchingAlgorithmModal";
import { RoommateCard, apiPostToCard } from "../../features/home/RoommateCard";
import SearchFilterSheet from "../../features/home/SearchFilterSheet";

function IconImg({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="block h-full w-full"
      draggable={false}
    />
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAlgorithmOpen, setIsAlgorithmOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<SearchPostsParams>({});
  const hasAlarm = true;
  const [isPreferenceSurveyCompleted, setIsPreferenceSurveyCompleted] =
    useState(false);

  useEffect(() => {
    getPreferenceSurveyStatus()
      .then((res) => setIsPreferenceSurveyCompleted(res.completed))
      .catch(() => setIsPreferenceSurveyCompleted(false));
  }, []);
  const [activeTab, setActiveTab] = useState<"all" | "recommended">("all");
  const [apiPosts, setApiPosts] = useState<
    Parameters<typeof apiPostToCard>[0][]
  >([]);

  useEffect(() => {
    if (activeTab !== "all") return;
    const hasFilter = Object.values(activeFilters).some((v) => v);
    if (hasFilter) {
      searchPosts({ ...activeFilters })
        .then(setApiPosts)
        .catch(() => setApiPosts([]));
    } else {
      getPosts()
        .then(setApiPosts)
        .catch(() => setApiPosts([]));
    }
  }, [activeTab, location.key, activeFilters]);

  const allPosts = useMemo(() => apiPosts.map(apiPostToCard), [apiPosts]);

  const recommendedPosts = useMemo(
    () =>
      allPosts.slice(0, 2).map((post, idx) => ({
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
                  <span className="text-[12px] font-black leading-[16px] text-white">
                    KM
                  </span>
                </div>
                <div className="text-[18px] font-black leading-[28px] tracking-[-0.45px] text-[#7a9e82]">
                  KUL:MATE
                </div>
              </div>
              <button
                type="button"
                className="relative flex h-[36px] w-[36px] items-center justify-center"
                aria-label="알림"
                onClick={() => navigate("/alarm")}
              >
                <div className="h-[20px] w-[20.828px]">
                  <IconImg src={recIconBell} alt="" />
                </div>
                {hasAlarm && (
                  <span className="absolute left-[24px] top-[4px] h-[8px] w-[8px] rounded-full bg-[#f87171]" />
                )}
              </button>
            </div>
          </div>

          <div className="flex w-full items-start pb-[16px]">
            <div className="relative h-[42px] w-full">
              <button
                type="button"
                onClick={() => navigate("/search")}
                className="h-[42px] w-full rounded-[12px] border border-[rgba(122,158,130,0.15)] bg-[rgba(243,247,244,0.4)] py-[11px] pl-[41px] pr-[17px] text-left text-[14px] leading-[20px] text-[#9ca3af]"
              >
                닉네임, 학과, 키워드로 검색...
              </button>
              <div className="pointer-events-none absolute left-[12px] top-[11px] h-[20px] w-[20px]">
                <IconImg src={recIconSearch} alt="" />
              </div>
            </div>
          </div>

          <div className="relative flex h-[42px] w-full items-center rounded-[12px] border border-[rgba(122,158,130,0.1)] bg-[rgba(243,247,244,0.4)] p-[5px]">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`flex h-[32px] flex-1 items-center justify-center gap-[6px] rounded-[8px] py-[8px] ${activeTab === "all" ? "bg-white" : ""}`}
            >
              <div className="h-[14px] w-[14.578px]">
                <IconImg src={recIconList} alt="" />
              </div>
              <span
                className={`text-[12px] font-bold leading-[16px] ${activeTab === "all" ? "text-[#7a9e82]" : "text-[#9ca3af]"}`}
              >
                전체 구인글
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("recommended")}
              className={`flex h-[32px] flex-1 items-center justify-center gap-[6px] rounded-[8px] py-[8px] ${activeTab === "recommended" ? "bg-white" : ""}`}
            >
              <div className="h-[14px] w-[14.578px]">
                <IconImg src={recIconSparkle} alt="" />
              </div>
              <span
                className={`text-[12px] font-bold leading-[16px] ${activeTab === "recommended" ? "text-[#7a9e82]" : "text-[#9ca3af]"}`}
              >
                추천 룸메이트
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsAlgorithmOpen(true)}
              className="absolute right-[12px] flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[rgba(122,158,130,0.1)]"
              aria-label="도움말"
            >
              <span className="text-[10px] leading-[15px] text-[#7a9e82]">
                ?
              </span>
            </button>
          </div>
        </header>

        <section className="flex h-[54px] w-full items-center justify-between px-[20px] py-[12px]">
          <div className="flex items-center text-[12px] leading-[16px]">
            {activeTab === "recommended" ? (
              <>
                <span className="font-bold text-[#7a9e82]">
                  {posts.length}명
                </span>
                <span className="text-[#9ca3af]">의 추천 룸메이트</span>
                <span className="text-[#d1d5db]">&nbsp;· 80점 이상</span>
              </>
            ) : (
              <>
                <span className="font-bold text-[#374151]">
                  {posts.length}명
                </span>
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
            <span className="whitespace-nowrap text-[12px] font-semibold leading-[16px] text-[#6b7280]">
              필터
            </span>
          </button>
        </section>

        <main className="flex w-full flex-col items-start gap-[12px] px-[20px] pb-[12px]">
          {activeTab === "recommended" && !isPreferenceSurveyCompleted ? (
            <div className="flex w-full flex-col items-center gap-[24px] py-[48px]">
              <div
                className="flex size-[80px] items-center justify-center rounded-[24px] border border-[rgba(122,158,130,0.15)]"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(122,158,130,0.15) 0%, rgba(209,250,229,0.3) 100%)",
                }}
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path
                    d="M18 3L22.77 12.68L33.46 14.22L25.73 21.76L27.56 32.41L18 27.34L8.44 32.41L10.27 21.76L2.54 14.22L13.23 12.68L18 3Z"
                    stroke="#7a9e82"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-[8px] text-center">
                <span className="text-[16px] font-bold text-[#111827]">
                  설문을 먼저 완료해주세요
                </span>
                <span className="text-[13px] leading-[20px] text-[#9ca3af]">
                  선호 룸메이트 성향 설문을 완료하면
                  <br />
                  맞춤 추천 룸메이트를 확인할 수 있어요
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate("/survey/preference?source=recommend")}
                className="flex h-[44px] items-center gap-[6px] rounded-[14px] px-[24px] text-sm font-bold text-white"
                style={{ backgroundColor: "#7A9E82" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3.33337 8H12.6667M12.6667 8L8.66671 4M12.6667 8L8.66671 12"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                바로가기
              </button>
            </div>
          ) : (
            posts.map((p) => (
              <Link
                key={p.id}
                to={`/post/detail?id=${p.id}`}
                className="w-full"
              >
                <RoommateCard post={p} />
              </Link>
            ))
          )}
        </main>

        <AppBottomNav />
        <MatchingAlgorithmModal
          open={isAlgorithmOpen}
          onClose={() => setIsAlgorithmOpen(false)}
        />
        <SearchFilterSheet
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApply={(params) => setActiveFilters(params)}
        />
      </div>
    </div>
  );
}
