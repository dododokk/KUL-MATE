import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import basicInfoIcon from "../../assets/survey/basic-info.svg";
import lifePatternIcon from "../../assets/survey/life-pattern.svg";
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

type Gender = "male" | "female" | null;
type StayPeriod = "4months" | "6months" | null;
type Dormitory = "lake" | "nonLake" | null;
type Mbti = { ei: "E" | "I" | null; sn: "S" | "N" | null; tf: "T" | "F" | null; jp: "J" | "P" | null };
type Smoking = "smoker" | "nonSmoker" | null;
type Eating = "allowed" | "notAllowed" | null;
type ShowerTime = "morning" | "evening" | null;
type SleepingHabit = "none" | "moderate" | "severe" | null;
type HomeVisit = "weekly" | "biweekly" | "monthly" | "rarely" | null;
type TimeRange = { start: string; end: string };

export interface SurveyData {
  gender: Gender;
  major: string;
  stayPeriod: StayPeriod;
  dormitory: Dormitory;
  mbti: Mbti;
  smoking: Smoking;
  eating: Eating;
  showerTime: ShowerTime;
  sleepingHabit: SleepingHabit;
  homeVisit: HomeVisit;
  bedtime: TimeRange;
  wakeTime: TimeRange;
  returnTime: TimeRange;
  cleaningFreq: number;
  tidySensitivity: number;
  tempSensitivity: number;
}

interface Props {
  mode?: "create" | "edit";
  initialData?: Partial<SurveyData>;
  onSubmit?: (data: SurveyData) => void;
}

const TIMES = Array.from({ length: 24 }, (_, h) => `${String(h).padStart(2, "0")}:00`);

function SectionCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
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

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <span className="text-sm font-semibold text-[#374151]">{label}</span>
      {children}
    </div>
  );
}

function PillButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
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

function BigToggleButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-14 flex-1 items-center justify-center rounded-xl border-2 text-sm font-bold transition-colors
        ${selected ? "border-[#7a9e82] bg-[rgba(122,158,130,0.1)] text-[#7a9e82]" : "border-[#f3f4f6] bg-white text-[#9ca3af]"}`}
    >
      {label}
    </button>
  );
}

function CardIconButton({ icon, label, selected, onClick }: {
  icon: string; label: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 flex-col items-center gap-2 rounded-2xl border-2 py-[18px] transition-colors
        ${selected ? "border-[#7a9e82] bg-[rgba(122,158,130,0.1)]" : "border-[#f3f4f6] bg-white"}`}
    >
      <img src={icon} alt="" className="size-8" />
      <span className={`text-xs font-bold ${selected ? "text-[#7a9e82]" : "text-[#d1d5db]"}`}>{label}</span>
    </button>
  );
}

function MbtiDimension({ a, b, selected, onSelect }: {
  a: string; b: string; selected: string | null; onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] shadow-sm">
      <button
        type="button"
        onClick={() => onSelect(a)}
        className={`flex h-[53px] w-full items-center justify-center text-xl font-bold transition-colors
          ${selected === a ? "bg-[rgba(122,158,130,0.2)] text-[#7a9e82]" : "bg-[#f9fafb] text-[#d1d5db]"}`}
      >
        {a}
      </button>
      <div className="h-px bg-[#e5e7eb]" />
      <button
        type="button"
        onClick={() => onSelect(b)}
        className={`flex h-[53px] w-full items-center justify-center text-xl font-bold transition-colors
          ${selected === b ? "bg-[rgba(122,158,130,0.2)] text-[#7a9e82]" : "bg-[rgba(249,250,251,0.8)] text-[#d1d5db]"}`}
      >
        {b}
      </button>
    </div>
  );
}

function RangeSlider({ value, onChange, leftLabel, rightLabel }: {
  value: number; onChange: (v: number) => void; leftLabel: string; rightLabel: string;
}) {
  const pct = ((value - 1) / 4) * 100;
  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex h-5 items-center">
        <div className="relative h-2 w-full rounded-full bg-[#f3f4f6]">
          <div className="absolute left-0 h-2 rounded-full bg-[#7a9e82] transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div
          className="pointer-events-none absolute size-5 rounded-full border-2 border-[#7a9e82] bg-white shadow-sm"
          style={{ left: `calc(${pct}% - ${pct * 0.2}px)` }}
        />
        <input
          type="range"
          min={1}
          max={5}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full cursor-pointer opacity-0"
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#9ca3af]">{leftLabel}</span>
        <span className="rounded-full bg-[rgba(122,158,130,0.1)] px-[10px] py-[2px] text-xs font-bold text-[#7a9e82]">
          {value}
        </span>
        <span className="text-xs text-[#9ca3af]">{rightLabel}</span>
      </div>
    </div>
  );
}

