import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchPosts } from "../../api/posts/postsApi";
import type { PostSummary } from "../../api/posts/type";
import { recIconBack, recIconClock, recIconSearch } from "../../assets/figma/home";
import { RoommateCard, apiPostToCard } from "../../features/home/RoommateCard";

const HISTORY_KEY = "kul_search_history";
const MAX_HISTORY = 10;

function loadHistory(): string[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>(loadHistory);
  const [results, setResults] = useState<PostSummary[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const doSearch = useCallback(async (keyword: string) => {
    setIsSearching(true);
    try {
      const data = await searchPosts({ keyword });
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(trimmed), 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, doSearch]);

  const addToHistory = (keyword: string) => {
    const trimmed = keyword.trim();
    if (!trimmed) return;
    const updated = [trimmed, ...history.filter((h) => h !== trimmed)].slice(0, MAX_HISTORY);
    setHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  const removeFromHistory = (keyword: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter((h) => h !== keyword);
    setHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  const clearAllHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const handleHistoryClick = (keyword: string) => {
    setQuery(keyword);
    addToHistory(keyword);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    doSearch(keyword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    addToHistory(query);
    inputRef.current?.blur();
  };

  const hasQuery = query.trim() !== "";
  const mappedResults = results.map(apiPostToCard);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: "linear-gradient(159.99deg, rgb(240, 250, 244) 0%, rgb(255, 255, 255) 50%)",
      }}
    >
      {/* 헤더 */}
      <header className="sticky top-0 z-10 border-b border-[rgba(122,158,130,0.1)] bg-[rgba(255,255,255,0.92)] px-[20px] pb-[16px] pt-[56px] backdrop-blur-[6px]">
        <div className="flex items-center gap-[10px]">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-[36px] w-[36px] shrink-0 items-center justify-center"
            aria-label="뒤로가기"
          >
            <img src={recIconBack} alt="" className="h-6 w-6 object-contain" draggable={false} />
          </button>

          <form onSubmit={handleSubmit} className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="닉네임, 학과, 키워드로 검색..."
              className="h-[42px] w-full rounded-[12px] border border-[rgba(122,158,130,0.15)] bg-[rgba(243,247,244,0.4)] py-[11px] pl-[41px] pr-[36px] text-[14px] leading-[20px] text-[#111827] placeholder:text-[#9ca3af] focus:border-[rgba(122,158,130,0.4)] focus:outline-none"
            />
            <div className="pointer-events-none absolute left-[12px] top-[11px] h-[20px] w-[20px]">
              <img src={recIconSearch} alt="" className="block h-full w-full" draggable={false} />
            </div>
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-[10px] top-[11px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#d1d5db]"
                aria-label="검색어 지우기"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1L9 9M9 1L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </form>
        </div>
      </header>

      {/* 본문 */}
      <div className="px-[20px] pt-[20px] pb-[40px]">
        {!hasQuery ? (
          /* ── 검색 기록 모드 ── */
          <section>
            <div className="mb-[12px] flex items-center justify-between">
              <span className="text-[13px] font-bold text-[#374151]">최근 검색어</span>
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllHistory}
                  className="text-[12px] font-medium text-[#9ca3af] active:text-[#6b7280]"
                >
                  전체 삭제
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="flex flex-col items-center gap-[12px] pt-[120px] pb-[56px]">
                <div
                  className="flex h-[64px] w-[64px] items-center justify-center rounded-[20px] border border-[rgba(122,158,130,0.15)]"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(122,158,130,0.1) 0%, rgba(209,250,229,0.2) 100%)",
                  }}
                >
                  <img src={recIconSearch} alt="" className="h-[28px] w-[28px] opacity-40" draggable={false} />
                </div>
                <div className="flex flex-col items-center gap-[4px]">
                  <span className="text-[14px] font-semibold text-[#374151]">최근 검색어가 없어요</span>
                  <span className="text-[13px] text-[#9ca3af]">키워드를 입력해 룸메이트를 찾아보세요</span>
                </div>
              </div>
            ) : (
              <ul className="flex flex-col">
                {history.map((keyword) => (
                  <li key={keyword}>
                    <div className="flex h-[48px] items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleHistoryClick(keyword)}
                        className="flex flex-1 items-center gap-[12px] min-w-0 py-[14px]"
                      >
                        <div className="flex h-[16px] w-[16px] shrink-0 items-center justify-center opacity-50">
                          <img src={recIconClock} alt="" className="block h-full w-full" draggable={false} />
                        </div>
                        <span className="truncate text-[14px] leading-[20px] text-[#374151]">
                          {keyword}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => removeFromHistory(keyword, e)}
                        className="ml-[8px] flex h-[32px] w-[32px] shrink-0 items-center justify-center text-[#c4c9d4] active:text-[#9ca3af]"
                        aria-label={`${keyword} 삭제`}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M1 1L11 11M11 1L1 11"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="h-px bg-[#f3f4f6]" />
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : (
          /* ── 검색 결과 모드 ── */
          <section>
            <div className="mb-[16px] flex h-[20px] items-center">
              {isSearching ? (
                <div className="flex items-center gap-[8px]">
                  <div className="h-[14px] w-[14px] animate-spin rounded-full border-2 border-[#7a9e82] border-t-transparent" />
                  <span className="text-[12px] text-[#9ca3af]">검색 중...</span>
                </div>
              ) : (
                <div className="flex items-center text-[12px] leading-[16px]">
                  <span className="font-bold text-[#374151]">{mappedResults.length}명</span>
                  <span className="text-[#9ca3af]">의 룸메이트</span>
                </div>
              )}
            </div>

            {!isSearching && mappedResults.length === 0 && (
              <div className="flex flex-col items-center gap-[12px] pt-[120px] pb-[56px]">
                <div
                  className="flex h-[64px] w-[64px] items-center justify-center rounded-[20px] border border-[rgba(122,158,130,0.15)]"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(122,158,130,0.1) 0%, rgba(209,250,229,0.2) 100%)",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#7a9e82" strokeWidth="2" strokeOpacity="0.5" />
                    <path d="M19 19L25 25" stroke="#7a9e82" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
                    <path d="M9 12H15M12 9V15" stroke="#7a9e82" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
                  </svg>
                </div>
                <div className="flex flex-col items-center gap-[4px]">
                  <span className="text-[14px] font-semibold text-[#374151]">검색 결과가 없어요</span>
                  <span className="text-[13px] text-[#9ca3af]">다른 키워드로 검색해보세요</span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-[12px]">
              {mappedResults.map((p) => (
                <Link key={p.id} to={`/post/detail?id=${p.id}`} className="w-full">
                  <RoommateCard post={p} />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
