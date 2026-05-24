import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import lifePatternIcon from "../../assets/survey/life-pattern.svg";
import mbtiIcon from "../../assets/survey/mbti.svg";
import lifeTimeIcon from "../../assets/survey/life-time.svg";
import sensitiveIcon from "../../assets/survey/sensitive.svg";
import smokingOnIcon from "../../assets/survey/smoking-on.svg";
import smokingOffIcon from "../../assets/survey/smoking-off.svg";
import notsmokingOnIcon from "../../assets/survey/notsmoking-on.svg";
import notsmokingOffIcon from "../../assets/survey/notsmoking-off.svg";
import eatOnIcon from "../../assets/survey/eat-on.svg";
import eatOffIcon from "../../assets/survey/eat-off.svg";
import noteatOnIcon from "../../assets/survey/noteat-on.svg";
import noteatOffIcon from "../../assets/survey/noteat-off.svg";

type MbtiPref = {
  ei: "E" | "I" | null;
  sn: "S" | "N" | null;
  tf: "T" | "F" | null;
  jp: "J" | "P" | null;
};
type SmokingPref = "smoker" | "nonSmoker" | null;
type EatingPref = "allowed" | "notAllowed" | null;
type ShowerTimePref = "morning" | "evening" | null;
type SleepingHabitValue = "none" | "moderate" | "severe";
type HomeVisitPref = "weekly" | "biweekly" | "monthly" | "rarely" | null;
type TimeRange = { start: string; end: string };

export interface PreferenceSurveyData {
  mbti: MbtiPref;
  smoking: SmokingPref;
  eating: EatingPref;
  showerTime: ShowerTimePref;
  sleepingHabits: SleepingHabitValue[];
  homeVisit: HomeVisitPref;
  bedtime: TimeRange;
  wakeTime: TimeRange;
  returnTime: TimeRange;
  cleaningFreqs: number[];
  tidySensitivities: number[];
  tempSensitivities: number[];
}

interface Props {
  mode?: "create" | "edit";
  initialData?: Partial<PreferenceSurveyData>;
  onSubmit?: (data: PreferenceSurveyData) => void;
  showBanner?: boolean;
}

const TIMES = Array.from(
  { length: 24 },
  (_, h) => `${String(h).padStart(2, "0")}:00`,
);

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full rounded-2xl border border-[#f3f4f6] bg-white p-[21px]">
      <div className="mb-5 flex items-center gap-2">
        <div className="flex size-6 items-center justify-center">{icon}</div>
        <span className="text-sm font-bold text-[#374151]">{title}</span>
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  sub,
  children,
}: {
  label: string;
  sub?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-[#374151]">{label}</span>
        {sub && <span className="text-xs text-[#9ca3af]">{sub}</span>}
      </div>
      {children}
    </div>
  );
}

function PillButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-[34px] rounded-full border px-[17px] text-xs font-semibold transition-colors
        ${selected ? "border-[#7a9e82] bg-[#7a9e82] text-white" : "border-[#e5e7eb] bg-white text-[#6b7280]"}`}
    >
      {label}
    </button>
  );
}

function CardIconButton({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 flex-col items-center gap-2 rounded-2xl border-2 py-[18px] transition-colors
        ${selected ? "border-[#7a9e82] bg-[rgba(122,158,130,0.1)]" : "border-[#f3f4f6] bg-white"}`}
    >
      <img src={icon} alt="" className="size-8" />
      <span
        className={`text-xs font-bold ${selected ? "text-[#7a9e82]" : "text-[#d1d5db]"}`}
      >
        {label}
      </span>
    </button>
  );
}

function MbtiDimension({
  a,
  b,
  selected,
  onSelect,
}: {
  a: string;
  b: string;
  selected: string | null;
  onSelect: (v: string | null) => void;
}) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] shadow-sm">
      <button
        type="button"
        onClick={() => onSelect(selected === a ? null : a)}
        className={`flex h-[53px] w-full items-center justify-center text-xl font-bold transition-colors
          ${selected === a ? "bg-[rgba(122,158,130,0.2)] text-[#7a9e82]" : "bg-[#f9fafb] text-[#d1d5db]"}`}
      >
        {a}
      </button>
      <div className="h-px bg-[#e5e7eb]" />
      <button
        type="button"
        onClick={() => onSelect(selected === b ? null : b)}
        className={`flex h-[53px] w-full items-center justify-center text-xl font-bold transition-colors
          ${selected === b ? "bg-[rgba(122,158,130,0.2)] text-[#7a9e82]" : "bg-[rgba(249,250,251,0.8)] text-[#d1d5db]"}`}
      >
        {b}
      </button>
    </div>
  );
}

