type MatchingAlgorithmModalProps = {
  open: boolean;
  onClose: () => void;
};

const SCORE_ITEMS = [
  { title: "취침·기상 시간", desc: "시간대 겹치는 정도로 계산", score: "20점" },
  { title: "흡연 여부", desc: "완전 일치 시 만점", score: "20점" },
  { title: "청소 빈도 & 민감도", desc: "차이가 적을수록 높은 점수", score: "20점" },
  { title: "샤워 시간 & 잠버릇", desc: "생활 패턴 일치도", score: "15점" },
  { title: "본가 주기 & MBTI", desc: "추가 성향 일치도", score: "10점" },
];

export default function MatchingAlgorithmModal({
  open,
  onClose,
}: MatchingAlgorithmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-5">
      <div className="w-full rounded-[24px] bg-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#f3f7f4] text-[#7a9e82]">
              ✧
            </span>
            <div>
              <p className="text-[16px] font-bold leading-6 text-[#111827]">추천 알고리즘 안내</p>
              <p className="text-[12px] leading-4 text-[#9ca3af]">총 100점 만점 · 80점 이상 추천</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="h-8 w-8 text-[#9ca3af]">
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {SCORE_ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex items-center rounded-[12px] bg-[rgba(243,247,244,0.4)] px-3 py-2"
            >
              <div className="flex-1">
                <p className="text-[12px] font-semibold leading-4 text-[#1f2937]">{item.title}</p>
                <p className="text-[12px] leading-4 text-[#9ca3af]">{item.desc}</p>
              </div>
              <span className="text-[14px] font-black text-[#7a9e82]">{item.score}</span>
            </div>
          ))}
        </div>

        <div className="mt-2 rounded-[12px] border border-[rgba(122,158,130,0.15)] bg-[rgba(122,158,130,0.05)] px-[17px] py-[13px] text-center text-[12px] font-bold text-[#7a9e82]">
          ✦ 70점 이상인 사용자만 추천탭에 표시돼요!
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 h-11 w-full rounded-[16px] bg-[#7a9e82] text-[14px] font-bold text-white"
        >
          확인
        </button>
      </div>
    </div>
  );
}

