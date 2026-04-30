type SearchFilterSheetProps = {
  open: boolean;
  onClose: () => void;
};

type FilterSectionProps = {
  title: string;
  options: string[];
};

function FilterSection({ title, options }: FilterSectionProps) {
  return (
    <section className="pt-6 first:pt-0">
      <p className="pb-3 text-[12px] font-bold tracking-[0.6px] text-[#6b7280]">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, idx) => (
          <button
            key={opt}
            type="button"
            className={
              idx === 0
                ? "h-[34px] rounded-full border border-[#7a9e82] bg-[#7a9e82] px-[17px] text-[12px] font-semibold text-white"
                : "h-[34px] rounded-full border border-[#e5e7eb] bg-white px-[17px] text-[12px] font-semibold text-[#6b7280]"
            }
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="mt-6 h-px bg-[#f3f4f6]" />
    </section>
  );
}

export default function SearchFilterSheet({ open, onClose }: SearchFilterSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/30">
      <div className="absolute bottom-0 left-0 w-full rounded-t-[24px] bg-[#fafcfb] px-5 pb-10 pt-5">
        <div className="mx-auto h-1 w-10 rounded-full bg-[#e5e7eb]" />
        <div className="mt-5 flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-[#1f2937]">검색 필터</h3>
          <button type="button" onClick={onClose} className="h-8 w-8 text-[#9ca3af]">
            ✕
          </button>
        </div>

        <div className="mt-5 max-h-[62vh] overflow-y-auto pr-1">
          <FilterSection title="생활관" options={["전체", "레이크홀", "비레이크홀"]} />
          <FilterSection title="흡연 여부" options={["전체", "비흡연", "흡연"]} />
          <FilterSection title="샤워 시간" options={["전체", "아침", "저녁"]} />
          <FilterSection title="취침 시간대" options={["전체", "23시 이전", "1시 이후"]} />
          <FilterSection title="잠버릇" options={["전체", "없음", "보통", "심함"]} />
          <FilterSection title="청소 빈도 (최소)" options={["전체", "월 1회+", "월 2회+", "주 1회+", "주 2회+"]} />
        </div>

        <div className="mt-5 flex gap-3">
          <button type="button" className="h-[50px] flex-1 rounded-[16px] border border-[#e5e7eb] bg-white text-[14px] font-semibold text-[#6b7280]">
            초기화
          </button>
          <button type="button" onClick={onClose} className="h-[50px] flex-1 rounded-[16px] bg-[#7a9e82] text-[14px] font-bold text-white">
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
}

