import { Link } from "react-router-dom";

const infoCards = [
  ["생활관", "레이크홀"],
  ["MBTI", "ESTJ"],
  ["흡연", "비흡연"],
  ["방에서 취식", "취식 X"],
  ["샤워 시간", "아침"],
  ["잠버릇", "없음"],
  ["본가 방문", "2주마다"],
  ["거주 기간", "-"],
  ["취침", "23:00 ~ 24:00"],
  ["기상", "07:00 ~ 08:00"],
  ["귀가", "18:00 ~ 21:00"],
];

export default function PostDetailPage() {
  return (
    <div className="min-h-screen bg-[#f8faf8] pb-28">
      <header className="sticky top-0 z-10 flex h-[109px] items-end justify-between border-b border-[#f3f4f6] bg-white px-4 pb-[17px]">
        <Link to="/home" className="h-9 w-9 text-center leading-9 text-[#6b7280]">←</Link>
        <h1 className="text-[14px] font-bold text-[#111827]">구인글 상세</h1>
        <div className="flex w-[76px] justify-end gap-1 text-[#9ca3af]">
          <span className="h-9 w-9 text-center leading-9">🔖</span>
          <Link to="/report" className="h-9 w-9 text-center leading-9">⚑</Link>
        </div>
      </header>

      <main className="space-y-3 px-5 py-4">
        <section className="rounded-[16px] border border-[#f3f4f6] bg-white p-[21px]">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-[rgba(122,158,130,0.1)] text-2xl">👤</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[16px] font-black text-[#111827]">코딩고수민준</p>
                <span className="rounded-full bg-[#eff6ff] px-2 py-[2px] text-[12px] font-semibold text-[#60a5fa]">남</span>
              </div>
              <p className="text-[14px] text-[#6b7280]">컴퓨터공학과 2학년</p>
              <p className="pt-[2px] text-[12px] text-[#9ca3af]">레이크홀</p>
            </div>
            <div className="rounded-[12px] bg-[rgba(122,158,130,0.1)] px-3 py-1.5 text-center">
              <p className="text-[14px] font-black text-[#7a9e82]">92점</p>
              <p className="text-[12px] text-[#7a9e82]/70">일치율</p>
            </div>
          </div>
        </section>

        <section className="rounded-[16px] border border-[#f3f4f6] bg-white p-[21px]">
          <h2 className="text-[16px] font-bold text-[#111827]">조용하고 깔끔한 룸메이트 구해요!</h2>
          <p className="mt-2 text-[14px] leading-[22.75px] text-[#4b5563]">
            저는 주로 새벽 2시 이전에 자고 아침 8시에 일어납니다. 공부할 때는 조용한 환경을 선호하고
            방은 항상 깔끔하게 유지해요. 주말에도 주로 도서관에 있어서 방에 없을 때가 많아요.
          </p>
          <div className="mt-3 flex gap-[6px]">
            {["일찍 취침", "청결", "흡연 안함"].map((tag) => (
              <span key={tag} className="rounded-full bg-[rgba(122,158,130,0.1)] px-[10px] py-1 text-[12px] font-medium text-[#7a9e82]">{tag}</span>
            ))}
          </div>
        </section>

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
          <div className="mt-4 space-y-2 text-[12px] text-[#6b7280]">
            <div className="flex items-center justify-between"><span>청소 빈도</span><span>●●●●●</span><span>매일</span></div>
            <div className="flex items-center justify-between"><span>정돈 민감도</span><span>●●●●○</span><span>강함</span></div>
            <div className="flex items-center justify-between"><span>온도 민감도</span><span>●●○○○</span><span>약함</span></div>
          </div>
        </section>

        <p className="px-1 text-right text-[12px] text-[#9ca3af]">2026-03-20 작성</p>
      </main>

      <footer className="fixed bottom-0 left-0 w-full border-t border-[#f3f4f6] bg-white px-5 pb-8 pt-[13px]">
        <div className="flex gap-3">
          <button className="h-12 flex-1 rounded-[12px] bg-[rgba(122,158,130,0.1)] text-[14px] font-bold text-[#7a9e82]">채팅하기</button>
          <button className="h-12 flex-1 rounded-[12px] bg-[#7a9e82] text-[14px] font-bold text-white">룸메이트 신청</button>
        </div>
      </footer>
    </div>
  );
}