function MultiSelectNumberRow({
  label,
  values,
  onChange,
}: {
  label: string;
  values: number[];
  onChange: (v: number[]) => void;
}) {
  const toggle = (n: number) => {
    onChange(
      values.includes(n)
        ? values.filter((v) => v !== n)
        : [...values, n].sort((a, b) => a - b),
    );
  };
  return (
    <Field label={label} sub="(복수 선택 가능)">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => toggle(n)}
            className={`flex h-10 flex-1 items-center justify-center rounded-xl border-2 text-sm font-bold transition-colors
              ${values.includes(n) ? "border-[#7a9e82] bg-[rgba(122,158,130,0.1)] text-[#7a9e82]" : "border-[#f3f4f6] bg-white text-[#9ca3af]"}`}
          >
            {n}
          </button>
        ))}
      </div>
    </Field>
  );
}

function TimeRangeRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: TimeRange;
  onChange: (v: TimeRange) => void;
}) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <select
            value={value.start}
            onChange={(e) => onChange({ ...value, start: e.target.value })}
            className="h-10 w-full appearance-none rounded-xl border border-[#e5e7eb] bg-white px-3 pr-8 text-sm text-[#374151] focus:border-[#7a9e82] focus:outline-none"
          >
            {TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M2.5 3.75l2.5 2.5 2.5-2.5"
                stroke="#374151"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <span className="shrink-0 text-sm text-[#d1d5db]">~</span>
        <div className="relative flex-1">
          <select
            value={value.end}
            onChange={(e) => onChange({ ...value, end: e.target.value })}
            className="h-10 w-full appearance-none rounded-xl border border-[#e5e7eb] bg-white px-3 pr-8 text-sm text-[#374151] focus:border-[#7a9e82] focus:outline-none"
          >
            {TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M2.5 3.75l2.5 2.5 2.5-2.5"
                stroke="#374151"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </Field>
  );
}

function SectionIcon({ src }: { src: string }) {
  return <img src={src} alt="" className="size-4" />;
}

