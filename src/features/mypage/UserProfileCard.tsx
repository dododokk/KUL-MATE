import type { UserProfileResponse } from "../../api/mypage/type";

const DORMITORY_LABEL: Record<string, string> = {
  LAKE: "레이크홀",
  HAENGDANG: "행당홀",
};
const GENDER_LABEL: Record<string, string> = { MALE: "남성", FEMALE: "여성" };
const SMOKING_LABEL: Record<string, string> = { SMOKER: "흡연", NON_SMOKER: "비흡연" };
const SHOWER_LABEL: Record<string, string> = { MORNING: "아침", EVENING: "저녁" };
const SLEEP_HABIT_LABEL: Record<string, string> = { NONE: "없음", NORMAL: "있음", SEVERE: "심함" };
const HOME_VISIT_LABEL: Record<string, string> = {
  WEEKLY: "매주",
  BIWEEKLY: "2주마다",
  MONTHLY_OR_MORE: "월 1회 이상",
  RARE: "드물게",
};

function label(map: Record<string, string>, val: string | undefined): string {
  if (!val) return "-";
  return map[val] ?? val;
}

function dormLabel(val: string | undefined): string {
  if (!val) return "-";
  return DORMITORY_LABEL[val] ?? val;
}

function DotRating({ score }: { score: string }) {
  const n = parseInt(score, 10);
  const filled = Number.isFinite(n) && n >= 1 && n <= 5 ? n : 0;
  return (
    <div className="flex gap-[4px]">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`size-[8px] rounded-full shrink-0 ${i < filled ? "bg-[#7a9e82]" : "bg-[#e5e7eb]"}`}
        />
      ))}
    </div>
  );
}

function InfoCard({ label: lbl, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#f9fafb] flex flex-col h-[64px] items-start p-[12px] rounded-[12px] w-[calc(50%-4px)]">
      <span className="font-normal text-[#9ca3af] text-[12px] leading-[16px] pb-[4px]">{lbl}</span>
      <span className="font-semibold text-[#1f2937] text-[14px] leading-[20px]">{value}</span>
    </div>
  );
}

type Props = {
  profile: UserProfileResponse;
};

export default function UserProfileCard({ profile }: Props) {
  const ls = profile.lifestyle;

  return (
    <div className="bg-white border border-[#f3f4f6] flex flex-col items-start p-[21px] rounded-[16px]">
      {/* 성향 정보 헤더 */}
      <div className="flex gap-[8px] items-center pb-[16px]">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 4h12M2 8h8M2 12h10" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="font-bold text-[#1f2937] text-[14px] leading-[20px]">성향 정보</span>
      </div>

      {ls ? (
        <div className="flex flex-col gap-[16px] w-full">
          {/* 기본 */}
          <div>
            <p className="font-bold text-[#9ca3af] text-[12px] leading-[16px] tracking-[0.6px] pb-[8px]">기본</p>
            <div className="flex flex-wrap gap-[8px]">
              <InfoCard label="생활관" value={dormLabel(ls.dormitoryType || profile.dormitoryType)} />
              <InfoCard label="MBTI" value={ls.mbti || "-"} />
            </div>
          </div>

          {/* 생활 패턴 */}
          <div>
            <p className="font-bold text-[#9ca3af] text-[12px] leading-[16px] tracking-[0.6px] pb-[8px]">생활 패턴</p>
            <div className="flex flex-wrap gap-[8px]">
              <InfoCard label="흡연" value={label(SMOKING_LABEL, ls.smokingStatus)} />
              <InfoCard label="샤워 시간" value={label(SHOWER_LABEL, ls.showerTime)} />
              <InfoCard label="잠버릇" value={label(SLEEP_HABIT_LABEL, ls.sleepHabit)} />
              <InfoCard label="본가 방문" value={label(HOME_VISIT_LABEL, ls.homeVisitFrequency)} />
            </div>
          </div>

          {/* 생활 시간대 */}
          <div>
            <p className="font-bold text-[#9ca3af] text-[12px] leading-[16px] tracking-[0.6px] pb-[8px]">생활 시간대</p>
            <div className="flex flex-wrap gap-[8px]">
              <InfoCard label="취침" value={ls.sleepTime || "-"} />
              <InfoCard label="기상" value={ls.wakeUpTime || "-"} />
            </div>
          </div>

          {/* 민감도 */}
          <div>
            <p className="font-bold text-[#9ca3af] text-[12px] leading-[16px] tracking-[0.6px] pb-[8px]">민감도</p>
            <div className="flex flex-col gap-[10px]">
              {[
                { lbl: "청소 빈도", score: ls.cleaningFrequencyScore },
                { lbl: "정돈 민감도", score: ls.organizationSensitivityScore },
                { lbl: "온도 민감도", score: ls.temperatureSensitivityScore },
              ].map(({ lbl: lbl2, score }) => (
                <div key={lbl2} className="flex items-center gap-[12px]">
                  <span className="font-normal text-[#6b7280] text-[12px] leading-[16px] w-[72px] shrink-0">{lbl2}</span>
                  <DotRating score={score} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="font-normal text-[#9ca3af] text-[13px] leading-[18px]">성향 정보가 없어요</p>
      )}
    </div>
  );
}