function TimeRangeRow({ label, value, onChange }: {
  label: string; value: TimeRange; onChange: (v: TimeRange) => void;
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
            {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2.5 3.75l2.5 2.5 2.5-2.5" stroke="#374151" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
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
            {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2.5 3.75l2.5 2.5 2.5-2.5" stroke="#374151" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
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

export default function SurveyForm({ mode = "create", initialData, onSubmit }: Props) {
  const navigate = useNavigate();

  const [gender, setGender] = useState<Gender>(initialData?.gender ?? null);
  const [major, setMajor] = useState(initialData?.major ?? "");
  const [stayPeriod, setStayPeriod] = useState<StayPeriod>(initialData?.stayPeriod ?? null);
  const [dormitory, setDormitory] = useState<Dormitory>(initialData?.dormitory ?? null);
  const [mbti, setMbti] = useState<Mbti>(initialData?.mbti ?? { ei: null, sn: null, tf: null, jp: null });
  const [smoking, setSmoking] = useState<Smoking>(initialData?.smoking ?? null);
  const [eating, setEating] = useState<Eating>(initialData?.eating ?? null);
  const [showerTime, setShowerTime] = useState<ShowerTime>(initialData?.showerTime ?? null);
  const [sleepingHabit, setSleepingHabit] = useState<SleepingHabit>(initialData?.sleepingHabit ?? null);
  const [homeVisit, setHomeVisit] = useState<HomeVisit>(initialData?.homeVisit ?? null);
  const [bedtime, setBedtime] = useState<TimeRange>(initialData?.bedtime ?? { start: "00:00", end: "00:00" });
  const [wakeTime, setWakeTime] = useState<TimeRange>(initialData?.wakeTime ?? { start: "00:00", end: "00:00" });
  const [returnTime, setReturnTime] = useState<TimeRange>(initialData?.returnTime ?? { start: "00:00", end: "00:00" });
  const [cleaningFreq, setCleaningFreq] = useState(initialData?.cleaningFreq ?? 3);
  const [tidySensitivity, setTidySensitivity] = useState(initialData?.tidySensitivity ?? 3);
  const [tempSensitivity, setTempSensitivity] = useState(initialData?.tempSensitivity ?? 3);

  const mbtiDisplay = `${mbti.ei ?? "-"}${mbti.sn ?? "-"}${mbti.tf ?? "-"}${mbti.jp ?? "-"}`;

  const handleSave = () => {
    onSubmit?.({ gender, major, stayPeriod, dormitory, mbti, smoking, eating, showerTime, sleepingHabit, homeVisit, bedtime, wakeTime, returnTime, cleaningFreq, tidySensitivity, tempSensitivity });
  };

  return (
    <div className="min-h-screen w-full bg-[#f9fafb]">
      {/* Sticky header */}
      <header className="fixed left-0 right-0 top-0 z-10 border-b border-[#f3f4f6] bg-white pb-[17px] pt-[56px] px-[20px]">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => navigate(-1)} className="flex size-9 shrink-0 items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15l-5-5 5-5" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div>
            <h1 className="text-base font-bold text-[#111827]">나의 생활 스타일</h1>
            <p className="text-xs text-[#9ca3af]">솔직하게 작성할수록 매칭 정확도가 높아져요</p>
          </div>
        </div>
      </header>

      {/* Scrollable body */}
      <div className="flex flex-col gap-4 px-[20px] pb-32 pt-[129px]">
        {/* 기본 정보 */}
        <SectionCard icon={<SectionIcon src={basicInfoIcon} />} title="기본 정보">
          <Field label="성별">
            <div className="flex gap-3">
              <BigToggleButton label="남성" selected={gender === "male"} onClick={() => setGender("male")} />
              <BigToggleButton label="여성" selected={gender === "female"} onClick={() => setGender("female")} />
            </div>
          </Field>

          <Field label="학과">
            <input
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="학과를 입력하세요"
              className="h-[42px] w-full rounded-xl border border-[#e5e7eb] bg-white px-[17px] text-sm text-black placeholder:text-[#9ca3af] focus:border-[#7a9e82] focus:outline-none"
            />
          </Field>

          <Field label="거주 기간">
            <div className="flex flex-wrap gap-2">
              <PillButton label="4개월" selected={stayPeriod === "4months"} onClick={() => setStayPeriod("4months")} />
              <PillButton label="6개월" selected={stayPeriod === "6months"} onClick={() => setStayPeriod("6months")} />
            </div>
          </Field>

          <Field label="생활관">
            <div className="flex flex-wrap gap-2">
              <PillButton label="레이크홀" selected={dormitory === "lake"} onClick={() => setDormitory("lake")} />
              <PillButton label="비레이크홀" selected={dormitory === "nonLake"} onClick={() => setDormitory("nonLake")} />
            </div>
          </Field>

          <Field label="MBTI">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center rounded-2xl bg-[rgba(122,158,130,0.1)] py-3">
                <span className="text-3xl font-black tracking-[6px] text-[#7a9e82]">{mbtiDisplay}</span>
              </div>
              <div className="flex gap-2">
                <MbtiDimension a="E" b="I" selected={mbti.ei} onSelect={(v) => setMbti(m => ({ ...m, ei: v as "E" | "I" }))} />
                <MbtiDimension a="S" b="N" selected={mbti.sn} onSelect={(v) => setMbti(m => ({ ...m, sn: v as "S" | "N" }))} />
                <MbtiDimension a="T" b="F" selected={mbti.tf} onSelect={(v) => setMbti(m => ({ ...m, tf: v as "T" | "F" }))} />
                <MbtiDimension a="J" b="P" selected={mbti.jp} onSelect={(v) => setMbti(m => ({ ...m, jp: v as "J" | "P" }))} />
              </div>
            </div>
          </Field>
        </SectionCard>

        {/* 생활 패턴 */}
        <SectionCard icon={<SectionIcon src={lifePatternIcon} />} title="생활 패턴">
          <Field label="흡연 여부">
            <div className="flex gap-3">
              <CardIconButton icon={smoking === "smoker" ? smokingOnIcon : smokingOffIcon} label="흡연" selected={smoking === "smoker"} onClick={() => setSmoking("smoker")} />
              <CardIconButton icon={smoking === "nonSmoker" ? notsmokingOnIcon : notsmokingOffIcon} label="비흡연" selected={smoking === "nonSmoker"} onClick={() => setSmoking("nonSmoker")} />
            </div>
          </Field>

          <Field label="방에서 취식">
            <div className="flex gap-3">
              <CardIconButton icon={eating === "allowed" ? eatOnIcon : eatOffIcon} label="취식 O" selected={eating === "allowed"} onClick={() => setEating("allowed")} />
              <CardIconButton icon={eating === "notAllowed" ? noteatOnIcon : noteatOffIcon} label="취식 X" selected={eating === "notAllowed"} onClick={() => setEating("notAllowed")} />
            </div>
          </Field>

          <Field label="샤워 시간">
            <div className="flex flex-wrap gap-2">
              <PillButton label="아침 샤워" selected={showerTime === "morning"} onClick={() => setShowerTime("morning")} />
              <PillButton label="저녁 샤워" selected={showerTime === "evening"} onClick={() => setShowerTime("evening")} />
            </div>
          </Field>

          <Field label="잠버릇">
            <div className="flex flex-wrap gap-2">
              <PillButton label="없음" selected={sleepingHabit === "none"} onClick={() => setSleepingHabit("none")} />
              <PillButton label="보통" selected={sleepingHabit === "moderate"} onClick={() => setSleepingHabit("moderate")} />
              <PillButton label="심함" selected={sleepingHabit === "severe"} onClick={() => setSleepingHabit("severe")} />
            </div>
          </Field>

          <Field label="본가 방문 주기">
            <div className="flex flex-wrap gap-2">
              <PillButton label="매주" selected={homeVisit === "weekly"} onClick={() => setHomeVisit("weekly")} />
              <PillButton label="2주마다" selected={homeVisit === "biweekly"} onClick={() => setHomeVisit("biweekly")} />
              <PillButton label="한 달 이상" selected={homeVisit === "monthly"} onClick={() => setHomeVisit("monthly")} />
              <PillButton label="거의 안 감" selected={homeVisit === "rarely"} onClick={() => setHomeVisit("rarely")} />
            </div>
          </Field>
        </SectionCard>

        {/* 생활 시간대 */}
        <SectionCard icon={<SectionIcon src={lifeTimeIcon} />} title="생활 시간대">
          <TimeRangeRow label="취침 시간" value={bedtime} onChange={setBedtime} />
          <TimeRangeRow label="기상 시간" value={wakeTime} onChange={setWakeTime} />
          <TimeRangeRow label="귀가 시간" value={returnTime} onChange={setReturnTime} />
        </SectionCard>

        {/* 민감도 */}
        <SectionCard icon={<SectionIcon src={sensitiveIcon} />} title="민감도">
          <Field label="청소 빈도">
            <RangeSlider value={cleaningFreq} onChange={setCleaningFreq} leftLabel="월 1회" rightLabel="매일" />
          </Field>
          <Field label="정돈 민감도">
            <RangeSlider value={tidySensitivity} onChange={setTidySensitivity} leftLabel="자유로운 편" rightLabel="매우 민감" />
          </Field>
          <Field label="온도 민감도">
            <RangeSlider value={tempSensitivity} onChange={setTempSensitivity} leftLabel="둔감한 편" rightLabel="매우 민감" />
          </Field>
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