export default function PreferenceSurveyForm({
  mode = "create",
  initialData,
  onSubmit,
  showBanner = false,
}: Props) {
  const navigate = useNavigate();

  const [mbti, setMbti] = useState<MbtiPref>(
    initialData?.mbti ?? { ei: null, sn: null, tf: null, jp: null },
  );
  const [smoking, setSmoking] = useState<SmokingPref>(
    initialData?.smoking ?? null,
  );
  const [eating, setEating] = useState<EatingPref>(initialData?.eating ?? null);
  const [showerTime, setShowerTime] = useState<ShowerTimePref>(
    initialData?.showerTime ?? null,
  );
  const [sleepingHabits, setSleepingHabits] = useState<SleepingHabitValue[]>(
    initialData?.sleepingHabits ?? [],
  );
  const [homeVisit, setHomeVisit] = useState<HomeVisitPref>(
    initialData?.homeVisit ?? null,
  );
  const [bedtime, setBedtime] = useState<TimeRange>(
    initialData?.bedtime ?? { start: "00:00", end: "00:00" },
  );
  const [wakeTime, setWakeTime] = useState<TimeRange>(
    initialData?.wakeTime ?? { start: "00:00", end: "00:00" },
  );
  const [returnTime, setReturnTime] = useState<TimeRange>(
    initialData?.returnTime ?? { start: "00:00", end: "00:00" },
  );
  const [cleaningFreqs, setCleaningFreqs] = useState<number[]>(
    initialData?.cleaningFreqs ?? [],
  );
  const [tidySensitivities, setTidySensitivities] = useState<number[]>(
    initialData?.tidySensitivities ?? [],
  );
  const [tempSensitivities, setTempSensitivities] = useState<number[]>(
    initialData?.tempSensitivities ?? [],
  );

  const mbtiDisplay = `${mbti.ei ?? "?"}${mbti.sn ?? "?"}${mbti.tf ?? "?"}${mbti.jp ?? "?"}`;

  const toggleSleepingHabit = (v: SleepingHabitValue) => {
    setSleepingHabits((prev) =>
      prev.includes(v) ? prev.filter((h) => h !== v) : [...prev, v],
    );
  };

  const handleSave = () => {
    onSubmit?.({
      mbti,
      smoking,
      eating,
      showerTime,
      sleepingHabits,
      homeVisit,
      bedtime,
      wakeTime,
      returnTime,
      cleaningFreqs,
      tidySensitivities,
      tempSensitivities,
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#f9fafb]">
      {/* Sticky header */}
      <header className="fixed left-0 right-0 top-0 z-10 border-b border-[#f3f4f6] bg-white pb-[17px] pt-[56px] px-[20px]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex size-9 shrink-0 items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 15l-5-5 5-5"
                stroke="#111827"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-base font-bold text-[#111827]">
              선호 룸메이트 성향
            </h1>
            <p className="text-xs text-[#9ca3af]">
              원하는 룸메이트의 생활 스타일을 입력해주세요
            </p>
          </div>
        </div>
      </header>

      {/* Scrollable body */}
      <div className="flex flex-col gap-4 px-[20px] pb-32 pt-[129px]">
        {showBanner && (
          <div className="flex items-center gap-3 rounded-2xl border border-[rgba(122,158,130,0.2)] bg-gradient-to-r from-[rgba(240,250,244,0.9)] to-[rgba(255,255,255,0.9)] p-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[rgba(122,158,130,0.15)]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 1.5L11.39 6.34L16.73 7.11L12.87 10.86L13.78 16.18L9 13.67L4.22 16.18L5.13 10.86L1.27 7.11L6.61 6.34L9 1.5Z"
                  stroke="#7a9e82"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-[#374151]">
                추천 룸메이트를 보려면 설문이 필요해요
              </span>
              <span className="text-xs text-[#9ca3af]">
                선택하지 않은 항목은 필터링에서 제외돼요
              </span>
            </div>
          </div>
        )}

        {/* 선호 MBTI */}
        <SectionCard icon={<SectionIcon src={mbtiIcon} />} title="선호 MBTI">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center rounded-2xl bg-[rgba(122,158,130,0.1)] py-3">
              <span className="text-3xl font-black tracking-[6px] text-[#7a9e82]">
                {mbtiDisplay}
              </span>
            </div>
            <p className="text-center text-xs text-[#9ca3af]">
              네 자리 중 선택한 항목만 필터링 돼요
            </p>
            <div className="flex gap-2">
              <MbtiDimension
                a="E"
                b="I"
                selected={mbti.ei}
                onSelect={(v) =>
                  setMbti((m) => ({ ...m, ei: v as "E" | "I" | null }))
                }
              />
              <MbtiDimension
                a="S"
                b="N"
                selected={mbti.sn}
                onSelect={(v) =>
                  setMbti((m) => ({ ...m, sn: v as "S" | "N" | null }))
                }
              />
              <MbtiDimension
                a="T"
                b="F"
                selected={mbti.tf}
                onSelect={(v) =>
                  setMbti((m) => ({ ...m, tf: v as "T" | "F" | null }))
                }
              />
              <MbtiDimension
                a="J"
                b="P"
                selected={mbti.jp}
                onSelect={(v) =>
                  setMbti((m) => ({ ...m, jp: v as "J" | "P" | null }))
                }
              />
            </div>
          </div>
        </SectionCard>

        {/* 생활 패턴 */}
        <SectionCard
          icon={<SectionIcon src={lifePatternIcon} />}
          title="생활 패턴"
        >
          <Field label="흡연 여부">
            <div className="flex gap-3">
              <CardIconButton
                icon={smoking === "smoker" ? smokingOnIcon : smokingOffIcon}
                label="흡연"
                selected={smoking === "smoker"}
                onClick={() =>
                  setSmoking(smoking === "smoker" ? null : "smoker")
                }
              />
              <CardIconButton
                icon={
                  smoking === "nonSmoker" ? notsmokingOnIcon : notsmokingOffIcon
                }
                label="비흡연"
                selected={smoking === "nonSmoker"}
                onClick={() =>
                  setSmoking(smoking === "nonSmoker" ? null : "nonSmoker")
                }
              />
            </div>
          </Field>

          <Field label="방에서 취식">
            <div className="flex gap-3">
              <CardIconButton
                icon={eating === "allowed" ? eatOnIcon : eatOffIcon}
                label="취식 O"
                selected={eating === "allowed"}
                onClick={() =>
                  setEating(eating === "allowed" ? null : "allowed")
                }
              />
              <CardIconButton
                icon={eating === "notAllowed" ? noteatOnIcon : noteatOffIcon}
                label="취식 X"
                selected={eating === "notAllowed"}
                onClick={() =>
                  setEating(eating === "notAllowed" ? null : "notAllowed")
                }
              />
            </div>
          </Field>

          <Field label="샤워 시간">
            <div className="flex flex-wrap gap-2">
              <PillButton
                label="아침 샤워"
                selected={showerTime === "morning"}
                onClick={() =>
                  setShowerTime(showerTime === "morning" ? null : "morning")
                }
              />
              <PillButton
                label="저녁 샤워"
                selected={showerTime === "evening"}
                onClick={() =>
                  setShowerTime(showerTime === "evening" ? null : "evening")
                }
              />
            </div>
          </Field>

          <Field label="잠버릇" sub="(복수 선택 가능)">
            <div className="flex flex-wrap gap-2">
              <PillButton
                label="없음"
                selected={sleepingHabits.includes("none")}
                onClick={() => toggleSleepingHabit("none")}
              />
              <PillButton
                label="보통"
                selected={sleepingHabits.includes("moderate")}
                onClick={() => toggleSleepingHabit("moderate")}
              />
              <PillButton
                label="심함"
                selected={sleepingHabits.includes("severe")}
                onClick={() => toggleSleepingHabit("severe")}
              />
            </div>
          </Field>

          <Field label="본가 방문 주기">
            <div className="flex flex-wrap gap-2">
              <PillButton
                label="매주"
                selected={homeVisit === "weekly"}
                onClick={() =>
                  setHomeVisit(homeVisit === "weekly" ? null : "weekly")
                }
              />
              <PillButton
                label="2주마다"
                selected={homeVisit === "biweekly"}
                onClick={() =>
                  setHomeVisit(homeVisit === "biweekly" ? null : "biweekly")
                }
              />
              <PillButton
                label="한 달 이상"
                selected={homeVisit === "monthly"}
                onClick={() =>
                  setHomeVisit(homeVisit === "monthly" ? null : "monthly")
                }
              />
              <PillButton
                label="거의 안 감"
                selected={homeVisit === "rarely"}
                onClick={() =>
                  setHomeVisit(homeVisit === "rarely" ? null : "rarely")
                }
              />
            </div>
          </Field>
        </SectionCard>

        {/* 생활 시간대 */}
        <SectionCard
          icon={<SectionIcon src={lifeTimeIcon} />}
          title="생활 시간대"
        >
          <TimeRangeRow
            label="취침 시간"
            value={bedtime}
            onChange={setBedtime}
          />
          <TimeRangeRow
            label="기상 시간"
            value={wakeTime}
            onChange={setWakeTime}
          />
          <TimeRangeRow
            label="귀가 시간"
            value={returnTime}
            onChange={setReturnTime}
          />
        </SectionCard>

        {/* 민감도 */}
        <SectionCard icon={<SectionIcon src={sensitiveIcon} />} title="민감도">
          <MultiSelectNumberRow
            label="청소 빈도"
            values={cleaningFreqs}
            onChange={setCleaningFreqs}
          />
          <MultiSelectNumberRow
            label="정돈 민감도"
            values={tidySensitivities}
            onChange={setTidySensitivities}
          />
          <MultiSelectNumberRow
            label="온도 민감도"
            values={tempSensitivities}
            onChange={setTempSensitivities}
          />
        </SectionCard>
      </div>

      {/* Fixed footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-[#f3f4f6] bg-[#f9fafb] px-[20px] pb-4 pt-[17px]">
        <button
          type="button"
          onClick={handleSave}
          className="h-12 w-full rounded-2xl bg-[#7a9e82] text-sm font-bold text-white"
        >
          {mode === "edit" ? "수정하기" : "저장하기"}
        </button>
      </footer>
    </div>
  );
}
