export type EventCategory = "내 일정" | "룸메이트" | "점검/행사" | "입사일" | "퇴사일";

export type CalendarEvent = {
  id: string;
  date: string; // "YYYY-MM-DD"
  title: string;
  category: EventCategory;
};

const DOT_COLOR: Record<EventCategory, string> = {
  입사일: "bg-[#7a9e82]",
  퇴사일: "bg-[#f87171]",
  "점검/행사": "bg-[#fbbf24]",
  "내 일정": "bg-[#a78bfa]",
  룸메이트: "bg-[#38bdf8]",
};

const LEGEND_ITEMS: { color: string; label: EventCategory }[] = [
  { color: "bg-[#7a9e82]", label: "입사일" },
  { color: "bg-[#f87171]", label: "퇴사일" },
  { color: "bg-[#fbbf24]", label: "점검/행사" },
  { color: "bg-[#a78bfa]", label: "내 일정" },
  { color: "bg-[#38bdf8]", label: "룸메이트" },
];

const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

type Props = {
  year: number;
  month: number;
  events: CalendarEvent[];
  today: string;
  selectedDate?: string;
  onDateClick: (dateStr: string) => void;
};

export default function CalendarGrid({ year, month, events, today, selectedDate, onDateClick }: Props) {
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const eventsMap = new Map<string, CalendarEvent[]>();
  events.forEach((e) => {
    const list = eventsMap.get(e.date) ?? [];
    list.push(e);
    eventsMap.set(e.date, list);
  });

  function formatDate(d: number) {
    return `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }

  return (
    <div className="px-[16px] pt-[16px]">
      {/* Day headers */}
      <div className="grid grid-cols-7 pb-[8px]">
        {DAY_LABELS.map((label, i) => (
          <div key={label} className="flex items-center justify-center h-[24px]">
            <span
              className={`font-semibold text-[12px] leading-[16px] ${
                i === 0
                  ? "text-[#f87171]"
                  : i === 6
                    ? "text-[#7a9e82]"
                    : "text-[#9ca3af]"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="h-[48px]" />;
          }

          const dateStr = formatDate(day);
          const isSelected = dateStr === selectedDate;
          const isTodayOnly = dateStr === today && !isSelected;
          const dayEvents = eventsMap.get(dateStr) ?? [];
          const col = idx % 7;

          const textColor = isSelected
            ? "text-white"
            : isTodayOnly
              ? "text-[#7a9e82]"
              : col === 0
                ? "text-[#f87171]"
                : col === 6
                  ? "text-[#7a9e82]"
                  : "text-[#374151]";

          const circleClass = isSelected
            ? "bg-[#7a9e82]"
            : isTodayOnly
              ? "border border-[#7a9e82]"
              : "";

          return (
            <button
              key={dateStr}
              className="flex flex-col items-center py-[6px]"
              onClick={() => onDateClick(dateStr)}
            >
              <div
                className={`flex items-center justify-center rounded-full size-[28px] mb-[2px] ${circleClass}`}
              >
                <span className={`font-semibold text-[14px] leading-[20px] ${textColor}`}>
                  {day}
                </span>
              </div>
              <div className="flex gap-[2px] justify-center h-[6px]">
                {dayEvents.slice(0, 3).map((e) => (
                  <span
                    key={e.id}
                    className={`${DOT_COLOR[e.category]} rounded-full size-[6px] shrink-0`}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-[16px] bg-[rgba(255,255,255,0.8)] border border-[rgba(122,158,130,0.1)] rounded-[16px] p-[17px]">
        <p className="font-bold text-[#9ca3af] text-[12px] leading-[16px] pb-[12px]">범례</p>
        <div className="grid grid-cols-2 gap-[8px]">
          {LEGEND_ITEMS.map(({ color, label }) => (
            <div key={label} className="flex items-center gap-[8px]">
              <span className={`${color} rounded-full size-[10px] shrink-0`} />
              <span className="font-normal text-[#4b5563] text-[12px] leading-[16px]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
